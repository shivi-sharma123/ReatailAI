import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Cylinder, Plane } from '@react-three/drei';
import * as THREE from 'three';
import './AdvancedARViewer.css';

// 3D Product Model Component
function ProductModel({ product, selectedColor, selectedSize, rotation }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = rotation;
    }
  });

  // Get size scale based on selected size
  const getSizeScale = () => {
    const sizeScales = {
      'XS': 0.7, 'S': 0.8, 'M': 1.0, 'L': 1.2, 'XL': 1.4,
      '38mm': 0.8, '42mm': 1.0, '46mm': 1.2,
      '6': 0.8, '7': 0.9, '8': 1.0, '9': 1.1, '10': 1.2
    };
    return sizeScales[selectedSize?.size] || 1.0;
  };

  // Get color from hex
  const getThreeColor = () => {
    return selectedColor?.hex || '#666666';
  };

  // Different 3D shapes based on product category
  const renderProductShape = () => {
    const scale = getSizeScale();
    const color = getThreeColor();
    
    switch (product.category?.toLowerCase()) {
      case 'watches':
      case 'smartwatch':
        return (
          <group ref={meshRef} scale={[scale, scale, scale]}>
            <Cylinder args={[0.8, 0.8, 0.2]} position={[0, 0, 0]}>
              <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
            </Cylinder>
            <Cylinder args={[0.6, 0.6, 0.25]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#000000" />
            </Cylinder>
          </group>
        );
      
      case 'glasses':
      case 'sunglasses':
        return (
          <group ref={meshRef} scale={[scale, scale, scale]}>
            <Sphere args={[0.3]} position={[-0.6, 0, 0]}>
              <meshStandardMaterial color={color} transparent opacity={0.8} />
            </Sphere>
            <Sphere args={[0.3]} position={[0.6, 0, 0]}>
              <meshStandardMaterial color={color} transparent opacity={0.8} />
            </Sphere>
            <Cylinder args={[0.02, 0.02, 1.2]} rotation={[0, 0, Math.PI / 2]}>
              <meshStandardMaterial color={color} />
            </Cylinder>
          </group>
        );
      
      case 'shoes':
      case 'footwear':
        return (
          <group ref={meshRef} scale={[scale, scale, scale]}>
            <Box args={[1.2, 0.4, 0.6]} position={[0, -0.2, 0]}>
              <meshStandardMaterial color={color} />
            </Box>
            <Box args={[1.0, 0.6, 0.5]} position={[0, 0.1, 0]}>
              <meshStandardMaterial color={color} />
            </Box>
          </group>
        );
      
      case 'clothing':
      case 'fashion':
        return (
          <group ref={meshRef} scale={[scale, scale, scale]}>
            <Box args={[1.2, 1.8, 0.3]} position={[0, 0, 0]}>
              <meshStandardMaterial color={color} />
            </Box>
            <Box args={[1.4, 0.8, 0.3]} position={[0, 0.5, 0]}>
              <meshStandardMaterial color={color} />
            </Box>
          </group>
        );
      
      default:
        return (
          <group ref={meshRef} scale={[scale, scale, scale]}>
            <Box args={[1, 1, 1]}>
              <meshStandardMaterial color={color} />
            </Box>
          </group>
        );
    }
  };

  return (
    <>
      {renderProductShape()}
      <Text
        position={[0, -2, 0]}
        fontSize={0.3}
        color="#333"
        anchorX="center"
        anchorY="middle"
      >
        {product.name}
      </Text>
    </>
  );
}

// AR Environment Component
function AREnvironment() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <pointLight position={[-10, -10, -10]} />
      
      {/* Floor */}
      <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <meshStandardMaterial color="#f0f0f0" />
      </Plane>
      
      {/* Background */}
      <Plane args={[20, 20]} position={[0, 0, -10]}>
        <meshStandardMaterial color="#e8f4f8" />
      </Plane>
    </>
  );
}

