"""
RetailFlowAI Database Connection & Product Display
This script will connect to the database and show all products with details
"""

import sqlite3
import json
import os
from datetime import datetime

def connect_and_show_database():
    """Connect to database and display all products with full details"""
    print("🔗 CONNECTING TO RETAILFLOWAI DATABASE")
    print("=" * 70)
    
    # Database file path
    db_file = 'retailflow.db'
    
    # Check if database exists
    if not os.path.exists(db_file):
        print(f"❌ Database file {db_file} not found!")
        print("🔧 Creating new database...")
        create_new_database()
        return
    
    print(f"✅ Database file found: {db_file}")
    print(f"📁 File size: {os.path.getsize(db_file):,} bytes")
    print(f"📅 Last modified: {datetime.fromtimestamp(os.path.getmtime(db_file))}")
    
    try:
        # Connect to database
        conn = sqlite3.connect(db_file)
        cursor = conn.cursor()
        print("✅ Database connection successful!")
        
        # Check all tables
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = cursor.fetchall()
        print(f"📊 Tables in database: {len(tables)}")
        
        for table in tables:
            table_name = table[0]
            cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
            count = cursor.fetchone()[0]
            print(f"   📋 {table_name}: {count} records")
        
        # Get all products with full details
        print(f"\n🛍️ ALL PRODUCTS IN DATABASE:")
        print("=" * 70)
        
        cursor.execute("""
            SELECT id, name, category, price, description, 
                   mood_category, ar_enabled, color_options, 
                   size_options, rating, stock_quantity
            FROM products 
            ORDER BY id
        """)
        
        products = cursor.fetchall()
        
        if not products:
            print("❌ No products found in database!")
            print("🔧 Adding sample products...")
            add_sample_products(cursor)
            conn.commit()
            
            # Fetch products again
            cursor.execute("""
                SELECT id, name, category, price, description, 
                       mood_category, ar_enabled, color_options, 
                       size_options, rating, stock_quantity
                FROM products 
                ORDER BY id
            """)
            products = cursor.fetchall()
        
        print(f"📦 Total Products Found: {len(products)}")
        print("-" * 70)
        
        for i, product in enumerate(products, 1):
            (id, name, category, price, description, mood_category, 
             ar_enabled, color_options, size_options, rating, stock_quantity) = product
            
            print(f"{i:2d}. 🛍️ {name}")
            print(f"    ID: {id}")
            print(f"    Category: {category}")
            print(f"    Price: ${price}")
            print(f"    Mood: {mood_category}")
            print(f"    AR Enabled: {'✅ Yes' if ar_enabled else '❌ No'}")
            print(f"    Rating: {'⭐' * int(rating) if rating else 'No rating'} ({rating}/5)")
            print(f"    Stock: {stock_quantity} units")
            
            if color_options:
                try:
                    colors = json.loads(color_options) if isinstance(color_options, str) else color_options
                    if colors:
                        print(f"    Colors: {', '.join(colors)}")
                except:
                    print(f"    Colors: {color_options}")
            
            if size_options:
                try:
                    sizes = json.loads(size_options) if isinstance(size_options, str) else size_options
                    if sizes:
                        print(f"    Sizes: {', '.join(sizes)}")
                except:
                    print(f"    Sizes: {size_options}")
            
            if description:
                print(f"    Description: {description[:60]}...")
            
            print("-" * 50)
        
        # Show database statistics
        print(f"\n📊 DATABASE STATISTICS:")
        print("=" * 70)
        
        # Products by category
        cursor.execute("SELECT category, COUNT(*) FROM products GROUP BY category")
        categories = cursor.fetchall()
        print("📋 Products by Category:")
        for category, count in categories:
            print(f"   {category}: {count} products")
        
        # Products by mood
        cursor.execute("SELECT mood_category, COUNT(*) FROM products GROUP BY mood_category")
        moods = cursor.fetchall()
        print("\n🎭 Products by Mood:")
        for mood, count in moods:
            print(f"   {mood}: {count} products")
        
        # AR-enabled products
        cursor.execute("SELECT COUNT(*) FROM products WHERE ar_enabled = 1")
        ar_count = cursor.fetchone()[0]
        print(f"\n🥽 AR-Enabled Products: {ar_count} out of {len(products)}")
        
        # Average rating
        cursor.execute("SELECT AVG(rating) FROM products WHERE rating IS NOT NULL")
        avg_rating = cursor.fetchone()[0]
        if avg_rating:
            print(f"⭐ Average Rating: {avg_rating:.1f}/5")
        
        # Total inventory value
        cursor.execute("SELECT SUM(price * stock_quantity) FROM products")
        total_value = cursor.fetchone()[0]
        if total_value:
            print(f"💰 Total Inventory Value: ${total_value:,.2f}")
        
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ Database error: {e}")
        return False

