// ============================================================
// TRUEBILL BACKEND — server.js
// ============================================================
// This is the MAIN file of our backend. It creates a web server
// that listens for requests from our React frontend.
//
// WHAT THIS FILE DOES:
//   1. Starts an Express server on port 5000
//   2. Handles image uploads (POST /upload)
//   3. Runs OCR to extract text from images (POST /ocr)
//   4. Sends text to LLM for structuring (POST /analyze)
//   5. Full pipeline: upload → OCR → LLM → fraud check (POST /analyze-bill)
//
// HOW TO RUN:
//   cd d:\India Innovates'26\truebill\backend
//   node server.js
// ============================================================

// --- Load environment variables from .env file ---
require('dotenv').config();

// --- Import libraries ---
const express = require('express');       // Web server framework
const multer = require('multer');         // Handles file uploads
const cors = require('cors');             // Allows frontend to talk to backend
const path = require('path');             // Helps with file paths
const fs = require('fs');                 // Read/write files
const Tesseract = require('tesseract.js'); // OCR - reads text from images
const Groq = require('groq-sdk');         // LLM API - structures text into JSON
const pdfParse = require('pdf-parse');    // Extracts text from PDF files

// --- Import our fraud detection rules ---
const { runFraudDetection } = require('./fraudRules');
const { extractBillItemsWithAI, computeExtractionMetrics } = require('./analysisEngine');

// ============================================================
// SETUP
// ============================================================

const app = express();
const PORT = process.env.PORT || 5000;

// Allow frontend (running on different port) to make requests
app.use(cors());

// Allow JSON in request body
app.use(express.json());

// --- Configure file upload ---
// multer saves uploaded files to the "uploads" folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Add timestamp to filename to avoid conflicts
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Allow image files AND PDFs
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPG, PNG, WEBP) and PDFs are allowed!'));
    }
  },
  limits: { fileSize: 15 * 1024 * 1024 }, // Max 15MB (PDFs can be larger)
});

// --- Setup Groq LLM client ---
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ============================================================
// ENDPOINT 1: GET /test
// ============================================================
// Simple health check — just to make sure the server is running.
// Test it by opening http://localhost:5000/test in your browser.

app.get('/test', (req, res) => {
  res.json({
    status: 'ok',
    message: '🎉 TrueBill backend is running!',
    time: new Date().toLocaleString(),
  });
});

// ============================================================
// ENDPOINT 2: POST /upload
// ============================================================
// Accepts an image file and saves it to the "uploads" folder.
// The frontend sends the image here first.

app.post('/upload', upload.single('billImage'), (req, res) => {
  // "billImage" is the field name the frontend uses when sending the file

  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded!' });
  }

  res.json({
    message: '✅ Image uploaded successfully!',
    filename: req.file.filename,
    path: req.file.path,
  });
});

// ============================================================
// ENDPOINT 3: POST /ocr
// ============================================================
// Takes a filename (from /upload response) and runs OCR on it.
// OCR = Optical Character Recognition = reads text from images.
//
// HOW TESSERACT WORKS:
//   1. You give it an image
//   2. It scans every pixel looking for letters and numbers
//   3. It returns the text it found
//
// This is like a photocopier, but instead of copying the image,
// it copies only the TEXT from the image.

app.post('/ocr', async (req, res) => {
  try {
    const { filename } = req.body;

    if (!filename) {
      return res.status(400).json({ error: 'Please provide a filename!' });
    }

    const filePath = path.join(__dirname, 'uploads', filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found! Upload it first.' });
    }

    console.log('🔍 Running OCR on:', filename);

    // Run Tesseract OCR — this may take 5-15 seconds
    const result = await Tesseract.recognize(filePath, 'eng', {
      logger: (info) => {
        if (info.status === 'recognizing text') {
          console.log(`   OCR Progress: ${(info.progress * 100).toFixed(0)}%`);
        }
      },
    });

    const extractedText = result.data.text;
    console.log('✅ OCR complete! Extracted', extractedText.length, 'characters');

    res.json({
      message: '✅ OCR completed!',
      text: extractedText,
    });
  } catch (error) {
    console.error('❌ OCR Error:', error.message);
    res.status(500).json({ error: 'OCR failed: ' + error.message });
  }
});

// ============================================================
// ENDPOINT 4: POST /analyze
// ============================================================
// Takes raw OCR text and sends it to the LLM (Groq).
// The LLM reads the messy text and converts it into a clean
// structured JSON array.
//
// WHAT THE LLM DOES:
//   Input:  "Paracetamol 500mg ... Rs 50 ... Room charges ... Rs 2500"
//   Output: [{ item: "Paracetamol 500mg", price: 50, category: "medicine" }, ...]
//
// Think of the LLM as a very smart assistant who can read
// messy handwriting and organize it into a neat table.

