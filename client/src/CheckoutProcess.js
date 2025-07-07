import React, { useState } from 'react';
import './CheckoutProcess.css';

const CheckoutProcess = ({ 
  isVisible, 
  onClose, 
  cartItems = [], 
  total = 0,
  onOrderComplete,
  onWalmartPayClick 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Information
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    
    // Payment Information
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    
    // Walmart Pay
    walmartPayEmail: '',
    
    // Order Notes
    specialInstructions: '',
    
    // Preferences
    saveInfo: true,
    smsUpdates: true,
    emailUpdates: true
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = [
    { id: 1, title: 'Shipping', icon: '📦' },
    { id: 2, title: 'Payment', icon: '💳' },
    { id: 3, title: 'Review', icon: '✅' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      // Shipping validation
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
    } else if (step === 2) {
      // Payment validation
      if (formData.paymentMethod === 'card') {
        if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
        if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
        if (!formData.cvv) newErrors.cvv = 'CVV is required';
        if (!formData.nameOnCard) newErrors.nameOnCard = 'Name on card is required';
      } else if (formData.paymentMethod === 'walmart-pay') {
        if (!formData.walmartPayEmail) newErrors.walmartPayEmail = 'Walmart Pay email is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmitOrder = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsProcessing(true);
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderData = {
        items: cartItems,
        total: total,
        shipping: formData,
        payment: {
          method: formData.paymentMethod,
          ...(formData.paymentMethod === 'card' && {
            last4: formData.cardNumber.slice(-4)
          })
        },
        orderNumber: `WM${Date.now()}`,
        estimatedDelivery: getEstimatedDelivery()
      };
      
      onOrderComplete(orderData);
    } catch (error) {
      alert('Order processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08;
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 50 ? 0 : 9.99;
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

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="checkout-overlay">
      <div className="checkout-container">
        {/* Header */}
        <div className="checkout-header">
          <h2>Checkout</h2>
          <button className="checkout-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Progress Steps */}
        <div className="checkout-steps">
          {steps.map(step => (
            <div 
              key={step.id} 
              className={`step ${currentStep >= step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
            >
              <div className="step-icon">{step.icon}</div>
              <div className="step-title">{step.title}</div>
            </div>
          ))}
        </div>

        <div className="checkout-content">
          {/* Main Content */}
          <div className="checkout-main">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <div className="checkout-step">
                <h3>Shipping Information</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="First name"
                      className={errors.firstName ? 'error' : ''}
                    />
                    {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Last name"
                      className={errors.lastName ? 'error' : ''}
                    />
                    {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Address *</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Street address"
                      className={errors.address ? 'error' : ''}
                    />
                    {errors.address && <span className="error-text">{errors.address}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Apartment, suite, etc. (optional)</label>
                    <input
                      type="text"
                      value={formData.apartment}
                      onChange={(e) => handleInputChange('apartment', e.target.value)}
                      placeholder="Apartment, suite, etc."
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="City"
                      className={errors.city ? 'error' : ''}
                    />
                    {errors.city && <span className="error-text">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <select
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className={errors.state ? 'error' : ''}
                    >
                      <option value="">Select state</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                      <option value="FL">Florida</option>
                      {/* Add more states as needed */}
                    </select>
                    {errors.state && <span className="error-text">{errors.state}</span>}
                  </div>
                  <div className="form-group">
                    <label>ZIP Code *</label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      placeholder="ZIP code"
                      className={errors.zipCode ? 'error' : ''}
                    />
                    {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="(555) 123-4567"
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.saveInfo}
                      onChange={(e) => handleInputChange('saveInfo', e.target.checked)}
                    />
                    Save this information for next time
                  </label>
                </div>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <div className="checkout-step">
                <h3>Payment Information</h3>
                
                <div className="payment-methods">
                  <div className="payment-method">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="walmart-pay"
                        checked={formData.paymentMethod === 'walmart-pay'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      />
                      <div className="payment-option">
                        <div className="payment-icon">💳</div>
                        <div className="payment-info">
                          <strong>Walmart Pay</strong>
                          <p>Fast, secure, and earn rewards</p>
                        </div>
                        <div className="payment-badge">Recommended</div>
                      </div>
                    </label>
                  </div>

                  <div className="payment-method">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      />
                      <div className="payment-option">
                        <div className="payment-icon">🏦</div>
                        <div className="payment-info">
                          <strong>Credit/Debit Card</strong>
                          <p>Visa, Mastercard, American Express</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {formData.paymentMethod === 'walmart-pay' && (
                  <div className="walmart-pay-form">
                    <div className="form-group">
                      <label>Walmart Pay Email *</label>
                      <input
                        type="email"
                        value={formData.walmartPayEmail}
                        onChange={(e) => handleInputChange('walmartPayEmail', e.target.value)}
                        placeholder="Enter your Walmart Pay email"
                        className={errors.walmartPayEmail ? 'error' : ''}
                      />
                      {errors.walmartPayEmail && <span className="error-text">{errors.walmartPayEmail}</span>}
                    </div>
                    <div className="walmart-pay-benefits">
                      <h4>✨ Walmart Pay Benefits:</h4>
                      <ul>
                        <li>💰 Earn cashback on every purchase</li>
                        <li>🔒 Bank-level security</li>
                        <li>⚡ Lightning-fast checkout</li>
                        <li>📱 Digital receipts</li>
                      </ul>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'card' && (
                  <div className="card-form">
                    <div className="form-group">
                      <label>Card Number *</label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        className={errors.cardNumber ? 'error' : ''}
                      />
                      {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Expiry Date *</label>
                        <input
                          type="text"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          placeholder="MM/YY"
                          maxLength="5"
                          className={errors.expiryDate ? 'error' : ''}
                        />
                        {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
                      </div>
                      <div className="form-group">
                        <label>CVV *</label>
                        <input
                          type="text"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          placeholder="123"
                          maxLength="4"
                          className={errors.cvv ? 'error' : ''}
                        />
                        {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Name on Card *</label>
                      <input
                        type="text"
                        value={formData.nameOnCard}
                        onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                        placeholder="Full name as shown on card"
                        className={errors.nameOnCard ? 'error' : ''}
                      />
                      {errors.nameOnCard && <span className="error-text">{errors.nameOnCard}</span>}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <div className="checkout-step">
                <h3>Review Your Order</h3>
                
                <div className="order-review">
                  <div className="review-section">
                    <h4>Shipping Address</h4>
                    <div className="review-content">
                      <p>{formData.firstName} {formData.lastName}</p>
                      <p>{formData.address}</p>
                      {formData.apartment && <p>{formData.apartment}</p>}
                      <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                      <p>{formData.phone}</p>
                    </div>
                  </div>

                  <div className="review-section">
                    <h4>Payment Method</h4>
                    <div className="review-content">
                      {formData.paymentMethod === 'walmart-pay' ? (
                        <p>💳 Walmart Pay ({formData.walmartPayEmail})</p>
                      ) : (
                        <p>🏦 Card ending in {formData.cardNumber.slice(-4)}</p>
                      )}
                    </div>
                  </div>

                  <div className="review-section">
                    <h4>Delivery</h4>
                    <div className="review-content">
                      <p>🚚 Standard Delivery</p>
                      <p>Estimated: {getEstimatedDelivery()}</p>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Special Instructions (optional)</label>
                  <textarea
                    value={formData.specialInstructions}
                    onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                    placeholder="Delivery instructions, gift message, etc."
                    rows={3}
                  />
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.smsUpdates}
                      onChange={(e) => handleInputChange('smsUpdates', e.target.checked)}
                    />
                    Send SMS updates about my order
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.emailUpdates}
                      onChange={(e) => handleInputChange('emailUpdates', e.target.checked)}
                    />
                    Send email updates about my order
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="checkout-navigation">
              {currentStep > 1 && (
                <button className="nav-btn back-btn" onClick={handleBack}>
                  ← Back
                </button>
              )}
              
              {currentStep < 3 ? (
                <button className="nav-btn next-btn" onClick={handleNext}>
                  Continue →
                </button>
              ) : (
                <button 
                  className="nav-btn place-order-btn" 
                  onClick={handleSubmitOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span className="spinner"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      🛒 Place Order
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="order-summary-sidebar">
            <h3>Order Summary</h3>
            
            <div className="order-items">
              {cartItems.map(item => (
                <div key={item.id} className="order-item">
                  <img 
                    src={item.image_url} 
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/60x60/e5e7eb/6b7280?text=Item";
                    }}
                  />
                  <div className="item-details">
                    <div className="item-name">{item.name}</div>
                    <div className="item-qty">Qty: {item.quantity}</div>
                  </div>
                  <div className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="total-line">
                <span>Subtotal:</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="total-line">
                <span>Shipping:</span>
                <span>
                  {calculateShipping() === 0 ? (
                    <span className="free-shipping">FREE</span>
                  ) : (
                    `$${calculateShipping().toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="total-line">
                <span>Tax:</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              <div className="total-line final-total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProcess;
