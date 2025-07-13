import React, { useState, useEffect } from 'react';
import { productDatabase, productCategories } from './productDatabase';
import './CategoryProductDisplay.css';

const CategoryProductDisplay = ({ 
  selectedCategory, 
  onProductSelect, 
  onAddToCart, 
  onAddToWishlist,
  onCategoryChange // Add this prop
}) => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(selectedCategory || 'all');

  useEffect(() => {
    const categoryToUse = selectedCategory || currentCategory;
    setCurrentCategory(categoryToUse);
    
    if (categoryToUse && categoryToUse !== 'all') {
      setLoading(true);
      
      // Filter products by category
      const filtered = productDatabase.filter(product => 
        product.category.toLowerCase() === categoryToUse.toLowerCase() ||
        product.subcategory?.toLowerCase().includes(categoryToUse.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(categoryToUse.toLowerCase()))
      );
      
      setCategoryProducts(filtered);
      setLoading(false);
    } else {
      setCategoryProducts(productDatabase);
      setLoading(false);
    }
  }, [selectedCategory, currentCategory]);

  const getCategoryInfo = () => {
    const categoryToUse = selectedCategory || currentCategory;
    if (categoryToUse === 'all') {
      return { name: 'All Products', icon: '🛍️' };
    }
    const category = productCategories.find(cat => cat.id === categoryToUse);
    return category || { name: 'Products', icon: '📦' };
  };

  const handleCategoryChange = (categoryId) => {
    setCurrentCategory(categoryId);
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  const handleProductClick = (product) => {
    onProductSelect(product);
  };

  const handleAddToCart = (product, event) => {
    event.stopPropagation();
    
    // Show success animation
    const successMsg = document.createElement('div');
    successMsg.className = 'cart-success-notification';
    successMsg.innerHTML = `
      <div class="success-content">
        <span class="success-icon">✅</span>
        <span class="success-text">Added "${product.name}" to cart!</span>
      </div>
    `;
    successMsg.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #48bb78, #38a169);
      color: white;
      padding: 15px 20px;
      border-radius: 12px;
      box-shadow: 0 8px 25px rgba(72, 187, 120, 0.3);
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
      successMsg.remove();
      style.remove();
    }, 3000);
    
    onAddToCart(product);
  };

  const handleAddToWishlist = (product, event) => {
    event.stopPropagation();
    onAddToWishlist(product);
  };

  const categoryInfo = getCategoryInfo();

  if (loading) {
    return (
      <div className="category-loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="category-product-display">
      {/* Category Navigation */}
      <div className="category-navigation">
        <div className="nav-container">
          <h3 className="nav-title">Shop by Category</h3>
          <div className="category-buttons">
            <button 
              className={`category-nav-btn ${(selectedCategory === 'all' || currentCategory === 'all') ? 'active' : ''}`}
              onClick={() => handleCategoryChange('all')}
            >
              <span className="nav-icon">🛍️</span>
              All Products
            </button>
            
            <button 
              className={`category-nav-btn ${(selectedCategory === 'bags' || currentCategory === 'bags') ? 'active' : ''}`}
              onClick={() => handleCategoryChange('bags')}
            >
              <span className="nav-icon">👜</span>
              Bags
            </button>
            
            <button 
              className={`category-nav-btn ${(selectedCategory === 'ladies' || currentCategory === 'ladies') ? 'active' : ''}`}
              onClick={() => handleCategoryChange('ladies')}
            >
              <span className="nav-icon">👗</span>
              Dresses
            </button>
            
            <button 
              className={`category-nav-btn ${(selectedCategory === 'beauty' || currentCategory === 'beauty') ? 'active' : ''}`}
              onClick={() => handleCategoryChange('beauty')}
            >
              <span className="nav-icon">💄</span>
              Makeup
            </button>
            
            <button 
              className={`category-nav-btn ${(selectedCategory === 'electronics' || currentCategory === 'electronics') ? 'active' : ''}`}
              onClick={() => handleCategoryChange('electronics')}
            >
              <span className="nav-icon">📱</span>
              Electronics
            </button>
            
            <button 
              className={`category-nav-btn ${(selectedCategory === 'clothing' || currentCategory === 'clothing') ? 'active' : ''}`}
              onClick={() => handleCategoryChange('clothing')}
            >
              <span className="nav-icon">👕</span>
              Clothing
            </button>
          </div>
        </div>
      </div>

      {/* Category Header */}
      <div className="category-header">
        <div className="category-title">
          <span className="category-icon-large">{categoryInfo.icon}</span>
          <div className="category-text">
            <h2>{categoryInfo.name}</h2>
            <p>{categoryProducts.length} products available</p>
          </div>
        </div>
        
        {selectedCategory !== 'all' && currentCategory !== 'all' && (
          <div className="category-subcategories">
            {productCategories.find(cat => cat.id === (selectedCategory || currentCategory))?.subcategories?.map(sub => (
              <span key={sub} className="subcategory-tag">{sub}</span>
            ))}
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="category-products-grid">
        {categoryProducts.length > 0 ? (
          categoryProducts.map(product => (
            <div 
              key={product.id} 
              className="category-product-card"
              onClick={() => handleProductClick(product)}
            >
              <div className="product-image-container">
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to first image in array if main image fails
                    if (product.images && product.images.length > 0) {
                      e.target.src = product.images[0];
                    }
                  }}
                />
                
                {/* Image Gallery Indicator */}
                {product.images && product.images.length > 1 && (
                  <div className="image-gallery-indicator">
                    <span className="gallery-icon">📷</span>
                    <span className="image-count">{product.images.length}</span>
                  </div>
                )}
                
                {product.discount && (
                  <div className="discount-badge">
                    -{product.discount}% OFF
                  </div>
                )}
                {product.isNewArrival && (
                  <div className="new-badge">NEW</div>
                )}
              </div>

              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-brand">{product.brand}</p>
                
                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="rating-text">({product.rating})</span>
                </div>

                <div className="product-price">
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="original-price">${product.originalPrice}</span>
                  )}
                  <span className="current-price">${product.price}</span>
                </div>

                {/* Color Options */}
                {product.colors && product.colors.length > 0 && (
                  <div className="product-colors">
                    {product.colors.slice(0, 4).map((color, index) => (
                      <div 
                        key={index}
                        className="color-swatch"
                        style={{ backgroundColor: color.code }}
                        title={color.name}
                      ></div>
                    ))}
                    {product.colors.length > 4 && (
                      <span className="more-colors">+{product.colors.length - 4}</span>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="product-actions">
                  <button 
                    className="add-to-cart-btn"
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    <span className="btn-icon">🛒</span>
                    Add to Cart
                  </button>
                  
                  <button 
                    className="wishlist-btn"
                    onClick={(e) => handleAddToWishlist(product, e)}
                  >
                    <span className="btn-icon">💖</span>
                  </button>
                </div>

                {/* Product Features */}
                {product.features && product.features.length > 0 && (
                  <div className="product-features">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-products">
            <div className="no-products-icon">📦</div>
            <h3>No products found</h3>
            <p>Try selecting a different category or check back later.</p>
          </div>
        )}
      </div>

      {/* Category Statistics */}
      {categoryProducts.length > 0 && (
        <div className="category-stats">
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-icon">📊</span>
              <div className="stat-info">
                <span className="stat-value">{categoryProducts.length}</span>
                <span className="stat-label">Products</span>
              </div>
            </div>
            
            <div className="stat-item">
              <span className="stat-icon">⭐</span>
              <div className="stat-info">
                <span className="stat-value">
                  {(categoryProducts.reduce((sum, p) => sum + p.rating, 0) / categoryProducts.length).toFixed(1)}
                </span>
                <span className="stat-label">Avg Rating</span>
              </div>
            </div>
            
            <div className="stat-item">
              <span className="stat-icon">💰</span>
              <div className="stat-info">
                <span className="stat-value">
                  ${Math.min(...categoryProducts.map(p => p.price))} - ${Math.max(...categoryProducts.map(p => p.price))}
                </span>
                <span className="stat-label">Price Range</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryProductDisplay;
