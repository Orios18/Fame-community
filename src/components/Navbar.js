import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaTrophy, FaIdCard, FaQuestionCircle } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path;
  };

  return (
    <div className="navbar">
      <div 
        className={`navbar-item ${isActive('/') ? "active" : ""}`} 
        onClick={() => navigate('/')}
      >
        <FaHome className="navbar-icon" />
        <span className="navbar-text">Home</span>
      </div>
      <div 
        className={`navbar-item ${isActive('/hall-of-fame') ? "active" : ""}`} 
        onClick={() => navigate('/hall-of-fame')}
      >
        <FaTrophy className="navbar-icon" />
        <span className="navbar-text">Hall of Fame</span>
      </div>
      <div 
        className={`navbar-item ${isActive('/profile') ? "active" : ""}`} 
        onClick={() => navigate('/profile')}
      >
        <FaIdCard className="navbar-icon" />
        <span className="navbar-text">Profile</span>
      </div>
      <div 
        className={`navbar-item ${isActive('/help') ? "active" : ""}`} 
        onClick={() => navigate('/help')}
      >
        <FaQuestionCircle className="navbar-icon" />
        <span className="navbar-text">Help</span>
      </div>
    </div>
  );
}

export default Navbar; 