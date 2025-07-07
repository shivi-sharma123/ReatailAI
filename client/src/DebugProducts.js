import React, { useState, useEffect } from 'react';

const DebugProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log('🔄 Fetching products...');
      const response = await fetch('http://localhost:5000/api/products');
      
      if (response.ok) {
        const data = await response.json();
        console.log('📦 API Response:', data);
        
        const products = data.products || [];
        console.log('📊 Products count:', products.length);
        
        if (products.length > 0) {
          console.log('🔍 First product:', products[0]);
          console.log('🎨 Colors type:', typeof products[0].colors);
          console.log('🎨 Colors value:', products[0].colors);
          console.log('📏 Sizes type:', typeof products[0].sizes);
          console.log('📏 Sizes value:', products[0].sizes);
        }
        
        setProducts(products);
      } else {
        throw new Error(`API Error: ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Error fetching products:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>🔄 Loading products...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>❌ Error: {error}</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>🧪 Debug Products Data</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <strong>📊 Total Products:</strong> {products.length}
      </div>
      
      {products.slice(0, 3).map((product, index) => (
        <div key={product.id} style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '15px',
          backgroundColor: '#f9f9f9'
        }}>
          <h3>🛍️ {product.name}</h3>
          <p><strong>💰 Price:</strong> ${product.price}</p>
          <p><strong>📝 Category:</strong> {product.category}</p>
          
          <div style={{ marginTop: '10px' }}>
            <strong>🎨 Colors:</strong>
            <pre style={{ fontSize: '12px', background: '#eee', padding: '5px', overflow: 'auto' }}>
              Type: {typeof product.colors}
              {'\n'}Value: {JSON.stringify(product.colors, null, 2)}
            </pre>
          </div>
          
          <div style={{ marginTop: '10px' }}>
            <strong>📏 Sizes:</strong>
            <pre style={{ fontSize: '12px', background: '#eee', padding: '5px', overflow: 'auto' }}>
              Type: {typeof product.sizes}
              {'\n'}Value: {JSON.stringify(product.sizes, null, 2)}
            </pre>
          </div>
          
          <div style={{ marginTop: '10px' }}>
            <strong>🎨 Color Dots Test:</strong>
            <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
              {(() => {
                try {
                  const colors = Array.isArray(product.colors) ? product.colors : 
                                typeof product.colors === 'string' ? JSON.parse(product.colors) : [];
                  
                  return colors.slice(0, 5).map((color, i) => (
                    <div
                      key={i}
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: color.hex,
                        border: '1px solid #ccc',
                        display: 'inline-block'
                      }}
                      title={color.name}
                    />
                  ));
                } catch (err) {
                  return <span style={{ color: 'red' }}>❌ Error: {err.message}</span>;
                }
              })()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DebugProducts;
