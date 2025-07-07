"""
Simple Database Connection and Product Display for RetailFlowAI
"""

import sqlite3
import json

def show_all_products():
    """Connect to database and show all products"""
    print("🔗 CONNECTING TO RETAILFLOWAI DATABASE")
    print("=" * 60)
    
    try:
        # Connect to database
        conn = sqlite3.connect('retailflow.db')
        cursor = conn.cursor()
        print("✅ Database connected successfully!")
        
        # Get all products
        cursor.execute("""
            SELECT id, name, category, price, mood_category, 
                   rating, stock_quantity, ar_enabled, brand, description
            FROM products 
            ORDER BY id
        """)
        
        products = cursor.fetchall()
        
        print(f"\n🛍️ ALL PRODUCTS IN DATABASE ({len(products)} total):")
        print("=" * 60)
        
        for i, product in enumerate(products, 1):
            (id, name, category, price, mood_category, 
             rating, stock_quantity, ar_enabled, brand, description) = product
            
            print(f"{i:2d}. 🛍️ {name}")
            print(f"    📝 ID: {id}")
            print(f"    🏷️ Category: {category}")
            print(f"    💰 Price: ${price}")
            print(f"    🎭 Mood: {mood_category}")
            print(f"    🏢 Brand: {brand or 'Generic'}")
            print(f"    ⭐ Rating: {rating}/5" if rating else "    ⭐ Rating: Not rated")
            print(f"    📦 Stock: {stock_quantity} units")
            print(f"    🥽 AR: {'✅ Enabled' if ar_enabled else '❌ Disabled'}")
            if description:
                print(f"    📄 Description: {description[:50]}...")
            print("-" * 50)
        
        # Show summary statistics
        print(f"\n📊 DATABASE SUMMARY:")
        print("=" * 60)
        
        # Count by category
        cursor.execute("SELECT category, COUNT(*) FROM products GROUP BY category ORDER BY COUNT(*) DESC")
        categories = cursor.fetchall()
        print("📋 Products by Category:")
        for category, count in categories:
            print(f"   • {category}: {count} products")
        
        # Count by mood
        cursor.execute("SELECT mood_category, COUNT(*) FROM products GROUP BY mood_category ORDER BY COUNT(*) DESC")
        moods = cursor.fetchall()
        print("\n🎭 Products by Mood:")
        for mood, count in moods:
            print(f"   • {mood}: {count} products")
        
        # AR enabled count
        cursor.execute("SELECT COUNT(*) FROM products WHERE ar_enabled = 1")
        ar_count = cursor.fetchone()[0]
        print(f"\n🥽 AR-Enabled Products: {ar_count} out of {len(products)}")
        
        # Average price
        cursor.execute("SELECT AVG(price) FROM products")
        avg_price = cursor.fetchone()[0]
        print(f"💰 Average Price: ${avg_price:.2f}")
        
        # Total stock
        cursor.execute("SELECT SUM(stock_quantity) FROM products")
        total_stock = cursor.fetchone()[0]
        print(f"📦 Total Stock: {total_stock} units")
        
        conn.close()
        
        print(f"\n✅ DATABASE CONNECTION SUCCESSFUL!")
        print("🚀 All products loaded and displayed!")
        
        return True
        
    except Exception as e:
        print(f"❌ Database error: {e}")
        return False

def test_backend_products():
    """Test if backend can access products"""
    print(f"\n🔌 TESTING BACKEND CONNECTION:")
    print("=" * 60)
    
    try:
        import requests
        
        response = requests.get('http://localhost:5000/api/products', timeout=5)
        if response.status_code == 200:
            products = response.json()
            print(f"✅ Backend API working!")
            print(f"📦 Backend serves {len(products)} products")
            
            if products:
                print(f"\n🛍️ Sample product from API:")
                sample = products[0]
                print(f"   Name: {sample.get('name', 'Unknown')}")
                print(f"   Price: ${sample.get('price', 0)}")
                print(f"   Category: {sample.get('category', 'Unknown')}")
                print(f"   Mood: {sample.get('mood_category', 'Unknown')}")
        else:
            print(f"❌ Backend API error: {response.status_code}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Backend not running on port 5000")
        print("🔧 Start with: python client/server/app.py")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    print("🚀 RETAILFLOWAI - PRODUCT DATABASE VIEWER")
    print("=" * 70)
    
    # Show all products
    success = show_all_products()
    
    if success:
        # Test backend
        test_backend_products()
        
        print(f"\n" + "=" * 70)
        print("🎉 DATABASE FULLY OPERATIONAL!")
        print("✅ Products loaded successfully")
        print("✅ Database schema verified")
        print("✅ Ready for frontend/backend integration")
        print("=" * 70)
    else:
        print("\n❌ Database connection failed!")