function AdvancedARViewer({ product, onClose }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [arMode, setArMode] = useState('3d'); // '3d', 'ar', 'preview'
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showMeasurement, setShowMeasurement] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [lightingMode, setLightingMode] = useState('natural');

  // Enhanced product data parsing
  const parseProductData = () => {
    try {
      const colors = product.colors ? 
        (typeof product.colors === 'string' ? JSON.parse(product.colors) : product.colors) : 
        [
          { name: 'Red', hex: '#FF4444', price_modifier: 0 },
          { name: 'Blue', hex: '#2196F3', price_modifier: 5 },
          { name: 'Green', hex: '#4CAF50', price_modifier: 5 },
          { name: 'Black', hex: '#333333', price_modifier: 10 },
          { name: 'White', hex: '#FFFFFF', price_modifier: 10 },
          { name: 'Gold', hex: '#FFD700', price_modifier: 25 },
          { name: 'Silver', hex: '#C0C0C0', price_modifier: 20 },
          { name: 'Rose Gold', hex: '#E8B4B8', price_modifier: 30 }
        ];

      const sizes = product.sizes ? 
        (typeof product.sizes === 'string' ? JSON.parse(product.sizes) : product.sizes) : 
        [
          { size: 'XS', price_modifier: -5, stock: 15 },
          { size: 'S', price_modifier: 0, stock: 25 },
          { size: 'M', price_modifier: 0, stock: 30 },
          { size: 'L', price_modifier: 5, stock: 20 },
          { size: 'XL', price_modifier: 10, stock: 15 }
        ];

      return { colors, sizes };
    } catch (error) {
      console.error('Error parsing product data:', error);
      return { 
        colors: [{ name: 'Original', hex: '#666666', price_modifier: 0 }],
        sizes: [{ size: 'M', price_modifier: 0, stock: 10 }]
      };
    }
  };

  const { colors, sizes } = parseProductData();

  useEffect(() => {
    if (colors.length > 0) setSelectedColor(colors[0]);
    if (sizes.length > 0) setSelectedSize(sizes[Math.floor(sizes.length / 2)]);
  }, []);

  // Calculate final price
  const calculatePrice = () => {
    const basePrice = product.price || 0;
    const colorModifier = selectedColor?.price_modifier || 0;
    const sizeModifier = selectedSize?.price_modifier || 0;
    return (basePrice + colorModifier + sizeModifier).toFixed(2);
  };

  // Handle color change with animation
  const handleColorChange = (color) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedColor(color);
      setIsLoading(false);
    }, 500);
  };

  // Handle size change with animation
  const handleSizeChange = (size) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedSize(size);
      setIsLoading(false);
    }, 500);
  };

  // Auto-rotate functionality
  useEffect(() => {
    if (arMode === '3d') {
      const interval = setInterval(() => {
        setRotation(prev => prev + 0.02 * animationSpeed);
      }, 16); // 60fps
      return () => clearInterval(interval);
    }
  }, [arMode, animationSpeed]);

  return (
    <div className="advanced-ar-viewer">
      {/* Header */}
      <div className="ar-header">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>🚀 Advanced AR Experience - {product.name}</h2>
        <div className="price-display">
          <span className="final-price">${calculatePrice()}</span>
          {(selectedColor?.price_modifier > 0 || selectedSize?.price_modifier > 0) && (
            <span className="original-price">Was ${product.price}</span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="ar-main-content">
        {/* 3D Viewer */}
        <div className="ar-3d-viewer">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <AREnvironment />
            <ProductModel 
              product={product} 
              selectedColor={selectedColor} 
              selectedSize={selectedSize}
              rotation={rotation}
            />
            <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
          </Canvas>
          
          {/* AR Mode Toggle */}
          <div className="ar-mode-toggle">
            <button 
              className={`mode-btn ${arMode === '3d' ? 'active' : ''}`}
              onClick={() => setArMode('3d')}
            >
              🎮 3D View
            </button>
            <button 
              className={`mode-btn ${arMode === 'ar' ? 'active' : ''}`}
              onClick={() => setArMode('ar')}
            >
              🥽 AR View
            </button>
            <button 
              className={`mode-btn ${arMode === 'preview' ? 'active' : ''}`}
              onClick={() => setArMode('preview')}
            >
              📷 Preview
            </button>
          </div>
        </div>

        {/* Control Panel */}
        <div className="ar-control-panel">
          {/* Color Selection */}
          <div className="control-section">
            <h3>🎨 Choose Color</h3>
            <div className="color-palette">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`color-swatch ${selectedColor?.name === color.name ? 'selected' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => handleColorChange(color)}
                  title={`${color.name} ${color.price_modifier > 0 ? `+$${color.price_modifier}` : ''}`}
                >
                  {selectedColor?.name === color.name && <span className="checkmark">✓</span>}
                  <div className="color-name">{color.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="control-section">
            <h3>📏 Choose Size</h3>
            <div className="size-selector">
              {sizes.map((size, index) => (
                <button
                  key={index}
                  className={`size-btn ${selectedSize?.size === size.size ? 'selected' : ''}`}
                  onClick={() => handleSizeChange(size)}
                  disabled={size.stock === 0}
                >
                  <span className="size-label">{size.size}</span>
                  <span className="size-price">
                    {size.price_modifier > 0 ? `+$${size.price_modifier}` : 
                     size.price_modifier < 0 ? `-$${Math.abs(size.price_modifier)}` : 'Base'}
                  </span>
                  <span className="size-stock">{size.stock} left</span>
                </button>
              ))}
            </div>
          </div>

          {/* AR Controls */}
          <div className="control-section">
            <h3>🎛️ AR Controls</h3>
            <div className="ar-controls">
              <div className="control-group">
                <label>Animation Speed</label>
                <input 
                  type="range" 
                  min="0" 
                  max="3" 
                  step="0.1" 
                  value={animationSpeed}
                  onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                />
              </div>
              <div className="control-group">
                <label>Lighting</label>
                <select 
                  value={lightingMode} 
                  onChange={(e) => setLightingMode(e.target.value)}
                >
                  <option value="natural">Natural</option>
                  <option value="studio">Studio</option>
                  <option value="dramatic">Dramatic</option>
                </select>
              </div>
              <button 
                className="control-btn"
                onClick={() => setShowMeasurement(!showMeasurement)}
              >
                📐 {showMeasurement ? 'Hide' : 'Show'} Measurements
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="control-section">
            <h3>🛍️ Actions</h3>
            <div className="action-buttons">
              <button className="action-btn primary">
                🛒 Add to Cart - ${calculatePrice()}
              </button>
              <button className="action-btn secondary">
                ❤️ Save to Wishlist
              </button>
              <button className="action-btn secondary">
                📤 Share AR Experience
              </button>
              <button className="action-btn secondary">
                📸 Take AR Photo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>🎨 Applying changes...</p>
        </div>
      )}
    </div>
  );
}

export default AdvancedARViewer;
