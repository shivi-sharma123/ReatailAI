import React, { useState, useEffect } from 'react';

const RecentlyViewedProducts = ({ productDatabase }) => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    // Get recently viewed products from localStorage
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    const recentProductsData = recentlyViewed
      .map(id => productDatabase.find(p => p.id === id))
      .filter(Boolean)
      .slice(0, 6); // Show last 6 products
    
    setRecentProducts(recentProductsData);
  }, [productDatabase]);

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <div className="recently-viewed-container">
      <div className="recently-viewed-header">
        <h3>🕒 Recently Viewed</h3>
        <p>Continue where you left off</p>
      </div>
      
      <div className="recently-viewed-grid">
        {recentProducts.map(product => (
          <div key={product.id} className="recent-product-card">
            <div className="recent-product-image">
              <img src={product.images[0]} alt={product.name} />
              <div className="quick-view-overlay">
                <button className="quick-view-btn">👁️ Quick View</button>
              </div>
            </div>
            
            <div className="recent-product-info">
              <h4>{product.name}</h4>
              <div className="recent-product-price">
                <span className="current-price">${product.price}</span>
                {product.originalPrice && (
                  <span className="original-price">${product.originalPrice}</span>
                )}
              </div>
              
              <div className="recent-product-rating">
                <span className="stars">⭐ {product.rating}</span>
                <span className="review-count">({product.reviewCount})</span>
              </div>
              
              <div className="recent-product-actions">
                <button className="add-to-cart-btn">🛒 Add to Cart</button>
                <button className="wishlist-btn">❤️</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .recently-viewed-container {
          background: white;
          border-radius: 16px;
          padding: 24px;
          margin: 20px 0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .recently-viewed-header h3 {
          color: #1a1a1a;
          font-size: 1.5em;
          margin-bottom: 4px;
        }

        .recently-viewed-header p {
          color: #666;
          margin-bottom: 20px;
        }

        .recently-viewed-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        }

        .recent-product-card {
          background: #f8f9fa;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .recent-product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          border-color: #007bff;
        }

        .recent-product-image {
          position: relative;
          height: 150px;
          overflow: hidden;
        }

        .recent-product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .recent-product-card:hover .recent-product-image img {
          transform: scale(1.1);
        }

        .quick-view-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .recent-product-card:hover .quick-view-overlay {
          opacity: 1;
        }

        .quick-view-btn {
          background: white;
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          cursor: pointer;
        }

        .recent-product-info {
          padding: 12px;
        }

        .recent-product-info h4 {
          font-size: 0.9em;
          margin-bottom: 8px;
          color: #1a1a1a;
          line-height: 1.3;
        }

        .recent-product-price {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .current-price {
          font-weight: 700;
          color: #e74c3c;
          font-size: 1.1em;
        }

        .original-price {
          text-decoration: line-through;
          color: #999;
          font-size: 0.9em;
        }

        .recent-product-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 12px;
          font-size: 0.85em;
        }

        .stars {
          color: #ffa500;
        }

        .review-count {
          color: #666;
        }

        .recent-product-actions {
          display: flex;
          gap: 8px;
        }

        .add-to-cart-btn {
          flex: 1;
          background: #007bff;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 0.8em;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .add-to-cart-btn:hover {
          background: #0056b3;
        }

        .wishlist-btn {
          background: #f8f9fa;
          border: 1px solid #ddd;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .wishlist-btn:hover {
          background: #ffebee;
          border-color: #e74c3c;
        }

        @media (max-width: 768px) {
          .recently-viewed-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 12px;
          }
          
          .recent-product-image {
            height: 120px;
          }
        }
      `}</style>
    </div>
  );
};

export default RecentlyViewedProducts;
