import React, { useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import './EnhancedARViewerNew.css';

const COLORS = [
  { name: 'Default', value: null },
  { name: 'Red', value: '#e53935' },
  { name: 'Blue', value: '#1976d2' },
  { name: 'Green', value: '#43a047' },
  { name: 'Yellow', value: '#fbc02d' },
  { name: 'Purple', value: '#8e24aa' },
];

// Product3DCard must be inside Canvas and use only R3F hooks
function Product3DCard({ image, color, size }) {
  const texture = useTexture(image);
  const meshRef = React.useRef();

  // Animate rotation for a premium feel
  useFrame(() => {
    if (meshRef.current && !meshRef.current.userData.dragging) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={meshRef} scale={[size, size, 1]} castShadow receiveShadow>
      <planeGeometry args={[3, 3]} />
      <meshStandardMaterial
        map={texture}
        color={color || 'white'}
        metalness={0.25}
        roughness={0.6}
        transparent={true}
        opacity={1}
        toneMapped={true}
      />
    </mesh>
  );
}

export default function EnhancedARViewerNew({ product, onClose }) {
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(1);

  // For a more immersive look, darken the background
  return (
    <div className="ar-viewer-modal" style={{ background: 'rgba(10,20,40,0.92)' }}>
      <div className="ar-viewer-content" style={{ maxWidth: 650, minHeight: 520, background: 'linear-gradient(135deg, #e3f0ff 0%, #f8fafc 100%)', borderRadius: 24, boxShadow: '0 8px 32px #1976d233', padding: 0 }}>
        <button className="ar-close-btn" onClick={onClose} title="Close AR">×</button>
        <h2 style={{ fontWeight: 900, fontSize: '2rem', marginBottom: 8, color: '#1976d2', letterSpacing: 1 }}>🕶️ 3D AR Product Viewer</h2>
        <p style={{ color: '#1976d2', fontWeight: 600, marginBottom: 16 }}>Product: <strong>{product?.name}</strong></p>
        <div style={{ width: '100%', height: 370, background: '#101c2c', borderRadius: 18, boxShadow: '0 4px 24px #b3d1ff33', marginBottom: 18, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Suspense fallback={<Html><div style={{color:'#fff'}}>Loading 3D...</div></Html>}>
            <Canvas camera={{ position: [0, 0, 6] }} style={{ borderRadius: 18 }} shadows dpr={[1,2]}>
              <ambientLight intensity={0.7} />
              <directionalLight position={[0, 0, 5]} intensity={0.8} />
              {/* Pass props to Product3DCard inside Canvas */}
              <Product3DCard image={product?.image_url} color={color} size={size} />
              <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
            </Canvas>
          </Suspense>
        </div>
        <div style={{ display: 'flex', gap: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap' }}>
          <label style={{ fontWeight: 600, color: '#1976d2' }}>Color:</label>
          {COLORS.map(c => (
            <button key={c.name} style={{ background: c.value || '#fff', border: color === c.value ? '2.5px solid #1976d2' : '1.5px solid #ccc', borderRadius: 8, width: 32, height: 32, margin: '0 2px', cursor: 'pointer', boxShadow: color === c.value ? '0 2px 8px #1976d2' : 'none' }} onClick={() => setColor(c.value)} title={c.name}></button>
          ))}
          <label style={{ fontWeight: 600, color: '#1976d2', marginLeft: 18 }}>Size:</label>
          <input type="range" min={0.7} max={1.5} step={0.01} value={size} onChange={e => setSize(Number(e.target.value))} style={{ width: 90 }} />
        </div>
        <div style={{textAlign:'center',color:'#1976d2',fontWeight:500,marginTop:8,fontSize:'1.05rem'}}>Drag to rotate, scroll to zoom. Enjoy a real AR experience!</div>
      </div>
    </div>
  );
}
