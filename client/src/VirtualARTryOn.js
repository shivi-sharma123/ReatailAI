import React, { useState, useRef, useEffect } from 'react';

const VirtualARTryOn = ({ product, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [viewAngle, setViewAngle] = useState('front');
  const [isScanning, setIsScanning] = useState(false);
  const [showMannequin, setShowMannequin] = useState(true);
  const [arMode, setArMode] = useState('virtual');
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [scale, setScale] = useState(1);
  const canvasRef = useRef(null);

  // Add CSS animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      
      @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }
      
      @keyframes colorChange {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
      }
      
      .ar-product-image {
        animation: shimmer 3s infinite;
        background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%);
        background-size: 1000px 100%;
      }
      
      .color-transition {
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .hover-lift {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .hover-lift:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Enhanced color palette for all products
  const defaultColors = [
    { name: 'Rose Gold', hex: '#E8B4A6', price_modifier: 0 },
    { name: 'Ocean Blue', hex: '#4A90E2', price_modifier: 10 },
    { name: 'Emerald Green', hex: '#50C878', price_modifier: 15 },
    { name: 'Sunset Orange', hex: '#FF6B35', price_modifier: 12 },
    { name: 'Royal Purple', hex: '#7B68EE', price_modifier: 18 },
    { name: 'Cherry Red', hex: '#DC143C', price_modifier: 8 },
    { name: 'Golden Yellow', hex: '#FFD700', price_modifier: 20 },
    { name: 'Coral Pink', hex: '#FF7F7F', price_modifier: 5 },
    { name: 'Turquoise', hex: '#40E0D0', price_modifier: 25 },
    { name: 'Lavender', hex: '#B19CD9', price_modifier: 15 },
    { name: 'Mint Green', hex: '#98FB98', price_modifier: 10 },
    { name: 'Peach', hex: '#FFCBA4', price_modifier: 8 },
    { name: 'Sky Blue', hex: '#87CEEB', price_modifier: 12 },
    { name: 'Crimson', hex: '#DC143C', price_modifier: 22 },
    { name: 'Forest Green', hex: '#228B22', price_modifier: 18 },
    { name: 'Amber', hex: '#FFBF00', price_modifier: 30 },
    { name: 'Magenta', hex: '#FF00FF', price_modifier: 25 },
    { name: 'Teal', hex: '#008080', price_modifier: 20 },
    { name: 'Ivory', hex: '#FFFFF0', price_modifier: 35 },
    { name: 'Charcoal', hex: '#36454F', price_modifier: 15 }
  ];

  // Size options with measurements
  const sizeOptions = [
    { size: 'XS', scale: 0.8, price_modifier: -10 },
    { size: 'S', scale: 0.9, price_modifier: -5 },
    { size: 'M', scale: 1.0, price_modifier: 0 },
    { size: 'L', scale: 1.1, price_modifier: 5 },
    { size: 'XL', scale: 1.2, price_modifier: 10 },
    { size: 'XXL', scale: 1.3, price_modifier: 15 }
  ];

  // Parse product data
  let colors, sizes;
  try {
    colors = product.colors ? (typeof product.colors === 'string' ? JSON.parse(product.colors) : product.colors) : defaultColors;
    sizes = product.sizes ? (typeof product.sizes === 'string' ? JSON.parse(product.sizes) : product.sizes) : sizeOptions;
  } catch (error) {
    colors = defaultColors;
    sizes = sizeOptions;
  }

  useEffect(() => {
    if (colors.length > 0) setSelectedColor(colors[0]);
    drawVirtualTryOn();
  }, [selectedColor, selectedSize, viewAngle, position, scale]);

  const drawVirtualTryOn = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 500;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#f8f9fa');
    gradient.addColorStop(1, '#e9ecef');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw virtual mannequin/avatar
    if (showMannequin) {
      drawMannequin(ctx);
    }

    // Draw AR product
    drawARProduct(ctx);

    // Draw AR scanning effect
    if (isScanning) {
      drawScanningEffect(ctx);
    }
  };

  const drawMannequin = (ctx) => {
    const centerX = 200;
    const centerY = 250;

    // Draw mannequin silhouette based on view angle
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#f0f0f0';

    if (viewAngle === 'front') {
      // Front view mannequin
      ctx.beginPath();
      ctx.ellipse(centerX, centerY - 150, 40, 50, 0, 0, Math.PI * 2); // Head
      ctx.fill();
      ctx.stroke();

      // Body
      ctx.beginPath();
      ctx.rect(centerX - 50, centerY - 100, 100, 120);
      ctx.fill();
      ctx.stroke();

      // Arms
      ctx.beginPath();
      ctx.rect(centerX - 80, centerY - 80, 25, 80);
      ctx.rect(centerX + 55, centerY - 80, 25, 80);
      ctx.fill();
      ctx.stroke();
    } else if (viewAngle === 'side') {
      // Side view mannequin
      ctx.beginPath();
      ctx.ellipse(centerX, centerY - 150, 30, 50, 0, 0, Math.PI * 2); // Head
      ctx.fill();
      ctx.stroke();

      // Body (side profile)
      ctx.beginPath();
      ctx.rect(centerX - 20, centerY - 100, 60, 120);
      ctx.fill();
      ctx.stroke();

      // Arm
      ctx.beginPath();
      ctx.rect(centerX + 30, centerY - 80, 20, 80);
      ctx.fill();
      ctx.stroke();
    }
  };

  const drawARProduct = (ctx) => {
    const centerX = position.x * 4; // Convert percentage to pixels
    const centerY = position.y * 5;
    const currentScale = scale * (sizeOptions.find(s => s.size === selectedSize)?.scale || 1);
    const color = selectedColor?.hex || '#000000';

    // Set product color
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;

    // Draw product based on type
    const productType = getProductType(product);
    
    switch (productType) {
      case 'sunglasses':
        drawSunglasses(ctx, centerX, centerY - 150, currentScale, color);
        break;
      case 'watch':
        drawWatch(ctx, centerX - 30, centerY - 80, currentScale, color);
        break;
      case 'shirt':
        drawShirt(ctx, centerX, centerY - 50, currentScale, color);
        break;
      case 'jacket':
        drawJacket(ctx, centerX, centerY - 50, currentScale, color);
        break;
      case 'shoes':
        drawShoes(ctx, centerX, centerY + 150, currentScale, color);
        break;
      case 'hat':
        drawHat(ctx, centerX, centerY - 180, currentScale, color);
        break;
      default:
        drawGenericProduct(ctx, centerX, centerY, currentScale, color);
    }

    // Add glow effect
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  };

  const getProductType = (product) => {
    const name = product.name.toLowerCase();
    if (name.includes('sunglasses') || name.includes('glasses')) return 'sunglasses';
    if (name.includes('watch')) return 'watch';
    if (name.includes('shirt') || name.includes('tshirt') || name.includes('polo')) return 'shirt';
    if (name.includes('jacket') || name.includes('coat') || name.includes('blazer')) return 'jacket';
    if (name.includes('shoes') || name.includes('sneakers') || name.includes('boots')) return 'shoes';
    if (name.includes('hat') || name.includes('cap') || name.includes('beanie')) return 'hat';
    return 'generic';
  };

  const drawSunglasses = (ctx, x, y, scale, color) => {
    const width = 80 * scale;
    const height = 25 * scale;
    
    // Left lens
    ctx.beginPath();
    ctx.ellipse(x - width/4, y, width/3, height, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Right lens
    ctx.beginPath();
    ctx.ellipse(x + width/4, y, width/3, height, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Bridge
    ctx.beginPath();
    ctx.moveTo(x - width/8, y);
    ctx.lineTo(x + width/8, y);
    ctx.stroke();
    
    // Temples
    ctx.beginPath();
    ctx.moveTo(x - width/2, y);
    ctx.lineTo(x - width/2 - 30 * scale, y + 5 * scale);
    ctx.moveTo(x + width/2, y);
    ctx.lineTo(x + width/2 + 30 * scale, y + 5 * scale);
    ctx.stroke();
  };

  const drawWatch = (ctx, x, y, scale, color) => {
    const width = 40 * scale;
    const height = 50 * scale;
    
    // Watch face
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, 10 * scale);
    ctx.fill();
    ctx.stroke();
    
    // Watch band
    ctx.beginPath();
    ctx.rect(x + width/4, y - 20 * scale, width/2, 20 * scale);
    ctx.rect(x + width/4, y + height, width/2, 20 * scale);
    ctx.fill();
    ctx.stroke();
    
    // Watch face details
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(x + 5 * scale, y + 5 * scale, width - 10 * scale, height - 10 * scale, 5 * scale);
    ctx.fill();
  };

  const drawShirt = (ctx, x, y, scale, color) => {
    const width = 100 * scale;
    const height = 120 * scale;
    
    // Shirt body
    ctx.beginPath();
    ctx.rect(x - width/2, y, width, height);
    ctx.fill();
    ctx.stroke();
    
    // Sleeves
    ctx.beginPath();
    ctx.rect(x - width/2 - 30 * scale, y, 30 * scale, 60 * scale);
    ctx.rect(x + width/2, y, 30 * scale, 60 * scale);
    ctx.fill();
    ctx.stroke();
    
    // Collar
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - 15 * scale, y);
    ctx.lineTo(x, y - 10 * scale);
    ctx.lineTo(x + 15 * scale, y);
    ctx.stroke();
  };

  const drawJacket = (ctx, x, y, scale, color) => {
    const width = 110 * scale;
    const height = 130 * scale;
    
    // Jacket body
    ctx.beginPath();
    ctx.rect(x - width/2, y, width, height);
    ctx.fill();
    ctx.stroke();
    
    // Sleeves
    ctx.beginPath();
    ctx.rect(x - width/2 - 35 * scale, y, 35 * scale, 70 * scale);
    ctx.rect(x + width/2, y, 35 * scale, 70 * scale);
    ctx.fill();
    ctx.stroke();
    
    // Collar
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x - 20 * scale, y);
    ctx.lineTo(x, y - 15 * scale);
    ctx.lineTo(x + 20 * scale, y);
    ctx.stroke();
    
    // Zipper
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + height);
    ctx.stroke();
  };

  const drawShoes = (ctx, x, y, scale, color) => {
    const width = 60 * scale;
    const height = 25 * scale;
    
    // Left shoe
    ctx.beginPath();
    ctx.ellipse(x - width/2, y, width/2, height, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Right shoe
    ctx.beginPath();
    ctx.ellipse(x + width/2, y, width/2, height, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Laces
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(x - width/2 - 10 * scale, y - 10 * scale + i * 7 * scale);
      ctx.lineTo(x - width/2 + 10 * scale, y - 10 * scale + i * 7 * scale);
      ctx.moveTo(x + width/2 - 10 * scale, y - 10 * scale + i * 7 * scale);
      ctx.lineTo(x + width/2 + 10 * scale, y - 10 * scale + i * 7 * scale);
      ctx.stroke();
    }
  };

  const drawHat = (ctx, x, y, scale, color) => {
    const width = 70 * scale;
    const height = 20 * scale;
    
    // Hat crown
    ctx.beginPath();
    ctx.ellipse(x, y, width/2, height, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Hat brim
    ctx.beginPath();
    ctx.ellipse(x, y + height/2, width/1.5, height/2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  };

  const drawGenericProduct = (ctx, x, y, scale, color) => {
    const size = 40 * scale;
    
    // Generic product representation
    ctx.beginPath();
    ctx.roundRect(x - size/2, y - size/2, size, size, 10 * scale);
    ctx.fill();
    ctx.stroke();
    
    // Product emoji or icon
    ctx.fillStyle = '#ffffff';
    ctx.font = `${20 * scale}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText(product.emoji || '📦', x, y + 5 * scale);
  };

  const drawScanningEffect = (ctx) => {
    const time = Date.now() * 0.003;
    const scanY = (Math.sin(time) + 1) * 250;
    
    // Scanning line
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.moveTo(0, scanY);
    ctx.lineTo(400, scanY);
    ctx.stroke();
    ctx.globalAlpha = 1;
    
    // Scanning grid
    ctx.strokeStyle = '#00ff0030';
    ctx.lineWidth = 1;
    for (let i = 0; i < 400; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 500);
      ctx.stroke();
    }
    for (let i = 0; i < 500; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(400, i);
      ctx.stroke();
    }
  };

  const handleCanvasClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  const startARScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
  };

  const getColorHue = (colorName) => {
    const colorHues = {
      'Red': 0,
      'Orange': 30,
      'Yellow': 60,
      'Green': 120,
      'Blue': 240,
      'Purple': 270,
      'Pink': 320,
      'Black': 0,
      'White': 0,
      'Gray': 0,
      'Brown': 30
    };
    return colorHues[colorName] || 0;
  };

  const getColorSaturation = (colorName) => {
    const colorSaturations = {
      'Red': 1.8,
      'Orange': 1.6,
      'Yellow': 1.4,
      'Green': 1.5,
      'Blue': 1.8,
      'Purple': 1.6,
      'Pink': 1.4,
      'Black': 0.2,
      'White': 0.1,
      'Gray': 0.4,
      'Brown': 0.9
    };
    return colorSaturations[colorName] || 1;
  };

  const getColorBrightness = (colorName) => {
    const colorBrightness = {
      'Red': 1.1,
      'Orange': 1.2,
      'Yellow': 1.3,
      'Green': 1.0,
      'Blue': 1.0,
      'Purple': 0.9,
      'Pink': 1.2,
      'Black': 0.3,
      'White': 1.8,
      'Gray': 0.8,
      'Brown': 0.8
    };
    return colorBrightness[colorName] || 1;
  };

  const getColorContrast = (colorName) => {
    const colorContrast = {
      'Red': 1.2,
      'Orange': 1.1,
      'Yellow': 1.0,
      'Green': 1.1,
      'Blue': 1.2,
      'Purple': 1.3,
      'Pink': 1.1,
      'Black': 2.0,
      'White': 0.8,
      'Gray': 1.0,
      'Brown': 1.2
    };
    return colorContrast[colorName] || 1;
  };

  const calculatePrice = () => {
    const basePrice = product.price || 0;
    const colorModifier = selectedColor?.price_modifier || 0;
    const sizeModifier = sizeOptions.find(s => s.size === selectedSize)?.price_modifier || 0;
    return basePrice + colorModifier + sizeModifier;
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        borderRadius: '25px',
        padding: '30px',
        maxWidth: '1200px',
        width: '100%',
        maxHeight: '95vh',
        overflow: 'auto',
        position: 'relative',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(15px)',
        border: '2px solid rgba(255,255,255,0.3)'
      }}>
        {/* Enhanced Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          borderBottom: '3px solid #007bff',
          paddingBottom: '20px',
          background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
          color: 'white',
          margin: '-30px -30px 30px -30px',
          padding: '20px 30px',
          borderRadius: '25px 25px 0 0'
        }}>
          <div>
            <h2 style={{
              margin: 0,
              fontSize: '28px',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              🔮 Virtual AR Try-On Experience
            </h2>
            <p style={{
              margin: '5px 0 0 0',
              fontSize: '16px',
              opacity: 0.9
            }}>
              Crystal Clear HD Product Visualization
            </p>
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
              boxShadow: '0 4px 15px rgba(255,68,68,0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            ×
          </button>
        </div>

        {/* Enhanced Main Content - Left Side Product, Right Side Controls */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '40px',
          alignItems: 'start'
        }}>
          {/* LEFT SIDE - Enhanced Product Display */}
          <div style={{
            textAlign: 'center',
            position: 'relative'
          }}>
            {/* Ultra High-Quality Product Image */}
            <div style={{
              marginBottom: '25px',
              position: 'relative',
              border: '4px solid #007bff',
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
              transform: 'scale(1)',
              transition: 'all 0.3s ease'
            }}>
              <img 
                src={product.image_url}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '500px',
                  objectFit: 'contain',
                  display: 'block',
                  filter: selectedColor ? `hue-rotate(${getColorHue(selectedColor.name)}deg) saturate(${getColorSaturation(selectedColor.name)}) brightness(${getColorBrightness(selectedColor.name)}) contrast(${getColorContrast(selectedColor.name)})` : 'none',
                  transition: 'all 0.6s ease',
                  imageRendering: 'crisp-edges',
                  backgroundColor: '#ffffff',
                  padding: '20px'
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x500/ffffff/333333?text=Ultra+HD+Product';
                }}
              />
              {/* Enhanced Product Badge */}
              <div style={{
                position: 'absolute',
                top: '15px',
                left: '15px',
                background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                color: 'white',
                padding: '10px 15px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 'bold',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 15px rgba(0,123,255,0.3)'
              }}>
                📸 Ultra HD View
              </div>
              {/* Enhanced Color Indicator */}
              {selectedColor && selectedColor.name !== 'Original' && (
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: selectedColor.hex,
                  color: selectedColor.name === 'White' || selectedColor.name === 'Yellow' ? '#333' : 'white',
                  padding: '8px 15px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  border: '3px solid white',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                  animation: 'pulse 2s infinite'
                }}>
                  🎨 {selectedColor.name}
                </div>
              )}
              {/* Price Display */}
              <div style={{
                position: 'absolute',
                bottom: '15px',
                left: '15px',
                background: 'linear-gradient(135deg, #28a745 0%, #1e7e34 100%)',
                color: 'white',
                padding: '10px 15px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(40,167,69,0.3)'
              }}>
                💰 ${calculatePrice()}
              </div>
            </div>

            {/* Enhanced Virtual AR Canvas */}
            <div style={{
              border: '3px solid #28a745',
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: 'rgba(40,167,69,0.9)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 'bold',
                zIndex: 10
              }}>
                🎮 Virtual AR Canvas
              </div>
              <canvas 
                ref={canvasRef}
                onClick={handleCanvasClick}
                style={{
                  cursor: 'crosshair',
                  width: '100%',
                  height: 'auto',
                  maxWidth: '500px',
                  display: 'block'
                }}
              />
            </div>
            <div style={{
              marginTop: '15px',
              fontSize: '16px',
              color: '#007bff',
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}>
              🖱️ Click on the canvas to position the virtual product
            </div>
          </div>

          {/* RIGHT SIDE - Enhanced Controls */}
          <div style={{
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            border: '2px solid #dee2e6'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '25px',
              paddingBottom: '15px',
              borderBottom: '2px solid #007bff'
            }}>
              <h3 style={{ 
                color: '#007bff', 
                marginBottom: '10px',
                fontSize: '22px',
                fontWeight: 'bold'
              }}>
                🎯 {product.name}
              </h3>
              <div style={{ 
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#28a745',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
              }}>
                💰 ${calculatePrice()}
              </div>
            </div>

            {/* Enhanced View Angle */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                fontWeight: 'bold',
                fontSize: '16px',
                color: '#495057'
              }}>
                📐 View Angle:
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['front', 'side', '3/4'].map(angle => (
                  <button
                    key={angle}
                    onClick={() => setViewAngle(angle)}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      border: viewAngle === angle ? '3px solid #007bff' : '2px solid #ddd',
                      borderRadius: '12px',
                      backgroundColor: viewAngle === angle ? '#007bff' : '#fff',
                      color: viewAngle === angle ? '#fff' : '#333',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      transition: 'all 0.3s ease',
                      boxShadow: viewAngle === angle ? '0 4px 15px rgba(0,123,255,0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    {angle}
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Size Selection */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                fontWeight: 'bold',
                fontSize: '16px',
                color: '#495057'
              }}>
                📏 Size:
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {sizeOptions.map(size => (
                  <button
                    key={size.size}
                    onClick={() => setSelectedSize(size.size)}
                    style={{
                      padding: '10px 15px',
                      border: selectedSize === size.size ? '3px solid #28a745' : '2px solid #ddd',
                      borderRadius: '12px',
                      backgroundColor: selectedSize === size.size ? '#28a745' : '#fff',
                      color: selectedSize === size.size ? '#fff' : '#333',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease',
                      boxShadow: selectedSize === size.size ? '0 4px 15px rgba(40,167,69,0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Color Selection */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                fontWeight: 'bold',
                fontSize: '16px',
                color: '#495057'
              }}>
                🎨 Color: {selectedColor?.name}
              </label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      width: '50px',
                      height: '50px',
                      border: selectedColor?.name === color.name ? '4px solid #007bff' : '3px solid #ddd',
                      borderRadius: '50%',
                      backgroundColor: color.hex,
                      cursor: 'pointer',
                      boxShadow: selectedColor?.name === color.name ? '0 0 20px rgba(0,123,255,0.6)' : '0 4px 15px rgba(0,0,0,0.2)',
                      transition: 'all 0.3s ease',
                      transform: selectedColor?.name === color.name ? 'scale(1.1)' : 'scale(1)',
                      position: 'relative'
                    }}
                    title={color.name}
                    onMouseEnter={(e) => {
                      if (selectedColor?.name !== color.name) {
                        e.target.style.transform = 'scale(1.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedColor?.name !== color.name) {
                        e.target.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    {selectedColor?.name === color.name && (
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: color.name === 'White' || color.name === 'Yellow' ? '#333' : '#fff',
                        fontSize: '18px',
                        fontWeight: 'bold'
                      }}>
                        ✓
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Scale Control */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                fontWeight: 'bold',
                fontSize: '16px',
                color: '#495057'
              }}>
                🔍 Scale: {Math.round(scale * 100)}%
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#ddd',
                    borderRadius: '4px',
                    outline: 'none',
                    cursor: 'pointer',
                    appearance: 'none',
                    background: `linear-gradient(to right, #007bff 0%, #007bff ${((scale - 0.5) / 1.5) * 100}%, #ddd ${((scale - 0.5) / 1.5) * 100}%, #ddd 100%)`
                  }}
                />
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  color: '#666',
                  marginTop: '5px'
                }}>
                  <span>50%</span>
                  <span>100%</span>
                  <span>150%</span>
                  <span>200%</span>
                </div>
              </div>
            </div>

            {/* Enhanced AR Controls */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '25px' }}>
              <button
                onClick={startARScan}
                style={{
                  flex: 1,
                  padding: '15px',
                  background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 15px rgba(23,162,184,0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                🔍 AR Scan
              </button>
              <button
                onClick={() => setShowMannequin(!showMannequin)}
                style={{
                  flex: 1,
                  padding: '15px',
                  background: showMannequin ? 'linear-gradient(135deg, #28a745 0%, #1e7e34 100%)' : 'linear-gradient(135deg, #6c757d 0%, #5a6268 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  boxShadow: showMannequin ? '0 4px 15px rgba(40,167,69,0.3)' : '0 4px 15px rgba(108,117,125,0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {showMannequin ? '👤 Hide Model' : '👤 Show Model'}
              </button>
            </div>

            {/* Enhanced Shopping Actions */}
            <div style={{ 
              borderTop: '2px solid #007bff', 
              paddingTop: '20px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: '15px',
              padding: '20px',
              margin: '0 -10px'
            }}>
              <button
                style={{
                  width: '100%',
                  padding: '18px',
                  background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  boxShadow: '0 6px 20px rgba(0,123,255,0.4)',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => {
                  alert(`🛒 Added ${product.name} to cart!\n\n🎨 Color: ${selectedColor?.name}\n📏 Size: ${selectedSize}\n💰 Price: $${calculatePrice()}\n\n✨ Your customized product is ready!`);
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0,123,255,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 6px 20px rgba(0,123,255,0.4)';
                }}
              >
                🛒 Add to Cart - ${calculatePrice()}
              </button>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'linear-gradient(135deg, #6c757d 0%, #5a6268 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 15px rgba(108,117,125,0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  💾 Save Look
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'linear-gradient(135deg, #6c757d 0%, #5a6268 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 15px rgba(108,117,125,0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  📤 Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualARTryOn;
