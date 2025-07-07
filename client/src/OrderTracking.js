import React, { useState, useEffect } from 'react';
import './OrderTracking.css';

function OrderTracking({ orderId, onClose }) {
  const [orderData, setOrderData] = useState(null);
  const [deliveryUpdates, setDeliveryUpdates] = useState([]);
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  const [activeStep, setActiveStep] = useState(2);
  const [showMapView, setShowMapView] = useState(false);

  // Enhanced order data with RetailFlow styling
  useEffect(() => {
    const sampleOrder = {
      id: orderId || 'RFA789123456',
      status: 'out_for_delivery',
      statusText: 'Out for Delivery',
      items: [
        {
          id: 1,
          name: 'iPhone 15 Pro Max - Titanium Blue',
          image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop',
          quantity: 1,
          price: 1199.99,
          seller: 'Apple Store',
          sku: 'APL-IP15PM-TB'
        },
        {
          id: 2,
          name: 'AirPods Pro 2nd Generation',
          image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=100&h=100&fit=crop',
          quantity: 1,
          price: 249.99,
          seller: 'Apple Store',
          sku: 'APL-APP2G-WH'
        }
      ],
      subtotal: 1449.98,
      shipping: 0,
      tax: 116.00,
      total: 1565.98,
      orderDate: '2025-07-05T10:30:00Z',
      estimatedDelivery: '2025-07-07T20:00:00Z',
      actualDelivery: null,
      deliveryAddress: {
        name: 'John Doe',
        street: '123 Tech Park Avenue, Building A',
        landmark: 'Near Metro Station',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        phone: '+91 98765 43210',
        alternatePhone: '+91 87654 32109'
      },
      paymentMethod: {
        type: 'Walmart Pay',
        icon: '💳',
        last4: '1234',
        amount: 1565.98
      },
      deliveryPartner: {
        name: 'RetailFlow Express',
        logo: '🚚',
        rating: 4.8,
        phone: '+91 1800-123-456'
      },
      deliveryAgent: {
        name: 'Rajesh Kumar',
        phone: '+91 98765 12345',
        rating: 4.9,
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&face'
      },
      trackingNumber: 'RFA789123456789',
      priority: 'express',
      guaranteeText: 'Delivery Guaranteed by 8:00 PM today or get ₹100 back!'
    };

    setOrderData(sampleOrder);
    setEstimatedDelivery('Today by 8:00 PM');
    setActiveStep(3); // Currently out for delivery

    // Sample delivery updates
    setDeliveryUpdates([
      {
        id: 1,
        status: 'order_placed',
        title: 'Order Placed',
        description: 'Your order has been confirmed',
        timestamp: '2025-07-05 10:30 AM',
        icon: '📝',
        completed: true
      },
      {
        id: 2,
        status: 'payment_confirmed',
        title: 'Payment Confirmed',
        description: 'Payment received via Walmart Pay',
        timestamp: '2025-07-05 10:31 AM',
        icon: '💳',
        completed: true
      },
      {
        id: 3,
        status: 'preparing',
        title: 'Preparing Order',
        description: 'Your items are being packed',
        timestamp: '2025-07-05 2:00 PM',
        icon: '📦',
        completed: true
      },
      {
        id: 4,
        status: 'shipped',
        title: 'Order Shipped',
        description: 'Out for delivery from Walmart Center',
        timestamp: '2025-07-07 9:00 AM',
        icon: '🚚',
        completed: true,
        isActive: true
      },
      {
        id: 5,
        status: 'out_for_delivery',
        title: 'Out for Delivery',
        description: 'Your order is on the way',
        timestamp: 'Expected by 6:00 PM',
        icon: '🏃‍♂️',
        completed: false
      },
      {
        id: 6,
        status: 'delivered',
        title: 'Delivered',
        description: 'Order delivered successfully',
        timestamp: 'Expected by 8:00 PM',
        icon: '✅',
        completed: false
      }
    ]);
  }, [orderId]);

  const getStatusColor = (status) => {
    const colors = {
      order_placed: '#2196f3',
      payment_confirmed: '#4caf50',
      preparing: '#ff9800',
      shipped: '#9c27b0',
      out_for_delivery: '#f44336',
      delivered: '#4caf50'
    };
    return colors[status] || '#757575';
  };

  const shareTrackingInfo = () => {
    const shareText = `🛍️ My Walmart order ${orderData.id} is ${orderData.status}! 
📦 Items: ${orderData.items.map(item => item.name).join(', ')}
🚚 Expected delivery: ${estimatedDelivery}
Track: https://walmart.com/track/${orderData.id}`;

    if (navigator.share) {
      navigator.share({
        title: 'Order Tracking Update',
        text: shareText,
        url: `https://walmart.com/track/${orderData.id}`
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Tracking info copied to clipboard!');
    }
  };

  if (!orderData) {
    return (
      <div className="order-tracking-modal">
        <div className="modal-overlay" onClick={onClose}></div>
        <div className="tracking-container">
          <div className="tracking-header">
            <h2>📦 Track Your Order</h2>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
          <div className="loading-container">
            <div className="loading-spinner">🔄</div>
            <div className="loading-text">Loading order details...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-tracking-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="tracking-container">
        {/* Header */}
        <div className="tracking-header">
          <h2>📦 Track Your Order</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <div className="order-id">
            <span className="label">Order ID:</span>
            <span className="value">{orderData.id}</span>
            <button className="copy-btn" onClick={() => navigator.clipboard.writeText(orderData.id)}>
              📋
            </button>
          </div>
          
          <div className="delivery-estimate">
            <div className="estimate-main">
              <span className="delivery-icon">🚚</span>
              <div className="estimate-text">
                <div className="estimate-title">Estimated Delivery</div>
                <div className="estimate-time">{estimatedDelivery}</div>
              </div>
            </div>
            <div className="delivery-address">
              📍 {orderData.deliveryAddress.street}, {orderData.deliveryAddress.city}
            </div>
          </div>
        </div>

        {/* Live Tracking */}
        <div className="live-tracking">
          <h3>🔴 Live Tracking</h3>
          <div className="tracking-map">
            <div className="map-placeholder">
              <div className="delivery-truck">🚚</div>
              <div className="route-line"></div>
              <div className="destination">🏠</div>
              <div className="live-location">📍 Current Location: Sector 15, Noida</div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="order-items">
          <h3>📦 Items in this order</h3>
          <div className="items-list">
            {orderData.items.map(item => (
              <div key={item.id} className="order-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <div className="item-info">
                    <span>Qty: {item.quantity}</span>
                    <span className="item-price">${item.price}</span>
                  </div>
                </div>
                <div className="item-status">
                  <span className="status-badge shipped">Shipped</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Timeline */}
        <div className="delivery-timeline">
          <h3>🕐 Delivery Timeline</h3>
          <div className="timeline-container">
            {deliveryUpdates.map((update, index) => (
              <div 
                key={update.id} 
                className={`timeline-item ${update.completed ? 'completed' : 'pending'} ${update.isActive ? 'active' : ''}`}
              >
                <div 
                  className="timeline-icon"
                  style={{ backgroundColor: update.completed ? getStatusColor(update.status) : '#e0e0e0' }}
                >
                  {update.icon}
                </div>
                <div className="timeline-content">
                  <h4>{update.title}</h4>
                  <p>{update.description}</p>
                  <div className="timeline-timestamp">{update.timestamp}</div>
                </div>
                {index < deliveryUpdates.length - 1 && (
                  <div className={`timeline-connector ${update.completed ? 'completed' : 'pending'}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Partner Info */}
        <div className="delivery-partner">
          <h3>🚛 Delivery Partner</h3>
          <div className="partner-info">
            <div className="partner-details">
              <div className="partner-name">{orderData.deliveryPartner.name}</div>
              <div className="tracking-number">Tracking: {orderData.trackingNumber}</div>
            </div>
            <div className="partner-actions">
              <button className="contact-btn">📞 Call</button>
              <button className="message-btn">💬 Message</button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button className="action-btn share" onClick={shareTrackingInfo}>
            📤 Share Tracking
          </button>
          <button className="action-btn modify">
            ✏️ Modify Address
          </button>
          <button className="action-btn cancel">
            ❌ Cancel Order
          </button>
          <button className="action-btn help">
            🆘 Need Help?
          </button>
        </div>

        {/* Order Details */}
        <div className="order-details-section">
          <h3>📋 Order Details</h3>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Order Date:</span>
              <span className="detail-value">{new Date(orderData.orderDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Payment Method:</span>
              <span className="detail-value">{orderData.paymentMethod.icon} {orderData.paymentMethod.type}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Total Amount:</span>
              <span className="detail-value">${orderData.total}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Delivery Address:</span>
              <span className="detail-value">
                {orderData.deliveryAddress.name}, {orderData.deliveryAddress.street}, 
                {orderData.deliveryAddress.city}, {orderData.deliveryAddress.state} - {orderData.deliveryAddress.pincode}
              </span>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="feedback-section">
          <h3>⭐ Rate Your Experience</h3>
          <p>How was your delivery experience so far?</p>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map(star => (
              <button key={star} className="star-btn">⭐</button>
            ))}
          </div>
          <textarea placeholder="Share your feedback..." className="feedback-text"></textarea>
        </div>
      </div>
    </div>
  );
}

export default OrderTracking;
