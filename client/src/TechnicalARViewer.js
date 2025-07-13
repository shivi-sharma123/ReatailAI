import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import './TechnicalARViewer.css';

// Enhanced 3D Product Component
const Enhanced3DProduct = ({ product, position = [0, 0, 0], scale = 1, isHovered, onHover }) => {
  const meshRef = useRef();
  const [rotationSpeed, setRotationSpeed] = useState(0.01);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
      if (isHovered) {
        meshRef.current.scale.setScalar(scale * 1.1);
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      } else {
        meshRef.current.scale.setScalar(scale);
        meshRef.current.position.y = 0;
      }
    }
  });

  const handleClick = () => {
    setRotationSpeed(rotationSpeed === 0.01 ? 0.05 : 0.01);
  };

  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={[1, 1, 1]}
        onClick={handleClick}
        onPointerOver={() => onHover(true)}
        onPointerOut={() => onHover(false)}
      >
        <meshStandardMaterial 
          color="#4ecdc4" 
          roughness={0.3}
          metalness={0.7}
          emissive="#001122"
          emissiveIntensity={isHovered ? 0.3 : 0.1}
        />
      </Box>
      
      {/* Product Label */}
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {product?.name || 'AR Product'}
      </Text>
      
      {/* Interactive Hotspots */}
      <Sphere args={[0.05]} position={[0.7, 0.7, 0]}>
        <meshBasicMaterial color="#ff6b6b" />
      </Sphere>
      <Sphere args={[0.05]} position={[-0.7, 0.7, 0]}>
        <meshBasicMaterial color="#4ecdc4" />
      </Sphere>
    </group>
  );
};

// Particle System for Enhanced Effects
const ParticleSystem = ({ isActive }) => {
  const particlesRef = useRef();
  const particleCount = 100;
  
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    
    colors[i * 3] = Math.random();
    colors[i * 3 + 1] = Math.random();
    colors[i * 3 + 2] = Math.random();
  }
  
  useFrame((state) => {
    if (particlesRef.current && isActive) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
  });
  
  if (!isActive) return null;
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={particleCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={particleCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} vertexColors />
    </points>
  );
};

