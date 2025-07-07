from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import json
import os
import os

import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])

# Get the correct database path - look in parent directory first, then current directory
DATABASE = None
possible_paths = [
    os.path.join(os.path.dirname(os.path.dirname(__file__)), 'retailflow.db'),  # Parent directory
    'retailflow.db'  # Current directory
]

for path in possible_paths:
    if os.path.exists(path):
        DATABASE = path
        break

if DATABASE is None:
    DATABASE = 'retailflow.db'  # Default, will be created

def init_database():
    """Initialize database with products if it doesn't exist"""
    if not os.path.exists(DATABASE):
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        # Create products table
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
            mood_category TEXT
        )
        ''')
        
        # Create analytics table
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
        
        # Insert sample products
        products = [
            # Happy mood products
            ("Ray-Ban Aviator Sunglasses", "sunglasses", 159.99, "Classic aviator sunglasses perfect for sunny days", "😎", 
             "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400", "Ray-Ban", 4.8, True, 50, True, "sunglasses,aviator,fashion", "happy"),
            
            ("Oakley Sport Sunglasses", "sunglasses", 129.99, "High-performance sports sunglasses", "🕶️", 
             "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400", "Oakley", 4.7, True, 30, True, "sunglasses,sport,performance", "happy"),
            
            ("Vintage Round Sunglasses", "sunglasses", 89.99, "Trendy vintage-style round sunglasses", "🕶️", 
             "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400", "Vintage Co", 4.5, False, 25, True, "sunglasses,vintage,round", "happy"),
            
            # Natural mood products
            ("Classic White T-Shirt", "t-shirt", 29.99, "Comfortable cotton t-shirt for everyday wear", "👕", 
             "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", "BasicWear", 4.6, True, 100, True, "t-shirt,cotton,casual", "natural"),
            
            ("Graphic Design T-Shirt", "t-shirt", 39.99, "Cool graphic design t-shirt", "👕", 
             "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400", "DesignCo", 4.4, False, 75, True, "t-shirt,graphic,design", "natural"),
            
            ("Premium Cotton Polo", "polo", 59.99, "High-quality cotton polo shirt", "👔", 
             "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400", "Premium", 4.7, True, 60, True, "polo,cotton,premium", "natural"),
            
            # Rainy mood products
            ("Waterproof Rain Jacket", "jacket", 199.99, "Fully waterproof jacket for rainy days", "🧥", 
             "https://images.unsplash.com/photo-1544966503-7cc4ac882d2d?w=400", "WeatherPro", 4.9, True, 40, True, "jacket,waterproof,rain", "rainy"),
            
            ("Lightweight Raincoat", "raincoat", 149.99, "Lightweight and packable raincoat", "🧥", 
             "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400", "RainGear", 4.6, False, 35, True, "raincoat,lightweight,packable", "rainy"),
            
            ("Storm-Shield Jacket", "jacket", 249.99, "Heavy-duty jacket for extreme weather", "🧥", 
             "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400", "StormShield", 4.8, True, 20, True, "jacket,heavy-duty,storm", "rainy"),
            
            # Sad mood products (comfort wear)
            ("Cozy Comfort Hoodie", "hoodie", 79.99, "Super soft hoodie for maximum comfort", "🥰", 
             "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400", "ComfortWear", 4.8, True, 80, True, "hoodie,comfort,soft", "sad"),
            
            ("Warm Fleece Jacket", "jacket", 119.99, "Warm fleece jacket for cold days", "🧥", 
             "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400", "WarmCo", 4.5, False, 45, True, "jacket,fleece,warm", "sad"),
            
            ("Comfort Sweatshirt", "sweatshirt", 69.99, "Ultra-comfortable sweatshirt", "👚", 
             "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400", "Comfort+", 4.6, True, 70, True, "sweatshirt,comfort,cozy", "sad")
        ]
        
        cursor.executemany('''
        INSERT INTO products (name, category, price, description, emoji, image_url, brand, rating, is_trending, stock_quantity, ar_enabled, tags, mood_category)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', products)
        
        # Create analytics entries
        cursor.execute('SELECT id FROM products')
        product_ids = cursor.fetchall()
        
        analytics_data = []
        for product_id in product_ids:
            analytics_data.append((product_id[0], 10, 2, 5))
        
        cursor.executemany('''
        INSERT INTO analytics (product_id, view_count, purchase_count, ar_try_count)
        VALUES (?, ?, ?, ?)
        ''', analytics_data)
        
        conn.commit()
        conn.close()
        print("✅ Database initialized with products!")

