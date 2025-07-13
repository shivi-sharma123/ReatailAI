import React, { useState, useEffect, useCallback } from 'react';
import './ModernShoppingApp.css';
import './CompactNavigation.css';
import EnhancedShoppingCart from './EnhancedShoppingCart';
import ProductReviews from './ProductReviews';
import CheckoutProcess from './CheckoutProcess';
import EnhancedARViewer from './EnhancedARViewerNew';
import EnhancedChatbot from './EnhancedChatbot';
import WalmartPayIntegration from './WalmartPayIntegration';
import VoiceSearch from './VoiceSearch';
import SocialSharingHub from './SocialSharingHub';
import GroupBuying from './GroupBuying';
import LiveTracking from './LiveTracking';
import OrderTracking from './OrderTracking';
import ModernFooter from './ModernFooter';
import { productDatabase, productCategories } from './productDatabase';
import WalmartLogin from './WalmartLogin';
import WalmartLiveDeals from './WalmartLiveDeals';
import CategoryProductDisplay from './CategoryProductDisplay';

function ModernShoppingApp(props) {
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
  const [showLiveTracking, setShowLiveTracking] = useState(false);
  const [showGroupBuying, setShowGroupBuying] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [compactMode, setCompactMode] = useState(true); // Enable compact mode by default
  const [showLogin, setShowLogin] = useState(false);

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
        <span class="success-text">Added
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

  // Enhanced handlers for new features
  const handleVoiceSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    setCurrentView('products'); // Navigate to products view when searching
    console.log('Voice search:', searchQuery);
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

  // Modern Header Component with Clean Design
  const ModernHeader = () => (
    <header className="modern-header">
      <div className="header-container">
        {/* Logo Section - Compact */}
        <div className="header-logo" onClick={() => {
          setCurrentView('home');
          setActiveSection('home');
        }} style={{cursor: 'pointer'}}>
          <div className="logo-icon">🛍️</div>
          <div className="logo-text">
            <h1>RetailFlow</h1>
          </div>
        </div>

        {/* Search Bar - Streamlined */}
        <div className="header-search">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
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
          </div>
        </div>

        {/* Compact Navigation */}
        <nav className="header-nav">
          {/* Primary Navigation */}
          <div className="nav-group primary-nav">
            <button 
              className={`nav-btn ${currentView === 'home' ? 'active' : ''}`}
              onClick={() => {
                setCurrentView('home');
                setActiveSection('home');
              }}
              title="Home"
            >
              🏠
            </button>

            <button 
              className={`nav-btn ${currentView === 'products' ? 'active' : ''}`}
              onClick={() => {
                setCurrentView('products');
                setActiveSection('products');
                setSelectedCategory('all');
              }}
              title="Shop"
            >
              🛍️
            </button>

            {/* My Shop Button */}
            <button
              className={`nav-btn ${activeSection === 'myshop' ? 'active' : ''}`}
              onClick={() => {
                setCurrentView('products');
                setActiveSection('myshop');
                setSelectedCategory('myshop');
              }}
              title="My Shop"
            >
              🏬
            </button>

            <button 
              className={`nav-btn special ${activeSection === 'deals' ? 'active' : ''}`}
              onClick={() => {
                setCurrentView('home');
                setActiveSection('deals');
                setTimeout(() => {
                  const dealsSection = document.querySelector('.flash-deals-section, .amazon-deals-section');
                  if (dealsSection) {
                    dealsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }}
              title="Hot Deals"
            >
              ⚡
              <span className="pulse-badge">HOT</span>
            </button>

            {/* More Features Dropdown */}
            <div className="dropdown-container">
              <button 
                className="nav-btn dropdown-trigger"
                onClick={() => setShowDropdown(!showDropdown)}
                title="More"
              >
                ⋯
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <button 
                    onClick={() => {
                      setShowLiveTracking(true);
                      setShowDropdown(false);
                    }}
                    className="dropdown-item"
                  >
                    📦 Track Orders
                  </button>
                  <button 
                    onClick={() => {
                      setShowChatbot(true);
                      setShowDropdown(false);
                    }}
                    className="dropdown-item"
                  >
                    🤖 AI Help
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* User Actions */}
          <div className="nav-group user-nav">
            {/* Compact Mode Toggle */}
            <button 
              className="nav-btn-icon compact-toggle"
              onClick={() => setCompactMode(!compactMode)}
              title={compactMode ? "Expand Navigation" : "Compact Navigation"}
            >
              {compactMode ? '📏' : '📐'}
            </button>

            <button 
              className="nav-btn-icon wishlist-btn"
              onClick={() => setCurrentView('products')}
              title="Wishlist"
            >
              💖
              {wishlistItems.length > 0 && (
                <span className="nav-badge">{wishlistItems.length}</span>
              )}
            </button>

            <button 
              className="nav-btn-icon cart-btn"
              onClick={() => setShowCart(true)}
              title="Cart"
            >
              🛒
              {cartItems.length > 0 && (
                <span className="nav-badge cart-count">{getTotalCartItems()}</span>
              )}
            </button>

            {/* Login Button */}
            <button
              className="nav-btn-icon login-btn"
              onClick={() => setShowLogin(true)}
              title="Login"
            >
              <span role="img" aria-label="login">🔑</span>
            </button>

            <div className="user-profile">
              <div className="user-avatar" title={'Guest'}>
                <span>👤</span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );

  // Categories Navigation
  const CategoriesNav = () => (
    <nav className="categories-nav">
      <div className="categories-container">
        <button
          className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => {
            setSelectedCategory('all');
            setCurrentView('products');
            setActiveSection('products');
          }}
        >
          <span className="category-icon">🌟</span>
          <span>All</span>
        </button>
        {productCategories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(category.id);
              setCurrentView('products');
              setActiveSection('products');
            }}
          >
            <span className="category-icon">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );

  // Featured Products Section
  const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const heroSlides = [
      {
        id: 1,
        image: "https://i.pinimg.com/originals/8f/66/54/8f66549d7639403d022865b40e28ea16.jpg",
        title: "Fashion Forward",
        subtitle: "Trendy Styles for Everyone",
        bgColor: "transparent"
      },
      {
        id: 2,
        image: "https://www.onegreenplanet.org/wp-content/uploads/2021/12/shutterstock_1758099047-scaled.jpg",
        title: "Eco Shopping",
        subtitle: "Shop Green, Live Clean",
        bgColor: "transparent"
      },
      {
        id: 3,
        image: "https://i.pinimg.com/originals/c8/6c/ed/c86ced20f82df4fd21b46fe3e0cd1d2b.jpg",
        title: "Luxury Experience",
        subtitle: "Premium Brands & Outlets",
        bgColor: "transparent"
      },
      {
        id: 4,
        image: "https://wallpapercave.com/wp/wp7566374.jpg", // Updated as per user request
        title: "Modern Stores",
        subtitle: "Organized & Stylish Shopping",
        bgColor: "transparent"
      }
    ];

    const nextSlide = useCallback(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, [heroSlides.length]);

    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    const goToSlide = (index) => {
      setCurrentSlide(index);
    };

    // Auto-slide functionality with better timing for 4 slides
    useEffect(() => {
      const interval = setInterval(nextSlide, 5000); // Increased to 5 seconds for better viewing
      return () => clearInterval(interval);
    }, [nextSlide]);

    return (
      <section className="hero-carousel-section">
        {/* App Title Overlay */}
        <div className="hero-app-title">
          <h1 className="app-title-main">Walmart Retail Shopping App</h1>
          <p className="app-title-sub">AI-Powered Smart Shopping Experience</p>
        </div>

        <div className="carousel-container">
          {/* Main Carousel */}
          <div className="carousel-wrapper">
            <div 
              className="carousel-track"
              style={{ 
                transform: `translateX(-${currentSlide * (100 / 4)}%)`,
                width: `${heroSlides.length * 100}%`
              }}
            >
              {heroSlides.map((slide, index) => (
                <div 
                  key={slide.id} 
                  className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                  style={{ width: `${100 / heroSlides.length}%` }}
                >
                  <div className="slide-image-container">
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="slide-image"
                      onError={(e) => {
                        console.log('Failed to load image:', slide.image);
                        e.target.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=800&fit=crop&crop=center";
                        e.target.style.display = 'block';
                      }}
                      loading="eager"
                      crossOrigin="anonymous"
                    />
                    <div 
                      className="slide-overlay"
                      style={{ 
                        background: slide.bgColor || 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)' 
                      }}
                    ></div>
                  </div>
                  
                  {/* Minimal slide info */}
                  <div className="slide-info">
                    <div className="slide-badge">
                      <span className="badge-text">{slide.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button 
            className="carousel-nav-btn prev-btn"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <span className="nav-icon">‹</span>
          </button>
          
          <button 
            className="carousel-nav-btn next-btn"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <span className="nav-icon">›</span>
          </button>

          {/* Dot Indicators */}
          <div className="carousel-indicators">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`indicator-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Quick Action Buttons (bottom right) */}
          <div className="quick-actions-overlay">
            <button 
              className="quick-action-btn shop-btn"
              onClick={() => setCurrentView('products')}
            >
              <span className="action-icon">🛍️</span>
              <span className="action-text">Shop Now</span>
            </button>
            <button 
              className="quick-action-btn ai-btn"
              onClick={() => setShowChatbot(true)}
            >
              <span className="action-icon">🤖</span>
              <span className="action-text">AI Assistant</span>
            </button>
          </div>
        </div>
      </section>
    );
  };

  const FeaturedSection = () => (
    <section className="featured-section" style={{ background: 'linear-gradient(135deg, #e3f0ff 0%, #f8fafc 100%)', padding: '48px 0 56px 0', borderRadius: '0 0 32px 32px', boxShadow: '0 8px 32px rgba(25, 118, 210, 0.07)' }}>
      <div className="section-container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 900,
            background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '1.5px',
            margin: 0,
            lineHeight: 1.1
          }}>🌟 Featured Products</h2>
          <p style={{
            fontSize: '1.25rem',
            color: '#1976d2',
            fontWeight: 500,
            margin: '16px 0 0 0',
            letterSpacing: '0.5px',
            textShadow: '0 2px 8px #e3f0ff'
          }}>
            Discover our hand-picked premium collection, just for you!
          </p>
        </div>
        <div className="featured-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center' }}>
          {/* Add robot fashion store checkout card as the first featured card */}
          <div className="featured-card modern-card" 
            style={{ 
              width: '260px', 
              boxShadow: '0 8px 32px rgba(25, 118, 210, 0.18)', 
              borderRadius: '22px', 
              background: 'linear-gradient(135deg, #fff 0%, #e3f0ff 100%)', 
              padding: '28px 20px 24px 20px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              minHeight: '400px',
              position: 'relative',
              transition: 'box-shadow 0.25s, transform 0.18s',
              border: '1.5px solid #e3eafc',
              cursor: 'pointer',
              overflow: 'hidden',
              backdropFilter: 'blur(2px)'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px) scale(1.04)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(25, 118, 210, 0.22)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(25, 118, 210, 0.18)'; }}
          >
            <div className="card-image" style={{ width: '100%', height: '180px', marginBottom: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7faff', borderRadius: '14px', boxShadow: '0 2px 12px rgba(25, 118, 210, 0.13)' }}>
              <img src="https://img.freepik.com/premium-photo/robot-fashion-store-checkout-scanning-clothes_124507-277861.jpg" alt="AI Fashion Checkout" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', borderRadius: '12px', transition: 'transform 0.2s' }} />
              <span className="prime-badge" style={{position:'absolute',top:10,left:10,background:'#ffd700',color:'#222',fontWeight:700,padding:'4px 10px',borderRadius:'8px',fontSize:'0.95rem',boxShadow:'0 2px 8px #ffe082'}}>Assured</span>
              <span className="deal-badge" style={{position:'absolute',top:10,right:10,background:'#ff7043',color:'#fff',fontWeight:700,padding:'4px 10px',borderRadius:'8px',fontSize:'0.95rem',boxShadow:'0 2px 8px #ffab91'}}>Deal of the Day</span>
            </div>
            <div className="card-content" style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%' }}>
              <h3 className="product-name" style={{ fontSize: '1.22rem', fontWeight: 800, margin: '0 0 12px 0', minHeight: '32px', color: '#1a237e', letterSpacing: '0.7px', textShadow: '0 2px 8px #e3f0ff' }}>AI Fashion Checkout</h3>
              <div className="product-price" style={{ fontSize: '1.22rem', color: '#1976d2', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.2px', textShadow: '0 2px 8px #e3f0ff' }}>
                $299 <span style={{fontSize:'0.95rem',color:'#43a047',fontWeight:600,marginLeft:8}}>Free Delivery</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', width: '100%', marginTop: 'auto' }}>
              <button 
                className="add-to-cart-btn"
                style={{ 
                  background: 'linear-gradient(90deg, #ff9900 0%, #ffb84d 100%)', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '14px', 
                  padding: '13px 0', 
                  cursor: 'pointer', 
                  fontWeight: 800, 
                  fontSize: '1.08rem', 
                  flex: 1, 
                  boxShadow: '0 4px 16px rgba(255, 152, 0, 0.13)',
                  transition: 'background 0.18s, box-shadow 0.18s, transform 0.13s',
                  letterSpacing: '0.7px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backdropFilter: 'blur(1.5px)'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(90deg, #ff7043 0%, #ffd740 100%)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(90deg, #ff9900 0%, #ffb84d 100%)'; e.currentTarget.style.transform = 'none'; }}
                onClick={() => handleAddToCart({ id: 'ai-fashion-checkout', name: 'AI Fashion Checkout', price: 299, image_url: 'https://img.freepik.com/premium-photo/robot-fashion-store-checkout-scanning-clothes_124507-277861.jpg' })}
              >
                <span role="img" aria-label="cart" style={{ fontSize: '1.25rem' }}>🛒</span>
                <span>Add to Cart</span>
              </button>
              <button
                className="ar-view-btn"
                style={{ 
                  background: 'linear-gradient(90deg, #43a047 0%, #66bb6a 100%)', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '14px', 
                  padding: '13px 0', 
                  cursor: 'pointer', 
                  fontWeight: 800, 
                  fontSize: '1.08rem', 
                  flex: 1, 
                  boxShadow: '0 4px 16px rgba(67, 160, 71, 0.13)',
                  transition: 'background 0.18s, box-shadow 0.18s, transform 0.13s',
                  letterSpacing: '0.7px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backdropFilter: 'blur(1.5px)'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(90deg, #388e3c 0%, #81c784 100%)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(90deg, #43a047 0%, #66bb6a 100%)'; e.currentTarget.style.transform = 'none'; }}
                onClick={() => {
                  setSelectedProduct({ id: 'ai-fashion-checkout', name: 'AI Fashion Checkout', price: 299, image_url: 'https://img.freepik.com/premium-photo/robot-fashion-store-checkout-scanning-clothes_124507-277861.jpg' });
                  setShowAR(true);
                }}
                title="View in AR"
              >
                <span role="img" aria-label="ar" style={{ fontSize: '1.25rem' }}>🕶️</span>
                <span>View in AR</span>
              </button>
            </div>
          </div>
          {/* Show first 5 featured products only, no skipping or delete button, wishlist removed */}
          {productDatabase.slice(0, 5).map((product, idx) => (
            <div key={product.id} className="featured-card modern-card" 
              style={{ 
                width: '260px', 
                boxShadow: '0 8px 32px rgba(25, 118, 210, 0.18)', 
                borderRadius: '22px', 
                background: 'linear-gradient(135deg, #fff 0%, #e3f0ff 100%)', 
                padding: '28px 20px 24px 20px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                minHeight: '400px',
                position: 'relative',
                transition: 'box-shadow 0.25s, transform 0.18s',
                border: '1.5px solid #e3eafc',
                cursor: 'pointer',
                overflow: 'hidden',
                backdropFilter: 'blur(2px)'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px) scale(1.04)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(25, 118, 210, 0.22)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(25, 118, 210, 0.18)'; }}
            >
              <div className="card-image" style={{ width: '100%', height: '180px', marginBottom: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7faff', borderRadius: '14px', boxShadow: '0 2px 12px rgba(25, 118, 210, 0.13)' }}>
                <img src={product.image_url} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '12px', transition: 'transform 0.2s' }} />
                {idx === 0 && <span className="prime-badge" style={{position:'absolute',top:10,left:10,background:'#ffd700',color:'#222',fontWeight:700,padding:'4px 10px',borderRadius:'8px',fontSize:'0.95rem',boxShadow:'0 2px 8px #ffe082'}}>Assured</span>}
                {idx === 1 && <span className="deal-badge" style={{position:'absolute',top:10,right:10,background:'#ff7043',color:'#fff',fontWeight:700,padding:'4px 10px',borderRadius:'8px',fontSize:'0.95rem',boxShadow:'0 2px 8px #ffab91'}}>Best Seller</span>}
              </div>
              <div className="card-content" style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%' }}>
                <h3 className="product-name" style={{ fontSize: '1.22rem', fontWeight: 800, margin: '0 0 12px 0', minHeight: '32px', color: '#1a237e', letterSpacing: '0.7px', textShadow: '0 2px 8px #e3f0ff' }}>{product.name}</h3>
                <div className="product-price" style={{ fontSize: '1.22rem', color: '#1976d2', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.2px', textShadow: '0 2px 8px #e3f0ff' }}>
                  ${product.price} <span style={{fontSize:'0.95rem',color:'#43a047',fontWeight:600,marginLeft:8}}>Free Delivery</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', width: '100%', marginTop: 'auto' }}>
                <button 
                  className="add-to-cart-btn"
                  style={{ 
                    background: 'linear-gradient(90deg, #ff9900 0%, #ffb84d 100%)', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '14px', 
                    padding: '13px 0', 
                    cursor: 'pointer', 
                    fontWeight: 800, 
                    fontSize: '1.08rem', 
                    flex: 1, 
                    boxShadow: '0 4px 16px rgba(255, 152, 0, 0.13)',
                    transition: 'background 0.18s, box-shadow 0.18s, transform 0.13s',
                    letterSpacing: '0.7px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backdropFilter: 'blur(1.5px)'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(90deg, #ff7043 0%, #ffd740 100%)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(90deg, #ff9900 0%, #ffb84d 100%)'; e.currentTarget.style.transform = 'none'; }}
                  onClick={() => handleAddToCart(product)}
                >
                  <span role="img" aria-label="cart" style={{ fontSize: '1.25rem' }}>🛒</span>
                  <span>Add to Cart</span>
                </button>
                <button
                  className="ar-view-btn"
                  style={{ 
                    background: 'linear-gradient(90deg, #43a047 0%, #66bb6a 100%)', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '14px', 
                    padding: '13px 0', 
                    cursor: 'pointer', 
                    fontWeight: 800, 
                    fontSize: '1.08rem', 
                    flex: 1, 
                    boxShadow: '0 4px 16px rgba(67, 160, 71, 0.13)',
                    transition: 'background 0.18s, box-shadow 0.18s, transform 0.13s',
                    letterSpacing: '0.7px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backdropFilter: 'blur(1.5px)'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(90deg, #388e3c 0%, #81c784 100%)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(90deg, #43a047 0%, #66bb6a 100%)'; e.currentTarget.style.transform = 'none'; }}
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowAR(true);
                  }}
                  title="View in AR"
                >
                  <span role="img" aria-label="ar" style={{ fontSize: '1.25rem' }}>🕶️</span>
                  <span>View in AR</span>
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
      {/* Show WalmartLogin modal if showLogin is true */}
      {showLogin && (
        <div className="login-modal-overlay" style={{position:'fixed',top:0,left:0,right:0,bottom:0,zIndex:1000,background:'rgba(0,0,0,0.4)'}}>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
            <div style={{background:'#fff',borderRadius:'16px',boxShadow:'0 4px 32px rgba(0,0,0,0.18)',overflow:'hidden',position:'relative'}}>
              <button style={{position:'absolute',top:12,right:12,fontSize:'1.5rem',background:'none',border:'none',cursor:'pointer',zIndex:2}} onClick={()=>setShowLogin(false)} title="Close">×</button>
              <WalmartLogin onLogin={() => setShowLogin(false)} />
            </div>
          </div>
        </div>
      )}
      
      {/* Categories Navigation */}
      <CategoriesNav />
      
      {/* Main Content */}
      <main className="main-content">
        {currentView === 'home' && (
          <>
            {/* Hero Banner Section */}
            <HeroSection />
            
            {/* Restore original homepage layout after HeroSection */}
            <FeaturedSection />
            <WalmartLiveDeals 
              onAddToCart={handleAddToCart}
            />
            <ModernFooter />
          </>
        )}
        
        {currentView === 'products' && (
          <>
            {/* Category-based Product Display */}
            <CategoryProductDisplay
              selectedCategory={selectedCategory}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              onCategoryChange={setSelectedCategory}
            />
            
            {/* Modern Footer */}
            <ModernFooter />
          </>
        )}
        
        {/* Floating Action Button - positioned within main content */}
        <button 
          className="floating-action-btn"
          onClick={() => setShowChatbot(true)}
          title="AI Assistant"
        >
          🤖
        </button>
      </main>

      {/* All modals and overlays should be positioned absolutely and not affect layout */}
      
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
        />
      )}

      {/* Checkout Process */}
      {showCheckout && (
        <CheckoutProcess
          cartItems={cartItems}
          total={getTotalPrice()}
          onOrderComplete={(orderData) => {
            // Remove setPurchaseHistory, as purchase history is not tracked in the original version
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
          onClose={() => {
            setShowSocialShare(false);
            setProductToShare(null);
          }}
        />
      )}

      {/* Live Tracking */}
      {showLiveTracking && (
        <LiveTracking
          orderId={selectedOrderId}
          onClose={() => {
            setShowLiveTracking(false);
            setSelectedOrderId(null);
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
          onJoinGroup={(groupId) => {
            console.log('Joined group:', groupId);
          }}
          onCreateGroup={(groupData) => {
            console.log('Created group:', groupData);
          }}
          onClose={() => setShowGroupBuying(false)}
        />
      )}

    </div>
  );
}

export default ModernShoppingApp;
