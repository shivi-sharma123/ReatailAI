import sqlite3
import json
import os

DATABASE = 'retailflow.db'

def create_fresh_database():
    """Create a completely fresh database with all tables and products"""
    
    # Delete old database if exists
    if os.path.exists(DATABASE):
        os.remove(DATABASE)
        print("🗑️ Removed old database")
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    print("🏗️ Creating fresh database...")
    
    # Create products table
    cursor.execute('''
        CREATE TABLE products (
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
    
    # Create user interactions table
    cursor.execute('''
        CREATE TABLE user_interactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_input TEXT NOT NULL,
            detected_mood TEXT NOT NULL,
            recommended_products TEXT,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    print("✅ Tables created successfully")
    
    # Add essential products
    products = [
        # Happy Mood Products
        ('Designer Sunglasses', 'accessories', 'happy', 89.99, 'Stylish sunglasses perfect for sunny days and happy moments', '😎',
         'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500', 'RayBan', 4.7, 'sunglasses,happy,sunny,style', 1, 45, 
         '', '', '[]', '{}', '[]', 1, 'sunglasses_3d.obj'),
        
        ('Happy Face T-Shirt', 'clothing', 'happy', 29.99, 'Bright and cheerful t-shirt to express your happy mood', '😊',
         'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', 'HappyWear', 4.5, 'tshirt,happy,colorful,casual', 1, 80,
         '', '', '[]', '{}', '[]', 1, 'tshirt_3d.obj'),
        
        ('Vibrant Summer Shorts', 'clothing', 'happy', 39.99, 'Colorful shorts perfect for happy summer days', '🌈',
         'https://images.unsplash.com/photo-1506629905826-b2d4834e0fa0?w=500', 'SummerVibes', 4.4, 'shorts,happy,summer,colorful', 0, 60,
         '', '', '[]', '{}', '[]', 1, 'shorts_3d.obj'),
        
        # Sad Mood Products
        ('Cozy Comfort Hoodie', 'clothing', 'sad', 59.99, 'Soft and warm hoodie for comfort during sad moments', '🤗',
         'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500', 'ComfortZone', 4.8, 'hoodie,comfort,sad,cozy', 1, 35,
         '', '', '[]', '{}', '[]', 1, 'hoodie_3d.obj'),
        
        ('Warm Comfort Blanket', 'home', 'sad', 49.99, 'Ultra-soft blanket for comfort and warmth', '🛌',
         'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500', 'WarmHugs', 4.9, 'blanket,comfort,sad,soft', 0, 25,
         '', '', '[]', '{}', '[]', 1, 'blanket_3d.obj'),
        
        ('Comfort Tea Mug', 'home', 'sad', 19.99, 'Perfect mug for a comforting hot drink', '☕',
         'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500', 'CozyMoments', 4.3, 'mug,comfort,sad,tea', 0, 90,
         '', '', '[]', '{}', '[]', 1, 'mug_3d.obj'),
        
        # Natural Mood Products
        ('Classic Blue Jeans', 'clothing', 'natural', 79.99, 'Timeless denim jeans for everyday natural style', '👖',
         'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=500', 'ClassicDenim', 4.6, 'jeans,natural,casual,denim', 1, 70,
         '', '', '[]', '{}', '[]', 1, 'jeans_3d.obj'),
        
        ('Natural Cotton T-Shirt', 'clothing', 'natural', 24.99, 'Simple and natural cotton t-shirt for everyday wear', '👕',
         'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', 'NaturalWear', 4.4, 'tshirt,natural,cotton,simple', 0, 100,
         '', '', '[]', '{}', '[]', 1, 'tshirt_natural_3d.obj'),
        
        ('Casual Sneakers', 'footwear', 'natural', 69.99, 'Comfortable sneakers for natural everyday activities', '👟',
         'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500', 'NaturalStep', 4.5, 'sneakers,natural,comfort,casual', 1, 55,
         '', '', '[]', '{}', '[]', 1, 'sneakers_3d.obj'),
        
        # Rainy Weather Products
        ('Waterproof Rain Coat', 'outerwear', 'rainy', 129.99, 'Premium waterproof coat perfect for rainy days', '🌧️',
         'https://images.unsplash.com/photo-1544966503-7cc5a6a7e4a6?w=500', 'RainPro', 4.7, 'raincoat,rainy,waterproof,protection', 1, 30,
         '', '', '[]', '{}', '[]', 1, 'raincoat_3d.obj'),
        
        ('Rain Boots', 'footwear', 'rainy', 59.99, 'Waterproof boots to keep your feet dry', '🥾',
         'https://images.unsplash.com/photo-1544824144-d0320d6c5f9a?w=500', 'DryFeet', 4.6, 'boots,rainy,waterproof,protection', 0, 40,
         '', '', '[]', '{}', '[]', 1, 'boots_3d.obj'),
        
        ('Compact Umbrella', 'accessories', 'rainy', 29.99, 'Compact and sturdy umbrella for rainy weather', '☂️',
         'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500', 'RainShield', 4.3, 'umbrella,rainy,protection,compact', 0, 85,
         '', '', '[]', '{}', '[]', 1, 'umbrella_3d.obj'),
    ]
    
    cursor.executemany('''
        INSERT INTO products (name, category, mood_category, price, description, emoji, image_url, brand, rating, tags, is_trending, stock_quantity, ar_model_url, ar_preview_url, multiple_images, size_chart, color_variants, ar_enabled, three_d_model)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', products)
    
    conn.commit()
    
    # Verify products were added
    cursor.execute('SELECT COUNT(*) FROM products')
    count = cursor.fetchone()[0]
    print(f"✅ Added {count} products to database")
    
    # Show products by mood
    cursor.execute('''
        SELECT mood_category, COUNT(*) as count, GROUP_CONCAT(name, ', ') as products
        FROM products 
        GROUP BY mood_category 
        ORDER BY mood_category
    ''')
    
    mood_data = cursor.fetchall()
    print(f"\n📊 Products by Mood:")
    for mood, count, products_list in mood_data:
        print(f"  {mood}: {count} products")
        print(f"    → {products_list[:100]}...")
    
    conn.close()
    print(f"\n🎉 Database created successfully!")
    return True

if __name__ == "__main__":
    create_fresh_database()
