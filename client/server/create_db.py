import sqlite3
import json
from datetime import datetime

DATABASE = 'retailflow.db'

def init_database():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            mood_category TEXT NOT NULL,
            price REAL DEFAULT 0.0,
            description TEXT,
            emoji TEXT,
            image_url TEXT,
            brand TEXT,
            rating REAL DEFAULT 0.0,
            tags TEXT,
            is_trending BOOLEAN DEFAULT 0,
            stock_quantity INTEGER DEFAULT 100,
            ar_model_url TEXT,
            ar_preview_url TEXT,
            multiple_images TEXT,
            size_chart TEXT,
            color_variants TEXT,
            ar_enabled BOOLEAN DEFAULT 0,
            three_d_model TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_interactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_input TEXT NOT NULL,
            detected_mood TEXT NOT NULL,
            recommended_products TEXT,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    cursor.execute('SELECT COUNT(*) FROM products')
    if cursor.fetchone()[0] == 0:
        sample_products = [
            ("Premium AR Jacket", "Clothing", "rainy", 189.99, "Waterproof jacket with AR try-on", "J", 
             "https://m.media-amazon.com/images/I/71J+9n+RJEL._AC_UX679_.jpg", "Nike AR", 4.8, "waterproof,jacket,rain,ar", 1, 50,
             "https://ar-models.com/jacket3d.glb", "https://ar-preview.com/jacket-ar.jpg", 
             '["https://m.media-amazon.com/images/I/71J+9n+RJEL._AC_UX679_.jpg"]',
             '{"S":"36-38","M":"40-42","L":"44-46"}', '["Black","Navy","Red"]', 1, "jacket_3d.glb"),
            
            ("AR Smart Sunglasses", "Accessories", "sunny", 299.99, "Smart sunglasses with AR try-on", "G", 
             "https://m.media-amazon.com/images/I/61HGpzQFEVL._AC_UX679_.jpg", "Ray-Ban AR", 4.9, "sunglasses,smart,ar", 1, 25,
             "https://ar-models.com/glasses3d.glb", "https://ar-preview.com/glasses-ar.jpg",
             '["https://m.media-amazon.com/images/I/61HGpzQFEVL._AC_UX679_.jpg"]',
             '{"One Size":"Universal"}', '["Black","Brown","Gold"]', 1, "glasses_3d.glb"),
            
            ("AR Evening Dress", "Clothing", "party", 249.99, "Stunning AR try-on evening dress", "D", 
             "https://m.media-amazon.com/images/I/71H8VqHLHTL._AC_UX569_.jpg", "Zara AR", 4.8, "dress,party,evening,ar", 1, 15,
             "https://ar-models.com/dress3d.glb", "https://ar-preview.com/dress-ar.jpg",
             '["https://m.media-amazon.com/images/I/71H8VqHLHTL._AC_UX569_.jpg"]',
             '{"S":"34","M":"36","L":"38"}', '["Black","Red","Blue"]', 1, "dress_3d.glb"),
        ]
        
        cursor.executemany('''
            INSERT INTO products (name, category, mood_category, price, description, emoji, image_url, brand, rating, tags, is_trending, stock_quantity, ar_model_url, ar_preview_url, multiple_images, size_chart, color_variants, ar_enabled, three_d_model)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', sample_products)
    
    conn.commit()
    conn.close()

def get_products_by_mood(mood_category):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT id, name, category, price, description, emoji, image_url, brand, rating, is_trending, stock_quantity, ar_model_url, ar_preview_url, multiple_images, size_chart, color_variants, ar_enabled, three_d_model
        FROM products 
        WHERE mood_category = ?
        ORDER BY is_trending DESC, rating DESC, name
    ''', (mood_category,))
    
    products = cursor.fetchall()
    conn.close()
    
    return [
        {
            'id': p[0],
            'name': p[1],
            'category': p[2],
            'price': p[3],
            'description': p[4],
            'emoji': p[5],
            'image_url': p[6],
            'brand': p[7],
            'rating': p[8],
            'is_trending': bool(p[9]),
            'stock_quantity': p[10],
            'ar_model_url': p[11],
            'ar_preview_url': p[12],
            'multiple_images': json.loads(p[13]) if p[13] else [],
            'size_chart': json.loads(p[14]) if p[14] else {},
            'color_variants': json.loads(p[15]) if p[15] else [],
            'ar_enabled': bool(p[16]),
            'three_d_model': p[17]
        }
        for p in products
    ]

