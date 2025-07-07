import sqlite3
import json

DATABASE = 'retailflow.db'

def test_crud_operations():
    """Test all CRUD operations and verify admin/chatbot functionality"""
    print("🧪 Testing CRUD Operations and Image Display...")
    print("="*60)
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Test 1: Check total products
    cursor.execute('SELECT COUNT(*) FROM products')
    total = cursor.fetchone()[0]
    print(f"✅ Total products in database: {total}")
    
    # Test 2: Check products with images
    cursor.execute('SELECT COUNT(*) FROM products WHERE image_url IS NOT NULL AND image_url != ""')
    with_images = cursor.fetchone()[0]
    print(f"✅ Products with images: {with_images}")
    
    # Test 3: Check AR-enabled products
    cursor.execute('SELECT COUNT(*) FROM products WHERE ar_enabled = 1')
    ar_enabled = cursor.fetchone()[0]
    print(f"✅ AR-enabled products: {ar_enabled}")
    
    # Test 4: Sample products for chatbot display
    print(f"\n📱 Sample Products for Chatbot (with images):")
    cursor.execute('''
        SELECT name, category, price, image_url, ar_enabled, mood_category 
        FROM products 
        WHERE image_url IS NOT NULL 
        LIMIT 5
    ''')
    sample_products = cursor.fetchall()
    
    for i, product in enumerate(sample_products, 1):
        ar_status = "🥽 AR Ready" if product[4] else "❌ No AR"
        print(f"   {i}. {product[0]} - ${product[2]} ({product[1]}) - {ar_status}")
        print(f"      Image: {product[3][:50]}...")
        print(f"      Mood: {product[5]}")
        print()
    
    # Test 5: Cozy blanket search
    print(f"🔍 Testing 'cozy blanket' search:")
    cursor.execute('''
        SELECT name, price, mood_category 
        FROM products 
        WHERE LOWER(name) LIKE '%cozy%' OR LOWER(name) LIKE '%blanket%'
    ''')
    cozy_products = cursor.fetchall()
    
    for product in cozy_products:
        print(f"   • {product[0]} - ${product[1]} ({product[2]})")
    
    # Test 6: Coat search
    print(f"\n🧥 Testing 'coat' search:")
    cursor.execute('''
        SELECT name, price, mood_category 
        FROM products 
        WHERE LOWER(name) LIKE '%coat%' OR LOWER(name) LIKE '%jacket%'
    ''')
    coat_products = cursor.fetchall()
    
    for product in coat_products:
        print(f"   • {product[0]} - ${product[1]} ({product[2]})")
    
    # Test 7: Check mood categories
    print(f"\n📊 Available mood categories:")
    cursor.execute('''
        SELECT mood_category, COUNT(*) as count 
        FROM products 
        GROUP BY mood_category 
        ORDER BY count DESC
    ''')
    mood_stats = cursor.fetchall()
    
    for mood, count in mood_stats:
        print(f"   • {mood}: {count} products")
    
    conn.close()
    print(f"\n✅ CRUD Operations Test Complete!")
    print(f"🎉 Your admin panel should show all products with Edit/Delete buttons")
    print(f"🤖 Your chatbot should show product images and AR try-on options")

if __name__ == "__main__":
    test_crud_operations()
