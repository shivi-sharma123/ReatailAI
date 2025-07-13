import React, { useState, useEffect } from "react";
import Auth from "./Auth";
import ModernShoppingApp from "./ModernShoppingApp";
import AmazonStyleWalmartApp from "./AmazonStyleWalmartApp";
import WalmartLogin from './WalmartLogin';

function App() {
  const [user, setUser] = useState({
    name: 'Demo User',
    email: 'demo@retailflow.com',
    loginTime: new Date().toISOString()
  }); // Default user - no login required
  const [loading, setLoading] = useState(false); // Skip loading
  const [showLogin, setShowLogin] = useState(false); // Skip login screen

  useEffect(() => {
    // Auto-login with demo user - no authentication needed
    const demoUser = {
      name: 'Demo User',
      email: 'demo@retailflow.com',
      loginTime: new Date().toISOString(),
      autoLogin: true
    };
    setUser(demoUser);
    localStorage.setItem('walmartUser', JSON.stringify(demoUser));
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowLogin(false);
    localStorage.setItem('walmartUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    // Optional: can refresh to reset demo
    window.location.reload();
  };

  return (
    <div className="App">
      {/* Direct access to main app - no login required */}
      <AmazonStyleWalmartApp user={user} onLogout={handleLogout} />
    </div>
  );
}

export default App;
