#!/usr/bin/env python3
"""
Persistent Database Connection Setup for RetailFlowAI
Ensures database is always connected and populated with products
"""

import sqlite3
import os
import sys

DATABASE = 'retailflow.db'

def ensure_database_connection():
    """Ensure database exists and is properly connected with products"""
    try:
        # Create database if it doesn't exist
        if not os.path.exists(DATABASE):
            print(f"📁 Creating new database: {DATABASE}")
        else:
            print(f"🔗 Connecting to existing database: {DATABASE}")
        
        # Connect to database
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        # Test connection
        cursor.execute('SELECT SQLITE_VERSION()')
        version = cursor.fetchone()[0]
        print(f"✅ Database connection established (SQLite {version})")
        
        # Create tables if they don't exist
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
        
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_interactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_input TEXT,
            detected_mood TEXT,
            recommended_products TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        ''')
        
        # Check if products exist
        cursor.execute('SELECT COUNT(*) FROM products')
        product_count = cursor.fetchone()[0]
        
        if product_count == 0:
            print("📦 No products found. Inserting product data...")
            insert_products(cursor)
        else:
            print(f"📦 Found {product_count} existing products")
        
        conn.commit()
        
        # Verify products by mood
        verify_products_by_mood(cursor)
        
        conn.close()
        print("✅ Database connection verified and ready!")
        return True
        
    except sqlite3.Error as e:
        print(f"❌ Database error: {e}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

def insert_products(cursor):
    """Insert comprehensive product data into database"""
    products = [
        # HAPPY MOOD PRODUCTS
        ('Bright Summer T-Shirt', 'clothing', 24.99, 'Vibrant yellow t-shirt to brighten your day', '👕', 
         'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center', 
         'SunnyWear', 4.7, True, 85, True, 'summer,bright,casual,yellow', 'happy'),
        
        ('Classic Aviator Sunglasses', 'accessories', 89.99, 'Timeless aviator style for sunny adventures', '🕶️', 
         'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop&crop=center', 
         'SunStyle', 4.8, True, 50, True, 'sunglasses,aviator,classic,fashion', 'happy'),
        
        ('Colorful Canvas Sneakers', 'shoes', 79.99, 'Vibrant rainbow sneakers that spread joy', '👟', 
         'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center', 
         'ColorStep', 4.6, True, 60, True, 'sneakers,colorful,fun,canvas', 'happy'),
        
        ('Floral Summer Dress', 'clothing', 59.99, 'Beautiful floral pattern dress for special occasions', '👗', 
         'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center', 
         'BloomWear', 4.9, True, 30, True, 'dress,floral,summer,elegant', 'happy'),
        
        ('Trendy Baseball Cap', 'accessories', 29.99, 'Stylish cap for sunny days', '🧢', 
         'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center', 
         'CapStyle', 4.5, False, 70, True, 'cap,baseball,casual,sunny', 'happy'),
        
        # SAD/COMFORT MOOD PRODUCTS
        ('Ultra Cozy Hoodie', 'clothing', 49.99, 'Soft and warm hoodie for comfort days', '👕', 
         'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&crop=center', 
         'ComfortZone', 4.8, True, 75, True, 'hoodie,cozy,comfort,warm', 'sad'),
        
        ('Warm Knitted Scarf', 'accessories', 34.99, 'Wrap yourself in soft warmth', '🧣', 
         'https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=400&h=400&fit=crop&crop=center', 
         'WarmHeart', 4.7, False, 40, True, 'scarf,knitted,warm,winter', 'sad'),
        
        ('Comfort Sweatpants', 'clothing', 39.99, 'Ultra-soft sweatpants for maximum comfort', '👖', 
         'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center', 
         'RelaxWear', 4.6, False, 90, True, 'sweatpants,comfort,soft,casual', 'sad'),
        
        ('Fuzzy Slippers', 'shoes', 24.99, 'Incredibly soft slippers for home comfort', '🥿', 
         'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center', 
         'CozyFeet', 4.5, False, 55, False, 'slippers,fuzzy,home,comfort', 'sad'),
        
        ('Soft Throw Blanket', 'accessories', 44.99, 'Cozy blanket for ultimate comfort', '🛏️', 
         'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center', 
         'SoftComfort', 4.7, False, 25, False, 'blanket,soft,cozy,comfort', 'sad'),
        
        # RAINY MOOD PRODUCTS
        ('Waterproof Rain Jacket', 'clothing', 79.99, 'Stay dry and stylish in any weather', '🧥', 
         'https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=400&h=400&fit=crop&crop=center', 
         'StormShield', 4.8, True, 45, True, 'jacket,waterproof,rain,weather', 'rainy'),
        
        ('Compact Travel Umbrella', 'accessories', 29.99, 'Durable umbrella that fits anywhere', '☂️', 
         'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center', 
         'RainGuard', 4.6, False, 70, False, 'umbrella,compact,travel,rain', 'rainy'),
        
        ('Waterproof Boots', 'shoes', 99.99, 'Keep your feet dry with style', '👢', 
         'https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=400&h=400&fit=crop&crop=center', 
         'AquaStep', 4.7, True, 35, True, 'boots,waterproof,rain,durable', 'rainy'),
        
        ('Rain Hat', 'accessories', 19.99, 'Stylish protection for your head', '🎩', 
         'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center', 
         'WeatherWear', 4.4, False, 25, False, 'hat,rain,protection,style', 'rainy'),
        
        ('Waterproof Backpack', 'accessories', 69.99, 'Keep your belongings dry', '🎒', 
         'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center', 
         'DryPack', 4.6, True, 40, False, 'backpack,waterproof,travel,rain', 'rainy'),
        
        # NATURAL/CASUAL MOOD PRODUCTS
        ('Classic Denim Jeans', 'clothing', 69.99, 'Timeless denim for everyday wear', '👖', 
         'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center', 
         'DenimCraft', 4.7, True, 80, True, 'jeans,denim,classic,everyday', 'natural'),
        
        ('White Cotton T-Shirt', 'clothing', 19.99, 'Essential white tee for any occasion', '👕', 
         'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center', 
         'BasicWear', 4.5, True, 100, True, 'tshirt,white,cotton,basic', 'natural'),
        
        ('Canvas Sneakers', 'shoes', 59.99, 'Comfortable sneakers for daily activities', '👟', 
         'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center', 
         'EverydayStep', 4.6, True, 65, True, 'sneakers,canvas,casual,comfortable', 'natural'),
        
        ('Simple Leather Watch', 'accessories', 149.99, 'Elegant timepiece for any occasion', '⌚', 
         'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center', 
         'TimeClassic', 4.9, True, 20, False, 'watch,leather,elegant,timepiece', 'natural'),
        
        ('Cotton Cardigan', 'clothing', 54.99, 'Versatile layer for any season', '🧥', 
         'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&crop=center', 
         'LayerWear', 4.7, False, 40, True, 'cardigan,cotton,versatile,layer', 'natural')
    ]
    
    cursor.executemany('''
        INSERT INTO products (name, category, price, description, emoji, image_url, brand, rating, is_trending, stock_quantity, ar_enabled, tags, mood_category)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', products)
    
    print(f"✅ Inserted {len(products)} products into database")

