import React, { useState } from 'react';
import './Auth.css';

function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store user data in localStorage
    const userData = {
      name: formData.name || 'Walmart Shopper',
      email: formData.email,
      phone: formData.phone,
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('walmartUser', JSON.stringify(userData));
    setLoading(false);
    onLoginSuccess(userData);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      name: '',
      phone: ''
    });
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    
    try {
      // Simulate Google Sign-In API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful Google authentication
      const googleUserData = {
        name: 'Google User',
        email: 'user@gmail.com',
        phone: '',
        loginTime: new Date().toISOString(),
        provider: 'google',
        avatar: 'https://via.placeholder.com/100/4285f4/ffffff?text=G'
      };
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'google-success-notification';
      successMsg.innerHTML = `
        <div class="success-content">
          <span class="success-icon">✅</span>
          <span class="success-text">Google Sign-In Successful!</span>
        </div>
      `;
      document.body.appendChild(successMsg);
      
      setTimeout(() => {
        successMsg.remove();
      }, 2000);
      
      localStorage.setItem('walmartUser', JSON.stringify(googleUserData));
      setLoading(false);
      onLoginSuccess(googleUserData);
    } catch (error) {
      console.error('Google Sign-In error:', error);
      setLoading(false);
      alert('Google Sign-In failed. Please try again.');
    }
  };

  const handleAppleSignIn = async () => {
    setLoading(true);
    
    try {
      // Simulate Apple Sign-In API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful Apple authentication
      const appleUserData = {
        name: 'Apple User',
        email: 'user@icloud.com',
        phone: '',
        loginTime: new Date().toISOString(),
        provider: 'apple',
        avatar: 'https://via.placeholder.com/100/000000/ffffff?text=🍎'
      };
      
      localStorage.setItem('walmartUser', JSON.stringify(appleUserData));
      setLoading(false);
      onLoginSuccess(appleUserData);
    } catch (error) {
      console.error('Apple Sign-In error:', error);
      setLoading(false);
      alert('Apple Sign-In failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
      
      <div className="auth-content">
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <div className="brand-logo">
              <div className="logo-icon">🛍️</div>
              <h1 className="brand-name">RetailFlow AI</h1>
              <p className="brand-tagline">Powered by Walmart Innovation</p>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="welcome-section">
            <h2 className="welcome-title">
              {isLogin ? 'Welcome Back!' : 'Join RetailFlow'}
            </h2>
            <p className="welcome-subtitle">
              {isLogin 
                ? 'Sign in to continue your smart shopping journey with AI & AR'
                : 'Create your account to experience the future of shopping'
              }
            </p>
          </div>

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <div className="input-wrapper">
                  <span className="input-icon">📱</span>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                />
              </div>
            </div>

            {isLogin && (
              <div className="forgot-password">
                <a href="#" className="forgot-link">Forgot Password?</a>
              </div>
            )}

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? (
                <div className="loading-spinner">
                  <span className="spinner"></span>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                <>
                  <span className="button-icon">
                    {isLogin ? '🚀' : '✨'}
                  </span>
                  {isLogin ? 'Sign In to Shop' : 'Create Account'}
                </>
              )}
            </button>

            {/* Social Login */}
            <div className="social-divider">
              <span>or continue with</span>
            </div>

            <div className="social-buttons">
              <button type="button" className="social-button facebook">
                <span className="social-icon">📘</span>
                Facebook
              </button>
            </div>

            {/* Toggle Auth Mode */}
            <div className="auth-toggle">
              <p>
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                <button 
                  type="button" 
                  className="toggle-button"
                  onClick={toggleAuthMode}
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
            {/* Social Login Section */}
            <div className="social-login">
              <div className="social-login-title">
                <span>Or continue with</span>
              </div>
              <div className="social-buttons">
                <button 
                  type="button" 
                  className="social-button apple-btn"
                  onClick={handleAppleSignIn}
                  disabled={loading}
                >
                  <span>🍎</span>
                  {loading ? 'Signing in...' : 'Apple'}
                </button>
              </div>
            </div>

            {/* Features Section */}
            <div className="auth-features">
              <div className="features-title">Why Choose RetailFlow?</div>
              <div className="features-list">
                <div className="feature-item">
                  <span className="feature-icon">✅</span>
                  <span>AR Try-On Technology</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✅</span>
                  <span>AI Shopping Assistant</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✅</span>
                  <span>Secure Payments</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✅</span>
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </form>

          {/* Features Preview */}
          <div className="features-preview">
            <h3>What awaits you:</h3>
            <div className="feature-list">
              <div className="feature-item">
                <span className="feature-icon">🤖</span>
                <span>AI Shopping Assistant</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🥽</span>
                <span>AR Try-On Technology</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💎</span>
                <span>Premium Product Catalog</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🚚</span>
                <span>Fast Delivery Options</span>
              </div>
            </div>
          </div>
        </div>

        {/* Side Info */}
        <div className="auth-side-info">
          <div className="info-card">
            <h3>🛍️ Smart Shopping Experience</h3>
            <p>Discover products with AI-powered recommendations and try them virtually with AR technology.</p>
            
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">98%</span>
                <span className="stat-label">Satisfaction</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">AI Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
