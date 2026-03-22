import React from 'react';
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
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './BillResult.css';

const BillResult = () => {
  const lineItems = [
    {
      description: 'Standard Consultation Fee',
      meta: 'General Physician - Dr. A. Sharma',
      hospitalCharge: '₹1,200.00',
      truecareCharge: '₹1,200.00',
      status: 'FAIR MATCH',
      statusColor: 'green',
      hasHeart: true,
      type: 'normal'
    },
    {
      description: 'Civic Savings',
      meta: 'Because you used the new Super-Specialty Bypass Bridge, you arrived 10 mins earlier, avoiding a ₹2,000 Emergency Surcharge.',
      hospitalCharge: '₹2,000.00',
      truecareCharge: '₹0.00',
      status: 'URBAN EFFICIENCY CREDIT',
      statusColor: 'green',
      type: 'civic'
    },
    {
      description: 'Ibrance 125mg (Palbociclib)',
      meta: 'Life-saving Medication (Surcharge: 12% GST Applied)',
      hospitalCharge: '₹8,400.00',
      truecareCharge: '₹7,500.00',
      status: '0% GST VIOLATION DETECTED',
      statusColor: 'red',
      hasAlert: true,
      type: 'anomaly'
    },
    {
      description: 'Consumables Pack (Glove/Mask)',
      meta: 'Surgical Safety Equipment',
      hospitalCharge: '₹6,200.00',
      truecareCharge: '₹1,100.00',
      status: 'MRP INFLATION DETECTED',
      statusColor: 'red',
      hasAlert: true,
      type: 'anomaly'
    },
    {
      description: 'Room Rent - Semi Private',
      meta: '2 Nights (Feb 14 - Feb 16)',
      hospitalCharge: '₹12,000.00',
      truecareCharge: '₹12,000.00',
      status: 'FAIR MATCH',
      statusColor: 'green',
      type: 'normal'
    }
  ];

  return (
    <div className="bill-result-page">
      <Navbar />

      <main className="max-7xl">
        {/* Summary Header Section */}
        <section className="summary-section">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'flex-end' }}>
            <div>
              <div className="audit-badge">
                <AlertCircle size={14} /> FORENSIC AUDIT COMPLETE
              </div>
              <h1 className="audit-h1">
                Anomaly Detected: <span className="text-coral">₹16,500</span> overcharge identified.
              </h1>
              <p style={{ marginTop: '1rem', color: '#434655', fontSize: '1.125rem', lineHeight: '1.6' }}>
                Our AI has audited your bill against the <strong>National Pharmaceutical Pricing Authority (NPPA)</strong> guidelines and state-mandated healthcare price caps.
              </p>
            </div>
            
            <div className="savings-card">
              <p className="savings-label">Total Savings Identified</p>
              <p className="savings-val">₹16,500.00</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', color: 'rgba(63,93,62,0.8)', fontSize: '0.75rem', fontWeight: 600 }}>
                <CheckCircle size={14} /> Legally enforceable refund claim
              </div>
            </div>
          </div>
        </section>

        {/* Audit Transparency Table */}
        <section style={{ marginBottom: '3rem' }}>
          <div className="audit-table-wrapper">
            <div className="table-header">
              <div style={{ gridColumn: 'span 5' }}>Line Item & Description</div>
              <div style={{ gridColumn: 'span 3' }}>Hospital Charges</div>
              <div style={{ gridColumn: 'span 4' }}>TrueCare Assessment</div>
            </div>

            <div className="audit-rows">
              {lineItems.map((item, index) => (
                <div key={index} className={`audit-row ${item.type === 'civic' ? 'row-civic' : item.type === 'anomaly' ? 'row-anomaly' : 'row-normal'}`}>
                  <div style={{ gridColumn: 'span 5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <p className="item-name">{item.description}</p>
                      {item.hasHeart && <span style={{ fontSize: '10px', background: '#dcfce7', color: '#15803d', padding: '2px 6px', borderRadius: '4px' }}>💚</span>}
                      {item.type === 'civic' && <Truck size={18} color="var(--hunter-green)" />}
                      {item.hasAlert && <Info size={16} className="text-coral" />}
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#434655', marginTop: '4px', fontStyle: item.type === 'civic' ? 'italic' : 'normal' }}>
                      {item.meta}
                    </p>
                  </div>
                  
                  <div style={{ gridColumn: 'span 3' }}>
                    <p className={`font-medium ${item.type !== 'normal' ? 'strike-coral' : ''}`}>
                      {item.hospitalCharge}
                    </p>
                  </div>

                  <div style={{ gridColumn: 'span 4' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontWeight: 900, fontSize: '1.25rem', color: item.type === 'civic' ? 'var(--hunter-green)' : 'inherit' }}>
                        {item.truecareCharge}
                      </p>
                      <p style={{ fontSize: '10px', fontWeight: 700, color: item.statusColor === 'red' ? 'var(--soft-coral)' : 'var(--hunter-green)', textTransform: 'uppercase', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {item.type === 'civic' && <Leaf size={12} />}
                        {item.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals Footer */}
            <div className="grid grid-cols-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', padding: '2.5rem 2rem', background: 'rgba(225, 226, 237, 0.3)', borderTop: '1px solid rgba(115,118,134,0.2)' }}>
              <div style={{ gridColumn: 'span 5' }}>
                <p style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '1.25rem' }}>Audit Totals</p>
              </div>
              <div style={{ gridColumn: 'span 3' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#434655', textTransform: 'uppercase', marginBottom: '4px' }}>Final Billed</p>
                <p style={{ fontFamily: 'Manrope', fontWeight: 900, fontSize: '1.5rem' }}>₹29,800.00</p>
              </div>
              <div style={{ gridColumn: 'span 4' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#434655', textTransform: 'uppercase', marginBottom: '4px' }}>TrueCare Total</p>
                <p style={{ fontFamily: 'Manrope', fontWeight: 900, fontSize: '1.875rem', color: 'var(--hunter-green)' }}>₹13,300.00</p>
              </div>
            </div>
          </div>
        </section>

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
            <button className="btn-report btn-tc-soft">
              <FileText size={18} /> Export PDF
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
