import sqlite3
import os

def setup_complete_database():
    """Create fresh database with all required tables and products"""
    print("Setting up complete database...")
    
    # Remove existing database if it exists
    if os.path.exists('retailflow.db'):
        os.remove('retailflow.db')
        print("Removed existing database")
    
    # Create connection
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
            rating REAL DEFAULT 4.0,
            is_trending BOOLEAN DEFAULT 0,
            stock_quantity INTEGER DEFAULT 100,
            ar_enabled BOOLEAN DEFAULT 1,
            tags TEXT,
            mood_category TEXT DEFAULT 'natural'
        )
    ''')
    
    # Create users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            address TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create cart table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS cart (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            product_id INTEGER,
            quantity INTEGER DEFAULT 1,
            FOREIGN KEY (user_id) REFERENCES users (id),
            FOREIGN KEY (product_id) REFERENCES products (id)
        )
    ''')
    
    # Add essential products
    products = [
        # Happy mood products
        ("Ray-Ban Aviator Sunglasses", "Accessories", 159.99, "Classic aviator sunglasses perfect for sunny days", "😎", "https://images.unsplash.com/photo-1572635196237-14b3f281503f", "Ray-Ban", 4.8, 1, 50, 1, "sunglasses,aviation,classic", "happy"),
        ("Oakley Sport Sunglasses", "Accessories", 129.99, "Sport sunglasses for active lifestyle", "🕶️", "https://images.unsplash.com/photo-1511499767150-a48a237f0083", "Oakley", 4.7, 1, 30, 1, "sport,sunglasses,active", "happy"),
        ("Bright Yellow T-Shirt", "Clothing", 29.99, "Cheerful yellow t-shirt to brighten your day", "👕", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", "SunnyWear", 4.5, 0, 100, 1, "yellow,bright,cotton", "happy"),
        
        # Sad/Comfort mood products
        ("Cozy Gray Hoodie", "Clothing", 79.99, "Soft and warm hoodie for comfort", "👕", "https://images.unsplash.com/photo-1556821840-3a63f95609a7", "ComfortZone", 4.6, 1, 75, 1, "hoodie,comfort,warm", "sad"),
        ("Soft Throw Blanket", "Home", 49.99, "Ultra-soft blanket for cozy moments", "🛋️", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7", "CozyHome", 4.9, 0, 40, 0, "blanket,soft,comfort", "sad"),
        ("Lavender Scented Candle", "Home", 24.99, "Relaxing lavender candle for peaceful moments", "🕯️", "https://images.unsplash.com/photo-1602874801006-a1baa0d75ce8", "Peaceful", 4.4, 0, 60, 0, "candle,lavender,relaxing", "sad"),
        
        # Natural/Casual mood products
        ("Classic White T-Shirt", "Clothing", 19.99, "Essential white cotton t-shirt", "👕", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", "Basics", 4.3, 0, 200, 1, "white,basic,cotton", "natural"),
        ("Denim Jeans", "Clothing", 89.99, "Classic blue denim jeans", "👖", "https://images.unsplash.com/photo-1542272604-787c3835535d", "DenimCo", 4.5, 1, 120, 1, "jeans,denim,classic", "natural"),
        ("Canvas Sneakers", "Footwear", 69.99, "Comfortable canvas sneakers", "👟", "https://images.unsplash.com/photo-1549298916-b41d501d3772", "WalkEasy", 4.4, 0, 80, 1, "sneakers,canvas,comfortable", "natural"),
        
        # Rainy mood products
        ("Waterproof Rain Jacket", "Clothing", 119.99, "Stay dry with this waterproof jacket", "🧥", "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e", "WeatherShield", 4.7, 1, 45, 1, "raincoat,waterproof,weather", "rainy"),
        ("Compact Umbrella", "Accessories", 34.99, "Portable umbrella for sudden showers", "☂️", "https://images.unsplash.com/photo-1458419948946-19fb2cc296af", "RainGuard", 4.2, 0, 90, 0, "umbrella,portable,rain", "rainy"),
        ("Waterproof Boots", "Footwear", 99.99, "Keep your feet dry in any weather", "👢", "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e", "DriFeet", 4.6, 0, 35, 1, "boots,waterproof,weather", "rainy")
    ]
    
    cursor.executemany('''
        INSERT INTO products (name, category, price, description, emoji, image_url, brand, rating, is_trending, stock_quantity, ar_enabled, tags, mood_category)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', products)
    
    conn.commit()
    
    # Verify the setup
    cursor.execute("SELECT COUNT(*) FROM products")
    count = cursor.fetchone()[0]
    print(f"✅ Database setup complete! Added {count} products")
    
    # Show products by mood
    moods = ['happy', 'sad', 'natural', 'rainy']
    for mood in moods:
        cursor.execute("SELECT COUNT(*) FROM products WHERE mood_category = ?", (mood,))
        mood_count = cursor.fetchone()[0]
        print(f"   {mood.capitalize()} mood: {mood_count} products")
    
    conn.close()
    return True

if __name__ == "__main__":
    setup_complete_database()
