import React, { useState, useEffect, useCallback } from 'react';
import './AdvancedSearchSystem.css';

const AdvancedSearchSystem = ({ 
  products, 
  onProductsFiltered, 
  onProductClick,
  userSearchHistory = [],
  onAddToCart,
  onAddToWishlist 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    brands: [],
    ratings: 0,
    gender: 'all',
    colors: [],
    sizes: [],
    discount: 0,
    freeShipping: false,
    inStock: false
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Popular search terms based on categories
  const popularSearches = {
    'bags': ['handbags', 'backpacks', 'laptop bags', 'travel bags', 'crossbody bags', 'tote bags', 'clutch bags', 'gym bags'],
    'ladies': ['dresses', 'tops', 'jeans', 'skirts', 'blouses', 'jackets', 'ethnic wear', 'party wear'],
    'men': ['shirts', 'trousers', 'jeans', 'suits', 'casual wear', 'formal wear', 'sportswear', 'accessories'],
    'electronics': ['smartphones', 'laptops', 'headphones', 'cameras', 'tablets', 'smartwatches', 'gaming', 'audio'],
    'home': ['furniture', 'decor', 'kitchen', 'bedding', 'lighting', 'storage', 'appliances', 'garden'],
    'beauty': ['skincare', 'makeup', 'hair care', 'fragrances', 'nail care', 'body care', 'tools', 'organic']
  };

  // Generate smart suggestions based on input
  const generateSuggestions = useCallback((query) => {
    if (!query || query.length < 2) return [];

    const suggestions = [];
    const queryLower = query.toLowerCase();

    // Search in product names
    products.forEach(product => {
      if (product.name.toLowerCase().includes(queryLower)) {
        suggestions.push({
          type: 'product',
          text: product.name,
          category: product.category,
          product: product
        });
      }
    });

    // Search in categories
    Object.keys(popularSearches).forEach(category => {
      if (category.includes(queryLower)) {
        suggestions.push({
          type: 'category',
          text: category,
          category: category
        });
      }
      
      // Search in popular terms
      popularSearches[category].forEach(term => {
        if (term.includes(queryLower)) {
          suggestions.push({
            type: 'suggestion',
            text: term,
            category: category
          });
        }
      });
    });

    // Add trending searches
    if (queryLower.includes('bag')) {
      suggestions.push(...popularSearches.bags.map(term => ({
        type: 'trending',
        text: term,
        category: 'bags'
      })));
    }

    if (queryLower.includes('dress') || queryLower.includes('ladies')) {
      suggestions.push(...popularSearches.ladies.map(term => ({
        type: 'trending',
        text: term,
        category: 'ladies'
      })));
    }

    // Remove duplicates and limit
    const uniqueSuggestions = suggestions.filter((item, index, self) => 
      index === self.findIndex(t => t.text === item.text)
    ).slice(0, 10);

    return uniqueSuggestions;
  }, [products]);

  // Handle search input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length > 0) {
      const newSuggestions = generateSuggestions(value);
      setSuggestions(newSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle search execution
  const executeSearch = useCallback((query = searchQuery) => {
    if (!query.trim()) return;

    setIsSearching(true);
    
    // Smart search algorithm
    const results = products.filter(product => {
      const searchTerms = query.toLowerCase().split(' ');
      const productText = `${product.name} ${product.description} ${product.category} ${product.brand}`.toLowerCase();
      
      return searchTerms.every(term => 
        productText.includes(term) ||
        product.tags?.some(tag => tag.toLowerCase().includes(term))
      );
    });

    // Apply current filters
    const filteredResults = applyFilters(results);
    
    // Apply sorting
    const sortedResults = applySorting(filteredResults);
    
    setSearchResults(sortedResults);
    onProductsFiltered(sortedResults);
    setShowSuggestions(false);
    setIsSearching(false);
  }, [searchQuery, products, filters, sortBy]);

  // Apply filters to products
  const applyFilters = useCallback((productsToFilter) => {
    return productsToFilter.filter(product => {
      // Price range
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Brands
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      // Ratings
      if (product.rating < filters.ratings) {
        return false;
      }

      // Gender
      if (filters.gender !== 'all' && product.gender !== filters.gender) {
        return false;
      }

      // Colors
      if (filters.colors.length > 0 && !filters.colors.some(color => 
        product.colors?.includes(color)
      )) {
        return false;
      }

      // Sizes
      if (filters.sizes.length > 0 && !filters.sizes.some(size => 
        product.sizes?.includes(size)
      )) {
        return false;
      }

      // Discount
      if (filters.discount > 0 && (product.discount || 0) < filters.discount) {
        return false;
      }

      // Free shipping
      if (filters.freeShipping && !product.freeShipping) {
        return false;
      }

      // In stock
      if (filters.inStock && !product.inStock) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // Apply sorting
  const applySorting = useCallback((productsToSort) => {
    const sorted = [...productsToSort];
    
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'discount':
        return sorted.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      default:
        return sorted;
    }
  }, [sortBy]);

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'product') {
      onProductClick(suggestion.product);
    } else {
      setSearchQuery(suggestion.text);
      executeSearch(suggestion.text);
    }
    setShowSuggestions(false);
  };

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Get unique values for filter options
  const getFilterOptions = () => {
    const brands = [...new Set(products.map(p => p.brand))];
    const colors = [...new Set(products.flatMap(p => p.colors || []))];
    const sizes = [...new Set(products.flatMap(p => p.sizes || []))];
    
    return { brands, colors, sizes };
  };

  const { brands, colors, sizes } = getFilterOptions();

  // Effect to apply filters whenever they change
  useEffect(() => {
    if (searchResults.length > 0) {
      const filteredResults = applyFilters(searchResults);
      const sortedResults = applySorting(filteredResults);
      onProductsFiltered(sortedResults);
    }
  }, [filters, sortBy, searchResults, applyFilters, applySorting, onProductsFiltered]);

  return (
    <div className="advanced-search-system">
      {/* Search Bar */}
      <div className="search-container">
        <div className="search-bar">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search for products, brands, categories..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={(e) => e.key === 'Enter' && executeSearch()}
              className="search-input"
            />
            {isSearching && <div className="search-spinner">⏳</div>}
            <button 
              className="voice-search-btn"
              onClick={() => {
                // Voice search functionality
                if ('webkitSpeechRecognition' in window) {
                  const recognition = new window.webkitSpeechRecognition();
                  recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    setSearchQuery(transcript);
                    executeSearch(transcript);
                  };
                  recognition.start();
                }
              }}
            >
              🎤
            </button>
          </div>
          <button 
            className="search-button"
            onClick={() => executeSearch()}
          >
            Search
          </button>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="search-suggestions">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`suggestion-item ${suggestion.type}`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <span className="suggestion-icon">
                  {suggestion.type === 'product' ? '📦' : 
                   suggestion.type === 'category' ? '📂' : 
                   suggestion.type === 'trending' ? '🔥' : '🔍'}
                </span>
                <span className="suggestion-text">{suggestion.text}</span>
                {suggestion.category && (
                  <span className="suggestion-category">in {suggestion.category}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Category Filters */}
      <div className="quick-categories">
        <button 
          className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          All Categories
        </button>
        {Object.keys(popularSearches).map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(category);
              setSearchQuery(category);
              executeSearch(category);
            }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Filters and Sort */}
      <div className="filters-sort-bar">
        <button 
          className="filters-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span>🔧</span>
          Filters
          {Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f > 0 || f === true) && (
            <span className="filter-count">•</span>
          )}
        </button>

        <div className="sort-options">
          <label>Sort by:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
            <option value="newest">Newest Arrivals</option>
            <option value="discount">Best Discount</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filters-grid">
            {/* Price Range */}
            <div className="filter-group">
              <h4>Price Range</h4>
              <div className="price-range">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                  className="price-slider"
                />
                <div className="price-labels">
                  <span>$0</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Brands */}
            <div className="filter-group">
              <h4>Brands</h4>
              <div className="checkbox-list">
                {brands.slice(0, 5).map(brand => (
                  <label key={brand} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleFilterChange('brands', [...filters.brands, brand]);
                        } else {
                          handleFilterChange('brands', filters.brands.filter(b => b !== brand));
                        }
                      }}
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="filter-group">
              <h4>Colors</h4>
              <div className="color-options">
                {colors.slice(0, 8).map(color => (
                  <div
                    key={color}
                    className={`color-option ${filters.colors.includes(color) ? 'selected' : ''}`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => {
                      if (filters.colors.includes(color)) {
                        handleFilterChange('colors', filters.colors.filter(c => c !== color));
                      } else {
                        handleFilterChange('colors', [...filters.colors, color]);
                      }
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="filter-group">
              <h4>Customer Rating</h4>
              <div className="rating-options">
                {[4, 3, 2, 1].map(rating => (
                  <label key={rating} className="rating-option">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.ratings === rating}
                      onChange={() => handleFilterChange('ratings', rating)}
                    />
                    <span className="stars">{'⭐'.repeat(rating)}</span>
                    <span>& up</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Filters */}
            <div className="filter-group">
              <h4>Additional Options</h4>
              <div className="checkbox-list">
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={filters.freeShipping}
                    onChange={(e) => handleFilterChange('freeShipping', e.target.checked)}
                  />
                  Free Shipping
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                  />
                  In Stock Only
                </label>
              </div>
            </div>
          </div>

          <div className="filters-actions">
            <button 
              className="clear-filters-btn"
              onClick={() => setFilters({
                priceRange: [0, 1000],
                brands: [],
                ratings: 0,
                gender: 'all',
                colors: [],
                sizes: [],
                discount: 0,
                freeShipping: false,
                inStock: false
              })}
            >
              Clear All
            </button>
            <button 
              className="apply-filters-btn"
              onClick={() => setShowFilters(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Popular Searches */}
      <div className="popular-searches">
        <h4>Popular Searches:</h4>
        <div className="popular-tags">
          {['bags', 'dresses', 'shoes', 'electronics', 'beauty', 'home decor'].map(tag => (
            <button
              key={tag}
              className="popular-tag"
              onClick={() => {
                setSearchQuery(tag);
                executeSearch(tag);
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchSystem;
