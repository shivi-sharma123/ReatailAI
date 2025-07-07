import sqlite3
import sys
import os

# Change to the correct directory
os.chdir(r'c:\Users\sharm\OneDrive\Desktop\RetailFlowAI')

try:
    # Connect to database
    conn = sqlite3.connect('retailflow.db')
    cursor = conn.cursor()
    
    # First, let's check if the products table exists and its structure
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='products';")
    if not cursor.fetchone():
        print("Products table doesn't exist. Creating it...")
        cursor.execute('''
            CREATE TABLE products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                category TEXT NOT NULL,
                price REAL NOT NULL,
                description TEXT,
                emoji TEXT,
                image_url TEXT,
                brand TEXT,
                rating REAL DEFAULT 0.0,
                is_trending INTEGER DEFAULT 0,
                stock_quantity INTEGER DEFAULT 0,
                ar_enabled INTEGER DEFAULT 0,
                tags TEXT,
                mood_category TEXT
            )
        ''')
        print("Products table created.")
    
    # Add AR-enabled products
    ar_products = [
        ('Nike Air Max 270', 'shoes', 150.00, 'Revolutionary Air Max 270 with AR try-on technology', '👟', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 'Nike', 4.8, 1, 50, 1, 'athletic,comfortable,trending', 'confident'),
        ('Levis 501 Jeans', 'clothing', 89.00, 'Classic fit jeans with AR size visualization', '👖', 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400', 'Levis', 4.6, 1, 30, 1, 'classic,denim,casual', 'confident'),
        ('Apple Watch Series 9', 'electronics', 399.00, 'Latest smartwatch with AR wrist fitting', '⌚', 'https://images.unsplash.com/photo-1434493651358-e8b4862b43d4?w=400', 'Apple', 4.9, 1, 25, 1, 'smart,health,tech', 'productive'),
        ('Ray-Ban Aviator', 'accessories', 180.00, 'Classic aviator sunglasses with AR face fitting', '🕶️', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400', 'Ray-Ban', 4.7, 1, 40, 1, 'sunglasses,style,classic', 'confident'),
        ('Adidas Ultraboost 22', 'shoes', 180.00, 'Premium running shoes with AR color preview', '👟', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400', 'Adidas', 4.8, 1, 35, 1, 'running,performance,athletic', 'energetic'),
        ('Nike Dri-FIT T-Shirt', 'clothing', 35.00, 'Performance athletic wear with AR fit check', '👕', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 'Nike', 4.5, 1, 100, 1, 'athletic,performance,casual', 'active'),
        ('Apple AirPods Pro', 'electronics', 249.00, 'Wireless earbuds with AR ear fitting', '🎧', 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400', 'Apple', 4.8, 1, 60, 1, 'wireless,audio,tech', 'productive'),
        ('Walmart Smart TV 55inch', 'electronics', 299.00, 'Smart TV with AR room placement preview', '📺', 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400', 'Walmart', 4.4, 1, 15, 1, 'smart,entertainment,home', 'relaxed')
    ]
    
    added_count = 0
    for product in ar_products:
        try:
            # Check if product already exists
            cursor.execute("SELECT id FROM products WHERE name = ?", (product[0],))
            if cursor.fetchone():
                print(f'Product "{product[0]}" already exists, skipping...')
                continue
                
            cursor.execute('''
                INSERT INTO products (name, category, price, description, emoji, image_url, brand, rating, is_trending, stock_quantity, ar_enabled, tags, mood_category)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', product)
            print(f'✅ Added AR product: {product[0]}')
            added_count += 1
        except Exception as e:
            print(f'❌ Error adding {product[0]}: {e}')
    
    conn.commit()
    
    # Verify the products were added
    cursor.execute("SELECT COUNT(*) FROM products WHERE ar_enabled = 1")
    ar_count = cursor.fetchone()[0]
    print(f'\n🎯 Total AR-enabled products in database: {ar_count}')
    print(f'🆕 Newly added products: {added_count}')
    
    conn.close()
    print('\n✅ AR-enabled products setup completed successfully!')
    
except Exception as e:
    print(f'❌ Error: {e}')
    sys.exit(1)
