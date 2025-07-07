import React, { useState, useEffect } from "react";
import Auth from "./Auth";
import ModernShoppingApp from "./ModernShoppingApp";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('walmartUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('walmartUser');
      }
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('walmartUser');
    setUser(null);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '1.5rem',
        fontWeight: '600'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛍️</div>
          <div>Loading RetailFlow AI...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {!user ? (
        <Auth onLoginSuccess={handleLoginSuccess} />
      ) : (
        <ModernShoppingApp user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
