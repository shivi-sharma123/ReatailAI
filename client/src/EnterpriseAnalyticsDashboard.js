import React, { useState, useEffect } from 'react';
import './EnterpriseAnalyticsDashboard.css';

const EnterpriseAnalyticsDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [marketIntelligence, setMarketIntelligence] = useState(null);
  const [realTimeInsights, setRealTimeInsights] = useState(null);
  const [supplyChainData, setSupplyChainData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchEnterpriseData();
    
    // Set up real-time data refresh
    const interval = setInterval(fetchRealTimeData, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchEnterpriseData = async () => {
    try {
      setLoading(true);
      
      // Fetch all enterprise data concurrently
      const [dashboardRes, marketRes, supplyRes] = await Promise.all([
        fetch('http://localhost:5000/api/enterprise/analytics-dashboard'),
        fetch('http://localhost:5000/api/ai/market-intelligence'),
        fetch('http://localhost:5000/api/enterprise/supply-chain-optimization')
      ]);

      const [dashboard, market, supply] = await Promise.all([
        dashboardRes.json(),
        marketRes.json(),
        supplyRes.json()
      ]);

      setDashboardData(dashboard.data);
      setMarketIntelligence(market.data);
      setSupplyChainData(supply.data);
      
      // Fetch real-time insights
      fetchRealTimeData();
    } catch (error) {
      console.error('Error fetching enterprise data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRealTimeData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/enterprise/real-time-insights');
      const result = await response.json();
      setRealTimeInsights(result.data);
    } catch (error) {
      console.error('Error fetching real-time data:', error);
    }
  };

  const MetricCard = ({ title, value, change, icon, color = "blue" }) => (
    <div className={`metric-card metric-card-${color}`}>
      <div className="metric-header">
        <span className="metric-icon">{icon}</span>
        <span className="metric-title">{title}</span>
      </div>
      <div className="metric-value">{value}</div>
      {change && (
        <div className={`metric-change ${change.startsWith('+') ? 'positive' : 'negative'}`}>
          {change}
        </div>
      )}
    </div>
  );

  const TrendingProducts = ({ products }) => (
    <div className="trending-products">
      <h3>🔥 Trending Now</h3>
      <div className="trending-list">
        {products?.map((product, index) => (
          <div key={index} className="trending-item">
            <div className="trending-info">
              <span className="trending-name">{product.name}</span>
              <span className="trending-category">{product.category}</span>
            </div>
            <div className="trending-spike">{product.spike}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const AIInsights = ({ insights }) => (
    <div className="ai-insights-panel">
      <h3>🤖 AI Insights</h3>
      <div className="insights-grid">
        <div className="insight-card">
          <h4>Revenue Impact</h4>
          <div className="insight-value">{insights?.ai_impact_metrics?.revenue_lift}</div>
        </div>
        <div className="insight-card">
          <h4>Customer Engagement</h4>
          <div className="insight-value">{insights?.ai_impact_metrics?.customer_engagement}</div>
        </div>
        <div className="insight-card">
          <h4>Operational Efficiency</h4>
          <div className="insight-value">{insights?.ai_impact_metrics?.operational_efficiency}</div>
        </div>
      </div>
      <div className="top-ai-features">
        <h4>Top Performing AI Features:</h4>
        <ul>
          {insights?.top_performing_ai_features?.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  const SupplyChainOptimization = ({ data }) => (
    <div className="supply-chain-panel">
      <h3>🚚 Supply Chain Intelligence</h3>
      <div className="supply-metrics">
        <div className="supply-metric">
          <h4>Delivery Performance</h4>
          <div className="supply-stats">
            <div>On-time: {data?.logistics_performance?.delivery_performance?.on_time_delivery}</div>
            <div>Avg Time: {data?.logistics_performance?.delivery_performance?.average_delivery_time}</div>
            <div>Satisfaction: {data?.logistics_performance?.delivery_performance?.customer_satisfaction}/5</div>
          </div>
        </div>
        <div className="supply-metric">
          <h4>Cost Optimization</h4>
          <div className="supply-stats">
            <div>Shipping Savings: {data?.logistics_performance?.cost_optimization?.shipping_cost_reduction}</div>
            <div>Inventory Savings: {data?.logistics_performance?.cost_optimization?.inventory_cost_savings}</div>
            <div>Efficiency: {data?.logistics_performance?.cost_optimization?.operational_efficiency}</div>
          </div>
        </div>
      </div>
      <div className="impact-summary">
        <h4>Annual Impact:</h4>
        <div className="impact-stats">
          <span>💰 {data?.impact_summary?.cost_savings} saved</span>
          <span>📈 {data?.impact_summary?.efficiency_gain} efficiency</span>
          <span>🌱 {data?.impact_summary?.sustainability_improvement}</span>
        </div>
      </div>
    </div>
  );

  const MarketIntelligence = ({ data }) => (
    <div className="market-intelligence-panel">
      <h3>📊 Market Intelligence</h3>
      <div className="intelligence-grid">
        <div className="intelligence-card">
          <h4>Trending Categories</h4>
          <div className="trend-list">
            {data?.market_trends?.trending_categories?.map((category, index) => (
              <div key={index} className="trend-item">
                <span className="trend-name">{category.name}</span>
                <span className="trend-growth">{category.growth}</span>
                <span className={`trend-potential ${category.potential.toLowerCase()}`}>
                  {category.potential}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="intelligence-card">
          <h4>Demand Forecast</h4>
          <div className="forecast-stats">
            <div>Next Week: {data?.market_trends?.demand_forecast?.next_week}</div>
            <div>Next Month: {data?.market_trends?.demand_forecast?.next_month}</div>
            <div>Next Quarter: {data?.market_trends?.demand_forecast?.next_quarter}</div>
          </div>
        </div>
        <div className="intelligence-card">
          <h4>Competitive Analysis</h4>
          <div className="competitive-stats">
            <div>Market Share Opportunity: {data?.market_trends?.competitive_analysis?.market_share_opportunity}</div>
            <div>Price Position: {data?.market_trends?.competitive_analysis?.price_competitiveness}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const RealTimeAlerts = ({ insights }) => (
    <div className="real-time-alerts">
      <h3>⚡ Real-Time Alerts</h3>
      <div className="alerts-list">
        <div className="alert alert-success">
          <span className="alert-icon">📈</span>
          <span>Traffic spike detected: {insights?.ai_predictions?.next_hour_traffic}</span>
        </div>
        <div className="alert alert-warning">
          <span className="alert-icon">📦</span>
          <span>Inventory alerts: {insights?.ai_predictions?.inventory_alerts} items need attention</span>
        </div>
        <div className="alert alert-info">
          <span className="alert-icon">🎯</span>
          <span>Promotional opportunities: {insights?.ai_predictions?.promotional_opportunities} detected</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="enterprise-dashboard loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading Enterprise Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="enterprise-analytics-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>🚀 RetailFlow Enterprise Analytics</h1>
        <div className="header-info">
          <span className="status-indicator online">● System Healthy</span>
          <span className="last-updated">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={`tab ${activeTab === 'ai-insights' ? 'active' : ''}`}
          onClick={() => setActiveTab('ai-insights')}
        >
          🤖 AI Insights
        </button>
        <button 
          className={`tab ${activeTab === 'supply-chain' ? 'active' : ''}`}
          onClick={() => setActiveTab('supply-chain')}
        >
          🚚 Supply Chain
        </button>
        <button 
          className={`tab ${activeTab === 'market' ? 'active' : ''}`}
          onClick={() => setActiveTab('market')}
        >
          📈 Market Intel
        </button>
      </div>

      {/* Tab Content */}
      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <>
            {/* Key Metrics */}
            <div className="metrics-grid">
              <MetricCard
                title="Active Users"
                value={dashboardData?.real_time_metrics?.active_users?.toLocaleString()}
                icon="👥"
                color="blue"
              />
              <MetricCard
                title="Conversion Rate"
                value={`${(dashboardData?.real_time_metrics?.conversion_rate * 100)?.toFixed(2)}%`}
                change="+0.5%"
                icon="📈"
                color="green"
              />
              <MetricCard
                title="Revenue Today"
                value={`$${dashboardData?.real_time_metrics?.revenue_today?.toLocaleString()}`}
                change="+12%"
                icon="💰"
                color="purple"
              />
              <MetricCard
                title="AI Accuracy"
                value={dashboardData?.performance_metrics?.ai_accuracy}
                change="+2.1%"
                icon="🎯"
                color="orange"
              />
            </div>

            {/* Performance Grid */}
            <div className="performance-grid">
              <div className="performance-card">
                <h3>⚡ System Performance</h3>
                <div className="performance-stats">
                  <div className="stat">
                    <span className="stat-label">Response Time</span>
                    <span className="stat-value">{dashboardData?.performance_metrics?.api_response_time}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Uptime</span>
                    <span className="stat-value">{dashboardData?.performance_metrics?.uptime}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Error Rate</span>
                    <span className="stat-value">{dashboardData?.performance_metrics?.error_rate}</span>
                  </div>
                </div>
              </div>

              <div className="performance-card">
                <h3>📊 Business KPIs</h3>
                <div className="kpi-stats">
                  <div className="kpi">
                    <span className="kpi-label">Customer Satisfaction</span>
                    <span className="kpi-value">{dashboardData?.business_kpis?.customer_satisfaction}/5</span>
                  </div>
                  <div className="kpi">
                    <span className="kpi-label">NPS Score</span>
                    <span className="kpi-value">{dashboardData?.business_kpis?.nps_score}</span>
                  </div>
                  <div className="kpi">
                    <span className="kpi-label">Growth Rate</span>
                    <span className="kpi-value">{dashboardData?.business_kpis?.growth_rate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Components */}
            <div className="real-time-grid">
              {realTimeInsights && (
                <>
                  <TrendingProducts products={realTimeInsights.trending_now?.hot_products} />
                  <RealTimeAlerts insights={realTimeInsights} />
                </>
              )}
            </div>
          </>
        )}

        {activeTab === 'ai-insights' && (
          <div className="ai-insights-tab">
            <AIInsights insights={dashboardData?.ai_insights} />
            
            <div className="ai-performance-grid">
              <div className="ai-performance-card">
                <h3>🎯 AI Model Performance</h3>
                <div className="ai-model-stats">
                  <div className="model-stat">
                    <span>Recommendation Accuracy</span>
                    <span>94.2%</span>
                  </div>
                  <div className="model-stat">
                    <span>Fraud Detection Rate</span>
                    <span>99.1%</span>
                  </div>
                  <div className="model-stat">
                    <span>Search Relevance</span>
                    <span>91.8%</span>
                  </div>
                </div>
              </div>
              
              <div className="ai-performance-card">
                <h3>📈 AI Business Impact</h3>
                <div className="impact-metrics">
                  <div className="impact-metric">
                    <span>Revenue Increase</span>
                    <span className="positive">+$2.3M</span>
                  </div>
                  <div className="impact-metric">
                    <span>Cost Reduction</span>
                    <span className="positive">-$890K</span>
                  </div>
                  <div className="impact-metric">
                    <span>Customer Retention</span>
                    <span className="positive">+15%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'supply-chain' && (
          <SupplyChainOptimization data={supplyChainData} />
        )}

        {activeTab === 'market' && (
          <MarketIntelligence data={marketIntelligence} />
        )}
      </div>

      {/* Footer */}
      <div className="dashboard-footer">
        <span>🏆 Walmart Sparkathon 2025 - Enterprise Edition</span>
        <span>Powered by RetailFlow AI v2.0</span>
      </div>
    </div>
  );
};

export default EnterpriseAnalyticsDashboard;
