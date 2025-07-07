import sqlite3
import json

# Enhanced product data with images, colors, and sizes
enhanced_products = [
    # DRESSES/FROCKS
    {
        "name": "Elegant Summer Frock",
        "category": "dress",
        "price": 89.99,
        "description": "Beautiful flowy summer dress perfect for any occasion",
        "emoji": "👗",
        "brand": "FashionPro",
        "rating": 4.8,
        "is_trending": True,
        "stock_quantity": 45,
        "ar_enabled": True,
        "tags": "dress,summer,elegant,casual",
        "mood_category": "happy",
        "images": [
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
            "https://images.unsplash.com/photo-1606648916853-c8c0e5a6ad3e?w=400"
        ],
        "colors": [
            {"name": "Sky Blue", "hex": "#87CEEB", "image": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400"},
            {"name": "Rose Pink", "hex": "#FF69B4", "image": "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400"},
            {"name": "Lavender", "hex": "#E6E6FA", "image": "https://images.unsplash.com/photo-1606648916853-c8c0e5a6ad3e?w=400"},
            {"name": "Mint Green", "hex": "#98FB98", "image": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400"},
            {"name": "Coral", "hex": "#FF7F50", "image": "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400"}
        ],
        "sizes": [
            {"name": "Small", "measurements": "Bust: 32-34in", "price_modifier": 0},
            {"name": "Medium", "measurements": "Bust: 36-38in", "price_modifier": 0},
            {"name": "Large", "measurements": "Bust: 40-42in", "price_modifier": 5},
            {"name": "XL", "measurements": "Bust: 44-46in", "price_modifier": 10}
        ]
    },
    
    # PANTS/JEANS
    {
        "name": "Premium Denim Jeans",
        "category": "pants",
        "price": 79.99,
        "description": "High-quality denim jeans with perfect fit",
        "emoji": "👖",
        "brand": "DenimPro",
        "rating": 4.7,
        "is_trending": True,
        "stock_quantity": 60,
        "ar_enabled": True,
        "tags": "jeans,denim,casual,pants",
        "mood_category": "natural",
        "images": [
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
            "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=400",
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400"
        ],
        "colors": [
            {"name": "Classic Blue", "hex": "#1E3A8A", "image": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400"},
            {"name": "Dark Wash", "hex": "#1F2937", "image": "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=400"},
            {"name": "Light Blue", "hex": "#60A5FA", "image": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400"},
            {"name": "Black", "hex": "#000000", "image": "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=400"},
            {"name": "Stone Wash", "hex": "#6B7280", "image": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400"}
        ],
        "sizes": [
            {"name": "28", "measurements": "Waist: 28in", "price_modifier": 0},
            {"name": "30", "measurements": "Waist: 30in", "price_modifier": 0},
            {"name": "32", "measurements": "Waist: 32in", "price_modifier": 0},
            {"name": "34", "measurements": "Waist: 34in", "price_modifier": 0},
            {"name": "36", "measurements": "Waist: 36in", "price_modifier": 5}
        ]
    },
    
    # BAGS
    {
        "name": "Designer Leather Handbag",
        "category": "bag",
        "price": 149.99,
        "description": "Luxurious leather handbag with elegant design",
        "emoji": "👜",
        "brand": "LuxeBags",
        "rating": 4.9,
        "is_trending": True,
        "stock_quantity": 35,
        "ar_enabled": True,
        "tags": "handbag,leather,luxury,accessories",
        "mood_category": "professional",
        "images": [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400"
        ],
        "colors": [
            {"name": "Classic Black", "hex": "#000000", "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"},
            {"name": "Rich Brown", "hex": "#8B4513", "image": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400"},
            {"name": "Burgundy", "hex": "#800020", "image": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400"},
            {"name": "Cream", "hex": "#F5F5DC", "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"},
            {"name": "Navy Blue", "hex": "#000080", "image": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400"}
        ],
        "sizes": [
            {"name": "Small", "measurements": "10x8x4 inches", "price_modifier": -20},
            {"name": "Medium", "measurements": "12x10x5 inches", "price_modifier": 0},
            {"name": "Large", "measurements": "14x12x6 inches", "price_modifier": 25}
        ]
    },
    
    # SUNGLASSES
    {
        "name": "Designer Sunglasses Collection",
        "category": "sunglasses",
        "price": 199.99,
        "description": "Premium designer sunglasses with UV protection",
        "emoji": "🕶️",
        "brand": "SunStyle",
        "rating": 4.8,
        "is_trending": True,
        "stock_quantity": 50,
        "ar_enabled": True,
        "tags": "sunglasses,designer,UV protection,accessories",
        "mood_category": "happy",
        "images": [
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400",
            "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400"
        ],
        "colors": [
            {"name": "Classic Black", "hex": "#000000", "image": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400"},
            {"name": "Tortoise Shell", "hex": "#8B4513", "image": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400"},
            {"name": "Gold Frame", "hex": "#FFD700", "image": "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400"},
            {"name": "Silver", "hex": "#C0C0C0", "image": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400"},
            {"name": "Rose Gold", "hex": "#E8B4B8", "image": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400"}
        ],
        "sizes": [
            {"name": "Small", "measurements": "Frame: 52mm", "price_modifier": 0},
            {"name": "Medium", "measurements": "Frame: 55mm", "price_modifier": 0},
            {"name": "Large", "measurements": "Frame: 58mm", "price_modifier": 10}
        ]
    },
    
    # UMBRELLA
    {
        "name": "Smart Weather Umbrella",
        "category": "umbrella",
        "price": 49.99,
        "description": "Advanced umbrella with wind resistance and compact design",
        "emoji": "☂️",
        "brand": "WeatherShield",
        "rating": 4.6,
        "is_trending": False,
        "stock_quantity": 40,
        "ar_enabled": True,
        "tags": "umbrella,weather,rain,protection",
        "mood_category": "rainy",
        "images": [
            "https://images.unsplash.com/photo-1455118013915-5040d0afe8c6?w=400",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"
        ],
        "colors": [
            {"name": "Classic Black", "hex": "#000000", "image": "https://images.unsplash.com/photo-1455118013915-5040d0afe8c6?w=400"},
            {"name": "Navy Blue", "hex": "#000080", "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"},
            {"name": "Bright Red", "hex": "#FF0000", "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"},
            {"name": "Forest Green", "hex": "#228B22", "image": "https://images.unsplash.com/photo-1455118013915-5040d0afe8c6?w=400"},
            {"name": "Purple", "hex": "#800080", "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"}
        ],
        "sizes": [
            {"name": "Compact", "measurements": "Diameter: 42in", "price_modifier": -10},
            {"name": "Standard", "measurements": "Diameter: 46in", "price_modifier": 0},
            {"name": "Large", "measurements": "Diameter: 50in", "price_modifier": 15}
        ]
    },
    
    # KITCHEN SET
    {
        "name": "Premium Kitchen Cookware Set",
        "category": "kitchen",
        "price": 299.99,
        "description": "Professional-grade non-stick cookware set with complete accessories",
        "emoji": "🍳",
        "brand": "ChefMaster",
        "rating": 4.9,
        "is_trending": True,
        "stock_quantity": 25,
        "ar_enabled": True,
        "tags": "kitchen,cookware,non-stick,professional",
        "mood_category": "natural",
        "images": [
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
            "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400"
        ],
        "colors": [
            {"name": "Stainless Steel", "hex": "#C0C0C0", "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400"},
            {"name": "Matte Black", "hex": "#28282B", "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400"},
            {"name": "Copper", "hex": "#B87333", "image": "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400"},
            {"name": "Blue Accent", "hex": "#4169E1", "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400"},
            {"name": "Red Accent", "hex": "#DC143C", "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400"}
        ],
        "sizes": [
            {"name": "Basic Set", "measurements": "8 pieces", "price_modifier": -50},
            {"name": "Complete Set", "measurements": "12 pieces", "price_modifier": 0},
            {"name": "Professional Set", "measurements": "16 pieces", "price_modifier": 100}
        ]
    }
]

def update_database_with_enhanced_products():
    """Update database with enhanced product data"""
    conn = sqlite3.connect('retailflow.db')
    cursor = conn.cursor()
    
    # Add new columns for enhanced features
    try:
        cursor.execute('ALTER TABLE products ADD COLUMN images TEXT')
        cursor.execute('ALTER TABLE products ADD COLUMN colors TEXT')
        cursor.execute('ALTER TABLE products ADD COLUMN sizes TEXT')
        print("✅ Added new columns for enhanced features")
    except:
        print("📝 Columns already exist, updating data...")
    
    # Insert enhanced products
    for product in enhanced_products:
        # Convert arrays to JSON strings
        images_json = json.dumps(product['images'])
        colors_json = json.dumps(product['colors'])
        sizes_json = json.dumps(product['sizes'])
        
        cursor.execute('''
            INSERT OR REPLACE INTO products 
            (name, category, price, description, emoji, image_url, brand, rating, is_trending, 
             stock_quantity, ar_enabled, tags, mood_category, images, colors, sizes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            product['name'],
            product['category'],
            product['price'],
            product['description'],
            product['emoji'],
            product['images'][0],  # First image as main image
            product['brand'],
            product['rating'],
            product['is_trending'],
            product['stock_quantity'],
            product['ar_enabled'],
            product['tags'],
            product['mood_category'],
            images_json,
            colors_json,
            sizes_json
        ))
    
    conn.commit()
    conn.close()
    print(f"✅ Added {len(enhanced_products)} enhanced products to database!")

if __name__ == "__main__":
    print("🚀 Updating RetailFlowAI with Enhanced Products...")
    print("=" * 60)
    update_database_with_enhanced_products()
    print("=" * 60)
    print("🎉 Database updated with:")
    print("   👗 Elegant Summer Frocks with 5 colors")
    print("   👖 Premium Denim Jeans with 5 colors") 
    print("   👜 Designer Leather Handbags with 5 colors")
    print("   🕶️ Designer Sunglasses with 5 colors")
    print("   ☂️ Smart Weather Umbrellas with 5 colors")
    print("   🍳 Premium Kitchen Sets with 5 colors")
    print("   📏 Multiple sizes for each product")
    print("   🖼️ Multiple high-quality images")
    print("   🥽 Enhanced AR capabilities")
    print("=" * 60)
