import React, { useState } from 'react';
import './AmazonStyleHeader.css';
import AmazonStyleSearch from './AmazonStyleSearch';

const AmazonStyleHeader = ({ user, cartItems = [], onCartClick, onCategorySelect, onSearch, onAuthClick, onAllDepartmentsClick }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLocationHovered, setIsLocationHovered] = useState(false);
  const [showAllDepartments, setShowAllDepartments] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const handleSearch = (searchQuery, category) => {
    if (onSearch) {
      onSearch(searchQuery, category);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <div className="amazon-style-navbar">
      {/* Top Navigation Bar */}
      <div className="navbar-top">
        {/* Logo Section */}
        <div className="walmart-logo-section">
          <a href="#" className="walmart-logo">
            <span className="logo-spark">🛍️</span>
            RetailFlow
          </a>
          
          {/* Delivery Location */}
          <div 
            className="delivery-location"
            onMouseEnter={() => setIsLocationHovered(true)}
            onMouseLeave={() => setIsLocationHovered(false)}
          >
            <div className="location-icon">📍</div>
            <div className="location-text">
              <div className="location-label">Deliver to</div>
              <div className="location-address">India</div>
            </div>
            {isLocationHovered && (
              <div className="location-popup">
                <p>Update your location to see local deals and faster delivery options!</p>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="amazon-search-container">
          <AmazonStyleSearch 
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategorySelect}
            onSearch={handleSearch}
            onProductSelect={(product) => {
              // Handle product selection from suggestions
              console.log('Product selected:', product);
              if (onSearch) {
                onSearch(product.name || product.text, selectedCategory);
              }
            }}
          />
        </div>

        {/* Right Navigation */}
        <div className="nav-right">
          {/* Country Flag */}
          <div className="nav-item">
            <div className="flag">🇺🇸</div>
            <div className="nav-item-secondary">EN</div>
          </div>

          {/* Account & Lists */}
          <div 
            className="nav-item account-menu" 
            onMouseEnter={() => setShowAccountMenu(true)}
            onMouseLeave={() => setShowAccountMenu(false)}
            onClick={onAuthClick}
          >
            <div className="nav-item-primary">
              Hello, {user?.name || 'Sign In'}
            </div>
            <div className="nav-item-secondary">Account & Lists</div>
            
            {showAccountMenu && (
              <div className="account-dropdown">
                <div className="account-dropdown-content">
                  {!user ? (
                    <div className="account-signin-section">
                      <button className="signin-btn" onClick={onAuthClick}>
                        <span className="signin-icon">👤</span>
                        Sign In
                      </button>
                      <p className="new-customer">
                        New customer? <span className="start-here" onClick={onAuthClick}>Start here.</span>
                      </p>
                    </div>
                  ) : (
                    <div className="account-user-section">
                      <div className="user-welcome">Welcome back, {user.name}!</div>
                      <button className="signout-btn" onClick={onAuthClick}>Sign Out</button>
                    </div>
                  )}
                  
                  <div className="account-lists">
                    <div className="account-column">
                      <h4>Your Lists</h4>
                      <ul>
                        <li><a href="#">Create a List</a></li>
                        <li><a href="#">Find a List or Registry</a></li>
                        <li><a href="#">Your Walmart Registry</a></li>
                        <li><a href="#">Your Wish List</a></li>
                        <li><a href="#">Your Shopping List</a></li>
                      </ul>
                    </div>
                    <div className="account-column">
                      <h4>Your Account</h4>
                      <ul>
                        <li><a href="#">Your Account</a></li>
                        <li><a href="#">Your Orders</a></li>
                        <li><a href="#">Your Recommendations</a></li>
                        <li><a href="#">Your Prime Membership</a></li>
                        <li><a href="#">Manage Your Content</a></li>
                        <li><a href="#">Your AR Shopping History</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Returns & Orders */}
          <div className="nav-item">
            <div className="nav-item-primary">Returns</div>
            <div className="nav-item-secondary">& Orders</div>
          </div>

          {/* Cart */}
          <div className="cart-container" onClick={onCartClick}>
            <div className="cart-icon-wrapper">
              <span className="cart-icon">🛒</span>
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </div>
            <span className="cart-text">Cart</span>
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="navbar-bottom">
        <div className="nav-bottom-content">
          <div 
            className="nav-category-item active all-departments"
            onMouseEnter={() => setShowAllDepartments(true)}
            onMouseLeave={() => setShowAllDepartments(false)}
          >
            <span className="menu-icon">☰</span>
            All Departments
            
            {showAllDepartments && (
              <div className="all-departments-dropdown">
                <div className="departments-content">
                  <div className="departments-main">
                    <div className="departments-column">
                      <h4>🛍️ Shop by Department</h4>
                      <ul>
                        <li><a href="#" onClick={() => handleCategorySelect('Electronics')}>📱 Electronics</a></li>
                        <li><a href="#" onClick={() => handleCategorySelect('Fashion')}>👕 Clothing & Fashion</a></li>
                        <li><a href="#" onClick={() => handleCategorySelect('Home')}>🏠 Home & Garden</a></li>
                        <li><a href="#" onClick={() => handleCategorySelect('Beauty')}>💄 Health & Beauty</a></li>
                        <li><a href="#" onClick={() => handleCategorySelect('Sports')}>⚽ Sports & Outdoors</a></li>
                        <li><a href="#" onClick={() => handleCategorySelect('Toys')}>🧸 Toys & Games</a></li>
                        <li><a href="#" onClick={() => handleCategorySelect('Auto')}>🚗 Automotive</a></li>
                        <li><a href="#" onClick={() => handleCategorySelect('Books')}>📚 Books & Media</a></li>
                      </ul>
                    </div>
                    
                    <div className="departments-column">
                      <h4>🎯 Smart Features</h4>
                      <ul>
                        <li><a href="#" onClick={() => onAllDepartmentsClick && onAllDepartmentsClick('ar-shopping')}>🥽 AR Shopping Experience</a></li>
                        <li><a href="#" onClick={() => onAllDepartmentsClick && onAllDepartmentsClick('ai-recommendations')}>🤖 AI Recommendations</a></li>
                        <li><a href="#" onClick={() => onAllDepartmentsClick && onAllDepartmentsClick('voice-search')}>🎤 Voice Search</a></li>
                        <li><a href="#" onClick={() => onAllDepartmentsClick && onAllDepartmentsClick('mood-chatbot')}>💬 Mood-Based Chatbot</a></li>
                        <li><a href="#" onClick={() => onAllDepartmentsClick && onAllDepartmentsClick('live-tracking')}>📍 Live Order Tracking</a></li>
                        <li><a href="#" onClick={() => onAllDepartmentsClick && onAllDepartmentsClick('group-buying')}>👥 Group Buying</a></li>
                        <li><a href="#" onClick={() => onAllDepartmentsClick && onAllDepartmentsClick('flash-deals')}>⚡ Flash Deals</a></li>
                        <li><a href="#" onClick={() => onAllDepartmentsClick && onAllDepartmentsClick('analytics')}>📊 Shopping Analytics</a></li>
                        <li><a href="#" onClick={() => onAllDepartmentsClick && onAllDepartmentsClick('enterprise-dashboard')}>🚀 Enterprise Dashboard</a></li>
                      </ul>
                    </div>
                    
                    <div className="departments-column">
                      <h4>🔥 Special Services</h4>
                      <ul>
                        <li><a href="#" onClick={() => onAllDepartmentsClick && onAllDepartmentsClick('walmart-plus')}>✨ Walmart+ Membership</a></li>
                        <li><a href="#" onClick={() => onAllDepartmentsClick && onAllDepartmentsClick('grocery-pickup')}>🛒 Grocery Pickup</a></li>
                        <li><a href="#" onClick={() => onAllDepartmentsClick && onAllDepartmentsClick('pharmacy')}>💊 Pharmacy Services</a></li>
                        <li><a href="#" onClick={() => onAllDepartmentsClick && onAllDepartmentsClick('auto-services')}>🔧 Auto Services</a></li>
                        <li><a href="#" onClick={() => onAllDepartmentsClick && onAllDepartmentsClick('financial')}>💳 Financial Services</a></li>
                        <li><a href="#" onClick={() => onAllDepartmentsClick && onAllDepartmentsClick('photo-center')}>📸 Photo Center</a></li>
                        <li><a href="#" onClick={() => onAllDepartmentsClick && onAllDepartmentsClick('gift-cards')}>🎁 Gift Cards</a></li>
                        <li><a href="#" onClick={() => onAllDepartmentsClick && onAllDepartmentsClick('registry')}>📝 Wedding Registry</a></li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="departments-footer">
                    <div className="featured-section">
                      <h4>🌟 Featured Today</h4>
                      <div className="featured-deals">
                        <div className="featured-deal">
                          <span className="deal-badge">🔥 Hot Deal</span>
                          <span className="deal-text">Up to 70% off Electronics</span>
                        </div>
                        <div className="featured-deal">
                          <span className="deal-badge">🆕 New</span>
                          <span className="deal-text">AR Try-On for Fashion</span>
                        </div>
                        <div className="featured-deal">
                          <span className="deal-badge">⚡ Limited</span>
                          <span className="deal-text">Free Shipping on Orders $35+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <a href="#" className="nav-category-item">Today's Deals</a>
          <a href="#" className="nav-category-item">Customer Service</a>
          <a href="#" className="nav-category-item">Registry</a>
          <a href="#" className="nav-category-item">Gift Cards</a>
          <a href="#" className="nav-category-item">Sell</a>
          <a href="#" className="nav-category-item">Walmart+</a>
          <a href="#" className="nav-category-item">AR Shopping</a>
          <a href="#" className="nav-category-item">Grocery</a>
          <a href="#" className="nav-category-item">Electronics</a>
          <a href="#" className="nav-category-item">Fashion</a>
          <a href="#" className="nav-category-item">Home</a>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="promo-banner">
        <div className="promo-content">
          <span className="promo-text">
            🎉 New AR Shopping Experience! Try on products virtually with advanced 3D technology!
          </span>
          <button className="promo-cta">Try AR Now</button>
        </div>
      </div>
    </div>
  );
};

export default AmazonStyleHeader;
