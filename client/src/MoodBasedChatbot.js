import React, { useState, useEffect, useRef } from 'react';
import './MoodBasedChatbot.css';

const MoodBasedChatbot = ({ user, onProductRecommendation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [userMood, setUserMood] = useState('normal');
  const [isTyping, setIsTyping] = useState(false);
  const [moodAnalyzing, setMoodAnalyzing] = useState(false);
  const messagesEndRef = useRef(null);

  // Mood detection keywords
  const moodKeywords = {
    happy: ['happy', 'great', 'awesome', 'amazing', 'excellent', 'wonderful', 'fantastic', 'love', 'excited', 'joyful', '😊', '😄', '😁', '🎉', '❤️'],
    sad: ['sad', 'upset', 'down', 'depressed', 'lonely', 'disappointed', 'tired', 'stressed', 'bad', 'terrible', '😢', '😞', '😔', '💔', '😫'],
    normal: ['okay', 'fine', 'alright', 'normal', 'regular', 'usual', 'standard']
  };

  // Product recommendations based on mood
  const moodProducts = {
    happy: [
      {
        id: 1,
        name: "Nike Air Max 270 - Vibrant Colors",
        price: "$150.00",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&crop=center",
        description: "Perfect for your energetic mood! These colorful sneakers will keep your spirits high.",
        mood_message: "Since you're feeling great, how about some vibrant sneakers to match your energy! 🌈"
      },
      {
        id: 2,
        name: "Bluetooth Party Speaker",
        price: "$89.99",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop&crop=center",
        description: "Celebrate your good mood with amazing sound quality!",
        mood_message: "Time to party! This speaker will amplify your happiness! 🎵"
      },
      {
        id: 3,
        name: "Tropical Print Summer Dress",
        price: "$45.99",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop&crop=center",
        description: "Bright and cheerful dress to complement your sunny disposition!",
        mood_message: "You're glowing! This dress will make you shine even brighter! ☀️"
      }
    ],
    sad: [
      {
        id: 4,
        name: "Cozy Weighted Blanket",
        price: "$79.99",
        image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=300&h=300&fit=crop&crop=center",
        description: "Ultra-soft weighted blanket for comfort and relaxation.",
        mood_message: "Sending you a virtual hug! This blanket will provide the comfort you need. 🤗"
      },
      {
        id: 5,
        name: "Aromatherapy Essential Oil Set",
        price: "$34.99",
        image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&h=300&fit=crop&crop=center",
        description: "Calming lavender and eucalyptus oils to soothe your mind.",
        mood_message: "Take a deep breath... These calming scents will help you feel better. 🌿"
      },
      {
        id: 6,
        name: "Self-Care Journal & Tea Set",
        price: "$29.99",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop&crop=center",
        description: "Beautiful journal with premium herbal teas for mindful moments.",
        mood_message: "You deserve some self-care time. This set is perfect for reflection and healing. 📝☕"
      }
    ],
    normal: [
      {
        id: 7,
        name: "Wireless Earbuds Pro",
        price: "$129.99",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop&crop=center",
        description: "High-quality audio for your daily routine.",
        mood_message: "These earbuds are perfect for your everyday activities! 🎧"
      },
      {
        id: 8,
        name: "Stainless Steel Water Bottle",
        price: "$24.99",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop&crop=center",
        description: "Stay hydrated throughout your day with this premium bottle.",
        mood_message: "A practical choice for staying healthy and hydrated! 💧"
      },
      {
        id: 9,
        name: "Smart Fitness Tracker",
        price: "$199.99",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center",
        description: "Track your daily activities and health metrics.",
        mood_message: "Perfect for maintaining your balanced lifestyle! ⌚"
      }
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: `Hello ${user?.name || 'there'}! 👋 I'm your AI shopping assistant. I can sense your mood and suggest products that match how you're feeling today. How are you doing?`,
          sender: 'bot',
          timestamp: new Date(),
          mood: 'normal'
        }
      ]);
    }
  }, [isOpen, user]);

  const detectMood = (text) => {
    const lowerText = text.toLowerCase();
    let detectedMood = 'normal';
    let confidence = 0;

    // Check for mood keywords
    Object.entries(moodKeywords).forEach(([mood, keywords]) => {
      const matches = keywords.filter(keyword => lowerText.includes(keyword.toLowerCase())).length;
      if (matches > confidence) {
        confidence = matches;
        detectedMood = mood;
      }
    });

    // Advanced sentiment analysis patterns
    const happyPatterns = /\b(feel great|doing well|so good|very happy|really excited|love it|amazing day)\b/i;
    const sadPatterns = /\b(feel down|not good|feeling low|really sad|having trouble|difficult time|not well)\b/i;
    
    if (happyPatterns.test(lowerText)) detectedMood = 'happy';
    if (sadPatterns.test(lowerText)) detectedMood = 'sad';

    return detectedMood;
  };

  const generateMoodResponse = (mood, userMessage) => {
    const responses = {
      happy: [
        "That's wonderful to hear! 🌟 Your positive energy is contagious! Let me show you some products that match your vibrant mood!",
        "I love your enthusiasm! ✨ Since you're feeling so great, I have some exciting products that will keep those good vibes going!",
        "Amazing! 🎉 Your happiness brightens my day! Here are some fantastic products perfect for someone with your sunny disposition!"
      ],
      sad: [
        "I'm sorry you're feeling down. 💙 Let me help you with some comfort products that might brighten your day a little.",
        "Sending you virtual hugs! 🤗 I understand it's tough right now. Here are some soothing products that might help you feel better.",
        "I hear you, and it's okay to feel this way. 💝 Let me suggest some comforting items that could provide a little relief."
      ],
      normal: [
        "Thanks for sharing! 😊 I appreciate your honesty. Let me show you some great everyday products that might interest you.",
        "That's perfectly fine! 👍 Sometimes normal is exactly what we need. Here are some practical products for your daily routine.",
        "I understand! 😌 Let me suggest some reliable products that would work well for your regular activities."
      ]
    };

    return responses[mood][Math.floor(Math.random() * responses[mood].length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setMoodAnalyzing(true);

    // Analyze mood
    const detectedMood = detectMood(inputValue);
    
    setTimeout(() => {
      setMoodAnalyzing(false);
      setUserMood(detectedMood);
      
      // Generate response
      const response = generateMoodResponse(detectedMood, inputValue);
      
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
        mood: detectedMood,
        showProducts: true
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleProductClick = (product) => {
    if (onProductRecommendation) {
      onProductRecommendation(product);
    }
    
    const botMessage = {
      id: Date.now(),
      text: `Great choice! I've added "${product.name}" to your recommendations. Would you like to see more products or need help with anything else?`,
      sender: 'bot',
      timestamp: new Date(),
      mood: userMood
    };
    
    setMessages(prev => [...prev, botMessage]);
  };

  const getMoodEmoji = (mood) => {
    switch(mood) {
      case 'happy': return '😊';
      case 'sad': return '💙';
      default: return '🤖';
    }
  };

  const getMoodColor = (mood) => {
    switch(mood) {
      case 'happy': return '#ff6b6b';
      case 'sad': return '#4ecdc4';
      default: return '#45b7d1';
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div 
        className={`chat-floating-button ${userMood}`}
        onClick={() => setIsOpen(true)}
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <div className="mood-indicator" style={{ backgroundColor: getMoodColor(userMood) }}>
          {getMoodEmoji(userMood)}
        </div>
        <div className="chat-button-pulse"></div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="mood-chatbot-container">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="ai-avatar" style={{ backgroundColor: getMoodColor(userMood) }}>
                🤖
              </div>
              <div className="chat-header-text">
                <h3>AI Mood Assistant</h3>
                <p>Mood: <span className={`mood-status ${userMood}`}>{userMood.charAt(0).toUpperCase() + userMood.slice(1)} {getMoodEmoji(userMood)}</span></p>
              </div>
            </div>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          <div className="chat-messages">
            {moodAnalyzing && (
              <div className="mood-analyzing">
                <div className="analyzing-animation">
                  <div className="analyzing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <p>Analyzing your mood...</p>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-content">
                  <p>{message.text}</p>
                  {message.showProducts && (
                    <div className="mood-products">
                      <h4>Products curated for your {userMood} mood:</h4>
                      <div className="products-grid">
                        {moodProducts[userMood]?.map((product) => (
                          <div key={product.id} className="mood-product-card" onClick={() => handleProductClick(product)}>
                            <img src={product.image} alt={product.name} className="product-img" />
                            <div className="product-details">
                              <h5>{product.name}</h5>
                              <p className="product-price">{product.price}</p>
                              <p className="mood-message">{product.mood_message}</p>
                              <button className="add-to-cart-mood">Add to Cart</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="message bot">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <div className="mood-quick-actions">
              <button 
                className="mood-btn happy" 
                onClick={() => setInputValue("I'm feeling really happy today!")}
              >
                😊 Happy
              </button>
              <button 
                className="mood-btn sad" 
                onClick={() => setInputValue("I'm feeling a bit down today")}
              >
                😢 Sad
              </button>
              <button 
                className="mood-btn normal" 
                onClick={() => setInputValue("I'm feeling okay, just browsing")}
              >
                😐 Normal
              </button>
            </div>
            <div className="chat-input-wrapper">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tell me how you're feeling today..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="chat-input"
              />
              <button onClick={handleSendMessage} className="send-btn">
                <span>Send</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MoodBasedChatbot;
