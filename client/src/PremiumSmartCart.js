
import React, { useState, useEffect, useCallback } from 'react';
import './PremiumMobile.css';
import './SmartShoppingCart.css';

const PremiumSmartCart = ({ isVisible, onClose, onShowAR }) => {
  // State management
  const [cartItems, setCartItems] = useState([]);
  const [intelligence, setIntelligence] = useState({
    totalSavings: 0,
    optimizationScore: 95,
    priceDrops: 0,
    couponsAvailable: 3,
    bundleDeals: 2,
    recommendedItems: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Real-time intelligence updates
  useEffect(() => {
    if (isVisible) {
      initializeCart();
      const interval = setInterval(updateIntelligence, 5000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const initializeCart = () => {
    const demoItems = [
      {
        id: 1,
        name: 'iPhone 15 Pro Max',
        category: 'Electronics',
        originalPrice: 1199.99,
        currentPrice: 1149.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1592286354297-42fea5f6ffe1?w=300',
        savings: 50.00,
        color: 'Natural Titanium',
        size: '256GB',
        smartFeatures: {
          priceTracking: true,
          arPreview: true,
          personalizedDiscount: 4.2
        }
      },
      {
        id: 2,
        name: 'AirPods Pro (3rd Gen)',
        category: 'Audio',
        originalPrice: 249.99,
        currentPrice: 199.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=300',
        savings: 50.00,
        color: 'White',
        smartFeatures: {
          bundleAvailable: true,
          loyaltyBonus: 5.0
        }
      },
      {
        id: 3,
        name: 'Apple Watch Series 9',
        category: 'Wearables',
        originalPrice: 429.99,
        currentPrice: 379.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
        savings: 50.00,
        color: 'Midnight',
        size: '45mm',
        smartFeatures: {
          healthTracking: true,
          arTryOn: true
        }
      }
    ];
    
    setCartItems(demoItems);
    calculateIntelligence(demoItems);
  };

  const calculateIntelligence = (items) => {
    const totalSavings = items.reduce((sum, item) => sum + (item.savings * item.quantity), 0);
    const totalValue = items.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
    const optimizationScore = Math.min(100, Math.round((totalSavings / totalValue) * 100) + 85);
    
    setIntelligence(prev => ({
      ...prev,
      totalSavings,
      optimizationScore,
      priceDrops: Math.floor(Math.random() * 3) + 1,
      couponsAvailable: Math.floor(Math.random() * 5) + 2
    }));
  };

  const updateIntelligence = () => {
    setIntelligence(prev => ({
      ...prev,
      priceDrops: prev.priceDrops + Math.floor(Math.random() * 2),
      couponsAvailable: prev.couponsAvailable + Math.floor(Math.random() * 2),
      optimizationScore: Math.min(100, prev.optimizationScore + Math.floor(Math.random() * 3))
    }));

    // Add real-time notifications
    const smartNotifications = [
      "🎯 Bundle deal detected: Save $25 on Apple ecosystem",
      "💰 Price drop alert: AirPods Pro now $199.99",
      "🏆 You're earning 2x loyalty points today!",
      "⚡ Limited time: Free next-day delivery available",
      "🔥 Similar shoppers saved $45 on this combination"
    ];

    const randomNotification = smartNotifications[Math.floor(Math.random() * smartNotifications.length)];
    addNotification(randomNotification);
  };

  const addNotification = (message) => {
    const notification = {
      id: Date.now(),
      message,
      timestamp: new Date().toLocaleTimeString(),
      type: 'smart'
    };
    
    setNotifications(prev => [notification, ...prev.slice(0, 2)]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 4000);
  };

  const updateQuantity = (itemId, change) => {
    setCartItems(prev => {
      const updated = prev.map(item => {
        if (item.id === itemId) {
          const newQuantity = Math.max(0, item.quantity + change);
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean);
      
      calculateIntelligence(updated);
      return updated;
    });
  };

  const removeItem = (itemId) => {
    setCartItems(prev => {
      const updated = prev.filter(item => item.id !== itemId);
      calculateIntelligence(updated);
      return updated;
    });
    addNotification("🗑️ Item removed from cart");
  };

  const getTotalAmount = () => {
    return cartItems.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);
  };

  const getOriginalAmount = () => {
    return cartItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  };

  const handleCheckout = () => {
    setIsLoading(true);
    addNotification("🚀 Processing your smart checkout...");
    
    setTimeout(() => {
      setIsLoading(false);
      addNotification("✅ Order placed successfully! Track your delivery in real-time.");
    }, 2000);
  };

  const handleARPreview = (item) => {
    if (onShowAR) {
      onShowAR(item);
    }
    addNotification(`🥽 Launching AR preview for ${item.name}`);
  };

  if (!isVisible) return null;

  return (
    <div className={`premium-smart-cart ${isVisible ? 'open' : ''}`}>
      {/* Cart Header */}
      <div className="cart-header">
        <div className="cart-title">
          🛒 Smart Trolley
          <span className="cart-badge">{cartItems.length}</span>
        </div>
        <button className="cart-close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      {/* Real-time Notifications */}
      {notifications.length > 0 && (
        <div className="notifications-panel">
          {notifications.map(notification => (
            <div key={notification.id} className="notification-item">
              <span className="notification-message">{notification.message}</span>
              <span className="notification-time">{notification.timestamp}</span>
            </div>
          ))}
        </div>
      )}

      {/* Cart Content */}
      <div className="cart-content">
        {/* Intelligence Panel */}
        <div className="cart-intelligence-panel">
          <div className="intelligence-header">
            🧠 Smart Shopping Intelligence
          </div>
          <div className="intelligence-stats">
            <div className="stat-card">
              <div className="stat-value">${intelligence.totalSavings.toFixed(2)}</div>
              <div className="stat-label">Total Savings</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{intelligence.optimizationScore}%</div>
              <div className="stat-label">Optimization Score</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{intelligence.priceDrops}</div>
              <div className="stat-label">Price Drops Today</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{intelligence.couponsAvailable}</div>
              <div className="stat-label">Coupons Available</div>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="cart-items-section">
          <h3 className="section-title">Your Items ({cartItems.length})</h3>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-content">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="item-image"
                />
                <div className="item-details">
                  <div className="item-name">{item.name}</div>
                  <div className="item-category">
                    {item.category}
                    {item.color && ` • ${item.color}`}
                    {item.size && ` • ${item.size}`}
                  </div>
                  <div className="item-price-row">
                    <div className="item-price">${item.currentPrice.toFixed(2)}</div>
                    {item.savings > 0 && (
                      <div className="item-savings">Save ${item.savings.toFixed(2)}</div>
                    )}
                  </div>
                  
                  {/* Smart Features */}
                  <div className="smart-features">
                    {item.smartFeatures?.arPreview && (
                      <button 
                        className="feature-btn ar-btn"
                        onClick={() => handleARPreview(item)}
                      >
                        🥽 AR Preview
                      </button>
                    )}
                    {item.smartFeatures?.bundleAvailable && (
                      <span className="feature-badge">📦 Bundle Deal</span>
                    )}
                    {item.smartFeatures?.priceTracking && (
                      <span className="feature-badge">📊 Price Tracked</span>
                    )}
                  </div>

                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      −
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                    <button 
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Checkout */}
      <div className="floating-checkout">
        <div className="checkout-summary">
          <div>
            <div className="total-amount">${getTotalAmount().toFixed(2)}</div>
            <div className="savings-amount">
              You saved ${(getOriginalAmount() - getTotalAmount()).toFixed(2)}
            </div>
          </div>
          <div className="checkout-badges">
            <span className="free-delivery">🚚 Free Delivery</span>
            <span className="loyalty-points">⭐ +{Math.floor(getTotalAmount() / 10)} Points</span>
          </div>
        </div>
        <button 
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={isLoading || cartItems.length === 0}
        >
          {isLoading ? (
            <>🔄 Processing...</>
          ) : (
            <>🚀 Smart Checkout</>
          )}
        </button>
      </div>
    </div>
  );
};

export default PremiumSmartCart;
