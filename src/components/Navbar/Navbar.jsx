import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="main-navbar">
      <div className="navbar-brand">
        <Link to="/">
          <span className="brand-text">STEM Exploratorium</span>
        </Link>
      </div>
      
      <div className="navbar-links">
        <Link 
          to="/science" 
          className={`nav-link ${location.pathname === '/science' ? 'active' : ''}`}
          style={{ '--hover-color': '#4CAF50' }}
        >
          <span className="nav-icon">🔬</span>
          Science
        </Link>
        
        <Link 
          to="/technology" 
          className={`nav-link ${location.pathname === '/technology' ? 'active' : ''}`}
          style={{ '--hover-color': '#2196F3' }}
        >
          <span className="nav-icon">💻</span>
          Technology
        </Link>
        
        <Link 
          to="/engineering" 
          className={`nav-link ${location.pathname === '/engineering' ? 'active' : ''}`}
          style={{ '--hover-color': '#FF5722' }}
        >
          <span className="nav-icon">⚙️</span>
          Engineering
        </Link>
        
        <Link 
          to="/mathematics" 
          className={`nav-link ${location.pathname === '/mathematics' ? 'active' : ''}`}
          style={{ '--hover-color': '#9C27B0' }}
        >
          <span className="nav-icon">📐</span>
          Mathematics
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;