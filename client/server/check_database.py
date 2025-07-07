import sqlite3

def check_database():
    try:
        conn = sqlite3.connect('retailflow.db')
        cursor = conn.cursor()
        
        # Check tables
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = cursor.fetchall()
        print("Tables:", tables)
        
        # Check products count
        cursor.execute("SELECT COUNT(*) FROM products")
        count = cursor.fetchone()[0]
        print(f"Product count: {count}")
        
        # Show first few products
        cursor.execute("SELECT id, name, category, mood_category FROM products LIMIT 5")
        products = cursor.fetchall()
        print("Sample products:")
        for product in products:
            print(f"  {product}")
            
        conn.close()
        
    except Exception as e:
        print(f"Database error: {e}")

if __name__ == "__main__":
    check_database()
