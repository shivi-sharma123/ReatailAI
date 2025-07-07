// Enhanced Product Database with Categories, Reviews, and Ratings
export const productCategories = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: '📱',
    subcategories: ['Smartphones', 'Laptops', 'Headphones', 'Smart Watches', 'Tablets']
  },
  {
    id: 'clothing',
    name: 'Clothing',
    icon: '👕',
    subcategories: ['Men\'s Clothing', 'Women\'s Clothing', 'Kids\' Clothing', 'Shoes', 'Accessories']
  },
  {
    id: 'home',
    name: 'Home & Garden',
    icon: '🏠',
    subcategories: ['Furniture', 'Kitchen', 'Bedding', 'Garden', 'Home Decor']
  },
  {
    id: 'sports',
    name: 'Sports & Fitness',
    icon: '⚽',
    subcategories: ['Exercise Equipment', 'Sports Gear', 'Outdoor Recreation', 'Athletic Wear']
  },
  {
    id: 'beauty',
    name: 'Beauty & Personal Care',
    icon: '💄',
    subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Personal Care', 'Fragrances']
  }
];

export const productDatabase = [
  // Electronics
  {
    id: 1,
    name: "Premium Smart Watch",
    category: "electronics",
    subcategory: "Smart Watches",
    description: "Advanced fitness tracking with AI health insights",
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    rating: 4.5,
    reviewCount: 1247,
    inStock: true,
    stockCount: 15,
    brand: "TechPro",
    arEnabled: true,
    walmartPlus: true,
    pickupToday: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Space Gray', hex: '#4a5568', price_modifier: 0},
      {name: 'Rose Gold', hex: '#ed8936', price_modifier: 50},
      {name: 'Silver', hex: '#cbd5e0', price_modifier: 25},
      {name: 'Ocean Blue', hex: '#2b6cb0', price_modifier: 30}
    ],
    sizes: [
      {size: '38mm', price_modifier: 0},
      {size: '42mm', price_modifier: 50},
      {size: '45mm', price_modifier: 100}
    ],
    reviews: [
      {
        id: 1,
        userName: "Alex Johnson",
        rating: 5,
        date: "2025-06-15",
        title: "Amazing smartwatch!",
        comment: "The AR try-on feature helped me choose the perfect size. Battery life is excellent and fitness tracking is very accurate.",
        verified: true,
        helpful: 23
      },
      {
        id: 2,
        userName: "Sarah Chen",
        rating: 4,
        date: "2025-06-10",
        title: "Great value for money",
        comment: "Love the health tracking features. The AR feature made shopping so much easier!",
        verified: true,
        helpful: 18
      }
    ]
  },
  {
    id: 2,
    name: "Wireless Bluetooth Headphones",
    category: "electronics",
    subcategory: "Headphones",
    description: "Premium noise-cancelling headphones with 30-hour battery life",
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    rating: 4.3,
    reviewCount: 892,
    inStock: true,
    stockCount: 28,
    brand: "SoundMax",
    arEnabled: true,
    image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Black', hex: '#1a1a1a', price_modifier: 0},
      {name: 'White', hex: '#ffffff', price_modifier: 0},
      {name: 'Blue', hex: '#3b82f6', price_modifier: 20}
    ],
    reviews: [
      {
        id: 1,
        userName: "Mike Wilson",
        rating: 5,
        date: "2025-06-20",
        title: "Excellent sound quality",
        comment: "Best headphones I've ever owned. The noise cancellation is incredible.",
        verified: true,
        helpful: 31
      }
    ]
  },
  {
    id: 3,
    name: "Gaming Laptop Pro",
    category: "electronics",
    subcategory: "Laptops",
    description: "High-performance gaming laptop with RTX 4080 and 32GB RAM",
    price: 1899.99,
    originalPrice: 2299.99,
    discount: 17,
    rating: 4.7,
    reviewCount: 445,
    inStock: true,
    stockCount: 8,
    brand: "GameTech",
    arEnabled: false,
    image_url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop"
    ],
    reviews: [
      {
        id: 1,
        userName: "David Kim",
        rating: 5,
        date: "2025-06-18",
        title: "Beast of a machine",
        comment: "Runs all the latest games at max settings. Amazing build quality.",
        verified: true,
        helpful: 45
      }
    ]
  },
  // Clothing
  {
    id: 4,
    name: "Premium Cotton T-Shirt",
    category: "clothing",
    subcategory: "Men's Clothing",
    description: "100% organic cotton t-shirt with modern fit",
    price: 24.99,
    originalPrice: 34.99,
    discount: 29,
    rating: 4.2,
    reviewCount: 2156,
    inStock: true,
    stockCount: 150,
    brand: "ComfortWear",
    arEnabled: true,
    image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'White', hex: '#ffffff', price_modifier: 0},
      {name: 'Black', hex: '#1a1a1a', price_modifier: 0},
      {name: 'Navy', hex: '#1e3a8a', price_modifier: 0},
      {name: 'Gray', hex: '#6b7280', price_modifier: 0}
    ],
    sizes: [
      {size: 'S', price_modifier: 0},
      {size: 'M', price_modifier: 0},
      {size: 'L', price_modifier: 0},
      {size: 'XL', price_modifier: 0},
      {size: 'XXL', price_modifier: 5}
    ],
    reviews: [
      {
        id: 1,
        userName: "James Miller",
        rating: 4,
        date: "2025-06-12",
        title: "Comfortable and stylish",
        comment: "Great quality cotton. Fits perfectly thanks to the AR try-on feature.",
        verified: true,
        helpful: 67
      }
    ]
  },
  {
    id: 5,
    name: "Running Sneakers",
    category: "clothing",
    subcategory: "Shoes",
    description: "Lightweight running shoes with advanced cushioning technology",
    price: 129.99,
    originalPrice: 159.99,
    discount: 19,
    rating: 4.6,
    reviewCount: 1834,
    inStock: true,
    stockCount: 45,
    brand: "RunFast",
    arEnabled: true,
    image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'White/Blue', hex: '#3b82f6', price_modifier: 0},
      {name: 'Black/Red', hex: '#ef4444', price_modifier: 10},
      {name: 'Gray/Green', hex: '#10b981', price_modifier: 15}
    ],
    sizes: [
      {size: '7', price_modifier: 0},
      {size: '8', price_modifier: 0},
      {size: '9', price_modifier: 0},
      {size: '10', price_modifier: 0},
      {size: '11', price_modifier: 0},
      {size: '12', price_modifier: 0}
    ],
    reviews: [
      {
        id: 1,
        userName: "Lisa Chen",
        rating: 5,
        date: "2025-06-14",
        title: "Perfect for running",
        comment: "Super comfortable and lightweight. The AR feature helped me get the right size.",
        verified: true,
        helpful: 89
      }
    ]
  },
  // Home & Garden
  {
    id: 6,
    name: "Smart Coffee Maker",
    category: "home",
    subcategory: "Kitchen",
    description: "WiFi-enabled coffee maker with app control and programmable brewing",
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    rating: 4.4,
    reviewCount: 567,
    inStock: true,
    stockCount: 22,
    brand: "BrewSmart",
    arEnabled: false,
    image_url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop"
    ],
    reviews: [
      {
        id: 1,
        userName: "Coffee Lover",
        rating: 4,
        date: "2025-06-16",
        title: "Great smart features",
        comment: "Love being able to start brewing from bed. Coffee tastes amazing.",
        verified: true,
        helpful: 34
      }
    ]
  },
  // Sports & Fitness
  {
    id: 7,
    name: "Yoga Mat Premium",
    category: "sports",
    subcategory: "Exercise Equipment",
    description: "Non-slip eco-friendly yoga mat with alignment guides",
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    rating: 4.3,
    reviewCount: 1245,
    inStock: true,
    stockCount: 78,
    brand: "ZenFit",
    arEnabled: false,
    image_url: "https://images.unsplash.com/photo-1506629905645-b178db5e0084?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1506629905645-b178db5e0084?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Purple', hex: '#8b5cf6', price_modifier: 0},
      {name: 'Blue', hex: '#3b82f6', price_modifier: 0},
      {name: 'Green', hex: '#10b981', price_modifier: 0},
      {name: 'Pink', hex: '#ec4899', price_modifier: 5}
    ],
    reviews: [
      {
        id: 1,
        userName: "Yoga Teacher",
        rating: 5,
        date: "2025-06-11",
        title: "Perfect for daily practice",
        comment: "Excellent grip and cushioning. The alignment guides are very helpful.",
        verified: true,
        helpful: 56
      }
    ]
  },
  // Beauty & Personal Care
  {
    id: 8,
    name: "Skincare Set Deluxe",
    category: "beauty",
    subcategory: "Skincare",
    description: "Complete 5-step skincare routine with natural ingredients",
    price: 89.99,
    originalPrice: 129.99,
    discount: 31,
    rating: 4.8,
    reviewCount: 934,
    inStock: true,
    stockCount: 67,
    brand: "GlowUp",
    arEnabled: false,
    image_url: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop"
    ],
    reviews: [
      {
        id: 1,
        userName: "Beauty Guru",
        rating: 5,
        date: "2025-06-13",
        title: "Amazing results",
        comment: "My skin has never looked better. Worth every penny!",
        verified: true,
        helpful: 78
      }
    ]
  }
];

export default productDatabase;
