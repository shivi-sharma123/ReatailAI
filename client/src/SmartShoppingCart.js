import React, { useState, useEffect } from 'react';
import './SmartShoppingCart.css';

const SmartShoppingCart = ({ isVisible, onClose, onShowAR }) => {
  const [cartItems, setCartItems] = useState([]);
  const [priceOptimization, setPriceOptimization] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savingsUnlocked, setSavingsUnlocked] = useState(0);
  const [optimizationMode, setOptimizationMode] = useState('smart');

  // Add real-time price tracking simulation
  const [realTimeUpdates, setRealTimeUpdates] = useState({
    priceDrops: 0,
    couponsFound: 0,
    savingsToday: 0
  });

  // Initialize cart with demo products
  useEffect(() => {
    if (isVisible) {
      fetchCartData();
      const interval = setInterval(updatePriceOptimization, 10000); // Update every 10 seconds
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  // Simulate real-time updates
  useEffect(() => {
    if (isVisible) {
      const updateInterval = setInterval(() => {
        setRealTimeUpdates(prev => ({
          priceDrops: prev.priceDrops + Math.floor(Math.random() * 2),
          couponsFound: prev.couponsFound + Math.floor(Math.random() * 3),
          savingsToday: prev.savingsToday + (Math.random() * 5)
        }));
      }, 3000);
      
      return () => clearInterval(updateInterval);
    }
  }, [isVisible]);

  // Add notification system for real-time updates
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    if (isVisible && cartItems.length > 0) {
      const notificationInterval = setInterval(() => {
        const messages = [
          "💰 Price drop detected on Nike Air Max!",
          "🎫 New coupon available: SAVE15",
          "📊 Your cart optimization score: 95%",
          "⚡ Smart bundle discount applied",
          "🔥 Limited time offer on AirPods Pro"
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const newNotification = {
          id: Date.now(),
          message: randomMessage,
          timestamp: new Date().toLocaleTimeString()
        };
        
        setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
        }, 5000);
      }, 7000);
      
      return () => clearInterval(notificationInterval);
    }
  }, [isVisible, cartItems]);

  const fetchCartData = async () => {
    setIsLoading(true);
    try {
      // Generate demo cart items first
      const demoItems = [
        {
          id: 1,
          name: 'Nike Air Max 270',
          category: 'Footwear',
          emoji: '👟',
          originalPrice: 159.99,
          currentPrice: 159.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
          savings: 0,
          color: 'Black/Blue'
        },
        {
          id: 2,
          name: 'Apple AirPods Pro',
          category: 'Electronics',
          emoji: '🎧',
          originalPrice: 249.99,
          currentPrice: 249.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300',
          savings: 0,
          color: 'White'
        },
        {
          id: 3,
          name: 'Levi\'s 501 Jeans',
          category: 'Apparel',
          emoji: '👖',
          originalPrice: 89.99,
          currentPrice: 89.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300',
          savings: 0,
          color: 'Dark Blue'
        }
      ];

      setCartItems(demoItems);

      // Use our Tier 1 Cart Optimization API
      const optimizationResponse = await fetch('http://localhost:5000/api/cart/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: demoItems.map(item => ({
            name: item.name,
            price: item.currentPrice,
            quantity: item.quantity,
            category: item.category
          })),
          userTier: 'premium' // Demo as premium user
        })
      });

      if (optimizationResponse.ok) {
        const optimizationResult = await optimizationResponse.json();
        if (optimizationResult.success) {
          const optimization = optimizationResult.data;
          
          // Transform backend optimization to frontend format
          const transformedOptimization = {
            bundleDiscounts: (optimization.optimizations || [])
              .filter(opt => opt.type === 'bundle')
              .map(opt => ({
                title: opt.title,
                description: opt.description,
                items: ['Nike Air Max', 'AirPods Pro'],
                savings: opt.savings,
                percentage: 15
              })),
            smartCoupons: (optimization.optimizations || [])
              .filter(opt => opt.type === 'loyalty')
              .map(opt => ({
                code: 'SMART' + Math.floor(Math.random() * 1000),
                description: opt.description,
                savings: opt.savings,
                expiresIn: '2 hours'
              })),
            priceAlerts: optimization.smart_suggestions?.map(suggestion => ({
              item: suggestion.name,
              currentPrice: suggestion.price,
              predictedDrop: suggestion.price * 0.9,
              dropProbability: 85,
              timeframe: '24 hours'
            })) || [],
            dynamicPricing: {
              enabled: true,
              savings: optimization.total_savings || 0,
              algorithm: 'ml_v2.1'
            },
            loyaltyPoints: {
              current: 1250,
              earning: Math.floor(optimization.final_total / 10),
              redeemable: 25.50
            },
            totalSavings: optimization.total_savings || 0,
            optimizationScore: optimization.optimization_score || 'excellent'
          };

          setPriceOptimization(transformedOptimization);
          setSavingsUnlocked(optimization.total_savings || 0);

          // Get AI recommendations
          const recommendationsResponse = await fetch('http://localhost:5000/api/recommendations', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: 'cart_user_' + Date.now(),
              category: 'Electronics',
              priceRange: [20, 100]
            })
          });

          if (recommendationsResponse.ok) {
            const recResult = await recommendationsResponse.json();
            if (recResult.success && recResult.data.recommendations) {
              const transformedRecs = recResult.data.recommendations.slice(0, 3).map(rec => ({
                id: rec.id,
                name: rec.name,
                category: rec.category,
                emoji: getEmojiForCategory(rec.category),
                price: rec.price,
                reason: rec.reason,
                confidence: rec.aiScore,
                image: rec.image
              }));
              setRecommendations(transformedRecs);
            }
          }
        } else {
          generateSmartCartData();
        }
      } else {
        generateSmartCartData();
      }
    } catch (error) {
      console.error('Cart optimization error:', error);
      generateSmartCartData();
    }
    setIsLoading(false);
  };

  const getEmojiForCategory = (category) => {
    const categoryMap = {
      'Electronics': '📱',
      'Fashion': '👕',
      'Home & Kitchen': '🏠',
      'Wearables': '⌚',
      'Audio': '🎧'
    };
    return categoryMap[category] || '📦';
  };

  const generateSmartCartData = () => {
    const sampleItems = [
      {
        id: 1,
        name: 'Nike Air Max 270',
        category: 'Footwear',
        emoji: '👟',
        originalPrice: 159.99,
        currentPrice: 159.99,
        quantity: 1,
        size: 'US 10',
        color: 'Royal Blue',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
        inStock: true,
        estimatedDelivery: '2-3 days'
      },
      {
        id: 2,
        name: 'Apple Watch Series 9',
        category: 'Electronics',
        emoji: '⌚',
        originalPrice: 429.99,
        currentPrice: 429.99,
        quantity: 1,
        size: '45mm',
        color: 'Matte Black',
        image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop',
        inStock: true,
        estimatedDelivery: '1-2 days'
      },
      {
        id: 3,
        name: 'Levi\'s 501 Jeans',
        category: 'Apparel',
        emoji: '👖',
        originalPrice: 89.99,
        currentPrice: 89.99,
        quantity: 2,
        size: '32x34',
        color: 'Dark Wash',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=300&fit=crop',
        inStock: true,
        estimatedDelivery: '2-3 days'
      }
    ];

    const optimization = {
      bundleDiscounts: [
        { items: ['Nike Air Max 270', 'Athletic Socks'], discount: 15, savings: 12.50 },
        { items: ['Apple Watch', 'Watch Band'], discount: 10, savings: 8.99 }
      ],
      priceAlerts: [
        { item: 'Nike Air Max 270', currentPrice: 159.99, alertPrice: 149.99, dropProbability: 85 },
        { item: 'Apple Watch Series 9', currentPrice: 429.99, alertPrice: 399.99, dropProbability: 60 }
      ],
      smartCoupons: [
        { code: 'FIRST15', discount: 15, minOrder: 100, savings: 20.85 },
        { code: 'BUNDLE20', discount: 20, category: 'Athletic', savings: 31.99 }
      ],
      loyaltyPoints: {
        current: 2450,
        earnFromOrder: 139,
        redeemable: 24.50
      }
    };

    const recs = [
      {
        id: 4,
        name: 'Athletic Crew Socks',
        category: 'Accessories',
        emoji: '🧦',
        price: 12.99,
        bundleWith: 'Nike Air Max 270',
        bundleSavings: 15,
        reason: 'Perfect match for your Nike sneakers'
      },
      {
        id: 5,
        name: 'Premium Watch Band',
        category: 'Accessories',
        emoji: '⌚',
        price: 39.99,
        bundleWith: 'Apple Watch Series 9',
        bundleSavings: 10,
        reason: 'Upgrade your Apple Watch style'
      },
      {
        id: 6,
        name: 'Leather Belt',
        category: 'Accessories',
        emoji: '👔',
        price: 29.99,
        bundleWith: 'Levi\'s 501 Jeans',
        bundleSavings: 12,
        reason: 'Complete your denim look'
      }
    ];

    setCartItems(sampleItems);
    setPriceOptimization(optimization);
    setRecommendations(recs);
    calculateSavings(sampleItems, optimization);
  };

  const updatePriceOptimization = () => {
    // Simulate real-time price optimization
    setPriceOptimization(prev => ({
      ...prev,
      priceAlerts: prev.priceAlerts?.map(alert => ({
        ...alert,
        dropProbability: Math.min(95, alert.dropProbability + Math.random() * 5)
      }))
    }));
  };

  const calculateSavings = (items, optimization) => {
    let totalSavings = 0;
    
    // Bundle savings
    optimization.bundleDiscounts?.forEach(bundle => {
      totalSavings += bundle.savings;
    });
    
    // Coupon savings
    optimization.smartCoupons?.forEach(coupon => {
      totalSavings += coupon.savings;
    });
    
    // Loyalty points
    if (optimization.loyaltyPoints) {
      totalSavings += optimization.loyaltyPoints.redeemable;
    }
    
    setSavingsUnlocked(totalSavings);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(itemId);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const addRecommendation = (rec) => {
    const newItem = {
      id: rec.id,
      name: rec.name,
      category: rec.category,
      emoji: rec.emoji,
      originalPrice: rec.price,
      currentPrice: rec.price * (1 - rec.bundleSavings / 100),
      quantity: 1,
      bundleDiscount: rec.bundleSavings,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop'
    };
    
    setCartItems(prev => [...prev, newItem]);
    setRecommendations(prev => prev.filter(r => r.id !== rec.id));
  };

  const applyCoupon = (coupon) => {
    // Apply coupon logic
    console.log('Applying coupon:', coupon.code);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = subtotal * 0.08;
    const shipping = subtotal > 50 ? 0 : 9.99;
    return subtotal + tax + shipping - savingsUnlocked;
  };

  // Handle AR experience for cart items
  const handleARView = (item, e) => {
    e.stopPropagation();
    
    // Convert cart item to AR format
    const arProduct = {
      id: item.id,
      name: item.name,
      description: `Experience ${item.name} in AR`,
      price: item.currentPrice,
      image_url: item.image,
      images: [item.image],
      colors: [
        {'name': item.color || 'Default', 'hex': '#333333', 'price_modifier': 0},
        {'name': 'Alternative', 'hex': '#666666', 'price_modifier': 5}
      ],
      sizes: [
        {'size': item.size || 'Regular', 'price_modifier': 0},
        {'size': 'Large', 'price_modifier': 10}
      ],
      category: item.category,
      brand: 'Premium',
      ar_enabled: true
    };
    
    if (onShowAR) {
      onShowAR(arProduct);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="cart-overlay">
      <div className="smart-shopping-cart">
        {/* Header */}
        <div className="cart-header">
          <div className="cart-title">
            <span className="cart-icon">🛒</span>
            <h2>Smart Shopping Cart</h2>
            <div className="optimization-badge">
              <span className="opt-icon">🧠</span>
              <span>AI Optimized</span>
            </div>
          </div>
          <div className="cart-controls">
            <select 
              value={optimizationMode} 
              onChange={(e) => setOptimizationMode(e.target.value)}
              className="optimization-select"
            >
              <option value="smart">Smart Savings</option>
              <option value="fast">Fast Checkout</option>
              <option value="eco">Eco-Friendly</option>
            </select>
            <button className="close-cart-btn" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Real-time Notifications */}
        {notifications.length > 0 && (
          <div className="smart-notifications">
            <div className="notifications-header">
              <span className="notification-icon">🔔</span>
              <span>Live Updates</span>
            </div>
            <div className="notifications-list">
              {notifications.map(notification => (
                <div key={notification.id} className="notification-item">
                  <span className="notification-message">{notification.message}</span>
                  <span className="notification-time">{notification.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Real-time Stats */}
        <div className="real-time-stats">
          <div className="stat-item">
            <span className="stat-icon">📉</span>
            <span className="stat-label">Price Drops Today</span>
            <span className="stat-value">{realTimeUpdates.priceDrops}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🎫</span>
            <span className="stat-label">Coupons Found</span>
            <span className="stat-value">{realTimeUpdates.couponsFound}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">💰</span>
            <span className="stat-label">Savings Today</span>
            <span className="stat-value">${realTimeUpdates.savingsToday.toFixed(2)}</span>
          </div>
        </div>

        {isLoading ? (
          <div className="cart-loading">
            <div className="loading-spinner"></div>
            <p>Optimizing your cart...</p>
          </div>
        ) : (
          <div className="cart-content">
            {/* Savings Summary */}
            <div className="savings-summary">
              <div className="savings-card">
                <div className="savings-icon">💰</div>
                <div className="savings-info">
                  <h3>${savingsUnlocked.toFixed(2)} Saved</h3>
                  <p>With smart optimization</p>
                </div>
                <div className="savings-percentage">
                  {((savingsUnlocked / (calculateSubtotal() + savingsUnlocked)) * 100).toFixed(0)}% off
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="cart-items-section">
              <h3>🛍️ Your Items ({cartItems.length})</h3>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                      <div className="item-emoji">{item.emoji}</div>
                      <div className="ar-overlay">
                        <button 
                          className="ar-try-btn"
                          onClick={(e) => handleARView(item, e)}
                          title="Try in AR"
                          style={{
                            position: 'absolute',
                            bottom: '5px',
                            right: '5px',
                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '30px',
                            height: '30px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: '0.9'
                          }}
                        >
                          🥽
                        </button>
                      </div>
                    </div>
                    
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <div className="item-specs">
                        <span className="item-color">Color: {item.color}</span>
                        <span className="item-size">Size: {item.size}</span>
                      </div>
                      <div className="item-delivery">🚚 {item.estimatedDelivery}</div>
                    </div>
                    
                    <div className="item-pricing">
                      {item.bundleDiscount ? (
                        <div className="price-with-discount">
                          <span className="original-price">${item.originalPrice}</span>
                          <span className="current-price">${item.currentPrice.toFixed(2)}</span>
                          <span className="discount-badge">-{item.bundleDiscount}%</span>
                        </div>
                      ) : (
                        <span className="current-price">${item.currentPrice.toFixed(2)}</span>
                      )}
                    </div>
                    
                    <div className="item-quantity">
                      <button 
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="qty-display">{item.quantity}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      className="remove-item-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      🗑️
                    </button>

                    {/* AR View Button */}
                    <button 
                      className="ar-view-btn"
                      onClick={(e) => handleARView(item, e)}
                    >
                      🕶️ View in AR
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Optimization Features */}
            <div className="optimization-section">
              {/* Smart Recommendations */}
              {recommendations.length > 0 && (
                <div className="recommendations">
                  <h3>🎯 Smart Bundle Recommendations</h3>
                  <div className="recommendation-cards">
                    {recommendations.map(rec => (
                      <div key={rec.id} className="recommendation-card">
                        <div className="rec-emoji">{rec.emoji}</div>
                        <div className="rec-details">
                          <h4>{rec.name}</h4>
                          <p>{rec.reason}</p>
                          <div className="rec-pricing">
                            <span className="rec-price">${rec.price}</span>
                            <span className="rec-savings">Save {rec.bundleSavings}%</span>
                          </div>
                        </div>
                        <button 
                          className="add-rec-btn"
                          onClick={() => addRecommendation(rec)}
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Smart Coupons */}
              <div className="smart-coupons">
                <h3>🎫 Smart Coupons Available</h3>
                <div className="coupon-cards">
                  {priceOptimization.smartCoupons?.map((coupon, index) => (
                    <div key={index} className="coupon-card">
                      <div className="coupon-code">{coupon.code}</div>
                      <div className="coupon-details">
                        <span className="coupon-discount">{coupon.discount}% OFF</span>
                        <span className="coupon-savings">Save ${coupon.savings}</span>
                      </div>
                      <button 
                        className="apply-coupon-btn"
                        onClick={() => applyCoupon(coupon)}
                      >
                        Apply
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Alerts */}
              <div className="price-alerts">
                <h3>📈 Price Drop Predictions</h3>
                <div className="alert-cards">
                  {priceOptimization.priceAlerts?.map((alert, index) => (
                    <div key={index} className="alert-card">
                      <div className="alert-item">{alert.item}</div>
                      <div className="alert-pricing">
                        <span className="current-alert-price">${alert.currentPrice}</span>
                        <span className="target-price">→ ${alert.alertPrice}</span>
                      </div>
                      <div className="drop-probability">
                        <div className="probability-bar">
                          <div 
                            className="probability-fill"
                            style={{ width: `${alert.dropProbability}%` }}
                          ></div>
                        </div>
                        <span>{alert.dropProbability.toFixed(0)}% chance this week</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Loyalty Points */}
              {priceOptimization.loyaltyPoints && (
                <div className="loyalty-section">
                  <h3>⭐ Loyalty Rewards</h3>
                  <div className="loyalty-card">
                    <div className="loyalty-current">
                      <span className="points-icon">💎</span>
                      <div className="points-info">
                        <span className="points-amount">{priceOptimization.loyaltyPoints.current}</span>
                        <span className="points-label">Current Points</span>
                      </div>
                    </div>
                    <div className="loyalty-earn">
                      <span>+{priceOptimization.loyaltyPoints.earnFromOrder} from this order</span>
                    </div>
                    <div className="loyalty-redeem">
                      <span>${priceOptimization.loyaltyPoints.redeemable} available to redeem</span>
                      <button className="redeem-btn">Use Points</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <h3>📋 Order Summary</h3>
              <div className="summary-lines">
                <div className="summary-line">
                  <span>Subtotal:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="summary-line savings">
                  <span>Smart Savings:</span>
                  <span>-${savingsUnlocked.toFixed(2)}</span>
                </div>
                <div className="summary-line">
                  <span>Tax:</span>
                  <span>${(calculateSubtotal() * 0.08).toFixed(2)}</span>
                </div>
                <div className="summary-line">
                  <span>Shipping:</span>
                  <span>{calculateSubtotal() > 50 ? 'FREE' : '$9.99'}</span>
                </div>
                <div className="summary-line total">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Actions */}
            <div className="checkout-actions">
              <button className="continue-shopping-btn">
                ← Continue Shopping
              </button>
              <button className="checkout-btn">
                🚀 Smart Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartShoppingCart;
