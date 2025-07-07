
import React, { useState, useEffect } from 'react';
import './PremiumMobile.css';

const MobileHeader = ({ onCartOpen, onSearchOpen, cartItemCount = 0 }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, [currentTime]);

  return (
    <header className="premium-mobile-header">
      <div className="mobile-header-content">
        <div className="mobile-logo">
          <div className="mobile-logo-icon">🛍️</div>
          <div className="mobile-logo-text">
            <div className="brand-name">RetailFlow</div>
            <div className="greeting">{greeting}</div>
          </div>
        </div>
        
        <div className="mobile-actions">
          <button 
            className="mobile-action-btn"
            onClick={onSearchOpen}
            aria-label="Search products"
          >
            🔍
          </button>
          
          <button 
            className="mobile-action-btn cart-btn"
            onClick={onCartOpen}
            aria-label={`Shopping cart with ${cartItemCount} items`}
          >
            🛒
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </button>
          
          <button 
            className="mobile-action-btn"
            aria-label="Notifications"
          >
            🔔
          </button>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
