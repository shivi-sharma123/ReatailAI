import React, { useState } from 'react';
import './MiniSearch.css';

/**
 * MiniSearch - A compact search bar component for the navigation bar
 * 
 * This component provides a streamlined search experience similar to Amazon and Flipkart.
 * It integrates with the main AdvancedSearch component for more detailed searches.
 * 
 * The application also features a professional footer with detailed sections for:
 * - Company information
 * - Shop categories
 * - Customer service
 * - About us
 * - Innovation features
 * - Payment methods and app downloads
 */
const MiniSearch = ({ onSearch, onExpand }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch && onSearch(searchQuery);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="mini-search-container">
      <input
        type="text"
        className="mini-search-input"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button className="mini-search-btn" onClick={handleSearch}>
        🔍
      </button>
      <button className="mini-search-expand" onClick={onExpand} title="Advanced Search">
        ⋮
      </button>
    </div>
  );
};

export default MiniSearch;
