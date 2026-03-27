const SEVERITY_WEIGHT = {
  low: 12,
  medium: 30,
  high: 55,
};

const CONSUMABLE_LIMITS = [
  { keyword: 'glove', maxPrice: 100, expected: 'Rs 5-20 per pair' },
  { keyword: 'syringe', maxPrice: 100, expected: 'Rs 10-30 each' },
  { keyword: 'mask', maxPrice: 80, expected: 'Rs 5-15 each' },
  { keyword: 'cotton', maxPrice: 100, expected: 'Rs 10-30' },
  { keyword: 'gauze', maxPrice: 100, expected: 'Rs 10-30' },
  { keyword: 'bandage', maxPrice: 150, expected: 'Rs 20-50' },
];

const SUSPICIOUS_KEYWORDS = [
  'oxygen',
  'icu',
  'ventilator',
  'nebuliz',
  'monitor',
  'ppe',
  'ambulance',
  'emergency',
];

function parseAmount(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.max(0, value);
  }

  if (typeof value !== 'string') {
    return 0;
  }

  const compact = value
    .replace(/inr|rs\.?|rupees?|,/gi, '')
    .replace(/[^0-9.-]/g, '')
    .trim();

  const parsed = Number.parseFloat(compact);
  return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
}

function normalizeText(value) {
  return String(value || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function normalizeCategory(category) {
  const value = normalizeText(category);
  if (!value) {
    return 'other';
  }

  const allowed = new Set(['medicine', 'room', 'consultation', 'procedure', 'consumable', 'tax', 'other']);
  return allowed.has(value) ? value : 'other';
}

function buildDuplicateMap(items) {
  const counts = new Map();
  for (const item of items) {
    const key = normalizeText(item.name).replace(/[^a-z0-9 ]/g, '');
    if (!key) {
      continue;
    }
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return counts;
}

function addFlag(flags, ruleId, severity, reason, expectedPrice) {
  flags.push({ ruleId, severity, reason, expectedPrice });
}

function ruleGSTOnMedicine(item, flags) {
  const name = normalizeText(item.name);
  if (item.category === 'medicine' && /(gst|tax|cgst|sgst|igst)/.test(name)) {
    addFlag(
      flags,
      'gst_on_medicine',
      'high',
      'GST/tax appears to be charged on medicine line item; verify applicable slab and exemption.',
      item.charged
    );
  }
}

function ruleDuplicateCharge(item, duplicateMap, flags) {
  const key = normalizeText(item.name).replace(/[^a-z0-9 ]/g, '');
  const count = duplicateMap.get(key) || 0;

  if (count > 1) {
    addFlag(
      flags,
      'duplicate_item',
      'medium',
      `Possible duplicate charge: "${item.name}" appears ${count} times.`,
      item.charged
    );
  }
}

function ruleConsumablePrice(item, flags) {
  const name = normalizeText(item.name);
  if (item.category !== 'consumable' && item.category !== 'medicine') {
    return;
  }

  for (const limit of CONSUMABLE_LIMITS) {
    if (name.includes(limit.keyword) && item.charged > limit.maxPrice) {
      addFlag(
        flags,
        'consumable_overprice',
        'high',
        `Overpriced consumable: "${item.name}" charged Rs ${item.charged.toFixed(2)}, expected ${limit.expected}.`,
        limit.maxPrice
      );
      return;
    }
  }
}

function ruleRoomRent(item, flags) {
  if (item.category !== 'room') {
    return;
  }

  if (item.charged > 5000) {
    addFlag(flags, 'room_rent_high', 'high', `Room rent is unusually high at Rs ${item.charged.toFixed(2)} per day.`, 3000);
  } else if (item.charged > 3000) {
    addFlag(flags, 'room_rent_elevated', 'medium', `Room rent is above typical range at Rs ${item.charged.toFixed(2)} per day.`, 3000);
  }
}

function ruleSuspiciousUsage(item, flags) {
  const name = normalizeText(item.name);
  if (SUSPICIOUS_KEYWORDS.some((keyword) => name.includes(keyword))) {
    addFlag(
      flags,
      'high_cost_verification',
      'low',
      `High-cost service/item detected: verify if "${item.name}" was actually administered or used.`,
      item.charged
    );
  }
}

function ruleTaxRate(item, context, flags) {
  const name = normalizeText(item.name);
  const isTaxLine = item.category === 'tax' || /(gst|tax|cgst|sgst|igst)/.test(name);
  if (!isTaxLine) {
    return;
  }

  const percentMatch = name.match(/(\d+(?:\.\d+)?)\s*%/);
  if (percentMatch) {
    const rate = Number.parseFloat(percentMatch[1]);
    if (Number.isFinite(rate) && rate > 18) {
      addFlag(
        flags,
        'tax_percent_high',
        'high',
        `Tax percentage ${rate}% exceeds common healthcare GST slabs.`,
        item.charged
      );
      return;
    }
  }

  if (context.subtotalWithoutTax > 0) {
    const inferredRate = (item.charged / context.subtotalWithoutTax) * 100;
    if (inferredRate > 28) {
      addFlag(
        flags,
        'tax_amount_high',
        'high',
        `Tax amount implies ~${inferredRate.toFixed(1)}% of non-tax subtotal; please verify slab and base amount.`,
        item.charged
      );
    } else if (inferredRate > 18) {
      addFlag(
        flags,
        'tax_amount_elevated',
        'medium',
        `Tax amount implies ~${inferredRate.toFixed(1)}%, which is higher than common healthcare GST rates.`,
        item.charged
      );
    }
  }
}

function classifySeverity(flags) {
  if (flags.some((flag) => flag.severity === 'high')) {
    return 'high';
  }
  if (flags.some((flag) => flag.severity === 'medium')) {
    return 'medium';
  }
  if (flags.some((flag) => flag.severity === 'low')) {
    return 'low';
  }
  return 'none';
}

function computeRiskScore(flags) {
  if (!flags.length) {
    return 0;
  }

  const base = flags.reduce((sum, flag) => sum + (SEVERITY_WEIGHT[flag.severity] || 0), 0);
  const combinedPenalty = Math.max(0, flags.length - 1) * 8;
  return Math.min(100, base + combinedPenalty);
}

function runFraudDetection(items) {
  const normalizedItems = (Array.isArray(items) ? items : []).map((item) => ({
    name: String(item?.item ?? item?.name ?? 'Unknown Item').trim() || 'Unknown Item',
    category: normalizeCategory(item?.category),
    charged: parseAmount(item?.price ?? item?.charged ?? item?.amount ?? 0),
  }));

  const duplicateMap = buildDuplicateMap(normalizedItems);
  const subtotalWithoutTax = normalizedItems
    .filter((item) => item.category !== 'tax')
    .reduce((sum, item) => sum + item.charged, 0);

  const context = { subtotalWithoutTax };

  return normalizedItems.map((item) => {
    const flags = [];

    ruleGSTOnMedicine(item, flags);
    ruleDuplicateCharge(item, duplicateMap, flags);
    ruleConsumablePrice(item, flags);
    ruleRoomRent(item, flags);
    ruleSuspiciousUsage(item, flags);
    ruleTaxRate(item, context, flags);

    const riskScore = computeRiskScore(flags);
    const severity = classifySeverity(flags);

    let expected = item.charged;
    for (const flag of flags) {
      if (typeof flag.expectedPrice === 'number' && flag.expectedPrice < expected) {
        expected = flag.expectedPrice;
      }
    }

    return {
      name: item.name,
      category: item.category,
      charged: item.charged,
      expected,
      status: riskScore >= 25 ? 'FLAGGED' : 'OK',
      severity,
      riskScore,
      reason: flags.length ? flags.map((flag) => flag.reason).join(' | ') : 'No issues found',
      flags,
    };
  });
}

module.exports = { runFraudDetection };
