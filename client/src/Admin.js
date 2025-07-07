import React, { useState, useEffect } from 'react';
import './Admin.css';
import EnhancedARViewer from './EnhancedARViewer_New';
import ARGlassesViewer from './ARGlassesViewer';

function Admin() {
  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [currentView, setCurrentView] = useState('products');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAR, setShowAR] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    mood_category: '',
    price: '',
    description: '',
    emoji: '',
    image_url: '',
    brand: '',
    rating: '',
    tags: '',
    is_trending: false,
    stock_quantity: ''
  });

  const moodCategories = [
    'rainy', 'sunny', 'party', 'professional', 'fitness', 
    'casual', 'romantic', 'happy', 'comfort', 'energetic', 'general'
  ];

  useEffect(() => {
    fetchProducts();
    fetchAnalytics();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/analytics');
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingProduct 
        ? `http://localhost:5000/api/products/${editingProduct.id}`
        : 'http://localhost:5000/api/products';
      
      const method = editingProduct ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price) || 0,
          rating: parseFloat(formData.rating) || 0,
          stock_quantity: parseInt(formData.stock_quantity) || 100
        })
      });

      if (response.ok) {
        fetchProducts();
        resetForm();
        alert(editingProduct ? 'Product updated!' : 'Product created!');
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      mood_category: product.mood_category,
      price: product.price.toString(),
      description: product.description,
      emoji: product.emoji,
      image_url: product.image_url || '',
      brand: product.brand || '',
      rating: product.rating.toString(),
      tags: product.tags || '',
      is_trending: product.is_trending || false,
      stock_quantity: product.stock_quantity.toString()
    });
  };

  const handleDelete = async (productId) => {
    // Get product name for confirmation
    const product = products.find(p => p.id === productId);
    const productName = product ? product.name : 'this product';
    
    if (window.confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
          method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Show detailed success message
          const deletedProduct = data.deleted_product;
          const affectedInteractions = data.affected_interactions || 0;
          
          let message = `✅ Successfully deleted "${deletedProduct.name}"`;
          if (affectedInteractions > 0) {
            message += `\n📊 Also cleaned up ${affectedInteractions} related interaction record(s)`;
          }
          
          alert(message);
          fetchProducts(); // Refresh the product list
          
          // If we were editing this product, reset the form
          if (editingProduct && editingProduct.id === productId) {
            resetForm();
          }
        } else {
          // Handle error response
          alert(`❌ Failed to delete product: ${data.message || data.error}`);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('❌ Network error occurred while deleting product. Please try again.');
      }
    }
  };

  const openARViewer = (product) => {
    setSelectedProduct(product);
    setShowAR(true);
  };

  const closeARViewer = () => {
    setShowAR(false);
    setSelectedProduct(null);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: '',
      mood_category: '',
      price: '',
      description: '',
      emoji: '',
      image_url: '',
      brand: '',
      rating: '',
      tags: '',
      is_trending: false,
      stock_quantity: ''
    });
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>🛍️ RetailFlow AI - Admin Panel</h1>
        <nav className="admin-nav">
          <button 
            className={currentView === 'products' ? 'active' : ''}
            onClick={() => setCurrentView('products')}
          >
            Products Management
          </button>
          <button 
            className={currentView === 'analytics' ? 'active' : ''}
            onClick={() => setCurrentView('analytics')}
          >
            Analytics
          </button>
          <button 
            className={currentView === 'ar-glasses' ? 'active' : ''}
            onClick={() => setCurrentView('ar-glasses')}
          >
            🕶️ AR Glasses Experience
          </button>
        </nav>
      </div>

      {currentView === 'products' && (
        <div className="products-section">
          <div className="form-section">
            <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-group">
                <label>Product Name:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Brand:</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  placeholder="Nike, Adidas, etc."
                />
              </div>
              
              <div className="form-group">
                <label>Category:</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Mood Category:</label>
                <select
                  value={formData.mood_category}
                  onChange={(e) => setFormData({...formData, mood_category: e.target.value})}
                  required
                >
                  <option value="">Select Mood</option>
                  {moodCategories.map(mood => (
                    <option key={mood} value={mood}>{mood}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Price ($):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Rating (0-5):</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Image URL:</label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="form-group">
                <label>Emoji:</label>
                <input
                  type="text"
                  value={formData.emoji}
                  onChange={(e) => setFormData({...formData, emoji: e.target.value})}
                  placeholder="🛍️"
                />
              </div>
              
              <div className="form-group">
                <label>Tags (comma separated):</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  placeholder="casual, summer, cotton"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Stock Quantity:</label>
                  <input
                    type="number"
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
                    min="0"
                  />
                </div>
                
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.is_trending}
                      onChange={(e) => setFormData({...formData, is_trending: e.target.checked})}
                    />
                    Mark as Trending
                  </label>
                </div>
              </div>
              
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="3"
                ></textarea>
              </div>
              
              <div className="form-buttons">
                <button type="submit">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                {editingProduct && (
                  <button type="button" onClick={resetForm}>Cancel</button>
                )}
              </div>
            </form>
          </div>

          <div className="products-list">
            <h3>Products ({products.length})</h3>
            <div className="products-grid">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} />
                    ) : (
                      <div className="no-image">{product.emoji}</div>
                    )}
                    {product.is_trending && <span className="trending-badge">🔥 Trending</span>}
                  </div>
                  
                  <div className="product-header">
                    <span className="product-emoji">{product.emoji}</span>
                    <h4>{product.name}</h4>
                  </div>
                  
                  <div className="product-details">
                    <p><strong>Brand:</strong> {product.brand || 'N/A'}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Mood:</strong> {product.mood_category}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Rating:</strong> ⭐ {product.rating}/5</p>
                    <p><strong>Stock:</strong> {product.stock_quantity} units</p>
                    <p><strong>Description:</strong> {product.description}</p>
                    {product.tags && <p><strong>Tags:</strong> {product.tags}</p>}
                  </div>
                  
                  <div className="product-actions">
                    <button onClick={() => handleEdit(product)}>Edit</button>
                    <button onClick={() => handleDelete(product.id)}>Delete</button>
                    <button onClick={() => openARViewer(product)} className="ar-preview-btn">
                      🥽 AR Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentView === 'analytics' && analytics && (
        <div className="analytics-section">
          <h3>User Interaction Analytics</h3>
          
          <div className="analytics-grid">
            <div className="analytics-card">
              <h4>Popular Moods</h4>
              <div className="mood-stats">
                {analytics.mood_stats.map(stat => (
                  <div key={stat.mood} className="mood-stat">
                    <span className="mood-name">{stat.mood}</span>
                    <span className="mood-count">{stat.count} searches</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="analytics-card">
              <h4>Recent Interactions</h4>
              <div className="recent-interactions">
                {analytics.recent_interactions.map((interaction, idx) => (
                  <div key={idx} className="interaction">
                    <div className="interaction-text">"{interaction.user_input}"</div>
                    <div className="interaction-mood">→ {interaction.detected_mood}</div>
                    <div className="interaction-time">{new Date(interaction.timestamp).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {currentView === 'ar-glasses' && (
        <ARGlassesViewer />
      )}

      {showAR && selectedProduct && (
        <EnhancedARViewer 
          product={selectedProduct} 
          onClose={closeARViewer} 
        />
      )}
    </div>
  );
}

export default Admin;
