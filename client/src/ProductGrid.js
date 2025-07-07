import React, { useState, useEffect } from 'react';
import { productDatabase, productCategories } from './productDatabase';
import AdvancedFilters from './AdvancedFilters';
import './ProductGrid.css';

const ProductGrid = ({ 
  onAddToCart, 
  onShowAR, 
  onProductClick,
  onSocialShare,
  onDeleteProduct,
  onRemoveFromWishlist,
  selectedCategory = 'all',
  searchQuery = '',
  appliedFilters = {},
  onFilterChange,
  wishlistItems = []
}) => {
  const [filteredProducts, setFilteredProducts] = useState(productDatabase);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(0);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...productDatabase];

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Advanced filters integration
    if (appliedFilters) {
      // Price range filter
      if (appliedFilters.priceRange) {
        filtered = filtered.filter(product => 
          product.price >= appliedFilters.priceRange[0] && 
          product.price <= appliedFilters.priceRange[1]
        );
      }

      // Brand filter
      if (appliedFilters.brands && appliedFilters.brands.length > 0) {
        filtered = filtered.filter(product => 
          appliedFilters.brands.includes(product.brand)
        );
      }

      // Rating filter
      if (appliedFilters.ratings > 0) {
        filtered = filtered.filter(product => product.rating >= appliedFilters.ratings);
      }

      // Discount filter
      if (appliedFilters.discount > 0) {
        filtered = filtered.filter(product => {
          if (product.originalPrice) {
            const discount = ((product.originalPrice - product.price) / product.originalPrice) * 100;
            return discount >= appliedFilters.discount;
          }
          return false;
        });
      }

      // Features filter
      if (appliedFilters.features && appliedFilters.features.length > 0) {
        filtered = filtered.filter(product => {
          return appliedFilters.features.some(feature => {
            switch(feature) {
              case 'Free Shipping':
                return product.freeShipping || product.price > 35;
              case 'Best Seller':
                return product.reviewCount > 100;
              case 'New Arrival':
                return product.id > 50; // Assume newer products have higher IDs
              case 'Deal of the Day':
                return product.originalPrice && product.originalPrice > product.price;
              case 'Eco-Friendly':
                return product.category === 'eco' || product.name.toLowerCase().includes('eco');
              default:
                return false;
            }
          });
        });
      }
    }

    // Legacy price range filter (fallback)
    if (!appliedFilters.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );
    }

    // Legacy rating filter (fallback)
    if (!appliedFilters.ratings && ratingFilter > 0) {
      filtered = filtered.filter(product => product.rating >= ratingFilter);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, sortBy, priceRange, ratingFilter, appliedFilters]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }

    return stars;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const calculateDiscount = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="product-grid-container">
      {/* Advanced Filters Component */}
      <AdvancedFilters 
        products={productDatabase}
        onFilterChange={onFilterChange}
      />
      
      {/* Header */}
      <div className="product-grid-header">
        <div className="results-info">
          <h2>
            {selectedCategory === 'all' ? 'All Products' : 
             productCategories.find(cat => cat.id === selectedCategory)?.name}
          </h2>
          <p>{filteredProducts.length} products found</p>
        </div>

        {/* Sort and Filter Controls */}
        <div className="grid-controls">
          <button 
            className="filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="filter-icon">🔧</span>
            Filters
          </button>

          <select 
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
            <option value="newest">Newest</option>
            <option value="reviews">Most Reviewed</option>
          </select>
        </div>
      </div>

      <div className="product-grid-content">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="filters-sidebar">
            <h3>Filters</h3>

            {/* Price Range */}
            <div className="filter-group">
              <h4>Price Range</h4>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 2000])}
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div className="filter-group">
              <h4>Customer Rating</h4>
              <div className="rating-filters">
                {[4, 3, 2, 1].map(rating => (
                  <label key={rating} className="rating-filter">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={ratingFilter === rating}
                      onChange={(e) => setRatingFilter(parseInt(e.target.value))}
                    />
                    <span className="rating-display">
                      {renderStars(rating)} & Up
                    </span>
                  </label>
                ))}
                <label className="rating-filter">
                  <input
                    type="radio"
                    name="rating"
                    value={0}
                    checked={ratingFilter === 0}
                    onChange={(e) => setRatingFilter(parseInt(e.target.value))}
                  />
                  <span>All Ratings</span>
                </label>
              </div>
            </div>

            {/* Clear Filters */}
            <button 
              className="clear-filters-btn"
              onClick={() => {
                setPriceRange([0, 2000]);
                setRatingFilter(0);
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className={`products-grid ${showFilters ? 'with-sidebar' : ''}`}>
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <div className="no-products-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          ) : (
            filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                {/* Product Image */}
                <div className="product-image-container">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="product-image"
                    onClick={() => onProductClick && onProductClick(product)}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x300/e5e7eb/6b7280?text=Product";
                    }}
                  />
                  
                  {/* Discount Badge */}
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="discount-badge">
                      -{calculateDiscount(product.originalPrice, product.price)}%
                    </div>
                  )}

                  {/* AR Badge */}
                  {product.arEnabled && (
                    <div className="ar-badge">
                      <span className="ar-icon">🥽</span>
                      AR
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="quick-actions">
                    {product.arEnabled && (
                      <button 
                        className="quick-action-btn ar-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onShowAR(product);
                        }}
                        title="Try in AR"
                      >
                        🥽
                      </button>
                    )}
                    <button 
                      className="quick-action-btn share-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSocialShare && onSocialShare(product);
                      }}
                      title="Share Product"
                    >
                      📤
                    </button>
                    <button 
                      className="quick-action-btn wishlist-btn"
                      title="Add to Wishlist"
                    >
                      ♡
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="product-info">
                  <div className="product-brand">{product.brand}</div>
                  <h3 className="product-name">{product.name}</h3>
                  
                  {/* Rating */}
                  <div className="product-rating">
                    <div className="stars">
                      {renderStars(product.rating)}
                    </div>
                    <span className="rating-text">
                      {product.rating} ({product.reviewCount.toLocaleString()})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="product-pricing">
                    <div className="current-price">
                      {formatPrice(product.price)}
                    </div>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="original-price">
                        {formatPrice(product.originalPrice)}
                      </div>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="stock-status">
                    {product.inStock ? (
                      <span className="in-stock">✅ In Stock</span>
                    ) : (
                      <span className="out-of-stock">❌ Out of Stock</span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button 
                    className="add-to-cart-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    disabled={!product.inStock}
                  >
                    <span className="cart-icon">🛒</span>
                    Add to Cart
                  </button>

                  {/* Delete/Remove Button */}
                  <button 
                    className="delete-product-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteProduct && onDeleteProduct(product);
                    }}
                    title="Remove from Wishlist & Cart"
                  >
                    <span className="delete-icon">🗑️</span>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