def analyze_mood_from_text(text):
    """Analyze the user's text to determine their mood"""
    text = text.lower()
    
    # Direct mood detection
    if any(word in text for word in ['happy', 'joy', 'excited', 'great', 'awesome', 'cheerful', 'glad']):
        return 'happy'
    elif any(word in text for word in ['sad', 'down', 'blue', 'upset', 'tired', 'depressed', 'unhappy']):
        return 'sad'
    elif any(word in text for word in ['natural', 'normal', 'casual', 'simple', 'everyday', 'regular']):
        return 'natural'
    elif any(word in text for word in ['rainy', 'rain', 'wet', 'stormy']):
        return 'rainy'
    
    # Product-specific searches
    elif any(word in text for word in ['sunglasses', 'glasses', 'shades']):
        return 'happy'
    elif any(word in text for word in ['tshirt', 't-shirt', 'shirt', 'top']):
        return 'natural'
    elif any(word in text for word in ['coat', 'jacket', 'raincoat']):
        return 'rainy'
    elif any(word in text for word in ['hoodie', 'blanket', 'comfort']):
        return 'sad'
    
    return 'natural'  # Default to natural mood

def get_products_by_mood(mood_category):
    """Get products for a specific mood"""
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, name, category, price, description, emoji, image_url, brand, rating, is_trending, 
                   stock_quantity, ar_enabled, tags, mood_category, images, colors, sizes
            FROM products 
            WHERE mood_category = ?
            ORDER BY is_trending DESC, rating DESC, name
        ''', (mood_category,))
        
        products = cursor.fetchall()
        conn.close()
        
        product_list = []
        for product in products:
            product_dict = {
                'id': product[0],
                'name': product[1],
                'category': product[2],
                'price': product[3],
                'description': product[4],
                'emoji': product[5],
                'image_url': product[6],
                'brand': product[7],
                'rating': product[8],
                'is_trending': bool(product[9]),
                'stock_quantity': product[10],
                'ar_enabled': bool(product[11]),
                'tags': product[12],
                'mood_category': product[13]
            }
            product_list.append(product_dict)
        
        return product_list
    except Exception as e:
        print(f"Error getting products by mood: {e}")
        return []

@app.route('/api/products', methods=['GET'])
def get_products():
    """Get all products"""
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, name, category, price, description, emoji, image_url, brand, rating, is_trending, 
                   stock_quantity, ar_enabled, tags, mood_category, images, colors, sizes
            FROM products 
            ORDER BY is_trending DESC, rating DESC, name
        ''')
        
        products = cursor.fetchall()
        conn.close()
        
        product_list = []
        for product in products:
            product_dict = {
                'id': product[0],
                'name': product[1],
                'category': product[2],
                'price': product[3],
                'description': product[4],
                'emoji': product[5],
                'image_url': product[6],
                'brand': product[7],
                'rating': product[8],
                'is_trending': bool(product[9]),
                'stock_quantity': product[10],
                'ar_enabled': bool(product[11]),
                'tags': product[12],
                'mood_category': product[13]
            }
            product_list.append(product_dict)
        
        return jsonify({'products': product_list, 'success': True})
    
    except Exception as e:
        return jsonify({'error': str(e), 'success': False}), 500

@app.route('/api/products', methods=['POST'])
def add_product():
    """Add a new product"""
    try:
        data = request.get_json()
        
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO products (name, category, price, description, emoji, image_url, brand, rating, is_trending, stock_quantity, ar_enabled, tags, mood_category)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data.get('name'),
            data.get('category'),
            data.get('price'),
            data.get('description'),
            data.get('emoji'),
            data.get('image_url'),
            data.get('brand'),
            data.get('rating', 4.5),
            data.get('is_trending', False),
            data.get('stock_quantity', 100),
            data.get('ar_enabled', True),
            data.get('tags'),
            data.get('mood_category')
        ))
        
        product_id = cursor.lastrowid
        
        # Add analytics entry
        cursor.execute('INSERT INTO analytics (product_id) VALUES (?)', (product_id,))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'product_id': product_id})
    
    except Exception as e:
        return jsonify({'error': str(e), 'success': False}), 500

