import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  Upload, 
  Camera, 
  Activity, 
  CheckCircle2, 
  FileText, 
  AlertTriangle, 
  Clock, 
  ArrowRight,
  Zap,
  Loader2,
  X,
  Image as ImageIcon,
  ScanLine,
  Shield,
  Eye,
  FileScan,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { analyzeBillRequest } from '../../services/truebillApi';
import { getDemoTruebillResult } from '../../services/truebillDemoData';
import './BillAI.css';

const TRUEBILL_RESULT_CACHE_KEY = 'truecare:truebill:lastResult';

const RECENT_AUDITS = [
  { id: 1, name: 'Med-Invoice-992.pdf', date: 'Oct 24, 2024', hospital: 'St. Jude Medical Center', amount: '₹1,42,500', status: 'Anomaly Detected', statusColor: 'red' },
  { id: 2, name: 'Pharmacy_Receipt_4.jpg', date: 'Oct 22, 2024', hospital: 'Apollo Pharmacy Ltd.', amount: '₹4,200', status: 'Analysis Complete', statusColor: 'green' },
  { id: 3, name: 'Discharge_Summary_v2.pdf', date: 'Oct 20, 2024', hospital: 'City General Hospital', amount: '₹8,90,200', status: 'Processing...', statusColor: 'gray' },
];

