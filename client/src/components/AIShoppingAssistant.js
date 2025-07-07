import React, { useState, useRef, useEffect } from 'react';
import './AIShoppingAssistant.css';

const AIShoppingAssistant = ({ isOpen, onClose, currentProduct = null }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [assistantMode, setAssistantMode] = useState('general'); // general, product, order, comparison
  const [voiceListening, setVoiceListening] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize conversation
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        type: 'assistant',
        content: "👋 Hi! I'm your AI Shopping Assistant. I can help you find products, compare items, track orders, or suggest complete outfits. What can I help you with today?",
        timestamp: new Date(),
        suggestions: [
          "Find blue sunglasses under $200",
          "Compare these glasses",
          "Track my order",
          "Suggest a complete look",
          "What's trending now?"
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate AI Response (replace with actual GPT-4o API)
  const generateAIResponse = async (userMessage, context = {}) => {
    setIsTyping(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const messageText = userMessage.toLowerCase();
    let response = {};

    // Product Search
    if (messageText.includes('find') || messageText.includes('search') || messageText.includes('looking for')) {
      response = {
        type: 'assistant',
        content: "🔍 I found some great options for you! Let me show you the best matches based on your preferences.",
        productResults: [
          {
            id: 'search-1',
            name: 'Classic Blue Aviators',
            brand: 'SkyVision',
            price: 189.99,
            image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            match: 95,
            reason: 'Perfect match for your style and budget'
          },
          {
            id: 'search-2',
            name: 'Modern Square Blues',
            brand: 'UrbanChic',
            price: 159.99,
            image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            match: 88,
            reason: 'Trending style in your area'
          }
        ],
        suggestions: ["Try AR on these", "Compare all features", "Show similar products"]
      };
      setAssistantMode('product');
    }
    
    // Product Comparison
    else if (messageText.includes('compare') || messageText.includes('difference')) {
      response = {
        type: 'assistant',
        content: "📊 Here's a detailed comparison of these products:",
        comparison: {
          products: [
            {
              name: 'Classic Aviator',
              price: '$299.99',
              features: ['UV Protection', 'Anti-Glare', 'Lightweight'],
              pros: ['Timeless style', 'Premium materials'],
              cons: ['Higher price point']
            },
            {
              name: 'Modern Square',
              price: '$399.99',
              features: ['Blue Light Filter', 'Scratch Resistant', 'Flexible'],
              pros: ['Professional look', 'Latest technology'],
              cons: ['Limited color options']
            }
          ]
        },
        suggestions: ["Try both in AR", "See customer reviews", "Check availability"]
      };
      setAssistantMode('comparison');
    }
    
    // Order Tracking
    else if (messageText.includes('order') || messageText.includes('track') || messageText.includes('delivery')) {
      response = {
        type: 'assistant',
        content: "📦 Let me check your recent orders...",
        orderInfo: {
          orderNumber: 'RFA-2025-001247',
          status: 'Out for Delivery',
          estimatedDelivery: 'Today by 6:00 PM',
          trackingSteps: [
            { step: 'Order Confirmed', completed: true, time: '2 days ago' },
            { step: 'Processing', completed: true, time: '1 day ago' },
            { step: 'Shipped', completed: true, time: '8 hours ago' },
            { step: 'Out for Delivery', completed: true, time: '2 hours ago' },
            { step: 'Delivered', completed: false, time: 'Expected by 6:00 PM' }
          ]
        },
        suggestions: ["Change delivery address", "Contact delivery partner", "Rate your experience"]
      };
      setAssistantMode('order');
    }
    
    // Style Suggestions / Outfits
    else if (messageText.includes('outfit') || messageText.includes('style') || messageText.includes('look') || messageText.includes('suggest')) {
      response = {
        type: 'assistant',
        content: "✨ I've created some amazing style combinations for you!",
        styleBoard: {
          theme: 'Professional Elegance',
          mainProduct: 'Classic Aviator Glasses',
          suggestions: [
            {
              category: 'Watch',
              item: 'Luxury Smart Watch',
              price: '$399',
              image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
            },
            {
              category: 'Accessories',
              item: 'Leather Wallet',
              price: '$129',
              image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
            }
          ],
          totalLook: '$927.98',
          savings: '$157 (Bundle Discount)'
        },
        suggestions: ["Add to cart as bundle", "Try AR styling", "See other themes"]
      };
      setAssistantMode('general');
    }
    
    // Trending Products
    else if (messageText.includes('trending') || messageText.includes('popular') || messageText.includes('hot')) {
      response = {
        type: 'assistant',
        content: "🔥 Here's what's trending right now in your area!",
        trendingItems: [
          {
            rank: 1,
            name: 'AR Smart Glasses',
            growth: '+247%',
            image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
          },
          {
            rank: 2,
            name: 'Eco Bamboo Frames',
            growth: '+189%',
            image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
          }
        ],
        suggestions: ["Try trending items", "Set trend alerts", "Share with friends"]
      };
    }
    
    // Default/General Response
    else {
      response = {
        type: 'assistant',
        content: "I'd be happy to help! I can assist you with finding products, comparing items, tracking orders, or creating style combinations. What would you like to explore?",
        suggestions: [
          "Find products by description",
          "Compare multiple items",
          "Track my orders",
          "Suggest complete outfits",
          "Show trending products"
        ]
      };
    }

    setIsTyping(false);
    return {
      id: Date.now(),
      ...response,
      timestamp: new Date()
    };
  };

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Generate AI response
    const aiResponse = await generateAIResponse(messageText, { currentProduct });
    setMessages(prev => [...prev, aiResponse]);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Voice Input (Web Speech API)
  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      setVoiceListening(true);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setVoiceListening(false);
      };

      recognition.onerror = () => {
        setVoiceListening(false);
      };

      recognition.onend = () => {
        setVoiceListening(false);
      };

      recognition.start();
    } else {
      alert('Voice input not supported in this browser');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="ai-shopping-assistant">
      <div className="assistant-overlay" onClick={onClose}></div>
      <div className="assistant-container">
        {/* Header */}
        <div className="assistant-header">
          <div className="assistant-info">
            <div className="assistant-avatar">
              <span className="avatar-icon">🤖</span>
              <div className="status-indicator active"></div>
            </div>
            <div className="assistant-details">
              <h3>AI Shopping Assistant</h3>
              <p className="status-text">Online • Ready to help</p>
            </div>
          </div>
          <div className="header-controls">
            <button className="mode-indicator" title={`Mode: ${assistantMode}`}>
              {assistantMode === 'product' && '🔍'}
              {assistantMode === 'comparison' && '📊'}
              {assistantMode === 'order' && '📦'}
              {assistantMode === 'general' && '💬'}
            </button>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Messages */}
        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
              <div className="message-content">
                <div className="message-text">{message.content}</div>
                
                {/* Product Results */}
                {message.productResults && (
                  <div className="product-results">
                    {message.productResults.map((product) => (
                      <div key={product.id} className="result-card">
                        <img src={product.image} alt={product.name} />
                        <div className="result-info">
                          <h4>{product.name}</h4>
                          <p className="brand">{product.brand}</p>
                          <div className="price">${product.price}</div>
                          <div className="match-score">
                            <span className="match-bar" style={{ width: `${product.match}%` }}></span>
                            <span className="match-text">{product.match}% match</span>
                          </div>
                          <p className="reason">{product.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Product Comparison */}
                {message.comparison && (
                  <div className="comparison-table">
                    <div className="comparison-header">
                      <h4>Product Comparison</h4>
                    </div>
                    <div className="comparison-grid">
                      {message.comparison.products.map((product, index) => (
                        <div key={index} className="comparison-card">
                          <h5>{product.name}</h5>
                          <div className="comp-price">{product.price}</div>
                          <div className="comp-section">
                            <strong>Features:</strong>
                            <ul>
                              {product.features.map((feature, idx) => (
                                <li key={idx}>{feature}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="comp-section">
                            <strong>Pros:</strong>
                            <ul className="pros">
                              {product.pros.map((pro, idx) => (
                                <li key={idx}>✅ {pro}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="comp-section">
                            <strong>Cons:</strong>
                            <ul className="cons">
                              {product.cons.map((con, idx) => (
                                <li key={idx}>⚠️ {con}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Order Tracking */}
                {message.orderInfo && (
                  <div className="order-tracking">
                    <div className="order-header">
                      <h4>Order #{message.orderInfo.orderNumber}</h4>
                      <div className="order-status">{message.orderInfo.status}</div>
                    </div>
                    <div className="delivery-estimate">
                      <strong>Estimated Delivery:</strong> {message.orderInfo.estimatedDelivery}
                    </div>
                    <div className="tracking-timeline">
                      {message.orderInfo.trackingSteps.map((step, index) => (
                        <div key={index} className={`timeline-step ${step.completed ? 'completed' : ''}`}>
                          <div className="step-indicator"></div>
                          <div className="step-content">
                            <div className="step-title">{step.step}</div>
                            <div className="step-time">{step.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Style Board */}
                {message.styleBoard && (
                  <div className="style-board">
                    <div className="style-header">
                      <h4>{message.styleBoard.theme}</h4>
                      <div className="style-total">
                        <span className="total-price">{message.styleBoard.totalLook}</span>
                        <span className="savings">{message.styleBoard.savings}</span>
                      </div>
                    </div>
                    <div className="style-items">
                      <div className="main-item">
                        <span className="item-label">Main:</span>
                        <span>{message.styleBoard.mainProduct}</span>
                      </div>
                      {message.styleBoard.suggestions.map((item, index) => (
                        <div key={index} className="suggestion-item">
                          <img src={item.image} alt={item.item} />
                          <div className="item-details">
                            <span className="category">{item.category}</span>
                            <span className="item-name">{item.item}</span>
                            <span className="item-price">{item.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending Items */}
                {message.trendingItems && (
                  <div className="trending-display">
                    {message.trendingItems.map((item) => (
                      <div key={item.rank} className="trending-item">
                        <div className="trend-rank">#{item.rank}</div>
                        <img src={item.image} alt={item.name} />
                        <div className="trend-info">
                          <h5>{item.name}</h5>
                          <div className="growth-indicator">{item.growth}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggestions */}
                {message.suggestions && (
                  <div className="message-suggestions">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className="suggestion-btn"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}

                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="message assistant">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-area">
          <div className="input-container">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about products, orders, or styling..."
              rows="1"
              className="message-input"
            />
            <div className="input-controls">
              <button
                className={`voice-btn ${voiceListening ? 'listening' : ''}`}
                onClick={startVoiceInput}
                title="Voice input"
              >
                🎤
              </button>
              <button
                className="send-btn"
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim()}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIShoppingAssistant;
