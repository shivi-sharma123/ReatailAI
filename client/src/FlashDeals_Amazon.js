import React, { useState, useEffect } from 'react';
import './FlashDeals_Amazon.css';

function FlashDeals({ onAddToCart, onProductClick }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 30,
    seconds: 45
  });

  const [currentDeal, setCurrentDeal] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);

  // Scroll functionality for deals grid
  const scrollDealsGrid = (direction) => {
    const grid = document.getElementById('dealsGrid');
    if (grid) {
      const scrollAmount = 380; // Width of one card plus gap
      const newScrollPosition = direction === 'left' 
        ? grid.scrollLeft - scrollAmount 
        : grid.scrollLeft + scrollAmount;
      
      grid.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Enhanced flash deals data with Amazon-style layout
  const flashDeals = [
    {
      id: 1,
      name: "DIGITEK Lite (DCL-150WBC Combo) 150W Bi Color Continuous LED Light with 18CM Reflector & Infrared...",
      originalPrice: 17995,
      dealPrice: 5599,
      discount: 69,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
      rating: 4.1,
      reviews: 175,
      soldCount: 400,
      sponsored: true
    },
    {
      id: 2,
      name: "HIFFIN PRO HD Mark 2 Point Studio Lights for Photography and Video Shooting, Continuous Softbox Lighting...",
      originalPrice: 20000,
      dealPrice: 9999,
      discount: 50,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      rating: 4.2,
      reviews: 92,
      soldCount: 324,
      sponsored: true
    },
    {
      id: 3,
      name: "eMeet S600 4K Webcam for Streaming - Sony 1/2.5\" Sensor, PDAF Autofocus, 1080P@60FPS, 2 Noise...",
      originalPrice: 7990,
      dealPrice: 6496,
      discount: 19,
      image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=300&h=300&fit=crop",
      rating: 4.3,
      reviews: 29473,
      soldCount: 200,
      sponsored: true
    },
    {
      id: 4,
      name: "HIFFIN® PRO HD 5 Soft Led Video Light Softbox Kit | 3 Point Lighting | Stand | for YouTube...",
      originalPrice: 25000,
      dealPrice: 17499,
      discount: 30,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
      rating: 3.8,
      reviews: 12,
      soldCount: 156,
      sponsored: true
    },
    {
      id: 5,
      name: "GOOD HOMES INDIA Combo 3 Pcs Jade plant & Snake plant & Spider Plant | Snake & Jade & Spider Plant Indoor live Plan...",
      originalPrice: 499,
      dealPrice: 290,
      discount: 42,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      rating: 3.5,
      reviews: 215,
      soldCount: 50,
      sponsored: false
    }
  ];

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flash-deals-section">
      {/* Walmart Live Header */}
      <div className="amazon-live-header">
        <div className="amazon-live-banner">
          <div className="amazon-live-logo">
            <span className="amazon-text">walmart</span>
            <span className="live-text">live</span>
          </div>
          <div className="amazon-live-content">
            <h2>Walmart Live</h2>
            <p>Watch, Chat and Shop LIVE with your favourite influencers</p>
            <div className="amazon-live-links">
              <a href="#" className="watch-now">Watch now</a>
              <span>•</span>
              <a href="#" className="explore-link">Explore Walmart LIVE</a>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="results-section">
        <h3>Results</h3>
        <p>Check each product page for other buying options. Price and other details may vary based on product size and colour.</p>
      </div>

      {/* Amazon-Style Live Deals Grid */}
      <div className="amazon-deals-container">
        <div className="amazon-deals-grid">
          {flashDeals.map((deal, index) => (
            <div key={deal.id} className="amazon-deal-card" onClick={() => onProductClick(deal)}>
              
              {/* Sponsored Badge */}
              {deal.sponsored && (
                <div className="sponsored-badge">
                  <span>Sponsored</span>
                  <span className="info-icon">ⓘ</span>
                </div>
              )}

              {/* Product Image */}
              <div className="amazon-image-container">
                <img src={deal.image} alt={deal.name} className="amazon-product-image" />
              </div>

              {/* Product Title */}
              <h3 className="amazon-product-title">{deal.name}</h3>

              {/* Rating Section */}
              <div className="amazon-rating">
                <div className="stars">
                  {'★'.repeat(Math.floor(deal.rating))}
                  {'☆'.repeat(5 - Math.floor(deal.rating))}
                </div>
                <span className="rating-count">{deal.reviews.toLocaleString()}</span>
              </div>

              {/* Purchase Count */}
              <div className="purchase-count">
                {deal.soldCount}+ bought in past month
              </div>

              {/* Limited Time Deal Badge */}
              <div className="limited-deal-badge">
                Limited time deal
              </div>

              {/* Price Section */}
              <div className="amazon-price-section">
                <div className="price-row">
                  <span className="currency">₹</span>
                  <span className="main-price">{deal.dealPrice.toLocaleString()}</span>
                  <span className="mrp-text">M.R.P:</span>
                  <span className="original-price">₹{deal.originalPrice.toLocaleString()}</span>
                  <span className="discount-percent">({deal.discount}% off)</span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="amazon-additional-info">
                <div className="prime-badge">
                  <span className="prime-icon">✓</span>
                  <span>walmart+</span>
                </div>
                <div className="delivery-info">
                  FREE delivery Thu, 10 Jul
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Live Tracking Section */}
      <div className="live-tracking-section">
        <div className="tracking-header">
          <div className="tracking-banner">
            <div className="tracking-logo">
              <span className="walmart-text">walmart</span>
              <span className="live-text">tracking</span>
            </div>
            <div className="tracking-content">
              <h2>Live Tracking</h2>
              <p>Track your orders in real-time with live updates and notifications</p>
              <div className="tracking-links">
                <a href="#" className="track-now">Track now</a>
                <span>•</span>
                <a href="#" className="explore-tracking">Explore Live Tracking</a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Track Section */}
        <div className="quick-track-section">
          <h3>Quick Track</h3>
          <p>Enter your order number or tracking ID to get instant updates</p>
          
          <div className="tracking-input-container">
            <input 
              type="text" 
              placeholder="Enter Order ID or Tracking Number"
              className="tracking-input"
            />
            <button className="track-button">
              <span className="track-icon">🔍</span>
              Track Order
            </button>
          </div>
        </div>

        {/* Live Orders Grid */}
        <div className="live-orders-container">
          <div className="live-orders-grid">
            
            {/* Sample Live Tracking Cards */}
            <div className="live-order-card">
              <div className="order-status-badge in-transit">
                <span className="status-dot"></span>
                In Transit
              </div>
              <div className="order-info">
                <h4>Order #WM2024001</h4>
                <p className="order-items">iPhone 15 Pro Max + 2 more items</p>
                <div className="tracking-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '75%'}}></div>
                  </div>
                  <div className="progress-text">75% Complete</div>
                </div>
                <div className="estimated-delivery">
                  <span className="delivery-icon">🚚</span>
                  Expected: Today, 6:00 PM
                </div>
              </div>
              <button className="view-details-btn">View Details</button>
            </div>

            <div className="live-order-card">
              <div className="order-status-badge delivered">
                <span className="status-dot"></span>
                Delivered
              </div>
              <div className="order-info">
                <h4>Order #WM2024002</h4>
                <p className="order-items">Samsung Galaxy Watch + Accessories</p>
                <div className="tracking-progress">
                  <div className="progress-bar">
                    <div className="progress-fill completed" style={{width: '100%'}}></div>
                  </div>
                  <div className="progress-text">Delivered Successfully</div>
                </div>
                <div className="estimated-delivery">
                  <span className="delivery-icon">✅</span>
                  Delivered: Jul 6, 2:30 PM
                </div>
              </div>
              <button className="view-details-btn">View Details</button>
            </div>

            <div className="live-order-card">
              <div className="order-status-badge processing">
                <span className="status-dot"></span>
                Processing
              </div>
              <div className="order-info">
                <h4>Order #WM2024003</h4>
                <p className="order-items">MacBook Air M3 + AppleCare</p>
                <div className="tracking-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '25%'}}></div>
                  </div>
                  <div className="progress-text">Order Being Prepared</div>
                </div>
                <div className="estimated-delivery">
                  <span className="delivery-icon">📦</span>
                  Expected: Jul 9, 4:00 PM
                </div>
              </div>
              <button className="view-details-btn">View Details</button>
            </div>

          </div>
        </div>
      </div>

      {/* Ultra-Compact Modern Footer */}
      <footer className="modern-footer">
        <div className="footer-content">
          <div className="footer-container">
            
            {/* Main Footer Row */}
            <div className="footer-row">
              
              {/* Brand Section */}
              <div className="footer-brand">
                <div className="footer-logo">
                  <span className="logo-icon">🛒</span>
                  <span className="logo-text">RetailFlow<span className="logo-ai">AI</span></span>
                </div>
              </div>

              {/* Quick Links */}
              <div className="footer-links">
                <a href="#" className="footer-link">Help</a>
                <a href="#" className="footer-link">Track Order</a>
                <a href="#" className="footer-link">Returns</a>
                <a href="#" className="footer-link">Contact</a>
              </div>

              {/* Services */}
              <div className="footer-services">
                <div className="service-item">
                  <span className="service-icon">🚚</span>
                  <span>Free Delivery</span>
                </div>
                <div className="service-item">
                  <span className="service-icon">🔄</span>
                  <span>Easy Returns</span>
                </div>
                <div className="service-item">
                  <span className="service-icon">🛡️</span>
                  <span>Secure</span>
                </div>
              </div>

              {/* Social & Apps */}
              <div className="footer-extras">
                <div className="social-icons">
                  <a href="#" className="social-icon">📘</a>
                  <a href="#" className="social-icon">🐦</a>
                  <a href="#" className="social-icon">📷</a>
                </div>
                <div className="app-badges">
                  <span className="app-badge">📱</span>
                  <span className="app-badge">🤖</span>
                </div>
              </div>

            </div>

            {/* Copyright Row */}
            <div className="footer-bottom">
              <div className="copyright">
                <p>&copy; 2025 RetailFlowAI. All rights reserved.</p>
              </div>
              <div className="footer-legal">
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
                <a href="#">Cookies</a>
              </div>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}

export default FlashDeals;
