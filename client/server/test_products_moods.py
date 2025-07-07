import sqlite3

DATABASE = 'retailflow.db'

def test_products_and_moods():
    """Test the products and mood detection"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    print("🛍️ Testing Products in Database...")
    print("="*50)
    
    # Test 1: Count products
    cursor.execute('SELECT COUNT(*) FROM products')
    total = cursor.fetchone()[0]
    print(f"✅ Total products: {total}")
    
    # Test 2: Products by mood
    cursor.execute('''
        SELECT mood_category, COUNT(*) as count 
        FROM products 
        GROUP BY mood_category 
        ORDER BY mood_category
    ''')
    mood_stats = cursor.fetchall()
    
    print(f"\n📊 Products by Mood Category:")
    for mood, count in mood_stats:
        print(f"  • {mood}: {count} products")
    
    # Test 3: Sample products for each mood
    for mood, count in mood_stats:
        print(f"\n{mood.upper()} MOOD PRODUCTS:")
        cursor.execute('''
            SELECT name, price, brand 
            FROM products 
            WHERE mood_category = ?
        ''', (mood,))
        products = cursor.fetchall()
        
        for product in products:
            print(f"  • {product[0]} - ${product[1]} ({product[2]})")
    
    # Test 4: Check images
    cursor.execute('SELECT COUNT(*) FROM products WHERE image_url IS NOT NULL')
    with_images = cursor.fetchone()[0]
    print(f"\n📸 Products with images: {with_images}/{total}")
    
    # Test 5: Check AR support
    cursor.execute('SELECT COUNT(*) FROM products WHERE ar_enabled = 1')
    ar_enabled = cursor.fetchone()[0]
    print(f"🥽 AR-enabled products: {ar_enabled}/{total}")
    
    conn.close()
    print(f"\n✅ Database test completed!")

if __name__ == "__main__":
    test_products_and_moods()
