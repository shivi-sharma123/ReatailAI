import sqlite3
import os

# Change to the client directory
db_path = r"c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\retailflow.db"

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Check tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    print("Tables:", tables)
    
    # Check products table
    if tables:
        cursor.execute("SELECT * FROM products LIMIT 5")
        products = cursor.fetchall()
        print("Sample products:", products)
        
        # Get column names
        cursor.execute("PRAGMA table_info(products)")
        columns = cursor.fetchall()
        print("Product columns:", columns)
    
    conn.close()
    
except Exception as e:
    print(f"Error: {e}")
