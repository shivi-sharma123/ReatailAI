import React, { useState, useRef, useEffect } from 'react';
import './VoiceSearch.css';

function VoiceSearch({ onSearch, onClose }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const recognitionRef = useRef(null);

  // Voice search suggestions
  const voiceSearchSuggestions = [
    "Find me wireless headphones under $100",
    "Show me blue running shoes in size 9",
    "Looking for smart watches with heart rate monitor",
    "Find designer sunglasses for women",
    "Show me gaming laptops with RTX graphics",
    "I need a winter jacket in large size",
    "Find me makeup products for sensitive skin",
    "Show me home workout equipment"
  ];

  const [currentSuggestion, setCurrentSuggestion] = useState(0);

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          const confidence = event.results[i][0].confidence;
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
            setConfidence(confidence);
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript || interimTranscript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        if (transcript.trim()) {
          handleSearch(transcript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }

    // Cycle through suggestions
    const interval = setInterval(() => {
      setCurrentSuggestion(prev => (prev + 1) % voiceSearchSuggestions.length);
    }, 3000);

    return () => {
      clearInterval(interval);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [transcript]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      setConfidence(0);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const handleSearch = (searchQuery) => {
    setShowResults(true);
    onSearch(searchQuery);
    
    // Auto-close after successful search
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleSuggestionClick = (suggestion) => {
    setTranscript(suggestion);
    handleSearch(suggestion);
  };

  if (showResults) {
    return (
      <div className="voice-search-modal">
        <div className="voice-search-container">
          <div className="search-success">
            <div className="success-animation">
              <div className="pulse-ring"></div>
              <div className="success-icon">🎯</div>
            </div>
            <h2>Search Successful!</h2>
            <p>Found products matching: "{transcript}"</p>
            <div className="confidence-meter">
              <span>Accuracy: {Math.round(confidence * 100)}%</span>
              <div className="confidence-bar">
                <div 
                  className="confidence-fill" 
                  style={{ width: `${confidence * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="voice-search-modal">
      <div className="voice-search-container">
        <div className="voice-search-header">
          <h2>🎤 Voice Search</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="voice-search-content">
          {!isListening ? (
            <>
              <div className="voice-prompt">
                <div className="mic-container">
                  <button className="mic-button" onClick={startListening}>
                    <div className="mic-icon">🎤</div>
                    <div className="mic-pulse"></div>
                  </button>
                </div>
                <h3>Tap to start voice search</h3>
                <p>Say something like:</p>
                <div className="suggestion-container">
                  <div className="suggestion-text">
                    "{voiceSearchSuggestions[currentSuggestion]}"
                  </div>
                </div>
              </div>

              <div className="voice-suggestions">
                <h4>Popular Voice Commands:</h4>
                <div className="suggestions-grid">
                  {voiceSearchSuggestions.slice(0, 4).map((suggestion, index) => (
                    <button
                      key={index}
                      className="suggestion-chip"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="listening-state">
              <div className="listening-animation">
                <div className="sound-wave">
                  <div className="wave-bar bar1"></div>
                  <div className="wave-bar bar2"></div>
                  <div className="wave-bar bar3"></div>
                  <div className="wave-bar bar4"></div>
                  <div className="wave-bar bar5"></div>
                </div>
              </div>
              <h3>Listening...</h3>
              <p>Speak now</p>
              {transcript && (
                <div className="transcript">
                  <div className="transcript-text">"{transcript}"</div>
                  {confidence > 0 && (
                    <div className="confidence-indicator">
                      Confidence: {Math.round(confidence * 100)}%
                    </div>
                  )}
                </div>
              )}
              <button className="stop-listening-btn" onClick={stopListening}>
                Stop Listening
              </button>
            </div>
          )}
        </div>

        <div className="voice-search-footer">
          <div className="powered-by">
            <span>🤖 Powered by AI • 🛡️ Privacy Protected</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceSearch;
