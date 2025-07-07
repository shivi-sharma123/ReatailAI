import sqlite3
import json
import random

def create_intelligent_chatbot_system():
    """Create an intelligent chatbot system with amazing product recommendations"""
    
    # Enhanced mood analysis with specific product categories
    MOOD_PRODUCT_MAPPING = {
        'party': {
            'keywords': ['party', 'nightlife', 'club', 'dance', 'celebration', 'birthday', 'wedding', 'event', 'glamour', 'sequin', 'sparkle'],
            'categories': ['clothing', 'accessories', 'electronics'],
            'preferred_items': ['dress', 'jacket', 'sunglasses', 'watch', 'handbag', 'shoes', 'glamorous', 'sequin', 'holographic', 'crystal'],
            'exclude': ['kitchen', 'umbrella', 'cookware'],
            'mood_message': "🎉 PARTY TIME! Let's get you looking absolutely stunning for your celebration!"
        },
        'fitness': {
            'keywords': ['gym', 'workout', 'fitness', 'sport', 'running', 'exercise', 'training', 'athletic', 'yoga', 'performance'],
            'categories': ['clothing', 'electronics', 'accessories', 'footwear'],
            'preferred_items': ['shoes', 't-shirt', 'jeans', 'watch', 'bag', 'athletic', 'performance', 'neon', 'leggings', 'yoga'],
            'exclude': ['dress', 'formal', 'kitchen', 'evening'],
            'mood_message': "💪 FITNESS MODE ACTIVATED! Here's gear to crush your workout goals!"
        },
        'professional': {
            'keywords': ['work', 'office', 'professional', 'business', 'meeting', 'formal', 'interview', 'elegant', 'executive'],
            'categories': ['clothing', 'accessories', 'electronics'],
            'preferred_items': ['jacket', 'dress', 'watch', 'handbag', 'shoes', 'blazer', 'elegant', 'velvet', 'smart', 'hologram'],
            'exclude': ['casual', 'party', 'kitchen', 'athletic'],
            'mood_message': "💼 PROFESSIONAL POWER MODE! Command respect with these sophisticated choices!"
        },
        'casual': {
            'keywords': ['casual', 'everyday', 'normal', 'regular', 'simple', 'comfort', 'relaxed', 'denim', 'comfortable'],
            'categories': ['clothing', 'accessories', 'footwear'],
            'preferred_items': ['jeans', 't-shirt', 'shoes', 'bag', 'sunglasses', 'denim', 'smart', 'color-changing', 'backpack'],
            'exclude': ['formal', 'party', 'evening', 'diamond'],
            'mood_message': "😌 CASUAL COMFORT ZONE! Perfect everyday essentials for your relaxed vibe!"
        },
        'romantic': {
            'keywords': ['romantic', 'date', 'dinner', 'valentine', 'love', 'anniversary', 'special', 'elegant', 'luxury'],
            'categories': ['clothing', 'accessories'],
            'preferred_items': ['dress', 'jacket', 'watch', 'handbag', 'scarf', 'clutch', 'diamond', 'silk', 'celestial', 'infinity'],
            'exclude': ['casual', 'sport', 'kitchen', 'athletic'],
            'mood_message': "💕 ROMANCE READY! Make hearts skip a beat with these enchanting selections!"
        },
        'happy': {
            'keywords': ['happy', 'joy', 'cheerful', 'bright', 'colorful', 'fun', 'smile', 'rainbow', 'glow'],
            'categories': ['clothing', 'accessories', 'electronics'],
            'preferred_items': ['dress', 't-shirt', 'sunglasses', 'bag', 'watch', 'rainbow', 'holographic', 'color-changing', 'glow'],
            'exclude': ['dark', 'formal'],
            'mood_message': "😊 HAPPINESS OVERLOAD! Bright and beautiful picks to match your sunny mood!"
        },
        'cool': {
            'keywords': ['cool', 'stylish', 'trendy', 'fashion', 'hip', 'modern', 'chic', 'futuristic', 'tech', 'neon'],
            'categories': ['clothing', 'accessories', 'electronics', 'footwear'],
            'preferred_items': ['sunglasses', 'jacket', 'jeans', 'watch', 'shoes', 'holographic', 'crystal', 'smart', 'aurora', 'prismatic', 'glow'],
            'exclude': ['kitchen', 'umbrella'],
            'mood_message': "😎 COOL FACTOR MAXIMIZED! Ultra-stylish picks that scream confidence!"
        },
        'comfort': {
            'keywords': ['comfort', 'cozy', 'soft', 'warm', 'relaxing', 'home', 'chill'],
            'categories': ['clothing', 'accessories'],
            'preferred_items': ['t-shirt', 'jeans', 'bag', 'shoes'],
            'exclude': ['formal', 'party'],
            'mood_message': "🛋️ COMFORT FIRST! Cozy essentials for maximum relaxation and style!"
        },
        'shopping': {
            'keywords': ['shopping', 'buy', 'purchase', 'need', 'want', 'looking', 'show'],
            'categories': ['clothing', 'accessories', 'electronics'],
            'preferred_items': ['dress', 'jacket', 'jeans', 'sunglasses', 'watch', 'bag'],
            'exclude': [],
            'mood_message': "🛍️ SHOPPING SPREE TIME! Amazing finds that you absolutely need to see!"
        }
    }
    
    return MOOD_PRODUCT_MAPPING

