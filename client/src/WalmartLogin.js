import React, { useState, useEffect } from 'react';
import './WalmartLogin.css';

export default function WalmartLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
    // Load Google OAuth script
    loadGoogleOAuth();
  }, []);

  const loadGoogleOAuth = () => {
    // Check if Google script is already loaded
    if (window.google) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn;
    document.head.appendChild(script);
  };

  const initializeGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: '1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com', // Demo client ID
        callback: handleGoogleSignIn,
      });
    }
  };

  const handleGoogleSignIn = (response) => {
    try {
      setIsGoogleLoading(false);
      
      // Decode the JWT token (in a real app, validate this on the server)
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      
      const googleUser = {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        loginMethod: 'google'
      };

      // Success notification
      setError('');
      
      // Show success message
      const successDiv = document.createElement('div');
      successDiv.className = 'success-notification';
      successDiv.innerHTML = `
        <span class="success-icon">✅</span>
        Welcome back, ${googleUser.name}! Google login successful.
      `;
      
      const errorContainer = document.querySelector('.error-notification');
      if (errorContainer) {
        errorContainer.parentNode.replaceChild(successDiv, errorContainer);
      } else {
        const formContainer = document.querySelector('.login-form-container');
        formContainer.insertBefore(successDiv, formContainer.querySelector('.walmart-login-form'));
      }

      // Call the onLogin callback after a short delay
      setTimeout(() => {
        if (onLogin) onLogin(googleUser);
      }, 1500);
      
    } catch (error) {
      setIsGoogleLoading(false);
      setError('Google sign-in failed. Please try again.');
      console.error('Google sign-in error:', error);
    }
  };

  const handleGoogleClick = () => {
    setIsGoogleLoading(true);
    setError('');
    
    console.log('Google button clicked! Starting authentication...');
    
    if (window.google && window.google.accounts) {
      console.log('Google API available, starting OAuth flow...');
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback: show one-tap dialog
          window.google.accounts.id.renderButton(
            document.getElementById('google-signin-button'),
            { 
              theme: 'outline', 
              size: 'large',
              width: '100%'
            }
          );
        }
      });
    } else {
      console.log('Google API not available, using demo mode...');
      // Immediate demo for testing
      const demoUser = {
        email: 'demo@gmail.com',
        name: 'Demo User',
        picture: 'https://via.placeholder.com/96x96?text=DU',
        loginMethod: 'google'
      };
      
      console.log('Demo login successful:', demoUser);
      setIsGoogleLoading(false);
      setError('');
      
      // Show success message immediately
      const successDiv = document.createElement('div');
      successDiv.className = 'success-notification';
      successDiv.innerHTML = `
        <span class="success-icon">✅</span>
        Welcome back, ${demoUser.name}! Google login successful - Opening app...
      `;
      
      const errorContainer = document.querySelector('.error-notification');
      if (errorContainer) {
        errorContainer.parentNode.replaceChild(successDiv, errorContainer);
      } else {
        const formContainer = document.querySelector('.login-form-container');
        formContainer.insertBefore(successDiv, formContainer.querySelector('.walmart-login-form'));
      }

      console.log('Calling onLogin callback...');
      // Call immediately for instant login
      setTimeout(() => {
        if (onLogin) {
          console.log('onLogin callback found, calling it...');
          onLogin(demoUser);
        } else {
          console.error('onLogin callback not found!');
          // Force redirect as fallback
          window.location.reload();
        }
      }, 800);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    
    // Show immediate Google login suggestion
    const forgotPasswordDiv = document.createElement('div');
    forgotPasswordDiv.className = 'success-notification';
    forgotPasswordDiv.innerHTML = `
      <span class="success-icon">🔑</span>
      No worries! Click the Google button below to sign in without a password.
    `;
    
    const errorContainer = document.querySelector('.error-notification');
    if (errorContainer) {
      errorContainer.parentNode.replaceChild(forgotPasswordDiv, errorContainer);
    } else {
      const formContainer = document.querySelector('.login-form-container');
      formContainer.insertBefore(forgotPasswordDiv, formContainer.querySelector('.walmart-login-form'));
    }
    
    // Highlight the Google button
    const googleBtn = document.getElementById('google-signin-button');
    if (googleBtn) {
      googleBtn.style.animation = 'pulse 1.5s infinite';
      googleBtn.style.borderColor = '#4285F4';
      googleBtn.style.backgroundColor = '#f8f9ff';
    }
    
    // Remove highlight after 3 seconds
    setTimeout(() => {
      if (googleBtn) {
        googleBtn.style.animation = '';
        googleBtn.style.borderColor = '';
        googleBtn.style.backgroundColor = '';
      }
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple validation
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      if (onLogin) onLogin({ email, password });
    }, 1500);
  };

  return (
    <div className="walmart-login-container">
      {/* Animated Background */}
      <div className="walmart-login-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`walmart-login-content ${isAnimated ? 'animated' : ''}`}>
        {/* Left Side - Branding */}
        <div className="walmart-login-left">
          <div className="walmart-branding">
            <div className="walmart-logo-container">
              <div className="walmart-spark">✱</div>
              <h1 className="walmart-title">Walmart</h1>
            </div>
            <h2 className="walmart-subtitle">Shop Smart, Live Better</h2>
            <p className="walmart-description">
              Experience the future of retail with our premium shopping platform. 
              Save money, live better, and discover amazing deals every day.
            </p>
            
            <div className="walmart-features">
              <div className="feature-item">
                <div className="feature-icon">🛒</div>
                <span>Smart Shopping</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">💰</div>
                <span>Best Prices</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🚚</div>
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="walmart-login-right">
          <div className="login-form-container">
            <div className="login-header">
              <h2 className="login-title">Welcome Back!</h2>
              <p className="login-subtitle">Sign in to your account</p>
            </div>

            {error && (
              <div className="error-notification">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <form className="walmart-login-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email" className="input-label">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                    placeholder="Enter your email"
                    required
                  />
                  <div className="input-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                      <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <div className="input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className="login-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <a href="#" className="forgot-password" onClick={handleForgotPassword}>Forgot Password?</a>
              </div>

              <button 
                type="submit" 
                className={`login-button ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="login-spinner"></div>
                ) : (
                  'Sign In'
                )}
              </button>

              <div className="social-login">
                <div className="divider">
                  <span>or continue with</span>
                </div>
                <div className="social-buttons">
                  <button 
                    type="button" 
                    className={`social-btn google ${isGoogleLoading ? 'loading' : ''}`}
                    onClick={handleGoogleClick}
                    disabled={isGoogleLoading}
                    id="google-signin-button"
                  >
                    {isGoogleLoading ? (
                      <div className="google-spinner"></div>
                    ) : (
                      <>
                        <svg width="20" height="20" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Sign in with Google
                      </>
                    )}
                  </button>
                  <button type="button" className="social-btn facebook">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </button>
                </div>
              </div>

              <div className="signup-link">
                Don't have an account? 
                <a href="#" className="create-account">Create Account</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
