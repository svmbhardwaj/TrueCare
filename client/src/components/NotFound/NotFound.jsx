import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-icon">
          <span className="material-symbols-outlined">emergency</span>
        </div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist. If you're in an emergency, use the button below.</p>
        <div className="not-found-actions">
          <Link to="/home" className="nf-btn primary">
            <span className="material-symbols-outlined">home</span>
            Go to Home
          </Link>
          <Link to="/dashboard" className="nf-btn secondary">
            <span className="material-symbols-outlined">location_on</span>
            Find Hospital
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
