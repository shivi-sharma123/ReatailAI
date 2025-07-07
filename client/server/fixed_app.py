from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import json
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
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Create products table with enhanced columns
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
        sizes TEXT
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
    
    conn.commit()
    conn.close()
    print("✅ Database initialized!")

def parse_product_data(product):
    """Parse product data including JSON fields"""
    try:
        # Handle different column counts for backward compatibility
        if len(product) >= 17:
            images = json.loads(product[14]) if product[14] else [product[6]]
            colors = json.loads(product[15]) if product[15] else []
            sizes = json.loads(product[16]) if product[16] else []
        else:
            images = [product[6]]
            colors = []
            sizes = []
    except (json.JSONDecodeError, IndexError):
        images = [product[6] if len(product) > 6 else ""]
        colors = []
        sizes = []
    
    return {
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
        'mood_category': product[13],
        'images': images,
        'colors': colors,
        'sizes': sizes
    }

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
    elif any(word in text for word in ['professional', 'work', 'office', 'business']):
        return 'professional'
    
    # Product-specific searches
    elif any(word in text for word in ['sunglasses', 'glasses', 'shades']):
        return 'happy'
    elif any(word in text for word in ['dress', 'frock', 'gown']):
        return 'happy'
    elif any(word in text for word in ['jeans', 'pants', 'denim']):
        return 'natural'
    elif any(word in text for word in ['bag', 'handbag', 'purse']):
        return 'professional'
    elif any(word in text for word in ['umbrella', 'rain gear']):
        return 'rainy'
    elif any(word in text for word in ['kitchen', 'cooking', 'cookware']):
        return 'natural'
    
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
            product_dict = parse_product_data(product)
            product_list.append(product_dict)
        
        return product_list
    except Exception as e:
        print(f"Error getting products by mood: {e}")
        return []

@app.route('/api/products', methods=['GET'])
def get_products():
    """Get all products with enhanced data"""
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
            product_dict = parse_product_data(product)
            product_list.append(product_dict)
        
        return jsonify({'products': product_list, 'success': True})
    
    except Exception as e:
        print(f"Error getting products: {e}")
        return jsonify({'error': str(e), 'success': False}), 500

@app.route('/api/products', methods=['POST'])
def add_product():
    """Add a new product"""
    try:
        data = request.get_json()
        
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        # Convert arrays to JSON strings
        images_json = json.dumps(data.get('images', []))
        colors_json = json.dumps(data.get('colors', []))
        sizes_json = json.dumps(data.get('sizes', []))
        
        cursor.execute('''
            INSERT INTO products (name, category, price, description, emoji, image_url, brand, rating, 
                                is_trending, stock_quantity, ar_enabled, tags, mood_category, images, colors, sizes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
            data.get('mood_category'),
            images_json,
            colors_json,
            sizes_json
        ))
        
        product_id = cursor.lastrowid
        
        # Add analytics entry
        cursor.execute('INSERT INTO analytics (product_id) VALUES (?)', (product_id,))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'product_id': product_id})
    
    except Exception as e:
        print(f"Error adding product: {e}")
        return jsonify({'error': str(e), 'success': False}), 500

@app.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    """Update a product"""
    try:
        data = request.get_json()
        
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        # Convert arrays to JSON strings
        images_json = json.dumps(data.get('images', []))
        colors_json = json.dumps(data.get('colors', []))
        sizes_json = json.dumps(data.get('sizes', []))
        
        cursor.execute('''
            UPDATE products 
            SET name=?, category=?, price=?, description=?, emoji=?, image_url=?, brand=?, rating=?, 
                is_trending=?, stock_quantity=?, ar_enabled=?, tags=?, mood_category=?, images=?, colors=?, sizes=?
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
            images_json,
            colors_json,
            sizes_json,
            product_id
        ))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True})
    
    except Exception as e:
        print(f"Error updating product: {e}")
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
        print(f"Error deleting product: {e}")
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
            'rainy': f"Rainy day vibes? ☔ I've got you covered with these weather-ready products:",
            'professional': f"Need something professional? 💼 Here are some elegant choices for your workplace:"
        }
        
        response_message = mood_responses.get(mood, "Here are some products I think you'll like:")
        
        return jsonify({
            'message': response_message,
            'mood': mood,
            'products': products[:6],  # Limit to 6 products
            'success': True
        })
    
    except Exception as e:
        print(f"Error in chatbot: {e}")
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
        print(f"Error getting analytics: {e}")
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
        print(f"Error recording AR try: {e}")
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
    print("📊 Database initialized with enhanced features")
    print("🤖 Chatbot ready for mood-based suggestions")
    print("👨‍💼 Admin panel CRUD operations enabled")
    print("🥽 AR technology integrated with colors and sizes")
    print("🎨 Color selection and size options available")
    print("🌐 Server running on http://localhost:5000")
    
    app.run(debug=True, port=5000, host='0.0.0.0')
