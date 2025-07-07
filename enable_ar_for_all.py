import sqlite3
import os

# Ensure we're in the right directory
os.chdir('c:/Users/sharm/OneDrive/Desktop/RetailFlowAI/client/server')

try:
    # Connect to database
    conn = sqlite3.connect('retailflow.db')
    cursor = conn.cursor()
    
    # Enable AR for all products
    cursor.execute('UPDATE products SET ar_enabled = 1 WHERE ar_enabled IS NULL OR ar_enabled = 0')
    affected_rows = cursor.rowcount
    
    # Check total products
    cursor.execute('SELECT COUNT(*) FROM products')
    total = cursor.fetchone()[0]
    
    # Check AR enabled products now
    cursor.execute('SELECT COUNT(*) FROM products WHERE ar_enabled = 1')
    ar_enabled = cursor.fetchone()[0]
    
    conn.commit()
    print(f"✅ AR enabled for {affected_rows} products")
    print(f"📦 Total products: {total}")
    print(f"🥽 AR-enabled products: {ar_enabled}")
    
    # Show some sample products
    cursor.execute('SELECT name, category, ar_enabled FROM products LIMIT 5')
    products = cursor.fetchall()
    print(f"\n📋 Sample products:")
    for p in products:
        print(f"  - {p[0]} ({p[1]}) - AR: {'✅' if p[2] else '❌'}")
    
    conn.close()
    print("\n🎉 All products now have AR enabled!")
    
except Exception as e:
    print(f"❌ Error: {e}")
