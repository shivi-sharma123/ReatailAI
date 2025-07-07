#!/usr/bin/env python3
"""Database initialization script with comprehensive product data"""

import sqlite3
import os

DATABASE = 'retailflow.db'

def init_database_with_products():
    """Initialize database and add products if they don't exist"""
    
    # Create database and tables
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Create products table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT,
        emoji TEXT,
        image_url TEXT,
        brand TEXT,
        rating REAL DEFAULT 4.5,
        is_trending BOOLEAN DEFAULT FALSE,
        stock_quantity INTEGER DEFAULT 100,
        ar_enabled BOOLEAN DEFAULT TRUE,
        tags TEXT,
        mood_category TEXT
    )
    ''')
    
    # Create user interactions table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS user_interactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_input TEXT,
        detected_mood TEXT,
        recommended_products TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Create analytics table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS analytics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER,
        view_count INTEGER DEFAULT 0,
        purchase_count INTEGER DEFAULT 0,
        ar_try_count INTEGER DEFAULT 0,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products (id)
    )
    ''')
    
    # Check if products already exist
    cursor.execute('SELECT COUNT(*) FROM products')
    product_count = cursor.fetchone()[0]
    
    if product_count == 0:
        print("🔄 Adding initial products to database...")
        
        # Add products for all mood categories
        products = [
            # HAPPY MOOD PRODUCTS
            ("Premium Designer Sunglasses", "sunglasses", 89.99, "Stylish sunglasses for sunny days", "😎", 
             "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400", "RayBan", 4.8, True, 50, True, "happy,sunny,stylish", "happy"),
            
            ("Bright Happy T-Shirt", "t-shirt", 29.99, "Cheerful t-shirt to brighten your day", "😊", 
             "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", "HappyWear", 4.5, True, 100, True, "happy,cheerful,casual", "happy"),
            
            ("Vibrant Summer Shorts", "shorts", 39.99, "Colorful shorts for fun times", "🌈", 
             "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400", "SummerVibes", 4.6, False, 75, True, "happy,summer,colorful", "happy"),
            
            # SAD/COMFORT MOOD PRODUCTS
            ("Cozy Comfort Hoodie", "hoodie", 59.99, "Ultra-soft hoodie for comfort", "🤗", 
             "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400", "ComfortZone", 4.9, True, 80, True, "comfort,soft,warm", "sad"),
            
            ("Warm Comfort Blanket", "blanket", 49.99, "Soft blanket for cozy moments", "🛌", 
             "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400", "WarmHugs", 4.7, False, 30, False, "comfort,warm,cozy", "sad"),
            
            ("Soothing Tea Mug", "mug", 19.99, "Perfect mug for relaxing tea time", "☕", 
             "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400", "CozyMoments", 4.4, False, 150, False, "comfort,tea,relaxing", "sad"),
            
            # NATURAL/CASUAL MOOD PRODUCTS  
            ("Classic Denim Jeans", "jeans", 79.99, "Perfect everyday jeans", "👖", 
             "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", "DenimCo", 4.5, True, 90, True, "casual,everyday,denim", "natural"),
            
            ("Natural Cotton T-Shirt", "t-shirt", 24.99, "Comfortable cotton tee", "👕", 
             "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", "NaturalWear", 4.3, False, 120, True, "natural,cotton,basic", "natural"),
            
            ("Casual Canvas Sneakers", "sneakers", 69.99, "Comfortable everyday sneakers", "👟", 
             "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400", "ComfortStep", 4.6, True, 60, True, "casual,comfortable,sneakers", "natural"),
            
            # RAINY MOOD PRODUCTS
            ("Premium Rain Jacket", "jacket", 129.99, "Waterproof jacket for rainy days", "🌧️", 
             "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400", "WeatherGuard", 4.8, True, 40, True, "rainy,waterproof,protection", "rainy"),
            
            ("Waterproof Rain Boots", "boots", 89.99, "Keep your feet dry in style", "🥾", 
             "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400", "DryStep", 4.7, False, 55, True, "rainy,waterproof,boots", "rainy"),
            
            ("Compact Travel Umbrella", "umbrella", 34.99, "Perfect umbrella for any weather", "☂️", 
             "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", "RainShield", 4.4, False, 100, False, "rainy,portable,protection", "rainy"),
        ]
        
        cursor.executemany('''
        INSERT INTO products 
        (name, category, price, description, emoji, image_url, brand, rating, is_trending, stock_quantity, ar_enabled, tags, mood_category)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', products)
        
        print(f"✅ Added {len(products)} products to database!")
        
        # Add analytics data for all products
        cursor.execute('SELECT id FROM products')
        product_ids = cursor.fetchall()
        
        analytics_data = []
        for product_id in product_ids:
            analytics_data.append((product_id[0], 10, 2, 5))
        
        cursor.executemany('''
        INSERT INTO analytics (product_id, view_count, purchase_count, ar_try_count)
        VALUES (?, ?, ?, ?)
        ''', analytics_data)
        
        print("✅ Added analytics data!")
        
    else:
        print(f"✅ Database already has {product_count} products")
    
    conn.commit()
    conn.close()
    print("✅ Database initialization complete!")

if __name__ == "__main__":
    init_database_with_products()
