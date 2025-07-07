import React, { useState, useEffect, useMemo } from 'react';

const ProfessionalARViewer = ({ product, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [arMode, setArMode] = useState('preview');
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (product) {
      // Initialize with first available color and size
      setSelectedColor(product.color_variants?.[0] || null);
      setSelectedSize(product.size_chart?.[0] || null);
    }

    // Simulate AR loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [product]);

  const handleAddToCart = () => {
    const cartData = {
      ...product,
      selectedColor: selectedColor?.name || 'Default',
      selectedSize: selectedSize?.name || 'Default',
      quantity: 1
    };
    
    console.log('Adding to cart:', cartData);
    alert(`Added ${product.name} to cart!`);
  };

  const handleAddToWishlist = () => {
    console.log('Adding to wishlist:', product);
    alert(`Added ${product.name} to wishlist!`);
  };

  const currentPrice = useMemo(() => {
    let price = parseFloat(product.price || 0);
    if (selectedColor && selectedColor.price_modifier) {
      price += parseFloat(selectedColor.price_modifier);
    }
    if (selectedSize && selectedSize.price_modifier) {
      price += parseFloat(selectedSize.price_modifier);
    }
    return price.toFixed(2);
  }, [product, selectedColor, selectedSize]);

  const currentImage = useMemo(() => {
    if (selectedColor && selectedColor.image_url) {
      return selectedColor.image_url;
    }
    if (product.multiple_images && product.multiple_images.length > 0) {
      return product.multiple_images[0];
    }
    return product.image_url || '/api/placeholder/300/300';
  }, [product, selectedColor]);

  if (!product) return null;

  return (
    <div className="ar-viewer-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="ar-viewer-container" style={{
        backgroundColor: '#fff',
        borderRadius: '20px',
        padding: '30px',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          ×
        </button>

        <div className="ar-header" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#333', marginBottom: '10px' }}>🥽 AR Try-On Experience</h2>
          <p style={{ color: '#666', fontSize: '14px' }}>
            {product.name} - Professional AR Viewer
          </p>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div className="ar-loading">
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔄</div>
              <p>Loading AR Experience...</p>
            </div>
          </div>
        ) : (
          <div className="ar-content">
            <div className="ar-preview" style={{
              backgroundColor: '#f5f5f5',
              borderRadius: '15px',
              padding: '20px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <img 
                src={currentImage} 
                alt={product.name}
                style={{
                  maxWidth: '100%',
                  height: '300px',
                  objectFit: 'contain',
                  borderRadius: '10px'
                }}
              />
              <div style={{ marginTop: '15px' }}>
                <h3 style={{ color: '#333', marginBottom: '5px' }}>{product.name}</h3>
                <p style={{ color: '#666', fontSize: '14px' }}>{product.description}</p>
                <p style={{ color: '#0066cc', fontWeight: 'bold', fontSize: '18px' }}>
                  ${currentPrice}
                </p>
                {product.brand && (
                  <p style={{ color: '#999', fontSize: '12px' }}>Brand: {product.brand}</p>
                )}
              </div>
            </div>

            {/* Color Selection */}
            {(product.color_variants && product.color_variants.length > 0) && (
              <div className="color-selection" style={{ marginBottom: '15px' }}>
                <h4 style={{ color: '#333', marginBottom: '10px' }}>Colors:</h4>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {product.color_variants.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: color.hex_code || '#ccc',
                        border: selectedColor?.name === color.name ? '3px solid #0066cc' : '2px solid #ddd',
                        cursor: 'pointer',
                        title: color.name
                      }}
                    />
                  ))}
                </div>
                <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  Selected: {selectedColor?.name || 'Default'}
                </p>
              </div>
            )}

            {/* Size Selection */}
            {(product.size_chart && product.size_chart.length > 0) && (
              <div className="size-selection" style={{ marginBottom: '15px' }}>
                <h4 style={{ color: '#333', marginBottom: '10px' }}>Sizes:</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.size_chart.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: selectedSize?.name === size.name ? '#0066cc' : '#f0f0f0',
                        color: selectedSize?.name === size.name ? 'white' : '#333',
                        border: 'none',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  Selected: {selectedSize?.name || 'Default'}
                </p>
              </div>
            )}

            <div className="ar-controls" style={{ textAlign: 'center' }}>
              <div className="ar-mode-buttons" style={{ marginBottom: '20px' }}>
                <button 
                  onClick={() => setArMode('preview')}
                  style={{
                    padding: '10px 20px',
                    margin: '0 10px',
                    backgroundColor: arMode === 'preview' ? '#0066cc' : '#f0f0f0',
                    color: arMode === 'preview' ? 'white' : '#333',
                    border: 'none',
                    borderRadius: '25px',
                    cursor: 'pointer'
                  }}
                >
                  📱 Preview
                </button>
                <button 
                  onClick={() => setArMode('tryon')}
                  style={{
                    padding: '10px 20px',
                    margin: '0 10px',
                    backgroundColor: arMode === 'tryon' ? '#0066cc' : '#f0f0f0',
                    color: arMode === 'tryon' ? 'white' : '#333',
                    border: 'none',
                    borderRadius: '25px',
                    cursor: 'pointer'
                  }}
                >
                  🥽 Try On
                </button>
              </div>

              <div className="ar-actions">
                <button 
                  onClick={handleAddToCart}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    margin: '0 10px',
                    fontSize: '16px'
                  }}
                >
                  🛒 Add to Cart
                </button>
                <button 
                  onClick={handleAddToWishlist}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#ffc107',
                    color: '#333',
                    border: 'none',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    margin: '0 10px',
                    fontSize: '16px'
                  }}
                >
                  💝 Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalARViewer;
