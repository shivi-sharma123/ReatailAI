import React, { useState, useEffect } from 'react';
import './FlashDeals.css';
import './FlashDeals_mobile.css';

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

  // Enhanced flash deals data with live deal styling
  const flashDeals = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      originalPrice: 1199.99,
      dealPrice: 899.99,
      discount: 25,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
      stock: 25,
      soldCount: 180,
      totalStock: 200,
      timeLeft: "3h 45m left",
      tag: "⚡ LIGHTNING DEAL",
      tagColor: "#ff4757",
      category: "Electronics",
      rating: 4.8,
      reviews: 2847,
      features: ["Free Shipping", "1 Year Warranty"],
      dealType: "limited_time",
      urgency: "high",
      savingsAmount: 300,
      dealPercentage: 85, // percentage sold
      isPopular: true,
      dealStartTime: "10:00 AM",
      nextDealTime: "2:00 PM"
    },
    {
      id: 2,
      name: "Samsung Galaxy Watch Ultra",
      originalPrice: 499.99,
      dealPrice: 299.99,
      discount: 40,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      stock: 12,
      soldCount: 95,
      totalStock: 100,
      timeLeft: "1h 20m left",
      tag: "🔥 MEGA DEAL",
      tagColor: "#ff6348",
      category: "Wearables",
      rating: 4.7,
      reviews: 1523,
      features: ["Free Shipping", "Extended Warranty"],
      dealType: "flash_sale",
      urgency: "critical",
      savingsAmount: 200,
      dealPercentage: 95,
      isPopular: true,
      dealStartTime: "11:30 AM",
      nextDealTime: "4:30 PM"
    },
    {
      id: 3,
      name: "AirPods Pro 2nd Gen",
      originalPrice: 249.99,
      dealPrice: 179.99,
      discount: 28,
      image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=300&h=300&fit=crop",
      stock: 8,
      soldCount: 320,
      totalStock: 350,
      timeLeft: "45m left",
      tag: "💎 BESTSELLER",
      tagColor: "#ffa502",
      category: "Audio",
      rating: 4.9,
      reviews: 5670,
      features: ["Free Shipping", "Noise Cancellation"],
      dealType: "bestseller",
      urgency: "medium",
      savingsAmount: 70,
      dealPercentage: 91,
      isPopular: false,
      dealStartTime: "9:15 AM",
      nextDealTime: "3:15 PM"
    },
    {
      id: 4,
      name: "MacBook Air M3",
      originalPrice: 1299.99,
      dealPrice: 999.99,
      discount: 23,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
      stock: 15,
      soldCount: 67,
      totalStock: 80,
      timeLeft: "5h 30m left",
      tag: "🚀 NEW LAUNCH",
      tagColor: "#3742fa",
      category: "Laptops",
      rating: 4.8,
      reviews: 987,
      features: ["Free Shipping", "AppleCare+"],
      dealType: "new_launch",
      urgency: "low",
      savingsAmount: 300,
      dealPercentage: 84,
      isPopular: true,
      dealStartTime: "8:00 AM",
      nextDealTime: "6:00 PM"
    }
  ];

  // Countdown timer with flashing effect
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

  // Auto-slide deals
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDeal(prev => (prev + 1) % flashDeals.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const calculateStockPercentage = (stock, soldCount) => {
    const total = stock + soldCount;
    return (soldCount / total) * 100;
  };

  return (
    <div className="flash-deals-section">
      {/* Premium Section Header */}
      <div className="deals-header">
        <div className="header-left">
          <div className="live-indicator">
            <span className="live-dot"></span>
            <span className="live-text">LIVE</span>
          </div>
          <h2>🔥 Live Deals</h2>
          <div className="deal-stats">
            <span className="stat">200+ Active Deals</span>
            <span className="stat-separator">•</span>
            <span className="stat">Up to 80% OFF</span>
          </div>
        </div>
        
        <div className="header-right">
          <div className="timer-container">
            <div className="timer-icon">⏰</div>
            <div className="timer-content">
              <span className="timer-label">Deal Ends In</span>
              <div className="countdown-timer">
                <div className="time-unit">
                  <span className="time-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="time-label">H</span>
                </div>
                <span className="time-separator">:</span>
                <div className="time-unit">
                  <span className="time-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="time-label">M</span>
                </div>
                <span className="time-separator">:</span>
                <div className="time-unit">
                  <span className="time-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="time-label">S</span>
                </div>
              </div>
            </div>
          </div>
          
          <button className="view-all-deals">
            <span>View All</span>
            <span className="arrow">→</span>
          </button>
        </div>
      </div>

      {/* Live Deals Grid with Scroll Indicators */}
      <div className="deals-grid-container">
        <div className="scroll-indicator left" onClick={() => scrollDealsGrid('left')}>
          <span>‹</span>
        </div>
        <div className="live-deals-grid" id="dealsGrid">
          {flashDeals.map((deal, index) => (
            <div key={deal.id} className={`live-deal-card ${deal.urgency}`}>
            {/* Deal Status Bar */}
            <div className="deal-status-bar">
              <div className="deal-tag" style={{ backgroundColor: deal.tagColor }}>
                {deal.tag}
              </div>
              {deal.isPopular && (
                <div className="popular-badge">
                  🔥 POPULAR
                </div>
              )}
              <div className="deal-timer">
                ⏱️ {deal.timeLeft}
              </div>
            </div>

            {/* Product Image Section */}
            <div className="deal-image-section">
              <img src={deal.image} alt={deal.name} className="deal-product-image" />
              <div className="discount-badge">
                {deal.discount}% OFF
              </div>
              <div className="deal-type-indicator">
                {deal.dealType === 'lightning_deal' && '⚡'}
                {deal.dealType === 'flash_sale' && '🔥'}
                {deal.dealType === 'bestseller' && '💎'}
                {deal.dealType === 'new_launch' && '🚀'}
              </div>
            </div>

            {/* Deal Information */}
            <div className="deal-info-section">
              <h3 className="deal-product-name">{deal.name}</h3>
              
              {/* Rating */}
              <div className="deal-rating">
                <div className="stars">
                  {'★'.repeat(Math.floor(deal.rating))}
                  {'☆'.repeat(5 - Math.floor(deal.rating))}
                </div>
                <span className="rating-value">{deal.rating}</span>
                <span className="rating-count">({deal.reviews.toLocaleString()})</span>
              </div>

              {/* Price Section */}
              <div className="deal-price-section">
                <div className="current-price">₹{deal.dealPrice.toLocaleString()}</div>
                <div className="original-price">₹{deal.originalPrice.toLocaleString()}</div>
                <div className="savings-badge">
                  Save ₹{deal.savingsAmount}
                </div>
              </div>

              {/* Stock Progress */}
              <div className="deal-stock-progress">
                <div className="stock-info">
                  <span className="sold-count">{deal.soldCount} sold</span>
                  <span className="stock-left">{deal.stock} left</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${deal.dealPercentage}%` }}
                  ></div>
                </div>
                <div className="urgency-text">
                  {deal.urgency === 'critical' && '🔴 Almost Gone!'}
                  {deal.urgency === 'high' && '🟡 Selling Fast!'}
                  {deal.urgency === 'medium' && '🟢 Limited Stock'}
                  {deal.urgency === 'low' && '🔵 Available'}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="deal-actions">
                <button 
                  className="add-to-cart-btn"
                  onClick={() => onAddToCart(deal)}
                >
                  <span className="btn-icon">🛒</span>
                  Add to Cart
                </button>
                <button 
                  className="buy-now-btn"
                  onClick={() => onProductClick(deal)}
                >
                  <span className="btn-icon">⚡</span>
                  Buy Now
                </button>
              </div>

              {/* Deal Features */}
              <div className="deal-features">
                {deal.features.map((feature, idx) => (
                  <span key={idx} className="feature-tag">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Live Deal Indicator */}
            <div className="live-deal-pulse"></div>
          </div>
        ))}
      </div>

      {/* Live Deal Categories - Amazon Style */}
      <div className="live-deal-categories">
        <h3>🎯 Live Deal Categories</h3>
        <div className="category-scroll-container">
          <div className="category-item active">
            <div className="category-icon">📱</div>
            <span className="category-name">Electronics</span>
            <span className="deal-count">50+ deals</span>
            <div className="live-indicator-small"></div>
          </div>
          <div className="category-item">
            <div className="category-icon">👕</div>
            <span className="category-name">Fashion</span>
            <span className="deal-count">120+ deals</span>
            <div className="live-indicator-small"></div>
          </div>
          <div className="category-item">
            <div className="category-icon">🏠</div>
            <span className="category-name">Home</span>
            <span className="deal-count">80+ deals</span>
            <div className="live-indicator-small"></div>
          </div>
          <div className="category-item">
            <div className="category-icon">⚽</div>
            <span className="category-name">Sports</span>
            <span className="deal-count">30+ deals</span>
            <div className="live-indicator-small"></div>
          </div>
          <div className="category-item">
            <div className="category-icon">📚</div>
            <span className="category-name">Books</span>
            <span className="deal-count">60+ deals</span>
            <div className="live-indicator-small"></div>
          </div>
          <div className="category-item">
            <div className="category-icon">🎮</div>
            <span className="category-name">Gaming</span>
            <span className="deal-count">25+ deals</span>
            <div className="live-indicator-small"></div>
          </div>
        </div>
      </div>

      {/* Premium Offers Section */}
      <div className="premium-offers">
        <h4>💳 Premium Offers & Benefits</h4>
        <div className="offers-grid">
          <div className="offer-card bank-offer">
            <div className="offer-icon">🏦</div>
            <div className="offer-content">
              <div className="offer-title">Bank Offers</div>
              <div className="offer-description">Extra 10% off with SBI Cards</div>
            </div>
            <div className="offer-badge">LIVE</div>
          </div>
          <div className="offer-card cashback-offer">
            <div className="offer-icon">�</div>
            <div className="offer-content">
              <div className="offer-title">Cashback</div>
              <div className="offer-description">Up to 5% Cashback</div>
            </div>
            <div className="offer-badge">NEW</div>
          </div>
          <div className="offer-card emi-offer">
            <div className="offer-icon">💳</div>
            <div className="offer-content">
              <div className="offer-title">No Cost EMI</div>
              <div className="offer-description">0% Interest Available</div>
            </div>
            <div className="offer-badge">HOT</div>
          </div>
          <div className="offer-card shipping-offer">
            <div className="offer-icon">🚚</div>
            <div className="offer-content">
              <div className="offer-title">Free Delivery</div>
              <div className="offer-description">On orders above ₹499</div>
            </div>
            <div className="offer-badge">FREE</div>
          </div>
        </div>
        <div className="scroll-indicator right" onClick={() => scrollDealsGrid('right')}>
          <span>›</span>
        </div>
      </div>
      </div>
    </div>
  );
}

export default FlashDeals;
