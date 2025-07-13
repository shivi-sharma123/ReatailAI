import React, { useState, useEffect } from 'react';
import './LiveTracking.css';

function LiveTracking({ orderId, onClose }) {
  const [orderData, setOrderData] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: 19.0760, lng: 72.8777 });
  const [deliveryProgress, setDeliveryProgress] = useState(75);
  const [estimatedArrival, setEstimatedArrival] = useState('18 mins');
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [refreshCount, setRefreshCount] = useState(0);
  const [deliveryAgent, setDeliveryAgent] = useState(null);

  // Enhanced order tracking with real-time updates
  useEffect(() => {
    const sampleOrder = {
      id: orderId || 'RFA789123456',
      status: 'out_for_delivery',
      statusText: 'Out for Delivery',
      priority: 'express',
      items: [
        {
          id: 1,
          name: 'iPhone 15 Pro Max - Titanium Blue',
          image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop',
          quantity: 1,
          price: 1199.99,
          sku: 'APL-IP15PM-TB'
        },
        {
          id: 2,
          name: 'AirPods Pro 2nd Generation',
          image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=100&h=100&fit=crop',
          quantity: 1,
          price: 249.99,
          sku: 'APL-APP2G-WH'
        }
      ],
      total: 1565.98,
      orderDate: '2025-07-05T10:30:00Z',
      deliveryAddress: {
        name: 'John Doe',
        street: '123 Tech Park Avenue, Building A',
        landmark: 'Near Metro Station',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        phone: '+91 98765 43210'
      },
      deliveryPartner: {
        name: 'RetailFlow Express',
        logo: '🚚',
        rating: 4.8,
        phone: '+91 1800-123-456'
      },
      trackingNumber: 'RFA789123456789',
      guaranteeText: 'Delivery Guaranteed by 8:00 PM today or get ₹100 back!'
    };

    setOrderData(sampleOrder);

    // Sample delivery agent data
    setDeliveryAgent({
      name: 'Rajesh Kumar',
      phone: '+91 98765 12345',
      rating: 4.9,
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&face',
      vehicle: 'Bike - MH02AB1234',
      currentSpeed: '25 km/h',
      totalDeliveries: 1247,
      onTimeDeliveries: 98
    });
  }, [orderId]);

  // Live tracking simulation
  useEffect(() => {
    if (!isLiveMode) return;

    const interval = setInterval(() => {
      // Simulate real-time location updates
      setCurrentLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));

      // Update delivery progress
      setDeliveryProgress(prev => Math.min(95, prev + Math.random() * 2));

      // Update estimated arrival
      const minutes = Math.max(5, 18 - Math.floor(Math.random() * 2));
      setEstimatedArrival(`${minutes} mins`);

      setRefreshCount(prev => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isLiveMode]);

  const trackingSteps = [
    {
      id: 1,
      title: 'Order Confirmed',
      description: 'Your order has been placed successfully',
      timestamp: '10:30 AM',
      status: 'completed',
      icon: '📋'
    },
    {
      id: 2,
      title: 'Payment Verified',
      description: 'Payment confirmed via Walmart Pay',
      timestamp: '10:31 AM',
      status: 'completed',
      icon: '💳'
    },
    {
      id: 3,
      title: 'Order Processing',
      description: 'Items are being prepared for shipment',
      timestamp: '11:15 AM',
      status: 'completed',
      icon: '📦'
    },
    {
      id: 4,
      title: 'Shipped',
      description: 'Package dispatched from Mumbai warehouse',
      timestamp: '2:45 PM',
      status: 'completed',
      icon: '🚛'
    },
    {
      id: 5,
      title: 'Out for Delivery',
      description: 'Your package is on the way',
      timestamp: '6:20 PM',
      status: 'active',
      icon: '🏃‍♂️'
    },
    {
      id: 6,
      title: 'Delivered',
      description: 'Package delivered successfully',
      timestamp: 'Pending',
      status: 'pending',
      icon: '✅'
    }
  ];

  if (!orderData) {
    return (
      <div className="live-tracking-loading">
        <div className="loading-animation">
          <div className="radar-pulse"></div>
          <div className="loading-text">Connecting to live tracking...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="live-tracking-overlay">
      <div className="live-tracking-container">
        {/* Header */}
        <div className="tracking-header">
          <div className="header-left">
            <h2 className="tracking-title">
              <span className="live-indicator">🔴</span>
              <span className="gradient-text">LIVE TRACKING</span>
            </h2>
            <div className="order-info">
              <span className="order-id">Order #{orderData.id}</span>
              <span className="tracking-number">Tracking: {orderData.trackingNumber}</span>
            </div>
          </div>

          <div className="header-actions">
            <button 
              className={`live-toggle ${isLiveMode ? 'active' : ''}`}
              onClick={() => setIsLiveMode(!isLiveMode)}
            >
              <span className="toggle-icon">{isLiveMode ? '📡' : '⏸️'}</span>
              {isLiveMode ? 'LIVE' : 'PAUSED'}
            </button>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Live Status Banner */}
        <div className="live-status-banner">
          <div className="status-left">
            <div className="delivery-status">
              <div className="status-icon">🚚</div>
              <div className="status-content">
                <div className="status-title">Out for Delivery</div>
                <div className="status-subtitle">
                  Arriving in <span className="eta-time">{estimatedArrival}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="status-right">
            <div className="progress-circle">
              <svg viewBox="0 0 100 100" className="progress-svg">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  className="progress-bg"
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  className="progress-fill"
                  style={{
                    strokeDasharray: `${deliveryProgress * 2.827} 283`,
                    transform: 'rotate(-90deg)',
                    transformOrigin: '50% 50%'
                  }}
                />
              </svg>
              <div className="progress-text">
                <span className="progress-value">{Math.round(deliveryProgress)}%</span>
                <span className="progress-label">Complete</span>
              </div>
            </div>
          </div>
        </div>

        <div className="tracking-content">
          {/* Live Map Section */}
          <div className="map-section">
            <div className="map-header">
              <h3>Live Location</h3>
              <div className="map-controls">
                <button className="map-btn">📍 Center</button>
                <button className="map-btn">🗺️ Satellite</button>
              </div>
            </div>

            <div className="live-map">
              <div className="map-container">
                {/* Simulated Map */}
                <div className="map-background">
                  <div className="map-grid"></div>
                  
                  {/* Delivery Route */}
                  <div className="delivery-route">
                    <div className="route-line"></div>
                    <div 
                      className="delivery-vehicle"
                      style={{
                        left: `${30 + (deliveryProgress * 0.4)}%`,
                        top: `${40 + Math.sin(deliveryProgress * 0.1) * 10}%`
                      }}
                    >
                      🚚
                    </div>
                    <div className="destination-marker">🏠</div>
                  </div>

                  {/* Live Metrics Overlay */}
                  <div className="map-metrics">
                    <div className="metric-card">
                      <div className="metric-icon">⚡</div>
                      <div className="metric-value">{deliveryAgent?.currentSpeed}</div>
                      <div className="metric-label">Speed</div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-icon">📍</div>
                      <div className="metric-value">2.4 km</div>
                      <div className="metric-label">Distance</div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-icon">🕒</div>
                      <div className="metric-value">{estimatedArrival}</div>
                      <div className="metric-label">ETA</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Agent Info */}
          {deliveryAgent && (
            <div className="agent-section">
              <div className="agent-card">
                <div className="agent-photo">
                  <img src={deliveryAgent.photo} alt={deliveryAgent.name} />
                  <div className="online-status"></div>
                </div>
                
                <div className="agent-info">
                  <h3 className="agent-name">{deliveryAgent.name}</h3>
                  <div className="agent-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-value">{deliveryAgent.rating}</span>
                  </div>
                  <div className="agent-details">
                    <div className="detail-item">
                      <span className="detail-icon">🚴‍♂️</span>
                      <span className="detail-text">{deliveryAgent.vehicle}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📦</span>
                      <span className="detail-text">{deliveryAgent.totalDeliveries.toLocaleString()} deliveries</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">⏰</span>
                      <span className="detail-text">{deliveryAgent.onTimeDeliveries}% on-time</span>
                    </div>
                  </div>
                </div>

                <div className="agent-actions">
                  <button className="contact-btn">
                    <span className="btn-icon">📞</span>
                    Call
                  </button>
                  <button className="message-btn">
                    <span className="btn-icon">💬</span>
                    Message
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tracking Timeline */}
          <div className="timeline-section">
            <h3 className="timeline-title">Order Journey</h3>
            <div className="tracking-timeline">
              {trackingSteps.map((step, index) => (
                <div 
                  key={step.id} 
                  className={`timeline-step ${step.status}`}
                >
                  <div className="step-connector">
                    {index < trackingSteps.length - 1 && (
                      <div className={`connector-line ${
                        step.status === 'completed' ? 'completed' : ''
                      }`}></div>
                    )}
                  </div>
                  
                  <div className="step-marker">
                    <div className="step-icon">{step.icon}</div>
                    {step.status === 'active' && <div className="pulse-ring"></div>}
                  </div>
                  
                  <div className="step-content">
                    <div className="step-title">{step.title}</div>
                    <div className="step-description">{step.description}</div>
                    <div className="step-timestamp">{step.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Items */}
          <div className="items-section">
            <h3 className="items-title">Package Contents</h3>
            <div className="order-items">
              {orderData.items.map(item => (
                <div key={item.id} className="item-card">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-info">
                    <div className="item-name">{item.name}</div>
                    <div className="item-details">
                      <span className="item-qty">Qty: {item.quantity}</span>
                      <span className="item-price">${item.price}</span>
                    </div>
                    <div className="item-sku">SKU: {item.sku}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Updates Footer */}
        <div className="live-updates-footer">
          <div className="guarantee-text">
            <span className="guarantee-icon">🛡️</span>
            {orderData.guaranteeText}
          </div>
          <div className="refresh-indicator">
            <span className="refresh-icon">🔄</span>
            Last updated: {new Date().toLocaleTimeString()} 
            <span className="refresh-count">({refreshCount} updates)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveTracking;
