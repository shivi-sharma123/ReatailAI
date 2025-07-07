import React, { useState } from 'react';
import './Chatbot.css';
import EnhancedARViewer from './EnhancedARViewer_New';

function Chatbot() {
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: '🎉 Hey there! Welcome to your personal AI shopping assistant! ✨' 
    },
    { 
      sender: 'bot', 
      text: '💫 Tell me how you\'re feeling today and I\'ll suggest perfect products for you! Try: "I am sad", "I am happy", "I am feeling normal" - I have amazing suggestions with AR try-on! 🥽🛍️' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = { sender: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setLoading(true);
    
    try {
      const res = await fetch('http://localhost:5000/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      const detectedMood = data.mood || 'general';
      const message = data.message || `Here are suggestions for "${detectedMood}"`;
      
      const botMsg = { 
        sender: 'bot', 
        text: message,
        products: data.products || [],
        mood: detectedMood
      };
      
      setMessages((msgs) => [...msgs, botMsg]);
      
    } catch (err) {
      console.error('Error:', err);
      const errorMsg = { 
        sender: 'bot', 
        text: '🤖 Oops! My AI brain is taking a quick coffee break! ☕ Please make sure the backend is running and try again. I promise I have AMAZING products waiting for you! 🌟' 
      };
      setMessages((msgs) => [...msgs, errorMsg]);
    }
    
    setInput('');
    setLoading(false);
  };

  const openARViewer = (product) => {
    setSelectedProduct(product);
    setShowAR(true);
  };

  const closeARViewer = () => {
    setShowAR(false);
    setSelectedProduct(null);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3>🤖 Walmart AR Shopping Assistant</h3>
        <p>AI-powered mood detection with AR try-on technology!</p>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chatbot-msg chatbot-msg-${msg.sender}`}>
            <div className="message-text">
              {msg.text.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
            
            {msg.products && msg.products.length > 0 && (
              <div className="products-display">
                <div className="mood-indicator" style={{
                  backgroundColor: '#e7f3ff',
                  padding: '10px',
                  borderRadius: '10px',
                  marginBottom: '15px',
                  textAlign: 'center'
                }}>
                  <strong>🎯 Mood Detected: {msg.mood || 'General'}</strong>
                </div>
                <h4>🛍️ Product Gallery with AR Try-On:</h4>
                <div className="products-grid">
                  {msg.products.map((product, i) => (
                    <div key={i} className="product-item">
                      <div className="product-image">
                        <img 
                          src={product.image_url || product.image || 'https://via.placeholder.com/400x400/f0f0f0/666666?text=Product+Image'} 
                          alt={product.name} 
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x400/f0f0f0/666666?text=Product+Image';
                          }} 
                          loading="lazy"
                        />
                        {product.is_trending && <span className="trending-badge">🔥</span>}
                        {product.stock_quantity < 10 && <span className="stock-badge">⚠️ Low Stock</span>}
                        {product.ar_enabled && <span className="ar-badge">AR 🥽</span>}
                      </div>
                      <div className="product-info">
                        <h5>{product.name}</h5>
                        {product.brand && <p className="brand">🏷️ {product.brand}</p>}
                        {product.price && <p className="price">💰 ${product.price}</p>}
                        {product.rating && <p className="rating">⭐ {product.rating}/5</p>}
                        {product.category && <p className="category">📂 {product.category}</p>}
                        {product.color_variants && product.color_variants.length > 0 && (
                          <p className="colors">🎨 {product.color_variants.length} colors</p>
                        )}
                        {product.size_chart && product.size_chart.length > 0 && (
                          <p className="sizes">📏 {product.size_chart.length} sizes</p>
                        )}
                      </div>
                      <div className="product-actions">
                        {product.ar_enabled && (
                          <button 
                            className="ar-try-on-btn"
                            onClick={() => openARViewer(product)}
                          >
                            🥽 Try in AR
                          </button>
                        )}
                        <button className="quick-view-btn">👁️ Quick View</button>
                        <button className="add-cart-btn">🛒 Add to Cart</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        {loading && <div className="chatbot-msg chatbot-msg-bot">🤔 Thinking about perfect products for you...</div>}
      </div>
      <form className="chatbot-input" onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your mood here..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()}>
          {loading ? '...' : 'Send'}
        </button>
      </form>
      
      {/* Enhanced AR Viewer Modal */}
      {showAR && selectedProduct && (
        <EnhancedARViewer 
          product={selectedProduct} 
          onClose={closeARViewer}
        />
      )}
    </div>
  );
}

export default Chatbot;
