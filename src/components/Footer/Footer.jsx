import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>STEM Exploratorium</h3>
          <p>Inspiring the next generation of innovators through science, technology, engineering, and mathematics.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/science">Science</a></li>
            <li><a href="/technology">Technology</a></li>
            <li><a href="/engineering">Engineering</a></li>
            <li><a href="/mathematics">Mathematics</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="#">Learning Materials</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">Tutorials</a></li>
            <li><a href="#">Community</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Connect</h4>
          <div className="social-links">
            <a href="#" className="social-link">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 STEM Exploratorium. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;