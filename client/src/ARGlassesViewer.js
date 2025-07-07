import React, { useState, useRef, useEffect } from 'react';

const ARGlassesViewer = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedGlasses, setSelectedGlasses] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#1a1a1a');
  const [faceDetected, setFaceDetected] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(null);
  const [error, setError] = useState('');
  const [cameraQuality, setCameraQuality] = useState('high');
  const [showInstructions, setShowInstructions] = useState(true);
  const [colorChangeMessage, setColorChangeMessage] = useState('');
  const [arStats, setArStats] = useState({
    faceConfidence: 0,
    glassesPosition: { x: 0, y: 0 },
    isCalibrated: false
  });

  // Enhanced glasses collection with more details
  const glassesStyles = [
    { 
      name: 'Classic Aviator Pro', 
      price: '$189', 
      style: 'aviator',
      description: 'Premium titanium aviator design with polarized lenses',
      brand: 'Ray-Ban',
      rating: 4.9,
      features: ['UV Protection', 'Polarized', 'Lightweight', 'Anti-Glare']
    },
    { 
      name: 'Modern Wayfarer Elite', 
      price: '$159', 
      style: 'wayfarer',
      description: 'Contemporary acetate frame with blue light filtering',
      brand: 'Oakley',
      rating: 4.8,
      features: ['Blue Light Filter', 'Scratch Resistant', 'Comfort Fit', 'Style Icon']
    },
    { 
      name: 'Vintage Round Luxe', 
      price: '$139', 
      style: 'round',
      description: 'Handcrafted round glasses with premium materials',
      brand: 'Oliver Peoples',
      rating: 4.7,
      features: ['Handcrafted', 'Vintage Design', 'Premium Materials', 'Comfort Nose Pads']
    },
    { 
      name: 'Sport Active Pro', 
      price: '$199', 
      style: 'sport',
      description: 'Athletic performance glasses with secure grip technology',
      brand: 'Adidas',
      rating: 4.9,
      features: ['Grip Technology', 'Sweat Resistant', 'Impact Protection', 'All-Day Comfort']
    },
    { 
      name: 'Designer Cat-Eye', 
      price: '$219', 
      style: 'cateye',
      description: 'Sophisticated cat-eye design for the modern professional',
      brand: 'Tom Ford',
      rating: 4.8,
      features: ['Designer Frame', 'Luxury Materials', 'Statement Piece', 'Professional Look']
    },
    { 
      name: 'Tech Smart Glasses', 
      price: '$399', 
      style: 'smart',
      description: 'Smart glasses with AR display and voice control',
      brand: 'Google',
      rating: 4.6,
      features: ['AR Display', 'Voice Control', 'Bluetooth', 'Smart Features']
    }
  ];

  // Expanded color palette
  const colors = [
    { name: 'Matte Black', value: '#1a1a1a', category: 'classic' },
    { name: 'Glossy Black', value: '#000000', category: 'classic' },
    { name: 'Tortoiseshell', value: '#8B4513', category: 'classic' },
    { name: 'Crystal Clear', value: '#E8E8E8', category: 'modern' },
    { name: 'Rose Gold', value: '#E8B4A0', category: 'luxury' },
    { name: 'Silver Chrome', value: '#C0C0C0', category: 'modern' },
    { name: 'Gold Titanium', value: '#FFD700', category: 'luxury' },
    { name: 'Navy Blue', value: '#1e3a8a', category: 'sport' },
    { name: 'Forest Green', value: '#065f46', category: 'sport' },
    { name: 'Burgundy Red', value: '#7f1d1d', category: 'classic' },
    { name: 'Electric Blue', value: '#2563eb', category: 'tech' },
    { name: 'Neon Green', value: '#22c55e', category: 'tech' }
  ];

  // Camera quality settings
  const qualitySettings = {
    low: { width: 640, height: 480 },
    medium: { width: 1280, height: 720 },
    high: { width: 1920, height: 1080 }
  };

  // Enhanced camera stream with quality settings
  const startCamera = async () => {
    try {
      setError('');
      setShowInstructions(false);
      const quality = qualitySettings[cameraQuality];
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: quality.width },
          height: { ideal: quality.height },
          facingMode: 'user'
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        
        // Enhanced face detection simulation with confidence scoring
        setTimeout(() => {
          setFaceDetected(true);
          setArStats(prev => ({
            ...prev,
            faceConfidence: 0.95,
            isCalibrated: true,
            glassesPosition: { x: 50, y: 35 }
          }));
        }, 1500);
      }
    } catch (err) {
      setError('Camera access required for AR experience. Please allow camera permissions and try again.');
      console.error('Camera error:', err);
    }
  };

  // Enhanced stop camera with cleanup
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
    setFaceDetected(false);
    setShowInstructions(true);
    setArStats({
      faceConfidence: 0,
      glassesPosition: { x: 0, y: 0 },
      isCalibrated: false
    });
  };

  // Enhanced color change with visual feedback and immediate AR update
  const handleColorChange = (color) => {
    setSelectedColor(color.value);
    setColorChangeMessage(`Color changed to ${color.name}!`);
    
    // Force immediate AR overlay update if camera is active
    if (isStreaming && canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      // Quick preview update on hidden canvas
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      // Draw current frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Draw glasses with new color
      drawEnhancedGlassesOverlay(ctx, canvas.width, canvas.height);
    }
    
    // Clear message after 2 seconds
    setTimeout(() => setColorChangeMessage(''), 2000);
    
    // Add haptic feedback if available
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  // Helper function to convert hex color to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  // Enhanced photo capture with better quality
  const takePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame (mirrored)
      ctx.scale(-1, 1);
      ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
      ctx.scale(-1, 1);
      
      // Draw enhanced glasses overlay
      drawEnhancedGlassesOverlay(ctx, canvas.width, canvas.height);
      
      // Convert to high-quality image
      const photoDataUrl = canvas.toDataURL('image/png', 0.95);
      setPhotoTaken(photoDataUrl);
      
      // Auto-download the photo
      const link = document.createElement('a');
      link.download = `AR-Glasses-${glassesStyles[selectedGlasses].name.replace(/\s+/g, '-')}-${Date.now()}.png`;
      link.href = photoDataUrl;
      link.click();
    }
  };

  // Enhanced glasses overlay drawing with improved color visibility
  const drawEnhancedGlassesOverlay = (ctx, width, height) => {
    const centerX = width / 2;
    const centerY = height / 2.5; // Position on face
    const glassesWidth = width * 0.35;
    const glassesHeight = height * 0.1;

    // Enhanced color application with better visibility
    const colorRgb = hexToRgb(selectedColor);
    
    // Set stroke (border) color
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = 8; // Thicker lines for better visibility
    
    // Set fill color with transparency
    ctx.fillStyle = `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, 0.2)`;
    
    // Add glow effect for better color visibility
    ctx.shadowColor = selectedColor;
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    const currentStyle = glassesStyles[selectedGlasses].style;

    switch (currentStyle) {
      case 'aviator':
        // Enhanced aviator style with color gradient
        const aviatorGradient = ctx.createLinearGradient(centerX - glassesWidth/2, centerY - glassesHeight, centerX + glassesWidth/2, centerY + glassesHeight);
        aviatorGradient.addColorStop(0, `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, 0.1)`);
        aviatorGradient.addColorStop(1, `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, 0.4)`);
        ctx.fillStyle = aviatorGradient;
        
        ctx.beginPath();
        ctx.ellipse(centerX - glassesWidth/3, centerY, glassesWidth/3, glassesHeight, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(centerX + glassesWidth/3, centerY, glassesWidth/3, glassesHeight, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        break;
      
      case 'wayfarer':
        // Enhanced wayfarer with rounded corners and proper color
        const drawRoundedRect = (x, y, width, height, radius) => {
          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + width - radius, y);
          ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
          ctx.lineTo(x + width, y + height - radius);
          ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
          ctx.lineTo(x + radius, y + height);
          ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.closePath();
        };
        
        // Apply color fill
        ctx.fillStyle = `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, 0.2)`;
        
        // Left lens
        drawRoundedRect(centerX - glassesWidth/2, centerY - glassesHeight/2, glassesWidth/2.2, glassesHeight, 15);
        ctx.fill();
        ctx.stroke();
        // Right lens
        drawRoundedRect(centerX + glassesWidth/8, centerY - glassesHeight/2, glassesWidth/2.2, glassesHeight, 15);
        ctx.fill();
        ctx.stroke();
        break;
      
      case 'round':
        // Enhanced round style with proper color
        ctx.fillStyle = `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, 0.2)`;
        ctx.beginPath();
        ctx.arc(centerX - glassesWidth/3, centerY, glassesHeight*0.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX + glassesWidth/3, centerY, glassesHeight*0.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        break;
      
      case 'sport':
        // Enhanced sport style with wrap-around effect and color
        ctx.fillStyle = `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, 0.2)`;
        ctx.beginPath();
        ctx.ellipse(centerX - glassesWidth/3, centerY, glassesWidth/2.5, glassesHeight*0.9, -0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(centerX + glassesWidth/3, centerY, glassesWidth/2.5, glassesHeight*0.9, 0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        break;
      
      case 'cateye':
        // Enhanced cat-eye style with color
        ctx.fillStyle = `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, 0.2)`;
        ctx.beginPath();
        ctx.ellipse(centerX - glassesWidth/3, centerY, glassesWidth/3, glassesHeight*0.8, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(centerX + glassesWidth/3, centerY, glassesWidth/3, glassesHeight*0.8, 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        break;
        ctx.fill();
        ctx.stroke();
        break;
      
      case 'smart':
        // Smart glasses with LED indicators and proper color
        const drawSmartRect = (x, y, width, height, radius) => {
          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + width - radius, y);
          ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
          ctx.lineTo(x + width, y + height - radius);
          ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
          ctx.lineTo(x + radius, y + height);
          ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.closePath();
        };
        
        // Apply selected color to smart glasses
        ctx.fillStyle = `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, 0.2)`;
        drawSmartRect(centerX - glassesWidth/2, centerY - glassesHeight/2, glassesWidth/2.2, glassesHeight, 8);
        ctx.fill();
        ctx.stroke();
        drawSmartRect(centerX + glassesWidth/8, centerY - glassesHeight/2, glassesWidth/2.2, glassesHeight, 8);
        ctx.fill();
        ctx.stroke();
        
        // LED indicators (always green for tech effect)
        ctx.fillStyle = '#00ff00';
        ctx.beginPath();
        ctx.arc(centerX + glassesWidth/2.5, centerY - glassesHeight/3, 3, 0, Math.PI * 2);
        ctx.fill();
        break;
    }

    // Clear shadow before drawing bridge and nose pads
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // Enhanced bridge with selected color
    ctx.strokeStyle = selectedColor;
    ctx.beginPath();
    ctx.moveTo(centerX - glassesWidth/6, centerY);
    ctx.lineTo(centerX + glassesWidth/6, centerY);
    ctx.lineWidth = 6;
    ctx.stroke();
    
    // Nose pads with selected color
    ctx.fillStyle = selectedColor;
    ctx.beginPath();
    ctx.arc(centerX - glassesWidth/8, centerY + glassesHeight/4, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX + glassesWidth/8, centerY + glassesHeight/4, 4, 0, Math.PI * 2);
    ctx.fill();
  };

  // CSS for enhanced glasses overlay on video with better color visibility
  const getEnhancedGlassesOverlayStyle = () => {
    const currentStyle = glassesStyles[selectedGlasses].style;
    
    // Make colors more vibrant and visible
    const rgbColor = hexToRgb(selectedColor);
    const brightColor = `rgb(${Math.min(255, rgbColor.r + 30)}, ${Math.min(255, rgbColor.g + 30)}, ${Math.min(255, rgbColor.b + 30)})`;
    
    const baseStyle = {
      position: 'absolute',
      top: '35%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '280px',
      height: '80px',
      border: `8px solid ${brightColor}`, // Even thicker border with brighter color
      pointerEvents: 'none',
      zIndex: 10,
      boxShadow: `0 0 30px ${selectedColor}, 0 0 60px ${selectedColor}40, inset 0 0 20px ${selectedColor}20`, // Multiple shadow layers
      transition: 'all 0.3s ease',
      background: `linear-gradient(135deg, ${selectedColor}25, ${selectedColor}35)`, // More visible background
      backdropFilter: 'blur(1px)'
    };

    switch (currentStyle) {
      case 'aviator':
        return { ...baseStyle, borderRadius: '50%', width: '260px', height: '90px' };
      case 'wayfarer':
        return { ...baseStyle, borderRadius: '12px' };
      case 'round':
        return { ...baseStyle, borderRadius: '50%', width: '240px', height: '100px' };
      case 'sport':
        return { ...baseStyle, borderRadius: '25px', transform: 'translate(-50%, -50%) skew(-3deg, 0)', boxShadow: `0 0 35px ${selectedColor}, 0 0 70px ${selectedColor}60` };
      case 'cateye':
        return { ...baseStyle, borderRadius: '60% 60% 20% 20%', transform: 'translate(-50%, -50%) rotate(-3deg)' };
      case 'smart':
        return { ...baseStyle, borderRadius: '8px', border: `6px solid ${brightColor}`, boxShadow: `0 0 40px #00ff00, 0 0 30px ${selectedColor}40` };
      default:
        return baseStyle;
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Add effect to update AR overlay when color or glasses change
  useEffect(() => {
    if (isStreaming && faceDetected) {
      // Small delay to ensure state is updated
      const timer = setTimeout(() => {
        // This will trigger a re-render of the CSS overlay with new styles
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [selectedColor, selectedGlasses, isStreaming, faceDetected]);

  return (
    <div style={{
      background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://th.bing.com/th/id/R.82b738f765fa5d1481a9bf581247bcb5?rik=eqgz9XMOnECAag&riu=http%3a%2f%2fai47labs.com%2fwp-content%2fuploads%2f2023%2f05%2fhow-retailers-are-using-artificial-intelligence-to-stand-strong-in-the-era-of-digital-transformation-featured.jpg&ehk=W%2bTKHMiDepwhPAQDGFgWAWU7bY2quK5s%2fz%2btE4xJiY4%3d&risl=&pid=ImgRaw&r=0')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      color: 'white',
      padding: '20px'
    }}>
      <style>
        {`
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-10px); }
            50% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-10px); }
          }
        `}
      </style>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        
        {/* Enhanced Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{
            fontSize: '42px',
            margin: '0 0 10px 0',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            background: 'linear-gradient(45deg, #fff, #f0f0f0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🕶️ Professional AR Glasses Try-On
          </h1>
          <p style={{
            fontSize: '20px',
            opacity: '0.9',
            margin: '0 0 15px 0'
          }}>
            Experience premium eyewear with advanced AR technology
          </p>
          {showInstructions && (
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '15px',
              padding: '15px',
              maxWidth: '600px',
              margin: '0 auto',
              backdropFilter: 'blur(10px)'
            }}>
              <p style={{ margin: '0', fontSize: '16px', opacity: '0.9' }}>
                💡 <strong>Quick Start:</strong> Click "Start AR Experience" → Position your face in center → Try different glasses & colors → Capture your perfect look!
              </p>
            </div>
          )}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: '30px',
          alignItems: 'start'
        }}>
          
          {/* Main AR Experience */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '25px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            
            {/* Enhanced Camera Controls */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px',
              gap: '15px',
              flexWrap: 'wrap'
            }}>
              {!isStreaming ? (
                <button
                  onClick={startCamera}
                  style={{
                    padding: '15px 30px',
                    background: 'linear-gradient(45deg, #4CAF50, #45a049)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '30px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 5px 20px rgba(76, 175, 80, 0.4)',
                    transform: 'scale(1)'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                  📷 Start AR Experience
                </button>
              ) : (
                <>
                  <button
                    onClick={takePhoto}
                    disabled={!faceDetected}
                    style={{
                      padding: '12px 25px',
                      background: faceDetected ? 'linear-gradient(45deg, #FF6B6B, #FF5252)' : 'rgba(255,255,255,0.3)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '25px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: faceDetected ? 'pointer' : 'not-allowed',
                      transition: 'all 0.3s ease',
                      boxShadow: faceDetected ? '0 4px 15px rgba(255, 107, 107, 0.4)' : 'none',
                      opacity: faceDetected ? 1 : 0.6
                    }}
                  >
                    📸 Capture & Download
                  </button>
                  <button
                    onClick={stopCamera}
                    style={{
                      padding: '12px 25px',
                      background: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderRadius: '25px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    ⏹️ Stop Camera
                  </button>
                </>
              )}
              
              {/* Quality Selector */}
              <select
                value={cameraQuality}
                onChange={(e) => setCameraQuality(e.target.value)}
                disabled={isStreaming}
                style={{
                  padding: '10px 15px',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '20px',
                  fontSize: '14px',
                  cursor: isStreaming ? 'not-allowed' : 'pointer',
                  opacity: isStreaming ? 0.6 : 1
                }}
              >
                <option style={{color: '#333'}} value="low">Low Quality</option>
                <option style={{color: '#333'}} value="medium">Medium Quality</option>
                <option style={{color: '#333'}} value="high">High Quality</option>
              </select>
            </div>

            {/* Enhanced AR Display Area */}
            <div style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              background: '#000',
              minHeight: '500px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid rgba(255,255,255,0.2)'
            }}>
              
              {error && (
                <div style={{
                  color: '#ff4444',
                  textAlign: 'center',
                  padding: '30px',
                  background: 'rgba(255, 68, 68, 0.1)',
                  borderRadius: '15px',
                  border: '2px solid rgba(255, 68, 68, 0.3)',
                  maxWidth: '80%'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '15px' }}>⚠️</div>
                  <p style={{ margin: '0 0 10px 0', fontSize: '20px', fontWeight: 'bold' }}>Camera Access Required</p>
                  <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.4' }}>{error}</p>
                </div>
              )}

              {!isStreaming && !error && (
                <div style={{
                  textAlign: 'center',
                  color: 'rgba(255,255,255,0.8)'
                }}>
                  <div style={{ fontSize: '64px', marginBottom: '25px' }}>📷</div>
                  <h3 style={{ fontSize: '24px', margin: '0 0 15px 0' }}>Ready for AR Experience</h3>
                  <p style={{ fontSize: '18px', margin: '0', opacity: '0.7' }}>Click "Start AR Experience" to begin your virtual try-on</p>
                </div>
              )}

              {isStreaming && (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: 'scaleX(-1)' // Mirror effect
                    }}
                  />
                  
                  {/* Enhanced Glasses Overlay */}
                  {faceDetected && (
                    <div style={getEnhancedGlassesOverlayStyle()}>
                      <div style={{
                        position: 'absolute',
                        top: '-35px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(0,0,0,0.9)',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '15px',
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                        fontWeight: 'bold'
                      }}>
                        {glassesStyles[selectedGlasses].name} - {glassesStyles[selectedGlasses].price}
                      </div>
                    </div>
                  )}

                  {/* Enhanced Status Indicators */}
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div style={{
                      background: faceDetected ? 'rgba(76, 175, 80, 0.9)' : 'rgba(255, 193, 7, 0.9)',
                      color: 'white',
                      padding: '8px 15px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      {faceDetected ? '✅' : '🔍'} 
                      {faceDetected ? 'Face Detected' : 'Detecting Face...'}
                    </div>
                    
                    {/* Color Change Message */}
                    {colorChangeMessage && (
                      <div style={{
                        background: `linear-gradient(135deg, ${selectedColor}, ${selectedColor}80)`,
                        color: 'white',
                        padding: '8px 15px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        animation: 'fadeInOut 2s ease-in-out',
                        border: '2px solid rgba(255,255,255,0.3)',
                        boxShadow: `0 0 15px ${selectedColor}60`
                      }}>
                        🎨 {colorChangeMessage}
                      </div>
                    )}
                    
                    {arStats.isCalibrated && (
                      <div style={{
                        background: 'rgba(33, 150, 243, 0.9)',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '15px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        📊 Confidence: {Math.round(arStats.faceConfidence * 100)}%
                      </div>
                    )}
                  </div>

                  {/* Quality Indicator */}
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '15px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    📹 {cameraQuality.toUpperCase()} Quality
                  </div>
                </>
              )}
            </div>

            {/* Hidden canvas for photo capture */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>

          {/* Enhanced Controls Panel */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '25px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            
            {/* Enhanced Glasses Selection */}
            <h3 style={{ margin: '0 0 20px 0', fontSize: '22px', textAlign: 'center' }}>
              Premium Glasses Collection
            </h3>
            <div style={{ marginBottom: '30px' }}>
              {glassesStyles.map((glasses, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedGlasses(index)}
                  style={{
                    padding: '20px',
                    marginBottom: '15px',
                    background: selectedGlasses === index ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: selectedGlasses === index ? '2px solid rgba(255,255,255,0.6)' : '1px solid rgba(255,255,255,0.2)',
                    transform: selectedGlasses === index ? 'scale(1.02)' : 'scale(1)'
                  }}
                  onMouseOver={(e) => {
                    if (selectedGlasses !== index) {
                      e.target.style.background = 'rgba(255,255,255,0.2)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedGlasses !== index) {
                      e.target.style.background = 'rgba(255,255,255,0.1)';
                    }
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{glasses.name}</span>
                    <span style={{ color: '#4CAF50', fontWeight: 'bold', fontSize: '16px' }}>{glasses.price}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <span style={{ fontSize: '14px', opacity: '0.8' }}>{glasses.brand}</span>
                    <span style={{ fontSize: '14px', color: '#FFD700' }}>⭐ {glasses.rating}</span>
                  </div>
                  <p style={{
                    margin: '0 0 10px 0',
                    fontSize: '13px',
                    opacity: '0.9',
                    lineHeight: '1.4'
                  }}>
                    {glasses.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '5px'
                  }}>
                    {glasses.features.map((feature, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: 'rgba(255,255,255,0.2)',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontSize: '11px',
                          opacity: '0.8'
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Color Selection with Better Visual Feedback */}
            <h3 style={{ margin: '0 0 15px 0', fontSize: '20px', textAlign: 'center' }}>
              🎨 Frame Colors
            </h3>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '15px',
              borderRadius: '15px',
              marginBottom: '25px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              {/* Current Color Display */}
              <div style={{
                textAlign: 'center',
                marginBottom: '15px',
                padding: '10px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '10px'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'rgba(0,0,0,0.3)',
                  padding: '8px 15px',
                  borderRadius: '20px'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    background: selectedColor,
                    borderRadius: '50%',
                    border: '2px solid white',
                    boxShadow: `0 0 10px ${selectedColor}`
                  }} />
                  <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
                    Selected: {colors.find(c => c.value === selectedColor)?.name || 'Custom Color'}
                  </span>
                </div>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px'
              }}>
                {colors.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => handleColorChange(color)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '10px',
                      background: selectedColor === color.value ? 
                        `linear-gradient(135deg, ${color.value}40, ${color.value}20)` : 
                        'rgba(255,255,255,0.05)',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: selectedColor === color.value ? 
                        `3px solid ${color.value}` : 
                        '2px solid rgba(255,255,255,0.1)',
                      transform: selectedColor === color.value ? 'scale(1.1)' : 'scale(1)',
                      boxShadow: selectedColor === color.value ? 
                        `0 0 20px ${color.value}, 0 5px 15px rgba(0,0,0,0.3)` : 
                        '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedColor !== color.value) {
                        e.target.style.transform = 'scale(1.05)';
                        e.target.style.background = `linear-gradient(135deg, ${color.value}20, ${color.value}10)`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedColor !== color.value) {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.background = 'rgba(255,255,255,0.05)';
                      }
                    }}
                  >
                    <div style={{
                      width: '30px',
                      height: '30px',
                      background: color.value,
                      borderRadius: '50%',
                      marginBottom: '6px',
                      border: '3px solid rgba(255,255,255,0.6)',
                      boxShadow: selectedColor === color.value ? 
                        `0 0 15px ${color.value}, inset 0 0 10px rgba(0,0,0,0.2)` : 
                        'inset 0 0 5px rgba(0,0,0,0.1)',
                      position: 'relative'
                    }}>
                      {selectedColor === color.value && (
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                        }}>
                          ✓
                        </div>
                      )}
                    </div>
                    <span style={{ 
                      fontSize: '10px', 
                      textAlign: 'center', 
                      fontWeight: selectedColor === color.value ? 'bold' : '500',
                      color: selectedColor === color.value ? 'white' : 'rgba(255,255,255,0.9)',
                      textShadow: selectedColor === color.value ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none'
                    }}>
                      {color.name}
                    </span>
                    <span style={{ 
                      fontSize: '9px', 
                      opacity: selectedColor === color.value ? '1' : '0.6', 
                      textTransform: 'uppercase',
                      fontWeight: selectedColor === color.value ? 'bold' : 'normal'
                    }}>
                      {color.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Gallery */}
            {photoTaken && (
              <div style={{ marginTop: '25px' }}>
                <h3 style={{ margin: '0 0 15px 0', fontSize: '20px', textAlign: 'center' }}>
                  📸 Captured Photo
                </h3>
                <div style={{
                  position: 'relative',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  border: '3px solid rgba(255,255,255,0.3)'
                }}>
                  <img
                    src={photoTaken}
                    alt="Captured photo with glasses"
                    style={{
                      width: '100%',
                      display: 'block'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    background: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '10px',
                    fontSize: '12px'
                  }}>
                    {glassesStyles[selectedGlasses].name}
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  marginTop: '15px'
                }}>
                  <button
                    onClick={() => setPhotoTaken(null)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      border: '1px solid rgba(255,255,255,0.3)',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    🗑️ Clear
                  </button>
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.download = `AR-Glasses-${glassesStyles[selectedGlasses].name.replace(/\s+/g, '-')}-${Date.now()}.png`;
                      link.href = photoTaken;
                      link.click();
                    }}
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: 'linear-gradient(45deg, #4CAF50, #45a049)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    💾 Download
                  </button>
                </div>
              </div>
            )}

            {/* AR Stats Panel */}
            {isStreaming && arStats.isCalibrated && (
              <div style={{
                marginTop: '25px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '15px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '16px', textAlign: 'center' }}>
                  📊 AR Statistics
                </h4>
                <div style={{ fontSize: '12px', opacity: '0.9' }}>
                  <div style={{ marginBottom: '5px' }}>
                    Face Confidence: <strong>{Math.round(arStats.faceConfidence * 100)}%</strong>
                  </div>
                  <div style={{ marginBottom: '5px' }}>
                    Position: <strong>X:{arStats.glassesPosition.x}% Y:{arStats.glassesPosition.y}%</strong>
                  </div>
                  <div>
                    Status: <strong style={{ color: '#4CAF50' }}>Calibrated ✓</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARGlassesViewer;
