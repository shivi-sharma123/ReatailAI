import React, { useState } from 'react';
import './AdvancedFilters.css';

function AdvancedFilters({ onFilterChange, products }) {
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    brands: [],
    ratings: 0,
    delivery: '',
    discount: 0,
    availability: '',
    features: []
  });

  const [showFilters, setShowFilters] = useState(false);

  // Extract unique brands from products (Amazon style)
  const availableBrands = [...new Set(products.map(p => p.brand))];
  
  const deliveryOptions = [
    { id: 'same-day', label: 'Same-Day Delivery', icon: '🚀' },
    { id: 'next-day', label: 'Next-Day Delivery', icon: '📦' },
    { id: 'two-day', label: '2-Day Delivery', icon: '🛍️' },
    { id: 'walmart-plus', label: 'Walmart+ Free Delivery', icon: '💜' }
  ];

  const discountRanges = [
    { value: 0, label: 'All Discounts' },
    { value: 10, label: '10% off or more' },
    { value: 25, label: '25% off or more' },
    { value: 50, label: '50% off or more' },
    { value: 70, label: '70% off or more' }
  ];

  const productFeatures = [
    'Free Shipping',
    'Walmart+',
    'Best Seller',
    'New Arrival',
    'Deal of the Day',
    'Clearance',
    'Eco-Friendly',
    'Made in USA'
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleBrandToggle = (brand) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    handleFilterChange('brands', newBrands);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      priceRange: [0, 1000],
      brands: [],
      ratings: 0,
      delivery: '',
      discount: 0,
      availability: '',
      features: []
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="advanced-filters">
      {/* Filter Toggle Button */}
      <button 
        className="filter-toggle"
        onClick={() => setShowFilters(!showFilters)}
      >
        🔍 Filters & Sort
        <span className="filter-count">
          {Object.values(filters).flat().filter(Boolean).length}
        </span>
      </button>

      {/* Filter Panel */}
      {showFilters && (
        <div className="filter-panel">
          {/* Price Range */}
          <div className="filter-section">
            <h4>💰 Price Range</h4>
            <div className="price-range-container">
              <input
                type="range"
                min="0"
                max="1000"
                value={filters.priceRange[1]}
                onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                className="price-slider"
              />
              <div className="price-display">
                $0 - ${filters.priceRange[1]}
              </div>
            </div>
          </div>

          {/* Brands */}
          <div className="filter-section">
            <h4>🏷️ Brands</h4>
            <div className="brand-list">
              {availableBrands.slice(0, 8).map(brand => (
                <label key={brand} className="brand-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                  />
                  <span>{brand}</span>
                  <span className="product-count">
                    ({products.filter(p => p.brand === brand).length})
                  </span>
                </label>
              ))}
              {availableBrands.length > 8 && (
                <button className="see-more-brands">+ See more brands</button>
              )}
            </div>
          </div>

          {/* Customer Ratings */}
          <div className="filter-section">
            <h4>⭐ Customer Ratings</h4>
            <div className="rating-filters">
              {[4, 3, 2, 1].map(rating => (
                <label key={rating} className="rating-option">
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={filters.ratings === rating}
                    onChange={(e) => handleFilterChange('ratings', parseInt(e.target.value))}
                  />
                  <span className="stars">
                    {'⭐'.repeat(rating)}{'☆'.repeat(5-rating)}
                  </span>
                  <span>& Up</span>
                </label>
              ))}
            </div>
          </div>

          {/* Delivery Options */}
          <div className="filter-section">
            <h4>🚚 Delivery Options</h4>
            <div className="delivery-options">
              {deliveryOptions.map(option => (
                <label key={option.id} className="delivery-option">
                  <input
                    type="radio"
                    name="delivery"
                    value={option.id}
                    checked={filters.delivery === option.id}
                    onChange={(e) => handleFilterChange('delivery', e.target.value)}
                  />
                  <span className="option-icon">{option.icon}</span>
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Discount */}
          <div className="filter-section">
            <h4>🏷️ Discount</h4>
            <div className="discount-options">
              {discountRanges.map(range => (
                <label key={range.value} className="discount-option">
                  <input
                    type="radio"
                    name="discount"
                    value={range.value}
                    checked={filters.discount === range.value}
                    onChange={(e) => handleFilterChange('discount', parseInt(e.target.value))}
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Product Features */}
          <div className="filter-section">
            <h4>✨ Special Features</h4>
            <div className="feature-tags">
              {productFeatures.map(feature => (
                <button
                  key={feature}
                  className={`feature-tag ${filters.features.includes(feature) ? 'active' : ''}`}
                  onClick={() => {
                    const newFeatures = filters.features.includes(feature)
                      ? filters.features.filter(f => f !== feature)
                      : [...filters.features, feature];
                    handleFilterChange('features', newFeatures);
                  }}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Actions */}
          <div className="filter-actions">
            <button className="clear-filters" onClick={clearAllFilters}>
              Clear All Filters
            </button>
            <button className="apply-filters" onClick={() => setShowFilters(false)}>
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {Object.values(filters).flat().filter(Boolean).length > 0 && (
        <div className="active-filters">
          <span className="active-filters-label">Applied Filters:</span>
          {filters.brands.map(brand => (
            <span key={brand} className="filter-tag">
              {brand}
              <button onClick={() => handleBrandToggle(brand)}>×</button>
            </span>
          ))}
          {filters.ratings > 0 && (
            <span className="filter-tag">
              {filters.ratings}+ Stars
              <button onClick={() => handleFilterChange('ratings', 0)}>×</button>
            </span>
          )}
          {filters.delivery && (
            <span className="filter-tag">
              {deliveryOptions.find(d => d.id === filters.delivery)?.label}
              <button onClick={() => handleFilterChange('delivery', '')}>×</button>
            </span>
          )}
          <button className="clear-all-tag" onClick={clearAllFilters}>
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}

export default AdvancedFilters;
