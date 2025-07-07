import sqlite3
import json

DATABASE = 'retailflow.db'

def add_essential_products():
    """Add essential products that user requested: sunglasses, t-shirt, rainy coat, etc."""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Clear existing products to start fresh
    cursor.execute('DELETE FROM products')
    
    # Essential products for mood-based shopping
    essential_products = [
        # Happy Mood Products
        {
            'name': 'Designer Sunglasses',
            'category': 'accessories',
            'mood_category': 'happy',
            'price': 89.99,
            'description': 'Stylish sunglasses perfect for sunny days and happy moments',
            'emoji': '😎',
            'image_url': 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
            'brand': 'RayBan',
            'rating': 4.7,
            'tags': 'sunglasses,happy,sunny,style',
            'is_trending': True,
            'stock_quantity': 45,
            'ar_enabled': True,
            'three_d_model': 'sunglasses_3d.obj'
        },
        {
            'name': 'Happy Face T-Shirt',
            'category': 'clothing',
            'mood_category': 'happy',
            'price': 29.99,
            'description': 'Bright and cheerful t-shirt to express your happy mood',
            'emoji': '😊',
            'image_url': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
            'brand': 'HappyWear',
            'rating': 4.5,
            'tags': 'tshirt,happy,colorful,casual',
            'is_trending': True,
            'stock_quantity': 80,
            'ar_enabled': True,
            'three_d_model': 'tshirt_3d.obj'
        },
        {
            'name': 'Vibrant Summer Shorts',
            'category': 'clothing',
            'mood_category': 'happy',
            'price': 39.99,
            'description': 'Colorful shorts perfect for happy summer days',
            'emoji': '🌈',
            'image_url': 'https://images.unsplash.com/photo-1506629905826-b2d4834e0fa0?w=500',
            'brand': 'SummerVibes',
            'rating': 4.4,
            'tags': 'shorts,happy,summer,colorful',
            'is_trending': False,
            'stock_quantity': 60,
            'ar_enabled': True,
            'three_d_model': 'shorts_3d.obj'
        },
        
        # Sad/Comfort Mood Products
        {
            'name': 'Cozy Comfort Hoodie',
            'category': 'clothing',
            'mood_category': 'sad',
            'price': 59.99,
            'description': 'Soft and warm hoodie for comfort during sad moments',
            'emoji': '🤗',
            'image_url': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
            'brand': 'ComfortZone',
            'rating': 4.8,
            'tags': 'hoodie,comfort,sad,cozy',
            'is_trending': True,
            'stock_quantity': 35,
            'ar_enabled': True,
            'three_d_model': 'hoodie_3d.obj'
        },
        {
            'name': 'Warm Comfort Blanket',
            'category': 'home',
            'mood_category': 'sad',
            'price': 49.99,
            'description': 'Ultra-soft blanket for comfort and warmth',
            'emoji': '🛌',
            'image_url': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500',
            'brand': 'WarmHugs',
            'rating': 4.9,
            'tags': 'blanket,comfort,sad,soft',
            'is_trending': False,
            'stock_quantity': 25,
            'ar_enabled': True,
            'three_d_model': 'blanket_3d.obj'
        },
        {
            'name': 'Comfort Tea Mug',
            'category': 'home',
            'mood_category': 'sad',
            'price': 19.99,
            'description': 'Perfect mug for a comforting hot drink',
            'emoji': '☕',
            'image_url': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500',
            'brand': 'CozyMoments',
            'rating': 4.3,
            'tags': 'mug,comfort,sad,tea',
            'is_trending': False,
            'stock_quantity': 90,
            'ar_enabled': True,
            'three_d_model': 'mug_3d.obj'
        },
        
        # Natural/Casual Mood Products
        {
            'name': 'Classic Blue Jeans',
            'category': 'clothing',
            'mood_category': 'natural',
            'price': 79.99,
            'description': 'Timeless denim jeans for everyday natural style',
            'emoji': '👖',
            'image_url': 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=500',
            'brand': 'ClassicDenim',
            'rating': 4.6,
            'tags': 'jeans,natural,casual,denim',
            'is_trending': True,
            'stock_quantity': 70,
            'ar_enabled': True,
            'three_d_model': 'jeans_3d.obj'
        },
        {
            'name': 'Natural Cotton T-Shirt',
            'category': 'clothing',
            'mood_category': 'natural',
            'price': 24.99,
            'description': 'Simple and natural cotton t-shirt for everyday wear',
            'emoji': '👕',
            'image_url': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
            'brand': 'NaturalWear',
            'rating': 4.4,
            'tags': 'tshirt,natural,cotton,simple',
            'is_trending': False,
            'stock_quantity': 100,
            'ar_enabled': True,
            'three_d_model': 'tshirt_natural_3d.obj'
        },
        {
            'name': 'Casual Sneakers',
            'category': 'footwear',
            'mood_category': 'natural',
            'price': 69.99,
            'description': 'Comfortable sneakers for natural everyday activities',
            'emoji': '👟',
            'image_url': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
            'brand': 'NaturalStep',
            'rating': 4.5,
            'tags': 'sneakers,natural,comfort,casual',
            'is_trending': True,
            'stock_quantity': 55,
            'ar_enabled': True,
            'three_d_model': 'sneakers_3d.obj'
        },
        
        # Rainy Weather Products
        {
            'name': 'Waterproof Rain Coat',
            'category': 'outerwear',
            'mood_category': 'rainy',
            'price': 129.99,
            'description': 'Premium waterproof coat perfect for rainy days',
            'emoji': '🌧️',
            'image_url': 'https://images.unsplash.com/photo-1544966503-7cc5a6a7e4a6?w=500',
            'brand': 'RainPro',
            'rating': 4.7,
            'tags': 'raincoat,rainy,waterproof,protection',
            'is_trending': True,
            'stock_quantity': 30,
            'ar_enabled': True,
            'three_d_model': 'raincoat_3d.obj'
        },
        {
            'name': 'Rain Boots',
            'category': 'footwear',
            'mood_category': 'rainy',
            'price': 59.99,
            'description': 'Waterproof boots to keep your feet dry',
            'emoji': '🥾',
            'image_url': 'https://images.unsplash.com/photo-1544824144-d0320d6c5f9a?w=500',
            'brand': 'DryFeet',
            'rating': 4.6,
            'tags': 'boots,rainy,waterproof,protection',
            'is_trending': False,
            'stock_quantity': 40,
            'ar_enabled': True,
            'three_d_model': 'boots_3d.obj'
        },
        {
            'name': 'Compact Umbrella',
            'category': 'accessories',
            'mood_category': 'rainy',
            'price': 29.99,
            'description': 'Compact and sturdy umbrella for rainy weather',
            'emoji': '☂️',
            'image_url': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
            'brand': 'RainShield',
            'rating': 4.3,
            'tags': 'umbrella,rainy,protection,compact',
            'is_trending': False,
            'stock_quantity': 85,
            'ar_enabled': True,
            'three_d_model': 'umbrella_3d.obj'
        }
    ]
    
    # Insert all products
    for product in essential_products:
        cursor.execute('''
            INSERT INTO products (
                name, category, mood_category, price, description, emoji, 
                image_url, brand, rating, tags, is_trending, stock_quantity,
                ar_enabled, three_d_model
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            product['name'], product['category'], product['mood_category'],
            product['price'], product['description'], product['emoji'],
            product['image_url'], product['brand'], product['rating'],
            product['tags'], product['is_trending'], product['stock_quantity'],
            product['ar_enabled'], product['three_d_model']
        ))
    
    conn.commit()
    conn.close()
    
    print(f"✅ Successfully added {len(essential_products)} essential products!")
    print("\n🛍️ Products Added by Mood:")
    
    mood_counts = {}
    for product in essential_products:
        mood = product['mood_category']
        if mood not in mood_counts:
            mood_counts[mood] = []
        mood_counts[mood].append(f"{product['name']} - ${product['price']}")
    
    for mood, products in mood_counts.items():
        print(f"\n{mood.upper()} MOOD:")
        for product in products:
            print(f"  • {product}")

if __name__ == "__main__":
    add_essential_products()
