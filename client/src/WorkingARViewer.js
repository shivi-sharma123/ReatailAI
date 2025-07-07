import React, { useState, useEffect } from 'react';

const WorkingARViewer = ({ product, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [arActive, setArActive] = useState(false);

  useEffect(() => {
    // Simulate AR loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!product) return null;

  return (
    <div className="ar-viewer-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="ar-viewer-container" style={{
        backgroundColor: '#fff',
        borderRadius: '15px',
        padding: '25px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '70vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#999'
          }}
        >
          ×
        </button>

        <div className="ar-header" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h3 style={{ color: '#333', marginBottom: '5px' }}>🥽 AR Try-On</h3>
          <p style={{ color: '#666', fontSize: '12px' }}>
            {product.name}
          </p>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '30px' }}>
            <div className="loading-spinner" style={{ fontSize: '40px', marginBottom: '15px' }}>
              ⏳
            </div>
            <p style={{ color: '#666' }}>Initializing AR...</p>
          </div>
        ) : (
          <div className="ar-content">
            <div className="ar-display" style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              padding: '20px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <img 
                src={product.image_url || '/api/placeholder/250/250'} 
                alt={product.name}
                style={{
                  maxWidth: '100%',
                  height: '200px',
                  objectFit: 'contain',
                  borderRadius: '8px'
                }}
              />
              <div style={{ marginTop: '10px' }}>
                <h4 style={{ color: '#333', marginBottom: '5px' }}>{product.name}</h4>
                <p style={{ color: '#0066cc', fontWeight: 'bold' }}>${product.price}</p>
              </div>
            </div>

            <div className="ar-controls" style={{ textAlign: 'center' }}>
              <button 
                onClick={() => setArActive(!arActive)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: arActive ? '#dc3545' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  marginBottom: '15px',
                  fontSize: '14px'
                }}
              >
                {arActive ? '🔴 Stop AR' : '🟢 Start AR'}
              </button>

              {arActive && (
                <div className="ar-active-info" style={{
                  backgroundColor: '#e8f5e8',
                  padding: '15px',
                  borderRadius: '10px',
                  marginBottom: '15px'
                }}>
                  <p style={{ color: '#28a745', margin: 0, fontSize: '14px' }}>
                    🎯 AR Mode Active - Move your device to see the product in 3D!
                  </p>
                </div>
              )}

              <div className="ar-actions">
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  margin: '0 5px',
                  fontSize: '12px'
                }}>
                  🛒 Add to Cart
                </button>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#ffc107',
                  color: '#333',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  margin: '0 5px',
                  fontSize: '12px'
                }}>
                  💝 Wishlist
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkingARViewer;
