import React, { useState, useEffect } from 'react';
import { productDatabase, productCategories } from './productDatabase';
import AdvancedFilters from './AdvancedFilters';
import './ProductGrid_Modern.css';

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
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [selectedColors, setSelectedColors] = useState({}); // Track selected colors for each product
  const [selectedSizes, setSelectedSizes] = useState({}); // Track selected sizes for each product
  const [currentImageIndex, setCurrentImageIndex] = useState({}); // Track current image for each product

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

  // Color changing functionality
  const handleColorChange = (productId, color) => {
    setSelectedColors(prev => ({
      ...prev,
      [productId]: color
    }));
  };

  // Size selection functionality
  const handleSizeChange = (productId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  // Image navigation functionality
  const handleImageNavigation = (productId, direction) => {
    const product = productDatabase.find(p => p.id === productId);
    if (!product.images || product.images.length <= 1) return;

    setCurrentImageIndex(prev => {
      const currentIndex = prev[productId] || 0;
      let newIndex;
      
      if (direction === 'next') {
        newIndex = (currentIndex + 1) % product.images.length;
      } else {
        newIndex = currentIndex === 0 ? product.images.length - 1 : currentIndex - 1;
      }
      
      return {
        ...prev,
        [productId]: newIndex
      };
    });
  };

  // Get current product image based on selections
  const getCurrentImage = (product) => {
    const imageIndex = currentImageIndex[product.id] || 0;
    
    if (hoveredProduct === product.id && product.images && product.images.length > 1) {
      return product.images[imageIndex];
    }
    
    return product.image_url || product.images?.[0];
  };

  // Get product price with color/size modifiers
  const getProductPrice = (product) => {
    let basePrice = product.price;
    const selectedColor = selectedColors[product.id];
    const selectedSize = selectedSizes[product.id];

    // Add color price modifier
    if (selectedColor && product.colors) {
      const colorObj = product.colors.find(c => {
        const colorName = typeof c === 'object' ? c.name : c;
        return colorName === selectedColor;
      });
      if (colorObj && typeof colorObj === 'object' && colorObj.price_modifier) {
        basePrice += colorObj.price_modifier;
      }
    }

    // Add size price modifier
    if (selectedSize && product.sizes) {
      const sizeObj = product.sizes.find(s => {
        const sizeName = typeof s === 'object' ? s.size : s;
        return sizeName === selectedSize;
      });
      if (sizeObj && typeof sizeObj === 'object' && sizeObj.price_modifier) {
        basePrice += sizeObj.price_modifier;
      }
    }

    return basePrice;
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
              <div key={product.id} className="product-card enhanced-card">
                {/* Product Image Gallery */}
                <div className="product-image-container enhanced-image-container"
                     onMouseEnter={() => setHoveredProduct(product.id)}
                     onMouseLeave={() => setHoveredProduct(null)}>
                  <img
                    src={getCurrentImage(product)}
                    alt={product.name}
                    className="product-image enhanced-image"
                    onClick={() => onProductClick && onProductClick(product)}
                    onError={(e) => {
                      const fallbackImage = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop";
                      if (e.target.src !== fallbackImage) {
                        e.target.src = fallbackImage;
                      }
                    }}
                  />
                  
                  {/* Image Navigation Arrows */}
                  {product.images && product.images.length > 1 && hoveredProduct === product.id && (
                    <>
                      <button 
                        className="image-nav-btn prev-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageNavigation(product.id, 'prev');
                        }}
                      >
                        ‹
                      </button>
                      <button 
                        className="image-nav-btn next-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageNavigation(product.id, 'next');
                        }}
                      >
                        ›
                      </button>
                    </>
                  )}
                  
                  {/* Image Gallery Indicators */}
                  {product.images && product.images.length > 1 && (
                    <div className="image-indicators">
                      {product.images.map((_, index) => (
                        <div 
                          key={index}
                          className={`indicator ${index === (currentImageIndex[product.id] || 0) ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(prev => ({
                              ...prev,
                              [product.id]: index
                            }));
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Multiple Images Badge */}
                  {product.images && product.images.length > 1 && (
                    <div className="multiple-images-badge">
                      <span className="camera-icon">📷</span>
                      {product.images.length}
                    </div>
                  )}

                  {/* High Quality Badge */}
                  <div className="quality-badge">
                    <span className="quality-icon">📸</span>
                    HD
                  </div>
                  
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

                  {/* New Badge for Recent Products */}
                  {product.id > 200 && (
                    <div className="new-badge">
                      ✨ NEW
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
                      {formatPrice(getProductPrice(product))}
                    </div>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="original-price">
                        {formatPrice(product.originalPrice)}
                      </div>
                    )}
                  </div>

                  {/* Color and Size Options */}
                  <div className="product-options">
                    {product.colors && product.colors.length > 0 && (
                      <div className="color-options">
                        <h4>Colors:</h4>
                        <div className="colors-container">
                          {product.colors.map((color, index) => {
                            const colorName = typeof color === 'object' ? color.name : color;
                            const colorHex = typeof color === 'object' ? color.hex : color.toLowerCase();
                            const colorStyle = colorHex.startsWith('#') ? 
                              { backgroundColor: colorHex } : 
                              { backgroundColor: colorName.toLowerCase() };
                            
                            return (
                              <div 
                                key={index}
                                className={`color-swatch ${selectedColors[product.id] === colorName ? 'selected' : ''}`}
                                style={colorStyle}
                                onClick={() => handleColorChange(product.id, colorName)}
                                title={colorName}
                              />
                            );
                          })}
                        </div>
                        {selectedColors[product.id] && (
                          <div className="selected-color-name">
                            Selected: {selectedColors[product.id]}
                          </div>
                        )}
                      </div>
                    )}

                    {product.sizes && product.sizes.length > 0 && (
                      <div className="size-options">
                        <h4>Sizes:</h4>
                        <div className="sizes-container">
                          {product.sizes.map((size, index) => {
                            const sizeName = typeof size === 'object' ? size.size : size;
                            return (
                              <div 
                                key={index}
                                className={`size-swatch ${selectedSizes[product.id] === sizeName ? 'selected' : ''}`}
                                onClick={() => handleSizeChange(product.id, sizeName)}
                              >
                                {sizeName}
                              </div>
                            );
                          })}
                        </div>
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