const BillAI = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const objectUrlRef = useRef(null);

  // State
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const isConnectionError = typeof error === 'string' && error.toLowerCase().includes('connect');

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Handle file selection
  const handleFileSelect = useCallback((file) => {
    if (!file) return;
    const isImage = file.type.startsWith('image/');
    const isPDF = file.type === 'application/pdf';
    if (!isImage && !isPDF) {
      setError('Unsupported format — upload JPG, PNG, WEBP, or PDF');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setError('File too large — maximum 15 MB allowed');
      return;
    }
    setSelectedFile(file);
    if (isImage) {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
      const objectUrl = URL.createObjectURL(file);
      objectUrlRef.current = objectUrl;
      setPreview(objectUrl);
    } else {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
      setPreview('pdf'); // special marker for PDF
    }
    setFileInfo({
      name: file.name,
      size: formatFileSize(file.size),
      type: isPDF ? 'PDF' : file.type.split('/')[1]?.toUpperCase(),
      isPDF,
    });
    setError(null);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 1500);
  }, []);

  // Clear
  const clearFile = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setSelectedFile(null);
    setPreview(null);
    setFileInfo(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Drag handlers
  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); setDragOver(true); };
  const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setDragOver(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    if (e.dataTransfer.files?.length) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Analyze
  const analyzeBill = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);
    setLoadingStep(1);

    try {
      const stepTimers = [
        setTimeout(() => setLoadingStep(2), 2500),
        setTimeout(() => setLoadingStep(3), 6000),
      ];

      const data = await analyzeBillRequest({ file: selectedFile });

      sessionStorage.setItem(
        TRUEBILL_RESULT_CACHE_KEY,
        JSON.stringify({
          result: data,
          billImage: preview,
          isDemo: false,
          savedAt: Date.now(),
        })
      );

      stepTimers.forEach(clearTimeout);
      setLoadingStep(4);

      setTimeout(() => {
        navigate('/truebill/result', { state: { result: data, billImage: preview } });
      }, 800);

    } catch (err) {
      if (err.message.includes('fetch') || err.message.includes('NetworkError')) {
        setError('We could not reach the audit engine. Start backend on port 5000 and retry.');
      } else {
        setError(err.message);
      }
      setLoading(false);
      setLoadingStep(0);
    }
  };

  const openDemoReport = () => {
    setError(null);
    setLoading(true);
    setLoadingStep(1);

    setTimeout(() => setLoadingStep(2), 700);
    setTimeout(() => setLoadingStep(3), 1400);
    setTimeout(() => {
      setLoadingStep(4);
      const demoPayload = {
        result: getDemoTruebillResult(),
        billImage: null,
        isDemo: true,
        savedAt: Date.now(),
      };
      sessionStorage.setItem(TRUEBILL_RESULT_CACHE_KEY, JSON.stringify(demoPayload));
      navigate('/truebill/result', {
        state: demoPayload,
      });
    }, 1900);
  };

  // Loading step labels
  const loadingSteps = [
    { icon: Upload, label: 'Uploading bill image...', sub: 'Securing your data' },
    { icon: ScanLine, label: 'Extracting text via OCR...', sub: 'Reading every line item' },
    { icon: Sparkles, label: 'AI fraud analysis running...', sub: 'Checking 40+ anomaly patterns' },
    { icon: CheckCircle2, label: 'Analysis complete!', sub: 'Preparing your report' },
  ];

  return (
    <div className="bill-ai-page page-container">
      <Navbar />
      <div className="bill-ai-container">

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <span className="badge-ai">
              <Zap size={14} fill="currentColor" /> AI-POWERED AUDIT ENGINE
            </span>
            <h1 className="hero-title">Your Bill, <span className="text-blue">Verified</span>.</h1>
            <p className="hero-subtitle">
              Upload your hospital or pharmacy bills. Our Forensic Auditing engine identifies errors, overcharges, and GST anomalies in seconds.
            </p>

            <div className="feature-steps">
              <div className="step-card">
                <div className="step-icon bg-blue-soft"><Camera size={20} /></div>
                <div>
                  <h4>Snap a Photo</h4>
                  <p>Clear image of the entire bill.</p>
                </div>
              </div>
              <div className="step-card">
                <div className="step-icon bg-purple-soft"><Activity size={20} /></div>
                <div>
                  <h4>AI Analysis</h4>
                  <p>Scanning for 40+ error types.</p>
                </div>
              </div>
              <div className="step-card">
                <div className="step-icon bg-green-soft"><CheckCircle2 size={20} /></div>
                <div>
                  <h4>Get True Bill</h4>
                  <p>Receive your corrected report.</p>
                </div>
              </div>
            </div>
          </div>

          {/* ============ UPLOAD SECTION ============ */}
          <div className="upload-box-container">

            {/* ---- LOADING STATE ---- */}
            {loading ? (
              <div className="upload-box upload-loading-state">
                <div className="loading-progress-ring">
                  <svg viewBox="0 0 80 80">
                    <circle className="ring-bg" cx="40" cy="40" r="34" />
                    <circle className="ring-fill" cx="40" cy="40" r="34"
                      style={{ strokeDashoffset: 214 - (214 * Math.min(loadingStep, 4) / 4) }} />
                  </svg>
                  <div className="ring-inner-icon">
                    <FileScan size={28} />
                  </div>
                </div>

                <div className="loading-text-area">
                  <h3>Analyzing your bill</h3>
                  <p className="loading-subtitle">This usually takes 15–30 seconds</p>
                </div>

                <div className="loading-pipeline">
                  {loadingSteps.map((step, i) => {
                    const StepIcon = step.icon;
                    const isActive = loadingStep === i + 1;
                    const isDone = loadingStep > i + 1;
                    return (
                      <div key={i} className={`pipeline-step ${isDone ? 'done' : isActive ? 'active' : 'pending'}`}>
                        <div className="pipeline-icon">
                          {isDone ? <CheckCircle2 size={18} /> : isActive ? <Loader2 size={18} className="spin-icon" /> : <StepIcon size={18} />}
                        </div>
                        <div className="pipeline-text">
                          <span className="pipeline-label">{step.label}</span>
                          <span className="pipeline-sub">{step.sub}</span>
                        </div>
                        {i < loadingSteps.length - 1 && <div className={`pipeline-connector ${isDone ? 'filled' : ''}`} />}
                      </div>
                    );
                  })}
                </div>
              </div>

            ) : preview ? (
              /* ---- PREVIEW STATE ---- */
              <div className="upload-box upload-preview-state">
                <div className="preview-card">
                  <div className="preview-image-wrap">
                    {fileInfo?.isPDF ? (
                      <div className="pdf-preview-placeholder">
                        <FileText size={48} />
                        <span>PDF Document</span>
                      </div>
                    ) : (
                      <img src={preview} alt="Bill preview" className="preview-img" />
                    )}
                    <div className="preview-overlay">
                      <Eye size={24} />
                    </div>
                    <button className="preview-remove" onClick={clearFile} title="Remove file">
                      <X size={14} />
                    </button>
                    {uploadSuccess && (
                      <div className="upload-success-toast">
                        <CheckCircle2 size={14} /> Uploaded
                      </div>
                    )}
                  </div>

                  <div className="preview-file-info">
                    <div className="file-info-icon">
                      <ImageIcon size={18} />
                    </div>
                    <div className="file-info-text">
                      <p className="file-info-name">{fileInfo?.name}</p>
                      <p className="file-info-meta">
                        <span>{fileInfo?.type}</span>
                        <span className="meta-dot">•</span>
                        <span>{fileInfo?.size}</span>
                      </p>
                    </div>
                    <button className="change-file-btn" onClick={() => fileInputRef.current?.click()}>
                      <RefreshCw size={14} /> Change
                    </button>
                  </div>
                </div>

                <button className="analyze-cta" onClick={analyzeBill}>
                  <span className="cta-glow" />
                  <Zap size={18} fill="currentColor" />
                  <span>Analyze Now</span>
                  <ArrowRight size={16} />
                </button>

                {error && (
                  <div className="inline-error-card">
                    <AlertTriangle size={16} />
                    <div className="inline-error-content">
                      <p className="error-title">{error}</p>
                      {isConnectionError && (
                        <p className="error-help-text">Run backend service first, then tap retry.</p>
                      )}
                      <div className="inline-error-actions">
                        <button className="inline-error-btn" onClick={analyzeBill}>Retry</button>
                        <button className="inline-error-btn dismiss" onClick={() => setError(null)}>Dismiss</button>
                      </div>
                    </div>
                  </div>
                )}

                <p className="analyze-disclaimer">
                  <Shield size={12} /> Your data is processed locally and never stored
                </p>
              </div>

            ) : (
              /* ---- EMPTY / UPLOAD STATE ---- */
              <div
                className={`upload-box upload-empty-state ${dragOver ? 'drag-active' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className={`upload-dropzone-icon ${dragOver ? 'icon-active' : ''}`}>
                  <div className="dropzone-ring" />
                  <Upload size={28} />
                </div>

              <div className="upload-text-group">
                  <h3>{dragOver ? 'Drop your bill here' : 'Upload Your Bill'}</h3>
                  <p>Drag and drop, or click anywhere to browse</p>
                </div>

                <div className="upload-format-tags">
                  <span className="format-tag">JPG</span>
                  <span className="format-tag">PNG</span>
                  <span className="format-tag">WEBP</span>
                  <span className="format-tag format-tag-pdf">PDF</span>
                  <span className="format-divider">•</span>
                  <span className="format-limit">Max 15 MB</span>
                </div>

                <button
                  className="upload-select-btn"
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                >
                  <Upload size={16} /> Select File
                </button>

                <button
                  className="demo-report-btn"
                  onClick={(e) => { e.stopPropagation(); openDemoReport(); }}
                >
                  <Sparkles size={16} /> Try Demo Report
                </button>

                {error && (
                  <div className="upload-error-card" onClick={(e) => e.stopPropagation()}>
                    <AlertTriangle size={16} />
                    <div>
                      <p className="error-title">{error}</p>
                      {isConnectionError && <p className="error-help-text">Tip: run backend then use Retry.</p>}
                      {isConnectionError && (
                        <button className="error-dismiss" onClick={(e) => { e.stopPropagation(); analyzeBill(); }}>
                          Retry
                        </button>
                      )}
                      <button className="error-dismiss" onClick={(e) => { e.stopPropagation(); setError(null); }}>
                        Dismiss
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg,application/pdf"
              style={{ display: 'none' }}
              onChange={(e) => { handleFileSelect(e.target.files[0]); e.target.value = ''; }}
            />
          </div>
        </section>

        {/* Tech Section */}
        <section className="tech-section">
          <div className="tech-content">
            <h2>Forensic Auditing Technology</h2>
            <div className="tech-item-list">
              <div className="tech-item border-blue">
                <h3>2025 GST Reform Engine</h3>
                <p>Our system is updated in real-time with the latest GST regulations. We cross-reference HSN codes and tax brackets to ensure hospitals aren't over-taxing pharmaceutical supplies.</p>
              </div>
              <div className="tech-item border-green">
                <h3>Anatomic Coding Verification</h3>
                <p>AI models trained on millions of clinical records detect "Upcoding"—when a simple procedure is billed as a complex surgery.</p>
              </div>
            </div>
          </div>
          <div className="tech-visual">
            <div className="abstract-graphic"></div>
          </div>
        </section>

        {/* Recent Audits */}
        <section className="audits-section">
          <div className="section-header">
            <h2>Recent Audits</h2>
            <p>Track your submitted bills and recovery status.</p>
            <Link to="/history" className="view-history">View Full History <ArrowRight size={14} /></Link>
          </div>
          <div className="audit-table-container">
            <table className="audit-table">
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Date Uploaded</th>
                  <th>Hospital</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_AUDITS.map((audit) => (
                  <tr key={audit.id}>
                    <td className="doc-name">
                      <div className="file-icon-bg">
                        {audit.name.endsWith('.pdf') ? <FileText size={16} color="#ef4444" /> : <Camera size={16} color="#3b82f6" />}
                      </div>
                      <div>
                        <p className="file-title">{audit.name}</p>
                        <p className="file-meta">2.4 MB</p>
                      </div>
                    </td>
                    <td>{audit.date}</td>
                    <td>{audit.hospital}</td>
                    <td className="amount-cell">{audit.amount}</td>
                    <td>
                      <span className={`status-badge ${audit.statusColor}`}>
                        {audit.status === 'Anomaly Detected' && <AlertTriangle size={12} />}
                        {audit.status === 'Analysis Complete' && <CheckCircle2 size={12} />}
                        {audit.status === 'Processing...' && <Clock size={12} />}
                        {audit.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BillAI;
