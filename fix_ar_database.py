import sqlite3
import os

def enable_ar_for_products():
    # Set working directory
    server_path = r'c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\server'
    os.chdir(server_path)
    
    try:
        # Connect to database
        conn = sqlite3.connect('retailflow.db')
        cursor = conn.cursor()
        
        # Update all products to have AR enabled
        cursor.execute('UPDATE products SET ar_enabled = 1')
        affected = cursor.rowcount
        
        # Verify the change
        cursor.execute('SELECT COUNT(*) FROM products WHERE ar_enabled = 1')
        ar_count = cursor.fetchone()[0]
        
        cursor.execute('SELECT COUNT(*) FROM products')
        total_count = cursor.fetchone()[0]
        
        conn.commit()
        conn.close()
        
        print(f"✅ Successfully enabled AR for {affected} products")
        print(f"📊 Total products: {total_count}")
        print(f"🥽 AR-enabled products: {ar_count}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error enabling AR: {e}")
        return False

if __name__ == "__main__":
    enable_ar_for_products()