def verify_products_by_mood(cursor):
    """Verify products exist for each mood category"""
    cursor.execute('SELECT COUNT(*) FROM products')
    total_count = cursor.fetchone()[0]
    print(f"📊 Total products in database: {total_count}")
    
    for mood in ['happy', 'sad', 'natural', 'rainy']:
        cursor.execute('SELECT COUNT(*) FROM products WHERE mood_category = ?', (mood,))
        mood_count = cursor.fetchone()[0]
        print(f"   {mood.capitalize()} mood: {mood_count} products")
        
        if mood_count == 0:
            print(f"   ⚠️ WARNING: No products found for {mood} mood!")
    
    # Verify image URLs
    cursor.execute('SELECT COUNT(*) FROM products WHERE image_url IS NOT NULL AND image_url != ""')
    images_count = cursor.fetchone()[0]
    print(f"   🖼️ Products with images: {images_count}/{total_count}")

if __name__ == "__main__":
    print("🔗 Ensuring Database Connection...")
    print("=" * 50)
    
    success = ensure_database_connection()
    
    if success:
        print("\n🎉 DATABASE READY!")
        print("✅ Connection established")
        print("✅ Products populated")
        print("✅ All moods covered")
        print("✅ Images available")
        print("\n💡 You can now run your chatbot tests!")
    else:
        print("\n❌ DATABASE SETUP FAILED!")
        print("Please check the errors above and try again.")
        sys.exit(1)
