import sqlite3
import json
from datetime import datetime

DATABASE = 'retailflow.db'

def init_database():
    """Initialize the database with required tables"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Products table with AR support
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
    
    # User interactions table (for analytics)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_interactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_input TEXT NOT NULL,
            detected_mood TEXT NOT NULL,
            recommended_products TEXT,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Add some sample products if table is empty
    cursor.execute('SELECT COUNT(*) FROM products')
    if cursor.fetchone()[0] == 0:
        sample_products = [
            # AR Clothing Collection
            ("Premium AR Jacket", "Clothing", "rainy", 189.99, "Waterproof jacket with AR try-on", "🧥", 
             "https://m.media-amazon.com/images/I/71J+9n+RJEL._AC_UX679_.jpg", "Nike AR", 4.8, "waterproof,jacket,rain,ar", 1, 50,
             "https://ar-models.com/jacket3d.glb", "https://ar-preview.com/jacket-ar.jpg", 
             '["https://m.media-amazon.com/images/I/71J+9n+RJEL._AC_UX679_.jpg"]',
             '{"S":"36-38","M":"40-42","L":"44-46"}', '["Black","Navy","Red"]', 1, "jacket_3d.glb"),
            
            ("AR Smart Sunglasses", "Accessories", "sunny", 299.99, "Smart sunglasses with AR try-on", "🕶️", 
             "https://m.media-amazon.com/images/I/61HGpzQFEVL._AC_UX679_.jpg", "Ray-Ban AR", 4.9, "sunglasses,smart,ar", 1, 25,
             "https://ar-models.com/glasses3d.glb", "https://ar-preview.com/glasses-ar.jpg",
             '["https://m.media-amazon.com/images/I/61HGpzQFEVL._AC_UX679_.jpg"]',
             '{"One Size":"Universal"}', '["Black","Brown","Gold"]', 1, "glasses_3d.glb"),
            
            ("AR Evening Dress", "Clothing", "party", 249.99, "Stunning AR try-on evening dress", "👗", 
             "https://m.media-amazon.com/images/I/71H8VqHLHTL._AC_UX569_.jpg", "Zara AR", 4.8, "dress,party,evening,ar", 1, 15,
             "https://ar-models.com/dress3d.glb", "https://ar-preview.com/dress-ar.jpg",
             '["https://m.media-amazon.com/images/I/71H8VqHLHTL._AC_UX569_.jpg"]',
             '{"S":"34","M":"36","L":"38"}', '["Black","Red","Blue"]', 1, "dress_3d.glb"),

            # Professional Collection
            ("Executive Business Suit", "Clothing", "professional", 599.99, "Premium business suit for professionals", "👔",
             "https://images.unsplash.com/photo-1594938384827-eeae27ee1518?w=500", "Hugo Boss", 4.9, "business,suit,professional", 1, 30,
             "https://ar-models.com/suit3d.glb", "https://ar-preview.com/suit-ar.jpg",
             '["https://images.unsplash.com/photo-1594938384827-eeae27ee1518?w=500"]',
             '{"S":"36","M":"40","L":"44","XL":"48"}', '["Navy","Charcoal","Black"]', 1, "suit_3d.glb"),

            ("Professional Briefcase", "Accessories", "professional", 299.99, "Luxury leather briefcase", "💼",
             "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", "Samsonite", 4.7, "briefcase,leather,business", 1, 45,
             "https://ar-models.com/briefcase3d.glb", "https://ar-preview.com/briefcase-ar.jpg",
             '["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"]',
             '{"One Size":"Standard"}', '["Brown","Black","Tan"]', 1, "briefcase_3d.glb"),

            # Fitness Collection
            ("AR Running Shoes", "Footwear", "fitness", 179.99, "High-tech running shoes with AR fitting", "👟",
             "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", "Nike", 4.8, "running,shoes,fitness,ar", 1, 60,
             "https://ar-models.com/shoes3d.glb", "https://ar-preview.com/shoes-ar.jpg",
             '["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"]',
             '{"7":"US 7","8":"US 8","9":"US 9","10":"US 10","11":"US 11"}', '["White","Black","Red","Blue"]', 1, "shoes_3d.glb"),

            ("Smart Fitness Watch", "Electronics", "fitness", 399.99, "Advanced fitness tracking smartwatch", "⌚",
             "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500", "Apple", 4.9, "watch,fitness,smart", 1, 35,
             "https://ar-models.com/watch3d.glb", "https://ar-preview.com/watch-ar.jpg",
             '["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"]',
             '{"38mm":"Small","42mm":"Large"}', '["Silver","Black","Gold","Rose Gold"]', 1, "watch_3d.glb"),

            # Casual Collection
            ("Designer Jeans", "Clothing", "casual", 129.99, "Premium denim jeans with perfect fit", "👖",
             "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=500", "Levi's", 4.6, "jeans,casual,denim", 1, 80,
             "https://ar-models.com/jeans3d.glb", "https://ar-preview.com/jeans-ar.jpg",
             '["https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=500"]',
             '{"28":"28 inch","30":"30 inch","32":"32 inch","34":"34 inch","36":"36 inch"}', '["Blue","Black","Gray"]', 1, "jeans_3d.glb"),

            ("Casual Sneakers", "Footwear", "casual", 89.99, "Comfortable everyday sneakers", "👟",
             "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500", "Adidas", 4.5, "sneakers,casual,comfort", 1, 70,
             "https://ar-models.com/sneakers3d.glb", "https://ar-preview.com/sneakers-ar.jpg",
             '["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"]',
             '{"7":"US 7","8":"US 8","9":"US 9","10":"US 10","11":"US 11"}', '["White","Black","Gray","Navy"]', 1, "sneakers_3d.glb"),

            # Party Collection
            ("Glamour Heels", "Footwear", "party", 199.99, "Stunning high heels for special occasions", "👠",
             "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500", "Jimmy Choo", 4.7, "heels,party,glamour", 1, 25,
             "https://ar-models.com/heels3d.glb", "https://ar-preview.com/heels-ar.jpg",
             '["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500"]',
             '{"6":"US 6","7":"US 7","8":"US 8","9":"US 9","10":"US 10"}', '["Black","Red","Gold","Silver"]', 1, "heels_3d.glb"),

            ("Designer Clutch", "Accessories", "party", 159.99, "Elegant clutch for evening events", "👛",
             "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500", "Coach", 4.6, "clutch,party,elegant", 1, 40,
             "https://ar-models.com/clutch3d.glb", "https://ar-preview.com/clutch-ar.jpg",
             '["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500"]',
             '{"One Size":"Standard"}', '["Black","Gold","Silver","Rose Gold"]', 1, "clutch_3d.glb"),

            # Comfort Collection
            ("Cozy Pajama Set", "Clothing", "comfort", 79.99, "Ultra-soft pajamas for ultimate comfort", "🛏️",
             "https://images.unsplash.com/photo-1586985564150-c5b49ac97bbe?w=500", "Victoria's Secret", 4.8, "pajamas,comfort,soft", 1, 55,
             "https://ar-models.com/pajamas3d.glb", "https://ar-preview.com/pajamas-ar.jpg",
             '["https://images.unsplash.com/photo-1586985564150-c5b49ac97bbe?w=500"]',
             '{"S":"Small","M":"Medium","L":"Large","XL":"Extra Large"}', '["Pink","Blue","White","Gray"]', 1, "pajamas_3d.glb"),

            ("Memory Foam Slippers", "Footwear", "comfort", 49.99, "Luxurious memory foam house slippers", "🥿",
             "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500", "UGG", 4.9, "slippers,comfort,memory foam", 1, 65,
             "https://ar-models.com/slippers3d.glb", "https://ar-preview.com/slippers-ar.jpg",
             '["https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500"]',
             '{"6":"US 6","7":"US 7","8":"US 8","9":"US 9","10":"US 10","11":"US 11"}', '["Beige","Brown","Gray","Pink"]', 1, "slippers_3d.glb"),

            # Sunny Weather Collection
            ("Beach Hat", "Accessories", "sunny", 39.99, "Stylish sun hat for beach days", "👒",
             "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500", "Panama Jack", 4.4, "hat,sun,beach", 1, 75,
             "https://ar-models.com/hat3d.glb", "https://ar-preview.com/hat-ar.jpg",
             '["https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500"]',
             '{"One Size":"Adjustable"}', '["Natural","White","Navy","Khaki"]', 1, "hat_3d.glb"),

            ("Summer Dress", "Clothing", "sunny", 89.99, "Light and breezy summer dress", "👗",
             "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500", "Zara", 4.5, "dress,summer,light", 1, 45,
             "https://ar-models.com/summer_dress3d.glb", "https://ar-preview.com/summer-dress-ar.jpg",
             '["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500"]',
             '{"XS":"Extra Small","S":"Small","M":"Medium","L":"Large"}', '["Yellow","White","Coral","Mint"]', 1, "summer_dress_3d.glb"),

            # Happy/Energetic Collection
            ("Rainbow Sneakers", "Footwear", "happy", 119.99, "Colorful sneakers to brighten your day", "🌈",
             "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500", "Converse", 4.6, "sneakers,colorful,happy", 1, 50,
             "https://ar-models.com/rainbow_sneakers3d.glb", "https://ar-preview.com/rainbow-sneakers-ar.jpg",
             '["https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500"]',
             '{"6":"US 6","7":"US 7","8":"US 8","9":"US 9","10":"US 10","11":"US 11"}', '["Rainbow","Pink","Blue","Purple"]', 1, "rainbow_sneakers_3d.glb"),

            ("Motivational T-Shirt", "Clothing", "energetic", 29.99, "Inspiring shirt to boost your energy", "⚡",
             "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500", "Under Armour", 4.3, "tshirt,motivation,energy", 1, 90,
             "https://ar-models.com/tshirt3d.glb", "https://ar-preview.com/tshirt-ar.jpg",
             '["https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500"]',
             '{"S":"Small","M":"Medium","L":"Large","XL":"Extra Large"}', '["Red","Blue","Green","Orange"]', 1, "tshirt_3d.glb"),
        ]
        
        cursor.executemany('''
            INSERT INTO products (name, category, mood_category, price, description, emoji, image_url, brand, rating, tags, is_trending, stock_quantity, ar_model_url, ar_preview_url, multiple_images, size_chart, color_variants, ar_enabled, three_d_model)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', sample_products)
    
    conn.commit()
    conn.close()

def get_products_by_keyword(keyword):
    """Search products by keyword in name, description, tags, or category"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Search in multiple fields
    search_term = f"%{keyword.lower()}%"
    cursor.execute('''
        SELECT id, name, category, price, description, emoji, image_url, brand, rating, is_trending, 
               stock_quantity, ar_model_url, ar_preview_url, multiple_images, size_chart, 
               color_variants, ar_enabled, three_d_model, tags, mood_category
        FROM products 
        WHERE LOWER(name) LIKE ? 
           OR LOWER(description) LIKE ?
           OR LOWER(tags) LIKE ?
           OR LOWER(category) LIKE ?
           OR LOWER(mood_category) LIKE ?
        ORDER BY is_trending DESC, rating DESC, name
    ''', (search_term, search_term, search_term, search_term, search_term))
    
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
            'image': p[6],  # Use 'image' for chatbot compatibility
            'image_url': p[6],  # Also include image_url for admin compatibility
            'brand': p[7],
            'rating': p[8],
            'is_trending': bool(p[9]),
            'stock_quantity': p[10],
            'ar_model_url': p[11],
            'ar_preview_url': p[12],
            'multiple_images': p[13],
            'size_chart': p[14],
            'color_variants': p[15],
            'ar_enabled': bool(p[16]),
            'three_d_model': p[17],
            'tags': p[18],
            'mood_category': p[19]
        } for p in products
    ]

