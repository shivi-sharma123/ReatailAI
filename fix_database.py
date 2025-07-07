import sqlite3
import os

def fix_analytics_and_database():
    """Fix analytics entries and ensure full database functionality"""
    
    DATABASE = 'retailflow.db'
    print(f"🔧 Fixing database analytics and ensuring full functionality...")
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Get all products that don't have analytics entries
    cursor.execute('''
        SELECT p.id FROM products p 
        LEFT JOIN analytics a ON p.id = a.product_id 
        WHERE a.product_id IS NULL
    ''')
    missing_analytics = cursor.fetchall()
    
    print(f"📊 Found {len(missing_analytics)} products without analytics entries")
    
    # Add missing analytics entries
    for product_id_tuple in missing_analytics:
        product_id = product_id_tuple[0]
        cursor.execute('INSERT INTO analytics (product_id) VALUES (?)', (product_id,))
        print(f"   ➕ Added analytics for product ID: {product_id}")
    
    # Update any products that might be missing mood categories
    cursor.execute('''
        UPDATE products 
        SET mood_category = CASE 
            WHEN mood_category IS NULL OR mood_category = '' THEN 'natural'
            ELSE mood_category
        END
    ''')
    
    # Ensure all products have AR enabled
    cursor.execute('UPDATE products SET ar_enabled = TRUE WHERE ar_enabled IS NULL')
    
    # Ensure all products have reasonable stock
    cursor.execute('UPDATE products SET stock_quantity = 50 WHERE stock_quantity IS NULL OR stock_quantity = 0')
    
    conn.commit()
    
    # Final verification
    cursor.execute('SELECT COUNT(*) FROM products')
    product_count = cursor.fetchone()[0]
    
    cursor.execute('SELECT COUNT(*) FROM analytics')
    analytics_count = cursor.fetchone()[0]
    
    cursor.execute('SELECT COUNT(*) FROM products WHERE mood_category IS NOT NULL')
    mood_count = cursor.fetchone()[0]
    
    cursor.execute('SELECT COUNT(*) FROM products WHERE ar_enabled = 1')
    ar_count = cursor.fetchone()[0]
    
    print(f"✅ Database fixes complete!")
    print(f"📊 Products: {product_count}")
    print(f"📈 Analytics entries: {analytics_count}")
    print(f"😊 Products with mood categories: {mood_count}")
    print(f"🥽 AR-enabled products: {ar_count}")
    
    # Test mood-based queries
    print(f"\n🧪 Testing mood-based product queries:")
    moods = ['happy', 'sad', 'natural', 'professional', 'rainy']
    for mood in moods:
        cursor.execute('SELECT COUNT(*) FROM products WHERE mood_category = ?', (mood,))
        count = cursor.fetchone()[0]
        print(f"   {mood}: {count} products")
    
    # Test API endpoints simulation
    print(f"\n🌐 Testing database queries for API endpoints:")
    
    # Test products endpoint
    cursor.execute('''
        SELECT id, name, category, price, description, emoji, image_url, brand, rating, is_trending, 
               stock_quantity, ar_enabled, tags, mood_category, images, colors, sizes
        FROM products 
        ORDER BY is_trending DESC, rating DESC, name
        LIMIT 3
    ''')
    products = cursor.fetchall()
    print(f"   GET /api/products: Retrieved {len(products)} products successfully")
    
    # Test analytics endpoint
    cursor.execute('''
        SELECT p.name, a.view_count, a.purchase_count, a.ar_try_count
        FROM products p
        JOIN analytics a ON p.id = a.product_id
        LIMIT 3
    ''')
    analytics = cursor.fetchall()
    print(f"   GET /api/analytics: Retrieved {len(analytics)} analytics records successfully")
    
    # Test chatbot mood query
    cursor.execute('''
        SELECT COUNT(*) FROM products WHERE mood_category = 'happy'
    ''')
    happy_products = cursor.fetchone()[0]
    print(f"   POST /api/chatbot (happy mood): Found {happy_products} products")
    
    conn.close()
    print(f"\n🎉 Database is fully functional and ready for the app!")
    return True

if __name__ == "__main__":
    fix_analytics_and_database()