@app.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    """Update a product"""
    try:
        data = request.get_json()
        
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        cursor.execute('''
            UPDATE products 
            SET name=?, category=?, price=?, description=?, emoji=?, image_url=?, brand=?, rating=?, is_trending=?, stock_quantity=?, ar_enabled=?, tags=?, mood_category=?
            WHERE id=?
        ''', (
            data.get('name'),
            data.get('category'),
            data.get('price'),
            data.get('description'),
            data.get('emoji'),
            data.get('image_url'),
            data.get('brand'),
            data.get('rating'),
            data.get('is_trending'),
            data.get('stock_quantity'),
            data.get('ar_enabled'),
            data.get('tags'),
            data.get('mood_category'),
            product_id
        ))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True})
    
    except Exception as e:
        return jsonify({'error': str(e), 'success': False}), 500

@app.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    """Delete a product"""
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        # Delete analytics first
        cursor.execute('DELETE FROM analytics WHERE product_id = ?', (product_id,))
        
        # Delete product
        cursor.execute('DELETE FROM products WHERE id = ?', (product_id,))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True})
    
    except Exception as e:
        return jsonify({'error': str(e), 'success': False}), 500

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    """Chatbot endpoint for mood-based product suggestions"""
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'No message provided', 'success': False}), 400
        
        # Analyze mood from user message
        mood = analyze_mood_from_text(user_message)
        
        # Get products for the detected mood
        products = get_products_by_mood(mood)
        
        # Create response based on mood
        mood_responses = {
            'happy': f"I sense you're feeling great! 😊 Here are some awesome products to match your happy mood:",
            'sad': f"I understand you might be feeling down. 💙 Let me suggest some comfort items to help you feel better:",
            'natural': f"Looking for something casual and natural? 🌿 Here are some everyday essentials for you:",
            'rainy': f"Rainy day vibes? ☔ I've got you covered with these weather-ready products:"
        }
        
        response_message = mood_responses.get(mood, "Here are some products I think you'll like:")
        
        return jsonify({
            'message': response_message,
            'mood': mood,
            'products': products[:6],  # Limit to 6 products
            'success': True
        })
    
    except Exception as e:
        return jsonify({'error': str(e), 'success': False}), 500

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    """Get analytics data"""
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT p.name, a.view_count, a.purchase_count, a.ar_try_count
            FROM products p
            JOIN analytics a ON p.id = a.product_id
            ORDER BY a.view_count DESC
        ''')
        
        analytics = cursor.fetchall()
        conn.close()
        
        analytics_list = []
        for item in analytics:
            analytics_dict = {
                'product_name': item[0],
                'view_count': item[1],
                'purchase_count': item[2],
                'ar_try_count': item[3]
            }
            analytics_list.append(analytics_dict)
        
        return jsonify({'analytics': analytics_list, 'success': True})
    
    except Exception as e:
        return jsonify({'error': str(e), 'success': False}), 500

@app.route('/api/ar-try/<int:product_id>', methods=['POST'])
def ar_try(product_id):
    """Record AR try event"""
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        cursor.execute('UPDATE analytics SET ar_try_count = ar_try_count + 1 WHERE product_id = ?', (product_id,))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True})
    
    except Exception as e:
        return jsonify({'error': str(e), 'success': False}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'RetailFlowAI Backend is running!'})

if __name__ == '__main__':
    # Initialize database on startup
    print(f"📁 Using database: {os.path.abspath(DATABASE)}")
    init_database()
    
    print("🚀 Starting RetailFlowAI Backend Server...")
    print("📊 Database initialized with products")
    print("🤖 Chatbot ready for mood-based suggestions")
    print("👨‍💼 Admin panel CRUD operations enabled")
    print("🥽 AR technology integrated")
    print("🌐 Server running on http://localhost:5000")
    
    app.run(debug=True, port=5000, host='0.0.0.0')
