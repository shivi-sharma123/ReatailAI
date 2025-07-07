import sqlite3
import json

# Simple database test
def test_db():
    print("🔍 Testing RetailFlowAI Database...")
    
    try:
        conn = sqlite3.connect('retailflow.db')
        cursor = conn.cursor()
        
        # Count products
        cursor.execute('SELECT COUNT(*) FROM products')
        count = cursor.fetchone()[0]
        print(f"📊 Total products: {count}")
        
        # Get sample products
        cursor.execute('SELECT id, name, emoji, price, ar_enabled FROM products LIMIT 5')
        products = cursor.fetchall()
        
        print("\n🛍️ Sample Products:")
        for p in products:
            ar_status = "🥽" if p[4] else "📷"
            print(f"  {p[0]}. {p[2]} {p[1]} - ${p[3]} {ar_status}")
        
        conn.close()
        print(f"\n✅ Database test completed! Found {count} products.")
        
        if count > 0:
            print("🎉 RetailFlowAI is ready!")
            print("💡 Next steps:")
            print("  1. Start server: python app.py")
            print("  2. Start frontend: npm start")
            print("  3. Open http://localhost:3000")
        else:
            print("⚠️ No products found. Run database initialization.")
            
    except Exception as e:
        print(f"❌ Database error: {e}")

if __name__ == "__main__":
    test_db()
