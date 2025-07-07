#!/usr/bin/env python3
"""
Complete Flask server for RetailFlowAI with full chatbot functionality
This includes database initialization, mood detection, and all API endpoints
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import json
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])

DATABASE = 'retailflow.db'

def init_database_with_products():
    """Initialize database and add products if they don't exist"""
    
    # Create database and tables
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
    
    # Create user interactions table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS user_interactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_input TEXT,
        detected_mood TEXT,
        recommended_products TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
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
    
    # Check if products already exist
    cursor.execute('SELECT COUNT(*) FROM products')
    product_count = cursor.fetchone()[0]
    
    if product_count == 0:
        print("🔄 Adding initial products to database...")
        
        # Add products for all mood categories
        products = [
            # HAPPY MOOD PRODUCTS
            ("Premium Designer Sunglasses", "sunglasses", 89.99, "Stylish sunglasses for sunny days", "😎", 
             "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop", "RayBan", 4.8, True, 50, True, "happy,sunny,stylish", "happy"),
            
            ("Bright Happy T-Shirt", "t-shirt", 29.99, "Cheerful t-shirt to brighten your day", "😊", 
             "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop", "HappyWear", 4.5, True, 100, True, "happy,cheerful,casual", "happy"),
            
            ("Vibrant Summer Shorts", "shorts", 39.99, "Colorful shorts for fun times", "🌈", 
             "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop", "SummerVibes", 4.6, False, 75, True, "happy,summer,colorful", "happy"),
            
            # SAD/COMFORT MOOD PRODUCTS
            ("Cozy Comfort Hoodie", "hoodie", 59.99, "Ultra-soft hoodie for comfort", "🤗", 
             "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop", "ComfortZone", 4.9, True, 80, True, "comfort,soft,warm", "sad"),
            
            ("Warm Comfort Blanket", "blanket", 49.99, "Soft blanket for cozy moments", "🛌", 
             "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop", "WarmHugs", 4.7, False, 30, False, "comfort,warm,cozy", "sad"),
            
            ("Soothing Tea Mug", "mug", 19.99, "Perfect mug for relaxing tea time", "☕", 
             "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop", "CozyMoments", 4.4, False, 150, False, "comfort,tea,relaxing", "sad"),
            
            # NATURAL/CASUAL MOOD PRODUCTS  
            ("Classic Denim Jeans", "jeans", 79.99, "Perfect everyday jeans", "👖", 
             "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop", "DenimCo", 4.5, True, 90, True, "casual,everyday,denim", "natural"),
            
            ("Natural Cotton T-Shirt", "t-shirt", 24.99, "Comfortable cotton tee", "👕", 
             "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop", "NaturalWear", 4.3, False, 120, True, "natural,cotton,basic", "natural"),
            
            ("Casual Canvas Sneakers", "sneakers", 69.99, "Comfortable everyday sneakers", "👟", 
             "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", "ComfortStep", 4.6, True, 60, True, "casual,comfortable,sneakers", "natural"),
            
            # RAINY MOOD PRODUCTS
            ("Premium Rain Jacket", "jacket", 129.99, "Waterproof jacket for rainy days", "🌧️", 
             "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop", "WeatherGuard", 4.8, True, 40, True, "rainy,waterproof,protection", "rainy"),
            
            ("Waterproof Rain Boots", "boots", 89.99, "Keep your feet dry in style", "🥾", 
             "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", "DryStep", 4.7, False, 55, True, "rainy,waterproof,boots", "rainy"),
            
            ("Compact Travel Umbrella", "umbrella", 34.99, "Perfect umbrella for any weather", "☂️", 
             "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", "RainShield", 4.4, False, 100, False, "rainy,portable,protection", "rainy"),
        ]
        
        cursor.executemany('''
        INSERT INTO products 
        (name, category, price, description, emoji, image_url, brand, rating, is_trending, stock_quantity, ar_enabled, tags, mood_category)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', products)
        
        print(f"✅ Added {len(products)} products to database!")
        
        # Add analytics data for all products
        cursor.execute('SELECT id FROM products')
        product_ids = cursor.fetchall()
        
        analytics_data = []
        for product_id in product_ids:
            analytics_data.append((product_id[0], 10, 2, 5))
        
        cursor.executemany('''
        INSERT INTO analytics (product_id, view_count, purchase_count, ar_try_count)
        VALUES (?, ?, ?, ?)
        ''', analytics_data)
        
        print("✅ Added analytics data!")
        
    else:
        print(f"✅ Database already has {product_count} products")
    
    conn.commit()
    conn.close()
    print("✅ Database initialization complete!")

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
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT id, name, category, price, description, emoji, image_url, brand, rating, is_trending, 
               stock_quantity, ar_enabled, tags, mood_category
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
            'image': p[6],  # For chatbot compatibility
            'image_url': p[6],  # For admin compatibility
            'brand': p[7],
            'rating': p[8],
            'is_trending': bool(p[9]),
            'trending': bool(p[9]),  # For chatbot compatibility
            'stock_quantity': p[10],
            'stock': p[10],  # For chatbot compatibility
            'ar_enabled': bool(p[11]),
            'tags': p[12],
            'mood_category': p[13]
        } for p in products
    ]

@app.route('/api/test', methods=['GET'])
def test_server():
    """Test endpoint to verify server is running"""
    return jsonify({
        'status': 'SUCCESS',
        'message': 'RetailFlowAI backend is fully functional!',
        'endpoints': ['/api/chatbot', '/api/products', '/api/test'],
        'database_connected': True
    })

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    """Enhanced chatbot endpoint for mood-based product suggestions"""
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'No message provided', 'success': False}), 400
        
        # Analyze mood from user message
        mood = analyze_mood_from_text(user_message)
        
        # Get products for the detected mood
        products = get_products_by_mood(mood)
        
        # Log interaction
        try:
            conn = sqlite3.connect(DATABASE)
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO user_interactions (user_input, detected_mood, recommended_products)
                VALUES (?, ?, ?)
            ''', (user_message, mood, json.dumps([p['name'] for p in products])))
            conn.commit()
            conn.close()
        except Exception as e:
            print(f"Warning: Could not log interaction: {e}")
        
        # Create response based on mood
        mood_responses = {
            'happy': f"I sense you're feeling great! 😊 Here are some awesome products to match your happy mood:",
            'sad': f"I understand you might be feeling down. 💙 Let me suggest some comfort items to help you feel better:",
            'natural': f"Looking for something casual and natural? 🌿 Here are some everyday essentials for you:",
            'rainy': f"Rainy day vibes? ☔ I've got you covered with these weather-ready products:"
        }
        
        response_message = mood_responses.get(mood, f"Here are some products I think you'll like for your {mood} mood:")
        
        # If no products found, provide fallback
        if not products:
            response_message = f"I detected a {mood} mood, but let me show you some popular items instead!"
            # Get some trending products as fallback
            try:
                conn = sqlite3.connect(DATABASE)
                cursor = conn.cursor()
                cursor.execute('''
                    SELECT id, name, category, price, description, emoji, image_url, brand, rating, is_trending, 
                           stock_quantity, ar_enabled, tags, mood_category
                    FROM products 
                    WHERE is_trending = 1
                    ORDER BY rating DESC
                    LIMIT 6
                ''')
                trending_products = cursor.fetchall()
                conn.close()
                
                products = [
                    {
                        'id': p[0], 'name': p[1], 'category': p[2], 'price': p[3], 'description': p[4],
                        'emoji': p[5], 'image': p[6], 'image_url': p[6], 'brand': p[7], 'rating': p[8],
                        'is_trending': bool(p[9]), 'stock_quantity': p[10], 'ar_enabled': bool(p[11]),
                        'tags': p[12], 'mood_category': p[13]
                    } for p in trending_products
                ]
            except Exception as e:
                print(f"Warning: Could not get fallback products: {e}")
        
        return jsonify({
            'message': response_message,
            'mood': mood,
            'products': products[:6],  # Limit to 6 products
            'success': True
        })
    
    except Exception as e:
        print(f"Chatbot error: {e}")
        return jsonify({'error': str(e), 'success': False}), 500

