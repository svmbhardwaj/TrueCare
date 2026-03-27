import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="truecare-navbar">
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/home" className="nav-logo">TrueCare</Link>
        </div>
        
        <div className="nav-center">
          <NavLink 
            to="/home" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Emergency
          </NavLink>
          <NavLink 
            to="/bill-ai" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Bill AI
          </NavLink>
          <NavLink 
            to="/history" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            History
          </NavLink>
        </div>

        <div className="nav-right">
          <button className="icon-btn" title="Notifications">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="icon-btn" title="Profile">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
