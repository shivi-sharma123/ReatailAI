import React, { useState, useEffect } from 'react';
import './EnhancedShoppingCart.css';

const EnhancedShoppingCart = ({ 
  isVisible, 
  onClose, 
  cartItems, 
  updateCartItems, 
  onShowAR,
  onProceedToCheckout 
}) => {
  const [localCartItems, setLocalCartItems] = useState(cartItems || []);

  useEffect(() => {
    setLocalCartItems(cartItems || []);
  }, [cartItems]);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    
    const updatedItems = localCartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setLocalCartItems(updatedItems);
    updateCartItems(updatedItems);
  };

  const removeFromCart = (productId) => {
    const updatedItems = localCartItems.filter(item => item.id !== productId);
    setLocalCartItems(updatedItems);
    updateCartItems(updatedItems);
  };

  const moveToWishlist = (productId) => {
    // Add to wishlist logic here
    removeFromCart(productId);
    alert('Item moved to wishlist!');
  };

  const calculateSubtotal = () => {
    return localCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 50 ? 0 : 9.99; // Free shipping over $50
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  const getEstimatedDelivery = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (!isVisible) return null;

  return (
    <div className="enhanced-cart-overlay">
      <div className="enhanced-cart-container">
        {/* Header */}
        <div className="enhanced-cart-header">
          <h2 className="cart-title">
            <span className="cart-icon">🛒</span>
            Shopping Cart ({localCartItems.length} items)
          </h2>
          <button className="cart-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="enhanced-cart-content">
          {localCartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Add some products to get started!</p>
              <button className="continue-shopping-btn" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="cart-items-section">
                <h3 className="section-title">Items in your cart</h3>
                
                {localCartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img 
                        src={item.image_url} 
                        alt={item.name}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/100x100/e5e7eb/6b7280?text=Product";
                        }}
                      />
                      {item.arEnabled && (
                        <button 
                          className="ar-try-btn"
                          onClick={() => onShowAR(item)}
                          title="Try in AR"
                        >
                          🥽
                        </button>
                      )}
                    </div>

                    <div className="item-details">
                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-brand">by {item.brand}</p>
                      
                      {/* Item Options */}
                      <div className="item-options">
                        {item.selectedColor && (
                          <span className="option-tag">
                            Color: {item.selectedColor}
                          </span>
                        )}
                        {item.selectedSize && (
                          <span className="option-tag">
                            Size: {item.selectedSize}
                          </span>
                        )}
                      </div>

                      {/* Availability */}
                      <div className="item-availability">
                        {item.inStock ? (
                          <span className="in-stock">✅ In Stock</span>
                        ) : (
                          <span className="out-of-stock">❌ Out of Stock</span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="item-actions">
                        <button 
                          className="action-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                        <button 
                          className="action-btn"
                          onClick={() => moveToWishlist(item.id)}
                        >
                          Move to Wishlist
                        </button>
                        {item.arEnabled && (
                          <button 
                            className="action-btn ar-btn"
                            onClick={() => onShowAR(item)}
                          >
                            Try AR
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="item-pricing">
                      <div className="quantity-controls">
                        <button 
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <div className="item-price">
                        <div className="current-price">${(item.price * item.quantity).toFixed(2)}</div>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <div className="original-price">
                            ${(item.originalPrice * item.quantity).toFixed(2)}
                          </div>
                        )}
                        <div className="unit-price">
                          ${item.price.toFixed(2)} each
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="order-summary">
                <h3 className="section-title">Order Summary</h3>
                
                <div className="summary-line">
                  <span>Subtotal ({localCartItems.length} items):</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                
                <div className="summary-line">
                  <span>Shipping:</span>
                  <span>
                    {calculateShipping() === 0 ? (
                      <span className="free-shipping">FREE</span>
                    ) : (
                      `$${calculateShipping().toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <div className="summary-line">
                  <span>Tax:</span>
                  <span>${calculateTax().toFixed(2)}</span>
                </div>
                
                <div className="summary-line total-line">
                  <span>Total:</span>
                  <span className="total-amount">${calculateTotal().toFixed(2)}</span>
                </div>

                {/* Delivery Info */}
                <div className="delivery-info">
                  <div className="delivery-icon">🚚</div>
                  <div className="delivery-text">
                    <strong>Estimated Delivery:</strong>
                    <br />
                    {getEstimatedDelivery()}
                  </div>
                </div>

                {/* Checkout Button */}
                <button 
                  className="checkout-btn"
                  onClick={() => onProceedToCheckout(localCartItems, calculateTotal())}
                >
                  <span className="checkout-icon">💳</span>
                  Proceed to Checkout
                </button>

                {/* Continue Shopping */}
                <button className="continue-shopping-btn" onClick={onClose}>
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedShoppingCart;
