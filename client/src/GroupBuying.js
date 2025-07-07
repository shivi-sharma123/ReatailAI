import React, { useState, useEffect } from 'react';
import './GroupBuying.css';

function GroupBuying({ product, onJoinGroup, onCreateGroup, user }) {
  const [activeGroups, setActiveGroups] = useState([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupData, setNewGroupData] = useState({
    targetMembers: 5,
    discountPercentage: 15,
    timeLimit: 24
  });

  // Sample active groups (Meesho style)
  useEffect(() => {
    setActiveGroups([
      {
        id: 1,
        productId: product.id,
        createdBy: "Priya Sharma",
        avatar: "https://via.placeholder.com/40x40/e91e63/ffffff?text=P",
        currentMembers: 3,
        targetMembers: 5,
        discountPercentage: 15,
        timeLeft: "18 hours",
        members: [
          { name: "Priya Sharma", avatar: "P", joined: "2 hours ago" },
          { name: "Ravi Kumar", avatar: "R", joined: "1 hour ago" },
          { name: "Sneha Patel", avatar: "S", joined: "30 mins ago" }
        ],
        originalPrice: product.price,
        groupPrice: product.price * 0.85, // 15% discount
        savings: product.price * 0.15,
        isActive: true
      },
      {
        id: 2,
        productId: product.id,
        createdBy: "Rahul Gupta",
        avatar: "https://via.placeholder.com/40x40/2196f3/ffffff?text=R",
        currentMembers: 7,
        targetMembers: 10,
        discountPercentage: 20,
        timeLeft: "2 days",
        members: [],
        originalPrice: product.price,
        groupPrice: product.price * 0.80, // 20% discount
        savings: product.price * 0.20,
        isActive: true
      }
    ]);
  }, [product]);

  const joinGroup = (groupId) => {
    setActiveGroups(prev =>
      prev.map(group =>
        group.id === groupId
          ? {
              ...group,
              currentMembers: group.currentMembers + 1,
              members: [
                ...group.members,
                {
                  name: user.name,
                  avatar: user.name.charAt(0).toUpperCase(),
                  joined: "just now"
                }
              ]
            }
          : group
      )
    );

    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'group-join-success';
    successMsg.innerHTML = `
      <div class="success-content">
        <span class="success-icon">🎉</span>
        <span class="success-text">Successfully joined group!</span>
      </div>
    `;
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
      successMsg.remove();
    }, 3000);

    onJoinGroup && onJoinGroup(groupId);
  };

  const createNewGroup = () => {
    const newGroup = {
      id: Date.now(),
      productId: product.id,
      createdBy: user.name,
      avatar: `https://via.placeholder.com/40x40/4caf50/ffffff?text=${user.name.charAt(0)}`,
      currentMembers: 1,
      targetMembers: newGroupData.targetMembers,
      discountPercentage: newGroupData.discountPercentage,
      timeLeft: `${newGroupData.timeLimit} hours`,
      members: [
        {
          name: user.name,
          avatar: user.name.charAt(0).toUpperCase(),
          joined: "just now"
        }
      ],
      originalPrice: product.price,
      groupPrice: product.price * (1 - newGroupData.discountPercentage / 100),
      savings: product.price * (newGroupData.discountPercentage / 100),
      isActive: true
    };

    setActiveGroups(prev => [newGroup, ...prev]);
    setShowCreateGroup(false);
    onCreateGroup && onCreateGroup(newGroup);
  };

  const calculateProgress = (current, target) => {
    return (current / target) * 100;
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return '#4caf50';
    if (percentage >= 50) return '#ff9800';
    return '#f44336';
  };

  return (
    <div className="group-buying-container">
      {/* Header */}
      <div className="group-buying-header">
        <h3>👥 Group Buying - Save More Together!</h3>
        <p>Join others to unlock bigger discounts</p>
      </div>

      {/* Active Groups */}
      <div className="active-groups">
        {activeGroups.map(group => (
          <div key={group.id} className="group-card">
            {/* Group Header */}
            <div className="group-header">
              <div className="group-creator">
                <img src={group.avatar} alt={group.createdBy} className="creator-avatar" />
                <div className="creator-info">
                  <span className="creator-name">{group.createdBy}</span>
                  <span className="group-status">Group Leader</span>
                </div>
              </div>
              <div className="time-left">
                ⏰ {group.timeLeft} left
              </div>
            </div>

            {/* Progress Section */}
            <div className="group-progress">
              <div className="progress-info">
                <span className="members-count">
                  {group.currentMembers}/{group.targetMembers} members
                </span>
                <span className="discount-badge">
                  {group.discountPercentage}% OFF
                </span>
              </div>
              
              <div className="progress-bar-container">
                <div 
                  className="progress-bar"
                  style={{ 
                    width: `${calculateProgress(group.currentMembers, group.targetMembers)}%`,
                    backgroundColor: getProgressColor(calculateProgress(group.currentMembers, group.targetMembers))
                  }}
                ></div>
              </div>
              
              <div className="progress-text">
                {group.targetMembers - group.currentMembers > 0 
                  ? `${group.targetMembers - group.currentMembers} more needed`
                  : "🎉 Target achieved!"
                }
              </div>
            </div>

            {/* Price Comparison */}
            <div className="price-comparison">
              <div className="price-item">
                <span className="price-label">Individual Price:</span>
                <span className="original-price">${group.originalPrice.toFixed(2)}</span>
              </div>
              <div className="price-item group-price-item">
                <span className="price-label">Group Price:</span>
                <span className="group-price">${group.groupPrice.toFixed(2)}</span>
              </div>
              <div className="savings-highlight">
                💰 You save ${group.savings.toFixed(2)}
              </div>
            </div>

            {/* Members Preview */}
            <div className="members-preview">
              <span className="members-label">Members:</span>
              <div className="members-avatars">
                {group.members.slice(0, 4).map((member, index) => (
                  <div key={index} className="member-avatar" title={member.name}>
                    {member.avatar}
                  </div>
                ))}
                {group.members.length > 4 && (
                  <div className="more-members">+{group.members.length - 4}</div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <button 
              className={`group-action-btn ${group.members.some(m => m.name === user.name) ? 'joined' : ''}`}
              onClick={() => joinGroup(group.id)}
              disabled={group.members.some(m => m.name === user.name)}
            >
              {group.members.some(m => m.name === user.name) 
                ? "✅ Joined Group" 
                : "🤝 Join This Group"
              }
            </button>
          </div>
        ))}
      </div>

      {/* Create New Group */}
      <div className="create-group-section">
        {!showCreateGroup ? (
          <button 
            className="create-group-btn"
            onClick={() => setShowCreateGroup(true)}
          >
            ➕ Create New Group
          </button>
        ) : (
          <div className="create-group-form">
            <h4>Create Your Group</h4>
            
            <div className="form-field">
              <label>Target Members:</label>
              <select 
                value={newGroupData.targetMembers}
                onChange={(e) => setNewGroupData(prev => ({...prev, targetMembers: parseInt(e.target.value)}))}
              >
                <option value={3}>3 members (10% off)</option>
                <option value={5}>5 members (15% off)</option>
                <option value={10}>10 members (20% off)</option>
                <option value={20}>20 members (25% off)</option>
              </select>
            </div>

            <div className="form-field">
              <label>Time Limit:</label>
              <select 
                value={newGroupData.timeLimit}
                onChange={(e) => setNewGroupData(prev => ({...prev, timeLimit: parseInt(e.target.value)}))}
              >
                <option value={12}>12 hours</option>
                <option value={24}>24 hours</option>
                <option value={48}>2 days</option>
                <option value={72}>3 days</option>
              </select>
            </div>

            <div className="group-preview">
              <div className="preview-price">
                Group Price: ${(product.price * (1 - newGroupData.discountPercentage / 100)).toFixed(2)}
              </div>
              <div className="preview-savings">
                Your Savings: ${(product.price * (newGroupData.discountPercentage / 100)).toFixed(2)}
              </div>
            </div>

            <div className="form-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowCreateGroup(false)}
              >
                Cancel
              </button>
              <button 
                className="create-btn"
                onClick={createNewGroup}
              >
                🚀 Create Group
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Social Benefits */}
      <div className="social-benefits">
        <h4>🌟 Why Group Buying?</h4>
        <div className="benefits-grid">
          <div className="benefit-item">
            <span className="benefit-icon">💰</span>
            <span className="benefit-text">Better Prices</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">👥</span>
            <span className="benefit-text">Meet People</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🎁</span>
            <span className="benefit-text">Exclusive Deals</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🏆</span>
            <span className="benefit-text">Bulk Savings</span>
          </div>
        </div>
      </div>

      {/* Share Group */}
      <div className="share-group">
        <h4>📢 Invite Friends</h4>
        <p>Share this deal with friends to fill groups faster!</p>
        <div className="share-buttons">
          <button className="share-btn whatsapp">📱 WhatsApp</button>
          <button className="share-btn facebook">👥 Facebook</button>
          <button className="share-btn twitter">🐦 Twitter</button>
          <button className="share-btn copy">📋 Copy Link</button>
        </div>
      </div>
    </div>
  );
}

export default GroupBuying;