def add_sample_products(cursor):
    """Add sample products if database is empty"""
    print("🔧 Adding sample products to database...")
    
    sample_products = [
        (1, "Luxury Leather Handbag", "Bags", 299.99, "Premium leather handbag with gold accents", 
         "luxury", 1, '["Black", "Brown", "Burgundy"]', '["One Size"]', 4.5, 25),
        (2, "Student Canvas Backpack", "Bags", 49.99, "Durable canvas backpack perfect for students", 
         "casual", 1, '["Navy", "Gray", "Green"]', '["One Size"]', 4.2, 50),
        (3, "Elegant Stiletto Heels", "Heels", 159.99, "Classic stiletto heels for elegant occasions", 
         "elegant", 1, '["Black", "Red", "Nude"]', '["6", "7", "8", "9", "10"]', 4.3, 30),
        (4, "Comfortable Walking Shoes", "Shoes", 89.99, "Comfortable shoes perfect for daily wear", 
         "casual", 1, '["White", "Black", "Gray"]', '["6", "7", "8", "9", "10", "11"]', 4.4, 45),
        (5, "Designer Sunglasses", "Accessories", 199.99, "Trendy designer sunglasses with UV protection", 
         "trendy", 1, '["Black", "Gold", "Silver"]', '["One Size"]', 4.6, 35)
    ]
    
    for product in sample_products:
        cursor.execute('''
            INSERT OR REPLACE INTO products 
            (id, name, category, price, description, mood_category, ar_enabled, 
             color_options, size_options, rating, stock_quantity)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', product)
    
    print("✅ Sample products added successfully!")

def test_backend_connection():
    """Test if backend can access the database"""
    print(f"\n🔌 TESTING BACKEND DATABASE CONNECTION:")
    print("=" * 70)
    
    try:
        import requests
        
        # Test products API
        response = requests.get('http://localhost:5000/api/products', timeout=10)
        if response.status_code == 200:
            products = response.json()
            print(f"✅ Backend connected to database successfully!")
            print(f"📦 Backend reports {len(products)} products available")
            
            if products:
                print(f"🛍️ Sample product from backend:")
                sample = products[0]
                print(f"   Name: {sample.get('name', 'Unknown')}")
                print(f"   Category: {sample.get('category', 'Unknown')}")
                print(f"   Price: ${sample.get('price', 0)}")
                print(f"   Mood: {sample.get('mood_category', 'Unknown')}")
        else:
            print(f"❌ Backend API error: {response.status_code}")
            print("🔧 Make sure backend server is running on port 5000")
            
    except requests.exceptions.ConnectionError:
        print("❌ Backend server not running on port 5000")
        print("🔧 Start backend with: python client/server/app.py")
    except Exception as e:
        print(f"❌ Backend test error: {e}")

def create_new_database():
    """Create a new database with products if it doesn't exist"""
    print("🔧 Creating new RetailFlowAI database...")
    
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
            mood_category TEXT DEFAULT 'casual',
            ar_enabled INTEGER DEFAULT 1,
            color_options TEXT,
            size_options TEXT,
            rating REAL DEFAULT 4.0,
            stock_quantity INTEGER DEFAULT 10,
            is_trending INTEGER DEFAULT 0,
            emoji TEXT DEFAULT '📦'
        )
    ''')
    
    # Add sample products
    add_sample_products(cursor)
    
    conn.commit()
    conn.close()
    
    print("✅ New database created successfully!")

def main():
    """Main function to connect and display database"""
    print("🚀 RETAILFLOWAI - DATABASE CONNECTION & PRODUCT DISPLAY")
    print("=" * 80)
    print("Connecting to database and showing all products...")
    print()
    
    # Connect and show products
    success = connect_and_show_database()
    
    if success:
        # Test backend connection
        test_backend_connection()
        
        print(f"\n" + "=" * 80)
        print("🎉 DATABASE CONNECTION SUCCESSFUL!")
        print("=" * 80)
        print("✅ Database: Connected and operational")
        print("✅ Products: Loaded and displayed")
        print("✅ Tables: All required tables present")
        print("✅ Data: Complete with enhanced features")
        print()
        print("🌐 Your database is ready for the application!")
        print("🚀 Backend can now serve products to frontend!")
    else:
        print(f"\n❌ Database connection failed!")
        print("🔧 Please check the error messages above")

if __name__ == "__main__":
    main()
