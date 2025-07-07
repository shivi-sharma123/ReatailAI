"""
Test script to verify database setup and populate with sample data if needed
"""
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'server'))

from database import init_database, get_all_products
import sqlite3

def test_database():
    print("🔧 Initializing database...")
    init_database()
    
    print("📊 Checking products in database...")
    products = get_all_products()
    
    print(f"✅ Found {len(products)} products in database")
    
    if len(products) > 0:
        print("\n📦 Sample products:")
        for i, product in enumerate(products[:3]):
            print(f"   {i+1}. {product.get('name', 'Unknown')} - ${product.get('price', 0)}")
        if len(products) > 3:
            print(f"   ... and {len(products) - 3} more products")
    else:
        print("⚠️  No products found. Running setup_images.py to populate database...")
        try:
            exec(open('server/setup_images.py').read())
            products = get_all_products()
            print(f"✅ Database now has {len(products)} products")
        except Exception as e:
            print(f"❌ Error setting up products: {e}")
    
    # Test database connectivity
    try:
        conn = sqlite3.connect('server/retailflow.db')
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM products")
        count = cursor.fetchone()[0]
        conn.close()
        print(f"🔗 Database connection test: SUCCESS ({count} products)")
    except Exception as e:
        print(f"❌ Database connection test: FAILED - {e}")
    
    print("\n🚀 Database is ready for the application!")

if __name__ == "__main__":
    test_database()
