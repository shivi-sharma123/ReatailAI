import React, { useState, useEffect } from 'react';

const LoyaltyProgram = ({ user, isOpen, onClose }) => {
  const [loyaltyData, setLoyaltyData] = useState({
    points: 2450,
    tier: 'Gold',
    nextTier: 'Platinum',
    pointsToNextTier: 550,
    totalSpent: 1299.50,
    ordersCount: 18,
    memberSince: '2023'
  });

  const [rewards, setRewards] = useState([
    {
      id: 1,
      title: '$5 Off Next Purchase',
      description: 'Minimum order $25',
      points: 500,
      type: 'discount',
      icon: '💵',
      available: true
    },
    {
      id: 2,
      title: 'Free Shipping',
      description: 'On any order size',
      points: 300,
      type: 'shipping',
      icon: '🚚',
      available: true
    },
    {
      id: 3,
      title: '$10 Off Electronics',
      description: 'Electronics category only',
      points: 1000,
      type: 'category',
      icon: '📱',
      available: true
    },
    {
      id: 4,
      title: 'Double Points Day',
      description: 'Earn 2x points on next purchase',
      points: 750,
      type: 'bonus',
      icon: '⭐',
      available: true
    },
    {
      id: 5,
      title: 'Exclusive Member Preview',
      description: 'Early access to flash sales',
      points: 1500,
      type: 'exclusive',
      icon: '👁️',
      available: false
    },
    {
      id: 6,
      title: '$25 Birthday Bonus',
      description: 'Happy birthday gift',
      points: 2000,
      type: 'special',
      icon: '🎂',
      available: false
    }
  ]);

  const redeemReward = (rewardId) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (reward && loyaltyData.points >= reward.points) {
      setLoyaltyData(prev => ({
        ...prev,
        points: prev.points - reward.points
      }));
      
      // Show success message
      alert(`🎉 Reward redeemed successfully! ${reward.title} has been added to your account.`);
    }
  };

  const getTierProgress = () => {
    const totalPointsForNextTier = loyaltyData.points + loyaltyData.pointsToNextTier;
    return (loyaltyData.points / totalPointsForNextTier) * 100;
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Bronze': return '#CD7F32';
      case 'Silver': return '#C0C0C0';
      case 'Gold': return '#FFD700';
      case 'Platinum': return '#E5E4E2';
      default: return '#4A90E2';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="loyalty-overlay">
      <div className="loyalty-modal">
        <div className="loyalty-header">
          <div className="header-content">
            <h2>🏆 RetailFlow Plus</h2>
            <p>Your exclusive membership program</p>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="loyalty-content">
          {/* Member Status Card */}
          <div className="member-status-card">
            <div className="status-header">
              <div className="member-avatar">
                <img src={user?.photoURL || '/api/placeholder/60/60'} alt="Profile" />
                <div className="tier-badge" style={{ background: getTierColor(loyaltyData.tier) }}>
                  {loyaltyData.tier}
                </div>
              </div>
              
              <div className="member-info">
                <h3>Welcome back, {user?.displayName || 'Member'}! 👋</h3>
                <p>Member since {loyaltyData.memberSince}</p>
                <div className="member-stats">
                  <div className="stat">
                    <span className="stat-value">{loyaltyData.ordersCount}</span>
                    <span className="stat-label">Orders</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">${loyaltyData.totalSpent}</span>
                    <span className="stat-label">Total Spent</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="points-section">
              <div className="current-points">
                <div className="points-display">
                  <span className="points-number">{loyaltyData.points}</span>
                  <span className="points-label">Points Available</span>
                </div>
                <div className="points-value">
                  Worth ${(loyaltyData.points / 100).toFixed(2)}
                </div>
              </div>

              <div className="tier-progress">
                <div className="progress-header">
                  <span>Progress to {loyaltyData.nextTier}</span>
                  <span>{loyaltyData.pointsToNextTier} points needed</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${getTierProgress()}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Available Rewards */}
          <div className="rewards-section">
            <h3>🎁 Available Rewards</h3>
            <div className="rewards-grid">
              {rewards.map(reward => (
                <div 
                  key={reward.id} 
                  className={`reward-card ${!reward.available ? 'unavailable' : ''}`}
                >
                  <div className="reward-icon">{reward.icon}</div>
                  <div className="reward-content">
                    <h4>{reward.title}</h4>
                    <p>{reward.description}</p>
                    <div className="reward-points">
                      <span className="points-cost">{reward.points} points</span>
                      {loyaltyData.points >= reward.points && reward.available && (
                        <span className="can-redeem">✅ Can redeem</span>
                      )}
                    </div>
                  </div>
                  <button 
                    className="redeem-btn"
                    onClick={() => redeemReward(reward.id)}
                    disabled={!reward.available || loyaltyData.points < reward.points}
                  >
                    {!reward.available ? 'Locked' : 
                     loyaltyData.points >= reward.points ? 'Redeem' : 'Not enough points'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* How to Earn More Points */}
          <div className="earn-points-section">
            <h3>💰 How to Earn More Points</h3>
            <div className="earning-methods">
              <div className="earning-method">
                <div className="method-icon">🛒</div>
                <div className="method-info">
                  <h4>Shop & Earn</h4>
                  <p>Earn 1 point for every $1 spent</p>
                </div>
              </div>
              
              <div className="earning-method">
                <div className="method-icon">⭐</div>
                <div className="method-info">
                  <h4>Write Reviews</h4>
                  <p>Earn 50 points for each product review</p>
                </div>
              </div>
              
              <div className="earning-method">
                <div className="method-icon">👥</div>
                <div className="method-info">
                  <h4>Refer Friends</h4>
                  <p>Earn 500 points for each successful referral</p>
                </div>
              </div>
              
              <div className="earning-method">
                <div className="method-icon">🎂</div>
                <div className="method-info">
                  <h4>Birthday Bonus</h4>
                  <p>Receive 1000 bonus points on your birthday</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tier Benefits */}
          <div className="tier-benefits-section">
            <h3>🌟 Tier Benefits</h3>
            <div className="tiers-comparison">
              {['Bronze', 'Silver', 'Gold', 'Platinum'].map(tier => (
                <div 
                  key={tier} 
                  className={`tier-column ${loyaltyData.tier === tier ? 'current-tier' : ''}`}
                >
                  <div className="tier-header" style={{ background: getTierColor(tier) }}>
                    <h4>{tier}</h4>
                    {loyaltyData.tier === tier && <span className="current-badge">Current</span>}
                  </div>
                  
                  <div className="tier-benefits">
                    <div className="benefit">✅ Standard shipping</div>
                    {tier !== 'Bronze' && <div className="benefit">🚚 Free shipping on $50+</div>}
                    {(tier === 'Gold' || tier === 'Platinum') && <div className="benefit">⭐ Double points days</div>}
                    {tier === 'Platinum' && <div className="benefit">👑 VIP customer support</div>}
                    {tier === 'Platinum' && <div className="benefit">🎁 Exclusive member previews</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .loyalty-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .loyalty-modal {
          background: white;
          border-radius: 20px;
          width: 95%;
          max-width: 1000px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .loyalty-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 20px 20px 0 0;
        }

        .header-content h2 {
          margin: 0 0 4px 0;
          font-size: 1.6em;
        }

        .header-content p {
          margin: 0;
          opacity: 0.9;
        }

        .close-btn {
          background: rgba(255,255,255,0.2);
          border: none;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.2em;
          transition: background 0.3s ease;
        }

        .close-btn:hover {
          background: rgba(255,255,255,0.3);
        }

        .loyalty-content {
          padding: 24px;
        }

        .member-status-card {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          border-radius: 16px;
          padding: 24px;
          color: white;
          margin-bottom: 32px;
        }

        .status-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .member-avatar {
          position: relative;
        }

        .member-avatar img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 3px solid white;
        }

        .tier-badge {
          position: absolute;
          bottom: -4px;
          right: -4px;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.7em;
          font-weight: 700;
          color: white;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }

        .member-info h3 {
          margin: 0 0 4px 0;
          font-size: 1.3em;
        }

        .member-info p {
          margin: 0 0 12px 0;
          opacity: 0.9;
        }

        .member-stats {
          display: flex;
          gap: 24px;
        }

        .stat {
          text-align: center;
        }

        .stat-value {
          display: block;
          font-size: 1.4em;
          font-weight: 700;
        }

        .stat-label {
          font-size: 0.85em;
          opacity: 0.9;
        }

        .points-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: center;
        }

        .current-points {
          text-align: center;
        }

        .points-number {
          display: block;
          font-size: 2.5em;
          font-weight: 700;
          line-height: 1;
        }

        .points-label {
          display: block;
          font-size: 0.9em;
          opacity: 0.9;
          margin-bottom: 8px;
        }

        .points-value {
          font-size: 1.1em;
          font-weight: 600;
        }

        .tier-progress {
          text-align: right;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 0.9em;
        }

        .progress-bar {
          background: rgba(255,255,255,0.3);
          border-radius: 10px;
          height: 8px;
          overflow: hidden;
        }

        .progress-fill {
          background: white;
          height: 100%;
          border-radius: 10px;
          transition: width 0.5s ease;
        }

        .rewards-section h3 {
          color: #333;
          margin-bottom: 20px;
          font-size: 1.3em;
        }

        .rewards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }

        .reward-card {
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.3s ease;
        }

        .reward-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          border-color: #007bff;
        }

        .reward-card.unavailable {
          opacity: 0.6;
          background: #f8f9fa;
        }

        .reward-icon {
          font-size: 2em;
          flex-shrink: 0;
        }

        .reward-content {
          flex: 1;
        }

        .reward-content h4 {
          margin: 0 0 4px 0;
          color: #333;
          font-size: 1.1em;
        }

        .reward-content p {
          margin: 0 0 8px 0;
          color: #666;
          font-size: 0.9em;
        }

        .reward-points {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .points-cost {
          color: #007bff;
          font-weight: 600;
        }

        .can-redeem {
          color: #28a745;
          font-size: 0.8em;
        }

        .redeem-btn {
          background: #007bff;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9em;
          transition: background 0.3s ease;
          white-space: nowrap;
        }

        .redeem-btn:hover:not(:disabled) {
          background: #0056b3;
        }

        .redeem-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .earn-points-section,
        .tier-benefits-section {
          margin-bottom: 32px;
        }

        .earn-points-section h3,
        .tier-benefits-section h3 {
          color: #333;
          margin-bottom: 20px;
          font-size: 1.3em;
        }

        .earning-methods {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }

        .earning-method {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .method-icon {
          font-size: 2em;
          flex-shrink: 0;
        }

        .method-info h4 {
          margin: 0 0 4px 0;
          color: #333;
        }

        .method-info p {
          margin: 0;
          color: #666;
          font-size: 0.9em;
        }

        .tiers-comparison {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .tier-column {
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .tier-column.current-tier {
          border-color: #007bff;
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(0,123,255,0.2);
        }

        .tier-header {
          padding: 16px;
          text-align: center;
          color: white;
          position: relative;
        }

        .tier-header h4 {
          margin: 0;
          font-size: 1.1em;
        }

        .current-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          background: rgba(255,255,255,0.3);
          padding: 2px 6px;
          border-radius: 8px;
          font-size: 0.7em;
        }

        .tier-benefits {
          padding: 16px;
        }

        .benefit {
          padding: 6px 0;
          font-size: 0.9em;
          color: #666;
          border-bottom: 1px solid #f0f0f0;
        }

        .benefit:last-child {
          border-bottom: none;
        }

        @media (max-width: 768px) {
          .loyalty-modal {
            width: 98%;
            margin: 10px;
          }
          
          .points-section {
            grid-template-columns: 1fr;
            text-align: center;
          }
          
          .tier-progress {
            text-align: center;
          }
          
          .status-header {
            flex-direction: column;
            text-align: center;
          }
          
          .rewards-grid {
            grid-template-columns: 1fr;
          }
          
          .reward-card {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default LoyaltyProgram;
