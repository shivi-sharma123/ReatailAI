import React, { useState, useRef, useEffect } from 'react';
import './EnhancedARViewer.css';
import VirtualARTryOn from './VirtualARTryOn';
import NoCamera3DAR from './NoCamera3DAR';

function EnhancedARViewer({ product, onClose }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [arMode, setArMode] = useState('preview');
  const [isLoading, setIsLoading] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [colorChanging, setColorChanging] = useState(false);
  const [sizeChanging, setSizeChanging] = useState(false);
  const [showVirtualAR, setShowVirtualAR] = useState(false);
  const [show3DAR, setShow3DAR] = useState(false);
  const arViewerRef = useRef(null);

  // Parse product data with enhanced color support
  let images, colors, sizes;
  
  try {
    images = product.images ? (typeof product.images === 'string' ? JSON.parse(product.images) : product.images) : [product.image_url];
    colors = product.colors ? (typeof product.colors === 'string' ? JSON.parse(product.colors) : product.colors) : [
      {'name': 'Original', 'hex': '#666666', 'price_modifier': 0},
      {'name': 'Red', 'hex': '#ff4444', 'price_modifier': 5},
      {'name': 'Blue', 'hex': '#2196F3', 'price_modifier': 5},
      {'name': 'Green', 'hex': '#4CAF50', 'price_modifier': 5},
      {'name': 'Black', 'hex': '#333333', 'price_modifier': 10},
      {'name': 'White', 'hex': '#ffffff', 'price_modifier': 10}
    ];
    sizes = product.sizes ? (typeof product.sizes === 'string' ? JSON.parse(product.sizes) : product.sizes) : [
      {'size': 'S', 'price_modifier': -5},
      {'size': 'M', 'price_modifier': 0},
      {'size': 'L', 'price_modifier': 5}
    ];
  } catch (error) {
    console.error('Error parsing product data:', error);
    images = [product.image_url];
    colors = [{'name': 'Original', 'hex': '#666666', 'price_modifier': 0}];
    sizes = [{'size': 'M', 'price_modifier': 0}];
  }

  useEffect(() => {
    if (colors.length > 0) setSelectedColor(colors[0]);
    if (sizes.length > 0) setSelectedSize(sizes[Math.floor(sizes.length / 2)]); // Default to middle size
  }, []);

  // Calculate price with color and size modifiers
  const calculatePrice = () => {
    const basePrice = product.price;
    const colorModifier = selectedColor?.price_modifier || 0;
    const sizeModifier = selectedSize?.price_modifier || 0;
    return (basePrice + colorModifier + sizeModifier).toFixed(2);
  };

  // Get current image with amazing color transformations
  const getCurrentImage = () => {
    return images[currentImageIndex] || product.image_url;
  };

  // Advanced color filter effects
  const getColorFilter = () => {
    if (!selectedColor || selectedColor.name === 'Original') return 'none';
    
    const colorEffects = {
      'Red': 'hue-rotate(0deg) saturate(2.0) brightness(1.1) contrast(1.3)',
      'Blue': 'hue-rotate(240deg) saturate(1.8) brightness(1.0) contrast(1.2)',
      'Green': 'hue-rotate(120deg) saturate(1.6) brightness(1.1) contrast(1.1)',
      'Black': 'brightness(0.2) contrast(2.0) saturate(0.3)',
      'White': 'brightness(2.0) contrast(0.6) saturate(0.3)'
    };
    
    return colorEffects[selectedColor.name] || 'none';
  };

  // Get size scaling factor for visual representation
  const getSizeScale = () => {
    if (!selectedSize) return 1;
    
    const sizeScales = {
      'XS': 0.75, 'S': 0.85, 'M': 1.0, 'L': 1.15, 'XL': 1.25, 'XXL': 1.35,
      '38mm': 0.8, '42mm': 1.0, '46mm': 1.2
    };
    
    return sizeScales[selectedSize.size] || 1.0;
  };

  // Enhanced color change with animation
  const handleColorChange = (color) => {
    setColorChanging(true);
    setSelectedColor(color);
    
    setTimeout(() => {
      setColorChanging(false);
    }, 800);
  };

  // Enhanced size change with animation
  const handleSizeChange = (size) => {
    setSizeChanging(true);
    setSelectedSize(size);
    
    setTimeout(() => {
      setSizeChanging(false);
    }, 800);
  };

  const startARSession = () => {
    setIsLoading(true);
    setTimeout(() => {
      setArMode('ar');
      setIsLoading(false);
    }, 2000);
  };

  const rotateProduct = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleAddToCart = () => {
    alert(`Added ${product.name} to cart with ${selectedColor?.name} color and ${selectedSize?.size} size for $${calculatePrice()}`);
  };

  const handleAddToWishlist = () => {
    alert(`Added ${product.name} to your wishlist!`);
  };

  const handleShare = () => {
    alert(`Share link generated for ${product.name}`);
  };

  return (
    <>
      {/* Show AR Mode Selection */}
      {!showVirtualAR && !show3DAR && (
        <div className="enhanced-ar-viewer" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1000,
          background: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('https://th.bing.com/th/id/R.82b738f765fa5d1481a9bf581247bcb5?rik=eqgz9XMOnECAag&riu=http%3a%2f%2fai47labs.com%2fwp-content%2fuploads%2f2023%2f05%2fhow-retailers-are-using-artificial-intelligence-to-stand-strong-in-the-era-of-digital-transformation-featured.jpg&ehk=W%2bTKHMiDepwhPAQDGFgWAWU7bY2quK5s%2fz%2btE4xJiY4%3d&risl=&pid=ImgRaw&r=0')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto'
        }}>
          {/* Header with product info and close button */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 30px',
            backgroundColor: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <div>
              <h2 style={{ 
                color: 'white', 
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                margin: 0,
                fontSize: '24px'
              }}>
                🥽 AR Experience - {product.name}
              </h2>
              <div style={{ marginTop: '10px' }}>
                <span style={{ 
                  color: 'white', 
                  textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  ${calculatePrice()}
                </span>
                {(selectedColor?.price_modifier > 0 || selectedSize?.price_modifier > 0) && (
                  <span style={{ 
                    color: 'rgba(255,255,255,0.8)',
                    marginLeft: '10px',
                    fontSize: '14px'
                  }}>
                    Base: ${product.price}
                  </span>
                )}
              </div>
            </div>
            <button 
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                cursor: 'pointer',
                backdropFilter: 'blur(5px)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.3)';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.2)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ✕
            </button>
          </div>

          {/* AR Mode Selection */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
            gap: '30px',
            flexWrap: 'wrap',
            padding: '40px 20px'
          }}>
            <div 
              style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderRadius: '20px',
                padding: '40px',
                textAlign: 'center',
                maxWidth: '320px',
                width: '100%',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)'
              }}
              onClick={() => setShowVirtualAR(true)}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
              }}
            >
              <div style={{ fontSize: '60px', marginBottom: '20px' }}>🔮</div>
              <h3 style={{ color: '#333', marginBottom: '15px', fontSize: '22px' }}>Virtual AR Try-On</h3>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                Interactive product placement with virtual mannequins. No camera required! Perfect for trying on clothes, accessories, and more.
              </p>
              <div style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: 'bold',
                display: 'inline-block'
              }}>
                Start Virtual AR
              </div>
            </div>

            <div 
              style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderRadius: '20px',
                padding: '40px',
                textAlign: 'center',
                maxWidth: '320px',
                width: '100%',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)'
              }}
              onClick={() => setShow3DAR(true)}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
              }}
            >
              <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎮</div>
              <h3 style={{ color: '#333', marginBottom: '15px', fontSize: '22px' }}>3D AR Experience</h3>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                Full 3D rendering with realistic lighting and animations. Camera-free! Rotate, zoom, and interact with products in 3D space.
              </p>
              <div style={{
                backgroundColor: '#28a745',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: 'bold',
                display: 'inline-block'
              }}>
                Start 3D AR
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Virtual AR Component */}
      {showVirtualAR && (
        <VirtualARTryOn 
          product={product} 
          onClose={() => setShowVirtualAR(false)}
        />
      )}

      {/* 3D AR Component */}
      {show3DAR && (
        <NoCamera3DAR 
          product={product} 
          onClose={() => setShow3DAR(false)}
        />
      )}
    </>
  );
}

export default EnhancedARViewer;
