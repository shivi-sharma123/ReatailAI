import React, { useState, useEffect } from 'react';
import './RecommendationSections.css';

const RecommendationSections = ({ 
  currentProduct, 
  cartItems, 
  wishlistItems, 
  onAddToCart, 
  onAddToWishlist, 
  onProductClick,
  allProducts 
}) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [frequentlyBoughtTogether, setFrequentlyBoughtTogether] = useState([]);
  const [customersAlsoBought, setCustomersAlsoBought] = useState([]);

  // Track recently viewed products
  useEffect(() => {
    if (currentProduct && !recentlyViewed.find(p => p.id === currentProduct.id)) {
      setRecentlyViewed(prev => {
        const updated = [currentProduct, ...prev.slice(0, 9)]; // Keep last 10 items
        localStorage.setItem('recentlyViewed', JSON.stringify(updated));
        return updated;
      });
    }
  }, [currentProduct, recentlyViewed]);

  // Load recently viewed from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) {
      setRecentlyViewed(JSON.parse(saved));
    }
  }, []);

  // Generate recommendations based on browsing history and cart
  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      // Get user's browsing patterns
      const viewedCategories = [...new Set(recentlyViewed.map(p => p.category))];
      const cartCategories = [...new Set(cartItems.map(p => p.category))];
      const wishlistCategories = [...new Set(wishlistItems.map(p => p.category))];
      
      const allUserCategories = [...new Set([...viewedCategories, ...cartCategories, ...wishlistCategories])];
      
      // Recommended for you based on browsing history
      const recommended = allProducts.filter(product => 
        allUserCategories.includes(product.category) && 
        !recentlyViewed.find(p => p.id === product.id) &&
        !cartItems.find(p => p.id === product.id)
      ).slice(0, 8);
      
      setRecommendedProducts(recommended);
      
      // Frequently bought together (simulate based on category and price range)
      if (currentProduct) {
        const together = allProducts.filter(product => 
          product.category === currentProduct.category && 
          product.id !== currentProduct.id &&
          Math.abs(product.price - currentProduct.price) < 100
        ).slice(0, 4);
        setFrequentlyBoughtTogether(together);
        
        // Customers who bought this also bought
        const alsoBought = allProducts.filter(product => 
          product.category === currentProduct.category && 
          product.id !== currentProduct.id &&
          product.rating >= 4
        ).slice(0, 6);
        setCustomersAlsoBought(alsoBought);
      }
    }
  }, [allProducts, recentlyViewed, cartItems, wishlistItems, currentProduct]);

  const ProductCard = ({ product, showPrice = true, compact = false }) => (
    <div 
      className={`recommendation-card ${compact ? 'compact' : ''}`}
      onClick={() => onProductClick(product)}
    >
      <div className="card-image">
        <img src={product.image} alt={product.name} />
        <div className="card-overlay">
          <button 
            className="quick-add-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            <span className="cart-icon">🛒</span>
            Add to Cart
          </button>
          <button 
            className="quick-wishlist-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAddToWishlist(product);
            }}
          >
            ❤️
          </button>
        </div>
      </div>
      <div className="card-content">
        <h4 className="card-title">{product.name}</h4>
        {showPrice && (
          <div className="card-price">
            <span className="current-price">${product.price}</span>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice}</span>
            )}
          </div>
        )}
        <div className="card-rating">
          <span className="stars">{'⭐'.repeat(Math.floor(product.rating))}</span>
          <span className="rating-text">({product.rating})</span>
        </div>
        {product.freeShipping && (
          <div className="shipping-badge">🚚 FREE Shipping</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="recommendation-sections">
      {/* Recently Viewed Products */}
      {recentlyViewed.length > 0 && (
        <section className="recommendation-section recently-viewed">
          <div className="section-header">
            <h2>
              <span className="icon">👀</span>
              Recently Viewed
            </h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="products-carousel">
            <div className="carousel-container">
              {recentlyViewed.map(product => (
                <ProductCard key={product.id} product={product} compact={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recommended for You */}
      {recommendedProducts.length > 0 && (
        <section className="recommendation-section recommended-for-you">
          <div className="section-header">
            <h2>
              <span className="icon">🎯</span>
              Recommended for You
            </h2>
            <p className="section-subtitle">Based on your browsing history</p>
          </div>
          <div className="products-carousel">
            <div className="carousel-container">
              {recommendedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Frequently Bought Together */}
      {frequentlyBoughtTogether.length > 0 && currentProduct && (
        <section className="recommendation-section frequently-bought">
          <div className="section-header">
            <h2>
              <span className="icon">🤝</span>
              Frequently Bought Together
            </h2>
            <p className="section-subtitle">Customers who bought this item also bought</p>
          </div>
          <div className="bought-together-container">
            <div className="main-product">
              <ProductCard product={currentProduct} showPrice={false} />
            </div>
            <div className="plus-icon">+</div>
            <div className="related-products">
              {frequentlyBoughtTogether.map((product, index) => (
                <div key={product.id} className="related-item">
                  <ProductCard product={product} compact={true} />
                  {index < frequentlyBoughtTogether.length - 1 && (
                    <div className="plus-small">+</div>
                  )}
                </div>
              ))}
            </div>
            <div className="bundle-actions">
              <div className="bundle-price">
                <span className="bundle-label">Bundle Price:</span>
                <span className="bundle-amount">
                  ${(currentProduct.price + frequentlyBoughtTogether.reduce((sum, p) => sum + p.price, 0)).toFixed(2)}
                </span>
              </div>
              <button 
                className="add-bundle-btn"
                onClick={() => {
                  onAddToCart(currentProduct);
                  frequentlyBoughtTogether.forEach(p => onAddToCart(p));
                }}
              >
                Add Bundle to Cart
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Customers Who Bought This Also Bought */}
      {customersAlsoBought.length > 0 && currentProduct && (
        <section className="recommendation-section customers-also-bought">
          <div className="section-header">
            <h2>
              <span className="icon">👥</span>
              Customers Who Bought This Also Bought
            </h2>
            <p className="section-subtitle">Popular items from the same category</p>
          </div>
          <div className="products-carousel">
            <div className="carousel-container">
              {customersAlsoBought.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default RecommendationSections;
