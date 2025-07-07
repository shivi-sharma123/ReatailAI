import React, { useState, useEffect } from 'react';
import './ModernShoppingApp.css';
import ProductGrid from './ProductGrid';
import EnhancedShoppingCart from './EnhancedShoppingCart';
import ProductReviews from './ProductReviews';
import CheckoutProcess from './CheckoutProcess';
import EnhancedARViewer from './EnhancedARViewer_New';
import EnhancedChatbot from './EnhancedChatbot';
import WalmartPayIntegration from './WalmartPayIntegration';
import VoiceSearch from './VoiceSearch';
import SocialSharingHub from './SocialSharingHub';
import ProductRecommendations from './ProductRecommendations';
import AdvancedFilters from './AdvancedFilters';
import FlashDeals from './FlashDeals_Amazon';
import GroupBuying from './GroupBuying';
import OrderTracking from './OrderTracking';
import ProductComparison from './ProductComparison';
import LoyaltyProgram from './LoyaltyProgram';
import { productDatabase, productCategories } from './productDatabase';

function ModernShoppingApp({ user, onLogout }) {
  const [currentView, setCurrentView] = useState('home');
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showWalmartPay, setShowWalmartPay] = useState(false);
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const [showSocialShare, setShowSocialShare] = useState(false);
  const [productToShare, setProductToShare] = useState(null);
  const [showOrderTracking, setShowOrderTracking] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showGroupBuying, setShowGroupBuying] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    priceRange: [0, 1000],
    brands: [],
    ratings: 0,
    delivery: '',
    discount: 0,
    availability: '',
    features: []
  });

  // Enhanced cart management
  const handleAddToCart = (product, options = {}) => {
    const cartItem = {
      ...product,
      cartId: Date.now() + Math.random(),
      quantity: options.quantity || 1,
      selectedColor: options.color || null,
      selectedSize: options.size || null,
      addedAt: new Date().toISOString()
    };
    
    setCartItems(prev => [...prev, cartItem]);
    
    // Show success animation
    const successMsg = document.createElement('div');
    successMsg.className = 'add-to-cart-success';
    successMsg.innerHTML = `
      <div class="success-content">
        <span class="success-icon">✅</span>
        <span class="success-text">Added to Cart!</span>
      </div>
    `;
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
      successMsg.remove();
    }, 3000);
  };

  const handleUpdateCartQuantity = (cartId, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(prev => prev.filter(item => item.cartId !== cartId));
    } else {
      setCartItems(prev => 
        prev.map(item => 
          item.cartId === cartId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleAddToWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (!exists) {
        return [...prev, { ...product, addedAt: new Date().toISOString() }];
      }
      return prev;
    });
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  // Add delete/remove product handler
  const handleDeleteProduct = (product) => {
    // Remove from wishlist if it exists
    handleRemoveFromWishlist(product.id);
    
    // Remove from cart if it exists
    setCartItems(prev => prev.filter(item => item.id !== product.id));
    
    // Show delete success animation
    const successMsg = document.createElement('div');
    successMsg.className = 'delete-success-notification';
    successMsg.innerHTML = `
      <div class="success-content">
        <span class="success-icon">🗑️</span>
        <span class="success-text">Removed Successfully!</span>
      </div>
    `;
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
      successMsg.remove();
    }, 3000);
  };

  // Enhanced handlers for new features
  const handleVoiceSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    setCurrentView('products'); // Navigate to products view when searching
    // Trigger search with voice query
    console.log('Voice search:', searchQuery);
  };

  // Handle advanced filters
  const handleFilterChange = (filters) => {
    setAppliedFilters(filters);
    console.log('Applied filters:', filters);
  };

  // Add product to recently viewed when viewing details
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowReviews(true);
  };

  const handleSocialShare = (product) => {
    setProductToShare(product);
    setShowSocialShare(true);
  };

  const handleWalmartPaySuccess = (paymentData) => {
    console.log('Walmart Pay Success:', paymentData);
    setShowWalmartPay(false);
    setShowCheckout(false);
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'payment-success-notification';
    successMsg.innerHTML = `
      <div class="success-content">
        <span class="success-icon">💳</span>
        <span class="success-text">Payment Successful!</span>
      </div>
    `;
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
      successMsg.remove();
    }, 5000);
  };

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Modern Header Component with Flutter-style design
  const ModernHeader = () => (
    <header className="modern-header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="header-logo" onClick={() => {
          setCurrentView('home');
          setActiveSection('home');
        }} style={{cursor: 'pointer'}}>
          <div className="logo-icon">🛍️</div>
          <div className="logo-text">
            <h1>RetailFlow</h1>
            <span>Smart Shopping with AR</span>
          </div>
        </div>

        {/* Search Bar with Beautiful Design */}
        <div className="header-search">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search for products, brands, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button 
              className="voice-search-btn"
              onClick={() => setShowVoiceSearch(true)}
              title="Voice Search"
            >
              🎤
            </button>
            <button className="search-button">
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Header Actions */}
        <div className="header-actions">
          <button 
            className={`action-button ${currentView === 'home' && activeSection === 'home' ? 'active' : ''}`}
            onClick={() => {
              setCurrentView('home');
              setActiveSection('home');
            }}
            title="Home"
          >
            <span className="action-icon">🏠</span>
            <span className="action-label">Home</span>
          </button>

          <button 
            className={`action-button ${currentView === 'products' ? 'active' : ''}`}
            onClick={() => {
              setCurrentView('products');
              setActiveSection('products');
            }}
            title="Browse All Products"
          >
            <span className="action-icon">🛍️</span>
            <span className="action-label">Shop</span>
          </button>

          <button 
            className="action-button"
            onClick={() => setShowAdvancedFilters(true)}
            title="Advanced Filters"
          >
            <span className="action-icon">🔍</span>
            <span className="action-label">Filters</span>
          </button>

          <button 
            className={`action-button deals-btn ${activeSection === 'deals' ? 'active' : ''}`}
            onClick={() => {
              setCurrentView('home');
              setActiveSection('deals');
              // Scroll to deals section after a short delay to ensure page loads
              setTimeout(() => {
                const dealsSection = document.querySelector('.flash-deals-section, .amazon-deals-section');
                if (dealsSection) {
                  dealsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }, 100);
            }}
            title="Flash Deals"
          >
            <span className="action-icon">⚡</span>
            <span className="action-label">Deals</span>
            <span className="badge deals-badge">LIVE</span>
          </button>

          <button 
            className="action-button"
            onClick={() => setShowOrderTracking(true)}
            title="Track Orders"
          >
            <span className="action-icon">📦</span>
            <span className="action-label">Track</span>
          </button>

          <button 
            className="action-button"
            onClick={() => setShowChatbot(true)}
            title="AI Assistant"
          >
            <span className="action-icon">🤖</span>
            <span className="action-label">AI Help</span>
          </button>

          <button 
            className="action-button wishlist-btn"
            onClick={() => {
              setCurrentView('products');
              // Show wishlist items by filtering
            }}
            title="Wishlist"
          >
            <span className="action-icon">💖</span>
            <span className="action-label">Wishlist</span>
            {wishlistItems.length > 0 && (
              <span className="badge">{wishlistItems.length}</span>
            )}
          </button>

          <button 
            className="action-button cart-btn"
            onClick={() => setShowCart(true)}
            title="Shopping Cart"
          >
            <span className="action-icon">🛒</span>
            <span className="action-label">Cart</span>
            {cartItems.length > 0 && (
              <span className="badge">{getTotalCartItems()}</span>
            )}
          </button>

          <div className="user-menu">
            <div className="user-avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <span>{user.name.charAt(0).toUpperCase()}</span>
              )}
              {user.provider && (
                <div className="provider-badge">
                  {user.provider === 'google' && (
                    <img 
                      src="https://developers.google.com/identity/images/g-logo.png" 
                      alt="Google" 
                      className="google-logo"
                    />
                  )}
                  {user.provider === 'apple' && '⚫'}
                </div>
              )}
            </div>
            <div className="user-info">
              <div className="user-details">
                <div className="user-text">
                  <span className="user-name">{user.name}</span>
                  {user.provider && (
                    <span className="user-provider">via {user.provider}</span>
                  )}
                </div>
              </div>
              <button onClick={onLogout} className="logout-btn">
                <span className="logout-icon">🚪</span>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  // Categories Navigation
  const CategoriesNav = () => (
    <nav className="categories-nav">
      <div className="categories-container">
        <button
          className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          <span className="category-icon">🌟</span>
          <span>All</span>
        </button>
        {productCategories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );

  // Featured Products Section
  const FeaturedSection = () => (
    <section className="featured-section">
      <div className="section-container">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Discover our hand-picked premium collection</p>
        </div>
        
        <div className="featured-grid">
          {productDatabase.slice(0, 6).map(product => (
            <div key={product.id} className="featured-card">
              <div className="card-image">
                <img src={product.image_url} alt={product.name} />
                {product.arEnabled && (
                  <button 
                    className="ar-badge"
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowAR(true);
                    }}
                  >
                    🥽 Try AR
                  </button>
                )}
                <button 
                  className="wishlist-heart"
                  onClick={() => handleAddToWishlist(product)}
                >
                  💖
                </button>
              </div>
              <div className="card-content">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-rating">
                  <span className="stars">⭐⭐⭐⭐⭐</span>
                  <span className="rating-text">({product.reviewCount})</span>
                </div>
                <div className="product-price">
                  <span className="current-price">${product.price}</span>
                  {product.originalPrice && (
                    <span className="original-price">${product.originalPrice}</span>
                  )}
                </div>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  <span>🛒</span>
                  Add to Cart
                </button>
                <button 
                  className="delete-product-btn"
                  onClick={() => handleDeleteProduct(product)}
                  title="Remove from Wishlist"
                >
                  <span>🗑️</span>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="modern-shopping-app">
      {/* Header */}
      <ModernHeader />
      
      {/* Categories Navigation */}
      <CategoriesNav />
      
      {/* Main Content */}
      <main className="main-content">
        {currentView === 'home' && (
          <>
            <FeaturedSection />
            <FlashDeals 
              onAddToCart={handleAddToCart}
              onProductClick={handleProductClick}
            />
          </>
        )}
        
        {currentView === 'products' && (
          <>
            <ProductGrid
              products={productDatabase}
              categories={productCategories}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              appliedFilters={appliedFilters}
              onCategoryChange={setSelectedCategory}
              onFilterChange={handleFilterChange}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              onRemoveFromWishlist={handleRemoveFromWishlist}
              onDeleteProduct={handleDeleteProduct}
              onSocialShare={handleSocialShare}
              onShowAR={(product) => {
                setSelectedProduct(product);
                setShowAR(true);
              }}
              onProductClick={handleProductClick}
              onBackToHome={() => setCurrentView('home')}
              wishlistItems={wishlistItems}
            />
          </>
        )}
      </main>

      {/* Shopping Cart Modal */}
      {showCart && (
        <EnhancedShoppingCart
          cartItems={cartItems}
          wishlistItems={wishlistItems}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={(cartId) => handleUpdateCartQuantity(cartId, 0)}
          onMoveToWishlist={(item) => {
            handleAddToWishlist(item);
            handleUpdateCartQuantity(item.cartId, 0);
          }}
          onMoveToCart={(item) => {
            handleAddToCart(item);
            handleRemoveFromWishlist(item.id);
          }}
          onShowAR={(product) => {
            setSelectedProduct(product);
            setShowAR(true);
          }}
          onCheckout={() => {
            setShowCart(false);
            setShowCheckout(true);
          }}
          onClose={() => setShowCart(false)}
        />
      )}

      {/* Product Reviews Modal */}
      {showReviews && selectedProduct && (
        <ProductReviews
          product={selectedProduct}
          onClose={() => {
            setShowReviews(false);
            setSelectedProduct(null);
          }}
          onAddToCart={(product, options) => handleAddToCart(product, options)}
          onAddToWishlist={handleAddToWishlist}
          onShowAR={(product) => {
            setSelectedProduct(product);
            setShowAR(true);
          }}
          onProductClick={handleProductClick}
          ProductRecommendationsComponent={() => (
            <ProductRecommendations
              currentProduct={selectedProduct}
              allProducts={productDatabase}
              onProductClick={handleProductClick}
              onAddToCart={handleAddToCart}
            />
          )}
        />
      )}

      {/* Checkout Process */}
      {showCheckout && (
        <CheckoutProcess
          cartItems={cartItems}
          total={getTotalPrice()}
          onOrderComplete={(orderData) => {
            console.log('Order completed:', orderData);
            setCartItems([]);
            setShowCheckout(false);
            setCurrentView('home');
          }}
          onWalmartPayClick={() => {
            setShowCheckout(false);
            setShowWalmartPay(true);
          }}
          onBack={() => {
            setShowCheckout(false);
            setShowCart(true);
          }}
          onClose={() => {
            setShowCheckout(false);
            setCurrentView('home');
          }}
        />
      )}

      {/* AR Viewer */}
      {showAR && selectedProduct && (
        <EnhancedARViewer
          product={selectedProduct}
          onClose={() => {
            setShowAR(false);
            setSelectedProduct(null);
          }}
        />
      )}

      {/* AI Chatbot */}
      {showChatbot && (
        <EnhancedChatbot
          onClose={() => setShowChatbot(false)}
          onShowAR={(product) => {
            setSelectedProduct(product);
            setShowAR(true);
          }}
        />
      )}

      {/* Walmart Pay Integration */}
      {showWalmartPay && (
        <WalmartPayIntegration
          totalAmount={getTotalPrice()}
          onPaymentSuccess={handleWalmartPaySuccess}
          onClose={() => setShowWalmartPay(false)}
        />
      )}

      {/* Voice Search Feature */}
      {showVoiceSearch && (
        <VoiceSearch
          onSearch={handleVoiceSearch}
          onClose={() => setShowVoiceSearch(false)}
        />
      )}

      {/* Social Sharing Hub */}
      {showSocialShare && productToShare && (
        <SocialSharingHub
          product={productToShare}
          user={user}
          onClose={() => {
            setShowSocialShare(false);
            setProductToShare(null);
          }}
        />
      )}

      {/* Order Tracking */}
      {showOrderTracking && (
        <OrderTracking
          orderId={selectedOrderId}
          onClose={() => {
            setShowOrderTracking(false);
            setSelectedOrderId(null);
          }}
        />
      )}

      {/* Group Buying */}
      {showGroupBuying && selectedProduct && (
        <GroupBuying
          product={selectedProduct}
          user={user}
          onJoinGroup={(groupId) => {
            console.log('Joined group:', groupId);
          }}
          onCreateGroup={(groupData) => {
            console.log('Created group:', groupData);
          }}
          onClose={() => setShowGroupBuying(false)}
        />
      )}

      {/* Floating Action Button */}
      <button 
        className="floating-action-btn"
        onClick={() => setShowChatbot(true)}
        title="AI Assistant"
      >
        🤖
      </button>

    </div>
  );
}

export default ModernShoppingApp;
