import React, { useState, useEffect } from 'react';
import EnhancedARViewer from './EnhancedARViewer_New';

const ARProductsShowcase = ({ onClose }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAR, setShowAR] = useState(false);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchARProducts();
  }, []);

  const fetchARProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      // Filter for AR-enabled products
      const arProducts = data.filter(product => product.ar_enabled);
      setProducts(arProducts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching AR products:', error);
      setLoading(false);
    }
  };

  const filterProducts = (category) => {
    setFilter(category);
  };

  const filteredProducts = products.filter(product => 
    filter === 'all' || product.category.toLowerCase() === filter.toLowerCase()
  );

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const handleARTryOn = (product) => {
    setSelectedProduct(product);
    setShowAR(true);
  };

  if (loading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{ color: 'white', fontSize: '24px' }}>🔄 Loading AR Products...</div>
      </div>
    );
  }

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url('https://th.bing.com/th/id/R.82b738f765fa5d1481a9bf581247bcb5?rik=eqgz9XMOnECAag&riu=http%3a%2f%2fai47labs.com%2fwp-content%2fuploads%2f2023%2f05%2fhow-retailers-are-using-artificial-intelligence-to-stand-strong-in-the-era-of-digital-transformation-featured.jpg&ehk=W%2bTKHMiDepwhPAQDGFgWAWU7bY2quK5s%2fz%2btE4xJiY4%3d&risl=&pid=ImgRaw&r=0')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        zIndex: 1000,
        overflow: 'auto',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderRadius: '20px',
          padding: '30px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            borderBottom: '3px solid #f0f0f0',
            paddingBottom: '20px'
          }}>
            <div>
              <h1 style={{
                margin: 0,
                color: '#333',
                fontSize: '32px',
                fontWeight: 'bold'
              }}>
                🥽 AR Products Showcase
              </h1>
              <p style={{
                margin: '5px 0 0 0',
                color: '#666',
                fontSize: '16px'
              }}>
                Try on products with our advanced AR technology - Crystal clear images & real-time color changes
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
                boxShadow: '0 4px 15px rgba(255,68,68,0.3)'
              }}
            >
              ×
            </button>
          </div>

          {/* Category Filter */}
          <div style={{
            marginBottom: '30px',
            display: 'flex',
            gap: '15px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => filterProducts(category)}
                style={{
                  padding: '12px 24px',
                  border: filter === category ? '2px solid #007bff' : '2px solid #ddd',
                  borderRadius: '25px',
                  backgroundColor: filter === category ? '#007bff' : '#fff',
                  color: filter === category ? '#fff' : '#333',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  transition: 'all 0.3s ease',
                  boxShadow: filter === category ? '0 4px 15px rgba(0,123,255,0.3)' : '0 2px 10px rgba(0,0,0,0.1)'
                }}
              >
                {category === 'all' ? '🌟 All Products' : `${category} (${products.filter(p => p.category.toLowerCase() === category.toLowerCase()).length})`}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '25px',
            marginBottom: '30px'
          }}>
            {filteredProducts.map(product => (
              <div
                key={product.id}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  border: '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
                  e.target.style.border = '2px solid #007bff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                  e.target.style.border = '2px solid transparent';
                }}
              >
                {/* Product Image */}
                <div style={{
                  position: 'relative',
                  height: '250px',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={product.image_url}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      imageRendering: 'crisp-edges'
                    }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x250/f8f9fa/6c757d?text=HD+Product+Image';
                    }}
                  />
                  {/* AR Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(0,123,255,0.9)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backdropFilter: 'blur(5px)'
                  }}>
                    🥽 AR Ready
                  </div>
                  {/* Category Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}>
                    {product.category}
                  </div>
                </div>

                {/* Product Info */}
                <div style={{ padding: '20px' }}>
                  <h3 style={{
                    margin: '0 0 10px 0',
                    color: '#333',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}>
                    {product.name}
                  </h3>
                  <p style={{
                    margin: '0 0 15px 0',
                    color: '#666',
                    fontSize: '14px',
                    lineHeight: '1.4'
                  }}>
                    {product.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '15px'
                  }}>
                    <span style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#007bff'
                    }}>
                      ${product.price}
                    </span>
                    <span style={{
                      fontSize: '12px',
                      color: '#28a745',
                      fontWeight: 'bold'
                    }}>
                      📦 {product.stock_quantity} in stock
                    </span>
                  </div>

                  {/* AR Try-On Button */}
                  <button
                    onClick={() => handleARTryOn(product)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(0,123,255,0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#0056b3';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#007bff';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    🥽 Try in AR - HD Quality
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Footer */}
          <div style={{
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '15px',
            border: '2px solid #e9ecef'
          }}>
            <h3 style={{ color: '#333', margin: '0 0 10px 0' }}>
              🎯 AR Experience Statistics
            </h3>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
                  {products.length}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>AR Products</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
                  100%
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>HD Quality</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>
                  {categories.length - 1}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AR Viewer Modal */}
      {showAR && selectedProduct && (
        <EnhancedARViewer 
          product={selectedProduct} 
          onClose={() => {
            setShowAR(false);
            setSelectedProduct(null);
          }} 
        />
      )}
    </>
  );
};

export default ARProductsShowcase;