@app.route('/api/products', methods=['GET', 'POST'])
def handle_products():
    """Handle both getting all products and adding new products"""
    if request.method == 'GET':
        try:
            conn = sqlite3.connect(DATABASE)
            cursor = conn.cursor()
            
            cursor.execute('''
                SELECT id, name, category, mood_category, price, description, emoji, image_url, brand, rating, tags, is_trending, stock_quantity, ar_enabled
                FROM products 
                ORDER BY is_trending DESC, rating DESC, name
            ''')
            
            products = cursor.fetchall()
            conn.close()
            
            product_list = [
                {
                    'id': p[0], 'name': p[1], 'category': p[2], 'mood_category': p[3], 'price': p[4],
                    'description': p[5], 'emoji': p[6], 'image_url': p[7], 'brand': p[8], 'rating': p[9],
                    'tags': p[10], 'is_trending': bool(p[11]), 'stock_quantity': p[12], 'ar_enabled': bool(p[13])
                } for p in products
            ]
            
            return jsonify({'success': True, 'products': product_list})
        
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    
    elif request.method == 'POST':
        # Check if this is a mood-based product request (from chatbot)
        data = request.get_json()
        if 'mood' in data:
            # Handle mood-based product recommendations
            user_input = data.get("mood", "").lower().strip()
            detected_mood = analyze_mood_from_text(user_input)
            products = get_products_by_mood(detected_mood)
            
            # Create response message
            if products:
                mood_messages = {
                    'happy': '😊 You seem happy! Here are some bright and cheerful items for you:',
                    'sad': '🤗 I understand you might be feeling down. Here are some comfort items:',
                    'natural': '😌 Looking for something natural and casual? Perfect choices:',
                    'rainy': '🌧️ Rainy weather detected! Here are some weather protection items:'
                }
                
                message = mood_messages.get(detected_mood, f'Here are some great products for your {detected_mood} mood:')
                
                return jsonify({
                    "success": True,
                    "message": message,
                    "detected_mood": detected_mood,
                    "products": products
                })
            else:
                return jsonify({
                    "success": True,
                    "message": "I couldn't find specific products for that mood, but here are some general recommendations:",
                    "detected_mood": detected_mood,
                    "products": []
                })

