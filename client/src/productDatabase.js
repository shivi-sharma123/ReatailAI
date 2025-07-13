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
  },
  {
    id: 'bags',
    name: 'Bags',
    icon: '👜',
    subcategories: ['Handbags', 'Backpacks', 'Laptop Bags', 'Crossbody Bags', 'Travel Bags']
  },
  {
    id: 'ladies',
    name: 'Ladies\' Fashion',
    icon: '👗',
    subcategories: ['Dresses', 'Tops', 'Blouses', 'Skirts', 'Pants']
  },
  {
    id: 'accessories',
    name: 'Accessories',
    icon: '🎯',
    subcategories: ['Weather Protection', 'Phone Cases', 'Jewelry', 'Watches', 'Sunglasses']
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
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop"
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
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop"
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
  },
  // BAGS CATEGORY
  {
    id: 101,
    name: "Luxury Leather Handbag",
    category: "bags",
    subcategory: "Handbags",
    description: "Premium genuine leather handbag with gold hardware",
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    rating: 4.7,
    reviewCount: 892,
    inStock: true,
    stockCount: 25,
    brand: "LuxuryCraft",
    gender: "women",
    arEnabled: true,
    walmartPlus: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Black', hex: '#000000', price_modifier: 0},
      {name: 'Brown', hex: '#8B4513', price_modifier: 10},
      {name: 'Tan', hex: '#D2B48C', price_modifier: 15},
      {name: 'Red', hex: '#DC143C', price_modifier: 20}
    ],
    sizes: [
      {size: 'Small', price_modifier: 0},
      {size: 'Medium', price_modifier: 25},
      {size: 'Large', price_modifier: 50}
    ],
    tags: ["luxury", "leather", "handbag", "women", "accessories"],
    createdAt: "2025-01-15"
  },
  {
    id: 102,
    name: "Canvas Backpack",
    category: "bags",
    subcategory: "Backpacks",
    description: "Durable canvas backpack perfect for school and travel",
    price: 49.99,
    originalPrice: 69.99,
    discount: 28,
    rating: 4.3,
    reviewCount: 456,
    inStock: true,
    stockCount: 50,
    brand: "TravelEase",
    gender: "unisex",
    arEnabled: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Navy', hex: '#000080', price_modifier: 0},
      {name: 'Khaki', hex: '#F0E68C', price_modifier: 5},
      {name: 'Black', hex: '#000000', price_modifier: 0},
      {name: 'Gray', hex: '#808080', price_modifier: 0}
    ],
    sizes: [
      {size: '20L', price_modifier: 0},
      {size: '25L', price_modifier: 10},
      {size: '30L', price_modifier: 20}
    ],
    tags: ["canvas", "backpack", "travel", "school", "durable"],
    createdAt: "2025-01-10"
  },
  {
    id: 103,
    name: "Professional Laptop Bag",
    category: "bags",
    subcategory: "Laptop Bags",
    description: "Sleek laptop bag with multiple compartments",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviewCount: 234,
    inStock: true,
    stockCount: 30,
    brand: "WorkPro",
    gender: "unisex",
    arEnabled: true,
    walmartPlus: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Black', hex: '#000000', price_modifier: 0},
      {name: 'Brown', hex: '#8B4513', price_modifier: 15},
      {name: 'Gray', hex: '#808080', price_modifier: 5}
    ],
    sizes: ["13 inch", "15 inch", "17 inch"],
    tags: ["laptop", "professional", "work", "business", "compartments"],
    createdAt: "2025-01-08"
  },
  {
    id: 104,
    name: "Crossbody Purse",
    category: "bags",
    subcategory: "Crossbody Bags",
    description: "Stylish crossbody purse for everyday use",
    price: 34.99,
    originalPrice: 49.99,
    rating: 4.2,
    reviewCount: 567,
    inStock: true,
    stockCount: 45,
    brand: "StyleCo",
    gender: "women",
    arEnabled: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
    colors: ["Black", "Pink", "Beige", "Navy"],
    sizes: ["Small", "Medium"],
    tags: ["crossbody", "purse", "everyday", "stylish", "women"],
    createdAt: "2025-01-12"
  },
  {
    id: 105,
    name: "Travel Duffel Bag",
    category: "bags",
    subcategory: "Travel Bags",
    description: "Large capacity duffel bag for weekend trips",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.4,
    reviewCount: 345,
    inStock: true,
    stockCount: 20,
    brand: "TravelMate",
    gender: "unisex",
    arEnabled: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    colors: ["Black", "Navy", "Olive", "Brown"],
    sizes: ["Medium", "Large", "Extra Large"],
    tags: ["travel", "duffel", "weekend", "large", "capacity"],
    createdAt: "2025-01-05"
  },
  {
    id: 106,
    name: "Designer Clutch Bag",
    category: "bags",
    subcategory: "Clutch Bags",
    description: "Elegant clutch bag perfect for evening events",
    price: 59.99,
    originalPrice: 89.99,
    rating: 4.6,
    reviewCount: 223,
    inStock: true,
    stockCount: 15,
    brand: "Elegance",
    gender: "women",
    arEnabled: true,
    walmartPlus: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
    colors: ["Gold", "Silver", "Black", "Rose Gold"],
    sizes: ["One Size"],
    tags: ["clutch", "evening", "elegant", "designer", "formal"],
    createdAt: "2025-01-03"
  },
  {
    id: 107,
    name: "Gym Sports Bag",
    category: "bags",
    subcategory: "Gym Bags",
    description: "Waterproof gym bag with shoe compartment",
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.1,
    reviewCount: 789,
    inStock: true,
    stockCount: 60,
    brand: "FitGear",
    gender: "unisex",
    arEnabled: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    colors: ["Black", "Red", "Blue", "Green"],
    sizes: ["Small", "Medium", "Large"],
    tags: ["gym", "sports", "waterproof", "fitness", "shoe compartment"],
    createdAt: "2025-01-01"
  },
  {
    id: 108,
    name: "Vintage Tote Bag",
    category: "bags",
    subcategory: "Tote Bags",
    description: "Classic vintage-style tote bag for shopping and daily use",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.3,
    reviewCount: 412,
    inStock: true,
    stockCount: 40,
    brand: "VintageVibes",
    gender: "women",
    arEnabled: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
    colors: ["Brown", "Black", "Cream", "Burgundy"],
    sizes: ["Medium", "Large"],
    tags: ["vintage", "tote", "shopping", "classic", "daily"],
    createdAt: "2024-12-28"
  },

  // LADIES DRESSES CATEGORY
  {
    id: 201,
    name: "Elegant Evening Dress",
    category: "ladies",
    subcategory: "Dresses",
    description: "Stunning evening dress perfect for special occasions",
    price: 129.99,
    originalPrice: 179.99,
    discount: 28,
    rating: 4.8,
    reviewCount: 567,
    inStock: true,
    stockCount: 25,
    brand: "ElegantWear",
    gender: "women",
    arEnabled: true,
    walmartPlus: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566479179817-c0b4e8e1dee9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1547904979-d52230e7b525?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Black', hex: '#000000', price_modifier: 0},
      {name: 'Navy', hex: '#000080', price_modifier: 10},
      {name: 'Burgundy', hex: '#800020', price_modifier: 15},
      {name: 'Emerald', hex: '#50C878', price_modifier: 20}
    ],
    sizes: [
      {size: 'XS', price_modifier: 0},
      {size: 'S', price_modifier: 0},
      {size: 'M', price_modifier: 0},
      {size: 'L', price_modifier: 5},
      {size: 'XL', price_modifier: 10}
    ],
    tags: ["evening", "dress", "elegant", "special occasion", "formal"],
    createdAt: "2025-01-16"
  },
  {
    id: 202,
    name: "Casual Summer Dress",
    category: "ladies",
    subcategory: "Dresses",
    description: "Light and breezy summer dress for everyday wear",
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.5,
    reviewCount: 823,
    inStock: true,
    stockCount: 50,
    brand: "SummerStyle",
    gender: "women",
    arEnabled: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Floral', hex: '#FFB6C1', price_modifier: 5},
      {name: 'White', hex: '#FFFFFF', price_modifier: 0},
      {name: 'Yellow', hex: '#FFFF00', price_modifier: 5},
      {name: 'Pink', hex: '#FFC0CB', price_modifier: 0},
      {name: 'Blue', hex: '#87CEEB', price_modifier: 0}
    ],
    sizes: [
      {size: 'XS', price_modifier: 0},
      {size: 'S', price_modifier: 0},
      {size: 'M', price_modifier: 0},
      {size: 'L', price_modifier: 0},
      {size: 'XL', price_modifier: 5},
      {size: 'XXL', price_modifier: 10}
    ],
    tags: ["summer", "casual", "breezy", "everyday", "comfortable"],
    createdAt: "2025-01-14"
  },
  {
    id: 203,
    name: "Professional Work Dress",
    category: "ladies",
    subcategory: "Dresses",
    description: "Sophisticated work dress for the modern woman",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.6,
    reviewCount: 445,
    inStock: true,
    stockCount: 30,
    brand: "WorkChic",
    gender: "women",
    arEnabled: true,
    walmartPlus: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1547904979-d52230e7b525?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1547904979-d52230e7b525?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566479179817-c0b4e8e1dee9?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Black', hex: '#000000', price_modifier: 0},
      {name: 'Navy', hex: '#000080', price_modifier: 5},
      {name: 'Gray', hex: '#808080', price_modifier: 0},
      {name: 'Charcoal', hex: '#36454F', price_modifier: 10}
    ],
    sizes: [
      {size: 'XS', price_modifier: 0},
      {size: 'S', price_modifier: 0},
      {size: 'M', price_modifier: 0},
      {size: 'L', price_modifier: 5},
      {size: 'XL', price_modifier: 10}
    ],
    tags: ["work", "professional", "sophisticated", "business", "office"],
    createdAt: "2025-01-11"
  },
  {
    id: 204,
    name: "Bohemian Maxi Dress",
    category: "ladies",
    subcategory: "Dresses",
    description: "Flowing bohemian maxi dress with beautiful patterns",
    price: 69.99,
    originalPrice: 94.99,
    rating: 4.4,
    reviewCount: 378,
    inStock: true,
    stockCount: 35,
    brand: "BohoChic",
    gender: "women",
    arEnabled: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
    colors: ["Turquoise", "Coral", "Multi-print", "Earth Tones"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["bohemian", "maxi", "flowing", "patterns", "boho"],
    createdAt: "2025-01-09"
  },
  {
    id: 205,
    name: "Floral Print Sundress",
    category: "ladies",
    subcategory: "Dresses",
    description: "Beautiful floral print sundress perfect for spring",
    price: 49.99,
    originalPrice: 79.99,
    discount: 38,
    rating: 4.7,
    reviewCount: 689,
    inStock: true,
    stockCount: 45,
    brand: "FloralFashion",
    gender: "women",
    arEnabled: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Pink Floral', hex: '#FFB6C1', price_modifier: 0},
      {name: 'Blue Floral', hex: '#87CEEB', price_modifier: 5},
      {name: 'Yellow Floral', hex: '#FFFF99', price_modifier: 0},
      {name: 'White Floral', hex: '#F8F8FF', price_modifier: 0}
    ],
    sizes: [
      {size: 'XS', price_modifier: 0},
      {size: 'S', price_modifier: 0},
      {size: 'M', price_modifier: 0},
      {size: 'L', price_modifier: 5},
      {size: 'XL', price_modifier: 10}
    ],
    tags: ["floral", "sundress", "spring", "casual"],
    createdAt: "2025-01-09"
  },
  {
    id: 206,
    name: "Little Black Dress",
    category: "ladies",
    subcategory: "Dresses",
    description: "Classic little black dress for any occasion",
    price: 79.99,
    originalPrice: 119.99,
    discount: 33,
    rating: 4.9,
    reviewCount: 1234,
    inStock: true,
    stockCount: 35,
    brand: "ClassicStyle",
    gender: "women",
    arEnabled: true,
    walmartPlus: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1566479179817-c0b4e8e1dee9?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1566479179817-c0b4e8e1dee9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1547904979-d52230e7b525?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Classic Black', hex: '#000000', price_modifier: 0},
      {name: 'Deep Navy', hex: '#1a1a2e', price_modifier: 5}
    ],
    sizes: [
      {size: 'XS', price_modifier: 0},
      {size: 'S', price_modifier: 0},
      {size: 'M', price_modifier: 0},
      {size: 'L', price_modifier: 5},
      {size: 'XL', price_modifier: 10},
      {size: 'XXL', price_modifier: 15}
    ],
    tags: ["little black dress", "classic", "versatile", "occasion"],
    createdAt: "2025-01-05"
  },
  {
    id: 207,
    name: "Romantic Lace Dress",
    category: "ladies",
    subcategory: "Dresses",
    description: "Romantic lace dress for special moments",
    price: 94.99,
    originalPrice: 149.99,
    discount: 37,
    rating: 4.8,
    reviewCount: 456,
    inStock: true,
    stockCount: 25,
    brand: "RomanceWear",
    gender: "women",
    arEnabled: true,
    walmartPlus: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Ivory', hex: '#FFFFF0', price_modifier: 0},
      {name: 'Blush Pink', hex: '#FFB6C1', price_modifier: 10},
      {name: 'Champagne', hex: '#F7E7CE', price_modifier: 15},
      {name: 'Dusty Rose', hex: '#DCAE96', price_modifier: 20}
    ],
    sizes: [
      {size: 'XS', price_modifier: 0},
      {size: 'S', price_modifier: 0},
      {size: 'M', price_modifier: 0},
      {size: 'L', price_modifier: 10},
      {size: 'XL', price_modifier: 20}
    ],
    tags: ["lace", "romantic", "special", "elegant"],
    createdAt: "2025-01-03"
  },
  {
    id: 208,
    name: "Ethnic Traditional Dress",
    category: "ladies",
    subcategory: "Ethnic Wear",
    description: "Beautiful traditional ethnic dress with intricate embroidery",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.6,
    reviewCount: 456,
    inStock: true,
    stockCount: 25,
    brand: "TraditionCraft",
    gender: "women",
    arEnabled: true,
    walmartPlus: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
    colors: ["Royal Blue", "Maroon", "Green", "Purple"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["ethnic", "traditional", "embroidery", "cultural", "festive"],
    createdAt: "2024-12-30"
  },

  // LADIES TOPS AND BLOUSES
  {
    id: 209,
    name: "Silk Blouse",
    category: "ladies",
    subcategory: "Tops",
    description: "Luxurious silk blouse perfect for office and evening",
    price: 79.99,
    originalPrice: 109.99,
    rating: 4.5,
    reviewCount: 334,
    inStock: true,
    stockCount: 35,
    brand: "SilkElegance",
    gender: "women",
    arEnabled: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
    colors: ["Cream", "Black", "Navy", "Blush"],
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["silk", "blouse", "luxury", "office", "evening"],
    createdAt: "2025-01-13"
  },
  {
    id: 210,
    name: "Casual Cotton T-Shirt",
    category: "ladies",
    subcategory: "Tops",
    description: "Comfortable cotton t-shirt for everyday wear",
    price: 19.99,
    originalPrice: 29.99,
    rating: 4.2,
    reviewCount: 1567,
    inStock: true,
    stockCount: 80,
    brand: "ComfortWear",
    gender: "women",
    arEnabled: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
    colors: ["White", "Black", "Pink", "Blue", "Gray"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tags: ["cotton", "t-shirt", "casual", "comfortable", "everyday"],
    createdAt: "2025-01-06"
  },

  // More categories for comprehensive search
  // ELECTRONICS
  {
    id: 301,
    name: "Gaming Laptop",
    category: "electronics",
    subcategory: "Laptops",
    description: "High-performance gaming laptop with RTX graphics",
    price: 1299.99,
    originalPrice: 1599.99,
    discount: 19,
    rating: 4.7,
    reviewCount: 445,
    inStock: true,
    stockCount: 12,
    brand: "GamePro",
    gender: "unisex",
    arEnabled: true,
    walmartPlus: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop",
    colors: ["Black", "Red accents"],
    sizes: ["15 inch", "17 inch"],
    tags: ["gaming", "laptop", "high-performance", "RTX", "graphics"],
    createdAt: "2025-01-18"
  },
  {
    id: 302,
    name: "Smartphone Pro",
    category: "electronics",
    subcategory: "Smartphones",
    description: "Latest smartphone with advanced camera and 5G",
    price: 899.99,
    originalPrice: 1099.99,
    rating: 4.6,
    reviewCount: 2234,
    inStock: true,
    stockCount: 30,
    brand: "TechMaster",
    gender: "unisex",
    arEnabled: true,
    walmartPlus: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    colors: ["Space Gray", "Gold", "Silver", "Blue"],
    sizes: ["128GB", "256GB", "512GB"],
    tags: ["smartphone", "5G", "camera", "advanced", "mobile"],
    createdAt: "2025-01-17"
  },

  // HOME DECOR
  {
    id: 401,
    name: "Modern Table Lamp",
    category: "home",
    subcategory: "Lighting",
    description: "Stylish modern table lamp with adjustable brightness",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.4,
    reviewCount: 223,
    inStock: true,
    stockCount: 25,
    brand: "ModernHome",
    gender: "unisex",
    arEnabled: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    colors: ["White", "Black", "Brass", "Chrome"],
    sizes: ["Small", "Medium", "Large"],
    tags: ["lamp", "lighting", "modern", "adjustable", "home decor"],
    createdAt: "2025-01-15"
  },

  // BEAUTY PRODUCTS
  {
    id: 501,
    name: "Skincare Set",
    category: "beauty",
    subcategory: "Skincare",
    description: "Complete skincare routine set for glowing skin",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviewCount: 1456,
    inStock: true,
    stockCount: 40,
    brand: "GlowSkin",
    gender: "women",
    arEnabled: true,
    walmartPlus: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    colors: ["Natural"],
    sizes: ["Full Size", "Travel Size"],
    tags: ["skincare", "routine", "glowing", "beauty", "complete"],
    createdAt: "2025-01-19"
  },
  {
    id: 502,
    name: "Makeup Palette",
    category: "beauty",
    subcategory: "Makeup",
    description: "Professional makeup palette with 20 shades",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.5,
    reviewCount: 789,
    inStock: true,
    stockCount: 50,
    brand: "ColorPro",
    gender: "women",
    arEnabled: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    colors: ["Warm Tones", "Cool Tones", "Neutral"],
    sizes: ["Compact", "Full Size"],
    tags: ["makeup", "palette", "professional", "eyeshadow", "colors"],
    createdAt: "2025-01-20"
  },

  // ADDITIONAL FASHION PRODUCTS
  {
    id: 301,
    name: "Designer Jeans - Slim Fit",
    category: "clothing",
    subcategory: "Women's Clothing",
    description: "Premium denim jeans with perfect fit and comfort",
    price: 79.99,
    originalPrice: 119.99,
    discount: 33,
    rating: 4.7,
    reviewCount: 1234,
    inStock: true,
    stockCount: 60,
    brand: "DenimLux",
    gender: "women",
    arEnabled: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Dark Blue', hex: '#1e3a8a', price_modifier: 0},
      {name: 'Light Blue', hex: '#60a5fa', price_modifier: 5},
      {name: 'Black', hex: '#1f2937', price_modifier: 10},
      {name: 'White', hex: '#f9fafb', price_modifier: 15}
    ],
    sizes: [
      {size: '26', price_modifier: 0},
      {size: '28', price_modifier: 0},
      {size: '30', price_modifier: 0},
      {size: '32', price_modifier: 0},
      {size: '34', price_modifier: 5}
    ],
    tags: ["jeans", "denim", "slim fit", "designer", "women"],
    createdAt: "2025-01-22"
  },
  {
    id: 302,
    name: "Casual Cotton T-Shirt",
    category: "clothing",
    subcategory: "Women's Clothing",
    description: "Super soft cotton t-shirt perfect for everyday wear",
    price: 19.99,
    originalPrice: 29.99,
    rating: 4.4,
    reviewCount: 2567,
    inStock: true,
    stockCount: 150,
    brand: "ComfortCotton",
    gender: "women",
    arEnabled: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'White', hex: '#ffffff', price_modifier: 0},
      {name: 'Pink', hex: '#f472b6', price_modifier: 0},
      {name: 'Lavender', hex: '#a78bfa', price_modifier: 2},
      {name: 'Mint Green', hex: '#6ee7b7', price_modifier: 2},
      {name: 'Coral', hex: '#fb7185', price_modifier: 3}
    ],
    sizes: [
      {size: 'XS', price_modifier: 0},
      {size: 'S', price_modifier: 0},
      {size: 'M', price_modifier: 0},
      {size: 'L', price_modifier: 0},
      {size: 'XL', price_modifier: 2}
    ],
    tags: ["t-shirt", "cotton", "casual", "everyday", "soft"],
    createdAt: "2025-01-23"
  },
  {
    id: 303,
    name: "Stylish Handbag",
    category: "bags",
    subcategory: "Handbags",
    description: "Elegant leather handbag with multiple compartments",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.6,
    reviewCount: 456,
    inStock: true,
    stockCount: 35,
    brand: "LuxBags",
    gender: "women",
    arEnabled: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Black', hex: '#1f2937', price_modifier: 0},
      {name: 'Brown', hex: '#92400e', price_modifier: 5},
      {name: 'Beige', hex: '#d6d3d1', price_modifier: 8},
      {name: 'Red', hex: '#dc2626', price_modifier: 10}
    ],
    sizes: [
      {size: 'Small', price_modifier: -10},
      {size: 'Medium', price_modifier: 0},
      {size: 'Large', price_modifier: 15}
    ],
    tags: ["handbag", "leather", "elegant", "compartments", "stylish"],
    createdAt: "2025-01-24"
  },
  {
    id: 304,
    name: "Premium Kitchen Set",
    category: "home",
    subcategory: "Kitchen",
    description: "Complete kitchen cookware set with non-stick coating",
    price: 199.99,
    originalPrice: 299.99,
    rating: 4.8,
    reviewCount: 789,
    inStock: true,
    stockCount: 25,
    brand: "ChefMaster",
    gender: "unisex",
    arEnabled: false,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Stainless Steel', hex: '#71717a', price_modifier: 0},
      {name: 'Black', hex: '#1f2937', price_modifier: 20},
      {name: 'Copper', hex: '#ea580c', price_modifier: 30}
    ],
    sizes: [
      {size: '8-Piece Set', price_modifier: 0},
      {size: '12-Piece Set', price_modifier: 50},
      {size: '16-Piece Set', price_modifier: 100}
    ],
    tags: ["kitchen", "cookware", "non-stick", "complete set", "chef"],
    createdAt: "2025-01-25"
  },
  {
    id: 305,
    name: "Compact Umbrella",
    category: "accessories",
    subcategory: "Weather Protection",
    description: "Windproof compact umbrella with auto open/close",
    price: 24.99,
    originalPrice: 39.99,
    rating: 4.3,
    reviewCount: 1123,
    inStock: true,
    stockCount: 80,
    brand: "WeatherShield",
    gender: "unisex",
    arEnabled: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1455717974081-0436a066bb96?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1455717974081-0436a066bb96?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1478112013511-6e5be8c9a466?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Black', hex: '#1f2937', price_modifier: 0},
      {name: 'Navy Blue', hex: '#1e3a8a', price_modifier: 2},
      {name: 'Red', hex: '#dc2626', price_modifier: 3},
      {name: 'Pink', hex: '#ec4899', price_modifier: 5}
    ],
    sizes: [
      {size: 'Compact', price_modifier: 0},
      {size: 'Large', price_modifier: 10}
    ],
    tags: ["umbrella", "compact", "windproof", "auto", "weather"],
    createdAt: "2025-01-26"
  },
  {
    id: 306,
    name: "Athletic Running Shoes",
    category: "sports",
    subcategory: "Athletic Wear",
    description: "High-performance running shoes with advanced cushioning",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviewCount: 2345,
    inStock: true,
    stockCount: 45,
    brand: "SportMax",
    gender: "unisex",
    arEnabled: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'White/Blue', hex: '#3b82f6', price_modifier: 0},
      {name: 'Black/Red', hex: '#dc2626', price_modifier: 10},
      {name: 'Gray/Pink', hex: '#ec4899', price_modifier: 15},
      {name: 'All Black', hex: '#1f2937', price_modifier: 5}
    ],
    sizes: [
      {size: '6', price_modifier: 0},
      {size: '7', price_modifier: 0},
      {size: '8', price_modifier: 0},
      {size: '9', price_modifier: 0},
      {size: '10', price_modifier: 0},
      {size: '11', price_modifier: 5},
      {size: '12', price_modifier: 10}
    ],
    tags: ["running", "athletic", "performance", "cushioning", "sports"],
    createdAt: "2025-01-27"
  },
  {
    id: 307,
    name: "Yoga Mat Premium",
    category: "sports",
    subcategory: "Exercise Equipment",
    description: "Extra thick yoga mat with non-slip surface and carrying strap",
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.5,
    reviewCount: 567,
    inStock: true,
    stockCount: 70,
    brand: "ZenFit",
    gender: "unisex",
    arEnabled: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Purple', hex: '#8b5cf6', price_modifier: 0},
      {name: 'Pink', hex: '#ec4899', price_modifier: 2},
      {name: 'Blue', hex: '#3b82f6', price_modifier: 2},
      {name: 'Green', hex: '#10b981', price_modifier: 3},
      {name: 'Black', hex: '#1f2937', price_modifier: 0}
    ],
    sizes: [
      {size: 'Standard', price_modifier: 0},
      {size: 'Extra Long', price_modifier: 15},
      {size: 'Travel Size', price_modifier: -10}
    ],
    tags: ["yoga", "mat", "exercise", "non-slip", "premium"],
    createdAt: "2025-01-28"
  },
  {
    id: 308,
    name: "Smartphone Case",
    category: "electronics",
    subcategory: "Accessories",
    description: "Protective smartphone case with wireless charging support",
    price: 29.99,
    originalPrice: 49.99,
    rating: 4.4,
    reviewCount: 1789,
    inStock: true,
    stockCount: 120,
    brand: "ProtectMax",
    gender: "unisex",
    arEnabled: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1601972602288-f79d9b15982b?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1601972602288-f79d9b15982b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Clear', hex: '#f9fafb', price_modifier: 0},
      {name: 'Black', hex: '#1f2937', price_modifier: 0},
      {name: 'Blue', hex: '#3b82f6', price_modifier: 5},
      {name: 'Pink', hex: '#ec4899', price_modifier: 5},
      {name: 'Gold', hex: '#f59e0b', price_modifier: 10}
    ],
    sizes: [
      {size: 'iPhone 13/14', price_modifier: 0},
      {size: 'iPhone 15', price_modifier: 5},
      {size: 'Samsung Galaxy', price_modifier: 0}
    ],
    tags: ["smartphone", "case", "protective", "wireless charging", "durable"],
    createdAt: "2025-01-29"
  },

  // Additional Beautiful Bag Products
  {
    id: 104,
    name: "Designer Crossbody Bag",
    category: "bags",
    subcategory: "Crossbody Bags",
    description: "Elegant crossbody bag perfect for daily use",
    price: 89.99,
    originalPrice: 129.99,
    discount: 31,
    rating: 4.6,
    reviewCount: 567,
    inStock: true,
    stockCount: 40,
    brand: "StyleCraft",
    gender: "women",
    arEnabled: true,
    walmartPlus: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Camel', hex: '#C19A6B', price_modifier: 0},
      {name: 'Black', hex: '#000000', price_modifier: 5},
      {name: 'Burgundy', hex: '#800020', price_modifier: 10},
      {name: 'Navy', hex: '#000080', price_modifier: 0}
    ],
    sizes: [
      {size: 'Small', price_modifier: 0},
      {size: 'Medium', price_modifier: 15}
    ],
    tags: ["crossbody", "designer", "daily", "elegant"],
    createdAt: "2025-01-12"
  },
  {
    id: 105,
    name: "Trendy Tote Bag",
    category: "bags",
    subcategory: "Handbags",
    description: "Spacious tote bag for work and shopping",
    price: 59.99,
    originalPrice: 89.99,
    discount: 33,
    rating: 4.4,
    reviewCount: 432,
    inStock: true,
    stockCount: 60,
    brand: "UrbanStyle",
    gender: "women",
    arEnabled: true,
    freeShipping: true,
    image_url: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Beige', hex: '#F5F5DC', price_modifier: 0},
      {name: 'Rose', hex: '#FF69B4', price_modifier: 5},
      {name: 'Olive', hex: '#808000', price_modifier: 10}
    ],
    sizes: [
      {size: 'Large', price_modifier: 0},
      {size: 'Extra Large', price_modifier: 20}
    ],
    tags: ["tote", "work", "shopping", "spacious"],
    createdAt: "2025-01-08"
  },
  
  // Additional Beauty Products
  {
    id: 90,
    name: "Professional Makeup Palette",
    category: "beauty",
    subcategory: "Makeup",
    description: "Complete makeup palette with eyeshadows, blush, and highlighter",
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: 4.8,
    reviewCount: 567,
    inStock: true,
    stockCount: 34,
    brand: "BeautyPro",
    arEnabled: true,
    image_url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Warm Tones', hex: '#D2691E', price_modifier: 0},
      {name: 'Cool Tones', hex: '#4169E1', price_modifier: 5},
      {name: 'Neutral Tones', hex: '#A0522D', price_modifier: 0}
    ],
    tags: ["makeup", "eyeshadow", "professional", "beauty"],
    features: ["Highly Pigmented", "Long-lasting", "Blendable", "Cruelty-free"]
  },
  {
    id: 91,
    name: "Luxury Lipstick Collection",
    category: "beauty",
    subcategory: "Makeup",
    description: "Premium matte lipstick collection in 5 stunning shades",
    price: 75.99,
    originalPrice: 99.99,
    discount: 24,
    rating: 4.7,
    reviewCount: 432,
    inStock: true,
    stockCount: 28,
    brand: "LuxeLips",
    arEnabled: true,
    image_url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Classic Red', hex: '#DC143C', price_modifier: 0},
      {name: 'Rose Pink', hex: '#FF69B4', price_modifier: 0},
      {name: 'Berry', hex: '#8B0000', price_modifier: 0},
      {name: 'Nude', hex: '#D2B48C', price_modifier: 0},
      {name: 'Coral', hex: '#FF7F50', price_modifier: 0}
    ],
    tags: ["lipstick", "makeup", "matte", "luxury"],
    features: ["Long-lasting", "Matte finish", "Hydrating", "Cruelty-free"]
  },
  {
    id: 92,
    name: "Foundation & Concealer Set",
    category: "beauty",
    subcategory: "Makeup",
    description: "Full coverage foundation with matching concealer for flawless skin",
    price: 65.99,
    originalPrice: 85.99,
    discount: 23,
    rating: 4.6,
    reviewCount: 789,
    inStock: true,
    stockCount: 45,
    brand: "FlawlessBase",
    arEnabled: true,
    image_url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Fair', hex: '#F5E6D3', price_modifier: 0},
      {name: 'Light', hex: '#E7C9A9', price_modifier: 0},
      {name: 'Medium', hex: '#C8A882', price_modifier: 0},
      {name: 'Tan', hex: '#A67C5A', price_modifier: 0},
      {name: 'Deep', hex: '#8B4513', price_modifier: 0}
    ],
    tags: ["foundation", "concealer", "makeup", "coverage"],
    features: ["Full Coverage", "Long-wearing", "Buildable", "All Skin Types"]
  },
  
  // Additional Makeup Products - Nykaa Style
  {
    id: 503,
    name: "Nykaa Style Liquid Eyeliner",
    category: "beauty",
    subcategory: "Makeup",
    description: "Waterproof liquid eyeliner with precision tip for perfect winged liner",
    price: 24.99,
    originalPrice: 34.99,
    discount: 29,
    rating: 4.8,
    reviewCount: 1567,
    inStock: true,
    stockCount: 85,
    brand: "PrecisionLiner",
    arEnabled: true,
    image_url: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Jet Black', hex: '#000000', price_modifier: 0},
      {name: 'Brown', hex: '#8B4513', price_modifier: 0},
      {name: 'Blue', hex: '#000080', price_modifier: 5}
    ],
    tags: ["eyeliner", "liquid", "waterproof", "makeup", "precision"],
    features: ["Waterproof", "Smudge-proof", "Quick-dry", "Easy Application"]
  },
  {
    id: 504,
    name: "Glossy Lip Gloss Collection",
    category: "beauty",
    subcategory: "Makeup",
    description: "High-shine lip gloss set with 6 beautiful shades for lustrous lips",
    price: 39.99,
    originalPrice: 59.99,
    discount: 33,
    rating: 4.7,
    reviewCount: 892,
    inStock: true,
    stockCount: 65,
    brand: "GlossyLips",
    arEnabled: true,
    image_url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Clear Gloss', hex: '#FFFFFF', price_modifier: 0},
      {name: 'Pink Shimmer', hex: '#FFB6C1', price_modifier: 0},
      {name: 'Peach Glow', hex: '#FFCBA4', price_modifier: 0},
      {name: 'Berry Shine', hex: '#DC143C', price_modifier: 0},
      {name: 'Nude Glam', hex: '#D2B48C', price_modifier: 0},
      {name: 'Red Velvet', hex: '#8B0000', price_modifier: 0}
    ],
    tags: ["lip gloss", "shine", "makeup", "glossy", "collection"],
    features: ["High Shine", "Non-sticky", "Moisturizing", "Long-lasting"]
  },
  {
    id: 505,
    name: "Highlighter & Contour Kit",
    category: "beauty",
    subcategory: "Makeup",
    description: "Professional highlighter and contour palette for sculpted makeup looks",
    price: 55.99,
    originalPrice: 79.99,
    discount: 30,
    rating: 4.9,
    reviewCount: 1203,
    inStock: true,
    stockCount: 42,
    brand: "SculptPro",
    arEnabled: true,
    image_url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Golden Glow', hex: '#FFD700', price_modifier: 0},
      {name: 'Rose Gold', hex: '#E6B800', price_modifier: 0},
      {name: 'Champagne', hex: '#F7E7CE', price_modifier: 0},
      {name: 'Bronze', hex: '#CD7F32', price_modifier: 0}
    ],
    tags: ["highlighter", "contour", "makeup", "sculpting", "glow"],
    features: ["Highly Pigmented", "Blendable", "Professional", "Multi-use"]
  },
  {
    id: 506,
    name: "Mascara & Brow Set",
    category: "beauty",
    subcategory: "Makeup",
    description: "Volumizing mascara with matching eyebrow gel for defined eyes and brows",
    price: 32.99,
    originalPrice: 44.99,
    discount: 27,
    rating: 4.6,
    reviewCount: 734,
    inStock: true,
    stockCount: 78,
    brand: "EyeDefine",
    arEnabled: true,
    image_url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Black', hex: '#000000', price_modifier: 0},
      {name: 'Brown', hex: '#8B4513', price_modifier: 0},
      {name: 'Dark Brown', hex: '#654321', price_modifier: 0}
    ],
    tags: ["mascara", "eyebrow", "makeup", "volume", "define"],
    features: ["Volumizing", "Lengthening", "Waterproof", "Natural Look"]
  },
  {
    id: 507,
    name: "Blush & Bronzer Duo",
    category: "beauty",
    subcategory: "Makeup",
    description: "Perfect blush and bronzer combination for a natural, sun-kissed glow",
    price: 42.99,
    originalPrice: 59.99,
    discount: 28,
    rating: 4.8,
    reviewCount: 956,
    inStock: true,
    stockCount: 53,
    brand: "SunKissed",
    arEnabled: true,
    image_url: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Peachy Pink', hex: '#FFCBA4', price_modifier: 0},
      {name: 'Rosy Coral', hex: '#FF7F7F', price_modifier: 0},
      {name: 'Berry Bloom', hex: '#DC143C', price_modifier: 0},
      {name: 'Warm Bronze', hex: '#CD7F32', price_modifier: 0}
    ],
    tags: ["blush", "bronzer", "makeup", "glow", "natural"],
    features: ["Natural Glow", "Long-lasting", "Buildable Color", "All Skin Tones"]
  },
  
  // Dress Products
  {
    id: 93,
    name: "Elegant Evening Dress",
    category: "clothing",
    subcategory: "Dresses",
    description: "Stunning evening dress perfect for special occasions",
    price: 129.99,
    originalPrice: 179.99,
    discount: 28,
    rating: 4.8,
    reviewCount: 234,
    inStock: true,
    stockCount: 18,
    brand: "ElegantWear",
    arEnabled: true,
    image_url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566174043893-378bdc996890?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Black', hex: '#000000', price_modifier: 0},
      {name: 'Navy Blue', hex: '#000080', price_modifier: 10},
      {name: 'Burgundy', hex: '#800020', price_modifier: 15},
      {name: 'Emerald', hex: '#50C878', price_modifier: 20}
    ],
    sizes: [
      {size: 'XS', price_modifier: 0},
      {size: 'S', price_modifier: 0},
      {size: 'M', price_modifier: 0},
      {size: 'L', price_modifier: 0},
      {size: 'XL', price_modifier: 10}
    ],
    tags: ["dress", "evening", "elegant", "formal"],
    features: ["Elegant Design", "Premium Fabric", "Perfect Fit", "Occasion Wear"]
  },
  {
    id: 94,
    name: "Summer Floral Dress",
    category: "clothing",
    subcategory: "Dresses",
    description: "Light and breezy floral dress perfect for summer days",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    rating: 4.5,
    reviewCount: 456,
    inStock: true,
    stockCount: 32,
    brand: "SummerVibes",
    arEnabled: true,
    image_url: "https://images.unsplash.com/photo-1566174043893-378bdc996890?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1566174043893-378bdc996890?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Floral Pink', hex: '#FFB6C1', price_modifier: 0},
      {name: 'Floral Blue', hex: '#87CEEB', price_modifier: 0},
      {name: 'Floral Yellow', hex: '#FFFFE0', price_modifier: 0},
      {name: 'Floral White', hex: '#FFFFFF', price_modifier: 0}
    ],
    sizes: [
      {size: 'XS', price_modifier: 0},
      {size: 'S', price_modifier: 0},
      {size: 'M', price_modifier: 0},
      {size: 'L', price_modifier: 0},
      {size: 'XL', price_modifier: 5}
    ],
    tags: ["dress", "summer", "floral", "casual"],
    features: ["Lightweight", "Breathable", "Comfortable", "Summer Perfect"]
  },
  {
    id: 95,
    name: "Business Casual Dress",
    category: "clothing",
    subcategory: "Dresses",
    description: "Professional dress perfect for office and business meetings",
    price: 99.99,
    originalPrice: 129.99,
    discount: 23,
    rating: 4.7,
    reviewCount: 321,
    inStock: true,
    stockCount: 24,
    brand: "OfficePro",
    arEnabled: true,
    image_url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566174043893-378bdc996890?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Navy', hex: '#000080', price_modifier: 0},
      {name: 'Black', hex: '#000000', price_modifier: 0},
      {name: 'Charcoal', hex: '#36454F', price_modifier: 5},
      {name: 'Wine', hex: '#722F37', price_modifier: 10}
    ],
    sizes: [
      {size: 'XS', price_modifier: 0},
      {size: 'S', price_modifier: 0},
      {size: 'M', price_modifier: 0},
      {size: 'L', price_modifier: 0},
      {size: 'XL', price_modifier: 8}
    ],
    tags: ["dress", "business", "professional", "office"],
    features: ["Professional Look", "Comfortable Fit", "Wrinkle Resistant", "All Day Wear"]
  },
  
  // Enhanced Bag Products  
  {
    id: 96,
    name: "Luxury Designer Handbag",
    category: "bags",
    subcategory: "Handbags",
    description: "Premium leather handbag with elegant design and spacious interior",
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    rating: 4.9,
    reviewCount: 178,
    inStock: true,
    stockCount: 12,
    brand: "LuxeBags",
    arEnabled: true,
    image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Black Leather', hex: '#000000', price_modifier: 0},
      {name: 'Brown Leather', hex: '#8B4513', price_modifier: 10},
      {name: 'Tan Leather', hex: '#D2691E', price_modifier: 15},
      {name: 'Red Leather', hex: '#DC143C', price_modifier: 20}
    ],
    sizes: [
      {size: 'Medium', price_modifier: 0},
      {size: 'Large', price_modifier: 30}
    ],
    tags: ["handbag", "luxury", "leather", "designer"],
    features: ["Genuine Leather", "Multiple Compartments", "Adjustable Strap", "Premium Quality"]
  },
  {
    id: 97,
    name: "Stylish Backpack",
    category: "bags",
    subcategory: "Backpacks", 
    description: "Modern backpack perfect for work, travel, and daily use",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    rating: 4.6,
    reviewCount: 543,
    inStock: true,
    stockCount: 45,
    brand: "UrbanCarry",
    arEnabled: true,
    image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Black', hex: '#000000', price_modifier: 0},
      {name: 'Navy Blue', hex: '#000080', price_modifier: 0},
      {name: 'Gray', hex: '#808080', price_modifier: 0},
      {name: 'Brown', hex: '#8B4513', price_modifier: 5}
    ],
    sizes: [
      {size: 'Medium', price_modifier: 0},
      {size: 'Large', price_modifier: 20}
    ],
    tags: ["backpack", "travel", "work", "modern"],
    features: ["Laptop Compartment", "Water Resistant", "Ergonomic Design", "Multiple Pockets"]
  },
  {
    id: 98,
    name: "Crossbody Shoulder Bag",
    category: "bags",
    subcategory: "Crossbody Bags",
    description: "Trendy crossbody bag perfect for hands-free convenience and style",
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    rating: 4.4,
    reviewCount: 432,
    inStock: true,
    stockCount: 38,
    brand: "TrendyCarry",
    arEnabled: true,
    image_url: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop"
    ],
    colors: [
      {name: 'Pink', hex: '#FFB6C1', price_modifier: 0},
      {name: 'Black', hex: '#000000', price_modifier: 0},
      {name: 'Beige', hex: '#F5F5DC', price_modifier: 0},
      {name: 'White', hex: '#FFFFFF', price_modifier: 5}
    ],
    sizes: [
      {size: 'Small', price_modifier: 0},
      {size: 'Medium', price_modifier: 15}
    ],
    tags: ["crossbody", "trendy", "convenient", "stylish"],
    features: ["Adjustable Strap", "Compact Design", "Secure Closure", "Versatile Style"]
  }
];

export default productDatabase;
