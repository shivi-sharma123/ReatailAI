import sqlite3
import json
import random

def add_mood_based_products():
    """Add specific mood-based products with beautiful images"""
    
    conn = sqlite3.connect('retailflow.db')
    cursor = conn.cursor()
    
    # Enhanced mood-based products with high-quality images
    mood_products = [
        # Happy/Party Products
        {
            'name': 'Sparkly Party Dress',
            'category': 'Clothing',
            'price': 89.99,
            'description': 'Dazzling sequined dress perfect for parties and celebrations',
            'emoji': '✨',
            'image_url': 'https://images.unsplash.com/photo-1566479179817-3a8b6e0c0f3a?w=400&q=80',
            'brand': 'Glamour',
            'rating': 4.8,
            'mood_category': 'party',
            'tags': 'party,dress,sparkly,celebration,evening',
            'images': json.dumps([
                'https://images.unsplash.com/photo-1566479179817-3a8b6e0c0f3a?w=400&q=80',
                'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80',
                'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&q=80'
            ]),
            'colors': json.dumps([
                {'name': 'Gold', 'hex': '#FFD700', 'price_modifier': 0},
                {'name': 'Silver', 'hex': '#C0C0C0', 'price_modifier': 5},
                {'name': 'Rose Gold', 'hex': '#E8B4CB', 'price_modifier': 10},
                {'name': 'Black', 'hex': '#000000', 'price_modifier': -5},
                {'name': 'Red', 'hex': '#FF0000', 'price_modifier': 15},
                {'name': 'Blue', 'hex': '#0000FF', 'price_modifier': 12}
            ]),
            'sizes': json.dumps([
                {'name': 'Small', 'price_modifier': -5, 'stock': 20},
                {'name': 'Medium', 'price_modifier': 0, 'stock': 30},
                {'name': 'Large', 'price_modifier': 5, 'stock': 25}
            ])
        },
        {
            'name': 'Colorful Party Outfit Set',
            'category': 'Clothing',
            'price': 129.99,
            'description': 'Vibrant and fun outfit perfect for celebrations',
            'emoji': '🎉',
            'image_url': 'https://images.unsplash.com/photo-1544441893-675973e31985?w=400&q=80',
            'brand': 'Party Zone',
            'rating': 4.7,
            'mood_category': 'party',
            'tags': 'party,colorful,fun,celebration,outfit',
            'images': json.dumps([
                'https://images.unsplash.com/photo-1544441893-675973e31985?w=400&q=80',
                'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&q=80',
                'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80'
            ]),
            'colors': json.dumps([
                {'name': 'Bright Pink', 'hex': '#FF1493', 'price_modifier': 0},
                {'name': 'Electric Blue', 'hex': '#0080FF', 'price_modifier': 8},
                {'name': 'Neon Green', 'hex': '#00FF00', 'price_modifier': 10},
                {'name': 'Sunset Orange', 'hex': '#FF8C00', 'price_modifier': 12},
                {'name': 'Royal Purple', 'hex': '#8A2BE2', 'price_modifier': 15},
                {'name': 'Hot Yellow', 'hex': '#FFD700', 'price_modifier': 5}
            ]),
            'sizes': json.dumps([
                {'name': 'Small', 'price_modifier': -10, 'stock': 15},
                {'name': 'Medium', 'price_modifier': 0, 'stock': 25},
                {'name': 'Large', 'price_modifier': 10, 'stock': 20}
            ])
        },
        
        # Sad/Comfort Products
        {
            'name': 'Cozy Comfort Blanket',
            'category': 'Home',
            'price': 49.99,
            'description': 'Ultra-soft blanket for comfort and relaxation',
            'emoji': '🤗',
            'image_url': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
            'brand': 'Comfort Zone',
            'rating': 4.9,
            'mood_category': 'sad',
            'tags': 'comfort,cozy,soft,relaxation,blanket',
            'images': json.dumps([
                'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80',
                'https://images.unsplash.com/photo-1584622781564-1d987ba022c2?w=400&q=80'
            ]),
            'colors': json.dumps([
                {'name': 'Soft Gray', 'hex': '#808080', 'price_modifier': 0},
                {'name': 'Warm Beige', 'hex': '#F5F5DC', 'price_modifier': 5},
                {'name': 'Calming Blue', 'hex': '#87CEEB', 'price_modifier': 8},
                {'name': 'Gentle Pink', 'hex': '#FFB6C1', 'price_modifier': 10},
                {'name': 'Mint Green', 'hex': '#98FB98', 'price_modifier': 12},
                {'name': 'Lavender', 'hex': '#E6E6FA', 'price_modifier': 15}
            ]),
            'sizes': json.dumps([
                {'name': 'Small', 'price_modifier': -10, 'stock': 30},
                {'name': 'Medium', 'price_modifier': 0, 'stock': 40},
                {'name': 'Large', 'price_modifier': 15, 'stock': 25}
            ])
        },
        {
            'name': 'Comfort Food Mug Set',
            'category': 'Home',
            'price': 29.99,
            'description': 'Beautiful mug set for your favorite comfort drinks',
            'emoji': '☕',
            'image_url': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80',
            'brand': 'Cozy Cup',
            'rating': 4.6,
            'mood_category': 'sad',
            'tags': 'comfort,mug,coffee,tea,relaxation',
            'images': json.dumps([
                'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80',
                'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80'
            ]),
            'colors': json.dumps([
                {'name': 'Warm White', 'hex': '#FFFDD0', 'price_modifier': 0},
                {'name': 'Soft Blue', 'hex': '#B0E0E6', 'price_modifier': 3},
                {'name': 'Gentle Pink', 'hex': '#FFB6C1', 'price_modifier': 5},
                {'name': 'Calm Gray', 'hex': '#D3D3D3', 'price_modifier': 2},
                {'name': 'Mint Green', 'hex': '#98FB98', 'price_modifier': 8},
                {'name': 'Lavender', 'hex': '#E6E6FA', 'price_modifier': 10}
            ]),
            'sizes': json.dumps([
                {'name': 'Small', 'price_modifier': -5, 'stock': 25},
                {'name': 'Medium', 'price_modifier': 0, 'stock': 35},
                {'name': 'Large', 'price_modifier': 8, 'stock': 20}
            ])
        },
        
        # Normal/Everyday Products
        {
            'name': 'Classic Everyday Jeans',
            'category': 'Clothing',
            'price': 59.99,
            'description': 'Comfortable and stylish jeans for everyday wear',
            'emoji': '👖',
            'image_url': 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80',
            'brand': 'Everyday Wear',
            'rating': 4.5,
            'mood_category': 'normal',
            'tags': 'casual,jeans,everyday,comfortable,classic',
            'images': json.dumps([
                'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80',
                'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400&q=80',
                'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&q=80'
            ]),
            'colors': json.dumps([
                {'name': 'Classic Blue', 'hex': '#4169E1', 'price_modifier': 0},
                {'name': 'Dark Wash', 'hex': '#191970', 'price_modifier': 5},
                {'name': 'Light Wash', 'hex': '#6495ED', 'price_modifier': 3},
                {'name': 'Black', 'hex': '#000000', 'price_modifier': 8},
                {'name': 'Gray', 'hex': '#808080', 'price_modifier': 10},
                {'name': 'White', 'hex': '#FFFFFF', 'price_modifier': 12}
            ]),
            'sizes': json.dumps([
                {'name': 'Small', 'price_modifier': -5, 'stock': 30},
                {'name': 'Medium', 'price_modifier': 0, 'stock': 45},
                {'name': 'Large', 'price_modifier': 5, 'stock': 35}
            ])
        },
        {
            'name': 'Comfortable Casual T-Shirt',
            'category': 'Clothing',
            'price': 24.99,
            'description': 'Soft and comfortable t-shirt for daily wear',
            'emoji': '👕',
            'image_url': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
            'brand': 'Daily Comfort',
            'rating': 4.4,
            'mood_category': 'normal',
            'tags': 'casual,t-shirt,everyday,comfortable,basic',
            'images': json.dumps([
                'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
                'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&q=80',
                'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&q=80'
            ]),
            'colors': json.dumps([
                {'name': 'Navy Blue', 'hex': '#000080', 'price_modifier': 0},
                {'name': 'Pure White', 'hex': '#FFFFFF', 'price_modifier': 2},
                {'name': 'Charcoal Gray', 'hex': '#36454F', 'price_modifier': 3},
                {'name': 'Forest Green', 'hex': '#228B22', 'price_modifier': 5},
                {'name': 'Burgundy', 'hex': '#800020', 'price_modifier': 8},
                {'name': 'Classic Black', 'hex': '#000000', 'price_modifier': 4}
            ]),
            'sizes': json.dumps([
                {'name': 'Small', 'price_modifier': -3, 'stock': 40},
                {'name': 'Medium', 'price_modifier': 0, 'stock': 50},
                {'name': 'Large', 'price_modifier': 3, 'stock': 35}
            ])
        }
    ]
    
    # Insert products
    for product in mood_products:
        cursor.execute('''
            INSERT INTO products (name, category, price, description, emoji, image_url, brand, rating, 
                                is_trending, stock_quantity, ar_enabled, tags, mood_category, images, colors, sizes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            product['name'],
            product['category'],
            product['price'],
            product['description'],
            product['emoji'],
            product['image_url'],
            product['brand'],
            product['rating'],
            True,  # is_trending
            random.randint(20, 100),  # stock_quantity
            True,  # ar_enabled
            product['tags'],
            product['mood_category'],
            product['images'],
            product['colors'],
            product['sizes']
        ))
    
    conn.commit()
    conn.close()
    print(f"✅ Added {len(mood_products)} mood-based products with beautiful images!")
    print("📸 Products include proper color and size options")
    print("🎯 Mood categories: party, sad, normal")

if __name__ == "__main__":
    add_mood_based_products()
