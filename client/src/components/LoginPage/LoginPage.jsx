import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, firebaseAuthEnabled } from '../../services/firebase';
import { signInWithPopup } from 'firebase/auth';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    if (!firebaseAuthEnabled || !auth || !googleProvider) {
      alert('Google login is temporarily unavailable. Please use Skip login.');
      return;
    }

    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/home');
    } catch (error) {
      console.error("Auth Error:", error);
      alert("Login Error: Please check your connection or Firebase settings.");
    }
  };

  return (
    <div className="login-container">
      {/* LEFT SIDE: Branding and Visuals */}
      <div className="login-left">
        <div className="branding-top">
          <div className="logo-white">✚ TrueCare</div>
          <p className="reassurance-label">REASSURANCE ZONE</p>
          <h1 className="digital-shield-title">The Digital Shield</h1>
        </div>

        <div className="shield-illustration-container">
          <img
            src="/login-shield.png"
            alt="The Digital Shield Illustration"
            className="shield-img"
          />
        </div>

        <p className="left-footer-quote">
          Take a deep breath. We've found the right hospital and the right price for you. 🧘‍♂️
        </p>
      </div>

      {/* RIGHT SIDE: Authentication and Info */}
      <div className="login-right">
        <div className="help-icon-top">?</div>

        <div className="login-content-wrapper">
          <header className="login-header">
            <h1 className="welcome-main-title">Get Immediate <br /> Medical Help</h1>
            <p className="welcome-subtitle">Find hospitals, verify costs instantly</p>
          </header>

          <button className="primary-skip-btn" onClick={() => navigate('/home')}>
            Skip login
          </button>
          <p className="step-guide-text">We'll guide you step-by-step.</p>

          {/* TRUST FACTORS SECTION */}
          <div className="trust-features-list">
            <div className="feature-item">
              <div className="feature-icon-box">🛡️</div>
              <div className="feature-text-content">
                <strong>Price Protection</strong>
                <p>We audit bills in real-time.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box">💳</div>
              <div className="feature-text-content">
                <strong>Card Acceptance</strong>
                <p>Guaranteed Ayushman/Insurance entry.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box">💰</div>
              <div className="feature-text-content">
                <strong>No Surcharge</strong>
                <p>0% GST on life-saving drugs.</p>
              </div>
            </div>
          </div>

          {/* GOOGLE AUTH SECTION */}
          <div className="auth-separator">
            <span>Login for full features (optional)</span>
          </div>

          <button
            className="google-login-button"
            onClick={handleGoogleSignIn}
            disabled={!firebaseAuthEnabled}
            title={firebaseAuthEnabled ? 'Sign in with Google' : 'Firebase is not configured in this deployment'}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
            />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;