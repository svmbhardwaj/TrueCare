import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedNeed, setSelectedNeed] = useState('Trauma / Emergency');
  const [ayushmanActive, setAyushmanActive] = useState(true);
  const [cghsActive, setCghsActive] = useState(false);
  const [showCompass, setShowCompass] = useState(true);

  const hospitals = [
    {
      id: 123,
      name: 'City General Trauma Center',
      distance: '0.8 km',
      location: 'South Extension',
      verified: true,
      featured: true,
      top: '35%',
      left: '45%',
      unit: 'ACTIVE TRAUMA UNIT'
    },
    {
      id: 456,
      name: "St. Jude's Multi-Specialty",
      distance: '1.2 km',
      location: 'Civil Lines',
      verified: true,
      featured: false,
      top: '55%',
      left: '60%',
      unit: 'CRITICAL CARE WING'
    },
    {
      id: 789,
      name: 'Memorial Hospital',
      distance: '2.5 km',
      location: 'Green Park',
      verified: true,
      featured: false,
      top: '25%',
      left: '75%',
      unit: 'CARDIAC UNIT'
    }
  ];

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard-main-container">
        {/* Sidebar: Search & Filters (Left) */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-content">
            <header className="sidebar-header">
              <h1 className="sidebar-title">Emergency Navigator</h1>
              <p className="sidebar-subtitle">Find fresh, verified care near you.</p>
            </header>

            {/* Filters */}
            <div className="filters-section">
              <div className="filter-group">
                <label className="filter-label">Medical Need</label>
                <div className="select-wrapper">
                  <select 
                    className="medical-select"
                    value={selectedNeed}
                    onChange={(e) => setSelectedNeed(e.target.value)}
                  >
                    <option>Trauma / Emergency</option>
                    <option>Maternity & Childcare</option>
                    <option>ICU / Critical Care</option>
                    <option>Cardiac Emergency</option>
                  </select>
                  <span className="material-symbols-outlined select-icon">expand_more</span>
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Financial Coverage</label>
                <div className="checkbox-grid">
                  <label className="checkbox-card">
                    <input 
                      type="checkbox" 
                      checked={ayushmanActive} 
                      onChange={() => setAyushmanActive(!ayushmanActive)}
                    />
                    <span className="checkbox-label">Ayushman Bharat (PMJAY)</span>
                  </label>
                  <label className="checkbox-card">
                    <input 
                      type="checkbox" 
                      checked={cghsActive} 
                      onChange={() => setCghsActive(!cghsActive)}
                    />
                    <span className="checkbox-label">CGHS Approved</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Hospital List */}
            <div className="hospital-list-section">
              <div className="list-header">
                <span className="found-count">3 Hospitals Found</span>
                <span className="sort-link">
                  <span className="material-symbols-outlined">sort</span> Nearest First
                </span>
              </div>

              {hospitals.map((h) => (
                <div 
                  key={h.id} 
                  className={`hospital-card ${h.featured ? 'featured' : ''}`}
                  onClick={() => navigate(`/hospital/${h.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-top">
                    <div className="hosp-info">
                      <h3>{h.name}</h3>
                      <p className="hosp-meta">
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>location_on</span>
                        {h.distance} • {h.location}
                      </p>
                    </div>
                    {h.verified && (
                      <div className="verified-tag">
                        <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>verified</span>
                        <span className="verified-text">Verified</span>
                      </div>
                    )}
                  </div>
                  <button 
                    className={`btn-action ${h.featured ? 'primary' : 'secondary'}`}
                    onClick={() => navigate(`/hospital/${h.id}`)}
                  >
                    {h.featured ? 'Start Navigation' : 'View Details'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Map Content View (Center/Right) */}
        <section className="map-pane">
          <div className="map-background"></div>
          <div className="map-overlay-tint"></div>

          {/* Civic Compass Notification Overlay */}
          {showCompass && (
            <div className="civic-compass-overlay">
              <div className="compass-card">
                <div className="compass-icon-box">
                  <span className="material-symbols-outlined">explore</span>
                </div>
                <div className="compass-content">
                  <p className="compass-tag">Civic Compass</p>
                  <p className="compass-main">
                    You've entered a Verified Care Zone. Your taxes built this 20-bed ICU wing. <span>Tap for bed availability.</span>
                  </p>
                </div>
                <button className="btn-close" onClick={() => setShowCompass(false)}>
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>
          )}

          {/* Map UI Elements */}
          <div className="map-markers-layer">
            {hospitals.map((h) => (
              <div 
                key={h.id} 
                className="marker-container" 
                style={{ top: h.top, left: h.left }}
                onClick={() => navigate(`/hospital/${h.id}`)}
              >
                {h.featured && (
                  <div className="glass-tooltip">
                    <div className="tooltip-icon">
                      <span className="material-symbols-outlined">medical_services</span>
                    </div>
                    <div className="tooltip-text">
                      <p className="hosp-name-mini">{h.name.split(' ')[0]} {h.name.split(' ')[1]}</p>
                      <p className="unit-tag">{h.unit}</p>
                    </div>
                  </div>
                )}
                
                <div className="pulse-wrapper">
                  {h.featured && <div className="pulse-circle"></div>}
                  <div className="marker-point"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Verified Info Detail Overlay */}
          <div className="verified-info-panel">
            <div className="info-header">
              <span className="material-symbols-outlined" style={{ color: 'var(--hunter-green)', fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              <h4>Community Verified</h4>
            </div>
            <p className="info-desc">
              This location has been confirmed by 42 users to have active cashless processing. Fresh data received 10m ago.
            </p>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <p className="pulse-status">Healing Pulse: High</p>
          </div>

          {/* Emergency Contact Badge */}
          <div className="emergency-hotline">
            <div className="hotline-icon">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
            </div>
            <div className="hotline-text">
              <p className="hotline-label">Emergency Hotline</p>
              <p className="hotline-number">102 Ambulance</p>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="mobile-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "mob-nav-item active" : "mob-nav-item"}>
          <span className="material-symbols-outlined">emergency</span>
          <span>Emergency</span>
        </NavLink>
        <NavLink to="/bill-ai" className={({ isActive }) => isActive ? "mob-nav-item active" : "mob-nav-item"}>
          <span className="material-symbols-outlined">receipt_long</span>
          <span>Bill AI</span>
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => isActive ? "mob-nav-item active" : "mob-nav-item"}>
          <span className="material-symbols-outlined">person</span>
          <span>Profile</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Dashboard;
