import sqlite3
import json

def check_database():
    """Quick database check"""
    print("🔍 Checking RetailFlowAI Database...")
    print("="*50)
    
    try:
        conn = sqlite3.connect('retailflow.db')
        cursor = conn.cursor()
        
        # Check products
        cursor.execute("SELECT COUNT(*) FROM products")
        product_count = cursor.fetchone()[0]
        print(f"📦 Products in database: {product_count}")
        
        # Check AR enabled products
        cursor.execute("SELECT COUNT(*) FROM products WHERE ar_enabled = 1")
        ar_count = cursor.fetchone()[0]
        print(f"🥽 AR-enabled products: {ar_count}")
        
        # Show first 3 products
        print(f"\n📋 Sample Products:")
        cursor.execute("SELECT id, name, category, price, ar_enabled FROM products LIMIT 3")
        products = cursor.fetchall()
        
        for product in products:
            id_, name, category, price, ar_enabled = product
            ar_status = "✅" if ar_enabled else "❌"
            print(f"   {id_}: {name} | {category} | ${price} | AR: {ar_status}")
        
        # Check categories
        print(f"\n📂 Product Categories:")
        cursor.execute("SELECT category, COUNT(*) FROM products GROUP BY category")
        categories = cursor.fetchall()
        for cat, count in categories:
            print(f"   • {cat}: {count} products")
        
        conn.close()
        print(f"\n✅ Database is working properly!")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    check_database()
