import React from 'react';
import { 
  MapPin, 
  Bed, 
  UserRound, 
  Phone, 
  Map as MapIcon, 
  ExternalLink, 
  Navigation,
  Bell,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './HospitalDetails.css';

const HospitalDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="hospital-details-page page-container">
      <Navbar />

      <div className="details-container">
        {/* Main Content (Left) */}
        <main className="main-content">
          <div className="hospital-header">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} /> Back to Navigator
            </button>
            <span className="verify-badge">
              <span className="dot"></span> COMMUNITY VERIFIED
            </span>
            <h1 className="hospital-title">City Medical Center & Research Institute</h1>
            <div className="location-info">
              <MapPin size={18} className="icon-green" />
              <span>Sector 42, Knowledge Park, New Delhi</span>
            </div>
          </div>

          <div className="status-grid">
            <div className="status-card">
              <div className="status-icon-wrapper bg-green-light">
                <Bed className="status-icon color-green" />
              </div>
              <div className="status-info">
                <p className="status-label">ICU Beds Available</p>
                <h3 className="status-value color-green">3 Available</h3>
              </div>
            </div>
            <div className="status-card">
              <div className="status-icon-wrapper bg-blue-light">
                <UserRound className="status-icon color-blue" />
              </div>
              <div className="status-info">
                <p className="status-label">Specialist on Duty</p>
                <h3 className="status-value">Cardiologist Available</h3>
              </div>
            </div>
          </div>

          <section className="schemes-section">
            <div className="section-header">
              <h2>Benefit Support & Schemes</h2>
              <a href="#" className="view-all" onClick={(e) => { e.preventDefault(); alert('Insurance Directory Coming Soon: We are currently verifying 15+ additional private insurers for real-time coverage matching.'); }}>View all 24 supported</a>
            </div>
            <div className="schemes-grid">
              <div className="scheme-card">
                <div className="scheme-logo">🛡️</div>
                <p>Ayushman Bharat</p>
              </div>
              <div className="scheme-card">
                <div className="scheme-logo">⚕️</div>
                <p>CGHS</p>
              </div>
              <div className="scheme-card">
                <div className="scheme-logo">🛡️</div>
                <p>ECHS</p>
              </div>
              <div className="scheme-card">
                <div className="scheme-logo">🔗</div>
                <p>15+ Private Insurers</p>
              </div>
            </div>
          </section>

          <section className="updates-section">
            <h2>Community Verified Updates</h2>
            <div className="update-list">
              <div className="update-item">
                <div className="avatar bg-blue-light">RK</div>
                <div className="update-content">
                  <div className="update-header">
                    <span className="user-name">Rahul Kapoor</span>
                    <span className="time-ago">14 hours ago</span>
                  </div>
                  <p className="update-text">
                    "Ayushman card accepted without hassle at 2:00 AM yesterday for my father's emergency. Staff was very helpful with the documentation."
                  </p>
                </div>
              </div>
              <div className="update-item">
                <div className="avatar bg-green-light">SM</div>
                <div className="update-content">
                  <div className="update-header">
                    <span className="user-name">Sanya Malhotra</span>
                    <span className="time-ago">2 days ago</span>
                  </div>
                  <p className="update-text">
                    "Verified Star Health insurance claim. Direct cashless process took about 45 mins. Smooth experience overall."
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Sidebar (Right) */}
        <aside className="sidebar">
          <div className="action-buttons">
            <button className="btn-primary">
              <Navigation size={18} /> Get Directions
            </button>
            <button className="btn-secondary">
              <Phone size={18} /> Contact Admissions
            </button>
          </div>

          <div className="emergency-contacts">
            <div className="emergency-header">
              <Bell size={16} className="color-red" />
              <span>EMERGENCY CONTACTS</span>
            </div>
            <div className="contact-item">
              <p className="contact-label">MAIN DESK</p>
              <h3 className="contact-number">+91 11 4567 8900</h3>
            </div>
            <div className="contact-item border-top">
              <p className="contact-label">AMBULANCE DISPATCH</p>
              <h3 className="contact-number color-red">102 (Direct Link)</h3>
            </div>
          </div>

          <div className="map-preview">
             <div className="map-placeholder">
                <MapIcon className="map-icon" size={40} />
                <button className="open-map-btn">
                  <ExternalLink size={14} /> Open in Maps
                </button>
             </div>
          </div>

          <div className="metrics-card">
            <p className="metrics-label">EFFICIENCY METRICS</p>
            <div className="metric-row">
              <span>Avg. Admission Time</span>
              <span className="metric-value">22 mins</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '75%' }}></div>
            </div>
            <p className="metric-subtext">Based on community data from the last 7 days.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HospitalDetails;
