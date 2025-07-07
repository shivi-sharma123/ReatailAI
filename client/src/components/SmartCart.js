import React, { useState, useEffect } from 'react';
import './SmartCart.css';

const SmartCart = ({ isOpen, onClose, cartItems = [], onUpdateCart }) => {
  const [cartData, setCartData] = useState(cartItems);
  const [recommendations, setRecommendations] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [predictedItems, setPredictedItems] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(1247);
  const [discounts, setDiscounts] = useState([]);
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // AI-powered cart analysis
  useEffect(() => {
    if (isOpen && cartData.length > 0) {
      analyzeCartWithAI();
    }
  }, [isOpen, cartData]);

  const analyzeCartWithAI = async () => {
    setLoading(true);
    
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate AI recommendations
      const aiRecommendations = await generateSmartRecommendations();
      const smartBundles = await generateBundleSuggestions();
      const predictions = await generatePredictiveItems();
      const availableDiscounts = await getAvailableDiscounts();
      const deliveryOpts = await getDeliveryOptions();
      
      setRecommendations(aiRecommendations);
      setBundles(smartBundles);
      setPredictedItems(predictions);
      setDiscounts(availableDiscounts);
      setDeliveryOptions(deliveryOpts);
      
    } catch (error) {
      console.error('Cart analysis error:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSmartRecommendations = async () => {
    return [
      {
        id: 'rec-cart-1',
        name: 'Lens Cleaning Kit',
        price: 24.99,
        reason: 'Essential for glasses maintenance',
        confidence: 92,
        category: 'Accessory',
        image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        discount: 15
      },
      {
        id: 'rec-cart-2',
        name: 'Premium Glasses Case',
        price: 39.99,
        reason: 'Protect your investment',
        confidence: 88,
        category: 'Protection',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        discount: 20
      },
      {
        id: 'rec-cart-3',
        name: 'Blue Light Filter Spray',
        price: 19.99,
        reason: 'Frequently bought together',
        confidence: 85,
        category: 'Enhancement',
        image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        discount: 10
      }
    ];
  };

  const generateBundleSuggestions = async () => {
    return [
      {
        id: 'bundle-1',
        name: 'Complete Eyecare Bundle',
        items: ['Glasses', 'Case', 'Cleaning Kit', 'Blue Light Spray'],
        originalPrice: 189.96,
        bundlePrice: 149.99,
        savings: 39.97,
        confidence: 95,
        popularity: '89% of customers choose this'
      },
      {
        id: 'bundle-2',
        name: 'Professional Bundle',
        items: ['Glasses', 'Premium Case', 'Cleaning Kit'],
        originalPrice: 164.97,
        bundlePrice: 134.99,
        savings: 29.98,
        confidence: 87,
        popularity: '67% of professionals prefer this'
      }
    ];
  };

  const generatePredictiveItems = async () => {
    return [
      {
        id: 'pred-1',
        name: 'Prescription Refill',
        reason: 'Due next month based on your history',
        probability: 94,
        action: 'Schedule Now',
        icon: '📋'
      },
      {
        id: 'pred-2',
        name: 'Seasonal Sunglasses',
        reason: 'Summer collection launches soon',
        probability: 78,
        action: 'Get Early Access',
        icon: '☀️'
      }
    ];
  };

  const getAvailableDiscounts = async () => {
    return [
      {
        id: 'disc-1',
        type: 'loyalty',
        title: 'Loyalty Member Discount',
        description: '10% off your entire order',
        value: 10,
        applicable: true,
        code: 'LOYAL10'
      },
      {
        id: 'disc-2',
        type: 'bundle',
        title: 'Bundle Savings',
        description: 'Save $39.97 with complete bundle',
        value: 39.97,
        applicable: false,
        requirements: 'Add cleaning kit to qualify'
      },
      {
        id: 'disc-3',
        type: 'first-time',
        title: 'New Customer Special',
        description: '15% off first purchase',
        value: 15,
        applicable: true,
        code: 'WELCOME15'
      }
    ];
  };

  const getDeliveryOptions = async () => {
    return [
      {
        id: 'delivery-1',
        type: 'express',
        title: 'Express Delivery',
        time: 'Today by 6 PM',
        price: 9.99,
        recommended: true,
        icon: '⚡'
      },
      {
        id: 'delivery-2',
        type: 'standard',
        title: 'Standard Delivery',
        time: '2-3 business days',
        price: 4.99,
        recommended: false,
        icon: '📦'
      },
      {
        id: 'delivery-3',
        type: 'pickup',
        title: 'Store Pickup',
        time: 'Ready in 2 hours',
        price: 0,
        recommended: false,
        icon: '🏪'
      }
    ];
  };

  const calculateCartTotal = () => {
    const subtotal = cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const applicableDiscounts = discounts.filter(d => d.applicable);
    const discountAmount = applicableDiscounts.reduce((sum, discount) => {
      return sum + (discount.type === 'loyalty' || discount.type === 'first-time' 
        ? subtotal * (discount.value / 100) 
        : discount.value);
    }, 0);
    
    return {
      subtotal,
      discountAmount,
      total: subtotal - discountAmount
    };
  };

  const addRecommendationToCart = (recommendation) => {
    const newItem = {
      id: recommendation.id,
      name: recommendation.name,
      price: recommendation.price * (1 - recommendation.discount / 100),
      originalPrice: recommendation.price,
      quantity: 1,
      image: recommendation.image,
      category: recommendation.category
    };
    
    setCartData(prev => [...prev, newItem]);
    onUpdateCart && onUpdateCart([...cartData, newItem]);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      setCartData(prev => prev.filter(item => item.id !== itemId));
    } else {
      setCartData(prev => prev.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const applyBundle = (bundle) => {
    // Logic to apply bundle pricing
    console.log('Applying bundle:', bundle);
  };

  const { subtotal, discountAmount, total } = calculateCartTotal();

  if (!isOpen) return null;

  return (
    <div className="smart-cart">
      <div className="cart-overlay" onClick={onClose}></div>
      <div className="cart-container">
        {/* Header */}
        <div className="cart-header">
          <div className="header-info">
            <h2>🛒 Smart Cart</h2>
            <div className="ai-badge">
              <span className="ai-icon">🧠</span>
              AI-Powered
            </div>
          </div>
          <button className="close-cart-btn" onClick={onClose}>✕</button>
        </div>

        <div className="cart-content">
          {loading ? (
            <div className="cart-loading">
              <div className="loading-spinner">🔄</div>
              <p>AI is analyzing your cart...</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="cart-items-section">
                <h3>Your Items ({cartData.length})</h3>
                <div className="cart-items">
                  {cartData.map((item) => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} className="item-image" />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p className="item-category">{item.category}</p>
                        <div className="item-price">
                          <span className="current-price">${item.price}</span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="original-price">${item.originalPrice}</span>
                          )}
                        </div>
                      </div>
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="recommendations-section">
                <div className="section-header">
                  <h3>🤖 AI Suggestions</h3>
                  <p>Personalized just for you</p>
                </div>
                <div className="recommendations-grid">
                  {recommendations.map((rec) => (
                    <div key={rec.id} className="recommendation-card">
                      <img src={rec.image} alt={rec.name} />
                      <div className="rec-info">
                        <h4>{rec.name}</h4>
                        <p className="rec-reason">{rec.reason}</p>
                        <div className="rec-price">
                          <span className="price">${(rec.price * (1 - rec.discount / 100)).toFixed(2)}</span>
                          <span className="discount">-{rec.discount}%</span>
                        </div>
                        <div className="confidence-bar">
                          <div 
                            className="confidence-fill" 
                            style={{ width: `${rec.confidence}%` }}
                          ></div>
                          <span className="confidence-text">{rec.confidence}% match</span>
                        </div>
                        <button 
                          className="add-rec-btn"
                          onClick={() => addRecommendationToCart(rec)}
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Smart Bundles */}
              <div className="bundles-section">
                <div className="section-header">
                  <h3>📦 Smart Bundles</h3>
                  <p>Save more with curated combinations</p>
                </div>
                <div className="bundles-grid">
                  {bundles.map((bundle) => (
                    <div key={bundle.id} className="bundle-card">
                      <div className="bundle-header">
                        <h4>{bundle.name}</h4>
                        <div className="bundle-confidence">
                          <span className="confidence-badge">{bundle.confidence}% recommended</span>
                        </div>
                      </div>
                      <div className="bundle-items">
                        {bundle.items.map((item, index) => (
                          <span key={index} className="bundle-item-tag">{item}</span>
                        ))}
                      </div>
                      <div className="bundle-pricing">
                        <div className="pricing-row">
                          <span>Individual Price:</span>
                          <span className="original-bundle-price">${bundle.originalPrice}</span>
                        </div>
                        <div className="pricing-row bundle-deal">
                          <span>Bundle Price:</span>
                          <span className="bundle-price">${bundle.bundlePrice}</span>
                        </div>
                        <div className="savings-highlight">
                          Save ${bundle.savings}
                        </div>
                      </div>
                      <div className="bundle-popularity">{bundle.popularity}</div>
                      <button 
                        className="apply-bundle-btn"
                        onClick={() => applyBundle(bundle)}
                      >
                        Apply Bundle
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Predictive Shopping */}
              <div className="predictions-section">
                <div className="section-header">
                  <h3>🔮 Predictive Shopping</h3>
                  <p>Based on your shopping patterns</p>
                </div>
                <div className="predictions-list">
                  {predictedItems.map((pred) => (
                    <div key={pred.id} className="prediction-card">
                      <div className="pred-icon">{pred.icon}</div>
                      <div className="pred-content">
                        <h4>{pred.name}</h4>
                        <p>{pred.reason}</p>
                        <div className="prediction-probability">
                          <div className="prob-bar">
                            <div 
                              className="prob-fill" 
                              style={{ width: `${pred.probability}%` }}
                            ></div>
                          </div>
                          <span>{pred.probability}% likely</span>
                        </div>
                      </div>
                      <button className="pred-action-btn">{pred.action}</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Loyalty & Discounts */}
              <div className="loyalty-section">
                <div className="loyalty-header">
                  <h3>⭐ Loyalty Rewards</h3>
                  <div className="points-display">
                    <span className="points-number">{loyaltyPoints}</span>
                    <span className="points-label">points</span>
                  </div>
                </div>
                <div className="discounts-available">
                  {discounts.map((discount) => (
                    <div key={discount.id} className={`discount-card ${discount.applicable ? 'applicable' : 'locked'}`}>
                      <div className="discount-info">
                        <h4>{discount.title}</h4>
                        <p>{discount.description}</p>
                        {discount.code && (
                          <div className="discount-code">Code: {discount.code}</div>
                        )}
                        {!discount.applicable && discount.requirements && (
                          <div className="requirements">{discount.requirements}</div>
                        )}
                      </div>
                      <div className="discount-value">
                        {typeof discount.value === 'number' && discount.value < 50 
                          ? `${discount.value}%` 
                          : `$${discount.value}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Options */}
              <div className="delivery-section">
                <h3>🚚 Delivery Options</h3>
                <div className="delivery-options">
                  {deliveryOptions.map((option) => (
                    <div key={option.id} className={`delivery-option ${option.recommended ? 'recommended' : ''}`}>
                      <div className="delivery-icon">{option.icon}</div>
                      <div className="delivery-info">
                        <h4>{option.title}</h4>
                        <p>{option.time}</p>
                      </div>
                      <div className="delivery-price">
                        {option.price === 0 ? 'Free' : `$${option.price}`}
                      </div>
                      {option.recommended && (
                        <div className="recommended-badge">Recommended</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Cart Summary */}
        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="summary-row discount-row">
              <span>Discounts Applied:</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="summary-row total-row">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="loyalty-earning">
            <span>🌟 You'll earn {Math.floor(total * 10)} loyalty points</span>
          </div>
          <button className="checkout-btn">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartCart;
