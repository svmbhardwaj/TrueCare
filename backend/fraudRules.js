// ============================================================
// FRAUD DETECTION ENGINE — fraudRules.js
// ============================================================
// This file contains simple "if-then" rules to catch suspicious
// charges on hospital/pharmacy bills. No ML needed!
//
// HOW IT WORKS:
//   Each rule is a function that looks at a bill item and says
//   "This looks suspicious" or "This looks OK".
//   Think of it like a checklist a doctor would use.
// ============================================================

/**
 * Rule 1: GST on Medicines
 * -------------------------------------------------
 * In India, essential medicines are either GST-exempt or
 * taxed at 5%. If a bill charges 12-18% GST on medicine,
 * that's suspicious.
 */
function checkGSTRule(item) {
  const name = item.item.toLowerCase();
  const category = item.category.toLowerCase();

  // Check if the item name mentions GST/tax AND category is medicine
  if (category === 'medicine') {
    // Look for GST mentions in item name or if there's a separate GST line
    if (name.includes('gst') || name.includes('tax') || name.includes('cgst') || name.includes('sgst')) {
      return {
        flagged: true,
        reason: 'GST/tax applied on medicine — medicines are often GST-exempt or taxed at only 5%',
      };
    }
  }

  return { flagged: false };
}

/**
 * Rule 2: Duplicate Items
 * -------------------------------------------------
 * If the same item appears more than once in a bill,
 * it might be an accidental (or intentional) duplicate charge.
 */
function checkDuplicateRule(item, allItems) {
  const itemName = item.item.toLowerCase().trim();

  // Count how many times this exact item appears
  const count = allItems.filter(
    (i) => i.item.toLowerCase().trim() === itemName
  ).length;

  if (count > 1) {
    return {
      flagged: true,
      reason: `Duplicate charge — "${item.item}" appears ${count} times in the bill`,
    };
  }

  return { flagged: false };
}

/**
 * Rule 3: Consumable Price Check
 * -------------------------------------------------
 * Common consumables like gloves and syringes have known
 * market prices. If the bill charges way more, it's suspicious.
 *
 * EXPECTED PRICES (approx):
 *   Gloves: ₹5–20 per pair → flag if > ₹100
 *   Syringe: ₹10–30 each → flag if > ₹100
 *   Mask: ₹5–15 each → flag if > ₹80
 *   Cotton/Gauze: ₹10–30 → flag if > ₹100
 */
const consumableLimits = [
  { keyword: 'glove', maxPrice: 100, expected: '₹5–20 per pair' },
  { keyword: 'syringe', maxPrice: 100, expected: '₹10–30 each' },
  { keyword: 'mask', maxPrice: 80, expected: '₹5–15 each' },
  { keyword: 'cotton', maxPrice: 100, expected: '₹10–30' },
  { keyword: 'gauze', maxPrice: 100, expected: '₹10–30' },
  { keyword: 'bandage', maxPrice: 150, expected: '₹20–50' },
];

function checkConsumablePriceRule(item) {
  const name = item.item.toLowerCase();
  const price = parseFloat(item.price) || 0;
  const category = item.category.toLowerCase();

  if (category === 'consumable' || category === 'medicine') {
    for (const limit of consumableLimits) {
      if (name.includes(limit.keyword) && price > limit.maxPrice) {
        return {
          flagged: true,
          reason: `Overpriced consumable — "${item.item}" charged ₹${price}, expected ${limit.expected}`,
          expectedPrice: limit.maxPrice,
        };
      }
    }
  }

  return { flagged: false };
}

/**
 * Rule 4: Room Rent Check
 * -------------------------------------------------
 * Standard hospital rooms typically cost ₹1000–3000/day.
 * If the bill shows > ₹3000/day, it should be flagged.
 */
function checkRoomRentRule(item) {
  const category = item.category.toLowerCase();
  const price = parseFloat(item.price) || 0;

  if (category === 'room' && price > 3000) {
    return {
      flagged: true,
      reason: `High room rent — ₹${price}/day charged, standard is ₹1000–3000/day`,
      expectedPrice: 3000,
    };
  }

  return { flagged: false };
}

/**
 * Rule 5: Suspicious Charges (Verify Usage)
 * -------------------------------------------------
 * Some charges like Oxygen, ICU, ventilator are legitimate
 * but VERY expensive. We flag them so the patient can verify
 * they actually received these services.
 */
const suspiciousKeywords = [
  'oxygen',
  'icu',
  'ventilator',
  'nebuliz',
  'monitor',
  'ppe',
  'ambulance',
  'emergency',
];

function checkSuspiciousCharges(item) {
  const name = item.item.toLowerCase();

  for (const keyword of suspiciousKeywords) {
    if (name.includes(keyword)) {
      return {
        flagged: true,
        reason: `High-cost item — please verify "${item.item}" was actually used/provided`,
      };
    }
  }

  return { flagged: false };
}

// ============================================================
// MAIN FUNCTION: Run ALL rules on ALL items
// ============================================================
// This is the function we call from server.js
// It takes the array of bill items and returns each item
// with a status (OK or FLAGGED) and reason.
// ============================================================

function runFraudDetection(items) {
  return items.map((item) => {
    // Collect all flags for this item
    const flags = [];
    let expectedPrice = null;

    // Run each rule
    const gst = checkGSTRule(item);
    if (gst.flagged) flags.push(gst.reason);

    const duplicate = checkDuplicateRule(item, items);
    if (duplicate.flagged) flags.push(duplicate.reason);

    const consumable = checkConsumablePriceRule(item);
    if (consumable.flagged) {
      flags.push(consumable.reason);
      expectedPrice = consumable.expectedPrice;
    }

    const room = checkRoomRentRule(item);
    if (room.flagged) {
      flags.push(room.reason);
      expectedPrice = room.expectedPrice;
    }

    const suspicious = checkSuspiciousCharges(item);
    if (suspicious.flagged) flags.push(suspicious.reason);

    // Build the result
    return {
      name: item.item,
      category: item.category,
      charged: parseFloat(item.price) || 0,
      expected: expectedPrice || parseFloat(item.price) || 0,
      status: flags.length > 0 ? 'FLAGGED' : 'OK',
      reason: flags.length > 0 ? flags.join(' | ') : 'No issues found',
    };
  });
}

module.exports = { runFraudDetection };