const TechnicalARViewer = ({ product, onClose, isOpen }) => {
  const [viewMode, setViewMode] = useState('product');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [measurements, setMeasurements] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cameraMode, setCameraMode] = useState('orbit');
  const [showSpecs, setShowSpecs] = useState(false);
  
  // Technical AR Features
  const [arFeatures, setArFeatures] = useState({
    xray: false,
    thermal: false,
    dimensions: false,
    materials: false,
    sustainability: false
  });

  const canvasRef = useRef();

  useEffect(() => {
    if (isOpen) {
      // Simulate AR initialization
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setMeasurements({
          length: '12.5 cm',
          width: '8.3 cm',
          height: '4.7 cm',
          weight: '280g',
          volume: '487 cm³'
        });
      }, 2000);
    }
  }, [isOpen]);

  const toggleARFeature = (feature) => {
    setArFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setShowParticles(true);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowParticles(false);
      setShowSpecs(true);
    }, 3000);
  };

  const switchCameraMode = () => {
    setCameraMode(prev => prev === 'orbit' ? 'fly' : 'orbit');
  };

  if (!isOpen) return null;

  return (
    <div className="technical-ar-viewer">
      <div className="ar-viewer-header">
        <div className="ar-title-section">
          <h2>🔬 Advanced AR Analysis</h2>
          <p>Technical Product Visualization</p>
        </div>
        <button className="ar-close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="ar-main-content">
        {/* 3D Canvas */}
        <div className="ar-canvas-container">
          <Canvas
            ref={canvasRef}
            camera={{ position: [0, 0, 5], fov: 75 }}
            style={{ background: 'linear-gradient(to bottom, #000428, #004e92)' }}
          >
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight position={[-10, 10, 5]} angle={0.3} intensity={0.8} />
            
            {/* Environment */}
            <Environment preset="city" />
            
            {/* Product */}
            <Enhanced3DProduct 
              product={product}
              position={[0, 0, 0]}
              scale={1}
              isHovered={isHovered}
              onHover={setIsHovered}
            />
            
            {/* Particle Effects */}
            <ParticleSystem isActive={showParticles} />
            
            {/* Ground Plane */}
            <ContactShadows 
              position={[0, -1.5, 0]} 
              opacity={0.3} 
              scale={5} 
              blur={2} 
            />
            
            {/* Camera Controls */}
            {cameraMode === 'orbit' ? (
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            ) : (
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            )}
          </Canvas>

          {/* AR Overlay UI */}
          <div className="ar-overlay-ui">
            {/* Scanning Animation */}
            {isAnalyzing && (
              <div className="scanning-overlay">
                <div className="scanning-grid"></div>
                <div className="scanning-line"></div>
                <div className="scanning-text">
                  <span>🔍 Scanning Product...</span>
                  <div className="scanning-progress"></div>
                </div>
              </div>
            )}

            {/* Technical Measurements */}
            {measurements && !isAnalyzing && (
              <div className="measurements-overlay">
                <h4>📏 Dimensions</h4>
                <div className="measurements-grid">
                  <div className="measurement-item">
                    <span className="label">Length:</span>
                    <span className="value">{measurements.length}</span>
                  </div>
                  <div className="measurement-item">
                    <span className="label">Width:</span>
                    <span className="value">{measurements.width}</span>
                  </div>
                  <div className="measurement-item">
                    <span className="label">Height:</span>
                    <span className="value">{measurements.height}</span>
                  </div>
                  <div className="measurement-item">
                    <span className="label">Weight:</span>
                    <span className="value">{measurements.weight}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Technical Specifications */}
            {showSpecs && (
              <div className="tech-specs-overlay">
                <h4>🔧 Technical Analysis</h4>
                <div className="specs-list">
                  <div className="spec-item">
                    <span>🔋 Battery Life: 24 hours</span>
                  </div>
                  <div className="spec-item">
                    <span>💾 Storage: 128GB</span>
                  </div>
                  <div className="spec-item">
                    <span>🌡️ Operating Temp: -10°C to 50°C</span>
                  </div>
                  <div className="spec-item">
                    <span>💧 Water Resistance: IPX7</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AR Controls Panel */}
        <div className="ar-controls-panel">
          <div className="controls-section">
            <h3>🎛️ AR Controls</h3>
            
            {/* View Mode Switcher */}
            <div className="control-group">
              <label>View Mode:</label>
              <div className="mode-switcher">
                <button 
                  className={viewMode === 'product' ? 'active' : ''}
                  onClick={() => setViewMode('product')}
                >
                  📦 Product
                </button>
                <button 
                  className={viewMode === 'technical' ? 'active' : ''}
                  onClick={() => setViewMode('technical')}
                >
                  🔧 Technical
                </button>
                <button 
                  className={viewMode === 'xray' ? 'active' : ''}
                  onClick={() => setViewMode('xray')}
                >
                  🩻 X-Ray
                </button>
              </div>
            </div>

            {/* AR Features */}
            <div className="control-group">
              <label>AR Features:</label>
              <div className="ar-features-grid">
                {Object.entries(arFeatures).map(([feature, active]) => (
                  <button
                    key={feature}
                    className={`ar-feature-btn ${active ? 'active' : ''}`}
                    onClick={() => toggleARFeature(feature)}
                  >
                    {feature === 'xray' && '🩻'}
                    {feature === 'thermal' && '🌡️'}
                    {feature === 'dimensions' && '📏'}
                    {feature === 'materials' && '🧪'}
                    {feature === 'sustainability' && '🌱'}
                    <span>{feature.charAt(0).toUpperCase() + feature.slice(1)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="control-group">
              <label>Actions:</label>
              <div className="action-buttons">
                <button className="action-btn analyze" onClick={handleAnalyze}>
                  🔍 Deep Analyze
                </button>
                <button className="action-btn camera" onClick={switchCameraMode}>
                  📷 {cameraMode === 'orbit' ? 'Fly Mode' : 'Orbit Mode'}
                </button>
                <button className="action-btn particles" onClick={() => setShowParticles(!showParticles)}>
                  ✨ Effects
                </button>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="control-group">
              <label>Performance:</label>
              <div className="performance-metrics">
                <div className="metric">
                  <span className="metric-label">FPS:</span>
                  <span className="metric-value">60</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Polygons:</span>
                  <span className="metric-value">2,847</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Accuracy:</span>
                  <span className="metric-value">98.7%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="product-info-section">
            <h3>📋 Product Info</h3>
            <div className="product-details">
              <h4>{product?.name || 'AR Product Demo'}</h4>
              <p className="product-description">
                Experience this product in stunning 3D detail with our advanced AR technology. 
                Interact with the model, analyze materials, and see technical specifications in real-time.
              </p>
              <div className="product-stats">
                <div className="stat">
                  <span className="stat-icon">⭐</span>
                  <span className="stat-text">4.8/5 Rating</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">🛒</span>
                  <span className="stat-text">1,247 Sold</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">🚚</span>
                  <span className="stat-text">Free Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="ar-footer-actions">
        <button className="footer-btn secondary">
          📱 View in Mobile AR
        </button>
        <button className="footer-btn primary">
          🛒 Add to Cart
        </button>
        <button className="footer-btn secondary">
          📤 Share AR View
        </button>
      </div>
    </div>
  );
};

export default TechnicalARViewer;
