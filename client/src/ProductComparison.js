import React, { useState, useEffect } from 'react';

const ProductComparison = ({ isOpen, onClose, products = [] }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [comparisonProducts, setComparisonProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      setComparisonProducts(products.slice(0, 3)); // Compare max 3 products
    }
  }, [products]);

  const addProductToComparison = (product) => {
    if (selectedProducts.length < 3 && !selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const removeProductFromComparison = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const compareAttributes = [
    { key: 'price', label: 'Price', format: (val) => `$${val}` },
    { key: 'rating', label: 'Rating', format: (val) => `⭐ ${val}/5` },
    { key: 'reviewCount', label: 'Reviews', format: (val) => `${val} reviews` },
    { key: 'brand', label: 'Brand', format: (val) => val },
    { key: 'category', label: 'Category', format: (val) => val },
    { key: 'inStock', label: 'Availability', format: (val) => val ? '✅ In Stock' : '❌ Out of Stock' },
    { key: 'stockCount', label: 'Stock', format: (val) => `${val} available` },
    { key: 'arEnabled', label: 'AR Try-On', format: (val) => val ? '🥽 Available' : '❌ Not Available' }
  ];

  if (!isOpen) return null;

  return (
    <div className="comparison-overlay">
      <div className="comparison-modal">
        <div className="comparison-header">
          <h2>📊 Product Comparison</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {selectedProducts.length === 0 ? (
          <div className="comparison-empty">
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>Select Products to Compare</h3>
              <p>Choose 2-3 products to see a detailed comparison</p>
            </div>

            <div className="suggested-products">
              <h4>Suggested Products to Compare:</h4>
              <div className="suggested-grid">
                {comparisonProducts.map(product => (
                  <div key={product.id} className="suggested-product">
                    <img src={product.images[0]} alt={product.name} />
                    <h5>{product.name}</h5>
                    <p>${product.price}</p>
                    <button 
                      className="add-compare-btn"
                      onClick={() => addProductToComparison(product)}
                    >
                      + Add to Compare
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="comparison-content">
            <div className="comparison-products">
              {selectedProducts.map(product => (
                <div key={product.id} className="comparison-product">
                  <button 
                    className="remove-product"
                    onClick={() => removeProductFromComparison(product.id)}
                  >
                    ✕
                  </button>
                  <img src={product.images[0]} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p className="comparison-price">${product.price}</p>
                </div>
              ))}
              
              {selectedProducts.length < 3 && (
                <div className="add-more-slot">
                  <div className="add-more-content">
                    <div className="add-icon">+</div>
                    <p>Add Another Product</p>
                  </div>
                </div>
              )}
            </div>

            <div className="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>Feature</th>
                    {selectedProducts.map(product => (
                      <th key={product.id}>{product.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareAttributes.map(attr => (
                    <tr key={attr.key}>
                      <td className="attribute-label">{attr.label}</td>
                      {selectedProducts.map(product => (
                        <td key={product.id} className="attribute-value">
                          {attr.format(product[attr.key] || 'N/A')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="comparison-actions">
              <div className="winner-badge">
                <h4>🏆 Best Value Winner</h4>
                <p>{getBestValueProduct()?.name || 'No clear winner'}</p>
              </div>
              
              <div className="action-buttons">
                {selectedProducts.map(product => (
                  <button key={product.id} className="add-to-cart-comparison">
                    🛒 Add {product.name} to Cart
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .comparison-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .comparison-modal {
          background: white;
          border-radius: 20px;
          width: 95%;
          max-width: 1200px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .comparison-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #eee;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 20px 20px 0 0;
        }

        .comparison-header h2 {
          margin: 0;
          font-size: 1.5em;
        }

        .close-btn {
          background: rgba(255,255,255,0.2);
          border: none;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.2em;
          transition: background 0.3s ease;
        }

        .close-btn:hover {
          background: rgba(255,255,255,0.3);
        }

        .comparison-empty {
          padding: 40px;
          text-align: center;
        }

        .empty-state {
          margin-bottom: 40px;
        }

        .empty-icon {
          font-size: 4em;
          margin-bottom: 16px;
        }

        .empty-state h3 {
          color: #333;
          margin-bottom: 8px;
        }

        .empty-state p {
          color: #666;
        }

        .suggested-products h4 {
          text-align: left;
          margin-bottom: 16px;
          color: #333;
        }

        .suggested-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .suggested-product {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
        }

        .suggested-product img {
          width: 100%;
          height: 120px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 12px;
        }

        .suggested-product h5 {
          margin: 8px 0;
          color: #333;
          font-size: 0.9em;
        }

        .suggested-product p {
          color: #e74c3c;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .add-compare-btn {
          background: #007bff;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9em;
          transition: background 0.3s ease;
        }

        .add-compare-btn:hover {
          background: #0056b3;
        }

        .comparison-content {
          padding: 24px;
        }

        .comparison-products {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          justify-content: center;
        }

        .comparison-product {
          position: relative;
          background: #f8f9fa;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          min-width: 200px;
        }

        .remove-product {
          position: absolute;
          top: 8px;
          right: 8px;
          background: #e74c3c;
          color: white;
          border: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 0.8em;
        }

        .comparison-product img {
          width: 100%;
          height: 120px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 12px;
        }

        .comparison-product h4 {
          margin: 8px 0;
          color: #333;
          font-size: 1em;
        }

        .comparison-price {
          color: #e74c3c;
          font-weight: 700;
          font-size: 1.1em;
        }

        .add-more-slot {
          background: #f0f0f0;
          border: 2px dashed #ccc;
          border-radius: 12px;
          min-width: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .add-more-slot:hover {
          border-color: #007bff;
          background: #f8f9ff;
        }

        .add-more-content {
          text-align: center;
          color: #666;
        }

        .add-icon {
          font-size: 2em;
          margin-bottom: 8px;
        }

        .comparison-table {
          margin-bottom: 24px;
          overflow-x: auto;
        }

        .comparison-table table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .comparison-table th {
          background: #f8f9fa;
          padding: 12px;
          text-align: left;
          font-weight: 600;
          color: #333;
          border-bottom: 1px solid #eee;
        }

        .comparison-table td {
          padding: 12px;
          border-bottom: 1px solid #eee;
        }

        .attribute-label {
          font-weight: 600;
          color: #333;
          background: #f8f9fa;
        }

        .attribute-value {
          color: #666;
        }

        .comparison-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f8f9fa;
          padding: 20px;
          border-radius: 12px;
        }

        .winner-badge h4 {
          margin: 0 0 4px 0;
          color: #333;
        }

        .winner-badge p {
          margin: 0;
          color: #007bff;
          font-weight: 600;
        }

        .action-buttons {
          display: flex;
          gap: 12px;
        }

        .add-to-cart-comparison {
          background: #28a745;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9em;
          transition: background 0.3s ease;
        }

        .add-to-cart-comparison:hover {
          background: #218838;
        }

        @media (max-width: 768px) {
          .comparison-modal {
            width: 98%;
            margin: 10px;
          }
          
          .comparison-products {
            flex-direction: column;
            align-items: center;
          }
          
          .comparison-actions {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
          
          .action-buttons {
            flex-direction: column;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );

  function getBestValueProduct() {
    if (selectedProducts.length === 0) return null;
    
    // Simple algorithm: highest rating with reasonable price
    return selectedProducts.reduce((best, current) => {
      const bestScore = (best.rating || 0) / (best.price || 1);
      const currentScore = (current.rating || 0) / (current.price || 1);
      return currentScore > bestScore ? current : best;
    });
  }
};

export default ProductComparison;
