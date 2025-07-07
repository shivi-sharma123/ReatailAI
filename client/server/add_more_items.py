import sqlite3
import json

DATABASE = 'retailflow.db'

def add_more_products():
    """Add more coats, blankets, and winter items to the database"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # New products to add
    new_products = [
        # Cozy Blankets
        {
            'name': 'Ultra Soft Cozy Blanket',
            'category': 'home',
            'mood_category': 'cozy',
            'price': 45.99,
            'description': 'Incredibly soft fleece blanket perfect for cold nights. Warm and comfortable.',
            'emoji': '🛌',
            'image_url': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500',
            'brand': 'CozyHome',
            'rating': 4.8,
            'tags': 'cozy, blanket, soft, warm, fleece',
            'is_trending': True,
            'stock_quantity': 50,
            'ar_enabled': True,
            'three_d_model': 'blanket_model.obj'
        },
        {
            'name': 'Sherpa Throw Blanket',
            'category': 'home',
            'mood_category': 'cozy',
            'price': 39.99,
            'description': 'Luxurious sherpa blanket with plush texture. Perfect for snuggling.',
            'emoji': '🧸',
            'image_url': 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500',
            'brand': 'WarmTech',
            'rating': 4.7,
            'tags': 'sherpa, cozy, blanket, plush, comfort',
            'is_trending': True,
            'stock_quantity': 35,
            'ar_enabled': True,
            'three_d_model': 'sherpa_blanket.obj'
        },
        {
            'name': 'Weighted Comfort Blanket',
            'category': 'home',
            'mood_category': 'cozy',
            'price': 89.99,
            'description': 'Therapeutic weighted blanket for better sleep and relaxation.',
            'emoji': '😴',
            'image_url': 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=500',
            'brand': 'SleepWell',
            'rating': 4.9,
            'tags': 'weighted, blanket, sleep, therapy, cozy',
            'is_trending': False,
            'stock_quantity': 25,
            'ar_enabled': True,
            'three_d_model': 'weighted_blanket.obj'
        },
        
        # Winter Coats
        {
            'name': 'Classic Wool Coat',
            'category': 'outerwear',
            'mood_category': 'elegant',
            'price': 199.99,
            'description': 'Timeless wool coat with elegant tailoring. Perfect for formal occasions.',
            'emoji': '🧥',
            'image_url': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
            'brand': 'Elegance',
            'rating': 4.6,
            'tags': 'wool, coat, elegant, formal, classic',
            'is_trending': True,
            'stock_quantity': 40,
            'ar_enabled': True,
            'three_d_model': 'wool_coat.obj'
        },
        {
            'name': 'Puffer Winter Coat',
            'category': 'outerwear',
            'mood_category': 'sporty',
            'price': 149.99,
            'description': 'Warm puffer coat with water-resistant exterior. Great for outdoor activities.',
            'emoji': '🏔️',
            'image_url': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
            'brand': 'OutdoorPro',
            'rating': 4.5,
            'tags': 'puffer, winter, coat, warm, outdoor',
            'is_trending': True,
            'stock_quantity': 60,
            'ar_enabled': True,
            'three_d_model': 'puffer_coat.obj'
        },
        {
            'name': 'Long Trench Coat',
            'category': 'outerwear',
            'mood_category': 'professional',
            'price': 179.99,
            'description': 'Sophisticated trench coat with belt tie. Business casual perfection.',
            'emoji': '👔',
            'image_url': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
            'brand': 'BusinessStyle',
            'rating': 4.7,
            'tags': 'trench, coat, professional, business, sophisticated',
            'is_trending': False,
            'stock_quantity': 30,
            'ar_enabled': True,
            'three_d_model': 'trench_coat.obj'
        },
        {
            'name': 'Denim Jacket Coat',
            'category': 'outerwear',
            'mood_category': 'casual',
            'price': 79.99,
            'description': 'Casual denim jacket with fleece lining. Perfect for everyday wear.',
            'emoji': '👖',
            'image_url': 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500',
            'brand': 'CasualWear',
            'rating': 4.4,
            'tags': 'denim, jacket, casual, everyday, comfortable',
            'is_trending': True,
            'stock_quantity': 55,
            'ar_enabled': True,
            'three_d_model': 'denim_jacket.obj'
        },
        {
            'name': 'Faux Fur Luxury Coat',
            'category': 'outerwear',
            'mood_category': 'luxury',
            'price': 249.99,
            'description': 'Luxurious faux fur coat for special occasions. Glamorous and warm.',
            'emoji': '✨',
            'image_url': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
            'brand': 'LuxuryLine',
            'rating': 4.8,
            'tags': 'faux fur, luxury, coat, glamorous, special occasion',
            'is_trending': True,
            'stock_quantity': 20,
            'ar_enabled': True,
            'three_d_model': 'fur_coat.obj'
        },
        
        # More Home Comfort Items
        {
            'name': 'Heated Throw Blanket',
            'category': 'home',
            'mood_category': 'cozy',
            'price': 69.99,
            'description': 'Electric heated blanket with multiple temperature settings. Ultimate comfort.',
            'emoji': '🔥',
            'image_url': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500',
            'brand': 'WarmTech',
            'rating': 4.6,
            'tags': 'heated, electric, blanket, warm, temperature control',
            'is_trending': True,
            'stock_quantity': 25,
            'ar_enabled': True,
            'three_d_model': 'heated_blanket.obj'
        },
        {
            'name': 'Cozy Reading Blanket',
            'category': 'home',
            'mood_category': 'cozy',
            'price': 34.99,
            'description': 'Perfect reading companion blanket with pockets for books and devices.',
            'emoji': '📚',
            'image_url': 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500',
            'brand': 'ReadComfort',
            'rating': 4.5,
            'tags': 'reading, blanket, pockets, cozy, comfort',
            'is_trending': False,
            'stock_quantity': 40,
            'ar_enabled': True,
            'three_d_model': 'reading_blanket.obj'
        }
    ]
    
    # Insert all new products
    for product in new_products:
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
    print(f"✅ Successfully added {len(new_products)} new products!")
    
    # Show what was added
    print("\n🆕 New Products Added:")
    for product in new_products:
        print(f"  • {product['name']} - ${product['price']} ({product['category']})")

if __name__ == "__main__":
    add_more_products()
