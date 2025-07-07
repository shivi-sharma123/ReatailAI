import React, { useState, useEffect } from 'react';
import './RecommendationEngine.css';

const RecommendationEngine = ({ currentProduct, userId, browshistory = [] }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendationType, setRecommendationType] = useState('ai-powered');

  // AI-Powered Product Recommendations
  const generateRecommendations = async () => {
    setLoading(true);
    
    try {
      // Simulate AI recommendation API call
      const aiRecommendations = await simulateAIRecommendations(currentProduct, userId, browshistory);
      setRecommendations(aiRecommendations);
      
      // Get trending products
      const trending = await getTrendingProducts();
      setTrendingProducts(trending);
      
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Simulate AI-powered recommendations (replace with actual OpenAI/ML API)
  const simulateAIRecommendations = async (product, userId, history) => {
    // In production, this would call your ML/AI service
    return [
      {
        id: 'rec-1',
        name: 'Smart Blue Light Glasses',
        brand: 'TechVision Pro',
        price: 149.99,
        originalPrice: 199.99,
        image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        reason: 'Perfect match for your style preferences',
        confidence: 95,
        tags: ['Blue Light Protection', 'Work-from-Home', 'Eye Care'],
        rating: 4.8,
        reviews: 1247,
        discount: 25
      },
      {
        id: 'rec-2',
        name: 'Luxury Cat Eye Designer',
        brand: 'Milano Fashion',
        price: 299.99,
        originalPrice: 450.00,
        image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        reason: 'Trending in your area this week',
        confidence: 88,
        tags: ['Fashion Forward', 'Premium', 'Statement Piece'],
        rating: 4.9,
        reviews: 892,
        discount: 33
      },
      {
        id: 'rec-3',
        name: 'Sport Performance Shield',
        brand: 'Athletic Pro',
        price: 179.99,
        originalPrice: 220.00,
        image: 'https://images.unsplash.com/photo-1586578267921-4338fb57c8b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        reason: 'Frequently bought together',
        confidence: 82,
        tags: ['Sports', 'UV Protection', 'Durable'],
        rating: 4.7,
        reviews: 2156,
        discount: 18
      },
      {
        id: 'rec-4',
        name: 'Vintage Round Retro',
        brand: 'Classic Heritage',
        price: 129.99,
        originalPrice: 180.00,
        image: 'https://images.unsplash.com/photo-1582142306909-195724d33fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        reason: 'Based on your recent searches',
        confidence: 79,
        tags: ['Vintage', 'Retro Style', 'Timeless'],
        rating: 4.6,
        reviews: 743,
        discount: 28
      }
    ];
  };

  const getTrendingProducts = async () => {
    return [
      {
        id: 'trend-1',
        name: 'AR Smart Glasses 2025',
        brand: 'FutureTech',
        price: 899.99,
        image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        trendScore: 98,
        sales24h: 1247
      },
      {
        id: 'trend-2',
        name: 'Eco-Friendly Bamboo Frames',
        brand: 'GreenVision',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        trendScore: 94,
        sales24h: 892
      }
    ];
  };

  useEffect(() => {
    generateRecommendations();
  }, [currentProduct, userId]);

  const handleRecommendationTypeChange = (type) => {
    setRecommendationType(type);
    generateRecommendations();
  };

  const handleProductClick = (product) => {
    // Track click for ML learning
    trackRecommendationClick(product.id, recommendationType);
    // Navigate to product (implement navigation logic)
    console.log('Navigate to product:', product);
  };

  const trackRecommendationClick = (productId, type) => {
    // Send analytics data for ML model improvement
    console.log(`Tracking: Product ${productId} clicked from ${type} recommendations`);
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return '#00FF87';
    if (confidence >= 80) return '#FFD700';
    if (confidence >= 70) return '#FFA500';
    return '#FF6B6B';
  };

  if (loading) {
    return (
      <div className="recommendation-engine loading">
        <div className="loading-header">
          <div className="ai-icon">🤖</div>
          <h3>AI is analyzing your preferences...</h3>
          <div className="loading-dots">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="recommendation-engine">
      {/* AI-Powered Recommendations Header */}
      <div className="recommendations-header">
        <div className="header-content">
          <div className="ai-badge">
            <span className="ai-icon">🤖</span>
            <span>AI-Powered</span>
          </div>
          <h2>Personalized Just For You</h2>
          <p>Our AI analyzed your preferences and found perfect matches</p>
        </div>
        
        <div className="recommendation-types">
          <button 
            className={`type-btn ${recommendationType === 'ai-powered' ? 'active' : ''}`}
            onClick={() => handleRecommendationTypeChange('ai-powered')}
          >
            🧠 AI Suggestions
          </button>
          <button 
            className={`type-btn ${recommendationType === 'trending' ? 'active' : ''}`}
            onClick={() => handleRecommendationTypeChange('trending')}
          >
            🔥 Trending Now
          </button>
          <button 
            className={`type-btn ${recommendationType === 'similar' ? 'active' : ''}`}
            onClick={() => handleRecommendationTypeChange('similar')}
          >
            👁️ Similar Styles
          </button>
        </div>
      </div>

      {/* Main Recommendations Grid */}
      <div className="recommendations-grid">
        {recommendations.map((product, index) => (
          <div 
            key={product.id} 
            className="recommendation-card"
            onClick={() => handleProductClick(product)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Product Image */}
            <div className="product-image-container">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="discount-badge">-{product.discount}%</div>
              <div className="ar-try-badge">
                <span className="ar-icon">🥽</span>
                Try AR
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info">
              <div className="brand">{product.brand}</div>
              <h3 className="product-name">{product.name}</h3>
              
              {/* AI Recommendation Reason */}
              <div className="ai-reason">
                <div className="confidence-indicator">
                  <div 
                    className="confidence-bar"
                    style={{ 
                      width: `${product.confidence}%`,
                      backgroundColor: getConfidenceColor(product.confidence)
                    }}
                  ></div>
                  <span className="confidence-text">{product.confidence}% match</span>
                </div>
                <p className="reason-text">
                  <span className="reason-icon">💡</span>
                  {product.reason}
                </p>
              </div>

              {/* Price Section */}
              <div className="price-section">
                <span className="current-price">${product.price}</span>
                <span className="original-price">${product.originalPrice}</span>
                <span className="savings">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
              </div>

              {/* Rating and Reviews */}
              <div className="rating-section">
                <div className="stars">
                  {'⭐'.repeat(Math.floor(product.rating))}
                  <span className="rating-number">{product.rating}</span>
                </div>
                <span className="review-count">({product.reviews.toLocaleString()} reviews)</span>
              </div>

              {/* Product Tags */}
              <div className="product-tags">
                {product.tags.slice(0, 2).map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button className="quick-add-btn">
                  <span className="btn-icon">⚡</span>
                  Quick Add
                </button>
                <button className="try-ar-btn">
                  <span className="btn-icon">🥽</span>
                  Try AR
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trending Section */}
      {recommendationType === 'trending' && (
        <div className="trending-section">
          <div className="trending-header">
            <h3>🔥 Trending in Your Area</h3>
            <p>Hot products flying off the shelves</p>
          </div>
          <div className="trending-grid">
            {trendingProducts.map((product) => (
              <div key={product.id} className="trending-card">
                <img src={product.image} alt={product.name} />
                <div className="trending-info">
                  <h4>{product.name}</h4>
                  <div className="trend-metrics">
                    <span className="trend-score">🔥 {product.trendScore}% hot</span>
                    <span className="sales-count">{product.sales24h} sold today</span>
                  </div>
                  <div className="price">${product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Insights Panel */}
      <div className="ai-insights-panel">
        <div className="insights-header">
          <span className="insights-icon">📊</span>
          <h4>AI Shopping Insights</h4>
        </div>
        <div className="insights-content">
          <div className="insight-item">
            <span className="insight-emoji">💰</span>
            <div className="insight-text">
              <strong>Smart Savings:</strong> You could save $127 more this month with our recommendations
            </div>
          </div>
          <div className="insight-item">
            <span className="insight-emoji">👥</span>
            <div className="insight-text">
              <strong>Community Choice:</strong> 89% of users with similar taste chose these products
            </div>
          </div>
          <div className="insight-item">
            <span className="insight-emoji">🎯</span>
            <div className="insight-text">
              <strong>Perfect Match:</strong> Based on your style, these have 95% satisfaction rate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationEngine;
