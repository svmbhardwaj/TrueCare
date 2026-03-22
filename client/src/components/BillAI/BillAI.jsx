import React from 'react';
import { 
  Upload, 
  Camera, 
  Activity, 
  CheckCircle2, 
  FileText, 
  AlertTriangle, 
  Clock, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './BillAI.css';

const BillAI = () => {
  const recentAudits = [
    {
      id: 1,
      name: 'Med-Invoice-992.pdf',
      date: 'Oct 24, 2024',
      hospital: 'St. Jude Medical Center',
      amount: '₹1,42,500',
      status: 'Anomaly Detected',
      statusColor: 'red'
    },
    {
      id: 2,
      name: 'Pharmacy_Receipt_4.jpg',
      date: 'Oct 22, 2024',
      hospital: 'Apollo Pharmacy Ltd.',
      amount: '₹4,200',
      status: 'Analysis Complete',
      statusColor: 'green'
    },
    {
      id: 3,
      name: 'Discharge_Summary_v2.pdf',
      date: 'Oct 20, 2024',
      hospital: 'City General Hospital',
      amount: '₹8,90,200',
      status: 'Processing...',
      statusColor: 'gray'
    }
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
                  <p>Clear image of the entire page.</p>
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

          <div className="upload-box-container">
            <div className="upload-box">
              <div className="upload-icon-wrapper">
                <Upload size={32} className="text-white" />
              </div>
              <h3>Upload Your Bill</h3>
              <p>Drag and drop PDF, JPG, or PNG files here. Max size: 10MB.</p>
              
              <Link to="/bill-result" className="analyze-btn-link">
                <button className="btn-primary-teal">
                  Analyze Now <Zap size={16} fill="white" />
                </button>
              </Link>
              
              <button className="btn-ghost">Select from Device</button>
            </div>
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
            <a href="#" className="view-history">View Full History <ArrowRight size={14} /></a>
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
                {recentAudits.map((audit) => (
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