def get_products_by_mood(mood_category):
    """Get all products for a specific mood category with enhanced search"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # First try exact mood category match
    cursor.execute('''
        SELECT id, name, category, price, description, emoji, image_url, brand, rating, is_trending, 
               stock_quantity, ar_model_url, ar_preview_url, multiple_images, size_chart, 
               color_variants, ar_enabled, three_d_model, tags, mood_category
        FROM products 
        WHERE mood_category = ?
        ORDER BY is_trending DESC, rating DESC, name
    ''', (mood_category,))
    
    products = cursor.fetchall()
    
    # If no exact match, try keyword search
    if not products and mood_category in ['cozy', 'outerwear']:
        search_keywords = {
            'cozy': ['blanket', 'cozy', 'comfort', 'soft', 'warm'],
            'outerwear': ['coat', 'jacket', 'outerwear', 'winter', 'puffer']
        }
        
        keywords = search_keywords.get(mood_category, [mood_category])
        for keyword in keywords:
            search_term = f"%{keyword}%"
            cursor.execute('''
                SELECT id, name, category, price, description, emoji, image_url, brand, rating, is_trending, 
                       stock_quantity, ar_model_url, ar_preview_url, multiple_images, size_chart, 
                       color_variants, ar_enabled, three_d_model, tags, mood_category
                FROM products 
                WHERE LOWER(name) LIKE ? 
                   OR LOWER(description) LIKE ?
                   OR LOWER(tags) LIKE ?
                ORDER BY is_trending DESC, rating DESC, name
            ''', (search_term, search_term, search_term))
            
            keyword_products = cursor.fetchall()
            products.extend(keyword_products)
            
            if products:  # Stop after finding some products
                break
    
    conn.close()
    
    return [
        {
            'id': p[0],
            'name': p[1],
            'category': p[2],
            'price': p[3],
            'description': p[4],
            'emoji': p[5],
            'image': p[6],  # Use 'image' for chatbot compatibility
            'image_url': p[6],  # Also include image_url for admin compatibility
            'brand': p[7],
            'rating': p[8],
            'is_trending': bool(p[9]),
            'stock_quantity': p[10],
            'ar_model_url': p[11],
            'ar_preview_url': p[12],
            'multiple_images': p[13],
            'size_chart': p[14],
            'color_variants': p[15],
            'ar_enabled': bool(p[16]),
            'three_d_model': p[17],
            'tags': p[18],
            'mood_category': p[19]
        } for p in products
    ]

def get_all_products():
    """Get all products"""
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
    """Add a new product to the database"""
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
        int(product_data.get('is_trending', False)),
        product_data.get('stock_quantity', 100),
        product_data.get('ar_model_url'),
        product_data.get('ar_preview_url'),
        json.dumps(product_data.get('multiple_images', [])),
        json.dumps(product_data.get('size_chart', {})),
        json.dumps(product_data.get('color_variants', [])),
        int(product_data.get('ar_enabled', False)),
        product_data.get('three_d_model')
    ))
    
    product_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return product_id

def update_product(product_id, product_data):
    """Update an existing product"""
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
        int(product_data.get('is_trending', False)),
        product_data.get('stock_quantity', 100),
        product_data.get('ar_model_url'),
        product_data.get('ar_preview_url'),
        json.dumps(product_data.get('multiple_images', [])),
        json.dumps(product_data.get('size_chart', {})),
        json.dumps(product_data.get('color_variants', [])),
        int(product_data.get('ar_enabled', False)),
        product_data.get('three_d_model'),
        product_id
    ))
    
    conn.commit()
    conn.close()

def delete_product(product_id):
    """Delete a product from the database with enhanced error handling and full product info return"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    try:
        # First get complete product information before deletion
        cursor.execute('''
            SELECT id, name, category, mood_category, price, description, emoji, image_url, brand, rating, tags, is_trending, stock_quantity, ar_model_url, ar_preview_url, multiple_images, size_chart, color_variants, ar_enabled, three_d_model
            FROM products 
            WHERE id = ?
        ''', (product_id,))
        
        product = cursor.fetchone()
        
        if not product:
            raise ValueError(f"Product with ID {product_id} not found")
        
        # Store product details for return
        product_info = {
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
        
        # Delete the product
        cursor.execute('DELETE FROM products WHERE id = ?', (product_id,))
        
        if cursor.rowcount == 0:
            raise ValueError(f"Failed to delete product with ID {product_id}")
        
        # Also clean up any related user interactions
        cursor.execute('''
            DELETE FROM user_interactions 
            WHERE recommended_products LIKE ? OR recommended_products LIKE ? OR recommended_products LIKE ?
        ''', (f'%"id": {product_id}%', f'%"id":{product_id}%', f'%{product_id}%'))
        
        conn.commit()
        
        return {
            "success": True,
            "message": f"Product '{product_info['name']}' successfully deleted",
            "deleted_product": product_info,
            "affected_interactions": cursor.rowcount
        }
        
    except sqlite3.Error as e:
        conn.rollback()
        raise RuntimeError(f"Database error while deleting product: {str(e)}")
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        conn.close()

def get_product_by_id(product_id):
    """Get a specific product by ID"""
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
    """Log user interaction for analytics"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO user_interactions (user_input, detected_mood, recommended_products)
        VALUES (?, ?, ?)
    ''', (user_input, detected_mood, json.dumps(recommended_products)))
    
    conn.commit()
    conn.close()

def get_interaction_analytics():
    """Get analytics data from user interactions"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Most popular moods
    cursor.execute('''
        SELECT detected_mood, COUNT(*) as count
        FROM user_interactions
        GROUP BY detected_mood
        ORDER BY count DESC
        LIMIT 10
    ''')
    mood_stats = cursor.fetchall()
    
    # Recent interactions
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
def get_database_stats():
    """Get comprehensive database statistics"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Products count
    cursor.execute('SELECT COUNT(*) FROM products')
    products_count = cursor.fetchone()[0]
    
    # Categories count
    cursor.execute('SELECT COUNT(DISTINCT category) FROM products')
    categories_count = cursor.fetchone()[0]
    
    # Brands count
    cursor.execute('SELECT COUNT(DISTINCT brand) FROM products')
    brands_count = cursor.fetchone()[0]
    
    # AR-enabled products count
    cursor.execute('SELECT COUNT(*) FROM products WHERE ar_enabled = 1')
    ar_enabled_count = cursor.fetchone()[0]
    
    # Trending products count
    cursor.execute('SELECT COUNT(*) FROM products WHERE is_trending = 1')
    trending_count = cursor.fetchone()[0]
    
    # Average price
    cursor.execute('SELECT AVG(price) FROM products')
    avg_price = cursor.fetchone()[0] or 0
    
    # Total stock
    cursor.execute('SELECT SUM(stock_quantity) FROM products')
    total_stock = cursor.fetchone()[0] or 0
    
    conn.close()
    
    return {
        'products_count': products_count,
        'categories_count': categories_count,
        'brands_count': brands_count,
        'ar_enabled_count': ar_enabled_count,
        'trending_count': trending_count,
        'avg_price': round(avg_price, 2),
        'total_stock': total_stock
    }
