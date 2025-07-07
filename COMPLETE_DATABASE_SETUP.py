#!/usr/bin/env python3
"""
🚀 RetailFlowAI Database Connection & Initialization Script
This script ensures your database is properly connected and populated with sample data.
"""

import sqlite3
import json
import os
from datetime import datetime

DATABASE_PATH = 'retailflow.db'

def create_database_connection():
    """Create and test database connection"""
    try:
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        
        # Test the connection
        cursor.execute("SELECT 1")
        print("✅ Database connection successful!")
        return conn, cursor
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return None, None

def initialize_tables(cursor):
    """Initialize all required tables with proper schema"""
    
    # Products table with enhanced AR features
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT,
        emoji TEXT,
        image_url TEXT,
        brand TEXT,
        rating REAL DEFAULT 4.5,
        is_trending BOOLEAN DEFAULT FALSE,
        stock_quantity INTEGER DEFAULT 100,
        ar_enabled BOOLEAN DEFAULT TRUE,
        tags TEXT,
        mood_category TEXT,
        images TEXT,
        colors TEXT,
        sizes TEXT,
        ar_model_url TEXT,
        ar_preview_url TEXT,
        color_variants TEXT,
        size_options TEXT,
        material TEXT,
        dimensions TEXT
    )
    ''')
    
    # Analytics table for tracking user interactions
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS analytics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER,
        view_count INTEGER DEFAULT 0,
        purchase_count INTEGER DEFAULT 0,
        ar_try_count INTEGER DEFAULT 0,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products (id)
    )
    ''')
    
    print("✅ Database tables initialized!")

