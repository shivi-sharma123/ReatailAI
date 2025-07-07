import sqlite3
import json

# Connect to database
conn = sqlite3.connect('retailflow.db')
cursor = conn.cursor()

# Additional AR-enabled products with more variety
additional_products = [
    {
        'name': 'Smart Glasses AR Experience',
        'category': 'Electronics',
        'price': 599.99,
        'image_url': 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop',
        'description': 'Next-generation AR smart glasses with built-in display and voice control',
        'ar_enabled': True,
        'colors': json.dumps([
            {'name': 'Midnight Black', 'hex': '#000000', 'price_modifier': 0},
            {'name': 'Space Gray', 'hex': '#4a5568', 'price_modifier': 25},
            {'name': 'Rose Gold', 'hex': '#ed8936', 'price_modifier': 50},
            {'name': 'Crystal Clear', 'hex': '#e2e8f0', 'price_modifier': 75}
        ]),
        'sizes': json.dumps([
            {'size': 'Small', 'price_modifier': 0, 'stock': 20},
            {'size': 'Medium', 'price_modifier': 0, 'stock': 30},
            {'size': 'Large', 'price_modifier': 0, 'stock': 15}
        ]),
        'tags': 'AR Ready,Smart Tech,Voice Control,Display',
        'stock_quantity': 25,
        'rating': 4.8,
        'brand': 'TechVision',
        'is_trending': True
    },
    {
        'name': 'AR Gaming Headset Pro',
        'category': 'Electronics',
        'price': 299.99,
        'image_url': 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop',
        'description': 'Professional gaming headset with AR visualization and spatial audio',
        'ar_enabled': True,
        'colors': json.dumps([
            {'name': 'Gaming Red', 'hex': '#e53e3e', 'price_modifier': 0},
            {'name': 'Neon Blue', 'hex': '#2b6cb0', 'price_modifier': 20},
            {'name': 'RGB Rainbow', 'hex': '#805ad5', 'price_modifier': 40},
            {'name': 'Pro Black', 'hex': '#1a202c', 'price_modifier': 15}
        ]),
        'sizes': json.dumps([
            {'size': 'Standard', 'price_modifier': 0, 'stock': 50}
        ]),
        'tags': 'AR Gaming,Spatial Audio,RGB Lighting,Pro Grade',
        'stock_quantity': 40,
        'rating': 4.7,
        'brand': 'GameAR',
        'is_trending': True
    },
    {
        'name': 'AR Fashion Ring Collection',
        'category': 'Accessories',
        'price': 149.99,
        'image_url': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
        'description': 'Smart ring with AR try-on technology and health monitoring',
        'ar_enabled': True,
        'colors': json.dumps([
            {'name': 'Rose Gold', 'hex': '#ed8936', 'price_modifier': 0},
            {'name': 'White Gold', 'hex': '#f7fafc', 'price_modifier': 30},
            {'name': 'Yellow Gold', 'hex': '#d69e2e', 'price_modifier': 25},
            {'name': 'Platinum', 'hex': '#cbd5e0', 'price_modifier': 50}
        ]),
        'sizes': json.dumps([
            {'size': '5', 'price_modifier': 0, 'stock': 15},
            {'size': '6', 'price_modifier': 0, 'stock': 20},
            {'size': '7', 'price_modifier': 0, 'stock': 25},
            {'size': '8', 'price_modifier': 0, 'stock': 20},
            {'size': '9', 'price_modifier': 0, 'stock': 15}
        ]),
        'tags': 'AR Try-On,Health Monitor,Fashion Tech,Smart Ring',
        'stock_quantity': 30,
        'rating': 4.6,
        'brand': 'LuxeTech',
        'is_trending': True
    },
    {
        'name': 'AR Makeup Kit Premium',
        'category': 'Beauty',
        'price': 89.99,
        'image_url': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
        'description': 'Professional makeup kit with AR color matching and virtual try-on',
        'ar_enabled': True,
        'colors': json.dumps([
            {'name': 'Natural Tones', 'hex': '#d69e2e', 'price_modifier': 0},
            {'name': 'Bold Colors', 'hex': '#e53e3e', 'price_modifier': 15},
            {'name': 'Pastel Collection', 'hex': '#ed8936', 'price_modifier': 10},
            {'name': 'Professional Set', 'hex': '#2d3748', 'price_modifier': 25}
        ]),
        'sizes': json.dumps([
            {'size': 'Travel Size', 'price_modifier': -20, 'stock': 40},
            {'size': 'Full Size', 'price_modifier': 0, 'stock': 35},
            {'size': 'Professional', 'price_modifier': 30, 'stock': 20}
        ]),
        'tags': 'AR Beauty,Color Match,Virtual Try-On,Professional',
        'stock_quantity': 45,
        'rating': 4.9,
        'brand': 'BeautyAR',
        'is_trending': True
    },
    {
        'name': 'AR Smart Sneakers',
        'category': 'Footwear',
        'price': 249.99,
        'image_url': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        'description': 'High-tech sneakers with AR visualization and step tracking',
        'ar_enabled': True,
        'colors': json.dumps([
            {'name': 'Tech White', 'hex': '#f7fafc', 'price_modifier': 0},
            {'name': 'Neon Green', 'hex': '#38a169', 'price_modifier': 20},
            {'name': 'Electric Blue', 'hex': '#3182ce', 'price_modifier': 25},
            {'name': 'Sunset Orange', 'hex': '#ed8936', 'price_modifier': 30}
        ]),
        'sizes': json.dumps([
            {'size': '7', 'price_modifier': 0, 'stock': 15},
            {'size': '8', 'price_modifier': 0, 'stock': 20},
            {'size': '9', 'price_modifier': 0, 'stock': 25},
            {'size': '10', 'price_modifier': 0, 'stock': 20},
            {'size': '11', 'price_modifier': 0, 'stock': 15}
        ]),
        'tags': 'AR Footwear,Step Tracking,Smart Tech,Athletic',
        'stock_quantity': 35,
        'rating': 4.5,
        'brand': 'FutureStep',
        'is_trending': True
    },
    {
        'name': 'AR Smart Home Mirror',
        'category': 'Home & Kitchen',
        'price': 799.99,
        'image_url': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
        'description': 'Interactive smart mirror with AR display and voice control',
        'ar_enabled': True,
        'colors': json.dumps([
            {'name': 'Mirror Silver', 'hex': '#cbd5e0', 'price_modifier': 0},
            {'name': 'Matte Black', 'hex': '#1a202c', 'price_modifier': 50},
            {'name': 'Rose Gold Frame', 'hex': '#ed8936', 'price_modifier': 100}
        ]),
        'sizes': json.dumps([
            {'size': '24 inch', 'price_modifier': 0, 'stock': 15},
            {'size': '32 inch', 'price_modifier': 200, 'stock': 20},
            {'size': '42 inch', 'price_modifier': 400, 'stock': 10}
        ]),
        'tags': 'AR Display,Smart Home,Voice Control,Interactive',
        'stock_quantity': 20,
        'rating': 4.8,
        'brand': 'SmartReflect',
        'is_trending': True
    },
    {
        'name': 'AR Fitness Tracker Elite',
        'category': 'Sports',
        'price': 199.99,
        'image_url': 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop',
        'description': 'Advanced fitness tracker with AR workout visualization',
        'ar_enabled': True,
        'colors': json.dumps([
            {'name': 'Sport Black', 'hex': '#1a202c', 'price_modifier': 0},
            {'name': 'Ocean Blue', 'hex': '#2b6cb0', 'price_modifier': 15},
            {'name': 'Coral Pink', 'hex': '#ed64a6', 'price_modifier': 20},
            {'name': 'Forest Green', 'hex': '#38a169', 'price_modifier': 25}
        ]),
        'sizes': json.dumps([
            {'size': 'Small', 'price_modifier': 0, 'stock': 25},
            {'size': 'Medium', 'price_modifier': 0, 'stock': 30},
            {'size': 'Large', 'price_modifier': 0, 'stock': 20}
        ]),
        'tags': 'AR Fitness,Workout Tracking,Health Monitor,Sports',
        'stock_quantity': 40,
        'rating': 4.7,
        'brand': 'FitAR',
        'is_trending': True
    },
    {
        'name': 'AR Designer Backpack',
        'category': 'Fashion',
        'price': 179.99,
        'image_url': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
        'description': 'Smart backpack with AR organization system and LED display',
        'ar_enabled': True,
        'colors': json.dumps([
            {'name': 'Urban Gray', 'hex': '#4a5568', 'price_modifier': 0},
            {'name': 'Deep Black', 'hex': '#1a202c', 'price_modifier': 10},
            {'name': 'Navy Blue', 'hex': '#2c5282', 'price_modifier': 15},
            {'name': 'Burgundy', 'hex': '#742a2a', 'price_modifier': 20}
        ]),
        'sizes': json.dumps([
            {'size': 'Compact', 'price_modifier': -30, 'stock': 20},
            {'size': 'Standard', 'price_modifier': 0, 'stock': 35},
            {'size': 'Travel', 'price_modifier': 40, 'stock': 15}
        ]),
        'tags': 'AR Organization,LED Display,Smart Storage,Travel',
        'stock_quantity': 30,
        'rating': 4.6,
        'brand': 'TechPack',
        'is_trending': True
    }
]

# Insert products
for product in additional_products:
    cursor.execute('''
        INSERT INTO products (
            name, category, price, image_url, description, ar_enabled, 
            colors, sizes, tags, stock_quantity, rating, brand, is_trending
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        product['name'], product['category'], product['price'], 
        product['image_url'], product['description'], product['ar_enabled'],
        product['colors'], product['sizes'], product['tags'], 
        product['stock_quantity'], product['rating'], product['brand'], 
        product['is_trending']
    ))

conn.commit()

# Check total products now
cursor.execute('SELECT COUNT(*) FROM products')
total_count = cursor.fetchone()[0]
print(f'Total products after adding new ones: {total_count}')

# Show new products
cursor.execute('SELECT name, category, ar_enabled FROM products ORDER BY id DESC LIMIT 8')
new_products = cursor.fetchall()
print('\nNewly added AR-enabled products:')
for product in new_products:
    print(f'- {product[0]} ({product[1]}) - AR: {product[2]}')

conn.close()
print('\n✅ Successfully added 8 new AR-enabled products to the database!')
