import React, { useState, useEffect } from 'react';

const WalmartAdmin = ({ onClose, onBack, onShowAR }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('products');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showARView, setShowARView] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (response.ok) {
        const data = await response.json();
        // The API returns { products: [...], success: true }
        const productsWithColors = data.products.map(product => {
          // Default colors and sizes
          const defaultColors = [
            {'name': 'Original', 'hex': '#666666', 'price_modifier': 0},
            {'name': 'Red', 'hex': '#ff4444', 'price_modifier': 5},
            {'name': 'Blue', 'hex': '#2196F3', 'price_modifier': 5},
            {'name': 'Green', 'hex': '#4CAF50', 'price_modifier': 5},
            {'name': 'Yellow', 'hex': '#ffeb3b', 'price_modifier': 5},
            {'name': 'Purple', 'hex': '#9c27b0', 'price_modifier': 8},
            {'name': 'Black', 'hex': '#333333', 'price_modifier': 10},
            {'name': 'White', 'hex': '#ffffff', 'price_modifier': 10}
          ];
          
          const defaultSizes = [
            {'size': 'S', 'price_modifier': -5},
            {'size': 'M', 'price_modifier': 0},
            {'size': 'L', 'price_modifier': 5},
            {'size': 'XL', 'price_modifier': 10}
          ];
          
          // Handle colors - ensure they're in the right format
          let colors = defaultColors;
          if (product.colors) {
            try {
              if (typeof product.colors === 'string') {
                colors = JSON.parse(product.colors);
              } else if (Array.isArray(product.colors)) {
                colors = product.colors;
              }
            } catch (error) {
              console.error('Error parsing colors for product:', product.id, error);
              colors = defaultColors;
            }
          }
          
          // Handle sizes - ensure they're in the right format
          let sizes = defaultSizes;
          if (product.sizes) {
            try {
              if (typeof product.sizes === 'string') {
                sizes = JSON.parse(product.sizes);
              } else if (Array.isArray(product.sizes)) {
                sizes = product.sizes;
              }
            } catch (error) {
              console.error('Error parsing sizes for product:', product.id, error);
              sizes = defaultSizes;
            }
          }
          
          return {
            ...product,
            colors: colors, // Keep as array, not string
            sizes: sizes    // Keep as array, not string
          };
        });
        
        setProducts(productsWithColors || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleARClick = (product) => {
    setSelectedProduct(product);
    if (onShowAR) {
      onShowAR(product);
    }
    setShowARView(true);
  };

  const renderProducts = () => (
    <div className="products-grid" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '20px',
      padding: '20px'
    }}>
      {Array.isArray(products) && products.map(product => (
        <div key={product.id} className="product-card" style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '15px',
          padding: '20px',
          textAlign: 'center',
          border: '1px solid #e9ecef',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          position: 'relative'
        }}>
          {/* AR Badge */}
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: '#ff6b35',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '20px',
            fontSize: '10px',
            fontWeight: 'bold'
          }}>
            🥽 AR Ready
          </div>
          
          <img 
            src={product.image_url || '/api/placeholder/200/200'} 
            alt={product.name}
            style={{
              width: '100%',
              height: '150px',
              objectFit: 'contain',
              borderRadius: '10px',
              marginBottom: '15px',
              cursor: 'pointer'
            }}
            onClick={() => handleARClick(product)}
          />
          
          <h4 style={{ fontSize: '16px', margin: '0 0 8px 0', color: '#333' }}>
            {product.name}
          </h4>
          
          <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px 0' }}>
            {product.category}
          </p>
          
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#0071ce', margin: '0 0 15px 0' }}>
            ${product.price}
          </p>
          
          {/* Color Preview */}
          <div style={{ marginBottom: '15px' }}>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px 0' }}>Available Colors:</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', flexWrap: 'wrap' }}>
              {(() => {
                try {
                  const colors = Array.isArray(product.colors) ? product.colors : [];
                  return colors.slice(0, 6).map((color, index) => (
                    <div
                      key={index}
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: color.hex,
                        border: '2px solid #ccc',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease'
                      }}
                      title={color.name}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                  ));
                } catch (error) {
                  console.error('Error rendering colors:', error);
                  return [];
                }
              })()}
            </div>
          </div>
          
          {/* AR Technology Button */}
          <button
            onClick={() => handleARClick(product)}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#ff6b35',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: '8px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#e55a2b';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ff6b35';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            🥽 Try in AR - Change Colors
          </button>
          
          {/* Quick Info */}
          <div style={{
            fontSize: '11px',
            color: '#888',
            fontStyle: 'italic'
          }}>
            🎨 Color Customization • 📏 Size Options
          </div>
        </div>
      ))}
    </div>
  );

  const renderAnalytics = () => (
    <div className="analytics-section" style={{ padding: '20px' }}>
      <div className="analytics-cards" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div className="analytics-card" style={{
          backgroundColor: '#e7f3ff',
          padding: '25px',
          borderRadius: '15px',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ color: '#0071ce', margin: '0 0 15px 0', fontSize: '18px' }}>📊 Total Products</h3>
          <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#333', margin: '0 0 10px 0' }}>
            {products.length}
          </p>
          <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
            🥽 All AR-Enabled
          </p>
        </div>
        
        <div className="analytics-card" style={{
          backgroundColor: '#f0f8e7',
          padding: '25px',
          borderRadius: '15px',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ color: '#28a745', margin: '0 0 15px 0', fontSize: '18px' }}>💰 Total Value</h3>
          <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#333', margin: '0 0 10px 0' }}>
            ${products.reduce((sum, p) => sum + parseFloat(p.price || 0), 0).toFixed(2)}
          </p>
          <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
            🎨 Color Customizable
          </p>
        </div>
        
        <div className="analytics-card" style={{
          backgroundColor: '#fff3cd',
          padding: '25px',
          borderRadius: '15px',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ color: '#ffc107', margin: '0 0 15px 0', fontSize: '18px' }}>🛍️ Categories</h3>
          <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#333', margin: '0 0 10px 0' }}>
            {[...new Set(products.map(p => p.category))].length}
          </p>
          <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
            📏 Size Options Available
          </p>
        </div>
        
        <div className="analytics-card" style={{
          backgroundColor: '#ffe7e7',
          padding: '25px',
          borderRadius: '15px',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ color: '#dc3545', margin: '0 0 15px 0', fontSize: '18px' }}>🥽 AR Technology</h3>
          <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#333', margin: '0 0 10px 0' }}>
            100%
          </p>
          <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
            🎯 AR-Ready Products
          </p>
        </div>
      </div>
      
      {/* AR Technology Features */}
      <div className="ar-features-section" style={{
        backgroundColor: '#f8f9fa',
        padding: '25px',
        borderRadius: '15px',
        marginTop: '20px'
      }}>
        <h3 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>
          🚀 AR Technology Features
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            border: '1px solid #e9ecef'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🎨</div>
            <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>Color Customization</h4>
            <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
              Change colors in real-time
            </p>
          </div>
          
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            border: '1px solid #e9ecef'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>📏</div>
            <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>Size Selection</h4>
            <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
              Try different sizes
            </p>
          </div>
          
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            border: '1px solid #e9ecef'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔄</div>
            <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>360° View</h4>
            <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
              Rotate and explore
            </p>
          </div>
          
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            border: '1px solid #e9ecef'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🥽</div>
            <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>Virtual Try-On</h4>
            <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
              See before you buy
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderARTechnology = () => (
    <div className="ar-technology-section" style={{ padding: '20px' }}>
      <div className="ar-header" style={{
        textAlign: 'center',
        marginBottom: '30px',
        backgroundColor: '#ff6b35',
        color: 'white',
        padding: '25px',
        borderRadius: '15px'
      }}>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '28px' }}>🥽 AR Technology Dashboard</h2>
        <p style={{ margin: 0, fontSize: '16px', opacity: 0.9 }}>
          Experience the future of shopping with our advanced AR technology
        </p>
      </div>
      
      <div className="ar-stats" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e9ecef'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>🎨</div>
          <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>Color Options</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b35', margin: 0 }}>
            8+ Colors
          </p>
        </div>
        
        <div style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e9ecef'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>📏</div>
          <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>Size Options</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b35', margin: 0 }}>
            4+ Sizes
          </p>
        </div>
        
        <div style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e9ecef'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔄</div>
          <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>360° View</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b35', margin: 0 }}>
            Available
          </p>
        </div>
        
        <div style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e9ecef'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>🥽</div>
          <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>AR Ready</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b35', margin: 0 }}>
            {products.length}
          </p>
        </div>
      </div>
      
      <div className="ar-demo-section" style={{
        backgroundColor: '#f8f9fa',
        padding: '25px',
        borderRadius: '15px',
        marginBottom: '20px'
      }}>
        <h3 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>
          🚀 Try AR Technology with Any Product
        </h3>
        
        <div className="ar-demo-products" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          {products.slice(0, 6).map(product => (
            <div key={product.id} style={{
              backgroundColor: '#fff',
              padding: '15px',
              borderRadius: '10px',
              textAlign: 'center',
              border: '1px solid #e9ecef',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onClick={() => handleARClick(product)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                backgroundColor: '#ff6b35',
                color: 'white',
                padding: '3px 8px',
                borderRadius: '12px',
                fontSize: '8px',
                fontWeight: 'bold'
              }}>
                AR
              </div>
              
              <img 
                src={product.image_url || '/api/placeholder/120/120'} 
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  marginBottom: '10px'
                }}
              />
              
              <h4 style={{ fontSize: '12px', margin: '0 0 5px 0', color: '#333' }}>
                {product.name}
              </h4>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '3px', marginBottom: '8px' }}>
                {(() => {
                  try {
                    const colors = Array.isArray(product.colors) ? product.colors : [];
                    return colors.slice(0, 4).map((color, index) => (
                      <div
                        key={index}
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: color.hex,
                          border: '1px solid #ccc'
                        }}
                      />
                    ));
                  } catch (error) {
                    console.error('Error rendering colors for product:', product.id, error);
                    return [];
                  }
                })()}
              </div>
              
              <div style={{
                fontSize: '10px',
                color: '#ff6b35',
                fontWeight: 'bold'
              }}>
                🥽 Click to Try AR
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="ar-features-detailed" style={{
        backgroundColor: '#fff',
        padding: '25px',
        borderRadius: '15px',
        border: '1px solid #e9ecef'
      }}>
        <h3 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>
          🎯 AR Features in Detail
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            border: '1px solid #e9ecef'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>🎨 Real-Time Color Changing</h4>
            <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
              Change product colors instantly - Red, Blue, Green, Yellow, Purple, Black, White and more!
            </p>
          </div>
          
          <div style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            border: '1px solid #e9ecef'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>📏 Dynamic Size Selection</h4>
            <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
              Try different sizes (S, M, L, XL) with real-time price updates based on size selection.
            </p>
          </div>
          
          <div style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            border: '1px solid #e9ecef'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>🔄 360° Product View</h4>
            <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
              Rotate products to see them from every angle - perfect for shoes, watches, and accessories.
            </p>
          </div>
          
          <div style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            border: '1px solid #e9ecef'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>🥽 Virtual Try-On</h4>
            <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
              See products in 3D space with realistic lighting and shadows for authentic experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="walmart-admin-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="walmart-admin-container" style={{
        backgroundColor: '#fff',
        borderRadius: '15px',
        width: '90%',
        maxWidth: '900px',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        <div className="admin-header" style={{
          backgroundColor: '#0071ce',
          color: 'white',
          padding: '20px',
          borderRadius: '15px 15px 0 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ margin: 0, fontSize: '18px' }}>🛒 Walmart Admin Panel</h3>
          <button
            onClick={onClose || onBack}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
        </div>

        <div className="admin-nav" style={{
          backgroundColor: '#f8f9fa',
          padding: '15px 20px',
          borderBottom: '1px solid #e9ecef',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <button
            onClick={() => setCurrentView('products')}
            style={{
              padding: '12px 20px',
              backgroundColor: currentView === 'products' ? '#0071ce' : 'transparent',
              color: currentView === 'products' ? 'white' : '#333',
              border: '1px solid #0071ce',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}
          >
            📦 Products
          </button>
          
          <button
            onClick={() => setCurrentView('analytics')}
            style={{
              padding: '12px 20px',
              backgroundColor: currentView === 'analytics' ? '#0071ce' : 'transparent',
              color: currentView === 'analytics' ? 'white' : '#333',
              border: '1px solid #0071ce',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}
          >
            📊 Analytics
          </button>
          
          <button
            onClick={() => setCurrentView('ar-technology')}
            style={{
              padding: '12px 20px',
              backgroundColor: currentView === 'ar-technology' ? '#ff6b35' : 'transparent',
              color: currentView === 'ar-technology' ? 'white' : '#ff6b35',
              border: '1px solid #ff6b35',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}
          >
            🥽 AR Technology
          </button>
        </div>

        <div className="admin-content" style={{
          flex: 1,
          overflowY: 'auto'
        }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '20px' }}>⏳</div>
              <p>Loading admin data...</p>
            </div>
          ) : (
            <>
              {currentView === 'products' && renderProducts()}
              {currentView === 'analytics' && renderAnalytics()}
              {currentView === 'ar-technology' && renderARTechnology()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalmartAdmin;
