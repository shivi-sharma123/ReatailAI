import React, { useState, useEffect } from 'react';
import './ProductRecommendations.css';

function ProductRecommendations({ currentProduct, onProductClick, onAddToCart, allProducts = [] }) {
  const [recommendations, setRecommendations] = useState([]);
  const [frequentlyBought, setFrequentlyBought] = useState([]);

  // Amazon-style product recommendations
  const generateRecommendations = (product) => {
    if (!product || !allProducts.length) return;

    // Find products in the same category
    let categoryProducts = allProducts.filter(p => 
      p.id !== product.id && p.category === product.category
    );

    // If not enough in same category, get from all products
    if (categoryProducts.length < 6) {
      const otherProducts = allProducts.filter(p => 
        p.id !== product.id && p.category !== product.category
      );
      categoryProducts = [...categoryProducts, ...otherProducts];
    }

    // Sort by rating and take top 6
    categoryProducts.sort((a, b) => b.rating - a.rating);
    const selectedRecommendations = categoryProducts.slice(0, 6).map(p => ({
      ...p,
      reason: p.category === product.category 
        ? "Customers who bought this item also bought"
        : "You might also like"
    }));

    setRecommendations(selectedRecommendations);
    
    // Generate frequently bought together from similar category
    const frequentItems = categoryProducts.slice(0, 3).map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image_url || p.image,
      checked: true
    }));

    setFrequentlyBought(frequentItems);
  };

  useEffect(() => {
    if (currentProduct && allProducts.length > 0) {
      generateRecommendations(currentProduct);
    }
  }, [currentProduct, allProducts]);

  const calculateBundleTotal = () => {
    const selectedItems = frequentlyBought.filter(item => item.checked);
    const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
    return total + currentProduct.price;
  };

  const calculateSavings = () => {
    const bundleTotal = calculateBundleTotal();
    const individualTotal = frequentlyBought.reduce((sum, item) => sum + item.price, 0) + currentProduct.price;
    return individualTotal - bundleTotal + 5.99; // Bundle discount
  };

  return (
    <div className="product-recommendations">
      {/* Frequently Bought Together - Amazon Style */}
      <section className="frequently-bought-together">
        <h3>📦 Frequently bought together</h3>
        <div className="bundle-container">
          <div className="bundle-items">
            {/* Main Product */}
            <div className="bundle-item main-product">
              <img src={currentProduct.image} alt={currentProduct.name} />
              <div className="item-info">
                <h4>{currentProduct.name}</h4>
                <span className="price">${currentProduct.price}</span>
              </div>
              <div className="plus-icon">+</div>
            </div>

            {/* Related Products */}
            {frequentlyBought.map(item => (
              <div key={item.id} className="bundle-item">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={(e) => {
                    setFrequentlyBought(prev =>
                      prev.map(product =>
                        product.id === item.id
                          ? { ...product, checked: e.target.checked }
                          : product
                      )
                    );
                  }}
                />
                <img src={item.image || `https://via.placeholder.com/100x100/e5e7eb/6b7280?text=${item.name.replace(' ', '+')}`} alt={item.name} />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <span className="price">${item.price}</span>
                </div>
                {item !== frequentlyBought[frequentlyBought.length - 1] && (
                  <div className="plus-icon">+</div>
                )}
              </div>
            ))}
          </div>

          <div className="bundle-summary">
            <div className="total-price">
              <span className="label">Total price:</span>
              <span className="amount">${calculateBundleTotal().toFixed(2)}</span>
            </div>
            <div className="savings">
              Save ${calculateSavings().toFixed(2)} with bundle
            </div>
            <button className="add-bundle-to-cart">
              Add selected to cart
            </button>
          </div>
        </div>
      </section>

      {/* Customers who viewed this item also viewed */}
      <section className="also-viewed">
        <h3>👀 Customers who viewed this item also viewed</h3>
        <div className="recommendations-grid">
          {recommendations.map(product => (
            <div 
              key={product.id} 
              className="recommendation-card"
              onClick={() => onProductClick(product)}
              style={{ cursor: 'pointer' }}
            >
              <img src={product.image_url || product.image || `https://via.placeholder.com/200x200/e5e7eb/6b7280?text=${product.name.replace(' ', '+')}`} alt={product.name} />
              <div className="product-info">
                <h4>{product.name}</h4>
                <div className="rating">
                  {'⭐'.repeat(Math.floor(product.rating))} {product.rating}
                </div>
                <div className="price-section">
                  <span className="current-price">${product.price}</span>
                  {product.originalPrice && (
                    <span className="original-price">${product.originalPrice}</span>
                  )}
                </div>
                <div className="reason">{product.reason}</div>
                <button 
                  className="quick-add-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the card click
                    onAddToCart(product);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sponsored Products */}
      <section className="sponsored-products">
        <h3>💡 Sponsored products related to this item</h3>
        <div className="sponsored-grid">
          <div className="sponsored-item">
            <div className="sponsored-badge">Sponsored</div>
            <img src="https://via.placeholder.com/150x150/f59e0b/ffffff?text=Ad" alt="Sponsored" />
            <h4>Premium Accessory</h4>
            <div className="ad-price">$49.99</div>
            <button className="sponsored-btn">View Deal</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductRecommendations;
