import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      {/* Left Column - Digital Sanctuary */}
      <div className="login-left">
        <div className="shield-illustration">
          <img src="/login-shield.png" alt="Digital Shield" className="shield-img" />
        </div>
      </div>

      {/* Right Column - Welcome Back */}
      <div className="login-right">
        <div className="help-icon">?</div>
        <div className="login-form-container">
          <div className="header-section">
            <h1 className="welcome-title">Get Immediate Medical Help</h1>
            <p className="welcome-subtitle">Find hospitals, verify costs instantly</p>
          </div>

          <div className="emergency-actions">
            <Link to="/home" className="primary-emergency-btn">
              Skip login 
            </Link>
            <p className="guidance-text">We’ll guide you step-by-step.</p>
          </div>

          <div className="trust-signals-minimal">
            <div className="trust-item">
              <span className="trust-icon">🛡️</span>
              <div className="trust-text">
                <span className="trust-label">Price Protection</span>
                <span className="trust-desc">We audit bills in real-time.</span>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">💳</span>
              <div className="trust-text">
                <span className="trust-label">Card Acceptance</span>
                <span className="trust-desc">Guaranteed Ayushman/Insurance entry.</span>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">💰</span>
              <div className="trust-text">
                <span className="trust-label">No Surcharge</span>
                <span className="trust-desc">0% GST on life-saving drugs.</span>
              </div>
            </div>
          </div>

          <div className="secondary-auth-section">
            <div className="divider-soft"></div>
            <p className="auth-label">Login for full features (optional)</p>
            <div className="social-login-minimal">
              <button className="google-btn-minimal">
                <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" /> Google
              </button>
            </div>
          </div>
        </div>
        
        <div className="login-footer">
          <p>© 2026 TrueCare Digital Health. Secure & Encrypted.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
