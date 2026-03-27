import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { auth } from "../../services/firebase";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setShowDropdown(false);
    navigate('/');
  };

  return (
    <nav className="truecare-navbar">
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/home" className="nav-logo">TrueCare</Link>
        </div>

        <div className="nav-center">
          <NavLink to="/home" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Emergency</NavLink>
          <NavLink to="/truebill" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Bill AI</NavLink>
          <NavLink to="/history" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>History</NavLink>
        </div>

        <div className="nav-right">
          <button className="icon-btn"><span className="material-symbols-outlined">notifications</span></button>

          <div className="profile-section" ref={dropdownRef} style={{ position: 'relative' }}>
            {user ? (
              <>
                <button className="icon-btn" onClick={() => setShowDropdown(!showDropdown)}>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="P" style={{ width: '32px', borderRadius: '50%' }} referrerPolicy="no-referrer" />
                  ) : (
                    <span className="material-symbols-outlined">account_circle</span>
                  )}
                </button>

                {showDropdown && (
                  <div className="nav-dropdown" style={{ position: 'absolute', right: 0, top: '40px', background: 'white', border: '1px solid #eee', padding: '10px', borderRadius: '8px', zIndex: 100, minWidth: '150px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <div style={{ padding: '5px', fontSize: '12px', borderBottom: '1px solid #eee' }}>
                      <strong>{user.displayName}</strong>
                    </div>
                    <button onClick={handleLogout} style={{ width: '100%', textAlign: 'left', padding: '10px 5px', background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>
                      Sign Out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link to="/" style={{ textDecoration: 'none', color: '#00aeef', fontWeight: 'bold' }}>Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;