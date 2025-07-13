import React from 'react';
import './ModernFooter.css';

const ModernFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="modern-footer">
      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h3>Stay Updated with Latest Deals! 📧</h3>
              <p>Get exclusive offers, new arrivals, and shopping tips delivered to your inbox</p>
            </div>
            <div className="newsletter-form">
              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="newsletter-input"
                />
                <button className="newsletter-btn">
                  <span>Subscribe</span>
                  <span className="btn-icon">🚀</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            
            {/* Company Info */}
            <div className="footer-section">
              <div className="footer-logo">
                <div className="logo-icon">🛍️</div>
                <div className="logo-text">
                  <h2>RetailFlow AI</h2>
                  <p>Smart Shopping Experience</p>
                </div>
              </div>
              <p className="company-description">
                Smart shopping with AI recommendations & AR try-ons. Your satisfaction is our priority.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" title="Facebook">
                  <span>📘</span>
                </a>
                <a href="#" className="social-link" title="Twitter">
                  <span>🐦</span>
                </a>
                <a href="#" className="social-link" title="Instagram">
                  <span>📷</span>
                </a>
                <a href="#" className="social-link" title="LinkedIn">
                  <span>💼</span>
                </a>
                <a href="#" className="social-link" title="YouTube">
                  <span>📺</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3 className="section-title">
                <span className="title-icon">🔗</span>
                Quick Links
              </h3>
              <ul className="footer-links">
                <li><a href="#home">🏠 Home</a></li>
                <li><a href="#products">🛍️ Shop</a></li>
                <li><a href="#deals">🔥 Live Deals</a></li>
                <li><a href="#ar">👓 AR Try-On</a></li>
                <li><a href="#cart">🛒 Cart</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div className="footer-section">
              <h3 className="section-title">
                <span className="title-icon">📦</span>
                Categories
              </h3>
              <ul className="footer-links">
                <li><a href="#electronics">📱 Electronics</a></li>
                <li><a href="#bags">👜 Bags</a></li>
                <li><a href="#beauty">💄 Beauty</a></li>
                <li><a href="#ladies">👗 Dresses</a></li>
                <li><a href="#clothing">� Clothing</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer-section">
              <h3 className="section-title">
                <span className="title-icon">🛠️</span>
                Support
              </h3>
              <ul className="footer-links">
                <li><a href="#contact">📞 Contact Us</a></li>
                <li><a href="#help">❓ Help Center</a></li>
                <li><a href="#returns">🔄 Returns</a></li>
                <li><a href="#shipping">🚚 Shipping</a></li>
                <li><a href="#track">📍 Track Order</a></li>
              </ul>
            </div>
                  <span className="contact-icon">📧</span>
                  <div className="contact-details">
                    <span className="contact-label">Email</span>
                    <span className="contact-value">support@retailflow.ai</span>
                  </div>
                </div>
                
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <div className="contact-details">
                    <span className="contact-label">Phone</span>
                    <span className="contact-value">1-800-RETAIL</span>
                  </div>
                </div>
                
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <div className="contact-details">
                    <span className="contact-label">Address</span>
                    <span className="contact-value">123 Shopping St, Tech City</span>
                  </div>
                </div>
              </div>

              <div className="features-list">
                <div className="feature-item">
                  <span className="feature-icon">🚚</span>
                  <span>Free Shipping</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🔒</span>
                  <span>Secure Payment</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">👓</span>
                  <span>AR Try-On</span>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; {currentYear} RetailFlow AI. All rights reserved.</p>
              <p className="tagline">Powered by Artificial Intelligence & Love ❤️</p>
            </div>
            
            <div className="payment-methods">
              <span className="payment-label">Payments:</span>
              <div className="payment-icons">
                <span className="payment-icon" title="Visa">💳</span>
                <span className="payment-icon" title="Mastercard">💳</span>
                <span className="payment-icon" title="PayPal">💰</span>
                <span className="payment-icon" title="Apple Pay">🍎</span>
                <span className="payment-icon" title="Google Pay">🎯</span>
              </div>
            </div>
            
            <div className="certifications">
              <span className="cert-icon" title="SSL Secured">🔐</span>
              <span className="cert-icon" title="Verified Business">✅</span>
              <span className="cert-icon" title="Customer Rated">⭐</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;
