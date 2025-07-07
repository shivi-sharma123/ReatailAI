import React, { useState, useEffect, useRef } from 'react';
import './AdvancedSearch.css';

const AdvancedSearch = ({ isVisible, onClose, onProductSelect, onShowAR, initialSearchQuery = '' }) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    color: '',
    mood: '',
    occasion: ''
  });
  const [isListening, setIsListening] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const recognitionRef = useRef(null);

  // AI-powered search suggestions
  const moodBasedSuggestions = {
    happy: ['party outfit', 'celebration wear', 'bright colors', 'festive clothing'],
    energetic: ['sports wear', 'athletic shoes', 'workout gear', 'active lifestyle'],
    relaxed: ['comfort wear', 'casual clothes', 'loungewear', 'soft materials'],
    professional: ['business attire', 'formal wear', 'office clothing', 'smart casual'],
    romantic: ['date night outfit', 'elegant dress', 'romantic colors', 'special occasion'],
    confident: ['bold colors', 'statement pieces', 'power dressing', 'standout style']
  };

  const occasionSuggestions = {
    work: ['business suit', 'formal shirt', 'professional shoes', 'office wear'],
    party: ['party dress', 'celebration outfit', 'festive wear', 'dancing shoes'],
    gym: ['workout clothes', 'athletic wear', 'sports shoes', 'fitness gear'],
    date: ['romantic outfit', 'elegant dress', 'date night look', 'special wear'],
    casual: ['casual clothes', 'everyday wear', 'comfortable outfit', 'relaxed style'],
    travel: ['travel clothes', 'comfortable shoes', 'versatile outfit', 'packable items']
  };

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        handleSearch(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Handle initial search query
  useEffect(() => {
    if (initialSearchQuery && initialSearchQuery.trim() !== '') {
      setSearchQuery(initialSearchQuery);
      handleSearch(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Generate AI suggestions based on current query
  useEffect(() => {
    if (searchQuery.length > 2) {
      generateAISuggestions(searchQuery);
    } else {
      setAiSuggestions([]);
    }
  }, [searchQuery]);

  const generateAISuggestions = (query) => {
    const suggestions = [];
    const queryLower = query.toLowerCase();

    // Mood-based suggestions
    Object.keys(moodBasedSuggestions).forEach(mood => {
      if (queryLower.includes(mood) || moodBasedSuggestions[mood].some(s => queryLower.includes(s))) {
        suggestions.push({
          type: 'mood',
          value: mood,
          label: `${mood.charAt(0).toUpperCase() + mood.slice(1)} mood suggestions`,
          items: moodBasedSuggestions[mood]
        });
      }
    });

    // Occasion-based suggestions
    Object.keys(occasionSuggestions).forEach(occasion => {
      if (queryLower.includes(occasion) || occasionSuggestions[occasion].some(s => queryLower.includes(s))) {
        suggestions.push({
          type: 'occasion',
          value: occasion,
          label: `${occasion.charAt(0).toUpperCase() + occasion.slice(1)} occasion suggestions`,
          items: occasionSuggestions[occasion]
        });
      }
    });

    // Smart keyword suggestions
    const smartSuggestions = getSmartSuggestions(queryLower);
    if (smartSuggestions.length > 0) {
      suggestions.push({
        type: 'smart',
        value: 'keywords',
        label: 'AI Smart Suggestions',
        items: smartSuggestions
      });
    }

    setAiSuggestions(suggestions.slice(0, 3)); // Limit to 3 suggestion groups
  };

  const getSmartSuggestions = (query) => {
    const smartMappings = {
      'red': ['crimson outfit', 'burgundy wear', 'ruby accessories', 'scarlet clothing'],
      'blue': ['navy outfit', 'royal blue wear', 'sky blue accessories', 'ocean style'],
      'black': ['elegant black', 'classic black', 'sophisticated black', 'timeless black'],
      'white': ['pure white', 'clean white', 'crisp white', 'fresh white'],
      'cheap': ['budget-friendly', 'affordable', 'value picks', 'economic choices'],
      'expensive': ['premium', 'luxury', 'high-end', 'designer'],
      'comfortable': ['cozy', 'soft', 'relaxed fit', 'easy wear'],
      'stylish': ['trendy', 'fashionable', 'chic', 'contemporary']
    };

    const suggestions = [];
    Object.keys(smartMappings).forEach(key => {
      if (query.includes(key)) {
        suggestions.push(...smartMappings[key]);
      }
    });

    return suggestions.slice(0, 4);
  };

  const handleSearch = async (query = searchQuery) => {
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      // Use our Tier 1 Voice Search API for intelligent processing
      const response = await fetch('http://localhost:5000/api/search/voice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: query,
          filters: filters,
          userId: 'user_' + Date.now()
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          // Transform voice search API results
          const voiceResults = result.data.results || [];
          const transformedResults = voiceResults.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            rating: item.rating,
            image_url: item.image,
            description: item.voice_match || 'AI-matched result',
            emoji: getEmojiForProduct(item.name),
            relevance: item.relevance || 0,
            brand: extractBrand(item.name),
            colors: ['Black', 'White', 'Blue'], // Default colors
            moods: ['confident'],
            occasions: ['casual'],
            aiMatch: true,
            confidence: result.data.confidence || 0.8
          }));
          
          setSearchResults(transformedResults);
          
          // Update AI suggestions based on voice API response
          if (result.data.suggestions) {
            setAiSuggestions(result.data.suggestions.map((suggestion, index) => ({
              type: 'ai',
              value: suggestion,
              label: `AI Suggestion ${index + 1}`,
              items: [suggestion]
            })));
          }
        } else {
          setSearchResults(simulateAISearch(query));
        }
      } else {
        // Fallback to simulated AI search
        setSearchResults(simulateAISearch(query));
      }
    } catch (error) {
      console.error('Voice search API error:', error);
      // Fallback to simulated AI search
      setSearchResults(simulateAISearch(query));
    }
    setIsSearching(false);
  };

  // Handle AR experience
  const handleARView = (product, e) => {
    e.stopPropagation(); // Prevent product click
    
    // Convert product to AR format
    const arProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image_url: product.image_url,
      images: [product.image_url],
      colors: product.colors.map((color, index) => ({
        name: color,
        hex: index === 0 ? '#333333' : index === 1 ? '#2196F3' : '#f44336',
        price_modifier: index * 10
      })),
      sizes: [
        {'size': 'Regular', 'price_modifier': 0},
        {'size': 'Large', 'price_modifier': 15}
      ],
      category: product.category,
      brand: product.brand,
      ar_enabled: true
    };
    
    if (onShowAR) {
      onShowAR(arProduct);
    }
  };

  // Helper functions for voice search integration
  const getEmojiForProduct = (name) => {
    const nameUpper = name.toUpperCase();
    if (nameUpper.includes('SHOE') || nameUpper.includes('SNEAKER') || nameUpper.includes('BOOT')) return '👟';
    if (nameUpper.includes('WATCH')) return '⌚';
    if (nameUpper.includes('HEADPHONE') || nameUpper.includes('EARBUD')) return '🎧';
    if (nameUpper.includes('PHONE')) return '📱';
    if (nameUpper.includes('JEAN') || nameUpper.includes('PANT')) return '👖';
    if (nameUpper.includes('SHIRT') || nameUpper.includes('TOP')) return '👕';
    return '📦';
  };

  const extractBrand = (name) => {
    const brands = ['Nike', 'Apple', 'Samsung', 'Sony', 'Adidas', 'Levi\'s', 'iPhone'];
    for (const brand of brands) {
      if (name.includes(brand)) return brand;
    }
    return 'Brand';
  };

  const simulateAISearch = (query) => {
    const allProducts = [
      {
        id: 1,
        name: "Nike Air Max 270",
        category: "shoes",
        price: 150,
        description: "Perfect for energetic workouts and sporty lifestyle",
        emoji: "👟",
        brand: "Nike",
        colors: ["Black", "Blue", "Red", "White"],
        moods: ["energetic", "confident"],
        occasions: ["gym", "casual"],
        image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        ar_enabled: true
      },
      {
        id: 2,
        name: "Levi's 501 Jeans",
        category: "clothing",
        price: 89,
        description: "Classic casual wear for relaxed and professional settings",
        emoji: "👖",
        brand: "Levi's",
        colors: ["Blue", "Black", "Gray"],
        moods: ["relaxed", "casual"],
        occasions: ["casual", "work"],
        image_url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",
        ar_enabled: true
      },
      {
        id: 3,
        name: "Apple Watch Series 9",
        category: "electronics",
        price: 399,
        description: "Smart technology for confident professionals",
        emoji: "⌚",
        brand: "Apple",
        colors: ["Silver", "Black", "Gold"],
        moods: ["professional", "confident"],
        occasions: ["work", "casual"],
        image_url: "https://images.unsplash.com/photo-1434493651358-e8b4862b43d4?w=400",
        ar_enabled: true
      },
      {
        id: 4,
        name: "Samsung Galaxy Earbuds",
        category: "electronics",
        price: 150,
        description: "Premium audio for happy music lovers",
        emoji: "🎧",
        brand: "Samsung",
        colors: ["White", "Black", "Purple"],
        moods: ["happy", "energetic"],
        occasions: ["gym", "travel"],
        image_url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400",
        ar_enabled: true
      }
    ];

    const queryLower = query.toLowerCase();
    return allProducts.filter(product => {
      const matchesText = 
        product.name.toLowerCase().includes(queryLower) ||
        product.description.toLowerCase().includes(queryLower) ||
        product.brand.toLowerCase().includes(queryLower) ||
        product.category.toLowerCase().includes(queryLower);

      const matchesMood = product.moods.some(mood => queryLower.includes(mood));
      const matchesOccasion = product.occasions.some(occasion => queryLower.includes(occasion));
      const matchesColor = product.colors.some(color => queryLower.includes(color.toLowerCase()));

      return matchesText || matchesMood || matchesOccasion || matchesColor;
    });
  };

  const startVoiceSearch = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const applySuggestion = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  if (!isVisible) return null;

  return (
    <div className="search-overlay">
      <div className="advanced-search">
        {/* Header */}
        <div className="search-header">
          <div className="search-title">
            <span className="search-icon">🔍</span>
            <h2>AI-Powered Smart Search</h2>
            <div className="ai-indicator">
              <span className="ai-badge">AI</span>
            </div>
          </div>
          <button className="close-search-btn" onClick={onClose}>✕</button>
        </div>

        <div className="search-content">
          {/* Search Input */}
          <div className="search-input-section">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search by mood, occasion, color, or product... (e.g., 'party outfit', 'gym wear', 'red shoes')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="search-input"
              />
              <div className="search-actions">
                <button 
                  className={`voice-search-btn ${isListening ? 'listening' : ''}`}
                  onClick={startVoiceSearch}
                  title="Voice Search"
                >
                  {isListening ? '🎤' : '🎙️'}
                </button>
                <button 
                  className="search-btn"
                  onClick={() => handleSearch()}
                  disabled={isSearching}
                >
                  {isSearching ? '⏳' : '🔍'}
                </button>
              </div>
            </div>
            {isListening && (
              <div className="voice-indicator">
                <div className="voice-animation"></div>
                <span>Listening... Speak now!</span>
              </div>
            )}
          </div>

          {/* AI Filters */}
          <div className="ai-filters">
            <h3>🧠 AI Smart Filters</h3>
            <div className="filter-grid">
              <select 
                value={filters.mood} 
                onChange={(e) => handleFilterChange('mood', e.target.value)}
                className="filter-select"
              >
                <option value="">Select Mood</option>
                <option value="happy">😊 Happy</option>
                <option value="energetic">⚡ Energetic</option>
                <option value="relaxed">😌 Relaxed</option>
                <option value="professional">💼 Professional</option>
                <option value="romantic">💕 Romantic</option>
                <option value="confident">💪 Confident</option>
              </select>

              <select 
                value={filters.occasion} 
                onChange={(e) => handleFilterChange('occasion', e.target.value)}
                className="filter-select"
              >
                <option value="">Select Occasion</option>
                <option value="work">💼 Work</option>
                <option value="party">🎉 Party</option>
                <option value="gym">🏋️ Gym</option>
                <option value="date">💕 Date</option>
                <option value="casual">👕 Casual</option>
                <option value="travel">✈️ Travel</option>
              </select>

              <select 
                value={filters.category} 
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="filter-select"
              >
                <option value="">Category</option>
                <option value="clothing">👕 Clothing</option>
                <option value="shoes">👟 Shoes</option>
                <option value="electronics">📱 Electronics</option>
                <option value="accessories">👑 Accessories</option>
              </select>

              <select 
                value={filters.priceRange} 
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="filter-select"
              >
                <option value="">Price Range</option>
                <option value="0-50">💰 $0 - $50</option>
                <option value="50-100">💵 $50 - $100</option>
                <option value="100-200">💸 $100 - $200</option>
                <option value="200+">💎 $200+</option>
              </select>
            </div>
          </div>

          {/* AI Suggestions */}
          {aiSuggestions.length > 0 && (
            <div className="ai-suggestions">
              <h3>🤖 AI Suggestions</h3>
              {aiSuggestions.map((suggestionGroup, index) => (
                <div key={index} className="suggestion-group">
                  <h4>{suggestionGroup.label}</h4>
                  <div className="suggestion-pills">
                    {suggestionGroup.items.map((item, itemIndex) => (
                      <button
                        key={itemIndex}
                        className="suggestion-pill"
                        onClick={() => applySuggestion(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Search Results */}
          <div className="search-results">
            <div className="results-header">
              <h3>🎯 Search Results</h3>
              {searchResults.length > 0 && (
                <span className="results-count">
                  Found {searchResults.length} product{searchResults.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            {isSearching ? (
              <div className="search-loading">
                <div className="loading-spinner"></div>
                <p>AI is analyzing your request...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="results-grid">
                {searchResults.map((product) => (
                  <div 
                    key={product.id} 
                    className="result-card"
                  >
                    <div className="result-image-container">
                      <img 
                        src={product.image_url} 
                        alt={product.name}
                        className="result-image"
                      />
                      <div className="ar-badge">🥽 AR Ready</div>
                    </div>
                    <div className="result-info">
                      <div className="result-header">
                        <span className="result-emoji">{product.emoji}</span>
                        <h4>{product.name}</h4>
                      </div>
                      <p className="result-description">{product.description}</p>
                      <div className="result-meta">
                        <span className="result-price">${product.price}</span>
                        <span className="result-brand">{product.brand}</span>
                      </div>
                      <div className="result-tags">
                        {product.moods && product.moods.map((mood, i) => (
                          <span key={i} className="mood-tag">😊 {mood}</span>
                        ))}
                        {product.occasions && product.occasions.map((occasion, i) => (
                          <span key={i} className="occasion-tag">📅 {occasion}</span>
                        ))}
                      </div>
                      <div className="result-actions">
                        <button 
                          className="ar-action-btn"
                          onClick={(e) => handleARView(product, e)}
                          style={{
                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                            color: 'white',
                            border: 'none',
                            padding: '10px 15px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            marginRight: '8px'
                          }}
                        >
                          🥽 Try AR
                        </button>
                        <button 
                          className="view-action-btn"
                          onClick={() => onProductSelect && onProductSelect(product)}
                          style={{
                            background: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            padding: '10px 15px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            cursor: 'pointer'
                          }}
                        >
                          👁️ View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery && (
              <div className="no-results">
                <div className="no-results-icon">🤔</div>
                <h3>No products found</h3>
                <p>Try different keywords, moods, or occasions</p>
                <div className="search-tips">
                  <h4>💡 Search Tips:</h4>
                  <ul>
                    <li>Try mood-based searches: "happy", "energetic", "relaxed"</li>
                    <li>Search by occasion: "party", "work", "gym", "date"</li>
                    <li>Use color names: "red shoes", "blue shirt"</li>
                    <li>Describe your style: "casual outfit", "formal wear"</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
