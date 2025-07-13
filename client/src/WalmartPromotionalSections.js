import React from 'react';
import './WalmartPromotionalSections.css';

const WalmartPromotionalSections = () => {
  const todaysDeals = [
    {
      id: 1,
      title: "Electronics Flash Sale",
      discount: "Up to 70% Off",
      image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=300&h=200&fit=crop&q=80",
      timeLeft: "6h 23m",
      originalPrice: "$299.99",
      salePrice: "$89.99"
    },
    {
      id: 2,
      title: "Fashion Clearance",
      discount: "Buy 2 Get 1 Free",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop&q=80",
      timeLeft: "12h 45m",
      originalPrice: "$79.99",
      salePrice: "$39.99"
    },
    {
      id: 3,
      title: "Home Essentials",
      discount: "Save 60%",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop&q=80",
      timeLeft: "3h 12m",
      originalPrice: "$199.99",
      salePrice: "$79.99"
    },
    {
      id: 4,
      title: "Beauty Bundle",
      discount: "50% Off + Free Gift",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop&q=80",
      timeLeft: "8h 56m",
      originalPrice: "$149.99",
      salePrice: "$74.99"
    }
  ];

  const featuredCategories = [
    {
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop&q=80",
      deals: "1000+ deals",
      discount: "Up to 60% off"
    },
    {
      name: "Fashion",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&q=80",
      deals: "500+ deals",
      discount: "Up to 70% off"
    },
    {
      name: "Home & Garden",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&q=80",
      deals: "800+ deals",
      discount: "Up to 55% off"
    },
    {
      name: "Sports & Outdoors",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&q=80",
      deals: "300+ deals",
      discount: "Up to 50% off"
    }
  ];

  const inspiredByViewing = [
    {
      id: 1,
      name: "Similar Style Dress",
      price: "$45.99",
      originalPrice: "$79.99",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=200&fit=crop&q=80",
      rating: 4.6
    },
    {
      id: 2,
      name: "Matching Accessories",
      price: "$29.99",
      originalPrice: "$49.99",
      image: "https://images.unsplash.com/photo-1506629905607-84d42d3de5b8?w=200&h=200&fit=crop&q=80",
      rating: 4.4
    },
    {
      id: 3,
      name: "Complementary Shoes",
      price: "$69.99",
      originalPrice: "$99.99",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=200&fit=crop&q=80",
      rating: 4.7
    },
    {
      id: 4,
      name: "Styling Bag",
      price: "$89.99",
      originalPrice: "$129.99",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop&q=80",
      rating: 4.5
    }
  ];

  return (
    <div className="walmart-promotional-sections">
      {/* Today's Deals */}
      <section className="todays-deals-section">
        <div className="section-header">
          <h2>⚡ Today's Lightning Deals</h2>
          <span className="see-all">See all deals →</span>
        </div>
        <div className="deals-slider">
          {todaysDeals.map(deal => (
            <div key={deal.id} className="deal-card-promo">
              <div className="deal-timer">⏰ {deal.timeLeft}</div>
              <img src={deal.image} alt={deal.title} />
              <div className="deal-content">
                <div className="deal-badge">{deal.discount}</div>
                <h3>{deal.title}</h3>
                <div className="price-container">
                  <span className="sale-price">{deal.salePrice}</span>
                  <span className="original-price">{deal.originalPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="featured-categories-section">
        <div className="section-header">
          <h2>🛍️ Shop by Category</h2>
        </div>
        <div className="categories-grid">
          {featuredCategories.map((category, index) => (
            <div key={index} className="category-card">
              <img src={category.image} alt={category.name} />
              <div className="category-overlay">
                <h3>{category.name}</h3>
                <p>{category.deals}</p>
                <span className="category-discount">{category.discount}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inspired by Your Browsing */}
      <section className="inspired-section">
        <div className="section-header">
          <h2>💡 Inspired by your browsing history</h2>
          <span className="see-all">View more →</span>
        </div>
        <div className="inspired-grid">
          {inspiredByViewing.map(item => (
            <div key={item.id} className="inspired-item">
              <img src={item.image} alt={item.name} />
              <div className="item-info">
                <h4>{item.name}</h4>
                <div className="rating">
                  {'★'.repeat(Math.floor(item.rating))} {item.rating}
                </div>
                <div className="price-info">
                  <span className="current-price">{item.price}</span>
                  <span className="original-price-small">{item.originalPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Prime-like Benefits */}
      <section className="walmart-plus-section">
        <div className="walmart-plus-card">
          <div className="plus-content">
            <div className="plus-logo">
              <span className="plus-icon">W+</span>
              <h2>Walmart Plus</h2>
            </div>
            <div className="plus-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">🚚</span>
                <span>Free delivery from stores</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">⛽</span>
                <span>Member prices on fuel</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">📱</span>
                <span>Scan & Go technology</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🎬</span>
                <span>Paramount+ included</span>
              </div>
            </div>
            <button className="plus-cta">Try free for 30 days</button>
          </div>
          <div className="plus-image">
            <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop&q=80" alt="Walmart Plus" />
          </div>
        </div>
      </section>

      {/* International Brands */}
      <section className="international-brands">
        <div className="section-header">
          <h2>🌍 International Brands</h2>
        </div>
        <div className="brands-showcase">
          <div className="brand-card">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop&q=80" alt="Fashion Brands" />
            <h3>Global Fashion</h3>
            <p>Premium international fashion brands</p>
          </div>
          <div className="brand-card">
            <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop&q=80" alt="Tech Brands" />
            <h3>Tech Giants</h3>
            <p>Latest from Apple, Samsung & more</p>
          </div>
          <div className="brand-card">
            <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop&q=80" alt="Beauty Brands" />
            <h3>Beauty Essentials</h3>
            <p>International beauty & skincare</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WalmartPromotionalSections;
