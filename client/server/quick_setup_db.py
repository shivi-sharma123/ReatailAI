#!/usr/bin/env python3
"""
Quick database setup for RetailFlowAI
"""

import sqlite3
import os

# Change to server directory
os.chdir(r"c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\server")

DATABASE = 'retailflow.db'

print("🗄️ Creating RetailFlowAI database...")

conn = sqlite3.connect(DATABASE)
cursor = conn.cursor()

# Create products table
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
        rating REAL DEFAULT 4.5,
        tags TEXT,
        is_trending BOOLEAN DEFAULT 0,
        stock_quantity INTEGER DEFAULT 100,
        ar_model_url TEXT,
        ar_preview_url TEXT,
        multiple_images TEXT,
        size_chart TEXT,
        color_variants TEXT,
        ar_enabled BOOLEAN DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
''')

# Create other tables
cursor.execute('''
    CREATE TABLE IF NOT EXISTS user_interactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_input TEXT,
        detected_mood TEXT,
        recommended_products TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
''')

cursor.execute('''
    CREATE TABLE IF NOT EXISTS analytics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER,
        view_count INTEGER DEFAULT 0,
        purchase_count INTEGER DEFAULT 0,
        ar_try_count INTEGER DEFAULT 0,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products (id)
    )
''')

# Add products for all moods
products = [
    # Happy mood
    (1, "Bright Yellow T-Shirt", "clothing", "happy", 24.99, "Bright and cheerful shirt", "😊", 
     "https://via.placeholder.com/400x400/FFD700/000000?text=😊+Bright+Tee", "SunnyWear", 4.8, "bright,yellow,happy", 1, 95, "", "", "", "", "", 1),
    (2, "Colorful Sneakers", "shoes", "happy", 79.99, "Vibrant sneakers for your happy vibes", "👟",
     "https://via.placeholder.com/400x400/FF69B4/ffffff?text=👟+Sneakers", "ColorStep", 4.7, "colorful,sneakers,happy", 1, 88, "", "", "", "", "", 1),
    (3, "Classic Aviator Sunglasses", "accessories", "happy", 29.99, "Timeless aviator style", "🕶️",
     "https://via.placeholder.com/400x400/C0C0C0/000000?text=🕶️+Aviators", "SunStyle", 4.9, "sunglasses,aviator,happy", 1, 76, "", "", "", "", "", 1),
    
    # Sad mood  
    (4, "Cozy Hoodie", "clothing", "sad", 49.99, "Soft and cozy for comfort", "🧺",
     "https://via.placeholder.com/400x400/808080/ffffff?text=🧺+Hoodie", "ComfortZone", 4.6, "cozy,hoodie,comfort", 1, 92, "", "", "", "", "", 1),
    (5, "Warm Blanket Scarf", "accessories", "sad", 34.99, "Wrap yourself in comfort", "🧣",
     "https://via.placeholder.com/400x400/D3D3D3/000000?text=🧣+Scarf", "WarmHeart", 4.5, "scarf,warm,comfort", 0, 85, "", "", "", "", "", 1),
    
    # Rainy mood
    (6, "Waterproof Rain Jacket", "clothing", "rainy", 69.99, "Stay dry in style", "☔",
     "https://via.placeholder.com/400x400/4682B4/ffffff?text=☔+Rain+Jacket", "StormShield", 4.8, "rain,jacket,waterproof", 1, 78, "", "", "", "", "", 1),
    (7, "Stylish Umbrella", "accessories", "rainy", 24.99, "Compact protection from rain", "☂️",
     "https://via.placeholder.com/400x400/2F4F4F/ffffff?text=☂️+Umbrella", "RainGuard", 4.4, "umbrella,rain,compact", 0, 67, "", "", "", "", "", 0),
    (8, "Winter Puffer Coat", "clothing", "rainy", 79.99, "Warm coat for cold weather", "🧥",
     "https://via.placeholder.com/400x400/4169E1/ffffff?text=🧥+Puffer", "WinterGuard", 4.7, "coat,winter,warm", 1, 54, "", "", "", "", "", 1),
    
    # Natural mood
    (9, "Organic Cotton T-Shirt", "clothing", "natural", 27.99, "Natural and comfortable", "🌿",
     "https://via.placeholder.com/400x400/228B22/ffffff?text=🌿+Natural+Tee", "EcoWear", 4.6, "organic,cotton,natural", 1, 89, "", "", "", "", "", 1),
    (10, "Classic Blue Jeans", "clothing", "natural", 29.99, "Comfortable classic jeans", "👖",
     "https://via.placeholder.com/400x400/4169E1/ffffff?text=👖+Jeans", "RetailFlow", 4.5, "jeans,classic,everyday", 1, 93, "", "", "", "", "", 1),
    (11, "Professional Blazer", "clothing", "natural", 99.99, "Professional and confident", "💼",
     "https://via.placeholder.com/400x400/2F4F4F/ffffff?text=💼+Blazer", "OfficePro", 4.8, "blazer,professional,work", 1, 45, "", "", "", "", "", 1),
    (12, "Business Shirt", "clothing", "natural", 45.99, "Classic business shirt", "👔",
     "https://via.placeholder.com/400x400/FFFFFF/000000?text=👔+Shirt", "WorkWear", 4.7, "shirt,business,professional", 0, 62, "", "", "", "", "", 1),
]

# Insert products
cursor.executemany('''
    INSERT OR REPLACE INTO products (
        id, name, category, mood_category, price, description, emoji, image_url, brand, rating,
        tags, is_trending, stock_quantity, ar_model_url, ar_preview_url, multiple_images, 
        size_chart, color_variants, ar_enabled
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
''', products)

# Create analytics entries
for i in range(1, len(products) + 1):
    cursor.execute('''
        INSERT OR REPLACE INTO analytics (product_id, view_count, purchase_count, ar_try_count)
        VALUES (?, ?, ?, ?)
    ''', (i, 0, 0, 0))

conn.commit()
conn.close()

print(f"✅ Database created successfully with {len(products)} products!")
print("🎯 Products for all moods: happy, sad, rainy, natural")
print("💡 Your chatbot will now respond to all mood inputs!")
