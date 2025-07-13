import React from 'react';
import './WalmartHeroSection.css';

const WalmartHeroSection = () => {
  return (
    <div className="amazon-fashion-hero-section">
      {/* Main Fashion Hero Banner */}
      <div className="fashion-hero-banner">
        <img 
          src="https://media.licdn.com/dms/image/v2/D4D10AQFBc-g_jcHFZw/image-shrink_1280/B4DZeioSNmGkAM-/0/1750780159689?e=1753009200&v=beta&t=Ehacgitbgk_UNTebV26ZevhhB7dGEeaSTSMTqKgLbM0" 
          alt="Retail Shopping Experience" 
          className="hero-main-image"
        />
        <div className="hero-content-overlay">
          <div className="hero-text">
            <h1>Walmart Retail Experience</h1>
            <p>Smart shopping with AI-powered features</p>
            <button className="shop-now-btn">Shop Now</button>
          </div>
        </div>
      </div>

      {/* Retail Categories Quick Links */}
      <div className="fashion-categories">
        <div className="category-item">
          <h4>Electronics</h4>
          <p>Latest tech with AR preview</p>
        </div>
        <div className="category-item">
          <h4>Fashion & Apparel</h4>
          <p>Style with virtual try-on</p>
        </div>
        <div className="category-item">
          <h4>Home & Garden</h4>
          <p>Transform your space with AR</p>
        </div>
        <div className="category-item">
          <h4>AI Shopping</h4>
          <p>Smart recommendations & search</p>
        </div>
      </div>
    </div>
  );
};

export default WalmartHeroSection;
