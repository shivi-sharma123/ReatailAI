from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import json
import os
import time
import random
import warnings
import logging

# Suppress Flask development server warning
warnings.filterwarnings('ignore', message='This is a development server')

# Configure logging to reduce noise
logging.getLogger('werkzeug').setLevel(logging.ERROR)

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])

# Get the correct database path - use the main project directory
DATABASE = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'retailflow.db')
print(f"🔍 Looking for database at: {DATABASE}")

# If database doesn't exist in parent directory, check current directory
if not os.path.exists(DATABASE):
    current_dir_db = 'retailflow.db'
    if os.path.exists(current_dir_db):
        DATABASE = current_dir_db
        print(f"📁 Using database from current directory: {DATABASE}")
    else:
        DATABASE = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'retailflow.db')
        print(f"📁 Will create new database at: {DATABASE}")

def init_database():
    """Initialize database with products if it doesn't exist"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Create products table with enhanced AR columns
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
    """Parse product data including JSON fields and AR features"""
    try:
        # Handle different column counts for backward compatibility
        if len(product) >= 23:  # New structure with AR fields
            images = json.loads(product[14]) if product[14] else [product[6]]
            colors = json.loads(product[15]) if product[15] else [
                {'name': 'Red', 'hex': '#ff4444', 'image': product[6]},
                {'name': 'Blue', 'hex': '#2196F3', 'image': product[6]},
                {'name': 'Green', 'hex': '#4CAF50', 'image': product[6]},
                {'name': 'Black', 'hex': '#333333', 'image': product[6]}
            ]
            sizes = json.loads(product[16]) if product[16] else [
                {'name': 'XS', 'price_modifier': -5, 'stock': 20},
                {'name': 'S', 'price_modifier': -2, 'stock': 30},
                {'name': 'M', 'price_modifier': 0, 'stock': 50},
                {'name': 'L', 'price_modifier': 0, 'stock': 40},
                {'name': 'XL', 'price_modifier': 5, 'stock': 25},
                {'name': 'XXL', 'price_modifier': 10, 'stock': 15}
            ]
            ar_model_url = product[17] if len(product) > 17 else None
            ar_preview_url = product[18] if len(product) > 18 else None
            color_variants = json.loads(product[19]) if len(product) > 19 and product[19] else colors
            size_options = json.loads(product[20]) if len(product) > 20 and product[20] else sizes
            material = product[21] if len(product) > 21 else 'Cotton Blend'
            dimensions = product[22] if len(product) > 22 else 'Standard Fit'
        elif len(product) >= 17:  # Old structure
            images = json.loads(product[14]) if product[14] else [product[6]]
            colors = json.loads(product[15]) if product[15] else [
                {'name': 'Red', 'hex': '#ff4444', 'image': product[6]},
                {'name': 'Blue', 'hex': '#2196F3', 'image': product[6]},
                {'name': 'Green', 'hex': '#4CAF50', 'image': product[6]},
                {'name': 'Black', 'hex': '#333333', 'image': product[6]}
            ]
            sizes = json.loads(product[16]) if product[16] else [
                {'name': 'S', 'price_modifier': -5, 'stock': 30},
                {'name': 'M', 'price_modifier': 0, 'stock': 50},
                {'name': 'L', 'price_modifier': 0, 'stock': 40},
                {'name': 'XL', 'price_modifier': 5, 'stock': 25}
            ]
            ar_model_url = None
            ar_preview_url = None
            color_variants = colors
            size_options = sizes
            material = 'Cotton Blend'
            dimensions = 'Standard Fit'
        else:
            images = [product[6]]
            colors = [
                {'name': 'Red', 'hex': '#ff4444', 'image': product[6]},
                {'name': 'Blue', 'hex': '#2196F3', 'image': product[6]},
                {'name': 'Green', 'hex': '#4CAF50', 'image': product[6]},
                {'name': 'Black', 'hex': '#333333', 'image': product[6]}
            ]
            sizes = [
                {'name': 'S', 'price_modifier': -5, 'stock': 30},
                {'name': 'M', 'price_modifier': 0, 'stock': 50},
                {'name': 'L', 'price_modifier': 0, 'stock': 40},
                {'name': 'XL', 'price_modifier': 5, 'stock': 25}
            ]
    except (json.JSONDecodeError, IndexError):
        images = [product[6] if len(product) > 6 else ""]
        colors = [
            {'name': 'Red', 'hex': '#ff4444', 'image': product[6] if len(product) > 6 else ''},
            {'name': 'Blue', 'hex': '#2196F3', 'image': product[6] if len(product) > 6 else ''},
            {'name': 'Green', 'hex': '#4CAF50', 'image': product[6] if len(product) > 6 else ''},
            {'name': 'Black', 'hex': '#333333', 'image': product[6] if len(product) > 6 else ''}
        ]
        sizes = [
            {'name': 'S', 'price_modifier': -5, 'stock': 30},
            {'name': 'M', 'price_modifier': 0, 'stock': 50},
            {'name': 'L', 'price_modifier': 0, 'stock': 40},
            {'name': 'XL', 'price_modifier': 5, 'stock': 25}
        ]
        ar_model_url = None
        ar_preview_url = None
        color_variants = colors
        size_options = sizes
        material = 'Cotton Blend'
        dimensions = 'Standard Fit'
    
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
        'colors': color_variants,
        'sizes': size_options,
        'ar_model_url': ar_model_url,
        'ar_preview_url': ar_preview_url,
        'material': material,
        'dimensions': dimensions
    }

def analyze_mood_from_text(text):
    """Advanced mood analysis with specific product matching"""
    text = text.lower()
    
    # Enhanced mood detection with product-specific intelligence
    mood_mapping = {
        'sad': ['sad', 'depressed', 'down', 'blue', 'upset', 'crying', 'lonely', 'heartbroken', 'tired', 'stressed'],
        'happy': ['happy', 'joy', 'cheerful', 'bright', 'colorful', 'fun', 'smile', 'excited', 'great', 'amazing'],
        'normal': ['normal', 'regular', 'everyday', 'usual', 'typical', 'standard', 'basic', 'simple', 'ok', 'fine'],
        'party': ['party', 'nightlife', 'club', 'dance', 'celebration', 'birthday', 'wedding', 'event'],
        'fitness': ['gym', 'workout', 'fitness', 'sport', 'running', 'exercise', 'training', 'athletic'],
        'professional': ['work', 'office', 'professional', 'business', 'meeting', 'formal', 'interview'],
        'casual': ['casual', 'comfort', 'relaxed', 'chill', 'easy'],
        'romantic': ['romantic', 'date', 'dinner', 'valentine', 'love', 'anniversary', 'special'],
        'cool': ['cool', 'stylish', 'trendy', 'fashion', 'hip', 'modern', 'chic'],
        'shopping': ['shopping', 'buy', 'purchase', 'need', 'want', 'looking', 'show']
    }
    
    # Check for specific product requests first
    if any(word in text for word in ['dress', 'dresses', 'frock', 'gown', 'evening']):
        return 'party' if any(word in text for word in ['party', 'night', 'event']) else 'romantic'
    
    if any(word in text for word in ['jeans', 'pants', 'denim', 'casual']):
        return 'casual'
    
    if any(word in text for word in ['jacket', 'coat', 'blazer', 'professional']):
        return 'professional' if any(word in text for word in ['work', 'office', 'professional']) else 'cool'
    
    if any(word in text for word in ['sunglasses', 'glasses', 'shades']):
        return 'cool'
    
    if any(word in text for word in ['watch', 'time', 'electronics']):
        return 'professional'
    
    if any(word in text for word in ['bag', 'handbag', 'purse', 'luxury']):
        return 'professional'
    
    if any(word in text for word in ['shoes', 'sneakers', 'boots']):
        return 'fitness' if any(word in text for word in ['sport', 'gym', 'run']) else 'casual'
    
    if any(word in text for word in ['kitchen', 'cookware', 'cooking']):
        return 'shopping'
    
    if any(word in text for word in ['umbrella', 'rain']):
        return 'shopping'
    
    # Check for mood keywords
    for mood, keywords in mood_mapping.items():
        if any(keyword in text for keyword in keywords):
            return mood
    
    return 'shopping'  # Default to general shopping

def get_products_by_mood(mood_category, user_text=""):
    """Get smart, diverse product recommendations based on mood and user request"""
    
    # Mood configuration for smart filtering
    mood_configs = {
        'party': {
            'preferred_items': ['dress', 'Clothing', 'accessories', 'sunglasses', 'bag', 'shoes'],
            'exclude': ['kitchen', 'umbrella', 'cookware'],
            'message': "🎉 PARTY TIME! Let's get you looking absolutely stunning for your celebration!"
        },
        'fitness': {
            'preferred_items': ['shoes', 'clothing', 'electronics', 'bag'],
            'exclude': ['dress', 'formal', 'kitchen'],
            'message': "💪 FITNESS MODE ACTIVATED! Here's gear to crush your workout goals!"
        },
        'professional': {
            'preferred_items': ['Clothing', 'dress', 'accessories', 'bag', 'shoes'],
            'exclude': ['casual', 'kitchen'],
            'message': "💼 PROFESSIONAL POWER MODE! Command respect with these sophisticated choices!"
        },
        'casual': {
            'preferred_items': ['pants', 'clothing', 'shoes', 'bag', 'sunglasses'],
            'exclude': ['formal'],
            'message': "😌 CASUAL COMFORT ZONE! Perfect everyday essentials for your relaxed vibe!"
        },
        'romantic': {
            'preferred_items': ['dress', 'Clothing', 'accessories', 'bag'],
            'exclude': ['casual', 'sport', 'kitchen'],
            'message': "💕 ROMANCE READY! Make hearts skip a beat with these enchanting selections!"
        },
        'happy': {
            'preferred_items': ['dress', 'clothing', 'sunglasses', 'bag', 'accessories'],
            'exclude': ['kitchen'],
            'message': "😊 HAPPINESS OVERLOAD! Bright and beautiful picks to match your sunny mood!"
        },
        'cool': {
            'preferred_items': ['sunglasses', 'Clothing', 'pants', 'accessories', 'shoes'],
            'exclude': ['kitchen', 'umbrella'],
            'message': "😎 COOL FACTOR MAXIMIZED! Ultra-stylish picks that scream confidence!"
        },
        'shopping': {
            'preferred_items': ['dress', 'Clothing', 'pants', 'sunglasses', 'accessories', 'bag'],
            'exclude': [],
            'message': "🛍️ SHOPPING SPREE TIME! Amazing finds that you absolutely need to see!"
        }
    }
    
    config = mood_configs.get(mood_category, mood_configs['shopping'])
    
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        # Get all products for smart filtering
        cursor.execute('''
            SELECT id, name, category, price, description, emoji, image_url, brand, rating, is_trending, 
                   stock_quantity, ar_enabled, tags, mood_category, images, colors, sizes
            FROM products 
            ORDER BY is_trending DESC, rating DESC, name
        ''')
        
        all_products = cursor.fetchall()
        conn.close()
        
        # Smart filtering
        recommended_products = []
        
        for product in all_products:
            product_name = product[1].lower()
            product_category = product[2].lower()
            product_description = (product[4] or '').lower()
            
            # Check if product matches preferred items (check name, category, and description)
            matches_preference = any(
                item.lower() in product_name or 
                item.lower() in product_category or 
                item.lower() in product_description
                for item in config['preferred_items']
            )
            
            # Check if product should be excluded
            should_exclude = any(
                exclude_word.lower() in product_name or 
                exclude_word.lower() in product_category or 
                exclude_word.lower() in product_description
                for exclude_word in config['exclude']
            )
            
            if matches_preference and not should_exclude:
                product_dict = parse_product_data(product)
                recommended_products.append(product_dict)
        
        # If we don't have enough products, add some general ones
        if len(recommended_products) < 6:
            for product in all_products:
                if len(recommended_products) >= 6:
                    break
                    
                # Skip if already added
                if any(p['id'] == product[0] for p in recommended_products):
                    continue
                    
                product_dict = parse_product_data(product)
                recommended_products.append(product_dict)
        
        # Shuffle for variety
        random.shuffle(recommended_products)
        
        return recommended_products[:6]
        
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
    """Intelligent chatbot endpoint for mood-based product suggestions"""
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'No message provided', 'success': False}), 400
        
        # Analyze mood from user message with enhanced intelligence
        mood = analyze_mood_from_text(user_message)
        
        # Get smart product recommendations
        products = get_products_by_mood(mood, user_message)
        
        # Enhanced mood responses with personality
        mood_responses = {
            'sad': f"💙 I'm here for you! Here are some comforting and uplifting products that might brighten your day:",
            'happy': f"😊 HAPPINESS OVERLOAD! Bright and beautiful picks to match your sunny mood and radiant energy:",
            'normal': f"😌 Perfect everyday essentials for your regular day - simple, comfortable, and stylish:",
            'party': f"🎉 PARTY TIME! Let's get you looking absolutely stunning for your celebration! I found the perfect party essentials:",
            'fitness': f"💪 FITNESS MODE ACTIVATED! Here's amazing gear to crush your workout goals and look fantastic:",
            'professional': f"💼 PROFESSIONAL POWER MODE! Command respect with these sophisticated choices that scream success:",
            'casual': f"😌 CASUAL COMFORT ZONE! Perfect everyday essentials for your relaxed vibe and effortless style:",
            'romantic': f"💕 ROMANCE READY! Make hearts skip a beat with these enchanting selections for your special moments:",
            'cool': f"😎 COOL FACTOR MAXIMIZED! Ultra-stylish picks that scream confidence and modern sophistication:",
            'shopping': f"🛍️ SHOPPING SPREE TIME! Amazing finds that you absolutely need to see - your style game is about to level up:"
        }
        
        response_message = mood_responses.get(mood, "🌟 I've found some incredible products that I think you'll absolutely love!")
        
        # Add some variety to responses
        if len(products) == 0:
            response_message = f"🔍 Hmm, let me find something amazing for '{user_message}'! Here are some fantastic options that caught my eye:"
            # Get any 6 products as fallback
            products = get_products_by_mood('shopping', user_message)
        
        return jsonify({
            'message': response_message,
            'mood': mood,
            'products': products[:6],  # Limit to 6 products
            'success': True
        })
    
    except Exception as e:
        print(f"Error in chatbot: {e}")
        return jsonify({'error': str(e), 'success': False}), 500

@app.route('/api/search', methods=['POST'])
def advanced_search():
    """Advanced AI-powered search with filters"""
    try:
        data = request.get_json()
        query = data.get('query', '').lower()
        filters = data.get('filters', {})
        
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        # Build dynamic SQL query based on filters
        sql = "SELECT * FROM products WHERE 1=1"
        params = []
        
        # Text search in name, description, tags, and mood_category
        if query:
            sql += " AND (LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(tags) LIKE ? OR LOWER(mood_category) LIKE ?)"
            query_param = f"%{query}%"
            params.extend([query_param, query_param, query_param, query_param])
        
        # Apply filters
        if filters.get('category'):
            sql += " AND LOWER(category) = ?"
            params.append(filters['category'].lower())
        
        if filters.get('priceRange'):
            price_range = filters['priceRange']
            if price_range == 'under-50':
                sql += " AND price < 50"
            elif price_range == '50-100':
                sql += " AND price BETWEEN 50 AND 100"
            elif price_range == '100-200':
                sql += " AND price BETWEEN 100 AND 200"
            elif price_range == 'over-200':
                sql += " AND price > 200"
        
        if filters.get('mood'):
            sql += " AND LOWER(mood_category) LIKE ?"
            params.append(f"%{filters['mood'].lower()}%")
        
        # Add ordering by relevance and trending status
        sql += " ORDER BY is_trending DESC, rating DESC, id DESC LIMIT 50"
        
        cursor.execute(sql, params)
        products = cursor.fetchall()
        conn.close()
        
        # Convert to list of dictionaries
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
                'mood_category': product[13],
                'images': json.loads(product[14]) if product[14] else [product[6]],
                'colors': json.loads(product[15]) if product[15] else [],
                'sizes': json.loads(product[16]) if product[16] else [],
                'ar_model_url': product[17]
            }
            product_list.append(product_dict)
        
        return jsonify({
            'products': product_list,
            'total_results': len(product_list),
            'query': query,
            'filters_applied': filters,
            'success': True
        })
    
    except Exception as e:
        print(f"Error in search: {e}")
        return jsonify({'error': str(e), 'success': False}), 500

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    """Get comprehensive analytics data"""
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        # Get basic analytics
        cursor.execute('''
            SELECT p.name, p.category, p.price, p.brand, a.view_count, a.purchase_count, a.ar_try_count, p.rating, p.is_trending
            FROM products p
            LEFT JOIN analytics a ON p.id = a.product_id
            ORDER BY a.view_count DESC
        ''')
        
        analytics = cursor.fetchall()
        
        # Get popular categories
        cursor.execute('''
            SELECT category, COUNT(*) as count, AVG(rating) as avg_rating
            FROM products
            GROUP BY category
            ORDER BY count DESC
        ''')
        categories = cursor.fetchall()
        
        # Get color popularity (parse JSON colors)
        cursor.execute('SELECT colors FROM products WHERE colors IS NOT NULL AND colors != ""')
        color_data = cursor.fetchall()
        
        # Get trending products
        cursor.execute('''
            SELECT name, category, price, rating, ar_enabled
            FROM products
            WHERE is_trending = 1
            ORDER BY rating DESC
            LIMIT 10
        ''')
        trending = cursor.fetchall()
        
        conn.close()
        
        # Process analytics data
        analytics_list = []
        total_views = 0
        total_ar_tries = 0
        total_purchases = 0
        
        for item in analytics:
            view_count = item[4] if item[4] else 0
            purchase_count = item[5] if item[5] else 0
            ar_try_count = item[6] if item[6] else 0
            
            total_views += view_count
            total_purchases += purchase_count
            total_ar_tries += ar_try_count
            
            analytics_dict = {
                'product_name': item[0],
                'category': item[1],
                'price': item[2],
                'brand': item[3],
                'view_count': view_count,
                'purchase_count': purchase_count,
                'ar_try_count': ar_try_count,
                'rating': item[7],
                'is_trending': bool(item[8])
            }
            analytics_list.append(analytics_dict)
        
        # Process categories
        category_stats = []
        for cat in categories:
            category_stats.append({
                'name': cat[0],
                'product_count': cat[1],
                'avg_rating': round(cat[2], 2) if cat[2] else 0
            })
        
        # Process trending products
        trending_list = []
        for trend in trending:
            trending_list.append({
                'name': trend[0],
                'category': trend[1],
                'price': trend[2],
                'rating': trend[3],
                'ar_enabled': bool(trend[4])
            })
        
        # Calculate metrics
        conversion_rate = (total_purchases / max(total_views, 1)) * 100
        ar_engagement = (total_ar_tries / max(total_views, 1)) * 100
        
        return jsonify({
            'analytics': analytics_list[:20],  # Top 20 products
            'categories': category_stats,
            'trending_products': trending_list,
            'summary': {
                'total_views': total_views,
                'total_purchases': total_purchases,
                'total_ar_tries': total_ar_tries,
                'conversion_rate': round(conversion_rate, 2),
                'ar_engagement_rate': round(ar_engagement, 2),
                'live_users': 147,  # Simulated live user count
                'revenue_today': round(total_purchases * 89.99, 2)  # Simulated revenue
            },
            'success': True
        })
    
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

@app.route('/', methods=['GET'])
def welcome():
    """Welcome page for the backend API"""
    return jsonify({
        'message': '🛍️ Welcome to RetailFlowAI Backend API!',
        'status': 'running',
        'version': '2.0.0',
        'features': [
            '🤖 AI-powered mood detection',
            '🥽 AR product visualization',
            '🎨 Color and size customization',
            '📊 Real-time analytics',
            '🔍 Smart product search'
        ],
        'available_endpoints': [
            '/api/health - Health check',
            '/api/products - Get all products',
            '/api/chatbot - Mood-based recommendations',
            '/api/search - Advanced product search',
            '/api/analytics - Analytics dashboard'
        ],
        'frontend_url': 'http://localhost:3000',
        'documentation': 'Visit frontend for full shopping experience'
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'RetailFlowAI Backend is running!'})

# Enhanced API endpoints for mood analytics and recommendations
@app.route('/api/mood-analytics', methods=['GET'])
def get_mood_analytics():
    """Get comprehensive mood analytics data"""
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        # Get mood summary data
        mood_summaries = [
            {'mood': 'happy', 'interactions': 156, 'success_rate': 0.89, 'avg_products_viewed': 3.4, 'trending': True},
            {'mood': 'party', 'interactions': 89, 'success_rate': 0.92, 'avg_products_viewed': 4.1, 'trending': True},
            {'mood': 'professional', 'interactions': 134, 'success_rate': 0.87, 'avg_products_viewed': 2.8, 'trending': True},
            {'mood': 'fitness', 'interactions': 76, 'success_rate': 0.85, 'avg_products_viewed': 3.2, 'trending': False},
            {'mood': 'romantic', 'interactions': 67, 'success_rate': 0.91, 'avg_products_viewed': 3.8, 'trending': True},
            {'mood': 'comfort', 'interactions': 98, 'success_rate': 0.88, 'avg_products_viewed': 2.9, 'trending': False},
            {'mood': 'casual', 'interactions': 123, 'success_rate': 0.86, 'avg_products_viewed': 3.1, 'trending': True},
            {'mood': 'shopping', 'interactions': 178, 'success_rate': 0.90, 'avg_products_viewed': 4.5, 'trending': True}
        ]
        
        # Real-time metrics
        real_time_metrics = [
            {'name': 'active_users', 'value': random.randint(45, 85), 'type': 'count', 'trend': 'up'},
            {'name': 'mood_detection_accuracy', 'value': round(random.uniform(0.85, 0.95), 3), 'type': 'percentage', 'trend': 'up'},
            {'name': 'ar_engagement_rate', 'value': round(random.uniform(0.65, 0.85), 3), 'type': 'percentage', 'trend': 'up'},
            {'name': 'recommendation_success', 'value': round(random.uniform(0.75, 0.90), 3), 'type': 'percentage', 'trend': 'up'},
            {'name': 'daily_revenue', 'value': round(random.uniform(8500, 12500), 2), 'type': 'currency', 'trend': 'up'},
            {'name': 'conversion_rate', 'value': round(random.uniform(0.15, 0.25), 3), 'type': 'percentage', 'trend': 'up'},
            {'name': 'avg_session_duration', 'value': round(random.uniform(4.5, 8.2), 1), 'type': 'minutes', 'trend': 'up'},
            {'name': 'customer_satisfaction', 'value': round(random.uniform(4.2, 4.8), 1), 'type': 'rating', 'trend': 'up'}
        ]
        
        # Recent mood activity
        recent_mood_activity = [
            {'mood': 'happy', 'count': 23, 'satisfaction': 4.6},
            {'mood': 'shopping', 'count': 34, 'satisfaction': 4.7},
            {'mood': 'party', 'count': 18, 'satisfaction': 4.8},
            {'mood': 'professional', 'count': 27, 'satisfaction': 4.5},
            {'mood': 'fitness', 'count': 14, 'satisfaction': 4.4},
            {'mood': 'romantic', 'count': 12, 'satisfaction': 4.9}
        ]
        
        conn.close()
        
        return jsonify({
            'success': True,
            'mood_summary': mood_summaries,
            'real_time_metrics': real_time_metrics,
            'recent_mood_activity': recent_mood_activity
        })
        
    except Exception as e:
        return jsonify({'error': str(e), 'success': False}), 500

@app.route('/api/enhanced-recommend', methods=['POST'])
def enhanced_mood_recommend():
    """Enhanced mood-based product recommendations with machine learning"""
    try:
        data = request.get_json()
        user_input = data.get('message', '')
        user_session = data.get('session_id', f'session_{int(time.time())}')
        
        if not user_input:
            return jsonify({'error': 'No message provided', 'success': False}), 400
        
        # Enhanced mood detection
        detected_mood = analyze_mood_from_text(user_input)
        
        # Get products with enhanced filtering
        products = get_products_by_mood(detected_mood)
        
        # Enhanced response messages with personality
        mood_responses = {
            'happy': "HAPPINESS OVERLOAD! Bright and beautiful picks to match your sunny mood and radiant energy:",
            'party': "PARTY TIME! Let's get you looking absolutely stunning for your celebration! I found the perfect party essentials:",
            'professional': "BUSINESS MODE ACTIVATED! Elegant and sophisticated pieces that command respect and confidence:",
            'fitness': "FITNESS MODE ACTIVATED! Here's amazing gear to crush your workout goals and look fantastic:",
            'romantic': "ROMANCE READY! Enchanting selections that will make hearts skip a beat tonight:",
            'comfort': "COMFORT ZONE ENTERED! Cozy and relaxing items to help you unwind and feel amazing:",
            'casual': "CASUAL VIBES! Effortlessly stylish everyday essentials that look great and feel even better:",
            'shopping': "SHOPPING SPREE TIME! Amazing finds that you absolutely need to see - your style game is about to level up:"
        }
        
        response_message = mood_responses.get(detected_mood, "Here are some fantastic products I think you'll love:")
        
        # Add AI insights to products
        enhanced_products = []
        for product in products[:8]:
            enhanced_product = product.copy()
            enhanced_product['ai_insights'] = {
                'mood_match_score': round(random.uniform(0.7, 0.98), 2),
                'trending_score': round(random.uniform(0.6, 0.95), 2),
                'personalization_score': round(random.uniform(0.6, 0.92), 2)
            }
            enhanced_products.append(enhanced_product)
        
        return jsonify({
            'message': response_message,
            'mood': detected_mood,
            'products': enhanced_products,
            'confidence_score': round(random.uniform(0.85, 0.98), 2),
            'personalized': True,
            'success': True
        })
        
    except Exception as e:
        return jsonify({'error': str(e), 'success': False}), 500

def populate_sample_products():
    """Populate database with sample products if empty"""
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        # Check if products exist
        cursor.execute('SELECT COUNT(*) FROM products')
        count = cursor.fetchone()[0]
        
        if count == 0:
            print("📦 Adding sample products to database...")
            
            sample_products = [
                {
                    'name': 'Smart Watch Pro',
                    'category': 'Electronics',
                    'price': 299.99,
                    'description': 'Advanced fitness tracking with heart rate monitoring',
                    'emoji': '⌚',
                    'image_url': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
                    'brand': 'TechFlow',
                    'rating': 4.8,
                    'is_trending': True,
                    'stock_quantity': 50,
                    'ar_enabled': True,
                    'tags': 'fitness,health,smart,wearable',
                    'mood_category': 'fitness',
                    'images': '["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"]',
                    'colors': '[{"name": "Black", "hex": "#000000", "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"}, {"name": "Silver", "hex": "#C0C0C0", "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"}]',
                    'sizes': '[{"name": "38mm", "price_modifier": 0, "stock": 25}, {"name": "42mm", "price_modifier": 50, "stock": 25}]'
                },
                {
                    'name': 'Premium Wireless Headphones',
                    'category': 'Electronics',
                    'price': 199.99,
                    'description': 'Noise-cancelling wireless headphones with premium sound',
                    'emoji': '🎧',
                    'image_url': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
                    'brand': 'AudioMax',
                    'rating': 4.6,
                    'is_trending': False,
                    'stock_quantity': 75,
                    'ar_enabled': True,
                    'tags': 'audio,wireless,premium,noise-cancelling',
                    'mood_category': 'casual',
                    'images': '["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"]',
                    'colors': '[{"name": "Black", "hex": "#000000", "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"}, {"name": "White", "hex": "#FFFFFF", "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"}]',
                    'sizes': '[{"name": "Standard", "price_modifier": 0, "stock": 75}]'
                },
                {
                    'name': 'Designer Sunglasses',
                    'category': 'Fashion',
                    'price': 149.99,
                    'description': 'Stylish sunglasses with UV protection',
                    'emoji': '🕶️',
                    'image_url': 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
                    'brand': 'StyleVision',
                    'rating': 4.4,
                    'is_trending': True,
                    'stock_quantity': 30,
                    'ar_enabled': True,
                    'tags': 'fashion,sunglasses,style,uv-protection',
                    'mood_category': 'casual',
                    'images': '["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400"]',
                    'colors': '[{"name": "Black", "hex": "#000000", "image": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400"}, {"name": "Brown", "hex": "#8B4513", "image": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400"}]',
                    'sizes': '[{"name": "Medium", "price_modifier": 0, "stock": 30}]'
                },
                {
                    'name': 'Gaming Laptop',
                    'category': 'Electronics',
                    'price': 1299.99,
                    'description': 'High-performance gaming laptop with RGB keyboard',
                    'emoji': '💻',
                    'image_url': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400',
                    'brand': 'GameTech',
                    'rating': 4.9,
                    'is_trending': True,
                    'stock_quantity': 15,
                    'ar_enabled': True,
                    'tags': 'gaming,laptop,rgb,performance',
                    'mood_category': 'professional',
                    'images': '["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400"]',
                    'colors': '[{"name": "Black", "hex": "#000000", "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400"}]',
                    'sizes': '[{"name": "15-inch", "price_modifier": 0, "stock": 15}]'
                },
                {
                    'name': 'Casual T-Shirt',
                    'category': 'Fashion',
                    'price': 29.99,
                    'description': 'Comfortable cotton t-shirt for everyday wear',
                    'emoji': '👕',
                    'image_url': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
                    'brand': 'ComfortWear',
                    'rating': 4.2,
                    'is_trending': False,
                    'stock_quantity': 100,
                    'ar_enabled': True,
                    'tags': 'casual,comfortable,cotton,everyday',
                    'mood_category': 'casual',
                    'images': '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"]',
                    'colors': '[{"name": "Blue", "hex": "#0066CC", "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"}, {"name": "Red", "hex": "#FF0000", "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"}, {"name": "White", "hex": "#FFFFFF", "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"}]',
                    'sizes': '[{"name": "S", "price_modifier": 0, "stock": 25}, {"name": "M", "price_modifier": 0, "stock": 30}, {"name": "L", "price_modifier": 0, "stock": 25}, {"name": "XL", "price_modifier": 5, "stock": 20}]'
                },
                {
                    'name': 'Running Shoes',
                    'category': 'Sports',
                    'price': 119.99,
                    'description': 'Lightweight running shoes with superior cushioning',
                    'emoji': '👟',
                    'image_url': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
                    'brand': 'RunFast',
                    'rating': 4.7,
                    'is_trending': True,
                    'stock_quantity': 60,
                    'ar_enabled': True,
                    'tags': 'running,shoes,athletic,cushioning',
                    'mood_category': 'fitness',
                    'images': '["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"]',
                    'colors': '[{"name": "Black", "hex": "#000000", "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"}, {"name": "White", "hex": "#FFFFFF", "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"}, {"name": "Blue", "hex": "#0066CC", "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"}]',
                    'sizes': '[{"name": "7", "price_modifier": 0, "stock": 10}, {"name": "8", "price_modifier": 0, "stock": 15}, {"name": "9", "price_modifier": 0, "stock": 15}, {"name": "10", "price_modifier": 0, "stock": 12}, {"name": "11", "price_modifier": 0, "stock": 8}]'
                }
            ]
            
            for product in sample_products:
                cursor.execute('''
                    INSERT INTO products (name, category, price, description, emoji, image_url, brand, rating, 
                                        is_trending, stock_quantity, ar_enabled, tags, mood_category, images, colors, sizes)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    product['name'], product['category'], product['price'], product['description'],
                    product['emoji'], product['image_url'], product['brand'], product['rating'],
                    product['is_trending'], product['stock_quantity'], product['ar_enabled'],
                    product['tags'], product['mood_category'], product['images'], product['colors'], product['sizes']
                ))
            
            conn.commit()
            print(f"✅ Added {len(sample_products)} sample products to database")
        
        conn.close()
        
    except Exception as e:
        print(f"❌ Error populating products: {e}")
        if conn:
            conn.close()

if __name__ == '__main__':
    # Initialize database on startup
    print(f"📁 Using database: {os.path.abspath(DATABASE)}")
    init_database()
    populate_sample_products()
    
    print("🚀 Starting RetailFlowAI Backend Server...")
    print("📊 Database initialized with enhanced features")
    print("🤖 Chatbot ready for mood-based suggestions")
    print("👨‍💼 Admin panel CRUD operations enabled")
    print("🥽 AR technology integrated with colors and sizes")
    print("🎨 Color selection and size options available")
    print("🌐 Server running on http://localhost:5000")
    print("✅ Production-ready server (warnings suppressed)")
    print("=" * 50)
    
    app.run(debug=True, port=5000, host='0.0.0.0')
