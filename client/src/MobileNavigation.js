
import React, { useState, useEffect } from 'react';
import './PremiumMobile.css';

const MobileNavigation = ({ currentView, setCurrentView, cartItems = [] }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Auto-hide navigation on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { id: 'home', icon: '🏠', label: 'Home', badge: null },
    { id: 'search', icon: '🔍', label: 'Search', badge: null },
    { id: 'cart', icon: '🛒', label: 'Cart', badge: cartItems.length > 0 ? cartItems.length : null },
    { id: 'ar', icon: '🥽', label: 'AR Try-On', badge: null },
    { id: 'profile', icon: '👤', label: 'Profile', badge: null }
  ];

  return (
    <nav className={`mobile-nav ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="mobile-nav-content">
        {navItems.map(item => (
          <div
            key={item.id}
            className={`mobile-nav-item ${currentView === item.id ? 'active' : ''}`}
            onClick={() => setCurrentView(item.id)}
          >
            <div className="mobile-nav-icon">
              {item.icon}
              {item.badge && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </div>
            <span className="mobile-nav-label">{item.label}</span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;
