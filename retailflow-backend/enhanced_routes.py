"""
Enhanced Product API Endpoints for RetailFlowAI
Contains all the enhanced features: colors, sizes, quality tiers, price calculator
"""

from flask import jsonify, request
import sqlite3
import json
import logging
import os

logger = logging.getLogger(__name__)

# Database path - use absolute path to ensure connection
DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'retailflow.db')

def get_db_connection():
    """Get database connection with error handling."""
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        return conn
    except Exception as e:
        logger.error(f"Database connection error: {e}")
        return None

def register_enhanced_routes(app):
    """Register all enhanced product routes with the Flask app"""
    
    @app.route('/api/products/enhanced', methods=['GET'])
    def get_enhanced_products():
        """Get all products with enhanced features like color changing, sizes, quality tiers"""
        try:
            conn = get_db_connection()
            if not conn:
                return jsonify({'success': False, 'error': 'Database connection failed'}), 500
            
            cursor = conn.cursor()
            cursor.execute('''
                SELECT id, name, category, price, description, emoji, image_url, brand, rating, 
                       images, colors, sizes, quality_tiers, customization_options, interactive_features
                FROM products 
                WHERE ar_enabled = 1
                ORDER BY is_trending DESC, rating DESC
            ''')
            
            products = []
            for row in cursor.fetchall():
                product = {
                    'id': row[0],
                    'name': row[1],
                    'category': row[2],
                    'price': row[3],
                    'description': row[4],
                    'emoji': row[5],
                    'image_url': row[6],
                    'brand': row[7],
                    'rating': row[8],
                    'images': json.loads(row[9]) if row[9] else [],
                    'colors': json.loads(row[10]) if row[10] else [],
                    'sizes': json.loads(row[11]) if row[11] else [],
                    'quality_tiers': json.loads(row[12]) if row[12] else [],
                    'customization_options': json.loads(row[13]) if row[13] else {},
                    'interactive_features': json.loads(row[14]) if row[14] else {}
                }
                products.append(product)
            
            conn.close()
            
            return jsonify({
                'success': True,
                'data': products,
                'count': len(products)
            })
            
        except Exception as e:
            logger.error(f"Enhanced products API error: {e}")
            return jsonify({'success': False, 'error': str(e)}), 500

    @app.route('/api/products/<int:product_id>/colors', methods=['GET'])
    def get_product_colors(product_id):
        """Get available color options for a specific product"""
        try:
            conn = get_db_connection()
            if not conn:
                return jsonify({'success': False, 'error': 'Database connection failed'}), 500
            
            cursor = conn.cursor()
            cursor.execute('SELECT colors FROM products WHERE id = ?', (product_id,))
            result = cursor.fetchone()
            
            if not result or not result[0]:
                return jsonify({'success': False, 'error': 'Product not found or no colors available'}), 404
            
            colors = json.loads(result[0])
            conn.close()
            
            return jsonify({
                'success': True,
                'product_id': product_id,
                'colors': colors,
                'count': len(colors)
            })
            
        except Exception as e:
            logger.error(f"Product colors API error: {e}")
            return jsonify({'success': False, 'error': str(e)}), 500

    @app.route('/api/products/<int:product_id>/sizes', methods=['GET'])
    def get_product_sizes(product_id):
        """Get available size options for a specific product"""
        try:
            conn = get_db_connection()
            if not conn:
                return jsonify({'success': False, 'error': 'Database connection failed'}), 500
            
            cursor = conn.cursor()
            cursor.execute('SELECT sizes FROM products WHERE id = ?', (product_id,))
            result = cursor.fetchone()
            
            if not result or not result[0]:
                return jsonify({'success': False, 'error': 'Product not found or no sizes available'}), 404
            
            sizes = json.loads(result[0])
            conn.close()
            
            return jsonify({
                'success': True,
                'product_id': product_id,
                'sizes': sizes,
                'count': len(sizes)
            })
            
        except Exception as e:
            logger.error(f"Product sizes API error: {e}")
            return jsonify({'success': False, 'error': str(e)}), 500

    @app.route('/api/products/<int:product_id>/quality-tiers', methods=['GET'])
    def get_product_quality_tiers(product_id):
        """Get available quality tiers for a specific product"""
        try:
            conn = get_db_connection()
            if not conn:
                return jsonify({'success': False, 'error': 'Database connection failed'}), 500
            
            cursor = conn.cursor()
            cursor.execute('SELECT quality_tiers FROM products WHERE id = ?', (product_id,))
            result = cursor.fetchone()
            
            if not result or not result[0]:
                return jsonify({'success': False, 'error': 'Product not found or no quality tiers available'}), 404
            
            quality_tiers = json.loads(result[0])
            conn.close()
            
            return jsonify({
                'success': True,
                'product_id': product_id,
                'quality_tiers': quality_tiers,
                'count': len(quality_tiers)
            })
            
        except Exception as e:
            logger.error(f"Product quality tiers API error: {e}")
            return jsonify({'success': False, 'error': str(e)}), 500

    @app.route('/api/products/<int:product_id>/price-calculator', methods=['POST'])
    def calculate_product_price(product_id):
        """Calculate final price based on selected options (color, size, quality)"""
        try:
            data = request.get_json() or {}
            selected_color = data.get('color')
            selected_size = data.get('size')
            selected_quality = data.get('quality_tier')
            
            conn = get_db_connection()
            if not conn:
                return jsonify({'success': False, 'error': 'Database connection failed'}), 500
            
            cursor = conn.cursor()
            cursor.execute('''
                SELECT price, colors, sizes, quality_tiers 
                FROM products WHERE id = ?
            ''', (product_id,))
            result = cursor.fetchone()
            
            if not result:
                return jsonify({'success': False, 'error': 'Product not found'}), 404
            
            base_price = result[0]
            colors = json.loads(result[1]) if result[1] else []
            sizes = json.loads(result[2]) if result[2] else []
            quality_tiers = json.loads(result[3]) if result[3] else []
            
            # Calculate price modifiers
            price_modifier = 0
            breakdown = {'base_price': base_price}
            
            # Color modifier
            if selected_color:
                color_option = next((c for c in colors if c['name'] == selected_color), None)
                if color_option and 'price_modifier' in color_option:
                    color_modifier = color_option['price_modifier']
                    price_modifier += color_modifier
                    breakdown['color_modifier'] = color_modifier
            
            # Size modifier
            if selected_size:
                size_option = next((s for s in sizes if s['name'] == selected_size), None)
                if size_option and 'price_modifier' in size_option:
                    size_modifier = size_option['price_modifier']
                    price_modifier += size_modifier
                    breakdown['size_modifier'] = size_modifier
            
            # Quality tier modifier
            if selected_quality:
                quality_option = next((q for q in quality_tiers if q['name'] == selected_quality), None)
                if quality_option and 'price_modifier' in quality_option:
                    quality_modifier = quality_option['price_modifier']
                    price_modifier += quality_modifier
                    breakdown['quality_modifier'] = quality_modifier
            
            final_price = base_price + price_modifier
            breakdown['total_modifier'] = price_modifier
            breakdown['final_price'] = final_price
            
            conn.close()
            
            return jsonify({
                'success': True,
                'product_id': product_id,
                'base_price': base_price,
                'final_price': final_price,
                'savings': max(0, base_price - final_price),
                'price_breakdown': breakdown,
                'selected_options': {
                    'color': selected_color,
                    'size': selected_size,
                    'quality_tier': selected_quality
                }
            })
            
        except Exception as e:
            logger.error(f"Price calculator API error: {e}")
            return jsonify({'success': False, 'error': str(e)}), 500

    @app.route('/api/products/<int:product_id>/customization', methods=['GET'])
    def get_product_customization(product_id):
        """Get customization options for a specific product"""
        try:
            conn = get_db_connection()
            if not conn:
                return jsonify({'success': False, 'error': 'Database connection failed'}), 500
            
            cursor = conn.cursor()
            cursor.execute('''
                SELECT customization_options, interactive_features 
                FROM products WHERE id = ?
            ''', (product_id,))
            result = cursor.fetchone()
            
            if not result:
                return jsonify({'success': False, 'error': 'Product not found'}), 404
            
            customization_options = json.loads(result[0]) if result[0] else {}
            interactive_features = json.loads(result[1]) if result[1] else {}
            
            conn.close()
            
            return jsonify({
                'success': True,
                'product_id': product_id,
                'customization_options': customization_options,
                'interactive_features': interactive_features
            })
            
        except Exception as e:
            logger.error(f"Product customization API error: {e}")
            return jsonify({'success': False, 'error': str(e)}), 500
    
    logger.info("✅ Enhanced product API routes registered successfully!")
