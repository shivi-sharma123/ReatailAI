import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="professional-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>RetailFlow AI</h3>
          <p>Revolutionizing retail with AI-powered shopping experiences. Smart recommendations, AR try-on, and intelligent search.</p>
          <div className="social-links">
            <a href="#" className="social-icon">📱</a>
            <a href="#" className="social-icon">📘</a>
            <a href="#" className="social-icon">🐦</a>
            <a href="#" className="social-icon">📸</a>
            <a href="#" className="social-icon">📺</a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Shop</h3>
          <ul className="footer-links">
            <li><a href="#">Featured Products</a></li>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Best Sellers</a></li>
            <li><a href="#">Special Offers</a></li>
            <li><a href="#">Gift Cards</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Customer Service</h3>
          <ul className="footer-links">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Size Guide</a></li>
            <li><a href="#">Order Tracking</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>About Us</h3>
          <ul className="footer-links">
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Sustainability</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Innovation</h3>
          <ul className="footer-links">
            <li><a href="#">AI Technology</a></li>
            <li><a href="#">AR Try-On</a></li>
            <li><a href="#">Smart Search</a></li>
            <li><a href="#">Voice Shopping</a></li>
            <li><a href="#">Personalization</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="payment-methods">
          <span className="payment-icon">💳</span>
          <span className="payment-icon">💰</span>
          <span className="payment-icon">🏦</span>
          <span className="payment-icon">💸</span>
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} RetailFlow AI. All rights reserved. | <a href="#">Terms of Service</a> | <a href="#">Privacy Policy</a>
        </div>
        <div className="app-download">
          <a href="#" className="app-badge">App Store</a>
          <a href="#" className="app-badge">Google Play</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