app.post('/analyze', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Please provide OCR text!' });
    }

    console.log('🤖 Running hybrid extraction (GenAI + deterministic fallback)...');
    const extraction = await extractBillItemsWithAI({ groq, text });
    const metrics = computeExtractionMetrics(extraction.items);

    console.log('✅ Extraction complete!', extraction.items.length, 'items found');

    res.json({
      message: '✅ Bill analyzed!',
      items: extraction.items,
      extraction: {
        source: extraction.source,
        warnings: extraction.warnings,
        ...metrics,
      },
    });
  } catch (error) {
    console.error('❌ LLM Error:', error.message);
    res.status(500).json({ error: 'LLM analysis failed: ' + error.message });
  }
});

// ============================================================
// ENDPOINT 5: POST /analyze-bill  (⭐ THE MAIN ONE)
// ============================================================
// This is the FULL PIPELINE that the frontend uses.
// It does everything in one go:
//   1. Upload image
//   2. Run OCR → get text
//   3. Send to LLM → get structured items
//   4. Run fraud detection → flag suspicious items
//   5. Return clean result
//
// This is like an assembly line in a factory:
//   Raw image → Text → Structured Data → Checked Data → Result

app.post('/analyze-bill', upload.single('billImage'), async (req, res) => {
  try {
    // STEP 1: Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded!' });
    }

    const filePath = path.join(__dirname, req.file.path);
    const isPDF = req.file.mimetype === 'application/pdf';
    console.log('\n========================================');
    console.log('📋 TRUEBILL ANALYSIS STARTED');
    console.log('========================================');
    console.log('📁 File:', req.file.filename);
    console.log('📄 Type:', isPDF ? 'PDF' : 'Image');

    // STEP 2: Extract text — PDF uses pdf-parse, images use Tesseract OCR
    let ocrText;
    if (isPDF) {
      console.log('\n📄 Step 1/3: Extracting text from PDF...');
      const pdfBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(pdfBuffer);
      ocrText = pdfData.text;
      console.log('✅ PDF text extracted!', ocrText.length, 'characters');
    } else {
      console.log('\n🔍 Step 1/3: Running OCR on image...');
      const ocrResult = await Tesseract.recognize(filePath, 'eng', {
        logger: (info) => {
          if (info.status === 'recognizing text') {
            console.log(`   OCR Progress: ${(info.progress * 100).toFixed(0)}%`);
          }
        },
      });
      ocrText = ocrResult.data.text;
      console.log('✅ OCR done!', ocrText.length, 'characters extracted');
    }

    // STEP 3: Extract items via hybrid AI pipeline
    console.log('\n🤖 Step 2/3: Extracting line items with hybrid AI...');
    const extraction = await extractBillItemsWithAI({ groq, text: ocrText });
    const items = extraction.items;

    if (!items.length) {
      return res.status(422).json({
        error: 'No bill line items could be extracted from this document',
        ocrText,
        extraction,
      });
    }

    console.log('✅ Extraction found', items.length, 'items');

    // STEP 4: Run fraud detection
    console.log('\n🔎 Step 3/3: Running fraud detection...');
    const results = runFraudDetection(items);

    const flaggedCount = results.filter((r) => r.status === 'FLAGGED').length;
    const totalCharged = results.reduce((sum, r) => sum + r.charged, 0);
    const totalRiskScore = results.reduce((sum, r) => sum + (r.riskScore || 0), 0);
    const avgRiskScore = results.length ? Number((totalRiskScore / results.length).toFixed(2)) : 0;
    const extractionMetrics = computeExtractionMetrics(items);

    console.log('✅ Fraud check done!');
    console.log(`   📊 ${results.length} items analyzed`);
    console.log(`   🚩 ${flaggedCount} items flagged`);
    console.log(`   💰 Total charged: ₹${totalCharged}`);
    console.log('========================================\n');

    // Clean up uploaded file (optional — saves disk space)
    // fs.unlinkSync(filePath);

    // STEP 5: Return final result
    res.json({
      message: '✅ Bill analysis complete!',
      summary: {
        totalItems: results.length,
        flaggedItems: flaggedCount,
        okItems: results.length - flaggedCount,
        totalCharged,
        avgRiskScore,
        extractionQuality: extractionMetrics.extractionQuality,
      },
      extraction: {
        source: extraction.source,
        warnings: extraction.warnings,
        ...extractionMetrics,
      },
      ocrText,
      items: results,
    });
  } catch (error) {
    console.error('❌ Pipeline Error:', error.message);
    res.status(500).json({ error: 'Analysis failed: ' + error.message });
  }
});

// ============================================================
// START THE SERVER
// ============================================================

app.listen(PORT, () => {
  console.log('');
  console.log('========================================');
  console.log('  🏥 TrueBill Backend is LIVE!');
  console.log(`  🌐 http://localhost:${PORT}`);
  console.log(`  🧪 Test: http://localhost:${PORT}/test`);
  console.log('========================================');
  console.log('');
});
