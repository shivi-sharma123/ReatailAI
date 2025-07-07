#!/usr/bin/env python3
"""
Quick setup script to initialize database and fix common issues
"""

import os
import sys
import sqlite3
import json
from datetime import datetime

# Change to the server directory
os.chdir(r"c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\server")

DATABASE = 'retailflow.db'

def create_database():
    """Create and populate the database"""
    print("🗄️ Creating database...")
    
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
    
    # Add sample products for all moods
    sample_products = [
        # Happy mood products
        (1, "Bright Yellow T-Shirt", "clothing", "happy", 24.99, "Bright and cheerful shirt to match your mood!", "😊", 
         "https://via.placeholder.com/400x400/FFD700/000000?text=😊+Bright+Tee", "SunnyWear", 4.8, "bright,yellow,happy", 1, 95, None, None, None, None, None, 1),
        
        (2, "Colorful Sneakers", "shoes", "happy", 79.99, "Vibrant sneakers for your happy vibes", "👟",
         "https://via.placeholder.com/400x400/FF69B4/ffffff?text=👟+Sneakers", "ColorStep", 4.7, "colorful,sneakers,happy", 1, 88, None, None, None, None, None, 1),
        
        (3, "Classic Aviator Sunglasses", "accessories", "happy", 29.99, "Timeless aviator style with UV protection", "🕶️",
         "https://via.placeholder.com/400x400/C0C0C0/000000?text=🕶️+Aviators", "SunStyle", 4.9, "sunglasses,aviator,happy", 1, 76, None, None, None, None, None, 1),
        
        # Sad/comfort mood products
        (4, "Cozy Hoodie", "clothing", "sad", 49.99, "Soft and cozy for those comfort days", "🧺",
         "https://via.placeholder.com/400x400/808080/ffffff?text=🧺+Hoodie", "ComfortZone", 4.6, "cozy,hoodie,comfort", 1, 92, None, None, None, None, None, 1),
        
        (5, "Warm Blanket Scarf", "accessories", "sad", 34.99, "Wrap yourself in comfort", "🧣",
         "https://via.placeholder.com/400x400/D3D3D3/000000?text=🧣+Scarf", "WarmHeart", 4.5, "scarf,warm,comfort", 0, 85, None, None, None, None, None, 1),
        
        # Rainy mood products  
        (6, "Waterproof Rain Jacket", "clothing", "rainy", 69.99, "Stay dry in style during rainy weather", "☔",
         "https://via.placeholder.com/400x400/4682B4/ffffff?text=☔+Rain+Jacket", "StormShield", 4.8, "rain,jacket,waterproof", 1, 78, None, None, None, None, None, 1),
        
        (7, "Stylish Umbrella", "accessories", "rainy", 24.99, "Compact and stylish protection from rain", "☂️",
         "https://via.placeholder.com/400x400/2F4F4F/ffffff?text=☂️+Umbrella", "RainGuard", 4.4, "umbrella,rain,compact", 0, 67, None, None, None, None, None, 0),
        
        (8, "Winter Puffer Coat", "clothing", "rainy", 79.99, "Warm puffer coat for cold weather", "🧥",
         "https://via.placeholder.com/400x400/4169E1/ffffff?text=🧥+Puffer", "WinterGuard", 4.7, "coat,winter,warm", 1, 54, None, None, None, None, None, 1),
        
        # Natural/casual mood products
        (9, "Organic Cotton T-Shirt", "clothing", "natural", 27.99, "Natural and comfortable for everyday wear", "🌿",
         "https://via.placeholder.com/400x400/228B22/ffffff?text=🌿+Natural+Tee", "EcoWear", 4.6, "organic,cotton,natural", 1, 89, None, None, None, None, None, 1),
        
        (10, "Classic Blue Jeans", "clothing", "natural", 29.99, "Comfortable classic jeans for everyday wear", "👖",
         "https://via.placeholder.com/400x400/4169E1/ffffff?text=👖+Jeans", "RetailFlow", 4.5, "jeans,classic,everyday", 1, 93, None, None, None, None, None, 1),
        
        (11, "Casual Khaki Pants", "clothing", "natural", 39.99, "Perfect for your natural, casual style", "👖",
         "https://via.placeholder.com/400x400/F5DEB3/000000?text=👖+Khakis", "CasualFit", 4.4, "khaki,casual,natural", 0, 71, None, None, None, None, None, 1),
        
        # Work/professional mood products
        (12, "Professional Blazer", "clothing", "natural", 99.99, "Look professional and confident at work", "💼",
         "https://via.placeholder.com/400x400/2F4F4F/ffffff?text=💼+Blazer", "OfficePro", 4.8, "blazer,professional,work", 1, 45, None, None, None, None, None, 1),
        
        (13, "Business Shirt", "clothing", "natural", 45.99, "Classic business shirt for professional occasions", "👔",
         "https://via.placeholder.com/400x400/FFFFFF/000000?text=👔+Shirt", "WorkWear", 4.7, "shirt,business,professional", 0, 62, None, None, None, None, None, 1),
        
        # Party/special occasion products
        (14, "Elegant Party Dress", "clothing", "happy", 89.99, "Perfect for your special celebration!", "👗",
         "https://via.placeholder.com/400x400/DC143C/ffffff?text=👗+Party+Dress", "PartyGlam", 4.9, "dress,party,elegant", 1, 34, None, None, None, None, None, 1),
        
        (15, "Dress Shoes", "shoes", "happy", 59.99, "Complete your party look with style", "👠",
         "https://via.placeholder.com/400x400/000000/ffffff?text=👠+Dress+Shoes", "ClassyStep", 4.6, "shoes,dress,party", 0, 52, None, None, None, None, None, 1),
        
        # Additional accessories
        (16, "Trendy Round Sunglasses", "accessories", "happy", 34.99, "Modern round frames for a stylish look", "🕶️",
         "https://via.placeholder.com/400x400/000000/ffffff?text=🕶️+Round", "TrendyShades", 4.5, "sunglasses,round,trendy", 1, 68, None, None, None, None, None, 1),
        
        (17, "Leather Jacket", "clothing", "natural", 149.99, "Classic leather jacket for style and warmth", "🧥",
         "https://via.placeholder.com/400x400/8B4513/ffffff?text=🧥+Leather", "LeatherLux", 4.8, "leather,jacket,classic", 1, 23, None, None, None, None, None, 1),
    ]
    
    # Insert products
    cursor.executemany('''
        INSERT OR REPLACE INTO products (
            id, name, category, mood_category, price, description, emoji, image_url, brand, rating,
            tags, is_trending, stock_quantity, ar_model_url, ar_preview_url, multiple_images, 
            size_chart, color_variants, ar_enabled
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', sample_products)
    
    # Create analytics entries
    for i in range(1, 18):
        cursor.execute('''
            INSERT OR REPLACE INTO analytics (product_id, view_count, purchase_count, ar_try_count)
            VALUES (?, ?, ?, ?)
        ''', (i, 0, 0, 0))
    
    conn.commit()
    conn.close()
    
    print(f"✅ Database created with {len(sample_products)} products")

def check_database():
    """Check if database exists and has data"""
    if os.path.exists(DATABASE):
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*) FROM products")
        count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM products WHERE mood_category = 'happy'")
        happy_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM products WHERE mood_category = 'sad'")
        sad_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM products WHERE mood_category = 'rainy'")
        rainy_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM products WHERE mood_category = 'natural'")
        natural_count = cursor.fetchone()[0]
        
        conn.close()
        
        print(f"✅ Database has {count} total products:")
        print(f"   - Happy mood: {happy_count} products")
        print(f"   - Sad mood: {sad_count} products")
        print(f"   - Rainy mood: {rainy_count} products")
        print(f"   - Natural mood: {natural_count} products")
        
        return count > 0
    else:
        print("❌ Database does not exist")
        return False

def main():
    print("🔧 RetailFlowAI Database Setup")
    print("=" * 40)
    
    if not check_database():
        create_database()
    else:
        print("✅ Database already exists and has products")
    
    # Final verification
    print("\n🧪 Final verification...")
    check_database()
    
    print("\n🎉 Database setup complete!")
    print("💡 You can now start the app with: python app.py")

if __name__ == "__main__":
    main()
