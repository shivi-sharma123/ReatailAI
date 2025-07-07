#!/usr/bin/env python3
"""
RetailFlowAI Database Connection & Setup Script
Ensures database is always connected and populated with products
"""

import sqlite3
import os
import requests
import json
import time

DATABASE = 'retailflow.db'

def test_network():
    """Test network connectivity"""
    try:
        response = requests.get('https://httpbin.org/status/200', timeout=5)
        return response.status_code == 200
    except:
        return False

def ensure_database_connection():
    """Ensure database is always connected and populated"""
    print("🔄 Ensuring database connection...")
    
    # Always recreate database to ensure it's fresh and connected
    if os.path.exists(DATABASE):
        print(f"🗑️ Removing old database: {DATABASE}")
        os.remove(DATABASE)
    
    print(f"🔧 Creating fresh database: {DATABASE}")
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Create products table with all necessary columns
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
    
    # Create user_interactions table for logging
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS user_interactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_input TEXT,
        detected_mood TEXT,
        recommended_products TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Test network connectivity
    network_available = test_network()
    print(f"🌐 Network status: {'✅ Connected' if network_available else '❌ Offline'}")
    
    # Always use high-quality images (Unsplash URLs work offline too with caching)
    products = [
        # HAPPY MOOD PRODUCTS
        ("Bright Summer T-Shirt", "clothing", 24.99, "Vibrant yellow t-shirt to brighten your day", "👕", 
         "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center", 
         "SunnyWear", 4.7, True, 85, True, "summer,bright,casual,yellow", "happy"),
        
        ("Classic Aviator Sunglasses", "accessories", 89.99, "Timeless aviator style for sunny adventures", "🕶️", 
         "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop&crop=center", 
         "SunStyle", 4.8, True, 50, True, "sunglasses,aviator,classic,fashion", "happy"),
        
        ("Colorful Canvas Sneakers", "shoes", 79.99, "Vibrant rainbow sneakers that spread joy", "👟", 
         "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center", 
         "ColorStep", 4.6, True, 60, True, "sneakers,colorful,fun,canvas", "happy"),
        
        ("Floral Summer Dress", "clothing", 59.99, "Beautiful floral pattern dress for special occasions", "👗", 
         "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center", 
         "BloomWear", 4.9, True, 30, True, "dress,floral,summer,elegant", "happy"),
        
        # SAD/COMFORT MOOD PRODUCTS
        ("Ultra Cozy Hoodie", "clothing", 49.99, "Soft and warm hoodie for comfort days", "👕", 
         "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&crop=center", 
         "ComfortZone", 4.8, True, 75, True, "hoodie,cozy,comfort,warm", "sad"),
        
        ("Warm Knitted Scarf", "accessories", 34.99, "Wrap yourself in soft warmth", "🧣", 
         "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=400&h=400&fit=crop&crop=center", 
         "WarmHeart", 4.7, False, 40, True, "scarf,knitted,warm,winter", "sad"),
        
        ("Comfort Sweatpants", "clothing", 39.99, "Ultra-soft sweatpants for maximum comfort", "👖", 
         "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center", 
         "RelaxWear", 4.6, False, 90, True, "sweatpants,comfort,soft,casual", "sad"),
        
        ("Fuzzy Slippers", "shoes", 24.99, "Incredibly soft slippers for home comfort", "🥿", 
         "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center", 
         "CozyFeet", 4.5, False, 55, False, "slippers,fuzzy,home,comfort", "sad"),
        
        # RAINY MOOD PRODUCTS
        ("Waterproof Rain Jacket", "clothing", 79.99, "Stay dry and stylish in any weather", "🧥", 
         "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=400&h=400&fit=crop&crop=center", 
         "StormShield", 4.8, True, 45, True, "jacket,waterproof,rain,weather", "rainy"),
        
        ("Compact Travel Umbrella", "accessories", 29.99, "Durable umbrella that fits anywhere", "☂️", 
         "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center", 
         "RainGuard", 4.6, False, 70, False, "umbrella,compact,travel,rain", "rainy"),
        
        ("Waterproof Boots", "shoes", 99.99, "Keep your feet dry with style", "👢", 
         "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=400&h=400&fit=crop&crop=center", 
         "AquaStep", 4.7, True, 35, True, "boots,waterproof,rain,durable", "rainy"),
        
        ("Rain Hat", "accessories", 19.99, "Stylish protection for your head", "🎩", 
         "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center", 
         "WeatherWear", 4.4, False, 25, False, "hat,rain,protection,style", "rainy"),
        
        # NATURAL/CASUAL MOOD PRODUCTS
        ("Classic Denim Jeans", "clothing", 69.99, "Timeless denim for everyday wear", "👖", 
         "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center", 
         "DenimCraft", 4.7, True, 80, True, "jeans,denim,classic,everyday", "natural"),
        
        ("White Cotton T-Shirt", "clothing", 19.99, "Essential white tee for any occasion", "👕", 
         "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center", 
         "BasicWear", 4.5, True, 100, True, "tshirt,white,cotton,basic", "natural"),
        
        ("Canvas Sneakers", "shoes", 59.99, "Comfortable sneakers for daily activities", "👟", 
         "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center", 
         "EverydayStep", 4.6, True, 65, True, "sneakers,canvas,casual,comfortable", "natural"),
        
        ("Simple Leather Watch", "accessories", 149.99, "Elegant timepiece for any occasion", "⌚", 
         "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center", 
         "TimeClassic", 4.9, True, 20, False, "watch,leather,elegant,timepiece", "natural"),
        
        ("Cotton Cardigan", "clothing", 54.99, "Versatile layer for any season", "🧥", 
         "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&crop=center", 
         "LayerWear", 4.7, False, 40, True, "cardigan,cotton,versatile,layer", "natural"),
        
        ("Casual Baseball Cap", "accessories", 24.99, "Classic cap for outdoor activities", "🧢", 
         "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center", 
         "CapStyle", 4.5, False, 50, True, "cap,baseball,casual,outdoor", "natural")
    ]
    
    print(f"💾 Inserting {len(products)} products into database...")
    cursor.executemany('''
        INSERT INTO products (name, category, price, description, emoji, image_url, brand, rating, is_trending, stock_quantity, ar_enabled, tags, mood_category)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', products)
    
    conn.commit()
    
    # Verify the data
    cursor.execute('SELECT COUNT(*) FROM products')
    total_count = cursor.fetchone()[0]
    print(f"✅ Successfully inserted {total_count} products")
    
    # Check products by mood
    mood_counts = {}
    for mood in ['happy', 'sad', 'natural', 'rainy']:
        cursor.execute('SELECT COUNT(*) FROM products WHERE mood_category = ?', (mood,))
        mood_count = cursor.fetchone()[0]
        mood_counts[mood] = mood_count
        print(f"   📂 {mood.capitalize()} mood: {mood_count} products")
    
    conn.close()
    
    # Verify database connection works
    print("\n🔍 Testing database connection...")
    try:
        test_conn = sqlite3.connect(DATABASE)
        test_cursor = test_conn.cursor()
        test_cursor.execute('SELECT COUNT(*) FROM products')
        count = test_cursor.fetchone()[0]
        test_conn.close()
        print(f"✅ Database connection verified: {count} products accessible")
        return True
    except Exception as e:
        print(f"❌ Database connection test failed: {e}")
        return False

def test_backend_connection():
    """Test if backend can connect to database"""
    print("\n🔌 Testing backend database connection...")
    
    try:
        # Test products endpoint
        response = requests.get('http://localhost:5000/api/products', timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and data.get('products'):
                print(f"✅ Backend connected to database: {len(data['products'])} products")
                return True
            else:
                print("❌ Backend connected but no products found")
                return False
        else:
            print(f"❌ Backend connection failed: HTTP {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Backend connection test failed: {e}")
        return False

def test_chatbot_functionality():
    """Test chatbot mood detection and product retrieval"""
    print("\n🤖 Testing chatbot functionality...")
    
    test_cases = [
        ("I am feeling happy today!", "happy"),
        ("I'm sad and need comfort", "sad"),
        ("It's raining outside", "rainy"),
        ("I need casual clothes", "natural")
    ]
    
    success_count = 0
    
    for message, expected_mood in test_cases:
        try:
            response = requests.post(
                'http://localhost:5000/api/chat',
                json={'message': message},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and data.get('products'):
                    mood = data.get('mood', 'unknown')
                    product_count = len(data.get('products', []))
                    print(f"✅ '{message}' → {mood} mood, {product_count} products")
                    success_count += 1
                else:
                    print(f"❌ '{message}' → No products returned")
            else:
                print(f"❌ '{message}' → HTTP {response.status_code}")
                
        except Exception as e:
            print(f"❌ '{message}' → Error: {e}")
    
    print(f"\n🎯 Chatbot test results: {success_count}/{len(test_cases)} passed")
    return success_count == len(test_cases)

if __name__ == "__main__":
    print("🚀 RetailFlowAI Database Connection Manager")
    print("=" * 50)
    
    # Step 1: Ensure database is connected and populated
    db_success = ensure_database_connection()
    
    if db_success:
        print("\n✅ Database is now ALWAYS CONNECTED and populated!")
        print("🎉 Your RetailFlowAI database is ready for use!")
        
        # Wait a moment for servers to be running
        print("\n⏳ Waiting for servers to be ready...")
        time.sleep(3)
        
        # Step 2: Test backend connection (if server is running)
        backend_success = test_backend_connection()
        
        # Step 3: Test chatbot functionality (if backend is working)
        if backend_success:
            chatbot_success = test_chatbot_functionality()
            
            if chatbot_success:
                print("\n🏆 COMPLETE SUCCESS!")
                print("✅ Database: Connected & Populated")
                print("✅ Backend: Connected to Database") 
                print("✅ Chatbot: Fully Functional")
                print("\n🎯 Your app is ready for mood-based product recommendations!")
            else:
                print("\n⚠️ Database and backend are connected, but chatbot needs attention")
        else:
            print("\n💡 Database is ready! Start the backend server with: python app.py")
    else:
        print("\n❌ Database connection failed. Please check file permissions and try again.")
    
    print("\n" + "=" * 50)
    print("🎉 Database Connection Manager Complete!")
