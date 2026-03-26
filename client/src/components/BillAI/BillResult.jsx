import React, { useState } from 'react';
import { 
  AlertCircle, 
  CheckCircle, 
  Download, 
  Scale, 
  Gavel, 
  ArrowLeft,
  Info,
  ShieldCheck,
  Truck,
  Leaf,
  Bell,
  UserCircle,
  FileText,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './BillResult.css';

const BillResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showOCR, setShowOCR] = useState(false);

  // Get real data from navigation state (sent from BillAI page)
  const result = location.state?.result;
  const billImage = location.state?.billImage;

  // If no data (user navigated here directly), show fallback
  if (!result) {
    return (
      <div className="bill-result-page">
        <Navbar />
        <main className="max-7xl">
          <section className="summary-section">
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <AlertCircle size={48} color="var(--slate-gray)" style={{ marginBottom: '16px' }} />
              <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '1.5rem', marginBottom: '12px' }}>
                No Bill Data Found
              </h2>
              <p style={{ color: '#434655', marginBottom: '24px' }}>
                Please upload a bill image first to see the analysis results.
              </p>
              <Link to="/bill-ai" className="btn-report btn-tc-solid" style={{ display: 'inline-flex', textDecoration: 'none' }}>
                <FileText size={18} /> Go to Bill Upload
              </Link>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // Extract data from API response
  const { items, summary, ocrText } = result;
  const flaggedItems = items?.filter(i => i.status === 'FLAGGED') || [];
  const okItems = items?.filter(i => i.status === 'OK') || [];

  // Calculate total savings
  const totalSavings = items?.reduce((sum, item) => {
    if (item.status === 'FLAGGED' && item.charged !== item.expected) {
      return sum + (item.charged - item.expected);
    }
    return sum;
  }, 0) || 0;

  // Map API items to display format
  const lineItems = items?.map(item => ({
    description: item.name,
    meta: item.reason,
    hospitalCharge: `₹${item.charged?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
    truecareCharge: item.status === 'FLAGGED' && item.expected !== item.charged
      ? `₹${item.expected?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
      : `₹${item.charged?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
    status: item.status === 'FLAGGED' ? item.reason?.split(' — ')[0]?.toUpperCase() || 'ANOMALY DETECTED' : 'FAIR MATCH',
    statusColor: item.status === 'FLAGGED' ? 'red' : 'green',
    hasAlert: item.status === 'FLAGGED',
    hasHeart: item.status === 'OK',
    type: item.status === 'FLAGGED' ? 'anomaly' : 'normal',
    category: item.category
  })) || [];

  return (
    <div className="bill-result-page">
      <Navbar />

      <main className="max-7xl">
        {/* Back Button */}
        <div style={{ marginTop: '1.5rem' }}>
          <button
            onClick={() => navigate('/bill-ai')}
            className="back-btn"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--hunter-green)', fontWeight: 600, fontSize: '0.9rem',
              fontFamily: 'inherit'
            }}
          >
            <ArrowLeft size={18} /> Back to Upload
          </button>
        </div>

        {/* Summary Header Section */}
        <section className="summary-section">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'flex-end' }}>
            <div>
              <div className="audit-badge">
                <AlertCircle size={14} /> FORENSIC AUDIT COMPLETE
              </div>
              {flaggedItems.length > 0 ? (
                <>
                  <h1 className="audit-h1">
                    Anomaly Detected: <span className="text-coral">
                      {flaggedItems.length} suspicious {flaggedItems.length === 1 ? 'item' : 'items'}
                    </span> found.
                  </h1>
                  <p style={{ marginTop: '1rem', color: '#434655', fontSize: '1.125rem', lineHeight: '1.6' }}>
                    Our AI has audited your bill against the <strong>National Pharmaceutical Pricing Authority (NPPA)</strong> guidelines and state-mandated healthcare price caps.
                  </p>
                </>
              ) : (
                <>
                  <h1 className="audit-h1">
                    <span style={{ color: 'var(--hunter-green)' }}>All Clear!</span> No anomalies detected.
                  </h1>
                  <p style={{ marginTop: '1rem', color: '#434655', fontSize: '1.125rem', lineHeight: '1.6' }}>
                    Your bill has been verified against NPPA guidelines. All charges appear to be within normal ranges.
                  </p>
                </>
              )}
            </div>
            
            <div className="savings-card">
              <p className="savings-label">Analysis Summary</p>
              <p className="savings-val">
                {summary?.totalItems || 0} items analyzed
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#16a34a', fontSize: '0.85rem', fontWeight: 600 }}>
                  <CheckCircle size={14} /> {summary?.okItems || 0} OK
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ef4444', fontSize: '0.85rem', fontWeight: 600 }}>
                  <AlertTriangle size={14} /> {summary?.flaggedItems || 0} Flagged
                </div>
              </div>
              {totalSavings > 0 && (
                <div style={{ marginTop: '0.75rem', padding: '8px 12px', background: 'rgba(239,68,68,0.08)', borderRadius: '8px' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ef4444' }}>
                    Potential overcharge: ₹{totalSavings.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Audit Transparency Table */}
        <section style={{ marginBottom: '3rem' }}>
          <div className="audit-table-wrapper">
            <div className="table-header">
              <div style={{ gridColumn: 'span 4' }}>Line Item & Description</div>
              <div style={{ gridColumn: 'span 2' }}>Category</div>
              <div style={{ gridColumn: 'span 2' }}>Hospital Charges</div>
              <div style={{ gridColumn: 'span 4' }}>TrueCare Assessment</div>
            </div>

            <div className="audit-rows">
              {lineItems.map((item, index) => (
                <div key={index} className={`audit-row ${item.type === 'anomaly' ? 'row-anomaly' : 'row-normal'}`}>
                  <div style={{ gridColumn: 'span 4' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <p className="item-name">{item.description}</p>
                      {item.hasHeart && <span style={{ fontSize: '10px', background: '#dcfce7', color: '#15803d', padding: '2px 6px', borderRadius: '4px' }}>💚</span>}
                      {item.hasAlert && <Info size={16} className="text-coral" />}
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#434655', marginTop: '4px', maxWidth: '320px', lineHeight: '1.4' }}>
                      {item.meta}
                    </p>
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <span className={`category-tag category-${item.category?.toLowerCase()}`}>
                      {item.category}
                    </span>
                  </div>
                  
                  <div style={{ gridColumn: 'span 2' }}>
                    <p className={`font-medium ${item.type === 'anomaly' ? 'strike-coral' : ''}`}>
                      {item.hospitalCharge}
                    </p>
                  </div>

                  <div style={{ gridColumn: 'span 4' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontWeight: 900, fontSize: '1.25rem', color: item.type === 'anomaly' ? 'var(--soft-coral)' : 'inherit' }}>
                        {item.truecareCharge}
                      </p>
                      <p style={{ fontSize: '10px', fontWeight: 700, color: item.statusColor === 'red' ? 'var(--soft-coral)' : 'var(--hunter-green)', textTransform: 'uppercase', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {item.type === 'anomaly' ? <AlertTriangle size={12} /> : <CheckCircle2 size={12} />}
                        {item.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals Footer */}
            <div className="grid grid-cols-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', padding: '2.5rem 2rem', background: 'rgba(225, 226, 237, 0.3)', borderTop: '1px solid rgba(115,118,134,0.2)' }}>
              <div style={{ gridColumn: 'span 6' }}>
                <p style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '1.25rem' }}>Audit Totals</p>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#434655', textTransform: 'uppercase', marginBottom: '4px' }}>Total Billed</p>
                <p style={{ fontFamily: 'Manrope', fontWeight: 900, fontSize: '1.5rem' }}>
                  ₹{(summary?.totalCharged || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div style={{ gridColumn: 'span 4' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#434655', textTransform: 'uppercase', marginBottom: '4px' }}>Items Analyzed</p>
                <p style={{ fontFamily: 'Manrope', fontWeight: 900, fontSize: '1.875rem', color: 'var(--hunter-green)' }}>
                  {summary?.totalItems || 0}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* OCR Text (Collapsible) */}
        <div className="ocr-section" style={{ marginBottom: '2rem' }}>
          <div
            className="ocr-toggle"
            onClick={() => setShowOCR(!showOCR)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1rem 1.5rem', background: 'white', borderRadius: showOCR ? '12px 12px 0 0' : '12px',
              border: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
              <FileText size={18} /> Raw OCR Text
            </div>
            {showOCR ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
          {showOCR && (
            <div style={{
              padding: '1.5rem', background: '#fafafa', border: '1px solid rgba(0,0,0,0.05)',
              borderTop: 'none', borderRadius: '0 0 12px 12px', maxHeight: '300px', overflowY: 'auto'
            }}>
              <pre style={{ fontFamily: "'Courier New', monospace", fontSize: '0.85rem', lineHeight: '1.6', color: '#434655', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {ocrText || 'No OCR text available'}
              </pre>
            </div>
          )}
        </div>

        {/* Legal Warning */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.6)', borderRadius: '0.75rem', border: '1px solid rgba(63,93,62,0.1)', marginBottom: '3rem' }}>
          <ShieldCheck size={32} color="var(--hunter-green)" />
          <div>
            <p style={{ fontWeight: 700 }}>Transparency Guarantee</p>
            <p style={{ fontSize: '0.75rem', color: '#434655' }}>This report is prepared using real-time data from the NPPA and Consumer Protection Act (2019) guidelines. It is admissible as primary evidence in consumer grievance filings.</p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="action-bar-fixed">
          <div className="max-7xl" style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button className="btn-report btn-tc-soft" onClick={() => navigate('/bill-ai')}>
              <FileText size={18} /> Analyze Another
            </button>
            <button className="btn-report btn-tc-soft">
              <Scale size={18} /> File Grievance (CGRMS)
            </button>
            <button className="btn-report btn-tc-solid">
              <Gavel size={18} /> Generate Legal Notice
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BillResult;
