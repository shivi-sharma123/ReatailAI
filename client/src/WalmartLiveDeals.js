import React, { useState, useEffect } from 'react';
import './WalmartLiveDeals.css';

function WalmartLiveDeals({ onAddToCart, onProductClick }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 30,
    seconds: 45
  });

  const [currentDeal, setCurrentDeal] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const [liveDealCount, setLiveDealCount] = useState(1247);
  const [totalSavings, setTotalSavings] = useState(892456);
  const [activeUsers, setActiveUsers] = useState(15843);

  // Enhanced live deals data with real-time metrics
  const liveDeals = [
    {
      id: 1,
      name: "Apple iPhone 15 Pro Max 256GB",
      originalPrice: 1199.99,
      dealPrice: 999.99,
      discount: 17,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 15847,
      soldCount: 2547,
      stockLeft: 23,
      trending: true,
      flashSale: true,
      liveBuyers: 156,
      savingsToday: 67543
    },
    {
      id: 2,
      name: "Samsung 75\" 4K QLED Smart TV",
      originalPrice: 2299.99,
      dealPrice: 1699.99,
      discount: 26,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 8943,
      soldCount: 1234,
      stockLeft: 8,
      trending: true,
      flashSale: true,
      liveBuyers: 89,
      savingsToday: 45231
    },
    {
      id: 3,
      name: "PlayStation 5 Console + Spider-Man Bundle",
      originalPrice: 599.99,
      dealPrice: 449.99,
      discount: 25,
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 23156,
      soldCount: 5643,
      stockLeft: 5,
      trending: true,
      flashSale: true,
      liveBuyers: 234,
      savingsToday: 125689
    },
    {
      id: 4,
      name: "MacBook Air M3 13-inch",
      originalPrice: 1299.99,
      dealPrice: 1099.99,
      discount: 15,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 12847,
      soldCount: 3421,
      stockLeft: 12,
      trending: true,
      flashSale: true,
      liveBuyers: 178,
      savingsToday: 89456
    },
    {
      id: 5,
      name: "Nintendo Switch OLED Model",
      originalPrice: 349.99,
      dealPrice: 279.99,
      discount: 20,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 18925,
      soldCount: 7832,
      stockLeft: 31,
      trending: true,
      flashSale: true,
      liveBuyers: 198,
      savingsToday: 156234
    },
    {
      id: 6,
      name: "AirPods Pro 2nd Generation",
      originalPrice: 249.99,
      dealPrice: 199.99,
      discount: 20,
      image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 34521,
      soldCount: 12456,
      stockLeft: 67,
      trending: true,
      flashSale: true,
      liveBuyers: 287,
      savingsToday: 234567
    }
  ];

  // Countdown timer with live updates
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 }; // Reset to 24 hours
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Live metrics updates
  useEffect(() => {
    const metricsTimer = setInterval(() => {
      setLiveDealCount(prev => prev + Math.floor(Math.random() * 5));
      setTotalSavings(prev => prev + Math.floor(Math.random() * 1000));
      setActiveUsers(prev => prev + Math.floor(Math.random() * 20) - 10);
    }, 3000);

    return () => clearInterval(metricsTimer);
  }, []);

  // Flash animation effect
  useEffect(() => {
    const flashTimer = setInterval(() => {
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 500);
    }, 2000);

    return () => clearInterval(flashTimer);
  }, []);

  // Auto-scroll deals
  useEffect(() => {
    const scrollTimer = setInterval(() => {
      setCurrentDeal(prev => (prev + 1) % liveDeals.length);
    }, 5000);

    return () => clearInterval(scrollTimer);
  }, [liveDeals.length]);

  const scrollDealsGrid = (direction) => {
    const grid = document.getElementById('liveDealsGrid');
    if (grid) {
      const scrollAmount = 380;
      const newScrollPosition = direction === 'left' 
        ? grid.scrollLeft - scrollAmount 
        : grid.scrollLeft + scrollAmount;
      
      grid.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <section className="walmart-live-deals">
      {/* Live Deals Header with Metrics */}
      <div className="deals-header">
        <div className="header-left">
          <div className="deals-title-container">
            <h2 className="deals-title">
              <span className="live-indicator">🔴</span>
              <span className="gradient-text">WALMART LIVE DEALS</span>
              <span className="pulse-dot"></span>
            </h2>
            <div className="deals-subtitle">
              Real-time flash deals • Limited time offers
            </div>
          </div>
          
          {/* Live Metrics Dashboard */}
          <div className="live-metrics">
            <div className="metric-item">
              <div className="metric-icon">⚡</div>
              <div className="metric-content">
                <div className="metric-value">{formatNumber(liveDealCount)}</div>
                <div className="metric-label">Live Deals</div>
              </div>
            </div>
            
            <div className="metric-item">
              <div className="metric-icon">💰</div>
              <div className="metric-content">
                <div className="metric-value">${formatNumber(totalSavings)}</div>
                <div className="metric-label">Total Savings</div>
              </div>
            </div>
            
            <div className="metric-item">
              <div className="metric-icon">👥</div>
              <div className="metric-content">
                <div className="metric-value">{formatNumber(activeUsers)}</div>
                <div className="metric-label">Shopping Now</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div className={`countdown-timer ${isFlashing ? 'flashing' : ''}`}>
          <div className="timer-label">FLASH SALE ENDS IN</div>
          <div className="timer-display">
            <div className="time-unit">
              <span className="time-value">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="time-label">HRS</span>
            </div>
            <div className="timer-separator">:</div>
            <div className="time-unit">
              <span className="time-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="time-label">MIN</span>
            </div>
            <div className="timer-separator">:</div>
            <div className="time-unit">
              <span className="time-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="time-label">SEC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deals Grid Container */}
      <div className="deals-grid-container">
        <button 
          className="scroll-btn scroll-left"
          onClick={() => scrollDealsGrid('left')}
        >
          <span className="scroll-icon">‹</span>
        </button>

        <div className="deals-grid" id="liveDealsGrid">
          {liveDeals.map((deal, index) => (
            <div 
              key={deal.id} 
              className={`deal-card ${deal.flashSale ? 'flash-sale' : ''} ${index === currentDeal ? 'highlighted' : ''}`}
            >
              {/* Deal Badges */}
              <div className="deal-badges">
                {deal.flashSale && (
                  <div className="flash-badge">
                    <span className="flash-icon">⚡</span>
                    FLASH
                  </div>
                )}
                {deal.trending && (
                  <div className="trending-badge">
                    <span className="trending-icon">🔥</span>
                    TRENDING
                  </div>
                )}
                <div className="discount-badge">
                  -{deal.discount}%
                </div>
              </div>

              {/* Product Image */}
              <div className="deal-image-container">
                <img 
                  src={deal.image} 
                  alt={deal.name}
                  className="deal-image"
                  onClick={() => onProductClick && onProductClick(deal)}
                />
                
                {/* Live Activity Indicator */}
                <div className="live-activity">
                  <div className="activity-pulse"></div>
                  <span className="activity-text">{deal.liveBuyers} viewing</span>
                </div>

                {/* Stock Warning */}
                {deal.stockLeft <= 10 && (
                  <div className="stock-warning">
                    ⚠️ Only {deal.stockLeft} left!
                  </div>
                )}
              </div>

              {/* Deal Content */}
              <div className="deal-content">
                <h3 className="deal-name">{deal.name}</h3>
                
                {/* Rating */}
                <div className="deal-rating">
                  <div className="stars">
                    {'★'.repeat(Math.floor(deal.rating))}
                    {'☆'.repeat(5 - Math.floor(deal.rating))}
                  </div>
                  <span className="rating-text">
                    {deal.rating} ({formatNumber(deal.reviews)})
                  </span>
                </div>

                {/* Price Display */}
                <div className="deal-pricing">
                  <div className="current-price">
                    ${deal.dealPrice.toFixed(2)}
                  </div>
                  <div className="original-price">
                    ${deal.originalPrice.toFixed(2)}
                  </div>
                  <div className="savings-amount">
                    You save ${(deal.originalPrice - deal.dealPrice).toFixed(2)}
                  </div>
                </div>

                {/* Live Metrics */}
                <div className="deal-metrics">
                  <div className="metric">
                    <span className="metric-icon">🛒</span>
                    <span className="metric-text">{formatNumber(deal.soldCount)} sold</span>
                  </div>
                  <div className="metric">
                    <span className="metric-icon">💫</span>
                    <span className="metric-text">${formatNumber(deal.savingsToday)} saved today</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="deal-actions">
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => onAddToCart && onAddToCart(deal)}
                  >
                    <span className="btn-icon">🛒</span>
                    <span className="btn-text">Add to Cart</span>
                    <div className="btn-glow"></div>
                  </button>
                  
                  <button className="wishlist-btn">
                    <span className="heart-icon">♡</span>
                  </button>
                </div>

                {/* Progress Bar for Stock */}
                <div className="stock-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${Math.max(10, (deal.stockLeft / 100) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="stock-text">
                    {deal.stockLeft} left in stock
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          className="scroll-btn scroll-right"
          onClick={() => scrollDealsGrid('right')}
        >
          <span className="scroll-icon">›</span>
        </button>
      </div>

      {/* Live Updates Ticker */}
      <div className="live-updates-ticker">
        <div className="ticker-content">
          <span className="ticker-item">
            🔥 Sarah just saved $200 on iPhone 15 Pro
          </span>
          <span className="ticker-item">
            ⚡ Flash deal on MacBook ends in 2 hours
          </span>
          <span className="ticker-item">
            🎉 Over 1000 customers saved today
          </span>
          <span className="ticker-item">
            🏃‍♂️ Limited time: Free shipping on all deals
          </span>
        </div>
      </div>
    </section>
  );
}

export default WalmartLiveDeals;