@app.route('/api/products/<int:product_id>', methods=['PUT', 'DELETE'])
def handle_product(product_id):
    """Handle updating or deleting a specific product"""
    if request.method == 'PUT':
        try:
            data = request.get_json()
            conn = sqlite3.connect(DATABASE)
            cursor = conn.cursor()
            
            cursor.execute('''
                UPDATE products 
                SET name=?, category=?, mood_category=?, price=?, description=?, emoji=?, 
                    image_url=?, brand=?, rating=?, tags=?, is_trending=?, stock_quantity=?, ar_enabled=?
                WHERE id=?
            ''', (
                data['name'], data['category'], data.get('mood_category', 'natural'),
                data['price'], data.get('description', ''), data.get('emoji', '🛍️'),
                data.get('image_url', ''), data.get('brand', ''), data.get('rating', 4.5),
                data.get('tags', ''), data.get('is_trending', False), 
                data.get('stock_quantity', 100), data.get('ar_enabled', True), product_id
            ))
            
            conn.commit()
            conn.close()
            
            return jsonify({'success': True, 'message': 'Product updated successfully'})
            
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    
    elif request.method == 'DELETE':
        try:
            conn = sqlite3.connect(DATABASE)
            cursor = conn.cursor()
            
            cursor.execute('DELETE FROM products WHERE id=?', (product_id,))
            cursor.execute('DELETE FROM analytics WHERE product_id=?', (product_id,))
            
            conn.commit()
            conn.close()
            
            return jsonify({'success': True, 'message': 'Product deleted successfully'})
            
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    """Get analytics data"""
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        # Get product analytics
        cursor.execute('''
            SELECT p.name, a.view_count, a.purchase_count, a.ar_try_count
            FROM products p
            LEFT JOIN analytics a ON p.id = a.product_id
            ORDER BY a.view_count DESC
        ''')
        product_analytics = cursor.fetchall()
        
        # Get mood statistics
        cursor.execute('''
            SELECT detected_mood, COUNT(*) as count
            FROM user_interactions
            GROUP BY detected_mood
            ORDER BY count DESC
        ''')
        mood_stats = cursor.fetchall()
        
        # Get recent interactions
        cursor.execute('''
            SELECT user_input, detected_mood, timestamp
            FROM user_interactions
            ORDER BY timestamp DESC
            LIMIT 10
        ''')
        recent_interactions = cursor.fetchall()
        
        conn.close()
        
        return jsonify({
            'success': True,
            'product_analytics': [
                {'name': p[0], 'views': p[1] or 0, 'purchases': p[2] or 0, 'ar_tries': p[3] or 0}
                for p in product_analytics
            ],
            'mood_stats': [
                {'mood': m[0], 'count': m[1]} for m in mood_stats
            ],
            'recent_interactions': [
                {'input': i[0], 'mood': i[1], 'timestamp': i[2]} for i in recent_interactions
            ]
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    print("🚀 Starting RetailFlowAI Complete Server...")
    print("🔄 Initializing database...")
    
    # Initialize database with products
    init_database_with_products()
    
    print("✅ Database ready!")
    print("🌐 Starting Flask server on http://localhost:5000")
    print("📱 Frontend should be at http://localhost:3000")
    print("\n🧪 Test the chatbot with these inputs:")
    print("   - 'I feel happy'")
    print("   - 'I'm sad'") 
    print("   - 'rainy day'")
    print("   - 'need sunglasses'")
    print("   - 'need coat'")
    print("\n⚠️  Make sure to start the React frontend with 'npm start' in the client folder!")
    
    app.run(debug=True, port=5000, host='0.0.0.0')
