const VALID_CATEGORIES = new Set([
  'medicine',
  'room',
  'consultation',
  'procedure',
  'consumable',
  'tax',
  'other',
]);

const CATEGORY_KEYWORDS = {
  medicine: ['tablet', 'capsule', 'injection', 'syrup', 'drug', 'medicine', 'paracetamol', 'antibiotic'],
  room: ['room', 'bed', 'ward', 'icu rent', 'stay charge'],
  consultation: ['consult', 'doctor fee', 'visit fee', 'specialist fee'],
  procedure: ['surgery', 'operation', 'xray', 'x-ray', 'mri', 'ct', 'scan', 'lab', 'test', 'blood test', 'ultrasound'],
  consumable: ['glove', 'syringe', 'mask', 'cotton', 'gauze', 'bandage', 'catheter', 'canula', 'iv set'],
  tax: ['gst', 'cgst', 'sgst', 'igst', 'tax'],
};

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

function normalizeCategory(category, itemName) {
  const direct = String(category || '').trim().toLowerCase();
  if (VALID_CATEGORIES.has(direct)) {
    return direct;
  }

  const text = String(itemName || '').toLowerCase();
  for (const [candidate, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((keyword) => text.includes(keyword))) {
      return candidate;
    }
  }

  return 'other';
}

function normalizeItem(rawItem) {
  const itemName = String(rawItem?.item ?? rawItem?.name ?? rawItem?.description ?? '').trim();
  const normalizedName = itemName || 'Unknown Item';
  const charged = parseAmount(rawItem?.price ?? rawItem?.amount ?? rawItem?.charged ?? rawItem?.total ?? 0);
  const category = normalizeCategory(rawItem?.category, normalizedName);

  return {
    item: normalizedName,
    price: charged,
    category,
  };
}

function stripCodeFences(text) {
  const value = String(text || '').trim();
  if (!value.startsWith('```')) {
    return value;
  }
  return value.replace(/```json?\n?/gi, '').replace(/```/g, '').trim();
}

function extractJSONArrayString(text) {
  const cleaned = stripCodeFences(text);
  const firstArrayStart = cleaned.indexOf('[');
  const lastArrayEnd = cleaned.lastIndexOf(']');

  if (firstArrayStart >= 0 && lastArrayEnd > firstArrayStart) {
    return cleaned.slice(firstArrayStart, lastArrayEnd + 1);
  }

  return cleaned;
}

function parseLLMResponse(rawResponse) {
  const cleaned = extractJSONArrayString(rawResponse);
  let parsed = JSON.parse(cleaned);

  if (!Array.isArray(parsed) && parsed && Array.isArray(parsed.items)) {
    parsed = parsed.items;
  }

  if (!Array.isArray(parsed)) {
    throw new Error('Parsed LLM response is not an array of items');
  }

  return parsed.map(normalizeItem).filter((item) => item.item && item.price >= 0);
}

function categorizeByKeywords(name) {
  const text = String(name || '').toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((keyword) => text.includes(keyword))) {
      return category;
    }
  }
  return 'other';
}

function fallbackExtractItems(ocrText) {
  const lines = String(ocrText || '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const amountAtEndRegex = /(.*?)(?:\s|:|-)+(?:inr|rs\.?|rupees?)?\s*([0-9]{1,3}(?:,[0-9]{2,3})*(?:\.[0-9]{1,2})?|[0-9]+(?:\.[0-9]{1,2})?)\s*$/i;

  const items = [];
  for (const line of lines) {
    const match = line.match(amountAtEndRegex);
    if (!match) {
      continue;
    }

    const itemName = match[1].replace(/\s+/g, ' ').trim();
    const amount = parseAmount(match[2]);

    if (!itemName || amount <= 0) {
      continue;
    }

    items.push({
      item: itemName,
      price: amount,
      category: categorizeByKeywords(itemName),
    });
  }

  return items;
}

function buildExtractionPrompt(text) {
  return `You are a forensic medical billing extraction engine.
Extract structured line items from this OCR bill text.

Output requirements:
1) Return ONLY valid JSON array.
2) Each array element must be an object with EXACT keys:
   - item: string
   - price: number
   - category: one of [medicine, room, consultation, procedure, consumable, tax, other]
3) Do not include markdown, comments, trailing commas, or explanation.
4) Ignore totals/subtotals as line items unless they are clearly billed services.
5) If amount is unclear, use 0.

OCR TEXT:
${text}`;
}

async function extractBillItemsWithAI({ groq, text }) {
  const prompt = buildExtractionPrompt(text);

  const chatCompletion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0,
    max_tokens: 4096,
  });

  const rawLLMResponse = chatCompletion.choices?.[0]?.message?.content || '';

  try {
    const items = parseLLMResponse(rawLLMResponse);
    if (items.length > 0) {
      return {
        items,
        source: 'llm',
        warnings: [],
      };
    }

    const fallback = fallbackExtractItems(text);
    return {
      items: fallback,
      source: 'fallback',
      warnings: ['LLM returned zero items; fallback extraction used.'],
    };
  } catch (error) {
    const fallback = fallbackExtractItems(text);
    return {
      items: fallback,
      source: 'fallback',
      warnings: [`LLM parse failed (${error.message}); fallback extraction used.`],
      rawLLMResponse,
    };
  }
}

function computeExtractionMetrics(items) {
  const total = items.length;
  if (total === 0) {
    return {
      extractionQuality: 0,
      pricedItems: 0,
      categorizedItems: 0,
    };
  }

  const pricedItems = items.filter((item) => item.price > 0).length;
  const categorizedItems = items.filter((item) => item.category !== 'other').length;

  const priceCoverage = pricedItems / total;
  const categoryCoverage = categorizedItems / total;
  const extractionQuality = Math.round(((priceCoverage * 0.65) + (categoryCoverage * 0.35)) * 100);

  return {
    extractionQuality,
    pricedItems,
    categorizedItems,
  };
}

module.exports = {
  extractBillItemsWithAI,
  computeExtractionMetrics,
};
