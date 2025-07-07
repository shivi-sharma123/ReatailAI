import React, { useState, useEffect } from 'react';
import './EnhancedChatbot.css';

const EnhancedChatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: '🛒 Welcome to Walmart AI Shopping Assistant! 🎯',
      timestamp: new Date()
    },
    { 
      sender: 'bot', 
      text: '😊 Tell me how you\'re feeling today and I\'ll find the perfect products for you!\n\n💡 Try saying:\n• "I feel happy" 😄 - Party outfits & fun items\n• "I feel sad" 😢 - Comfort products & mood boosters\n• "I feel normal" 😐 - Everyday essentials\n• "Show me electronics" 💻 - Tech products',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const [arMode, setArMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);

  // Enhanced color palette
  const beautifulColors = [
    { name: 'Midnight Blue', hex: '#1e3a8a', bg: 'linear-gradient(135deg, #1e3a8a, #3b82f6)' },
    { name: 'Rose Gold', hex: '#e11d48', bg: 'linear-gradient(135deg, #e11d48, #f472b6)' },
    { name: 'Emerald Green', hex: '#059669', bg: 'linear-gradient(135deg, #059669, #10b981)' },
    { name: 'Sunset Orange', hex: '#ea580c', bg: 'linear-gradient(135deg, #ea580c, #f97316)' },
    { name: 'Royal Purple', hex: '#7c3aed', bg: 'linear-gradient(135deg, #7c3aed, #a855f7)' },
    { name: 'Classic Black', hex: '#1f2937', bg: 'linear-gradient(135deg, #1f2937, #374151)' }
  ];

  const sizeOptions = ['Small', 'Medium', 'Large'];

  const moodEmojis = {
    happy: '😊',
    sad: '😢',
    normal: '😐',
    natural: '🌿',
    casual: '👕',
    professional: '💼',
    rainy: '🌧️'
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { 
      sender: 'user', 
      text: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);
    setTypingIndicator(true);

    try {
      console.log('Sending message to chatbot API:', currentInput);
      
      const response = await fetch('http://localhost:5000/api/chatbot', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ message: currentInput })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Chatbot API response:', data);

      if (data.error) {
        throw new Error(data.error);
      }

      const detectedMood = data.mood || data.detected_mood || 'general';
      const message = data.message || `Here are some great ${detectedMood} products for you!`;
      const products = data.products || [];

      const botMessage = {
        sender: 'bot',
        text: message,
        products: products,
        mood: detectedMood,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Chatbot error:', error);
      
      const errorMessage = {
        sender: 'bot',
        text: '🤖 Oops! I\'m having trouble connecting to my brain right now! 🧠⚡\n\nPlease make sure:\n• The backend server is running\n• You\'re connected to the internet\n\nTry again in a moment! 💫',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setTypingIndicator(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setArMode(true);
    setSelectedColor(0);
    setSelectedSize(1);
    setRotationAngle(0);

    const productMessage = {
      sender: 'bot',
      text: `🎯 Great choice! "${product.name}" is now in AR mode!\n\n💰 Price: $${product.price}\n⭐ Rating: ${product.rating}/5\n🏷️ Category: ${product.category}\n📦 ${product.inStock ? 'In Stock' : 'Out of Stock'}\n\n🥽 AR Features:\n• Click "Rotate" to see 360° view\n• Change colors with the palette below\n• Select your size (S/M/L)\n• Experience the product in virtual reality!`,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, productMessage]);
  };

  const handleARRotate = () => {
    setRotationAngle(prev => (prev + 45) % 360);
  };

  const handleColorChange = (colorIndex) => {
    setSelectedColor(colorIndex);
  };

  const handleSizeChange = (sizeIndex) => {
    setSelectedSize(sizeIndex);
  };

  const closeARMode = () => {
    setArMode(false);
    setSelectedProduct(null);
    setRotationAngle(0);
  };

  const getSuggestionChips = () => {
    const suggestions = [
      { text: "I feel happy 😊", emoji: "😊" },
      { text: "I feel sad 😢", emoji: "😢" },
      { text: "I feel normal 😐", emoji: "😐" },
      { text: "Show me electronics 💻", emoji: "💻" },
      { text: "I need something casual 👕", emoji: "👕" }
    ];

    return suggestions.map((suggestion, index) => (
      <button
        key={index}
        className="suggestion-chip"
        onClick={() => {
          setInput(suggestion.text);
          setTimeout(() => handleSendMessage(), 100);
        }}
      >
        {suggestion.emoji} {suggestion.text}
      </button>
    ));
  };

  return (
    <div className="enhanced-chatbot-container">
      <div className="chatbot-window">
        <div className="chatbot-header">
          <div className="header-content">
            <div className="walmart-logo">
              <div className="walmart-spark">⭐</div>
              <span>Walmart AI Assistant</span>
            </div>
            <div className="header-subtitle">
              🤖 Smart Shopping • 🎯 Mood Detection • 🛍️ AR Experience
            </div>
          </div>
          {onClose && (
            <button className="close-btn" onClick={onClose}>
              ×
            </button>
          )}
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message-wrapper ${msg.sender}`}>
              <div className={`message-bubble ${msg.sender}`}>
                <div className="message-text">
                  {msg.text.split('\\n').map((line, i) => (
                    <div key={i} className="message-line">
                      {line}
                    </div>
                  ))}
                </div>
                
                {msg.products && msg.products.length > 0 && (
                  <div className="products-container">
                    <div className="mood-badge">
                      {moodEmojis[msg.mood] || '🛍️'} {msg.mood?.toUpperCase()} MOOD
                    </div>
                    
                    <div className="products-grid">
                      {msg.products.slice(0, 6).map((product, productIdx) => (
                        <div 
                          key={productIdx} 
                          className="product-card"
                          onClick={() => handleProductClick(product)}
                        >
                          <div className="product-image">
                            <img 
                              src={product.image_url || product.image || 'https://via.placeholder.com/150x150?text=No+Image'} 
                              alt={product.name}
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/150x150?text=No+Image';
                              }}
                            />
                            {product.ar_enabled && (
                              <div className="ar-badge">🥽 AR</div>
                            )}
                          </div>
                          
                          <div className="product-info">
                            <div className="product-name">{product.name}</div>
                            <div className="product-price">
                              ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                            </div>
                            <div className="product-rating">
                              ⭐ {product.rating || '4.5'}
                            </div>
                            <button 
                              className="product-ar-btn"
                              onClick={() => handleProductClick(product)}
                            >
                              🥽 Try AR
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="message-timestamp">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {typingIndicator && (
            <div className="message-wrapper bot">
              <div className="message-bubble bot typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="suggestions-container">
          <div className="suggestions-scroll">
            {getSuggestionChips()}
          </div>
        </div>

        <div className="chatbot-input-container">
          <div className="input-wrapper">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tell me how you're feeling or what you need..."
              disabled={loading}
              className="chatbot-input"
            />
            <button 
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="send-btn"
            >
              {loading ? '⏳' : '🚀'}
            </button>
          </div>
        </div>
      </div>
      
      {/* AR Mode Overlay */}
      {arMode && selectedProduct && (
        <div className="ar-mode-overlay">
          <div className="ar-container">
            <div className="ar-header">
              <h3>🥽 AR Experience - {selectedProduct.name}</h3>
              <button className="ar-close-btn" onClick={closeARMode}>✕</button>
            </div>
            
            <div className="ar-product-display">
              <div 
                className="ar-product-image"
                style={{ 
                  transform: `rotate(${rotationAngle}deg)`,
                  filter: `hue-rotate(${selectedColor * 60}deg)`,
                  background: beautifulColors[selectedColor].bg
                }}
              >
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  style={{ transform: `rotate(${rotationAngle}deg)` }}
                />
                <div className="ar-tech-overlay">
                  <div className="ar-grid"></div>
                  <div className="ar-particles"></div>
                </div>
              </div>
              
              <div className="ar-controls">
                <button className="ar-rotate-btn" onClick={handleARRotate}>
                  🔄 Rotate 360°
                </button>
                
                <div className="ar-color-selector">
                  <h4>Colors:</h4>
                  <div className="color-palette">
                    {beautifulColors.map((color, index) => (
                      <button
                        key={index}
                        className={`color-btn ${selectedColor === index ? 'active' : ''}`}
                        style={{ background: color.bg }}
                        onClick={() => handleColorChange(index)}
                        title={color.name}
                      >
                        {selectedColor === index && '✓'}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="ar-size-selector">
                  <h4>Size:</h4>
                  <div className="size-buttons">
                    {sizeOptions.map((size, index) => (
                      <button
                        key={index}
                        className={`size-btn ${selectedSize === index ? 'active' : ''}`}
                        onClick={() => handleSizeChange(index)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="ar-product-info">
                  <h4>{selectedProduct.name}</h4>
                  <p className="ar-price">${selectedProduct.price}</p>
                  <p className="ar-color">Color: {beautifulColors[selectedColor].name}</p>
                  <p className="ar-size">Size: {sizeOptions[selectedSize]}</p>
                </div>
                
                <button className="ar-add-to-cart">
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedChatbot;
