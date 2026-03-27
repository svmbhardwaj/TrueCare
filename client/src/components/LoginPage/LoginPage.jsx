import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../services/firebase';
import { signInWithPopup } from 'firebase/auth';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/home');
    } catch (error) {
      alert("Login Error: Ensure Google is enabled in Firebase Console.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="branding-top">
          <span className="reassurance-label">Reassurance Zone</span>
          <h1 className="digital-shield-title">The Digital Shield</h1>
        </div>
        <div className="shield-illustration">
          <img src="/shield-illustration.png" alt="" className="shield-img" />
        </div>
        <p className="left-footer-quote">
          Take a deep breath. We've found the right hospital and the right price for you. 🧘‍♂️
        </p>
      </div>

      <div className="login-right">
        <div className="help-icon">?</div>
        <div className="login-form-container">
          <header className="header-section">
            <h1 className="welcome-title">Get Immediate <br /> Medical Help</h1>
            <p className="welcome-subtitle">Find hospitals, verify costs instantly</p>
          </header>
          <button className="primary-emergency-btn" onClick={() => navigate('/home')}>
            Skip login
          </button>
          <div className="secondary-auth-section">
            <div className="divider-soft"></div>
            <p className="auth-label">Login for full features (optional)</p>
            <button className="google-btn-minimal" onClick={handleGoogleSignIn}>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;