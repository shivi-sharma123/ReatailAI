#!/usr/bin/env python3
"""Setup database with attractive product images"""

import sqlite3
import json

def setup_database_with_images():
    """Initialize database and add products with attractive images"""
    
    # Connect to database
    conn = sqlite3.connect('retailflow.db')
    cursor = conn.cursor()
    
    # Create products table if it doesn't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            mood_category TEXT NOT NULL,
            price REAL DEFAULT 0.0,
            description TEXT,
            emoji TEXT,
            image_url TEXT,
            brand TEXT,
            rating REAL DEFAULT 0.0,
            tags TEXT,
            is_trending BOOLEAN DEFAULT 0,
            stock_quantity INTEGER DEFAULT 100,
            ar_model_url TEXT,
            ar_preview_url TEXT,
            multiple_images TEXT,
            size_chart TEXT,
            color_variants TEXT,
            ar_enabled BOOLEAN DEFAULT 0,
            three_d_model TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Clear existing products
    cursor.execute('DELETE FROM products')
    
    # Add products with attractive images
    products = [
        # Rainy weather products
        {
            "name": "Premium Waterproof Rain Jacket",
            "category": "Clothing",
            "mood_category": "rainy",
            "price": 129.99,
            "description": "Professional-grade waterproof jacket with sealed seams and breathable fabric.",
            "emoji": "☂️",
            "image_url": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "StormShield Pro",
            "rating": 4.9,
            "tags": "waterproof,rain,jacket,premium,outdoor",
            "is_trending": 1,
            "stock_quantity": 45,
            "ar_enabled": 1,
            "ar_model_url": "https://cdn.example.com/models/rain-jacket.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "multiple_images": json.dumps([
                "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]),
            "size_chart": json.dumps({"S": "36-38", "M": "40-42", "L": "44-46", "XL": "48-50"}),
            "color_variants": json.dumps(["Navy Blue", "Forest Green", "Charcoal Gray"]),
            "three_d_model": "premium_rain_jacket_3d.glb"
        },
        
        # Sunny weather products
        {
            "name": "Luxury Aviator Sunglasses",
            "category": "Accessories",
            "mood_category": "sunny",
            "price": 159.99,
            "description": "Premium aviator sunglasses with polarized lenses and 100% UV protection.",
            "emoji": "🕶️",
            "image_url": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "SunLux Premium",
            "rating": 4.9,
            "tags": "sunglasses,aviator,luxury,polarized,UV protection",
            "is_trending": 1,
            "stock_quantity": 78,
            "ar_enabled": 1,
            "ar_model_url": "https://cdn.example.com/models/luxury-aviator.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "multiple_images": json.dumps([
                "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]),
            "size_chart": json.dumps({"One Size": "58mm lens"}),
            "color_variants": json.dumps(["Gold/Brown", "Silver/Gray", "Black/Green"]),
            "three_d_model": "luxury_aviator_3d.glb"
        },
        
        {
            "name": "Summer Linen Shirt",
            "category": "Clothing",
            "mood_category": "sunny",
            "price": 79.99,
            "description": "Breathable linen shirt perfect for sunny days and casual outings.",
            "emoji": "👔",
            "image_url": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "SunComfort",
            "rating": 4.6,
            "tags": "linen,shirt,summer,breathable,casual",
            "is_trending": 0,
            "stock_quantity": 92,
            "ar_enabled": 1,
            "ar_model_url": "https://cdn.example.com/models/linen-shirt.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "multiple_images": json.dumps([
                "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]),
            "size_chart": json.dumps({"S": "38", "M": "40", "L": "42", "XL": "44"}),
            "color_variants": json.dumps(["White", "Light Blue", "Beige", "Navy"]),
            "three_d_model": "summer_linen_shirt_3d.glb"
        },
        
        # Party/Happy products
        {
            "name": "Glamorous Evening Dress",
            "category": "Clothing",
            "mood_category": "party",
            "price": 249.99,
            "description": "Stunning evening dress perfect for special occasions and parties.",
            "emoji": "👗",
            "image_url": "https://images.unsplash.com/photo-1566479179817-c4a4c3b5b9d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "Elegante",
            "rating": 4.8,
            "tags": "dress,evening,party,elegant,special occasion",
            "is_trending": 1,
            "stock_quantity": 23,
            "ar_enabled": 1,
            "ar_model_url": "https://cdn.example.com/models/evening-dress.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1566479179817-c4a4c3b5b9d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "multiple_images": json.dumps([
                "https://images.unsplash.com/photo-1566479179817-c4a4c3b5b9d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]),
            "size_chart": json.dumps({"XS": "32", "S": "34", "M": "36", "L": "38", "XL": "40"}),
            "color_variants": json.dumps(["Black", "Navy", "Wine Red", "Royal Blue"]),
            "three_d_model": "glamorous_evening_dress_3d.glb"
        },
        
        {
            "name": "Party Sneakers",
            "category": "Footwear",
            "mood_category": "happy",
            "price": 129.99,
            "description": "Trendy sneakers with metallic accents perfect for parties and fun occasions.",
            "emoji": "👟",
            "image_url": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "HappyFeet",
            "rating": 4.7,
            "tags": "sneakers,party,trendy,metallic,comfortable",
            "is_trending": 1,
            "stock_quantity": 56,
            "ar_enabled": 1,
            "ar_model_url": "https://cdn.example.com/models/party-sneakers.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "multiple_images": json.dumps([
                "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]),
            "size_chart": json.dumps({"6": "6", "7": "7", "8": "8", "9": "9", "10": "10", "11": "11", "12": "12"}),
            "color_variants": json.dumps(["White/Gold", "Black/Silver", "Pink/Rose Gold", "Blue/Chrome"]),
            "three_d_model": "party_sneakers_3d.glb"
        },
        
        # Professional products
        {
            "name": "Executive Business Suit",
            "category": "Clothing",
            "mood_category": "professional",
            "price": 599.99,
            "description": "Premium business suit tailored for the modern professional.",
            "emoji": "🤵",
            "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "Executive Style",
            "rating": 4.9,
            "tags": "suit,business,professional,formal,executive",
            "is_trending": 0,
            "stock_quantity": 18,
            "ar_enabled": 1,
            "ar_model_url": "https://cdn.example.com/models/business-suit.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "multiple_images": json.dumps([
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]),
            "size_chart": json.dumps({"36": "36", "38": "38", "40": "40", "42": "42", "44": "44", "46": "46"}),
            "color_variants": json.dumps(["Charcoal", "Navy", "Black", "Dark Gray"]),
            "three_d_model": "executive_business_suit_3d.glb"
        },
        
        {
            "name": "Professional Laptop Bag",
            "category": "Accessories",
            "mood_category": "professional",
            "price": 179.99,
            "description": "Premium leather laptop bag perfect for business professionals.",
            "emoji": "💼",
            "image_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "ProfessionalGear",
            "rating": 4.8,
            "tags": "laptop bag,business,professional,leather,premium",
            "is_trending": 0,
            "stock_quantity": 34,
            "ar_enabled": 1,
            "ar_model_url": "https://cdn.example.com/models/laptop-bag.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "multiple_images": json.dumps([
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]),
            "size_chart": json.dumps({"15 inch": "15 inch laptop", "17 inch": "17 inch laptop"}),
            "color_variants": json.dumps(["Black", "Brown", "Navy", "Cognac"]),
            "three_d_model": "professional_laptop_bag_3d.glb"
        }
    ]
    
    # Insert products
    for product in products:
        cursor.execute('''
            INSERT INTO products (name, category, mood_category, price, description, emoji, image_url, brand, rating, tags, is_trending, stock_quantity, ar_enabled, ar_model_url, ar_preview_url, multiple_images, size_chart, color_variants, three_d_model)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            product["name"],
            product["category"],
            product["mood_category"],
            product["price"],
            product["description"],
            product["emoji"],
            product["image_url"],
            product["brand"],
            product["rating"],
            product["tags"],
            product["is_trending"],
            product["stock_quantity"],
            product["ar_enabled"],
            product["ar_model_url"],
            product["ar_preview_url"],
            product["multiple_images"],
            product["size_chart"],
            product["color_variants"],
            product["three_d_model"]
        ))
    
    conn.commit()
    
    # Verify the data was inserted
    cursor.execute('SELECT COUNT(*) FROM products')
    count = cursor.fetchone()[0]
    print(f"✅ Successfully added {count} products with images!")
    
    # Show some sample products
    cursor.execute('SELECT name, image_url FROM products LIMIT 5')
    sample_products = cursor.fetchall()
    print("\n📦 Sample products:")
    for name, image_url in sample_products:
        print(f"   • {name}: {image_url}")
    
    conn.close()

if __name__ == "__main__":
    setup_database_with_images()
