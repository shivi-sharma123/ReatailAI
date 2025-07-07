import sqlite3
import json
import os

def check_and_setup_database():
    """Check and setup the database with full functionality"""
    
    # Database path
    DATABASE = 'retailflow.db'
    
    print(f"📁 Checking database: {os.path.abspath(DATABASE)}")
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Check existing tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tables = cursor.fetchall()
    print(f"📊 Existing tables: {[table[0] for table in tables]}")
    
    # Create products table with all columns
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
        mood_category TEXT,
        images TEXT,
        colors TEXT,
        sizes TEXT
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
    
    # Check if products exist
    cursor.execute('SELECT COUNT(*) FROM products')
    product_count = cursor.fetchone()[0]
    print(f"🛍️ Current products count: {product_count}")
    
    # If no products, add sample products
    if product_count == 0:
        print("➕ Adding sample products...")
        
        sample_products = [
            # Happy mood products
            (
                "Stylish Sunglasses", "Accessories", 129.99, 
                "Premium UV protection sunglasses with trendy design", "😎",
                "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
                "TrendyShades", 4.8, True, 50, True, "sunglasses,trendy,summer", "happy",
                json.dumps(["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400"]),
                json.dumps(["Black", "Brown", "Blue"]),
                json.dumps(["One Size"])
            ),
            (
                "Summer Floral Dress", "Clothing", 89.99,
                "Beautiful floral dress perfect for sunny days", "🌸",
                "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
                "FloralFashion", 4.7, True, 30, True, "dress,floral,summer", "happy",
                json.dumps(["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400"]),
                json.dumps(["Pink", "Blue", "White"]),
                json.dumps(["XS", "S", "M", "L", "XL"])
            ),
            
            # Natural mood products
            (
                "Classic Denim Jeans", "Clothing", 79.99,
                "Comfortable everyday jeans with perfect fit", "👖",
                "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
                "DenimCo", 4.6, False, 75, True, "jeans,denim,casual", "natural",
                json.dumps(["https://images.unsplash.com/photo-1542272604-787c3835535d?w=400"]),
                json.dumps(["Blue", "Black", "Gray"]),
                json.dumps(["28", "30", "32", "34", "36"])
            ),
            (
                "Organic Cotton T-Shirt", "Clothing", 29.99,
                "Soft organic cotton t-shirt for everyday comfort", "👕",
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
                "EcoWear", 4.5, False, 100, True, "tshirt,organic,casual", "natural",
                json.dumps(["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"]),
                json.dumps(["White", "Gray", "Navy"]),
                json.dumps(["XS", "S", "M", "L", "XL", "XXL"])
            ),
            
            # Professional mood products
            (
                "Leather Business Bag", "Accessories", 199.99,
                "Premium leather briefcase for professionals", "💼",
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
                "ProBags", 4.9, True, 25, True, "bag,leather,business", "professional",
                json.dumps(["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"]),
                json.dumps(["Brown", "Black", "Tan"]),
                json.dumps(["One Size"])
            ),
            (
                "Business Blazer", "Clothing", 159.99,
                "Elegant blazer for professional occasions", "🧥",
                "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
                "SuitStyle", 4.7, False, 40, True, "blazer,formal,business", "professional",
                json.dumps(["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400"]),
                json.dumps(["Navy", "Black", "Gray"]),
                json.dumps(["XS", "S", "M", "L", "XL"])
            ),
            
            # Rainy mood products
            (
                "Waterproof Umbrella", "Accessories", 45.99,
                "Durable umbrella to keep you dry", "☂️",
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
                "RainGuard", 4.4, False, 60, True, "umbrella,rain,weather", "rainy",
                json.dumps(["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"]),
                json.dumps(["Black", "Navy", "Red"]),
                json.dumps(["One Size"])
            ),
            (
                "Rain Boots", "Footwear", 69.99,
                "Waterproof boots for rainy days", "🥾",
                "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400",
                "WeatherWear", 4.3, False, 35, True, "boots,rain,waterproof", "rainy",
                json.dumps(["https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400"]),
                json.dumps(["Black", "Green", "Yellow"]),
                json.dumps(["6", "7", "8", "9", "10", "11"])
            ),
            
            # Sad/comfort mood products
            (
                "Cozy Sweater", "Clothing", 79.99,
                "Soft and warm sweater for comfort", "🧶",
                "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400",
                "ComfortWear", 4.8, False, 45, True, "sweater,cozy,comfort", "sad",
                json.dumps(["https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400"]),
                json.dumps(["Cream", "Gray", "Pink"]),
                json.dumps(["XS", "S", "M", "L", "XL"])
            ),
            (
                "Comfort Slippers", "Footwear", 39.99,
                "Ultra-soft slippers for relaxation", "🥿",
                "https://images.unsplash.com/photo-1581553673739-c4906b5d0de8?w=400",
                "RelaxFeet", 4.6, False, 80, True, "slippers,comfort,home", "sad",
                json.dumps(["https://images.unsplash.com/photo-1581553673739-c4906b5d0de8?w=400"]),
                json.dumps(["Beige", "Pink", "Gray"]),
                json.dumps(["6", "7", "8", "9", "10"])
            )
        ]
        
        for product in sample_products:
            cursor.execute('''
                INSERT INTO products (name, category, price, description, emoji, image_url, brand, rating, 
                                    is_trending, stock_quantity, ar_enabled, tags, mood_category, images, colors, sizes)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', product)
            
            # Add analytics entry for each product
            product_id = cursor.lastrowid
            cursor.execute('INSERT INTO analytics (product_id) VALUES (?)', (product_id,))
        
        print(f"✅ Added {len(sample_products)} sample products")
    
    # Commit changes
    conn.commit()
    
    # Final check
    cursor.execute('SELECT COUNT(*) FROM products')
    final_count = cursor.fetchone()[0]
    
    cursor.execute('SELECT COUNT(*) FROM analytics')
    analytics_count = cursor.fetchone()[0]
    
    print(f"✅ Database setup complete!")
    print(f"📊 Total products: {final_count}")
    print(f"📈 Analytics entries: {analytics_count}")
    print(f"🗄️ Database location: {os.path.abspath(DATABASE)}")
    
    # Test database connection
    cursor.execute('SELECT name, category, mood_category FROM products LIMIT 3')
    test_products = cursor.fetchall()
    print(f"🧪 Test query successful - Sample products:")
    for product in test_products:
        print(f"   - {product[0]} ({product[1]}) - {product[2]} mood")
    
    conn.close()
    return True

if __name__ == "__main__":
    check_and_setup_database()
