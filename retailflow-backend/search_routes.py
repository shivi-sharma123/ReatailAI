"""
Enhanced Search API for RetailFlowAI
Provides intelligent product search with suggestions, filtering, and real database integration
"""

from flask import jsonify, request
import sqlite3
import json
import logging
import os
import re

logger = logging.getLogger(__name__)

# Database path
DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'client', 'retailflow.db')

def get_db_connection():
    """Get database connection with error handling."""
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        return conn
    except Exception as e:
        logger.error(f"Database connection error: {e}")
        return None

def register_search_routes(app):
    """Register search routes with the Flask app"""
    
    @app.route('/api/search/products', methods=['GET'])
    def enhanced_search_products():
        """
        Enhanced product search with intelligent filtering and suggestions
        Supports category filtering, price ranges, and smart text matching
        """
        try:
            # Get search parameters
            query = request.args.get('q', '').strip()
            category = request.args.get('category', '').strip()
            min_price = request.args.get('min_price', type=float)
            max_price = request.args.get('max_price', type=float)
            min_rating = request.args.get('min_rating', type=float, default=0)
            limit = request.args.get('limit', type=int, default=50)
            
            conn = get_db_connection()
            if not conn:
                return jsonify({'success': False, 'error': 'Database connection failed'}), 500
            
            cursor = conn.cursor()
            
            # Build dynamic search query
            sql_query = """
                SELECT id, name, category, price, description, emoji, image_url, brand, rating, 
                       stock_quantity, ar_enabled, tags, mood_category, colors, sizes
                FROM products 
                WHERE 1=1
            """
            params = []
            
            # Add text search conditions
            if query:
                # Smart text search across multiple fields
                search_conditions = []
                search_terms = query.lower().split()
                
                for term in search_terms:
                    term_condition = """
                        (LOWER(name) LIKE ? OR 
                         LOWER(description) LIKE ? OR 
                         LOWER(brand) LIKE ? OR 
                         LOWER(tags) LIKE ? OR 
                         LOWER(category) LIKE ?)
                    """
                    search_conditions.append(term_condition)
                    # Add the same parameter 5 times for each field
                    params.extend([f'%{term}%'] * 5)
                
                sql_query += " AND (" + " AND ".join(search_conditions) + ")"
            
            # Add category filter
            if category and category.lower() != 'all':
                sql_query += " AND LOWER(category) = ?"
                params.append(category.lower())
            
            # Add price filters
            if min_price is not None:
                sql_query += " AND price >= ?"
                params.append(min_price)
            
            if max_price is not None:
                sql_query += " AND price <= ?"
                params.append(max_price)
            
            # Add rating filter
            if min_rating > 0:
                sql_query += " AND rating >= ?"
                params.append(min_rating)
            
            # Add ordering and limit
            sql_query += " ORDER BY rating DESC, is_trending DESC, name LIMIT ?"
            params.append(limit)
            
            cursor.execute(sql_query, params)
            results = cursor.fetchall()
            
            products = []
            for row in results:
                product = {
                    'id': row[0],
                    'name': row[1],
                    'category': row[2],
                    'price': row[3],
                    'description': row[4],
                    'emoji': row[5],
                    'image_url': row[6],
                    'image': row[6],  # Alias for compatibility
                    'brand': row[7],
                    'rating': row[8],
                    'stock_quantity': row[9],
                    'ar_enabled': bool(row[10]),
                    'tags': row[11].split(',') if row[11] else [],
                    'mood_category': row[12],
                    'colors': json.loads(row[13]) if row[13] else [],
                    'sizes': json.loads(row[14]) if row[14] else []
                }
                products.append(product)
            
            conn.close()
            
            return jsonify({
                'success': True,
                'data': {
                    'products': products,
                    'count': len(products),
                    'query': query,
                    'category': category,
                    'filters': {
                        'min_price': min_price,
                        'max_price': max_price,
                        'min_rating': min_rating
                    }
                }
            })
            
        except Exception as e:
            logger.error(f"Product search API error: {e}")
            return jsonify({'success': False, 'error': str(e)}), 500
    
    @app.route('/api/search/suggestions', methods=['GET'])
    def enhanced_search_suggestions():
        """
        Get intelligent search suggestions based on partial query
        Returns both product matches and search term suggestions
        """
        try:
            query = request.args.get('q', '').strip()
            category = request.args.get('category', '').strip()
            limit = request.args.get('limit', type=int, default=10)
            
            if len(query) < 2:
                return jsonify({
                    'success': True,
                    'data': {
                        'suggestions': [],
                        'products': []
                    }
                })
            
            conn = get_db_connection()
            if not conn:
                return jsonify({'success': False, 'error': 'Database connection failed'}), 500
            
            cursor = conn.cursor()
            
            # Get product suggestions
            product_sql = """
                SELECT id, name, category, price, image_url, brand, rating
                FROM products 
                WHERE (LOWER(name) LIKE ? OR LOWER(brand) LIKE ? OR LOWER(tags) LIKE ?)
            """
            product_params = [f'%{query.lower()}%'] * 3
            
            if category and category.lower() != 'all':
                product_sql += " AND LOWER(category) = ?"
                product_params.append(category.lower())
            
            product_sql += " ORDER BY rating DESC LIMIT ?"
            product_params.append(limit // 2)  # Half for products
            
            cursor.execute(product_sql, product_params)
            product_results = cursor.fetchall()
            
            products = []
            for row in product_results:
                products.append({
                    'id': row[0],
                    'name': row[1],
                    'category': row[2],
                    'price': row[3],
                    'image': row[4],
                    'brand': row[5],
                    'rating': row[6],
                    'type': 'product'
                })
            
            # Generate search term suggestions
            search_suggestions = []
            
            # Popular search terms based on the query
            popular_terms = [
                f"{query}",
                f"{query} deals",
                f"best {query}",
                f"{query} on sale",
                f"{query} reviews",
                f"cheap {query}",
                f"{query} for women",
                f"{query} for men"
            ]
            
            # Filter and limit suggestions
            for term in popular_terms[:limit // 2]:
                search_suggestions.append({
                    'text': term,
                    'type': 'search',
                    'category': category if category and category.lower() != 'all' else 'All'
                })
            
            conn.close()
            
            return jsonify({
                'success': True,
                'data': {
                    'suggestions': search_suggestions,
                    'products': products,
                    'query': query
                }
            })
            
        except Exception as e:
            logger.error(f"Search suggestions API error: {e}")
            return jsonify({'success': False, 'error': str(e)}), 500
    
    @app.route('/api/search/categories', methods=['GET'])
    def enhanced_get_categories():
        """Get all available product categories"""
        try:
            conn = get_db_connection()
            if not conn:
                return jsonify({'success': False, 'error': 'Database connection failed'}), 500
            
            cursor = conn.cursor()
            cursor.execute("SELECT DISTINCT category FROM products ORDER BY category")
            results = cursor.fetchall()
            
            categories = ['All'] + [row[0] for row in results]
            conn.close()
            
            return jsonify({
                'success': True,
                'data': categories
            })
            
        except Exception as e:
            logger.error(f"Categories API error: {e}")
            return jsonify({'success': False, 'error': str(e)}), 500
    
    @app.route('/api/search/popular', methods=['GET'])
    def enhanced_get_popular_searches():
        """Get popular search terms and trending products"""
        try:
            conn = get_db_connection()
            if not conn:
                return jsonify({'success': False, 'error': 'Database connection failed'}), 500
            
            cursor = conn.cursor()
            
            # Get trending products
            cursor.execute("""
                SELECT name, category, price, image_url, rating
                FROM products 
                WHERE is_trending = 1 
                ORDER BY rating DESC 
                LIMIT 10
            """)
            trending = cursor.fetchall()
            
            trending_products = []
            for row in trending:
                trending_products.append({
                    'name': row[0],
                    'category': row[1],
                    'price': row[2],
                    'image': row[3],
                    'rating': row[4]
                })
            
            # Popular search terms (simulated based on categories)
            cursor.execute("SELECT category, COUNT(*) as count FROM products GROUP BY category ORDER BY count DESC")
            category_results = cursor.fetchall()
            
            popular_terms = []
            for row in category_results[:5]:
                category = row[0].lower()
                popular_terms.extend([
                    f"{category}",
                    f"best {category}",
                    f"{category} deals"
                ])
            
            conn.close()
            
            return jsonify({
                'success': True,
                'data': {
                    'popular_searches': popular_terms[:10],
                    'trending_products': trending_products
                }
            })
            
        except Exception as e:
            logger.error(f"Popular searches API error: {e}")
            return jsonify({'success': False, 'error': str(e)}), 500