def get_all_products():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT id, name, category, mood_category, price, description, emoji, image_url, brand, rating, tags, is_trending, stock_quantity, ar_model_url, ar_preview_url, multiple_images, size_chart, color_variants, ar_enabled, three_d_model
        FROM products 
        ORDER BY is_trending DESC, rating DESC, name
    ''')
    
    products = cursor.fetchall()
    conn.close()
    
    return [
        {
            'id': p[0],
            'name': p[1],
            'category': p[2],
            'mood_category': p[3],
            'price': p[4],
            'description': p[5],
            'emoji': p[6],
            'image_url': p[7],
            'brand': p[8],
            'rating': p[9],
            'tags': p[10],
            'is_trending': bool(p[11]),
            'stock_quantity': p[12],
            'ar_model_url': p[13],
            'ar_preview_url': p[14],
            'multiple_images': json.loads(p[15]) if p[15] else [],
            'size_chart': json.loads(p[16]) if p[16] else {},
            'color_variants': json.loads(p[17]) if p[17] else [],
            'ar_enabled': bool(p[18]),
            'three_d_model': p[19]
        }
        for p in products
    ]

def add_product(product_data):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO products (name, category, mood_category, price, description, emoji, image_url, brand, rating, tags, is_trending, stock_quantity, ar_model_url, ar_preview_url, multiple_images, size_chart, color_variants, ar_enabled, three_d_model)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        product_data.get('name'),
        product_data.get('category'),
        product_data.get('mood_category'),
        product_data.get('price', 0.0),
        product_data.get('description'),
        product_data.get('emoji'),
        product_data.get('image_url'),
        product_data.get('brand'),
        product_data.get('rating', 0.0),
        product_data.get('tags'),
        product_data.get('is_trending', False),
        product_data.get('stock_quantity', 100),
        product_data.get('ar_model_url'),
        product_data.get('ar_preview_url'),
        json.dumps(product_data.get('multiple_images', [])),
        json.dumps(product_data.get('size_chart', {})),
        json.dumps(product_data.get('color_variants', [])),
        product_data.get('ar_enabled', False),
        product_data.get('three_d_model')
    ))
    
    product_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return product_id

def update_product(product_id, product_data):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('''
        UPDATE products 
        SET name=?, category=?, mood_category=?, price=?, description=?, emoji=?, image_url=?, brand=?, rating=?, tags=?, is_trending=?, stock_quantity=?, ar_model_url=?, ar_preview_url=?, multiple_images=?, size_chart=?, color_variants=?, ar_enabled=?, three_d_model=?, updated_at=CURRENT_TIMESTAMP
        WHERE id=?
    ''', (
        product_data.get('name'),
        product_data.get('category'),
        product_data.get('mood_category'),
        product_data.get('price', 0.0),
        product_data.get('description'),
        product_data.get('emoji'),
        product_data.get('image_url'),
        product_data.get('brand'),
        product_data.get('rating', 0.0),
        product_data.get('tags'),
        product_data.get('is_trending', False),
        product_data.get('stock_quantity', 100),
        product_data.get('ar_model_url'),
        product_data.get('ar_preview_url'),
        json.dumps(product_data.get('multiple_images', [])),
        json.dumps(product_data.get('size_chart', {})),
        json.dumps(product_data.get('color_variants', [])),
        product_data.get('ar_enabled', False),
        product_data.get('three_d_model'),
        product_id
    ))
    
    conn.commit()
    conn.close()

def delete_product(product_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('DELETE FROM products WHERE id = ?', (product_id,))
    
    conn.commit()
    conn.close()

def get_product_by_id(product_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT id, name, category, mood_category, price, description, emoji, image_url, brand, rating, tags, is_trending, stock_quantity, ar_model_url, ar_preview_url, multiple_images, size_chart, color_variants, ar_enabled, three_d_model
        FROM products 
        WHERE id = ?
    ''', (product_id,))
    
    product = cursor.fetchone()
    conn.close()
    
    if product:
        return {
            'id': product[0],
            'name': product[1],
            'category': product[2],
            'mood_category': product[3],
            'price': product[4],
            'description': product[5],
            'emoji': product[6],
            'image_url': product[7],
            'brand': product[8],
            'rating': product[9],
            'tags': product[10],
            'is_trending': bool(product[11]),
            'stock_quantity': product[12],
            'ar_model_url': product[13],
            'ar_preview_url': product[14],
            'multiple_images': json.loads(product[15]) if product[15] else [],
            'size_chart': json.loads(product[16]) if product[16] else {},
            'color_variants': json.loads(product[17]) if product[17] else [],
            'ar_enabled': bool(product[18]),
            'three_d_model': product[19]
        }
    return None

def log_user_interaction(user_input, detected_mood, recommended_products):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO user_interactions (user_input, detected_mood, recommended_products)
        VALUES (?, ?, ?)
    ''', (user_input, detected_mood, json.dumps(recommended_products)))
    
    conn.commit()
    conn.close()

def get_interaction_analytics():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT detected_mood, COUNT(*) as count
        FROM user_interactions
        GROUP BY detected_mood
        ORDER BY count DESC
        LIMIT 10
    ''')
    mood_stats = cursor.fetchall()
    
    cursor.execute('''
        SELECT user_input, detected_mood, timestamp
        FROM user_interactions
        ORDER BY timestamp DESC
        LIMIT 20
    ''')
    recent_interactions = cursor.fetchall()
    
    conn.close()
    
    return {
        'mood_stats': [{'mood': m[0], 'count': m[1]} for m in mood_stats],
        'recent_interactions': [
            {
                'user_input': r[0],
                'detected_mood': r[1],
                'timestamp': r[2]
            }
            for r in recent_interactions
        ]
    }
