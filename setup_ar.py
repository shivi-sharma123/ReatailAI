#!/usr/bin/env python3

import sys
import os
import sqlite3

# Change to the server directory
server_dir = r'c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\server'
os.chdir(server_dir)

def setup_ar_database():
    try:
        print("🔧 Setting up AR-enabled products...")
        
        # Connect to database
        conn = sqlite3.connect('retailflow.db')
        cursor = conn.cursor()
        
        # Check if products table exists
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='products'")
        if not cursor.fetchone():
            print("❌ Products table doesn't exist!")
            return False
        
        # Enable AR for all products
        cursor.execute('UPDATE products SET ar_enabled = 1')
        affected = cursor.rowcount
        
        # Get counts
        cursor.execute('SELECT COUNT(*) FROM products')
        total = cursor.fetchone()[0]
        
        cursor.execute('SELECT COUNT(*) FROM products WHERE ar_enabled = 1')
        ar_enabled = cursor.fetchone()[0]
        
        # Sample some products
        cursor.execute('''
            SELECT name, category, price, ar_enabled, 
                   CASE WHEN image_url IS NOT NULL THEN 'Yes' ELSE 'No' END as has_image
            FROM products 
            LIMIT 5
        ''')
        samples = cursor.fetchall()
        
        conn.commit()
        conn.close()
        
        print(f"✅ Updated {affected} products with AR enabled")
        print(f"📊 Total products: {total}")
        print(f"🥽 AR-enabled products: {ar_enabled}")
        print("\n📋 Sample products:")
        for product in samples:
            name, category, price, ar, has_img = product
            print(f"  • {name} ({category}) - ${price} - AR: {'✅' if ar else '❌'} - Image: {has_img}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    if setup_ar_database():
        print("\n🎉 AR database setup complete!")
        print("🚀 Now test your app at http://localhost:3000")
        print("💡 Try saying 'show me sunglasses' and click '🥽 Try in AR'")
    else:
        print("\n💥 Setup failed!")
        sys.exit(1)
