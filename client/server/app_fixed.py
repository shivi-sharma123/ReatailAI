from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import json

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

DATABASE = 'retailflow.db'

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
               stock_quantity, ar_enabled, tags
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
            'tags': p[12]
        } for p in products
    ]

def get_all_products():
    """Get all products for admin panel"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT id, name, category, mood_category, price, description, emoji, image_url, brand, rating, tags, is_trending, stock_quantity, ar_enabled, three_d_model
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
            'ar_enabled': bool(p[13]),
            'three_d_model': p[14]
        } for p in products
    ]

@app.route('/api/products', methods=['POST'])
def recommend_products():
    """Chatbot endpoint for mood-based product recommendations"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
            
        user_input = data.get("mood", "").lower().strip()
        detected_mood = analyze_mood_from_text(user_input)
        
        # Get products from database
        products = get_products_by_mood(detected_mood)
        
        # Log interaction
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO user_interactions (user_input, detected_mood, recommended_products)
            VALUES (?, ?, ?)
        ''', (user_input, detected_mood, json.dumps([p['name'] for p in products])))
        conn.commit()
        conn.close()
        
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
                "message": message,
                "detected_mood": detected_mood,
                "products": products
            })
        else:
            return jsonify({
                "message": "I couldn't find specific products for that mood, but here are some general recommendations:",
                "detected_mood": detected_mood,
                "products": []
            })
            
    except Exception as e:
        print(f"Error in recommend_products: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/admin/products', methods=['GET'])
def get_admin_products():
    """Get all products for admin panel"""
    try:
        products = get_all_products()
        return jsonify({"products": products})
    except Exception as e:
        print(f"Error getting products: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/admin/products', methods=['POST'])
def add_product():
    """Add a new product"""
    try:
        data = request.get_json()
        
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO products (name, category, mood_category, price, description, emoji, image_url, brand, rating, tags, is_trending, stock_quantity, ar_enabled, three_d_model)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data.get('name'),
            data.get('category'),
            data.get('mood_category'),
            data.get('price', 0.0),
            data.get('description'),
            data.get('emoji'),
            data.get('image_url'),
            data.get('brand'),
            data.get('rating', 0.0),
            data.get('tags'),
            int(data.get('is_trending', False)),
            data.get('stock_quantity', 100),
            int(data.get('ar_enabled', False)),
            data.get('three_d_model')
        ))
        
        product_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return jsonify({"success": True, "product_id": product_id})
        
    except Exception as e:
        print(f"Error adding product: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/admin/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    """Update an existing product"""
    try:
        data = request.get_json()
        
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        cursor.execute('''
            UPDATE products 
            SET name=?, category=?, mood_category=?, price=?, description=?, emoji=?, image_url=?, brand=?, rating=?, tags=?, is_trending=?, stock_quantity=?, ar_enabled=?, three_d_model=?
            WHERE id=?
        ''', (
            data.get('name'),
            data.get('category'),
            data.get('mood_category'),
            data.get('price', 0.0),
            data.get('description'),
            data.get('emoji'),
            data.get('image_url'),
            data.get('brand'),
            data.get('rating', 0.0),
            data.get('tags'),
            int(data.get('is_trending', False)),
            data.get('stock_quantity', 100),
            int(data.get('ar_enabled', False)),
            data.get('three_d_model'),
            product_id
        ))
        
        conn.commit()
        conn.close()
        
        return jsonify({"success": True})
        
    except Exception as e:
        print(f"Error updating product: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/admin/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    """Delete a product"""
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        # Get product info before deletion
        cursor.execute('SELECT name FROM products WHERE id = ?', (product_id,))
        product = cursor.fetchone()
        
        if not product:
            return jsonify({"success": False, "error": "Product not found"}), 404
        
        product_name = product[0]
        
        # Delete the product
        cursor.execute('DELETE FROM products WHERE id = ?', (product_id,))
        conn.commit()
        conn.close()
        
        return jsonify({
            "success": True,
            "message": f"Product '{product_name}' deleted successfully",
            "deleted_product": {"name": product_name}
        })
        
    except Exception as e:
        print(f"Error deleting product: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/admin/analytics', methods=['GET'])
def get_analytics():
    """Get analytics data"""
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        # Mood stats
        cursor.execute('''
            SELECT detected_mood, COUNT(*) as count
            FROM user_interactions
            GROUP BY detected_mood
            ORDER BY count DESC
        ''')
        mood_stats = cursor.fetchall()
        
        # Recent interactions
        cursor.execute('''
            SELECT user_input, detected_mood, timestamp
            FROM user_interactions
            ORDER BY timestamp DESC
            LIMIT 10
        ''')
        recent_interactions = cursor.fetchall()
        
        conn.close()
        
        return jsonify({
            'mood_stats': [{'mood': m[0], 'count': m[1]} for m in mood_stats],
            'recent_interactions': [
                {'user_input': r[0], 'detected_mood': r[1], 'timestamp': r[2]}
                for r in recent_interactions
            ]
        })
        
    except Exception as e:
        print(f"Error getting analytics: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/test', methods=['GET'])
def test_endpoint():
    """Test endpoint to check if server is running"""
    return jsonify({"message": "Server is running!", "status": "OK"})

if __name__ == '__main__':
    print("🚀 Starting RetailFlowAI Backend Server...")
    print("📊 Database ready with products")
    print("🌐 Server will run on http://localhost:5000")
    app.run(debug=True, port=5000)
