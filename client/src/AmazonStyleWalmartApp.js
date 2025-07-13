import React, { useState, useEffect } from 'react';
import AmazonStyleHeader from './AmazonStyleHeader';
import MoodBasedChatbot from './MoodBasedChatbot';
import TechnicalARViewer from './TechnicalARViewer';
import Enhanced3DARViewer from './Enhanced3DARViewer';
import WalmartHeroSection from './WalmartHeroSection';
import WalmartPromotionalSections from './WalmartPromotionalSections';
import ModernFooter from './ModernFooter';
import WalmartLogin from './WalmartLogin';
import EnterpriseAnalyticsDashboard from './EnterpriseAnalyticsDashboard';
import './AmazonStyleWalmart.css';

const AmazonStyleWalmartApp = ({ user, onLogout }) => {
  const [currentView, setCurrentView] = useState('home');
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showARViewer, setShowARViewer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);
  const [showLogin, setShowLogin] = useState(false);

  // Fetch products from database
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/products/enhanced');
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            // Transform database products to match the expected format
            const transformedProducts = result.data.map(product => ({
              id: product.id,
              name: product.name,
              price: product.price, // Keep as number for AR viewer
              originalPrice: `$${(product.price * 1.2).toFixed(2)}`, // Simulate original price
              image: product.image_url,
              image_url: product.image_url, // Keep both for compatibility
              rating: product.rating,
              reviews: Math.floor(Math.random() * 5000) + 100, // Simulate review count
              badge: product.is_trending ? "Best Seller" : "Popular",
              discount: `${Math.floor(Math.random() * 30) + 10}% off`,
              category: product.category,
              description: product.description,
              inStock: product.stock_quantity > 0,
              freeShipping: true,
              arEnabled: product.ar_enabled,
              emoji: product.emoji,
              brand: product.brand,
              colors: product.colors || [
                {name: "Black", hex: "#000000", image: product.image_url},
                {name: "White", hex: "#FFFFFF", image: product.image_url},
                {name: "Gray", hex: "#808080", image: product.image_url}
              ],
              sizes: product.sizes || [
                {name: "S", price_modifier: 0, stock: 20},
                {name: "M", price_modifier: 0, stock: 25},
                {name: "L", price_modifier: 0, stock: 20},
                {name: "XL", price_modifier: 5, stock: 15}
              ]
            }));
            setProducts(transformedProducts);
          }
        } else {
          // Fallback to mock data if API fails
          setProducts(mockProducts);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        // Fallback to mock data
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const mockProducts = [
    {
      id: 1,
      name: "Apple iPhone 15 Pro Max",
      price: "$1,199.00",
      originalPrice: "$1,299.00",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      reviews: 2847,
      badge: "Best Seller",
      discount: "8% off",
      category: "Electronics",
      description: "Latest iPhone with titanium design and advanced camera system",
      inStock: true,
      freeShipping: true,
      arEnabled: true
    },
    {
      id: 2,
      name: "Samsung 65\" QLED 4K Smart TV",
      price: "$899.99",
      originalPrice: "$1,199.99",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop&crop=center",
      rating: 4.6,
      reviews: 1543,
      badge: "Deal of the Day",
      discount: "25% off",
      category: "Electronics",
      description: "Stunning 4K QLED display with smart features",
      inStock: true,
      freeShipping: true,
      arEnabled: true
    },
    {
      id: 3,
      name: "Nike Air Jordan 1 Retro High",
      price: "$170.00",
      originalPrice: "$200.00",
      image: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      reviews: 3421,
      badge: "Limited Edition",
      discount: "15% off",
      category: "Fashion",
      description: "Classic basketball sneakers with premium leather",
      inStock: true,
      freeShipping: true,
      arEnabled: true
    },
    {
      id: 4,
      name: "Elegant Summer Dress",
      price: "$89.99",
      originalPrice: "$129.99",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      reviews: 892,
      badge: "Customer's Choice",
      discount: "31% off",
      category: "Fashion",
      description: "Beautiful floral summer dress perfect for any occasion",
      inStock: true,
      freeShipping: true,
      arEnabled: true
    },
    {
      id: 5,
      name: "Designer Leather Handbag",
      price: "$249.99",
      originalPrice: "$399.99",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      reviews: 1756,
      badge: "Editor's Pick",
      discount: "38% off",
      category: "Fashion",
      description: "Premium leather handbag with modern design",
      inStock: true,
      freeShipping: true,
      arEnabled: true
    },
    {
      id: 6,
      name: "Women's High Heel Pumps",
      price: "$79.99",
      originalPrice: "$119.99",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop&crop=center",
      rating: 4.6,
      reviews: 4521,
      badge: "Top Rated",
      discount: "33% off",
      category: "Fashion",
      description: "Elegant high heel pumps for professional and formal wear",
      inStock: true,
      freeShipping: true,
      arEnabled: true
    },
    {
      id: 7,
      name: "MacBook Pro 16-inch M3",
      price: "$2,499.00",
      originalPrice: "$2,699.00",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      reviews: 678,
      badge: "Premium",
      discount: "7% off",
      category: "Electronics",
      description: "Professional laptop with M3 chip and stunning display",
      inStock: true,
      freeShipping: true,
      arEnabled: true
    },
    {
      id: 8,
      name: "Sony WH-1000XM5 Headphones",
      price: "$349.99",
      originalPrice: "$399.99",
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      reviews: 1234,
      badge: "New Arrival",
      discount: "13% off",
      category: "Electronics",
      description: "Industry-leading noise canceling wireless headphones",
      inStock: true,
      freeShipping: true,
      arEnabled: true
    },
    {
      id: 9,
      name: "Casual Denim Jacket",
      price: "$69.99",
      originalPrice: "$99.99",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400&h=400&fit=crop&crop=center",
      rating: 4.5,
      reviews: 2156,
      badge: "Trending",
      discount: "30% off",
      category: "Fashion",
      description: "Classic denim jacket for casual everyday style",
      inStock: true,
      freeShipping: true,
      arEnabled: true
    },
    {
      id: 10,
      name: "Wireless Gaming Mouse",
      price: "$89.99",
      originalPrice: "$129.99",
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      reviews: 3492,
      badge: "Gamer's Pick",
      discount: "31% off",
      category: "Electronics",
      description: "High-precision wireless gaming mouse with RGB lighting",
      inStock: true,
      freeShipping: true,
      arEnabled: true
    },
    {
      id: 11,
      name: "Designer Sunglasses",
      price: "$159.99",
      originalPrice: "$229.99",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center",
      rating: 4.6,
      reviews: 987,
      badge: "Style Icon",
      discount: "30% off",
      category: "Fashion",
      description: "Premium designer sunglasses with UV protection",
      inStock: true,
      freeShipping: true,
      arEnabled: true
    },
    {
      id: 12,
      name: "Smart Fitness Watch",
      price: "$299.99",
      originalPrice: "$399.99",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      reviews: 2834,
      badge: "Fitness Pro",
      discount: "25% off",
      category: "Electronics",
      description: "Advanced fitness tracking with heart rate monitor",
      inStock: true,
      freeShipping: true,
      arEnabled: true
    },
    {
      id: 13,
      name: "Luxury Perfume Set",
      price: "$129.99",
      originalPrice: "$189.99",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      reviews: 1567,
      badge: "Luxury",
      discount: "32% off",
      category: "Health & Beauty",
      description: "Premium fragrance collection for special occasions",
      inStock: true,
      freeShipping: true,
      arEnabled: true
    },
    {
      id: 14,
      name: "Professional Camera Lens",
      price: "$599.99",
      originalPrice: "$799.99",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      reviews: 756,
      badge: "Pro Choice",
      discount: "25% off",
      category: "Electronics",
      description: "High-quality telephoto lens for professional photography",
      inStock: true,
      freeShipping: true,
      arEnabled: true
    },
    {
      id: 15,
      name: "Cozy Winter Sweater",
      price: "$59.99",
      originalPrice: "$89.99",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop&crop=center",
      rating: 4.5,
      reviews: 1892,
      badge: "Winter Special",
      discount: "33% off",
      category: "Fashion",
      description: "Soft and warm sweater perfect for cold weather",
      inStock: true,
      freeShipping: true,
      arEnabled: true
    },
    {
      id: 16,
      name: "Bluetooth Speaker",
      price: "$79.99",
      originalPrice: "$119.99",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center",
      rating: 4.6,
      reviews: 2341,
      badge: "Sound Master",
      discount: "33% off",
      category: "Electronics",
      description: "Portable speaker with amazing sound quality",
      inStock: true,
      freeShipping: true,
      arEnabled: true
    }
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setProducts(mockProducts);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = async (query, category) => {
    setSearchQuery(query);
    setSelectedCategory(category);
    setCurrentView('products');
    setLoading(true);

    try {
      // Use the new search API for real-time search
      const searchParams = new URLSearchParams({
        q: query,
        category: category !== 'All' ? category : '',
        limit: '50'
      });

      const response = await fetch(`http://localhost:5000/api/search/products?${searchParams}`);
      
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data.products) {
          // Transform search results to match the expected format
          const searchResults = result.data.products.map(product => ({
            id: product.id,
            name: product.name,
            price: `$${product.price.toFixed(2)}`,
            originalPrice: `$${(product.price * 1.2).toFixed(2)}`,
            image: product.image_url,
            rating: product.rating,
            reviews: Math.floor(Math.random() * 5000) + 100,
            badge: product.rating > 4.5 ? "Top Rated" : "Popular",
            discount: `${Math.floor(Math.random() * 30) + 10}% off`,
            category: product.category,
            description: product.description,
            inStock: product.stock_quantity > 0,
            freeShipping: true,
            arEnabled: product.ar_enabled,
            emoji: product.emoji,
            brand: product.brand,
            colors: product.colors || [],
            sizes: product.sizes || []
          }));
          
          setProducts(searchResults);
        }
      } else {
        // Fallback to filtering existing products
        const filteredProducts = products.filter(product => {
          const matchesSearch = product.name.toLowerCase().includes(query.toLowerCase()) ||
                               product.description.toLowerCase().includes(query.toLowerCase());
          const matchesCategory = category === 'All' || product.category === category;
          return matchesSearch && matchesCategory;
        });
        setProducts(filteredProducts);
      }
    } catch (error) {
      console.error('Search API error:', error);
      // Fallback to filtering existing products
      const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(query.toLowerCase()) ||
                             product.description.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = category === 'All' || product.category === category;
        return matchesSearch && matchesCategory;
      });
      setProducts(filteredProducts);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    // Show success animation or notification
    console.log(`Added ${product.name} to cart`);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const handleARView = (product) => {
    setSelectedProduct(product);
    setShowARViewer(true);
  };

  const handleCartClick = () => {
    setCurrentView('cart');
  };

  const handleAuthClick = () => {
    if (currentUser) {
      // User is logged in, log them out
      setCurrentUser(null);
      if (onLogout) onLogout();
    } else {
      // User is not logged in, show login
      setShowLogin(true);
    }
  };

  const handleLogin = (userData) => {
    // Create user object from login data
    const newUser = {
      name: userData.email.split('@')[0], // Use email prefix as name
      email: userData.email,
      loginTime: new Date().toISOString()
    };
    setCurrentUser(newUser);
    setShowLogin(false);
    
    // Show success message
    console.log('Login successful!', newUser);
  };

  const handleAllDepartmentsClick = (feature) => {
    console.log('All Departments feature clicked:', feature);
    
    switch(feature) {
      case 'ar-shopping':
        // Show AR features or products with AR enabled
        handleSearch('', 'All');
        break;
      case 'ai-recommendations':
        // Show AI-powered recommendations
        setCurrentView('recommendations');
        break;
      case 'voice-search':
        // Activate voice search
        break;
      case 'mood-chatbot':
        // Focus on chatbot
        break;
      case 'live-tracking':
        setCurrentView('tracking');
        break;
      case 'group-buying':
        setCurrentView('group-buying');
        break;
      case 'flash-deals':
        setCurrentView('flash-deals');
        break;
      case 'analytics':
        setCurrentView('analytics');
        break;
      case 'enterprise-dashboard':
        setCurrentView('enterprise-dashboard');
        break;
      default:
        console.log('Feature not implemented yet:', feature);
    }
  };

  const handleProductRecommendation = (product) => {
    handleProductClick(product);
  };

  const ProductCard = ({ product }) => (
    <div className="amazon-product-card" onClick={() => handleProductClick(product)}>
      {product.badge && <div className="product-badge">{product.badge}</div>}
      
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.arEnabled && (
          <button 
            className="ar-try-button"
            onClick={(e) => {
              e.stopPropagation();
              handleARView(product);
            }}
          >
            🥽 Try AR
          </button>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        
        <div className="product-rating">
          <div className="stars">
            {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
          </div>
          <span className="rating-count">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="product-price-section">
          <span className="product-price">{product.price}</span>
          {product.originalPrice && (
            <span className="product-original-price">{product.originalPrice}</span>
          )}
          {product.discount && (
            <span className="product-discount">{product.discount}</span>
          )}
        </div>

        <div className="product-actions">
          <button 
            className="add-to-cart-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
          >
            Add to Cart
          </button>
          <button className="wishlist-btn">♡</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="amazon-style-walmart-app">
      {/* Header */}
      <AmazonStyleHeader
        user={currentUser}
        cartItems={cartItems}
        onCartClick={handleCartClick}
        onCategorySelect={handleCategorySelect}
        onSearch={handleSearch}
        onAuthClick={handleAuthClick}
        onAllDepartmentsClick={handleAllDepartmentsClick}
      />

      {/* Main Content */}
      {currentView === 'enterprise-dashboard' ? (
        <EnterpriseAnalyticsDashboard />
      ) : (
        <>
          {/* Walmart Hero Section */}
          <WalmartHeroSection />

          {/* Walmart Promotional Sections */}
          <WalmartPromotionalSections />

          <main className="amazon-product-grid">
        {/* Products Header */}
        <div className="products-header">
          <h1 className="products-title">
            {searchQuery ? `Search results for "${searchQuery}"` : 
             selectedCategory !== 'All' ? selectedCategory : 'Featured Products'}
          </h1>
          <div className="filter-sort-container">
            <button className="filter-button">🔧 Filters</button>
            <select className="sort-dropdown">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Customer Rating</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '50px', 
            fontSize: '18px',
            color: '#666'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
            Searching for products...
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !loading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '50px', 
            fontSize: '18px',
            color: '#666'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
            No products found matching your criteria.
          </div>
        )}
          </main>

          {/* Enhanced 3D AR Viewer */}
          <Enhanced3DARViewer
            product={selectedProduct}
            isVisible={showARViewer}
            onClose={() => setShowARViewer(false)}
            onAddToCart={(productWithConfig) => {
              // Add configured product to cart
              setCartItems(prev => {
                const existingItem = prev.find(item => 
                  item.id === productWithConfig.id && 
                  item.selectedColor === productWithConfig.selectedColor &&
                  item.selectedSize === productWithConfig.selectedSize
                );
                
                if (existingItem) {
                  return prev.map(item =>
                    item.id === productWithConfig.id && 
                    item.selectedColor === productWithConfig.selectedColor &&
                    item.selectedSize === productWithConfig.selectedSize
                      ? { ...item, quantity: item.quantity + 1 }
                      : item
                  );
                } else {
                  return [...prev, { 
                    ...productWithConfig, 
                    quantity: 1,
                    price: productWithConfig.finalPrice || productWithConfig.price
                  }];
                }
              });
              setShowARViewer(false);
            }}
          />

          {/* Mood-Based Chatbot */}
          <MoodBasedChatbot 
            user={currentUser} 
            onProductRecommendation={handleProductRecommendation}
          />

          {/* Walmart Login Modal */}
          {showLogin && (
            <div className="login-modal-overlay" onClick={() => setShowLogin(false)}>
              <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="login-close-btn" onClick={() => setShowLogin(false)}>
                  ✕
                </button>
                <WalmartLogin onLogin={handleLogin} />
              </div>
            </div>
          )}

          {/* Modern Footer */}
          <ModernFooter />
        </>
      )}
    </div>
  );
};

export default AmazonStyleWalmartApp;
