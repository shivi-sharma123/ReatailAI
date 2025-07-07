import sqlite3

DATABASE = 'retailflow.db'

def test_new_products():
    """Test the new products and search functionality"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    print("🔍 Testing New Products Search...")
    print("="*50)
    
    # Test 1: Search for cozy blankets
    print("\n1. Searching for 'cozy blanket':")
    cursor.execute('''
        SELECT name, category, price, mood_category 
        FROM products 
        WHERE LOWER(name) LIKE '%cozy%' OR LOWER(name) LIKE '%blanket%'
        ORDER BY name
    ''')
    results = cursor.fetchall()
    for product in results:
        print(f"   • {product[0]} - ${product[2]} ({product[1]}) [{product[3]}]")
    
    # Test 2: Search for coats
    print("\n2. Searching for 'coat':")
    cursor.execute('''
        SELECT name, category, price, mood_category 
        FROM products 
        WHERE LOWER(name) LIKE '%coat%' OR LOWER(name) LIKE '%jacket%'
        ORDER BY name
    ''')
    results = cursor.fetchall()
    for product in results:
        print(f"   • {product[0]} - ${product[2]} ({product[1]}) [{product[3]}]")
    
    # Test 3: Count total products
    print("\n3. Total products in database:")
    cursor.execute('SELECT COUNT(*) FROM products')
    total = cursor.fetchone()[0]
    print(f"   Total: {total} products")
    
    # Test 4: Products by mood category
    print("\n4. Products by mood category:")
    cursor.execute('''
        SELECT mood_category, COUNT(*) as count 
        FROM products 
        GROUP BY mood_category 
        ORDER BY count DESC
    ''')
    results = cursor.fetchall()
    for mood, count in results:
        print(f"   • {mood}: {count} products")
    
    # Test 5: AR-enabled products
    print("\n5. AR-enabled products:")
    cursor.execute('''
        SELECT COUNT(*) 
        FROM products 
        WHERE ar_enabled = 1
    ''')
    ar_count = cursor.fetchone()[0]
    print(f"   AR-enabled: {ar_count} products")
    
    conn.close()
    print("\n✅ Product search test completed!")

if __name__ == "__main__":
    test_new_products()
