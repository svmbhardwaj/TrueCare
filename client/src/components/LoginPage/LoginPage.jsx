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
          <h1 className="welcome-title">Welcome Back</h1>
          <p className="welcome-subtitle">Continue your journey to better health.</p>

          <form className="login-form">
            <div className="input-group">
              <label>Login with Identity</label>
              <div className="input-wrapper">
                <span className="input-icon">🆔</span>
                <input type="text" placeholder="Aadhaar Number / ABHA ID" />
              </div>
            </div>

            <div className="otp-option">
              <div className="otp-content">
                <span className="whatsapp-icon">💬</span>
                <div className="otp-text">
                  <span className="otp-title">OTP via WhatsApp</span>
                  <span className="otp-subtitle">Faster and more secure</span>
                </div>
              </div>
              <span className="arrow-icon">›</span>
            </div>

            <button type="submit" className="sign-in-btn">
              Sign In 🤝
            </button>
          </form>

          <div className="divider">
            <span>OR JOIN US</span>
          </div>

          <div className="social-login">
            <button className="google-btn">
              <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" /> Google
            </button>
            <Link to="/home" className="signup-link">
              <button className="signup-btn">
                <span>👤</span> Sign Up
              </button>
            </Link>
          </div>

          <Link to="/home" className="skip-btn-link">
             <button className="skip-login-btn">
                Skip Login & Explore ⚡
             </button>
          </Link>

          <div className="immediate-help-banner">
            <div className="help-icon-circle">*</div>
            <div className="help-content">
              <span className="help-title">Need immediate help?</span>
              <span className="help-subtitle">Our 24/7 care navigators are one tap away.</span>
            </div>
            <div className="call-btn">
              <span>📞</span>
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
