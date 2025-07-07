import React, { useState } from 'react';
import './WalmartPayIntegration.css';

function WalmartPayIntegration({ totalAmount, onPaymentSuccess, onClose }) {
  const [selectedPayment, setSelectedPayment] = useState('walmart-pay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const paymentMethods = [
    {
      id: 'walmart-pay',
      name: 'Walmart Pay',
      icon: '💙',
      description: 'Fast, secure, and convenient',
      featured: true
    },
    {
      id: 'google-pay',
      name: 'Google Pay',
      icon: '🟢',
      description: 'Pay with Google'
    },
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      icon: '⚫',
      description: 'Touch ID or Face ID'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '🔵',
      description: 'PayPal balance or linked cards'
    },
    {
      id: 'credit-card',
      name: 'Credit/Debit Card',
      icon: '💳',
      description: 'Visa, Mastercard, Amex'
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: '₿',
      description: 'Bitcoin, Ethereum'
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        onPaymentSuccess({
          method: selectedPayment,
          amount: totalAmount,
          transactionId: `TXN${Date.now()}`,
          timestamp: new Date().toISOString()
        });
      }, 2000);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="payment-modal">
        <div className="payment-container">
          <div className="payment-success">
            <div className="success-animation">
              <div className="checkmark">✅</div>
            </div>
            <h2>Payment Successful!</h2>
            <p>Your order has been confirmed</p>
            <div className="transaction-details">
              <p>Transaction ID: TXN{Date.now()}</p>
              <p>Amount: ${totalAmount.toFixed(2)}</p>
              <p>Method: {paymentMethods.find(p => p.id === selectedPayment)?.name}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-modal">
      <div className="payment-container">
        <div className="payment-header">
          <h2>Choose Payment Method</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="payment-amount">
          <div className="amount-display">
            <span className="currency">$</span>
            <span className="amount">{totalAmount.toFixed(2)}</span>
          </div>
          <p>Total Amount</p>
        </div>

        <div className="payment-methods">
          {paymentMethods.map(method => (
            <div
              key={method.id}
              className={`payment-method ${selectedPayment === method.id ? 'selected' : ''} ${method.featured ? 'featured' : ''}`}
              onClick={() => setSelectedPayment(method.id)}
            >
              {method.featured && <div className="featured-badge">Recommended</div>}
              <div className="method-icon">{method.icon}</div>
              <div className="method-info">
                <h3>{method.name}</h3>
                <p>{method.description}</p>
              </div>
              <div className="method-radio">
                <input
                  type="radio"
                  checked={selectedPayment === method.id}
                  onChange={() => setSelectedPayment(method.id)}
                />
              </div>
            </div>
          ))}
        </div>

        {selectedPayment === 'walmart-pay' && (
          <div className="walmart-pay-benefits">
            <h4>🎉 Walmart Pay Benefits</h4>
            <ul>
              <li>✅ Instant rewards points</li>
              <li>✅ Exclusive member discounts</li>
              <li>✅ Free shipping on orders $35+</li>
              <li>✅ Easy returns to any Walmart store</li>
            </ul>
          </div>
        )}

        <div className="payment-actions">
          <button
            className="pay-button"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="processing">
                <div className="spinner"></div>
                Processing...
              </div>
            ) : (
              `Pay $${totalAmount.toFixed(2)} with ${paymentMethods.find(p => p.id === selectedPayment)?.name}`
            )}
          </button>
        </div>

        <div className="security-info">
          <div className="security-badges">
            <span className="badge">🔒 SSL Secured</span>
            <span className="badge">🛡️ PCI Compliant</span>
            <span className="badge">✅ Verified by Walmart</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalmartPayIntegration;
