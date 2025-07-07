import sqlite3
import os

def create_complete_database():
    """Create a complete working database with all products"""
    
    # Remove existing database if it exists
    if os.path.exists('retailflow.db'):
        os.remove('retailflow.db')
        print("Removed existing database")
    
    conn = sqlite3.connect('retailflow.db')
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
    
    # Insert products with AR technology
    products = [
        # Happy mood products
        ("Ray-Ban Aviator Sunglasses", "sunglasses", 159.99, "Classic aviator sunglasses perfect for sunny days", "😎", 
         "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400", "Ray-Ban", 4.8, True, 50, True, "sunglasses,aviator,fashion", "happy"),
        
        ("Oakley Sport Sunglasses", "sunglasses", 129.99, "High-performance sports sunglasses", "🕶️", 
         "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400", "Oakley", 4.7, True, 30, True, "sunglasses,sport,performance", "happy"),
        
        ("Vintage Round Sunglasses", "sunglasses", 89.99, "Trendy vintage-style round sunglasses", "🕶️", 
         "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400", "Vintage Co", 4.5, False, 25, True, "sunglasses,vintage,round", "happy"),
        
        # Natural mood products
        ("Classic White T-Shirt", "t-shirt", 29.99, "Comfortable cotton t-shirt for everyday wear", "👕", 
         "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", "BasicWear", 4.6, True, 100, True, "t-shirt,cotton,casual", "natural"),
        
        ("Graphic Design T-Shirt", "t-shirt", 39.99, "Cool graphic design t-shirt", "👕", 
         "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400", "DesignCo", 4.4, False, 75, True, "t-shirt,graphic,design", "natural"),
        
        ("Premium Cotton Polo", "polo", 59.99, "High-quality cotton polo shirt", "👔", 
         "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400", "Premium", 4.7, True, 60, True, "polo,cotton,premium", "natural"),
        
        # Rainy mood products
        ("Waterproof Rain Jacket", "jacket", 199.99, "Fully waterproof jacket for rainy days", "🧥", 
         "https://images.unsplash.com/photo-1544966503-7cc4ac882d2d?w=400", "WeatherPro", 4.9, True, 40, True, "jacket,waterproof,rain", "rainy"),
        
        ("Lightweight Raincoat", "raincoat", 149.99, "Lightweight and packable raincoat", "🧥", 
         "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400", "RainGear", 4.6, False, 35, True, "raincoat,lightweight,packable", "rainy"),
        
        ("Storm-Shield Jacket", "jacket", 249.99, "Heavy-duty jacket for extreme weather", "🧥", 
         "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400", "StormShield", 4.8, True, 20, True, "jacket,heavy-duty,storm", "rainy"),
        
        # Sad mood products (comfort wear)
        ("Cozy Comfort Hoodie", "hoodie", 79.99, "Super soft hoodie for maximum comfort", "🥰", 
         "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400", "ComfortWear", 4.8, True, 80, True, "hoodie,comfort,soft", "sad"),
        
        ("Warm Fleece Jacket", "jacket", 119.99, "Warm fleece jacket for cold days", "🧥", 
         "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400", "WarmCo", 4.5, False, 45, True, "jacket,fleece,warm", "sad"),
        
        ("Comfort Sweatshirt", "sweatshirt", 69.99, "Ultra-comfortable sweatshirt", "👚", 
         "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400", "Comfort+", 4.6, True, 70, True, "sweatshirt,comfort,cozy", "sad")
    ]
    
    cursor.executemany('''
    INSERT INTO products (name, category, price, description, emoji, image_url, brand, rating, is_trending, stock_quantity, ar_enabled, tags, mood_category)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', products)
    
    # Create analytics entries for all products
    cursor.execute('SELECT id FROM products')
    product_ids = cursor.fetchall()
    
    analytics_data = []
    for product_id in product_ids:
        analytics_data.append((product_id[0], 10, 2, 5))  # view_count, purchase_count, ar_try_count
    
    cursor.executemany('''
    INSERT INTO analytics (product_id, view_count, purchase_count, ar_try_count)
    VALUES (?, ?, ?, ?)
    ''', analytics_data)
    
    conn.commit()
    
    # Verify the data
    cursor.execute('SELECT COUNT(*) FROM products')
    product_count = cursor.fetchone()[0]
    
    cursor.execute('SELECT mood_category, COUNT(*) FROM products GROUP BY mood_category')
    mood_counts = cursor.fetchall()
    
    print(f"✅ Database created successfully!")
    print(f"✅ Total products: {product_count}")
    print("✅ Products by mood:")
    for mood, count in mood_counts:
        print(f"   {mood}: {count} products")
    
    conn.close()
    return True

if __name__ == "__main__":
    create_complete_database()
