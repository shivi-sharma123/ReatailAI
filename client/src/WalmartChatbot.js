import React, { useState, useEffect } from 'react';

const WalmartChatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: '🛒 Hello! Welcome to Walmart AI Assistant! How can I help you find amazing products today?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const responses = [
        "🎯 I found some great products for you! Let me show you our best deals.",
        "✨ Based on your search, here are some amazing recommendations!",
        "🛍️ Perfect! I have some fantastic options that match what you're looking for.",
        "💡 Great choice! Here are some trending products you might love.",
        "🔥 Hot deals alert! Check out these amazing products!"
      ];

      const botResponse = {
        sender: 'bot',
        text: responses[Math.floor(Math.random() * responses.length)]
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: '❌ Sorry, I encountered an error. Please try again!'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="walmart-chatbot-overlay" style={{
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
      <div className="walmart-chatbot-container" style={{
        backgroundColor: '#fff',
        borderRadius: '15px',
        width: '90%',
        maxWidth: '500px',
        height: '600px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        <div className="chatbot-header" style={{
          backgroundColor: '#0071ce',
          color: 'white',
          padding: '20px',
          borderRadius: '15px 15px 0 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ margin: 0, fontSize: '18px' }}>🛒 Walmart AI Assistant</h3>
          <button
            onClick={onClose}
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

        <div className="chatbot-messages" style={{
          flex: 1,
          padding: '20px',
          overflowY: 'auto',
          backgroundColor: '#f8f9fa'
        }}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                marginBottom: '15px',
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div
                style={{
                  backgroundColor: message.sender === 'user' ? '#0071ce' : '#e9ecef',
                  color: message.sender === 'user' ? 'white' : '#333',
                  padding: '12px 16px',
                  borderRadius: '20px',
                  maxWidth: '80%',
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}
              >
                {message.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '15px' }}>
              <div style={{
                backgroundColor: '#e9ecef',
                color: '#333',
                padding: '12px 16px',
                borderRadius: '20px',
                fontSize: '14px'
              }}>
                <span>💭 Thinking...</span>
              </div>
            </div>
          )}
        </div>

        <div className="chatbot-input" style={{
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '0 0 15px 15px',
          borderTop: '1px solid #e9ecef'
        }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about products, deals, or anything..."
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '25px',
                border: '2px solid #e9ecef',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              style={{
                padding: '12px 20px',
                backgroundColor: '#0071ce',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                opacity: loading || !input.trim() ? 0.6 : 1
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalmartChatbot;
