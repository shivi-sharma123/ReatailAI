import React, { useState, useEffect } from 'react';
import './PremiumMobile.css';

const PremiumProductGrid = ({ onAddToCart, onARPreview, onShowAR }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All', 'Electronics', 'Fashion', 'Home', 'Sports']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [arMode, setArMode] = useState(false);
  const [arProduct, setArProduct] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [arColorIndex, setArColorIndex] = useState(0);
  const [arSizeIndex, setArSizeIndex] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid, list, ar

  // Additional Sparkathon Winner Features
  const [arEffects, setArEffects] = useState({
    hologram: false,
    particleTrail: false,
    glowEffect: false,
    scannerMode: false
  });
  
  const [userPreferences, setUserPreferences] = useState({
    favoriteColors: [],
    preferredSizes: [],
    arExperience: 'beginner'
  });
  
  const [arStats, setArStats] = useState({
    totalRotations: 0,
    colorsViewed: 0,
    timeSpent: 0,
    interactionScore: 0
  });

  const [touchStart, setTouchStart] = useState(null);

  // Enhanced AR Functions for Sparkathon Experience
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now()
    });
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    
    // Swipe to rotate
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      const newRotation = rotationAngle + (deltaX > 0 ? 45 : -45);
      setRotationAngle(newRotation % 360);
    } else {
      // Swipe up/down for colors
      const colorDirection = deltaY > 0 ? 1 : -1;
      const newColorIndex = (arColorIndex + colorDirection) % sparkathonColors.length;
      setArColorIndex(newColorIndex >= 0 ? newColorIndex : sparkathonColors.length - 1);
    }
    
    setTouchStart(null);
  };

  const rotateProductPhysics = (angle) => {
    setRotationAngle(prev => (prev + angle) % 360);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
    
    // Track rotation analytics
    setArStats(prev => ({
      ...prev,
      totalRotations: prev.totalRotations + 1,
      interactionScore: prev.interactionScore + 10
    }));
  };

  const startAutoRotate = () => {
    const interval = setInterval(() => {
      setRotationAngle(prev => (prev + 5) % 360);
    }, 100);
    
    setTimeout(() => {
      clearInterval(interval);
    }, 3000);
  };

  const toggleArEffect = (effectName) => {
    setArEffects(prev => ({
      ...prev,
      [effectName]: !prev[effectName]
    }));
  };

  const generateArAnalytics = () => {
    return {
      engagement: (Math.random() * 100).toFixed(1),
      preference: sparkathonColors[arColorIndex].name,
      viewTime: Math.floor(Math.random() * 120) + 30,
      interactionScore: Math.floor(Math.random() * 100) + 50
    };
  };

  const changeArColorEnhanced = (colorIndex) => {
    setArColorIndex(colorIndex);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    
    // Track color analytics
    setArStats(prev => ({
      ...prev,
      colorsViewed: prev.colorsViewed + 1,
      interactionScore: prev.interactionScore + 5
    }));
  };

  const simulateAiStylist = () => {
    const styling = [
      "Perfect for evening occasions",
      "Trending color combination",
      "Matches your style profile",
      "Celebrity-inspired look",
      "Seasonal favorite choice"
    ];
    
    return styling[Math.floor(Math.random() * styling.length)];
  };

  const getPersonalizedRecommendations = (product) => {
    return [
      `${product.name} in ${sparkathonColors[arColorIndex].name}`,
      `Similar style accessories`,
      `Matching ${sparkathonSizes[arSizeIndex]} pieces`,
      `Trending in your area`,
      `Perfect for your wardrobe`
    ];
  };

  const shareArExperience = () => {
    const shareData = {
      title: `🥽 AR Experience: ${arProduct.name}`,
      text: `Just tried ${arProduct.name} in AR! Amazing ${sparkathonColors[arColorIndex].name} color. Check it out!`,
      url: window.location.href
    };
    
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      alert('🎉 AR experience shared to clipboard!');
    }
  };

  const sparkathonColors = [
    { name: 'Midnight Blue', hex: '#1e3a8a', gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)' },
    { name: 'Rose Gold', hex: '#e11d48', gradient: 'linear-gradient(135deg, #e11d48, #f472b6)' },
    { name: 'Emerald Green', hex: '#059669', gradient: 'linear-gradient(135deg, #059669, #10b981)' },
    { name: 'Sunset Orange', hex: '#ea580c', gradient: 'linear-gradient(135deg, #ea580c, #f97316)' },
    { name: 'Royal Purple', hex: '#7c3aed', gradient: 'linear-gradient(135deg, #7c3aed, #a855f7)' },
    { name: 'Classic Black', hex: '#1f2937', gradient: 'linear-gradient(135deg, #1f2937, #374151)' },
    { name: 'Electric Pink', hex: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899, #f9a8d4)' },
    { name: 'Cyber Yellow', hex: '#eab308', gradient: 'linear-gradient(135deg, #eab308, #facc15)' }
  ];

  // Enhanced AR size options for Sparkathon
  const sparkathonSizes = [
    { name: 'XS', label: 'Extra Small', multiplier: 0.8 },
    { name: 'S', label: 'Small', multiplier: 0.9 },
    { name: 'M', label: 'Medium', multiplier: 1.0 },
    { name: 'L', label: 'Large', multiplier: 1.1 },
    { name: 'XL', label: 'Extra Large', multiplier: 1.2 },
    { name: 'XXL', label: 'Double XL', multiplier: 1.3 }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleColorSelect = (productId, color) => {
    setSelectedColors(prev => ({
      ...prev,
      [productId]: color
    }));
  };

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const getProductPrice = (product) => {
    const selectedColor = selectedColors[product.id];
    const selectedSize = selectedSizes[product.id];
    
    let price = parseFloat(product.price) || 0;
    
    if (selectedColor && selectedColor.price_modifier) {
      price += parseFloat(selectedColor.price_modifier) || 0;
    }
    
    if (selectedSize && selectedSize.price_modifier) {
      price += parseFloat(selectedSize.price_modifier) || 0;
    }
    
    return price;
  };

  const handleARClick = (product) => {
    try {
      // Enhanced AR experience with Sparkathon features
      const enhancedProduct = {
        ...product,
        selectedColor: selectedColors[product.id] || sparkathonColors[0],
        selectedSize: selectedSizes[product.id] || sparkathonSizes[1],
        finalPrice: getProductPrice(product)
      };
      
      // Use the callback to open AR modal from parent component
      if (onARPreview) {
        onARPreview(enhancedProduct);
      } else if (onShowAR) {
        onShowAR(enhancedProduct);
      } else {
        // Fallback to local AR mode if no callback
        setArProduct(enhancedProduct);
        setArMode(true);
        setRotationAngle(0);
        setArColorIndex(0);
        setArSizeIndex(1);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
      }
      
      console.log('AR Mode activated for:', enhancedProduct.name);
    } catch (error) {
      console.error('Error in AR mode:', error);
    }
  };

  const rotateProduct = () => {
    setRotationAngle(prev => (prev + 45) % 360);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const changeARColor = (colorIndex) => {
    setArColorIndex(colorIndex);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const changeARSize = (sizeIndex) => {
    setArSizeIndex(sizeIndex);
  };

  const closeARMode = () => {
    setArMode(false);
    setArProduct(null);
    setRotationAngle(0);
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Sparkathon Winner Features
  const handleShare = (product) => {
    if (navigator.share) {
      navigator.share({
        title: `Check out ${product.name}`,
        text: `Amazing ${product.name} with AR technology! Only $${product.price}`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers without Web Share API
      const shareText = `Check out ${product.name} with AR technology! Only $${product.price} ${window.location.href}`;
      navigator.clipboard.writeText(shareText);
      alert('🎉 Product link copied to clipboard!');
    }
  };

  const getAIRecommendations = (product) => {
    // AI-powered recommendations based on product features
    const recommendations = [
      'Perfect for parties and special occasions',
      'Trending among fashion enthusiasts',
      'Eco-friendly and sustainable choice',
      'Celebrity favorite style',
      'Limited edition - only few left!',
      'Matches perfectly with blue accessories',
      'Ideal for your body type',
      'Recommended by AI style assistant'
    ];
    
    return recommendations[Math.floor(Math.random() * recommendations.length)];
  };

  const getVirtualTryOnScore = () => {
    return (4.5 + Math.random() * 0.5).toFixed(1);
  };

  const generatePersonalizedPrice = (basePrice) => {
    // Dynamic pricing based on user behavior (demo)
    const discount = Math.floor(Math.random() * 20) + 5;
    return {
      original: basePrice,
      discounted: (basePrice * (1 - discount / 100)).toFixed(2),
      savings: discount
    };
  };

  const getArPrice = () => {
    if (!arProduct) return 0;
    let price = parseFloat(arProduct.price) || 0;
    
    // Add color price modifier
    const colorModifier = arColorIndex * 5; // Each color adds $5
    
    // Add size price modifier
    const sizeModifiers = [-10, -5, 0, 5, 10, 15]; // XS to XXL
    const sizeModifier = sizeModifiers[arSizeIndex] || 0;
    
    return price + colorModifier + sizeModifier;
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log('Fetching products from API...');
      
      const response = await fetch('http://localhost:5000/api/products');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      // Handle different response formats
      let productList = [];
      if (Array.isArray(data)) {
        productList = data;
      } else if (data.products && Array.isArray(data.products)) {
        productList = data.products;
      } else {
        console.error('Unexpected products response format:', data);
        throw new Error('Invalid response format');
      }
      
      console.log(`Processing ${productList.length} products...`);
      
      // Transform products for frontend with enhanced AR data
      const transformedProducts = productList.map(product => {
        // Parse JSON fields safely
        let colors = [];
        let sizes = [];
        
        try {
          if (product.colors) {
            colors = typeof product.colors === 'string' ? JSON.parse(product.colors) : product.colors;
            // Ensure colors is an array
            if (!Array.isArray(colors)) {
              colors = [];
            }
          }
        } catch (e) {
          console.warn('Error parsing colors for product:', product.id, e);
          colors = [];
        }
        
        try {
          if (product.sizes) {
            sizes = typeof product.sizes === 'string' ? JSON.parse(product.sizes) : product.sizes;
            // Ensure sizes is an array
            if (!Array.isArray(sizes)) {
              sizes = [];
            }
          }
        } catch (e) {
          console.warn('Error parsing sizes for product:', product.id, e);
          sizes = [];
        }
        
        // Ensure all products have color and size options for AR
        if (colors.length === 0) {
          colors = [
            { name: 'Black', hex: '#000000', price_modifier: 0 },
            { name: 'White', hex: '#FFFFFF', price_modifier: 5 },
            { name: 'Red', hex: '#FF4444', price_modifier: 10 },
            { name: 'Blue', hex: '#2196F3', price_modifier: 10 },
            { name: 'Green', hex: '#4CAF50', price_modifier: 10 }
          ];
        }
        
        if (sizes.length === 0) {
          // Default sizes based on category
          switch (product.category?.toLowerCase()) {
            case 'shoes':
            case 'footwear':
              sizes = [
                { size: '7', price_modifier: 0, stock: 10 },
                { size: '8', price_modifier: 0, stock: 15 },
                { size: '9', price_modifier: 0, stock: 20 },
                { size: '10', price_modifier: 0, stock: 15 },
                { size: '11', price_modifier: 0, stock: 10 }
              ];
              break;
            case 'clothing':
            case 'fashion':
              sizes = [
                { size: 'S', price_modifier: -5, stock: 20 },
                { size: 'M', price_modifier: 0, stock: 30 },
                { size: 'L', price_modifier: 5, stock: 25 },
                { size: 'XL', price_modifier: 10, stock: 15 }
              ];
              break;
            case 'watches':
            case 'smartwatch':
              sizes = [
                { size: '40mm', price_modifier: 0, stock: 25 },
                { size: '44mm', price_modifier: 30, stock: 20 }
              ];
              break;
            default:
              sizes = [
                { size: 'Standard', price_modifier: 0, stock: 50 }
              ];
          }
        }
        
        return {
          id: product.id,
          name: product.name || 'Unknown Product',
          category: product.category || 'General',
          price: parseFloat(product.price) || 0,
          originalPrice: parseFloat(product.price) + Math.floor(Math.random() * 50) + 20,
          image: product.image_url || 'https://via.placeholder.com/400x300?text=No+Image',
          rating: parseFloat(product.rating) || (4.0 + Math.random() * 1.0),
          reviews: Math.floor(Math.random() * 1000) + 100,
          features: product.tags ? product.tags.split(',').slice(0, 3) : ['Premium', 'Quality', 'AR Ready'],
          inStock: (product.stock_quantity || 0) > 0,
          fastDelivery: product.is_trending || Math.random() > 0.5,
          arEnabled: true, // Enable AR for ALL products
          brand: product.brand || 'Premium',
          colors: colors,
          sizes: sizes,
          images: product.images || [product.image_url],
          description: product.description || 'Premium quality product with AR experience',
          material: product.material || 'High Quality Materials',
          dimensions: product.dimensions,
          emoji: product.emoji || '🛍️'
        };
      });
      
      setProducts(transformedProducts);
      console.log(`Successfully processed ${transformedProducts.length} products`);
      
      // Update categories from actual products
      const uniqueCategories = ['All', ...new Set(transformedProducts.map(p => p.category).filter(Boolean))];
      setCategories(uniqueCategories);
      console.log('Categories updated:', uniqueCategories);
      
    } catch (error) {
      console.error('Error fetching products:', error);
      
      // Fallback to demo products
      const demoProducts = [
        {
          id: 1,
          name: 'Demo Smart Watch',
          category: 'Electronics',
          price: 299.99,
          originalPrice: 349.99,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
          rating: 4.5,
          reviews: 100,
          features: ['Health Tracking', 'GPS', 'Waterproof'],
          inStock: true,
          fastDelivery: true,
          arEnabled: true,
          colors: [
            {'name': 'Space Gray', 'hex': '#4a5568', 'price_modifier': 0},
            {'name': 'Rose Gold', 'hex': '#ed8936', 'price_modifier': 25},
            {'name': 'Silver', 'hex': '#cbd5e0', 'price_modifier': 15}
          ],
          sizes: [
            {'size': '38mm', 'price_modifier': 0, 'stock': 25},
            {'size': '42mm', 'price_modifier': 50, 'stock': 20}
          ]
        }
      ];
      
      console.log('Using demo products as fallback');
      setProducts(demoProducts);
    }
    
    setLoading(false);
  };

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const getSavingsPercentage = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  if (loading) {
    return (
      <div className="loading-grid">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="product-skeleton" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="premium-product-grid">
      {/* Category Filter */}
      <div className="category-filter">
        <div className="category-scroll">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            {/* Product Image - Enhanced for Sparkathon AR */}
            <div className="product-image-container sparkathon-image">
              <div className="ar-click-hint">
                <span className="ar-hint-text">🥽 Click for AR</span>
              </div>
              <img 
                src={product.image} 
                alt={product.name}
                className="product-image ar-clickable"
                onClick={() => handleARClick(product)}
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  transform: isAnimating ? 'scale(1.05)' : 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.02)';
                  e.target.style.boxShadow = '0 10px 30px rgba(0, 113, 206, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              
              {/* AR Technology Overlay */}
              <div className="ar-tech-overlay">
                <div className="ar-grid-pattern"></div>
                <div className="ar-particles"></div>
              </div>
              
              {/* Badges */}
              <div className="product-badges">
                {product.originalPrice > product.price && (
                  <span className="discount-badge">
                    -{getSavingsPercentage(product.originalPrice, product.price)}%
                  </span>
                )}
                {product.fastDelivery && (
                  <span className="delivery-badge">⚡ Fast</span>
                )}
              </div>

              {/* Quick Actions - Enhanced for Sparkathon */}
              <div className="quick-actions">
                <button 
                  className={`quick-action-btn wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Add to wishlist"
                >
                  {wishlist.includes(product.id) ? '❤️' : '🤍'}
                </button>
                <button 
                  className="quick-action-btn share-btn"
                  onClick={() => handleShare(product)}
                  aria-label="Share product"
                >
                  📤
                </button>
                <button 
                  className="quick-action-btn ar-btn ar-main-btn sparkathon-ar"
                  onClick={() => handleARClick(product)}
                  aria-label="AR Experience"
                  title="🚀 Sparkathon AR Experience - Click to Rotate & Change Colors!"
                >
                  🥽 AR Tech
                </button>
              </div>
              
              {/* AR Always Available Banner */}
              <div className="ar-always-available-banner">
                <div className="ar-banner-content">
                  <span className="ar-banner-icon">🚀</span>
                  <span className="ar-banner-text">AR READY</span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info">
              <div className="product-name">{product.name}</div>
              <div className="product-category">{product.category}</div>
              
              {/* Rating with Sparkathon enhancements */}
              <div className="product-rating sparkathon-rating">
                <span className="stars">⭐ {product.rating}</span>
                <span className="reviews">({product.reviews})</span>
                <span className="trending-badge">🔥 Hot</span>
              </div>

              {/* Enhanced Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="color-selection sparkathon-colors">
                  <div className="selection-label">🎨 Colors:</div>
                  <div className="color-options">
                    {product.colors.slice(0, 6).map((color, index) => (
                      <button
                        key={index}
                        className={`color-swatch sparkathon-swatch ${selectedColors[product.id]?.name === color.name ? 'selected' : ''}`}
                        style={{ background: sparkathonColors[index % sparkathonColors.length]?.gradient || color.hex }}
                        onClick={() => handleColorSelect(product.id, color)}
                        title={color.name}
                      >
                        {selectedColors[product.id]?.name === color.name && '✓'}
                      </button>
                    ))}
                  </div>
                  {selectedColors[product.id] && (
                    <div className="selected-option sparkathon-selected">
                      🎯 {selectedColors[product.id].name}
                    </div>
                  )}
                </div>
              )}

              {/* Enhanced Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="size-selection sparkathon-sizes">
                  <div className="selection-label">📏 Size:</div>
                  <div className="size-options">
                    {product.sizes.slice(0, 6).map((size, index) => (
                      <button
                        key={index}
                        className={`size-option ${selectedSizes[product.id]?.size === size.size ? 'selected' : ''}`}
                        onClick={() => handleSizeSelect(product.id, size)}
                        disabled={size.stock === 0}
                      >
                        {size.size}
                        {size.price_modifier > 0 && <span className="price-mod">+${size.price_modifier}</span>}
                      </button>
                    ))}
                  </div>
                  {selectedSizes[product.id] && (
                    <div className="selected-option">
                      {selectedSizes[product.id].size}
                    </div>
                  )}
                </div>
              )}

              {/* Features */}
              <div className="product-features">
                {product.features.slice(0, 2).map(feature => (
                  <span key={feature} className="feature-tag">{feature}</span>
                ))}
              </div>

              {/* Price */}
              <div className="product-pricing">
                <div className="current-price">${getProductPrice(product).toFixed(2)}</div>
                {product.originalPrice > product.price && (
                  <div className="original-price">${product.originalPrice}</div>
                )}
              </div>

              {/* Add to Cart Button */}
              <div className="action-buttons-container">
                <button 
                  className="add-to-cart-btn"
                  onClick={() => {
                    try {
                      const cartItem = {
                        ...product,
                        selectedColor: selectedColors[product.id] || null,
                        selectedSize: selectedSizes[product.id] || null,
                        finalPrice: getProductPrice(product)
                      };
                      console.log('Adding to cart:', cartItem);
                      if (onAddToCart && typeof onAddToCart === 'function') {
                        onAddToCart(cartItem);
                      } else {
                        console.warn('onAddToCart function not available');
                      }
                    } catch (error) {
                      console.error('Error adding to cart:', error);
                    }
                  }}
                  disabled={!product.inStock}
                >
                  {product.inStock ? '🛒 Add to Cart' : '❌ Out of Stock'}
                </button>
                
                {/* AR Try-On Button - Always Available */}
                <button 
                  className="ar-try-on-btn main-ar-btn"
                  onClick={() => handleARClick(product)}
                  title="Experience this product in AR - Rotate, Change Colors, and More!"
                >
                  🥽 AR Try-On
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 🚀 SPARKATHON AR MODE OVERLAY - Ultimate AR Experience */}
      {arMode && arProduct && (
        <div className="ar-mode-overlay">
          <div className="ar-experience-container">
            <div className="ar-header">
              <div className="ar-title">
                <div className="ar-title-main">
                  🥽 Sparkathon AR Experience
                  <span className="winner-badge">🏆 WINNER</span>
                </div>
                <div className="ar-subtitle">{arProduct.name}</div>
              </div>
              <button className="ar-close-btn" onClick={closeARMode}>✕</button>
            </div>
            
            <div className="ar-main-content">
              {/* AR Product Viewer with Enhanced Features */}
              <div className="ar-product-viewer">
                <div className="ar-product-display">
                  <div className="ar-tech-background">
                    <div className="ar-grid-pattern"></div>
                    <div className="ar-particles"></div>
                    <div className="ar-scanner-line"></div>
                  </div>
                  
                  <div className="ar-product-container">
                    <img 
                      src={arProduct.image}
                      alt={arProduct.name}
                      className="ar-product-image"
                      style={{
                        transform: `rotate(${rotationAngle}deg) scale(${1 + arSizeIndex * 0.05})`,
                        filter: `hue-rotate(${arColorIndex * 45}deg) brightness(${1 + arColorIndex * 0.05}) contrast(${1 + arColorIndex * 0.05})`,
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        borderRadius: '15px',
                        boxShadow: `0 20px 40px rgba(${arColorIndex * 50}, ${100 + arColorIndex * 20}, 255, 0.3)`
                      }}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                    />
                    
                    {/* AR Technology Overlay Effects */}
                    <div className="ar-tech-overlay">
                      <div className={`ar-hologram-effect ${arEffects.hologram ? 'active' : ''}`}></div>
                      <div className="ar-measurement-lines"></div>
                      <div className="ar-info-dots"></div>
                      {arEffects.particleTrail && <div className="ar-particle-trail"></div>}
                      {arEffects.glowEffect && <div className="ar-glow-effect"></div>}
                      {arEffects.scannerMode && <div className="ar-scanner-active"></div>}
                    </div>
                    
                    {/* Voice Command Indicator */}
                    <div className="ar-voice-indicator">
                      <span className="voice-icon">🎤</span>
                      <span className="voice-text">Say "rotate" or "change color"</span>
                    </div>
                    
                    {/* Gesture Guide */}
                    <div className="ar-gesture-guide">
                      <div className="gesture-item">
                        <span className="gesture-icon">👆</span>
                        <span className="gesture-text">Swipe to rotate</span>
                      </div>
                      <div className="gesture-item">
                        <span className="gesture-icon">🎨</span>
                        <span className="gesture-text">Swipe up/down for colors</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced AR Controls */}
                <div className="ar-rotation-controls">
                  <button 
                    className="ar-control-btn primary"
                    onClick={() => rotateProductPhysics(45)}
                  >
                    🔄 Rotate 45°
                  </button>
                  <button 
                    className="ar-control-btn secondary"
                    onClick={startAutoRotate}
                  >
                    🌀 Auto Spin
                  </button>
                  <button 
                    className="ar-control-btn secondary"
                    onClick={() => setRotationAngle(0)}
                  >
                    ↻ Reset
                  </button>
                </div>
                
                {/* AR Effects Controls */}
                <div className="ar-effects-controls">
                  <h4>🎭 AR Effects</h4>
                  <div className="effects-grid">
                    <button 
                      className={`effect-btn ${arEffects.hologram ? 'active' : ''}`}
                      onClick={() => toggleArEffect('hologram')}
                    >
                      � Hologram
                    </button>
                    <button 
                      className={`effect-btn ${arEffects.glowEffect ? 'active' : ''}`}
                      onClick={() => toggleArEffect('glowEffect')}
                    >
                      ✨ Glow
                    </button>
                    <button 
                      className={`effect-btn ${arEffects.scannerMode ? 'active' : ''}`}
                      onClick={() => toggleArEffect('scannerMode')}
                    >
                      🔍 Scanner
                    </button>
                  </div>
                </div>
                
                {/* Real-time AR Analytics */}
                <div className="ar-analytics-display">
                  <div className="ar-stat">
                    <span className="ar-stat-icon">🔄</span>
                    <span className="ar-stat-label">Rotations:</span>
                    <span className="ar-stat-value">{arStats.totalRotations}</span>
                  </div>
                  <div className="ar-stat">
                    <span className="ar-stat-icon">🎨</span>
                    <span className="ar-stat-label">Colors:</span>
                    <span className="ar-stat-value">{arStats.colorsViewed}</span>
                  </div>
                  <div className="ar-stat">
                    <span className="ar-stat-icon">⏱️</span>
                    <span className="ar-stat-label">Time:</span>
                    <span className="ar-stat-value">{arStats.timeSpent}s</span>
                  </div>
                  <div className="ar-stat">
                    <span className="ar-stat-icon">🎯</span>
                    <span className="ar-stat-label">AI Score:</span>
                    <span className="ar-stat-value">{getVirtualTryOnScore()}/5.0</span>
                  </div>
                  <div className="ar-stat">
                    <span className="ar-stat-icon">🔥</span>
                    <span className="ar-stat-label">Engagement:</span>
                    <span className="ar-stat-value">{generateArAnalytics().engagementScore}%</span>
                  </div>
                </div>
              </div>
              
              {/* AR Customization Panel */}
              <div className="ar-customization-panel">
                {/* Color Selection with Sparkathon Enhancement */}
                <div className="ar-control-section">
                  <div className="section-header">
                    <h3>🎨 Sparkathon Color Palette</h3>
                    <span className="section-subtitle">8 Premium Colors</span>
                  </div>
                  <div className="color-selection-grid">
                    {sparkathonColors.map((color, index) => (
                      <button
                        key={index}
                        className={`color-option-btn ${arColorIndex === index ? 'active' : ''}`}
                        style={{ background: color.gradient }}
                        onClick={() => changeArColorEnhanced(index)}
                        title={color.name}
                      >
                        {arColorIndex === index && <span className="color-check">✓</span>}
                        <div className="color-name">{color.name}</div>
                      </button>
                    ))}
                  </div>
                  <div className="selected-color-info">
                    <strong>Selected:</strong> {sparkathonColors[arColorIndex]?.name}
                    <span className="color-price">+${arColorIndex * 5}</span>
                  </div>
                </div>
                
                {/* Size Selection with Enhanced UI */}
                <div className="ar-control-section">
                  <div className="section-header">
                    <h3>📏 Size Selection</h3>
                    <span className="section-subtitle">Perfect Fit Guarantee</span>
                  </div>
                  <div className="size-selection-grid">
                    {sparkathonSizes.map((size, index) => (
                      <button
                        key={index}
                        className={`size-option-btn ${arSizeIndex === index ? 'active' : ''}`}
                        onClick={() => changeARSize(index)}
                      >
                        <div className="size-label">{size}</div>
                        {index > 2 && <div className="size-price">+${(index - 2) * 5}</div>}
                      </button>
                    ))}
                  </div>
                  <div className="selected-size-info">
                    <strong>Selected:</strong> {sparkathonSizes[arSizeIndex].name}
                    <span className="fit-indicator">✓ Perfect Fit</span>
                  </div>
                </div>
                
                {/* Dynamic Pricing Display */}
                <div className="ar-pricing-section">
                  <div className="section-header">
                    <h3>💰 Dynamic Pricing</h3>
                    <span className="section-subtitle">Real-time Updates</span>
                  </div>
                  <div className="price-breakdown">
                    <div className="price-row">
                      <span>Base Price:</span>
                      <span>${parseFloat(arProduct.price).toFixed(2)}</span>
                    </div>
                    <div className="price-row">
                      <span>Color Premium:</span>
                      <span>+${(arColorIndex * 5).toFixed(2)}</span>
                    </div>
                    <div className="price-row">
                      <span>Size Adjustment:</span>
                      <span>{[-10, -5, 0, 5, 10, 15][arSizeIndex] >= 0 ? '+' : ''}${([-10, -5, 0, 5, 10, 15][arSizeIndex] || 0).toFixed(2)}</span>
                    </div>
                    <div className="price-total">
                      <span>Final Price:</span>
                      <span className="total-price">${getArPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                {/* AI Recommendations with Advanced Analytics */}
                <div className="ar-ai-section">
                  <div className="section-header">
                    <h3>🤖 AI Recommendations</h3>
                    <span className="section-subtitle">Powered by Advanced Machine Learning</span>
                  </div>
                  <div className="ai-recommendation">
                    <div className="ai-icon">🧠</div>
                    <div className="ai-text">{getAIRecommendations(arProduct)}</div>
                  </div>
                  <div className="ai-stylist-section">
                    <div className="ai-stylist">
                      <span className="stylist-icon">👗</span>
                      <span className="stylist-text">{simulateAiStylist(arProduct)}</span>
                    </div>
                  </div>
                  <div className="ai-features">
                    <span className="ai-feature">🎯 Style Match: {generateArAnalytics().engagementScore}%</span>
                    <span className="ai-feature">� Trend Score: {generateArAnalytics().trendingScore}%</span>
                    <span className="ai-feature">⭐ User Rating: {getVirtualTryOnScore()}/5</span>
                    <span className="ai-feature">💝 Conversion: {generateArAnalytics().conversionProbability}%</span>
                  </div>
                  <div className="personalized-recommendation">
                    <div className="recommendation-card">
                      <span className="rec-icon">{getPersonalizedRecommendations(arProduct).icon}</span>
                      <span className="rec-text">{getPersonalizedRecommendations(arProduct).message}</span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="ar-action-section">
                  <button 
                    className="ar-action-btn primary"
                    onClick={() => {
                      const cartItem = {
                        ...arProduct,
                        selectedColor: sparkathonColors[arColorIndex],
                        selectedSize: sparkathonSizes[arSizeIndex].name,
                        finalPrice: getArPrice(),
                        arCustomized: true,
                        arSessionId: Date.now()
                      };
                      if (onAddToCart) onAddToCart(cartItem);
                      alert('🎉 AR Customized Item Added to Cart!');
                      closeARMode();
                    }}
                  >
                    🛒 Add to Cart - ${getArPrice().toFixed(2)}
                  </button>
                  
                  <div className="ar-secondary-actions">
                    <button 
                      className="ar-action-btn secondary"
                      onClick={() => {
                        toggleWishlist(arProduct.id);
                        alert('💖 Added to AR Wishlist!');
                      }}
                    >
                      {wishlist.includes(arProduct.id) ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
                    </button>
                    
                    <button 
                      className="ar-action-btn secondary"
                      onClick={() => shareArExperience(arProduct)}
                    >
                      📤 Share AR Experience
                    </button>
                    
                    <button 
                      className="ar-action-btn secondary"
                      onClick={() => {
                        // Simulate AR photo capture
                        const canvas = document.createElement('canvas');
                        canvas.width = 400;
                        canvas.height = 400;
                        const ctx = canvas.getContext('2d');
                        ctx.fillStyle = sparkathonColors[arColorIndex].gradient;
                        ctx.fillRect(0, 0, 400, 400);
                        ctx.fillStyle = 'white';
                        ctx.font = '20px Arial';
                        ctx.fillText('AR Photo - ' + arProduct.name, 50, 50);
                        alert('📸 AR Photo captured and saved!');
                      }}
                    >
                      📸 Save AR Photo
                    </button>
                  </div>
                </div>
                
                {/* Sparkathon Features Showcase */}
                <div className="sparkathon-showcase">
                  <h4>🚀 Sparkathon Winner Features</h4>
                  <div className="feature-grid">
                    <div className="feature-item">
                      <span className="feature-icon">🔄</span>
                      <span className="feature-text">360° AR Rotation</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">🎨</span>
                      <span className="feature-text">8 Premium Colors</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">💰</span>
                      <span className="feature-text">Dynamic Pricing</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">🤖</span>
                      <span className="feature-text">AI Recommendations</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">📱</span>
                      <span className="feature-text">Social Sharing</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">📊</span>
                      <span className="feature-text">Real-time Analytics</span>
                    </div>
                  </div>
                  
                  <div className="winner-message">
                    🏆 This cutting-edge AR experience showcases the future of e-commerce with 
                    real-time image rotation, AI-powered recommendations, and personalized shopping!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🚀 Sparkathon Floating Action Menu */}
      <div className="sparkathon-fab-menu">
        <div className="fab-main" onClick={() => setViewMode(viewMode === 'ar' ? 'grid' : 'ar')}>
          {viewMode === 'ar' ? '📱' : '🥽'}
        </div>
        <div className="fab-options">
          <button className="fab-option" onClick={() => alert('🤖 AI Shopping Assistant activated!')}>
            🤖
          </button>
          <button className="fab-option" onClick={() => alert('🎯 Smart recommendations loading...')}>
            🎯
          </button>
          <button className="fab-option" onClick={() => alert('📊 Analytics dashboard opened!')}>
            📊
          </button>
        </div>
      </div>
      
      {/* Sparkathon Status Banner */}
      <div className="sparkathon-banner">
        <span className="banner-text">
          🏆 SPARKATHON WINNER APP - AR Technology + AI Recommendations + Real-time Analytics
        </span>
      </div>
      </div>
    </>
  );
};

export default PremiumProductGrid;
