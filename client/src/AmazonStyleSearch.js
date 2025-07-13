import React, { useState, useEffect, useRef, useCallback } from 'react';
import './AmazonStyleSearch.css';

const AmazonStyleSearch = ({ 
  selectedCategory = 'All', 
  onCategoryChange, 
  onSearch, 
  onProductSelect 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const debounceRef = useRef(null);

  const categories = [
    'All',
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports & Outdoors',
    'Health & Beauty',
    'Automotive',
    'Books',
    'Toys & Games',
    'Grocery'
  ];

  // Fetch product suggestions from backend
  const fetchSuggestions = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      // Use the new search suggestions API
      const response = await fetch(`http://localhost:5000/api/search/suggestions?q=${encodeURIComponent(query)}&category=${encodeURIComponent(selectedCategory)}&limit=10`);

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          const combinedSuggestions = [];
          
          // Add search term suggestions
          if (result.data.suggestions) {
            combinedSuggestions.push(...result.data.suggestions);
          }
          
          // Add product suggestions
          if (result.data.products) {
            const productSuggestions = result.data.products.map(product => ({
              type: 'product',
              text: product.name,
              image: product.image,
              price: product.price,
              rating: product.rating,
              category: product.category,
              product: product
            }));
            combinedSuggestions.push(...productSuggestions);
          }

          setSuggestions(combinedSuggestions);
        }
      } else {
        // Fallback to simulated suggestions
        generateFallbackSuggestions(query);
      }
    } catch (error) {
      console.error('Suggestions API error:', error);
      generateFallbackSuggestions(query);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory]);

  // Generate fallback suggestions when API fails
  const generateFallbackSuggestions = (query) => {
    const popularProducts = [
      {
        type: 'product',
        text: 'iPhone 15 Pro',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100',
        price: 999.99,
        rating: 4.8,
        category: 'Electronics'
      },
      {
        type: 'product', 
        text: 'Nike Air Max',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100',
        price: 129.99,
        rating: 4.6,
        category: 'Fashion'
      },
      {
        type: 'product',
        text: 'Samsung Galaxy Watch',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100',
        price: 199.99,
        rating: 4.4,
        category: 'Electronics'
      },
      {
        type: 'product',
        text: 'Sony WH-1000XM4',
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100',
        price: 279.99,
        rating: 4.7,
        category: 'Electronics'
      }
    ];

    const queryLower = query.toLowerCase();
    const matchingProducts = popularProducts.filter(product => 
      product.text.toLowerCase().includes(queryLower) ||
      product.category.toLowerCase().includes(queryLower)
    );

    const searchSuggestions = [
      { type: 'search', text: query, category: selectedCategory },
      { type: 'search', text: `${query} deals`, category: selectedCategory },
      { type: 'search', text: `best ${query}`, category: selectedCategory },
      { type: 'search', text: `${query} reviews`, category: selectedCategory }
    ];

    setSuggestions([...searchSuggestions, ...matchingProducts]);
  };

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (searchQuery) {
        fetchSuggestions(searchQuery);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchQuery, fetchSuggestions]);

  // Handle input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setActiveSuggestionIndex(-1);
  };

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  // Perform actual search
  const performSearch = (query) => {
    // Add to search history
    setSearchHistory(prev => {
      const newHistory = [query, ...prev.filter(item => item !== query)].slice(0, 10);
      return newHistory;
    });

    setShowSuggestions(false);
    setSearchQuery(query);
    
    if (onSearch) {
      onSearch(query, selectedCategory);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'product' && onProductSelect) {
      onProductSelect(suggestion.product || suggestion);
    } else {
      performSearch(suggestion.text);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (activeSuggestionIndex >= 0) {
          handleSuggestionClick(suggestions[activeSuggestionIndex]);
        } else {
          handleSearch(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
        break;
    }
  };

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get category icon
  const getCategoryIcon = (category) => {
    const icons = {
      'All': '🛍️',
      'Electronics': '📱',
      'Fashion': '👕',
      'Home & Garden': '🏠',
      'Sports & Outdoors': '⚽',
      'Health & Beauty': '💄',
      'Automotive': '🚗',
      'Books': '📚',
      'Toys & Games': '🎮',
      'Grocery': '🛒'
    };
    return icons[category] || '📦';
  };

  return (
    <div className="amazon-search-container" ref={suggestionsRef}>
      <form onSubmit={handleSearch} className="amazon-search-form">
        {/* Category Dropdown */}
        <div className="search-category-section">
          <select 
            value={selectedCategory}
            onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
            className="search-category-dropdown"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {getCategoryIcon(category)} {category}
              </option>
            ))}
          </select>
          <div className="category-dropdown-arrow">▼</div>
        </div>

        {/* Search Input */}
        <div className="search-input-section">
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => searchQuery && setShowSuggestions(true)}
            placeholder={`Search ${selectedCategory === 'All' ? 'everything' : selectedCategory.toLowerCase()}...`}
            className="search-input"
            autoComplete="off"
          />
          {isLoading && (
            <div className="search-loading-indicator">
              <div className="loading-spinner"></div>
            </div>
          )}
        </div>

        {/* Search Button */}
        <button type="submit" className="search-submit-btn">
          <span className="search-icon">🔍</span>
        </button>
      </form>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="search-suggestions-dropdown">
          <div className="suggestions-container">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`suggestion-item ${suggestion.type} ${
                  index === activeSuggestionIndex ? 'active' : ''
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setActiveSuggestionIndex(index)}
              >
                {suggestion.type === 'product' ? (
                  <div className="product-suggestion">
                    <img 
                      src={suggestion.image} 
                      alt={suggestion.text}
                      className="product-suggestion-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/50x50?text=📦';
                      }}
                    />
                    <div className="product-suggestion-details">
                      <div className="product-suggestion-name">{suggestion.text}</div>
                      <div className="product-suggestion-meta">
                        <span className="product-price">${suggestion.price}</span>
                        <span className="product-rating">⭐ {suggestion.rating}</span>
                        <span className="product-category">in {suggestion.category}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="search-suggestion">
                    <span className="suggestion-icon">🔍</span>
                    <span className="suggestion-text">{suggestion.text}</span>
                    {suggestion.category !== 'All' && (
                      <span className="suggestion-category">in {suggestion.category}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Popular Searches */}
          {searchHistory.length > 0 && (
            <div className="search-history-section">
              <div className="history-header">Recent Searches</div>
              {searchHistory.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="history-item"
                  onClick={() => performSearch(item)}
                >
                  <span className="history-icon">🕒</span>
                  <span className="history-text">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AmazonStyleSearch;