def intelligent_mood_analysis(user_text):
    """Advanced mood analysis with specific product matching"""
    text = user_text.lower()
    
    # Get the mood mapping
    mood_mapping = create_intelligent_chatbot_system()
    
    # Check for specific product requests first
    if any(word in text for word in ['dress', 'dresses', 'frock', 'gown']):
        return 'party' if any(word in text for word in ['party', 'night', 'event']) else 'romantic'
    
    if any(word in text for word in ['jeans', 'pants', 'denim']):
        return 'casual'
    
    if any(word in text for word in ['jacket', 'coat', 'blazer']):
        return 'professional' if any(word in text for word in ['work', 'office']) else 'cool'
    
    if any(word in text for word in ['sunglasses', 'glasses', 'shades']):
        return 'cool'
    
    if any(word in text for word in ['watch', 'time']):
        return 'professional'
    
    if any(word in text for word in ['bag', 'handbag', 'purse']):
        return 'professional'
    
    if any(word in text for word in ['shoes', 'sneakers', 'boots']):
        return 'fitness' if any(word in text for word in ['sport', 'gym', 'run']) else 'casual'
    
    # Check for mood keywords
    for mood, config in mood_mapping.items():
        if any(keyword in text for keyword in config['keywords']):
            return mood
    
    return 'shopping'  # Default to general shopping

def get_smart_product_recommendations(user_text, limit=6):
    """Get smart, diverse product recommendations based on user request"""
    
    # Analyze what the user wants
    mood = intelligent_mood_analysis(user_text)
    mood_config = create_intelligent_chatbot_system()[mood]
    
    conn = sqlite3.connect('retailflow.db')
    cursor = conn.cursor()
    
    # Get all products
    cursor.execute('''
        SELECT id, name, category, price, description, emoji, image_url, brand, rating, is_trending, 
               stock_quantity, ar_enabled, tags, mood_category, images, colors, sizes,
               ar_model_url, ar_preview_url, color_variants, size_options, material, dimensions
        FROM products 
        ORDER BY is_trending DESC, rating DESC
    ''')
    
    all_products = cursor.fetchall()
    conn.close()
    
    # Smart filtering based on mood configuration
    recommended_products = []
    
    for product in all_products:
        product_name = product[1].lower()
        product_category = product[2].lower()
        product_description = (product[4] or '').lower()
        
        # Check if product matches preferred categories
        if product_category in mood_config['categories']:
            
            # Check if product matches preferred items
            matches_preference = any(
                item in product_name or item in product_description 
                for item in mood_config['preferred_items']
            )
            
            # Check if product should be excluded
            should_exclude = any(
                exclude_word in product_name or exclude_word in product_description
                for exclude_word in mood_config['exclude']
            )
            
            if matches_preference and not should_exclude:
                # Parse product data
                try:
                    # Handle JSON fields safely
                    colors = json.loads(product[15]) if product[15] else []
                    sizes = json.loads(product[16]) if product[16] else []
                    
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
                        'is_trending': product[9],
                        'stock_quantity': product[10],
                        'ar_enabled': product[11],
                        'tags': product[12],
                        'mood_category': product[13],
                        'colors': colors,
                        'sizes': sizes,
                        'ar_model_url': product[17] if len(product) > 17 else None,
                        'ar_preview_url': product[18] if len(product) > 18 else None,
                        'multiple_images': json.loads(product[14]) if product[14] else [product[6]],
                        'color_variants': json.loads(product[19]) if len(product) > 19 and product[19] else [],
                        'size_chart': {},
                        'three_d_model': True,
                        'display': product[1]
                    }
                    
                    recommended_products.append(product_dict)
                    
                except Exception as e:
                    print(f"Error parsing product {product[1]}: {e}")
                    continue
    
    # If we don't have enough products, add some general ones
    if len(recommended_products) < limit:
        for product in all_products:
            if len(recommended_products) >= limit:
                break
                
            # Skip if already added
            if any(p['id'] == product[0] for p in recommended_products):
                continue
                
            try:
                colors = json.loads(product[15]) if product[15] else []
                sizes = json.loads(product[16]) if product[16] else []
                
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
                    'is_trending': product[9],
                    'stock_quantity': product[10],
                    'ar_enabled': product[11],
                    'tags': product[12],
                    'mood_category': product[13],
                    'colors': colors,
                    'sizes': sizes,
                    'ar_model_url': product[17] if len(product) > 17 else None,
                    'ar_preview_url': product[18] if len(product) > 18 else None,
                    'multiple_images': json.loads(product[14]) if product[14] else [product[6]],
                    'color_variants': json.loads(product[19]) if len(product) > 19 and product[19] else [],
                    'size_chart': {},
                    'three_d_model': True,
                    'display': product[1]
                }
                
                recommended_products.append(product_dict)
                
            except Exception as e:
                continue
    
    # Shuffle for variety and return limited results
    random.shuffle(recommended_products)
    return recommended_products[:limit], mood_config['mood_message']

if __name__ == "__main__":
    # Test the system
    test_queries = [
        "I need party outfit",
        "show me gym clothes", 
        "comfort wear please",
        "professional attire",
        "casual jeans"
    ]
    
    for query in test_queries:
        products, message = get_smart_product_recommendations(query, 3)
        print(f"\n🔍 Query: '{query}'")
        print(f"💬 Response: {message}")
        print(f"📦 Products: {[p['name'] for p in products]}")
