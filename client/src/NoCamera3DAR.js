import React, { useState, useRef, useEffect } from 'react';

const NoCamera3DAR = ({ product, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [scale, setScale] = useState(1);
  const [lightingMode, setLightingMode] = useState('natural');
  const [background, setBackground] = useState('studio');
  const [autoRotate, setAutoRotate] = useState(false);
  const [showShadow, setShowShadow] = useState(true);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Enhanced color palette
  const defaultColors = [
    { name: 'Black', hex: '#000000', rgb: [0, 0, 0] },
    { name: 'White', hex: '#ffffff', rgb: [255, 255, 255] },
    { name: 'Red', hex: '#ff0000', rgb: [255, 0, 0] },
    { name: 'Blue', hex: '#0066cc', rgb: [0, 102, 204] },
    { name: 'Green', hex: '#00cc66', rgb: [0, 204, 102] },
    { name: 'Yellow', hex: '#ffcc00', rgb: [255, 204, 0] },
    { name: 'Purple', hex: '#9900cc', rgb: [153, 0, 204] },
    { name: 'Orange', hex: '#ff6600', rgb: [255, 102, 0] },
    { name: 'Pink', hex: '#ff3399', rgb: [255, 51, 153] },
    { name: 'Gray', hex: '#666666', rgb: [102, 102, 102] },
    { name: 'Brown', hex: '#996633', rgb: [153, 102, 51] },
    { name: 'Gold', hex: '#ffd700', rgb: [255, 215, 0] }
  ];

  const sizeOptions = [
    { size: 'XS', scale: 0.7 },
    { size: 'S', scale: 0.85 },
    { size: 'M', scale: 1.0 },
    { size: 'L', scale: 1.15 },
    { size: 'XL', scale: 1.3 },
    { size: 'XXL', scale: 1.45 }
  ];

  const lightingModes = {
    natural: { ambient: 0.4, directional: 0.6, color: [255, 255, 255] },
    dramatic: { ambient: 0.2, directional: 0.8, color: [255, 240, 200] },
    warm: { ambient: 0.5, directional: 0.5, color: [255, 220, 180] },
    cool: { ambient: 0.3, directional: 0.7, color: [200, 220, 255] },
    neon: { ambient: 0.6, directional: 0.4, color: [255, 0, 255] }
  };

  const backgrounds = {
    studio: { color: '#f8f8f8', gradient: true },
    room: { color: '#e8e0d6', gradient: true },
    gradient: { color: '#4facfe', gradient: true },
    dark: { color: '#2c2c2c', gradient: false },
    white: { color: '#ffffff', gradient: false }
  };

  // Parse product data
  let colors;
  try {
    colors = product.colors ? (typeof product.colors === 'string' ? JSON.parse(product.colors) : product.colors) : defaultColors;
  } catch (error) {
    colors = defaultColors;
  }

  useEffect(() => {
    if (colors.length > 0) setSelectedColor(colors[0]);
  }, []);

  useEffect(() => {
    const animate = () => {
      if (autoRotate) {
        setRotationY(prev => (prev + 1) % 360);
      }
      draw3DProduct();
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [selectedColor, selectedSize, rotationX, rotationY, scale, lightingMode, background, showShadow, autoRotate]);

  const draw3DProduct = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    drawBackground(ctx);

    // Draw 3D product
    draw3DProductModel(ctx);

    // Draw shadow if enabled
    if (showShadow) {
      drawShadow(ctx);
    }

    // Draw lighting effects
    drawLighting(ctx);
  };

  const drawBackground = (ctx) => {
    const bg = backgrounds[background];
    
    if (bg.gradient) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 500);
      if (background === 'studio') {
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(1, '#f0f0f0');
      } else if (background === 'room') {
        gradient.addColorStop(0, '#f5f5dc');
        gradient.addColorStop(1, '#d2b48c');
      } else if (background === 'gradient') {
        gradient.addColorStop(0, '#4facfe');
        gradient.addColorStop(1, '#00f2fe');
      }
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = bg.color;
    }
    
    ctx.fillRect(0, 0, 500, 500);

    // Add background texture
    if (background === 'room') {
      // Add subtle texture
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      for (let i = 0; i < 20; i++) {
        ctx.fillRect(Math.random() * 500, Math.random() * 500, 2, 2);
      }
    }
  };

  const draw3DProductModel = (ctx) => {
    const centerX = 250;
    const centerY = 250;
    const currentScale = scale * (sizeOptions.find(s => s.size === selectedSize)?.scale || 1);
    const lighting = lightingModes[lightingMode];
    
    // Get product color
    const productColor = selectedColor?.rgb || [102, 102, 102];
    const baseColor = applyLighting(productColor, lighting);
    
    // Save context for transformations
    ctx.save();
    
    // Apply 3D transformations
    ctx.translate(centerX, centerY);
    ctx.scale(currentScale, currentScale);
    
    // Simulate 3D rotation effects
    const rotRadX = (rotationX * Math.PI) / 180;
    const rotRadY = (rotationY * Math.PI) / 180;
    
    // Draw 3D product based on type
    const productType = getProductType(product);
    
    switch (productType) {
      case 'sunglasses':
        draw3DSunglasses(ctx, baseColor, rotRadX, rotRadY);
        break;
      case 'watch':
        draw3DWatch(ctx, baseColor, rotRadX, rotRadY);
        break;
      case 'shirt':
        draw3DShirt(ctx, baseColor, rotRadX, rotRadY);
        break;
      case 'jacket':
        draw3DJacket(ctx, baseColor, rotRadX, rotRadY);
        break;
      case 'shoes':
        draw3DShoes(ctx, baseColor, rotRadX, rotRadY);
        break;
      case 'hat':
        draw3DHat(ctx, baseColor, rotRadX, rotRadY);
        break;
      default:
        draw3DGeneric(ctx, baseColor, rotRadX, rotRadY);
    }
    
    ctx.restore();
  };

  const applyLighting = (rgb, lighting) => {
    const [r, g, b] = rgb;
    const [lr, lg, lb] = lighting.color;
    const intensity = lighting.ambient + lighting.directional;
    
    return [
      Math.min(255, Math.max(0, (r * intensity * lr) / 255)),
      Math.min(255, Math.max(0, (g * intensity * lg) / 255)),
      Math.min(255, Math.max(0, (b * intensity * lb) / 255))
    ];
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

  const draw3DSunglasses = (ctx, color, rotX, rotY) => {
    const [r, g, b] = color;
    const baseColor = `rgb(${r}, ${g}, ${b})`;
    const shadowColor = `rgb(${r * 0.7}, ${g * 0.7}, ${b * 0.7})`;
    
    // Apply rotation effects
    const perspective = Math.cos(rotY) * 0.8 + 0.2;
    const skew = Math.sin(rotY) * 0.3;
    
    ctx.save();
    ctx.transform(perspective, skew * 0.2, 0, 1, 0, rotX * 0.5);
    
    // Left lens
    ctx.fillStyle = baseColor;
    ctx.strokeStyle = shadowColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(-40, 0, 35, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Right lens
    ctx.beginPath();
    ctx.ellipse(40, 0, 35, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Bridge
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(10, 0);
    ctx.lineWidth = 4;
    ctx.stroke();
    
    // Temples with 3D effect
    ctx.beginPath();
    ctx.moveTo(-75, 0);
    ctx.lineTo(-120, 10);
    ctx.moveTo(75, 0);
    ctx.lineTo(120, 10);
    ctx.stroke();
    
    // Lens reflections
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.ellipse(-50, -8, 10, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(30, -8, 10, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  };

  const draw3DWatch = (ctx, color, rotX, rotY) => {
    const [r, g, b] = color;
    const baseColor = `rgb(${r}, ${g}, ${b})`;
    const shadowColor = `rgb(${r * 0.6}, ${g * 0.6}, ${b * 0.6})`;
    
    // Apply rotation effects
    const perspective = Math.cos(rotY) * 0.9 + 0.1;
    const skew = Math.sin(rotY) * 0.2;
    
    ctx.save();
    ctx.transform(perspective, skew * 0.1, 0, 1, 0, rotX * 0.3);
    
    // Watch face
    ctx.fillStyle = baseColor;
    ctx.strokeStyle = shadowColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(-30, -35, 60, 70, 10);
    ctx.fill();
    ctx.stroke();
    
    // Watch band
    ctx.fillStyle = shadowColor;
    ctx.beginPath();
    ctx.roundRect(-15, -55, 30, 20, 5);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(-15, 35, 30, 20, 5);
    ctx.fill();
    
    // Watch screen
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.roundRect(-20, -25, 40, 50, 5);
    ctx.fill();
    
    // Digital display
    ctx.fillStyle = '#00ff00';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('12:34', 0, 5);
    
    // Buttons
    ctx.fillStyle = shadowColor;
    ctx.beginPath();
    ctx.roundRect(30, -10, 8, 20, 2);
    ctx.fill();
    
    ctx.restore();
  };

  const draw3DShirt = (ctx, color, rotX, rotY) => {
    const [r, g, b] = color;
    const baseColor = `rgb(${r}, ${g}, ${b})`;
    const shadowColor = `rgb(${r * 0.7}, ${g * 0.7}, ${b * 0.7})`;
    
    // Apply rotation effects
    const perspective = Math.cos(rotY) * 0.8 + 0.2;
    const skew = Math.sin(rotY) * 0.3;
    
    ctx.save();
    ctx.transform(perspective, skew * 0.1, 0, 1, 0, rotX * 0.5);
    
    // Shirt body
    ctx.fillStyle = baseColor;
    ctx.strokeStyle = shadowColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(-60, -40, 120, 100, 10);
    ctx.fill();
    ctx.stroke();
    
    // Sleeves
    ctx.beginPath();
    ctx.roundRect(-90, -35, 30, 50, 8);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.roundRect(60, -35, 30, 50, 8);
    ctx.fill();
    ctx.stroke();
    
    // Collar
    ctx.strokeStyle = shadowColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-20, -40);
    ctx.lineTo(0, -50);
    ctx.lineTo(20, -40);
    ctx.stroke();
    
    // Fabric texture
    ctx.strokeStyle = shadowColor;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;
    for (let i = 0; i < 10; i++) {
      ctx.beginPath();
      ctx.moveTo(-50, -30 + i * 8);
      ctx.lineTo(50, -30 + i * 8);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    
    ctx.restore();
  };

  const draw3DJacket = (ctx, color, rotX, rotY) => {
    const [r, g, b] = color;
    const baseColor = `rgb(${r}, ${g}, ${b})`;
    const shadowColor = `rgb(${r * 0.6}, ${g * 0.6}, ${b * 0.6})`;
    
    // Apply rotation effects
    const perspective = Math.cos(rotY) * 0.8 + 0.2;
    const skew = Math.sin(rotY) * 0.3;
    
    ctx.save();
    ctx.transform(perspective, skew * 0.1, 0, 1, 0, rotX * 0.5);
    
    // Jacket body
    ctx.fillStyle = baseColor;
    ctx.strokeStyle = shadowColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(-65, -45, 130, 110, 10);
    ctx.fill();
    ctx.stroke();
    
    // Sleeves
    ctx.beginPath();
    ctx.roundRect(-100, -40, 35, 60, 8);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.roundRect(65, -40, 35, 60, 8);
    ctx.fill();
    ctx.stroke();
    
    // Collar
    ctx.strokeStyle = shadowColor;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-25, -45);
    ctx.lineTo(0, -55);
    ctx.lineTo(25, -45);
    ctx.stroke();
    
    // Zipper
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, -40);
    ctx.lineTo(0, 60);
    ctx.stroke();
    
    // Zipper teeth
    ctx.strokeStyle = '#aaaaaa';
    ctx.lineWidth = 2;
    for (let i = -35; i < 60; i += 5) {
      ctx.beginPath();
      ctx.moveTo(-3, i);
      ctx.lineTo(3, i);
      ctx.stroke();
    }
    
    // Pockets
    ctx.fillStyle = shadowColor;
    ctx.beginPath();
    ctx.roundRect(-45, 10, 25, 20, 5);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(20, 10, 25, 20, 5);
    ctx.fill();
    
    ctx.restore();
  };

  const draw3DShoes = (ctx, color, rotX, rotY) => {
    const [r, g, b] = color;
    const baseColor = `rgb(${r}, ${g}, ${b})`;
    const shadowColor = `rgb(${r * 0.6}, ${g * 0.6}, ${b * 0.6})`;
    
    // Apply rotation effects
    const perspective = Math.cos(rotY) * 0.9 + 0.1;
    const skew = Math.sin(rotY) * 0.2;
    
    ctx.save();
    ctx.transform(perspective, skew * 0.1, 0, 1, 0, rotX * 0.3);
    
    // Left shoe
    ctx.fillStyle = baseColor;
    ctx.strokeStyle = shadowColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(-40, 20, 35, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Right shoe
    ctx.beginPath();
    ctx.ellipse(40, 20, 35, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Shoe tops
    ctx.fillStyle = shadowColor;
    ctx.beginPath();
    ctx.ellipse(-40, 10, 30, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(40, 10, 30, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Laces
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
      const y = 5 + i * 5;
      ctx.beginPath();
      ctx.moveTo(-55, y);
      ctx.lineTo(-25, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(25, y);
      ctx.lineTo(55, y);
      ctx.stroke();
    }
    
    // Sole details
    ctx.strokeStyle = shadowColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(-40, 25, 40, 18, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(40, 25, 40, 18, 0, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.restore();
  };

  const draw3DHat = (ctx, color, rotX, rotY) => {
    const [r, g, b] = color;
    const baseColor = `rgb(${r}, ${g}, ${b})`;
    const shadowColor = `rgb(${r * 0.7}, ${g * 0.7}, ${b * 0.7})`;
    
    // Apply rotation effects
    const perspective = Math.cos(rotY) * 0.8 + 0.2;
    const skew = Math.sin(rotY) * 0.3;
    
    ctx.save();
    ctx.transform(perspective, skew * 0.1, 0, 1, 0, rotX * 0.5);
    
    // Hat crown
    ctx.fillStyle = baseColor;
    ctx.strokeStyle = shadowColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, -20, 50, 25, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Hat brim
    ctx.fillStyle = shadowColor;
    ctx.beginPath();
    ctx.ellipse(0, 0, 70, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Hat band
    ctx.fillStyle = '#333333';
    ctx.beginPath();
    ctx.ellipse(0, -10, 52, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  };

  const draw3DGeneric = (ctx, color, rotX, rotY) => {
    const [r, g, b] = color;
    const baseColor = `rgb(${r}, ${g}, ${b})`;
    const shadowColor = `rgb(${r * 0.7}, ${g * 0.7}, ${b * 0.7})`;
    
    // Apply rotation effects
    const perspective = Math.cos(rotY) * 0.8 + 0.2;
    const skew = Math.sin(rotY) * 0.3;
    
    ctx.save();
    ctx.transform(perspective, skew * 0.1, 0, 1, 0, rotX * 0.5);
    
    // Generic 3D box
    ctx.fillStyle = baseColor;
    ctx.strokeStyle = shadowColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(-40, -40, 80, 80, 10);
    ctx.fill();
    ctx.stroke();
    
    // 3D depth effect
    ctx.fillStyle = shadowColor;
    ctx.beginPath();
    ctx.moveTo(40, -40);
    ctx.lineTo(50, -50);
    ctx.lineTo(50, 30);
    ctx.lineTo(40, 40);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(-40, -40);
    ctx.lineTo(-30, -50);
    ctx.lineTo(50, -50);
    ctx.lineTo(40, -40);
    ctx.fill();
    
    // Product emoji
    ctx.fillStyle = '#ffffff';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(product.emoji || '📦', 0, 10);
    
    ctx.restore();
  };

  const drawShadow = (ctx) => {
    const shadowSize = 100 * scale;
    const shadowOpacity = 0.3;
    
    ctx.save();
    ctx.translate(250, 450);
    ctx.scale(1, 0.3);
    
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, shadowSize);
    gradient.addColorStop(0, `rgba(0, 0, 0, ${shadowOpacity})`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, shadowSize, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  };

  const drawLighting = (ctx) => {
    const lighting = lightingModes[lightingMode];
    
    if (lighting.directional > 0.5) {
      // Add highlight effect
      ctx.save();
      ctx.globalCompositeOperation = 'overlay';
      ctx.fillStyle = `rgba(${lighting.color.join(',')}, 0.1)`;
      ctx.fillRect(0, 0, 500, 200);
      ctx.restore();
    }
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
        maxWidth: '1300px',
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
          borderBottom: '3px solid #28a745',
          paddingBottom: '20px',
          background: 'linear-gradient(135deg, #28a745 0%, #1e7e34 100%)',
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
              🎮 3D AR Experience - Ultra Realistic
            </h2>
            <p style={{
              margin: '5px 0 0 0',
              fontSize: '16px',
              opacity: 0.9
            }}>
              Professional 3D Rendering with Real-time Customization
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
              border: '4px solid #28a745',
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
                  e.target.src = 'https://via.placeholder.com/500x500/ffffff/333333?text=Ultra+3D+Product';
                }}
              />
              {/* Enhanced Product Badge */}
              <div style={{
                position: 'absolute',
                top: '15px',
                left: '15px',
                background: 'linear-gradient(135deg, #28a745 0%, #1e7e34 100%)',
                color: 'white',
                padding: '10px 15px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 'bold',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 15px rgba(40,167,69,0.3)'
              }}>
                🎮 Ultra 3D View
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
                background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                color: 'white',
                padding: '10px 15px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(0,123,255,0.3)'
              }}>
                💰 ${calculatePrice()}
              </div>
            </div>

            {/* Enhanced 3D Canvas */}
            <div style={{
              border: '3px solid #007bff',
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: 'rgba(0,123,255,0.9)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 'bold',
                zIndex: 10
              }}>
                🎮 Interactive 3D Model
              </div>
              <canvas 
                ref={canvasRef}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: '600px',
                  display: 'block',
                  borderRadius: '20px'
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
              🎯 Professional 3D Rendering - No Camera Required
            </div>
          </div>

          {/* Controls */}
          <div>
            <h3 style={{ color: '#333', marginBottom: '15px' }}>
              {product.name}
            </h3>
            <div style={{ marginBottom: '20px' }}>
              <strong>Price: ${calculatePrice()}</strong>
            </div>

            {/* Rotation Controls */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Rotation X: {rotationX}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={rotationX}
                onChange={(e) => setRotationX(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  marginBottom: '10px'
                }}
              />
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Rotation Y: {rotationY}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={rotationY}
                onChange={(e) => setRotationY(parseInt(e.target.value))}
                style={{
                  width: '100%'
                }}
              />
            </div>

            {/* Scale Control */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Scale: {Math.round(scale * 100)}%
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                style={{
                  width: '100%'
                }}
              />
            </div>

            {/* Size Selection */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Size:
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {sizeOptions.map(size => (
                  <button
                    key={size.size}
                    onClick={() => setSelectedSize(size.size)}
                    style={{
                      padding: '8px 12px',
                      border: selectedSize === size.size ? '2px solid #28a745' : '2px solid #ddd',
                      borderRadius: '8px',
                      backgroundColor: selectedSize === size.size ? '#28a745' : '#fff',
                      color: selectedSize === size.size ? '#fff' : '#333',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Color: {selectedColor?.name}
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      width: '40px',
                      height: '40px',
                      border: selectedColor?.name === color.name ? '3px solid #007bff' : '2px solid #ddd',
                      borderRadius: '50%',
                      backgroundColor: color.hex,
                      cursor: 'pointer',
                      boxShadow: selectedColor?.name === color.name ? '0 0 10px rgba(0,123,255,0.5)' : 'none'
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Lighting Mode */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Lighting:
              </label>
              <select
                value={lightingMode}
                onChange={(e) => setLightingMode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '8px',
                  border: '2px solid #ddd'
                }}
              >
                <option value="natural">Natural</option>
                <option value="dramatic">Dramatic</option>
                <option value="warm">Warm</option>
                <option value="cool">Cool</option>
                <option value="neon">Neon</option>
              </select>
            </div>

            {/* Background */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Background:
              </label>
              <select
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '8px',
                  border: '2px solid #ddd'
                }}
              >
                <option value="studio">Studio</option>
                <option value="room">Room</option>
                <option value="gradient">Gradient</option>
                <option value="dark">Dark</option>
                <option value="white">White</option>
              </select>
            </div>

            {/* Toggle Controls */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: autoRotate ? '#28a745' : '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                {autoRotate ? '⏸️ Stop Rotation' : '🔄 Auto Rotate'}
              </button>
              <button
                onClick={() => setShowShadow(!showShadow)}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: showShadow ? '#28a745' : '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                {showShadow ? '🌑 Hide Shadow' : '🌑 Show Shadow'}
              </button>
            </div>

            {/* Shopping Actions */}
            <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
              <button
                style={{
                  width: '100%',
                  padding: '15px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginBottom: '10px'
                }}
                onClick={() => {
                  alert(`Added ${product.name} to cart! Color: ${selectedColor?.name}, Size: ${selectedSize}, Price: $${calculatePrice()}`);
                }}
              >
                🛒 Add to Cart - ${calculatePrice()}
              </button>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  style={{
                    flex: 1,
                    padding: '10px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  💾 Save
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: '10px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px'
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

export default NoCamera3DAR;
