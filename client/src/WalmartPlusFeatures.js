import React, { useState } from 'react';
import './WalmartPlusFeatures.css';

const WalmartPlusFeatures = ({ user, onUpgrade }) => {
  const [showBenefits, setShowBenefits] = useState(false);

  const plusBenefits = [
    {
      icon: "🚚",
      title: "Free Delivery",
      description: "Unlimited free delivery on orders $35+",
      savings: "$98/year"
    },
    {
      icon: "⚡",
      title: "Express Delivery",
      description: "2-hour delivery windows available",
      savings: "Save time"
    },
    {
      icon: "⛽",
      title: "Fuel Discounts",
      description: "Save up to 10¢ per gallon at select stations",
      savings: "$156/year"
    },
    {
      icon: "🛒",
      title: "Mobile Scan & Go",
      description: "Skip the checkout line with mobile scanning",
      savings: "Save time"
    },
    {
      icon: "🎥",
      title: "Paramount+ Included",
      description: "Stream thousands of movies and shows",
      savings: "$59.88/year"
    },
    {
      icon: "🏥",
      title: "Pharmacy Benefits",
      description: "Free prescriptions and telehealth consultations",
      savings: "$200+/year"
    }
  ];

  const isPlusMember = user?.membershipType === 'walmart_plus';

  return (
    <div className="walmart-plus-container">
      {/* Walmart+ Header */}
      <div className="plus-header">
        <div className="plus-logo">
          <span className="plus-icon">⭐</span>
          <span className="plus-text">Walmart+</span>
        </div>
        
        {isPlusMember ? (
          <div className="member-badge">
            <span className="member-icon">✅</span>
            <span className="member-text">Premium Member</span>
          </div>
        ) : (
          <button 
            className="upgrade-btn"
            onClick={onUpgrade}
          >
            <span className="upgrade-icon">🚀</span>
            Upgrade to Walmart+
          </button>
        )}
      </div>

      {/* Benefits Grid */}
      <div className="benefits-grid">
        {plusBenefits.map((benefit, index) => (
          <div 
            key={index} 
            className={`benefit-card ${isPlusMember ? 'active' : 'preview'}`}
          >
            <div className="benefit-icon">{benefit.icon}</div>
            <div className="benefit-content">
              <h4 className="benefit-title">{benefit.title}</h4>
              <p className="benefit-description">{benefit.description}</p>
              <div className="benefit-savings">{benefit.savings}</div>
            </div>
            {!isPlusMember && (
              <div className="upgrade-overlay">
                <span className="upgrade-text">Upgrade to unlock</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Savings Calculator */}
      <div className="savings-calculator">
        <h3>💰 Your Potential Annual Savings</h3>
        <div className="savings-breakdown">
          <div className="savings-item">
            <span className="savings-label">Free Delivery:</span>
            <span className="savings-value">$98</span>
          </div>
          <div className="savings-item">
            <span className="savings-label">Fuel Discounts:</span>
            <span className="savings-value">$156</span>
          </div>
          <div className="savings-item">
            <span className="savings-label">Paramount+:</span>
            <span className="savings-value">$59.88</span>
          </div>
          <div className="savings-item">
            <span className="savings-label">Pharmacy Benefits:</span>
            <span className="savings-value">$200+</span>
          </div>
          <div className="savings-total">
            <span className="total-label">Total Annual Value:</span>
            <span className="total-value">$513.88+</span>
          </div>
        </div>
        
        <div className="membership-pricing">
          <div className="pricing-option">
            <h4>Monthly Plan</h4>
            <div className="price">$12.95/month</div>
            <div className="price-note">Cancel anytime</div>
          </div>
          <div className="pricing-option featured">
            <div className="popular-badge">Most Popular</div>
            <h4>Annual Plan</h4>
            <div className="price">$98/year</div>
            <div className="price-note">Save $57 vs monthly</div>
          </div>
        </div>
      </div>

      {/* Member Exclusive Deals */}
      {isPlusMember && (
        <div className="member-deals">
          <h3>🎯 Exclusive Member Deals</h3>
          <div className="deals-grid">
            <div className="deal-card">
              <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=150&fit=crop" alt="Member Deal" />
              <div className="deal-content">
                <h4>iPhone 15 Pro</h4>
                <div className="deal-price">
                  <span className="current-price">$999</span>
                  <span className="original-price">$1,199</span>
                </div>
                <div className="member-only">Members Only</div>
              </div>
            </div>
            
            <div className="deal-card">
              <img src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=150&fit=crop" alt="Member Deal" />
              <div className="deal-content">
                <h4>MacBook Air M3</h4>
                <div className="deal-price">
                  <span className="current-price">$1,099</span>
                  <span className="original-price">$1,299</span>
                </div>
                <div className="member-only">Early Access</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalmartPlusFeatures;
