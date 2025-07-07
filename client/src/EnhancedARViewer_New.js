import React, { useState, useRef, useEffect } from 'react';
import './EnhancedARViewer.css';
import VirtualARTryOn from './VirtualARTryOn';
import NoCamera3DAR from './NoCamera3DAR';

function EnhancedARViewer({ product, onClose }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showVirtualAR, setShowVirtualAR] = useState(false);
  const [show3DAR, setShow3DAR] = useState(false);

  // Parse product data with enhanced color support
  let colors, sizes;
  
  try {
    // Handle colors - check if they're already parsed or need parsing
    if (product.colors) {
      if (Array.isArray(product.colors)) {
        colors = product.colors;
      } else if (typeof product.colors === 'string') {
        colors = JSON.parse(product.colors);
      } else {
        colors = [
          {'name': 'Space Gray', 'hex': '#4a5568', 'price_modifier': 0},
          {'name': 'Rose Gold', 'hex': '#ed8936', 'price_modifier': 50},
          {'name': 'Silver', 'hex': '#cbd5e0', 'price_modifier': 25},
          {'name': 'Ocean Blue', 'hex': '#2b6cb0', 'price_modifier': 30},
          {'name': 'Forest Green', 'hex': '#22543d', 'price_modifier': 35},
          {'name': 'Sunset Orange', 'hex': '#dd6b20', 'price_modifier': 40},
          {'name': 'Royal Purple', 'hex': '#553c9a', 'price_modifier': 45},
          {'name': 'Cherry Red', 'hex': '#e53e3e', 'price_modifier': 35}
        ];
      }
    } else {
      colors = [
        {'name': 'Space Gray', 'hex': '#4a5568', 'price_modifier': 0},
        {'name': 'Rose Gold', 'hex': '#ed8936', 'price_modifier': 50},
        {'name': 'Silver', 'hex': '#cbd5e0', 'price_modifier': 25},
        {'name': 'Ocean Blue', 'hex': '#2b6cb0', 'price_modifier': 30},
        {'name': 'Forest Green', 'hex': '#22543d', 'price_modifier': 35},
        {'name': 'Sunset Orange', 'hex': '#dd6b20', 'price_modifier': 40},
        {'name': 'Royal Purple', 'hex': '#553c9a', 'price_modifier': 45},
        {'name': 'Cherry Red', 'hex': '#e53e3e', 'price_modifier': 35}
      ];
    }
    
    // Handle sizes - check if they're already parsed or need parsing
    if (product.sizes) {
      if (Array.isArray(product.sizes)) {
        sizes = product.sizes;
      } else if (typeof product.sizes === 'string') {
        sizes = JSON.parse(product.sizes);
      } else {
        sizes = [
          {'size': 'S', 'price_modifier': -5},
          {'size': 'M', 'price_modifier': 0},
          {'size': 'L', 'price_modifier': 5},
          {'size': 'XL', 'price_modifier': 10}
        ];
      }
    } else {
      sizes = [
        {'size': 'S', 'price_modifier': -5},
        {'size': 'M', 'price_modifier': 0},
        {'size': 'L', 'price_modifier': 5},
        {'size': 'XL', 'price_modifier': 10}
      ];
    }
  } catch (error) {
    console.error('Error parsing product data:', error);
    colors = [
      {'name': 'Space Gray', 'hex': '#4a5568', 'price_modifier': 0},
      {'name': 'Rose Gold', 'hex': '#ed8936', 'price_modifier': 50},
      {'name': 'Silver', 'hex': '#cbd5e0', 'price_modifier': 25},
      {'name': 'Ocean Blue', 'hex': '#2b6cb0', 'price_modifier': 30}
    ];
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
    return basePrice + colorModifier + sizeModifier;
  };

  return (
    <>
      {/* Show AR Mode Selection */}
      {!showVirtualAR && !show3DAR && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: '800px',
            marginBottom: '50px',
            padding: '20px',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}>
            <div>
              <h2 style={{ 
                color: '#333', 
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                margin: '0 0 10px 0',
                fontSize: '28px'
              }}>
                🥽 AR Experience - {product.name}
              </h2>
              <div style={{
                color: '#0071ce',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                fontSize: '20px',
                fontWeight: 'bold'
              }}>
                ${calculatePrice()}
              </div>
            </div>
            <button 
              onClick={onClose}
              style={{
                background: '#ff4444',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                fontSize: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
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
            gap: '40px',
            flexWrap: 'wrap',
            maxWidth: '800px'
          }}>
            <div 
              style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderRadius: '20px',
                padding: '40px',
                textAlign: 'center',
                maxWidth: '320px',
                minHeight: '280px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
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
              <div>
                <div style={{ fontSize: '80px', marginBottom: '20px' }}>🔮</div>
                <h3 style={{ color: '#333', marginBottom: '15px', fontSize: '22px' }}>Virtual AR Try-On</h3>
                <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                  Interactive product placement with virtual mannequins. Click to position products and try different sizes!
                </p>
              </div>
              <div style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}>
                🚀 Start Virtual AR
              </div>
            </div>

            <div 
              style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderRadius: '20px',
                padding: '40px',
                textAlign: 'center',
                maxWidth: '320px',
                minHeight: '280px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
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
              <div>
                <div style={{ fontSize: '80px', marginBottom: '20px' }}>🎮</div>
                <h3 style={{ color: '#333', marginBottom: '15px', fontSize: '22px' }}>3D AR Experience</h3>
                <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                  Full 3D rendering with realistic lighting, shadows, and animations. Rotate and scale products in real-time!
                </p>
              </div>
              <div style={{
                backgroundColor: '#28a745',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}>
                🎯 Start 3D AR
              </div>
            </div>
          </div>

          {/* Features Banner */}
          <div style={{
            marginTop: '40px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '15px',
            padding: '20px',
            maxWidth: '800px',
            width: '100%',
            backdropFilter: 'blur(10px)'
          }}>
            <h4 style={{ 
              color: 'white', 
              textAlign: 'center', 
              marginBottom: '15px',
              fontSize: '18px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
            }}>
              ✨ No Camera Required • 🎨 Multiple Colors • 📏 Size Options • 💫 Professional Quality
            </h4>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '30px',
              flexWrap: 'wrap',
              fontSize: '14px',
              color: 'rgba(255,255,255,0.9)'
            }}>
              <span>🔮 Virtual Mannequins</span>
              <span>🎮 3D Rendering</span>
              <span>🎨 Real-time Colors</span>
              <span>📱 Mobile Friendly</span>
            </div>
          </div>
        </div>
      )}

      {/* Virtual AR Component */}
      {showVirtualAR && (
        <VirtualARTryOn 
          product={product} 
          onClose={() => {
            setShowVirtualAR(false);
            if (onClose) onClose();
          }}
        />
      )}

      {/* 3D AR Component */}
      {show3DAR && (
        <NoCamera3DAR 
          product={product} 
          onClose={() => {
            setShow3DAR(false);
            if (onClose) onClose();
          }}
        />
      )}
    </>
  );
}

export default EnhancedARViewer;
