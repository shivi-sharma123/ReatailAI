import React, { useState, useRef } from 'react';
import './SocialSharingHub.css';

function SocialSharingHub({ product, user, onClose }) {
  const [selectedPlatform, setSelectedPlatform] = useState('whatsapp');
  const [shareMessage, setShareMessage] = useState('');
  const [shareImage, setShareImage] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const canvasRef = useRef(null);

  const socialPlatforms = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: '💬',
      color: '#25d366',
      description: 'Share with friends & family'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: '📸',
      color: '#e4405f',
      description: 'Share to your story'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: '👍',
      color: '#4267b2',
      description: 'Post to timeline'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: '🐦',
      color: '#1da1f2',
      description: 'Tweet to followers'
    },
    {
      id: 'pinterest',
      name: 'Pinterest',
      icon: '📌',
      color: '#bd081c',
      description: 'Pin to board'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: '🎵',
      color: '#000000',
      description: 'Create video content'
    }
  ];

  const shareTemplates = {
    whatsapp: `🛍️ Found this amazing ${product.name}!\n\n💰 Only $${product.price}\n⭐ ${product.rating}/5 stars\n\nCheck it out on RetailFlowAI! 🔥`,
    instagram: `Shopping made easy with AR! 🥽✨ Just tried on this ${product.name} virtually. #RetailFlowAI #ARShopping #TechShopping`,
    facebook: `Just discovered this cool ${product.name} on RetailFlowAI! The AR try-on feature is incredible - you can see exactly how it looks before buying. Technology is amazing! 🤩`,
    twitter: `Mind-blown by @RetailFlowAI's AR shopping! 🤯 Just virtually tried on this ${product.name} - the future of shopping is here! #ARShopping #TechInnovation`,
    pinterest: `${product.name} - Perfect for my ${product.category} collection! Found on RetailFlowAI with amazing AR try-on feature.`,
    tiktok: `POV: You're trying on products with AR before buying 🔥 This ${product.name} hits different! #RetailFlowAI #ARShopping #TechTok`
  };

  const generateShareImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 800;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 800);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 800);

    // Product info card
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.roundRect(40, 300, 520, 400, 20);
    ctx.fill();

    // Product name
    ctx.fillStyle = '#333';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(product.name, 300, 360);

    // Price
    ctx.fillStyle = '#e53e3e';
    ctx.font = 'bold 36px Arial';
    ctx.fillText(`$${product.price}`, 300, 420);

    // Rating
    ctx.fillStyle = '#ffd700';
    ctx.font = '24px Arial';
    const stars = '⭐'.repeat(Math.floor(product.rating));
    ctx.fillText(`${stars} ${product.rating}/5`, 300, 460);

    // AR Badge
    ctx.fillStyle = '#0071ce';
    ctx.roundRect(200, 500, 200, 50, 25);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.font = 'bold 18px Arial';
    ctx.fillText('🥽 AR Enabled', 300, 530);

    // RetailFlowAI branding
    ctx.fillStyle = '#666';
    ctx.font = 'bold 20px Arial';
    ctx.fillText('RetailFlowAI', 300, 600);
    ctx.font = '16px Arial';
    ctx.fillText('Smart Shopping with AR', 300, 630);

    // Convert to blob
    canvas.toBlob((blob) => {
      setShareImage(URL.createObjectURL(blob));
    });
  };

  React.useEffect(() => {
    generateShareImage();
    setShareMessage(shareTemplates[selectedPlatform] || '');
  }, [selectedPlatform, product]);

  const handleShare = async () => {
    const platform = socialPlatforms.find(p => p.id === selectedPlatform);
    
    // Simulate sharing
    console.log(`Sharing to ${platform.name}:`, shareMessage);
    
    setShowSuccess(true);
    
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleCopyLink = () => {
    const shareLink = `https://retailflowai.com/product/${product.id}?ref=share&user=${user.id}`;
    navigator.clipboard.writeText(shareLink);
    
    // Show copy success
    const copyMsg = document.createElement('div');
    copyMsg.className = 'copy-success';
    copyMsg.textContent = '📋 Link copied!';
    document.body.appendChild(copyMsg);
    
    setTimeout(() => {
      copyMsg.remove();
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="social-sharing-modal">
        <div className="social-sharing-container">
          <div className="share-success">
            <div className="success-animation">
              <div className="share-icon">🚀</div>
            </div>
            <h2>Shared Successfully!</h2>
            <p>Your friends will love this product!</p>
            <div className="social-stats">
              <div className="stat">
                <span className="stat-icon">👀</span>
                <span>+12 views expected</span>
              </div>
              <div className="stat">
                <span className="stat-icon">❤️</span>
                <span>+5 likes anticipated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="social-sharing-modal">
      <div className="social-sharing-container">
        <div className="sharing-header">
          <h2>📤 Share Product</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="product-preview">
          <div className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="price">${product.price}</p>
              <div className="rating">
                {'⭐'.repeat(Math.floor(product.rating))} {product.rating}/5
              </div>
              <div className="ar-badge">🥽 AR Enabled</div>
            </div>
          </div>
        </div>

        <div className="platform-selection">
          <h3>Choose Platform</h3>
          <div className="platforms-grid">
            {socialPlatforms.map(platform => (
              <button
                key={platform.id}
                className={`platform-btn ${selectedPlatform === platform.id ? 'selected' : ''}`}
                onClick={() => setSelectedPlatform(platform.id)}
                style={{ '--platform-color': platform.color }}
              >
                <div className="platform-icon">{platform.icon}</div>
                <div className="platform-info">
                  <span className="platform-name">{platform.name}</span>
                  <span className="platform-desc">{platform.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="message-editor">
          <h3>Customize Message</h3>
          <textarea
            value={shareMessage}
            onChange={(e) => setShareMessage(e.target.value)}
            placeholder="Write your message..."
            rows={4}
          />
          <div className="message-features">
            <button className="feature-btn" onClick={() => setShareMessage(prev => prev + ' #RetailFlowAI')}>
              #️⃣ Add Hashtag
            </button>
            <button className="feature-btn" onClick={() => setShareMessage(prev => prev + ' 🔥')}>
              😀 Add Emoji
            </button>
          </div>
        </div>

        <div className="sharing-actions">
          <button className="copy-link-btn" onClick={handleCopyLink}>
            📋 Copy Link
          </button>
          <button 
            className="share-btn"
            onClick={handleShare}
            style={{ background: socialPlatforms.find(p => p.id === selectedPlatform)?.color }}
          >
            Share to {socialPlatforms.find(p => p.id === selectedPlatform)?.name}
          </button>
        </div>

        <div className="sharing-insights">
          <h4>🔥 Trending Shares</h4>
          <div className="trending-items">
            <div className="trending-item">
              <span>🥽 AR Features</span>
              <span className="trend-badge">+245%</span>
            </div>
            <div className="trending-item">
              <span>💰 Price Drops</span>
              <span className="trend-badge">+180%</span>
            </div>
            <div className="trending-item">
              <span>⭐ High Ratings</span>
              <span className="trend-badge">+156%</span>
            </div>
          </div>
        </div>

        {/* Hidden canvas for image generation */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}

export default SocialSharingHub;
