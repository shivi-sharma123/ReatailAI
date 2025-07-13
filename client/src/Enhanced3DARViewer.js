import React, { useState, useEffect, useRef } from 'react';
import './Enhanced3DARViewer.css';

const Enhanced3DARViewer = ({ product, isVisible, onClose, onAddToCart }) => {
  // Helper function to convert price to number
  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      // Remove dollar sign and commas, then parse
      return parseFloat(price.replace(/[$,]/g, '')) || 0;
    }
    return 0;
  };

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(parsePrice(product?.price) || 0);
  const [is3DMode, setIs3DMode] = useState(true);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [arMode, setArMode] = useState('view'); // 'view', 'try-on', 'room'
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  
  const viewerRef = useRef(null);
  const productRef = useRef(null);

  // Initialize default selections
  useEffect(() => {
    if (product) {
      // Set default color
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      
      // Set default size
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
        setCurrentPrice(parsePrice(product.price) + parseFloat(product.sizes[0].price_modifier || 0));
      } else {
        setCurrentPrice(parsePrice(product.price) || 0);
      }
      
      // Simulate loading time for 3D model
      setTimeout(() => setIsLoading(false), 1500);
    }
  }, [product]);

  // Update price when size changes
  useEffect(() => {
    if (product && selectedSize) {
      setCurrentPrice(parsePrice(product.price) + parseFloat(selectedSize.price_modifier || 0));
    }
  }, [selectedSize, product]);

  // Handle mouse interactions for 3D rotation
  const handleMouseDown = (e) => {
    if (is3DMode) {
      setIsDragging(true);
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && is3DMode) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;
      
      setRotation(prev => ({
        x: prev.x + deltaY * 0.5,
        y: prev.y + deltaX * 0.5
      }));
      
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle scroll for zoom
  const handleWheel = (e) => {
    e.preventDefault();
    if (is3DMode) {
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setScale(prev => Math.max(0.5, Math.min(3, prev + delta)));
    }
  };

  // Color change handler
  const handleColorChange = (color) => {
    setSelectedColor(color);
    // Add animation effect
    if (productRef.current) {
      productRef.current.style.filter = 'brightness(1.2)';
      setTimeout(() => {
        if (productRef.current) {
          productRef.current.style.filter = 'brightness(1)';
        }
      }, 200);
    }
  };

  // Size change handler
  const handleSizeChange = (size) => {
    setSelectedSize(size);
    // Add scale animation effect
    if (productRef.current) {
      productRef.current.style.transform += ' scale(1.1)';
      setTimeout(() => {
        if (productRef.current) {
          productRef.current.style.transform = productRef.current.style.transform.replace(' scale(1.1)', '');
        }
      }, 200);
    }
  };

  // Reset view
  const resetView = () => {
    setRotation({ x: 0, y: 0 });
    setScale(1);
  };

  // AR Mode handlers
  const handleTryOn = () => {
    setArMode('try-on');
    // Simulate camera access
    navigator.mediaDevices?.getUserMedia({ video: true })
      .then(stream => {
        // Handle camera stream for try-on
        console.log('Camera access granted for try-on');
      })
      .catch(err => {
        console.log('Camera access denied, using simulation');
      });
  };

  const handleRoomView = () => {
    setArMode('room');
  };

  if (!isVisible || !product) return null;

  return (
    <div className="enhanced-ar-overlay">
      <div className="ar-viewer-container">
        {/* Header */}
        <div className="ar-header">
          <div className="ar-title">
            <span className="ar-icon">🥽</span>
            <h2>AR Product Viewer</h2>
            <span className="ar-badge">3D Enhanced</span>
          </div>
          <button className="ar-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Main Content */}
        <div className="ar-content">
          {/* 3D Viewer Section */}
          <div className="ar-viewer-section">
            <div 
              className={`product-3d-viewer ${is3DMode ? 'mode-3d' : 'mode-2d'}`}
              ref={viewerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
            >
              {isLoading ? (
                <div className="ar-loading">
                  <div className="loading-3d">
                    <div className="loading-cube">
                      <div></div><div></div><div></div><div></div><div></div><div></div>
                    </div>
                    <p>Loading 3D Model...</p>
                  </div>
                </div>
              ) : (
                <div 
                  className="product-3d-model"
                  ref={productRef}
                  style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${scale})`,
                    filter: selectedColor ? `hue-rotate(${selectedColor.name === 'Red' ? '0deg' : selectedColor.name === 'Blue' ? '240deg' : selectedColor.name === 'Green' ? '120deg' : '0deg'})` : 'none'
                  }}
                >
                  <img 
                    src={selectedColor?.image || product.image_url} 
                    alt={product.name}
                    className="product-3d-image"
                  />
                  
                  {/* 3D Effect Layers */}
                  <div className="product-shadow"></div>
                  <div className="product-highlight"></div>
                  <div className="product-reflection"></div>
                  
                  {/* Size indicator */}
                  {selectedSize && (
                    <div className="size-indicator">
                      <span className="size-label">{selectedSize.name}</span>
                    </div>
                  )}
                </div>
              )}

              {/* AR Mode Overlays */}
              {arMode === 'try-on' && (
                <div className="try-on-overlay">
                  <div className="camera-feed-simulation">
                    <div className="face-outline"></div>
                    <p>Try-On Mode Active</p>
                  </div>
                </div>
              )}

              {arMode === 'room' && (
                <div className="room-view-overlay">
                  <div className="room-grid"></div>
                  <p>Room View Mode</p>
                </div>
              )}

              {/* Controls Overlay */}
              <div className="viewer-controls">
                <button 
                  className={`control-btn ${is3DMode ? 'active' : ''}`}
                  onClick={() => setIs3DMode(!is3DMode)}
                >
                  {is3DMode ? '🎭' : '📐'} {is3DMode ? '3D' : '2D'}
                </button>
                <button className="control-btn" onClick={resetView}>
                  🔄 Reset
                </button>
                <button className="control-btn" onClick={handleTryOn}>
                  👤 Try On
                </button>
                <button className="control-btn" onClick={handleRoomView}>
                  🏠 Room
                </button>
              </div>

              {/* Interaction Hints */}
              {is3DMode && !isLoading && (
                <div className="interaction-hints">
                  <p>🖱️ Drag to rotate • 🔍 Scroll to zoom</p>
                </div>
              )}
            </div>
          </div>

          {/* Product Details & Controls */}
          <div className="ar-controls-section">
            {/* Product Info */}
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-brand">{product.brand}</p>
              <p className="product-description">{product.description}</p>
              <div className="product-rating">
                <span className="stars">{'⭐'.repeat(Math.floor(product.rating))}</span>
                <span className="rating-value">{product.rating}</span>
              </div>
              <div className="product-price">
                <span className="current-price">${(currentPrice || 0).toFixed(2)}</span>
                {selectedSize?.price_modifier > 0 && (
                  <span className="price-modifier">+${selectedSize.price_modifier}</span>
                )}
              </div>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="customization-section">
                <h4>🎨 Colors</h4>
                <div className="color-options">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className={`color-option ${selectedColor?.name === color.name ? 'selected' : ''}`}
                      style={{ 
                        backgroundColor: color.hex,
                        border: selectedColor?.name === color.name ? '3px solid #ff6b35' : '2px solid #ddd'
                      }}
                      onClick={() => handleColorChange(color)}
                      title={color.name}
                    >
                      <span className="color-name">{color.name}</span>
                      {selectedColor?.name === color.name && (
                        <span className="selected-indicator">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="customization-section">
                <h4>📏 Sizes</h4>
                <div className="size-options">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      className={`size-option ${selectedSize?.name === size.name ? 'selected' : ''}`}
                      onClick={() => handleSizeChange(size)}
                    >
                      <span className="size-name">{size.name}</span>
                      {size.price_modifier > 0 && (
                        <span className="size-price">+${size.price_modifier}</span>
                      )}
                      <span className="size-stock">{size.stock} left</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* AR Features */}
            <div className="ar-features-section">
              <h4>🥽 AR Features</h4>
              <div className="ar-features-grid">
                <div className="ar-feature">
                  <span className="feature-icon">🎭</span>
                  <span className="feature-name">360° View</span>
                  <span className="feature-status">✓ Active</span>
                </div>
                <div className="ar-feature">
                  <span className="feature-icon">🎨</span>
                  <span className="feature-name">Color Change</span>
                  <span className="feature-status">✓ Available</span>
                </div>
                <div className="ar-feature">
                  <span className="feature-icon">📏</span>
                  <span className="feature-name">Size Preview</span>
                  <span className="feature-status">✓ Available</span>
                </div>
                <div className="ar-feature">
                  <span className="feature-icon">🏠</span>
                  <span className="feature-name">Room Placement</span>
                  <span className="feature-status">🔄 Beta</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="ar-actions">
              <button 
                className="add-to-cart-btn"
                onClick={() => {
                  onAddToCart && onAddToCart({
                    ...product,
                    selectedColor: selectedColor?.name,
                    selectedSize: selectedSize?.name,
                    finalPrice: currentPrice
                  });
                }}
              >
                🛒 Add to Cart - ${(currentPrice || 0).toFixed(2)}
              </button>
              
              <div className="secondary-actions">
                <button className="share-ar-btn">
                  📤 Share AR View
                </button>
                <button className="save-config-btn">
                  💾 Save Configuration
                </button>
              </div>
            </div>

            {/* Technical Specs */}
            <div className="tech-specs">
              <h4>🔧 AR Technical Info</h4>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">3D Model Quality:</span>
                  <span className="spec-value">High Definition</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Texture Resolution:</span>
                  <span className="spec-value">4K</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Color Accuracy:</span>
                  <span className="spec-value">99.2%</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Size Accuracy:</span>
                  <span className="spec-value">±2mm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enhanced3DARViewer;
