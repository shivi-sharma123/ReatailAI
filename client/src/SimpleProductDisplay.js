import React, { useState, useEffect } from 'react';
import './SimpleProductDisplay.css';

const SimpleProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [backendConnected, setBackendConnected] = useState(false);
  const [arMode, setArMode] = useState(false);
  const [productRotation, setProductRotation] = useState(0);
  const [productScale, setProductScale] = useState(1);

  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Red', hex: '#FF0000' },
    { name: 'Blue', hex: '#0066CC' },
    { name: 'Navy', hex: '#001f3f' },
    { name: 'Gray', hex: '#808080' },
    { name: 'Green', hex: '#2ECC40' },
    { name: 'Purple', hex: '#B10DC9' }
  ];
  
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Enable AR for ALL products, not just AR-enabled ones
          const allProducts = data.products.map(product => ({
            ...product,
            ar_enabled: true // Force AR for all products
          }));
          setProducts(allProducts);
          setBackendConnected(true);
          if (allProducts.length > 0) {
            setSelectedProduct(allProducts[0]);
          }
        }
      }
    } catch (error) {
      console.error('Backend connection failed:', error);
      setBackendConnected(false);
      // Enhanced fallback products with high-quality images
      const fallbackProducts = [
        {
          id: 1,
          name: "Nike Air Max 270",
          price: 150,
          description: "Revolutionary Air Max 270 with AR try-on technology",
          emoji: "👟",
          brand: "Nike",
          image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
          ar_enabled: true
        },
        {
          id: 2,
          name: "Apple Watch Series 9",
          price: 399,
          description: "Latest smartwatch with AR fitting capabilities",
          emoji: "⌚",
          brand: "Apple",
          image_url: "https://images.unsplash.com/photo-1434493651358-e8b4862b43d4?w=400&h=400&fit=crop",
          ar_enabled: true
        },
        {
          id: 3,
          name: "Designer Sunglasses",
          price: 299,
          description: "Premium sunglasses with AR virtual try-on",
          emoji: "🕶️",
          brand: "Ray-Ban",
          image_url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
          ar_enabled: true
        },
        {
          id: 4,
          name: "Smart Fitness Tracker",
          price: 199,
          description: "Advanced fitness tracker with AR size fitting",
          emoji: "🏃",
          brand: "Fitbit",
          image_url: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop",
          ar_enabled: true
        },
        {
          id: 5,
          name: "Wireless Headphones",
          price: 249,
          description: "Premium headphones with AR positioning guide",
          emoji: "🎧",
          brand: "Sony",
          image_url: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
          ar_enabled: true
        }
      ];
      setProducts(fallbackProducts);
      setSelectedProduct(fallbackProducts[0]);
    }
    setLoading(false);
  };

  const tryAR = () => {
    setArMode(true);
    // Enhanced AR experience simulation
    setTimeout(() => {
      alert(`🎯 AR Experience Activated!\n\n📱 Product: ${selectedProduct.name}\n🎨 Color: ${selectedColor}\n📏 Size: ${selectedSize}\n\n✨ Features Available:\n• 360° Rotation\n• Color Customization\n• Size Visualization\n• Real-time Lighting\n\n👆 Use controls below to customize!`);
    }, 500);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.name);
    // Simulate color change effect
    if (arMode) {
      alert(`🎨 Color changed to ${color.name}! The product now appears in ${color.name.toLowerCase()} in your AR view.`);
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    // Adjust scale based on size
    const sizeScales = { 'XS': 0.8, 'S': 0.9, 'M': 1.0, 'L': 1.1, 'XL': 1.2, 'XXL': 1.3 };
    setProductScale(sizeScales[size] || 1.0);
    
    if (arMode) {
      alert(`📏 Size changed to ${size}! The product is now scaled appropriately in your AR view.`);
    }
  };

  const rotateProduct = (direction) => {
    const newRotation = direction === 'left' ? productRotation - 45 : productRotation + 45;
    setProductRotation(newRotation);
  };

  const resetAR = () => {
    setArMode(false);
    setProductRotation(0);
    setProductScale(1);
    setSelectedColor('Black');
    setSelectedSize('M');
  };

  // Helper function to get color hue for filter effect
  const getColorHue = (colorName) => {
    const colorHues = {
      'Red': 0,
      'Blue': 240,
      'Green': 120,
      'Purple': 280,
      'Navy': 220,
      'Gray': 0,
      'White': 0,
      'Black': 0
    };
    return colorHues[colorName] || 0;
  };

  if (loading) {
    return (
      <div className="simple-display">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading AR products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="simple-display">
      <div className="display-header">
        <h2>🛍️ AR Shopping Experience</h2>
        <div className={`connection-badge ${backendConnected ? 'connected' : 'offline'}`}>
          {backendConnected ? '🟢 Connected to Database' : '🔴 Offline Mode'}
        </div>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <div 
            key={product.id}
            className={`product-item ${selectedProduct?.id === product.id ? 'selected' : ''}`}
            onClick={() => setSelectedProduct(product)}
          >
            <img src={product.image_url} alt={product.name} />
            <div className="product-info">
              <span className="emoji">{product.emoji}</span>
              <h3>{product.name}</h3>
              <p className="price">${product.price}</p>
              <span className="brand">{product.brand}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="ar-controls">
          <div className="product-showcase">
            <div className="ar-viewer">
              <img 
                src={selectedProduct.image_url} 
                alt={selectedProduct.name}
                className={`main-image ${arMode ? 'ar-active' : ''}`}
                style={{
                  transform: `rotate(${productRotation}deg) scale(${productScale})`,
                  filter: selectedColor !== 'Black' ? `hue-rotate(${getColorHue(selectedColor)}deg)` : 'none',
                  transition: 'all 0.3s ease'
                }}
              />
              {arMode && (
                <div className="ar-overlay">
                  <div className="ar-info">
                    <span className="ar-badge">🎯 AR MODE</span>
                    <span className="ar-details">{selectedColor} • {selectedSize}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="product-details">
              <h3>{selectedProduct.name}</h3>
              <p>{selectedProduct.description}</p>
              <div className="price-brand">
                <span className="price">${selectedProduct.price}</span>
                <span className="brand">{selectedProduct.brand}</span>
              </div>
            </div>
          </div>

          <div className="customization-panel">
            {/* Color Selection */}
            <div className="control-group">
              <h4>🎨 Colors</h4>
              <div className="color-options">
                {colors.map(color => (
                  <button
                    key={color.name}
                    className={`color-btn ${selectedColor === color.name ? 'selected' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => handleColorChange(color)}
                    title={color.name}
                  >
                    {selectedColor === color.name && '✓'}
                  </button>
                ))}
              </div>
              <span className="selected-option">Selected: {selectedColor}</span>
            </div>

            {/* Size Selection */}
            <div className="control-group">
              <h4>📏 Sizes</h4>
              <div className="size-options">
                {sizes.map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => handleSizeChange(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <span className="selected-option">Selected: {selectedSize}</span>
            </div>

            {/* AR Controls */}
            <div className="control-group">
              <h4>📱 AR Controls</h4>
              <div className="ar-buttons">
                <button 
                  className={`ar-btn ${arMode ? 'active' : ''}`}
                  onClick={tryAR}
                >
                  {arMode ? '🎯 AR Active' : '📱 Start AR'}
                </button>
                
                {arMode && (
                  <>
                    <button className="rotate-btn" onClick={() => rotateProduct('left')}>
                      ↺ Rotate Left
                    </button>
                    <button className="rotate-btn" onClick={() => rotateProduct('right')}>
                      ↻ Rotate Right
                    </button>
                    <button className="reset-btn" onClick={resetAR}>
                      🔄 Reset
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Product Stats */}
            <div className="control-group">
              <h4>📊 Product Info</h4>
              <div className="product-stats">
                <div className="stat">
                  <span className="stat-label">Scale:</span>
                  <span className="stat-value">{(productScale * 100).toFixed(0)}%</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Rotation:</span>
                  <span className="stat-value">{productRotation}°</span>
                </div>
                <div className="stat">
                  <span className="stat-label">AR Status:</span>
                  <span className="stat-value">{arMode ? '🟢 Active' : '🔴 Inactive'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleProductDisplay;