def populate_sample_products(cursor):
    """Populate database with enhanced sample products for AR"""
    
    sample_products = [
        {
            'name': 'Premium Wireless Headphones',
            'category': 'Electronics',
            'price': 299.99,
            'description': 'High-quality wireless headphones with noise cancellation and premium audio quality.',
            'emoji': '🎧',
            'image_url': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
            'brand': 'AudioTech',
            'rating': 4.8,
            'is_trending': True,
            'stock_quantity': 50,
            'ar_enabled': True,
            'tags': 'wireless,audio,premium,electronics',
            'mood_category': 'productive',
            'colors': json.dumps([
                {'name': 'Black', 'hex': '#000000', 'image': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'},
                {'name': 'White', 'hex': '#FFFFFF', 'image': 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500'},
                {'name': 'Red', 'hex': '#FF0000', 'image': 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500'}
            ]),
            'sizes': json.dumps([
                {'name': 'One Size', 'price_modifier': 0, 'stock': 50}
            ]),
            'material': 'Premium Plastic & Metal',
            'dimensions': '18cm x 15cm x 8cm'
        },
        {
            'name': 'Designer Running Shoes',
            'category': 'Shoes',
            'price': 159.99,
            'description': 'Comfortable running shoes with advanced cushioning and breathable design.',
            'emoji': '👟',
            'image_url': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
            'brand': 'SportElite',
            'rating': 4.6,
            'is_trending': True,
            'stock_quantity': 75,
            'ar_enabled': True,
            'tags': 'running,shoes,comfort,sports',
            'mood_category': 'active',
            'colors': json.dumps([
                {'name': 'Blue', 'hex': '#2196F3', 'image': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'},
                {'name': 'Black', 'hex': '#000000', 'image': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500'},
                {'name': 'White', 'hex': '#FFFFFF', 'image': 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500'}
            ]),
            'sizes': json.dumps([
                {'name': '7', 'price_modifier': 0, 'stock': 15},
                {'name': '8', 'price_modifier': 0, 'stock': 20},
                {'name': '9', 'price_modifier': 0, 'stock': 25},
                {'name': '10', 'price_modifier': 0, 'stock': 15}
            ]),
            'material': 'Mesh & Synthetic',
            'dimensions': 'US Size Chart'
        },
        {
            'name': 'Casual Cotton T-Shirt',
            'category': 'Clothing',
            'price': 24.99,
            'description': 'Comfortable 100% cotton t-shirt perfect for everyday wear.',
            'emoji': '👕',
            'image_url': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
            'brand': 'ComfortWear',
            'rating': 4.4,
            'is_trending': False,
            'stock_quantity': 100,
            'ar_enabled': True,
            'tags': 'cotton,casual,comfortable,clothing',
            'mood_category': 'comfortable',
            'colors': json.dumps([
                {'name': 'White', 'hex': '#FFFFFF', 'image': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'},
                {'name': 'Black', 'hex': '#000000', 'image': 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500'},
                {'name': 'Navy', 'hex': '#1976D2', 'image': 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500'},
                {'name': 'Red', 'hex': '#F44336', 'image': 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=500'}
            ]),
            'sizes': json.dumps([
                {'name': 'XS', 'price_modifier': -2, 'stock': 10},
                {'name': 'S', 'price_modifier': 0, 'stock': 25},
                {'name': 'M', 'price_modifier': 0, 'stock': 30},
                {'name': 'L', 'price_modifier': 0, 'stock': 25},
                {'name': 'XL', 'price_modifier': 2, 'stock': 10}
            ]),
            'material': '100% Cotton',
            'dimensions': 'Standard Fit'
        },
        {
            'name': 'Professional Laptop Bag',
            'category': 'Bags',
            'price': 89.99,
            'description': 'Sleek laptop bag with multiple compartments and water-resistant material.',
            'emoji': '💼',
            'image_url': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
            'brand': 'ProGear',
            'rating': 4.7,
            'is_trending': False,
            'stock_quantity': 40,
            'ar_enabled': True,
            'tags': 'laptop,bag,professional,business',
            'mood_category': 'professional',
            'colors': json.dumps([
                {'name': 'Black', 'hex': '#000000', 'image': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'},
                {'name': 'Brown', 'hex': '#8D6E63', 'image': 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500'},
                {'name': 'Navy', 'hex': '#1976D2', 'image': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'}
            ]),
            'sizes': json.dumps([
                {'name': '13" Laptop', 'price_modifier': -10, 'stock': 15},
                {'name': '15" Laptop', 'price_modifier': 0, 'stock': 20},
                {'name': '17" Laptop', 'price_modifier': 15, 'stock': 5}
            ]),
            'material': 'Water-Resistant Nylon',
            'dimensions': '42cm x 30cm x 12cm'
        },
        {
            'name': 'Smart Fitness Watch',
            'category': 'Electronics',
            'price': 249.99,
            'description': 'Advanced fitness watch with heart rate monitoring and GPS tracking.',
            'emoji': '⌚',
            'image_url': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
            'brand': 'FitTech',
            'rating': 4.5,
            'is_trending': True,
            'stock_quantity': 60,
            'ar_enabled': True,
            'tags': 'fitness,watch,smart,health',
            'mood_category': 'active',
            'colors': json.dumps([
                {'name': 'Black', 'hex': '#000000', 'image': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'},
                {'name': 'Silver', 'hex': '#C0C0C0', 'image': 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500'},
                {'name': 'Gold', 'hex': '#FFD700', 'image': 'https://images.unsplash.com/photo-1510017098667-27dbd013d7a4?w=500'}
            ]),
            'sizes': json.dumps([
                {'name': '38mm', 'price_modifier': -20, 'stock': 25},
                {'name': '42mm', 'price_modifier': 0, 'stock': 35}
            ]),
            'material': 'Aluminum & Silicone',
            'dimensions': '42mm x 36mm x 10.7mm'
        }
    ]
    
    # Check if products already exist
    cursor.execute("SELECT COUNT(*) FROM products")
    existing_count = cursor.fetchone()[0]
    
    if existing_count == 0:
        for product in sample_products:
            placeholders = ', '.join(['?' for _ in product.keys()])
            columns = ', '.join(product.keys())
            query = f"INSERT INTO products ({columns}) VALUES ({placeholders})"
            cursor.execute(query, list(product.values()))
        
        print(f"✅ Added {len(sample_products)} sample products to database!")
    else:
        print(f"✅ Database already contains {existing_count} products!")

def create_analytics_data(cursor):
    """Create sample analytics data"""
    
    # Get all product IDs
    cursor.execute("SELECT id FROM products")
    product_ids = [row[0] for row in cursor.fetchall()]
    
    # Check if analytics data exists
    cursor.execute("SELECT COUNT(*) FROM analytics")
    existing_analytics = cursor.fetchone()[0]
    
    if existing_analytics == 0:
        for product_id in product_ids:
            cursor.execute('''
                INSERT INTO analytics (product_id, view_count, purchase_count, ar_try_count)
                VALUES (?, ?, ?, ?)
            ''', (product_id, 0, 0, 0))
        
        print(f"✅ Created analytics entries for {len(product_ids)} products!")
    else:
        print(f"✅ Analytics data already exists ({existing_analytics} entries)!")

def verify_database_integrity(cursor):
    """Verify database integrity and show summary"""
    
    # Check products
    cursor.execute("SELECT COUNT(*) FROM products")
    products_count = cursor.fetchone()[0]
    
    # Check analytics
    cursor.execute("SELECT COUNT(*) FROM analytics")
    analytics_count = cursor.fetchone()[0]
    
    # Check AR-enabled products
    cursor.execute("SELECT COUNT(*) FROM products WHERE ar_enabled = 1")
    ar_products_count = cursor.fetchone()[0]
    
    # Check trending products
    cursor.execute("SELECT COUNT(*) FROM products WHERE is_trending = 1")
    trending_count = cursor.fetchone()[0]
    
    print("\n" + "="*50)
    print("📊 DATABASE SUMMARY")
    print("="*50)
    print(f"📦 Total Products: {products_count}")
    print(f"🥽 AR-Enabled Products: {ar_products_count}")
    print(f"🔥 Trending Products: {trending_count}")
    print(f"📈 Analytics Entries: {analytics_count}")
    print("="*50)
    
    return products_count > 0

def main():
    """Main database initialization function"""
    print("🚀 Starting RetailFlowAI Database Initialization...")
    print("-" * 50)
    
    # Create connection
    conn, cursor = create_database_connection()
    if not conn:
        return False
    
    try:
        # Initialize tables
        initialize_tables(cursor)
        
        # Populate sample data
        populate_sample_products(cursor)
        
        # Create analytics data
        create_analytics_data(cursor)
        
        # Commit changes
        conn.commit()
        
        # Verify integrity
        success = verify_database_integrity(cursor)
        
        if success:
            print("\n🎉 DATABASE READY FOR RETAILFLOWAI!")
            print("✅ All tables created and populated successfully")
            print("✅ Sample products with AR features added")
            print("✅ Analytics tracking enabled")
            print("✅ Your app is ready to run!")
        
        return success
        
    except Exception as e:
        print(f"❌ Error during database initialization: {e}")
        return False
    
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    success = main()
    if success:
        print("\n🚀 You can now start your RetailFlowAI app!")
        print("Backend: python client/server/app.py")
        print("Frontend: npm start (in client directory)")
    else:
        print("\n❌ Database initialization failed. Please check the errors above.")
