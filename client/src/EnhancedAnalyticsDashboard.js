import React, { useState, useEffect } from 'react';
import './EnhancedAnalyticsDashboard.css';

const EnhancedAnalyticsDashboard = ({ isVisible, onClose }) => {
  const [analytics, setAnalytics] = useState({
    mood_summary: [],
    real_time_metrics: [],
    recent_mood_activity: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isVisible) {
      fetchAnalytics();
      const interval = setInterval(fetchAnalytics, 10000); // Update every 10 seconds
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mood-analytics');
      const data = await response.json();
      
      if (data.success) {
        setAnalytics(data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Analytics fetch error:', error);
      setIsLoading(false);
    }
  };

  const formatMetricValue = (value, type) => {
    switch (type) {
      case 'percentage':
        return `${(value * 100).toFixed(1)}%`;
      case 'currency':
        return `$${value.toLocaleString()}`;
      case 'minutes':
        return `${value} min`;
      case 'rating':
        return `${value}/5 ⭐`;
      default:
        return value.toLocaleString();
    }
  };

  const getMoodEmoji = (mood) => {
    const emojiMap = {
      'happy': '😊',
      'party': '🎉',
      'professional': '💼',
      'fitness': '💪',
      'romantic': '💕',
      'comfort': '🛋️',
      'casual': '😌',
      'shopping': '🛍️'
    };
    return emojiMap[mood] || '🛍️';
  };

  if (!isVisible) return null;

  return (
    <div className="enhanced-analytics-overlay">
      <div className="enhanced-analytics-dashboard">
        
        {/* Header */}
        <div className="analytics-header">
          <div className="header-content">
            <div className="title-section">
              <h2>📊 Enhanced Analytics Dashboard</h2>
              <div className="live-indicator">
                <div className="live-dot"></div>
                <span>LIVE</span>
              </div>
            </div>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>
          
          <div className="tab-navigation">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              📈 Overview
            </button>
            <button 
              className={`tab-btn ${activeTab === 'moods' ? 'active' : ''}`}
              onClick={() => setActiveTab('moods')}
            >
              🎭 Mood Analytics
            </button>
            <button 
              className={`tab-btn ${activeTab === 'realtime' ? 'active' : ''}`}
              onClick={() => setActiveTab('realtime')}
            >
              ⚡ Real-time
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="analytics-content">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="metrics-grid">
                {analytics.real_time_metrics.map((metric, index) => (
                  <div key={index} className="metric-card">
                    <div className="metric-header">
                      <span className="metric-name">{metric.name.replace('_', ' ').toUpperCase()}</span>
                      <span className={`trend-indicator ${metric.trend}`}>
                        {metric.trend === 'up' ? '📈' : '📉'}
                      </span>
                    </div>
                    <div className="metric-value">
                      {formatMetricValue(metric.value, metric.type)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="charts-section">
                <div className="chart-container">
                  <h3>🎯 Mood Distribution Today</h3>
                  <div className="mood-distribution">
                    {analytics.recent_mood_activity.map((mood, index) => (
                      <div key={index} className="mood-bar">
                        <div className="mood-label">
                          <span>{getMoodEmoji(mood.mood)} {mood.mood}</span>
                          <span className="mood-count">{mood.count}</span>
                        </div>
                        <div className="mood-progress">
                          <div 
                            className="mood-fill" 
                            style={{width: `${(mood.count / Math.max(...analytics.recent_mood_activity.map(m => m.count))) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mood Analytics Tab */}
          {activeTab === 'moods' && (
            <div className="moods-tab">
              <div className="mood-cards-grid">
                {analytics.mood_summary.map((mood, index) => (
                  <div key={index} className="mood-analytics-card">
                    <div className="mood-card-header">
                      <span className="mood-emoji">{getMoodEmoji(mood.mood)}</span>
                      <div className="mood-info">
                        <h4>{mood.mood.charAt(0).toUpperCase() + mood.mood.slice(1)}</h4>
                        <span className={`trend ${mood.trending ? 'up' : 'down'}`}>
                          {mood.trending ? '📈 Trending' : '📉 Stable'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mood-stats">
                      <div className="stat">
                        <span className="stat-label">Total Interactions</span>
                        <span className="stat-value">{mood.interactions.toLocaleString()}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Success Rate</span>
                        <span className="stat-value">{(mood.success_rate * 100).toFixed(1)}%</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Avg Products Viewed</span>
                        <span className="stat-value">{mood.avg_products_viewed.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Real-time Tab */}
          {activeTab === 'realtime' && (
            <div className="realtime-tab">
              <div className="realtime-header">
                <h3>⚡ Live Activity Feed</h3>
                <div className="last-updated">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
              
              <div className="activity-feed">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">
                      {index % 4 === 0 ? '🛍️' : index % 4 === 1 ? '🎭' : index % 4 === 2 ? '🥽' : '📊'}
                    </div>
                    <div className="activity-content">
                      <div className="activity-text">
                        {index % 4 === 0 && "User detected 'happy' mood → 4 products recommended"}
                        {index % 4 === 1 && "Party mood analysis → Designer dress selected"}
                        {index % 4 === 2 && "AR try-on session → Sunglasses virtually tested"}
                        {index % 4 === 3 && "Professional mood → Business attire viewed"}
                      </div>
                      <div className="activity-time">
                        {Math.floor(Math.random() * 5) + 1} min ago
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default EnhancedAnalyticsDashboard;
