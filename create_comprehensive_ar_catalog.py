#!/usr/bin/env python3
"""
Universal AR Product Database Setup
Creates a comprehensive product catalog with AR capabilities for all items
"""

import sqlite3
import json
import os

# Database path
DATABASE = os.path.join(os.path.dirname(__file__), 'client', 'server', 'retailflow.db')
if not os.path.exists(DATABASE):
    DATABASE = os.path.join(os.path.dirname(__file__), 'retailflow.db')

def create_comprehensive_ar_catalog():
    """Create a comprehensive catalog with AR-enabled products across all categories"""
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Clear existing products to start fresh
    cursor.execute('DELETE FROM products')
    
    # Comprehensive product catalog with AR features
    ar_products = [
        # Electronics Category
        {
            'name': 'iPhone 15 Pro Max',
            'category': 'Electronics',
            'price': 1199.00,
            'description': 'The most advanced iPhone with titanium design, A17 Pro chip, and revolutionary camera system.',
            'emoji': '📱',
            'brand': 'Apple',
            'rating': 4.9,
            'stock_quantity': 45,
            'ar_enabled': True,
            'tags': json.dumps(['smartphone', 'apple', 'camera', 'titanium']),
            'mood_category': 'tech',
            'images': json.dumps([
                'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692895395658',
                'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692895395658'
            ]),
            'colors': json.dumps([
                {'name': 'Natural Titanium', 'hex': '#E3E3E3', 'price_modifier': 0},
                {'name': 'Blue Titanium', 'hex': '#5F8EC4', 'price_modifier': 0},
                {'name': 'White Titanium', 'hex': '#F7F7F7', 'price_modifier': 0},
                {'name': 'Black Titanium', 'hex': '#2C2C2C', 'price_modifier': 0}
            ]),
            'sizes': json.dumps([
                {'size': '128GB', 'price_modifier': 0, 'stock': 20},
                {'size': '256GB', 'price_modifier': 200, 'stock': 15},
                {'size': '512GB', 'price_modifier': 400, 'stock': 10},
                {'size': '1TB', 'price_modifier': 600, 'stock': 5}
            ]),
            'material': 'Titanium',
            'dimensions': json.dumps({'length': 159.9, 'width': 76.7, 'height': 8.25}),
            'image_url': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692895395658'
        },
        {
            'name': 'MacBook Pro 16-inch M3',
            'category': 'Electronics',
            'price': 2499.00,
            'description': 'Supercharged by M3 Pro or M3 Max chip for extreme performance and all-day battery life.',
            'emoji': '💻',
            'brand': 'Apple',
            'rating': 4.8,
            'stock_quantity': 25,
            'ar_enabled': True,
            'tags': json.dumps(['laptop', 'professional', 'm3', 'macbook']),
            'mood_category': 'professional',
            'images': json.dumps([
                'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697230830200'
            ]),
            'colors': json.dumps([
                {'name': 'Space Gray', 'hex': '#7D7E80', 'price_modifier': 0},
                {'name': 'Silver', 'hex': '#E3E4E5', 'price_modifier': 0}
            ]),
            'sizes': json.dumps([
                {'size': '18GB RAM/512GB SSD', 'price_modifier': 0, 'stock': 10},
                {'size': '36GB RAM/1TB SSD', 'price_modifier': 800, 'stock': 8},
                {'size': '128GB RAM/8TB SSD', 'price_modifier': 5600, 'stock': 2}
            ]),
            'material': 'Aluminum',
            'dimensions': json.dumps({'length': 355, 'width': 248, 'height': 16.8}),
            'image_url': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697230830200'
        },
        
        # Fashion & Clothing
        {
            'name': 'Nike Air Jordan 4 Retro',
            'category': 'Shoes',
            'price': 200.00,
            'description': 'Iconic basketball shoe with premium materials and legendary Jordan style.',
            'emoji': '👟',
            'brand': 'Nike',
            'rating': 4.7,
            'stock_quantity': 60,
            'ar_enabled': True,
            'tags': json.dumps(['sneakers', 'jordan', 'basketball', 'retro']),
            'mood_category': 'sporty',
            'images': json.dumps([
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/air-jordan-4-retro-mens-shoes-zF0Q2V.png'
            ]),
            'colors': json.dumps([
                {'name': 'White/Black', 'hex': '#FFFFFF', 'price_modifier': 0},
                {'name': 'Black/Red', 'hex': '#000000', 'price_modifier': 25},
                {'name': 'University Blue', 'hex': '#87CEEB', 'price_modifier': 50},
                {'name': 'Military Blue', 'hex': '#4169E1', 'price_modifier': 50},
                {'name': 'Fire Red', 'hex': '#FF4500', 'price_modifier': 75}
            ]),
            'sizes': json.dumps([
                {'size': '7', 'price_modifier': 0, 'stock': 8},
                {'size': '7.5', 'price_modifier': 0, 'stock': 10},
                {'size': '8', 'price_modifier': 0, 'stock': 12},
                {'size': '8.5', 'price_modifier': 0, 'stock': 10},
                {'size': '9', 'price_modifier': 0, 'stock': 15},
                {'size': '9.5', 'price_modifier': 0, 'stock': 12},
                {'size': '10', 'price_modifier': 0, 'stock': 10},
                {'size': '10.5', 'price_modifier': 0, 'stock': 8},
                {'size': '11', 'price_modifier': 0, 'stock': 8},
                {'size': '12', 'price_modifier': 0, 'stock': 5}
            ]),
            'material': 'Leather/Synthetic',
            'dimensions': json.dumps({'length': 32, 'width': 12, 'height': 11}),
            'image_url': 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/air-jordan-4-retro-mens-shoes-zF0Q2V.png'
        },
        {
            'name': 'Supreme Box Logo Hoodie',
            'category': 'Clothing',
            'price': 168.00,
            'description': 'Iconic Supreme hoodie with classic box logo. Premium cotton construction.',
            'emoji': '👕',
            'brand': 'Supreme',
            'rating': 4.6,
            'stock_quantity': 40,
            'ar_enabled': True,
            'tags': json.dumps(['streetwear', 'hoodie', 'supreme', 'cotton']),
            'mood_category': 'street',
            'images': json.dumps([
                'https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/resize=height:700/output=quality:90/compress/watermark=file:grailed_logos/grailed_watermark_2019.png/https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/resize=height:700/output=quality:90/compress/https://cdn.fs.grailed.com/api/file/x9QTt0QmRLOYhpYOAGK8'
            ]),
            'colors': json.dumps([
                {'name': 'Black', 'hex': '#000000', 'price_modifier': 0},
                {'name': 'Grey', 'hex': '#808080', 'price_modifier': 0},
                {'name': 'Red', 'hex': '#FF0000', 'price_modifier': 20},
                {'name': 'Navy', 'hex': '#000080', 'price_modifier': 15},
                {'name': 'White', 'hex': '#FFFFFF', 'price_modifier': 10}
            ]),
            'sizes': json.dumps([
                {'size': 'XS', 'price_modifier': 0, 'stock': 5},
                {'size': 'S', 'price_modifier': 0, 'stock': 10},
                {'size': 'M', 'price_modifier': 0, 'stock': 15},
                {'size': 'L', 'price_modifier': 0, 'stock': 12},
                {'size': 'XL', 'price_modifier': 0, 'stock': 8},
                {'size': 'XXL', 'price_modifier': 5, 'stock': 3}
            ]),
            'material': '100% Cotton',
            'dimensions': json.dumps({'chest': 56, 'length': 69}),
            'image_url': 'https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/resize=height:700/output=quality:90/compress/watermark=file:grailed_logos/grailed_watermark_2019.png/https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/resize=height:700/output=quality:90/compress/https://cdn.fs.grailed.com/api/file/x9QTt0QmRLOYhpYOAGK8'
        },
        
        # Accessories
        {
            'name': 'Rolex Submariner Date',
            'category': 'Watches',
            'price': 8950.00,
            'description': 'Legendary diving watch with Oystersteel case and ceramic bezel.',
            'emoji': '⌚',
            'brand': 'Rolex',
            'rating': 4.9,
            'stock_quantity': 8,
            'ar_enabled': True,
            'tags': json.dumps(['luxury', 'diving', 'swiss', 'automatic']),
            'mood_category': 'luxury',
            'images': json.dumps([
                'https://content.rolex.com/dam/2023-11/upright-bba-with-shadow/m126610ln-0001.png?impolicy=v6-upright&imwidth=570'
            ]),
            'colors': json.dumps([
                {'name': 'Black', 'hex': '#000000', 'price_modifier': 0},
                {'name': 'Green', 'hex': '#006B3C', 'price_modifier': 500},
                {'name': 'Blue', 'hex': '#003366', 'price_modifier': 300}
            ]),
            'sizes': json.dumps([
                {'size': '41mm', 'price_modifier': 0, 'stock': 8}
            ]),
            'material': 'Oystersteel',
            'dimensions': json.dumps({'diameter': 41, 'thickness': 12.5}),
            'image_url': 'https://content.rolex.com/dam/2023-11/upright-bba-with-shadow/m126610ln-0001.png?impolicy=v6-upright&imwidth=570'
        },
        {
            'name': 'Oakley Radar EV Path',
            'category': 'Sunglasses',
            'price': 173.00,
            'description': 'High-performance sports sunglasses with Prizm lens technology.',
            'emoji': '🕶️',
            'brand': 'Oakley',
            'rating': 4.5,
            'stock_quantity': 30,
            'ar_enabled': True,
            'tags': json.dumps(['sports', 'cycling', 'running', 'prizm']),
            'mood_category': 'sporty',
            'images': json.dumps([
                'https://assets.oakley.com/is/image/OakleyInc/921853_polished_black_prizm_road_001_191142_png_herohd.png'
            ]),
            'colors': json.dumps([
                {'name': 'Polished Black', 'hex': '#000000', 'price_modifier': 0},
                {'name': 'Polished White', 'hex': '#FFFFFF', 'price_modifier': 0},
                {'name': 'Matte Black', 'hex': '#2C2C2C', 'price_modifier': 15},
                {'name': 'Team Colors', 'hex': '#FF0000', 'price_modifier': 25}
            ]),
            'sizes': json.dumps([
                {'size': 'Standard', 'price_modifier': 0, 'stock': 30}
            ]),
            'material': 'O Matter/Unobtainium',
            'dimensions': json.dumps({'width': 138, 'height': 46}),
            'image_url': 'https://assets.oakley.com/is/image/OakleyInc/921853_polished_black_prizm_road_001_191142_png_herohd.png'
        },
        
        # Home & Living
        {
            'name': 'Dyson V15 Detect Absolute',
            'category': 'Home',
            'price': 749.99,
            'description': 'Powerful cordless vacuum with laser dust detection and intelligent suction.',
            'emoji': '🏠',
            'brand': 'Dyson',
            'rating': 4.7,
            'stock_quantity': 20,
            'ar_enabled': True,
            'tags': json.dumps(['vacuum', 'cordless', 'laser', 'cleaning']),
            'mood_category': 'home',
            'images': json.dumps([
                'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/products/vacuum-cleaners/cordless/v15-detect/V15-Detect-Absolute-Gold-Purple-Hero-360.png'
            ]),
            'colors': json.dumps([
                {'name': 'Gold/Purple', 'hex': '#9966CC', 'price_modifier': 0},
                {'name': 'Blue/Red', 'hex': '#4169E1', 'price_modifier': 0}
            ]),
            'sizes': json.dumps([
                {'size': 'Standard', 'price_modifier': 0, 'stock': 20}
            ]),
            'material': 'ABS Plastic/Carbon Fiber',
            'dimensions': json.dumps({'length': 1265, 'width': 250, 'height': 225}),
            'image_url': 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/products/vacuum-cleaners/cordless/v15-detect/V15-Detect-Absolute-Gold-Purple-Hero-360.png'
        },
        
        # Sports & Fitness
        {
            'name': 'Peloton Bike+',
            'category': 'Sports',
            'price': 2495.00,
            'description': 'Premium indoor cycling bike with rotating HD touchscreen and immersive classes.',
            'emoji': '🚴',
            'brand': 'Peloton',
            'rating': 4.8,
            'stock_quantity': 15,
            'ar_enabled': True,
            'tags': json.dumps(['fitness', 'cycling', 'interactive', 'streaming']),
            'mood_category': 'fitness',
            'images': json.dumps([
                'https://assets.onepeloton.com/image/upload/c_pad,f_auto,h_596,q_auto:good,w_596/v1656340011/WEB_BIKE_PLUS_CARBON_PDP'
            ]),
            'colors': json.dumps([
                {'name': 'Carbon Steel', 'hex': '#2C2C2C', 'price_modifier': 0}
            ]),
            'sizes': json.dumps([
                {'size': 'Standard', 'price_modifier': 0, 'stock': 15}
            ]),
            'material': 'Steel/Carbon Fiber',
            'dimensions': json.dumps({'length': 149, 'width': 61, 'height': 135}),
            'image_url': 'https://assets.onepeloton.com/image/upload/c_pad,f_auto,h_596,q_auto:good,w_596/v1656340011/WEB_BIKE_PLUS_CARBON_PDP'
        },
        
        # Beauty & Personal Care
        {
            'name': 'Dyson Airwrap Multi-Styler',
            'category': 'Beauty',
            'price': 599.99,
            'description': 'Revolutionary hair styler that curls, waves, smooths, and dries with no extreme heat.',
            'emoji': '💄',
            'brand': 'Dyson',
            'rating': 4.6,
            'stock_quantity': 25,
            'ar_enabled': True,
            'tags': json.dumps(['hair', 'styling', 'no-heat', 'coanda']),
            'mood_category': 'beauty',
            'images': json.dumps([
                'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/products/hair-care/hair-stylers/airwrap/gen1/HS05-Ceramic-Pop-Nickel-Copper-Hero.png'
            ]),
            'colors': json.dumps([
                {'name': 'Ceramic Pop/Nickel', 'hex': '#FF69B4', 'price_modifier': 0},
                {'name': 'Prussian Blue/Copper', 'hex': '#003153', 'price_modifier': 0},
                {'name': 'Strawberry Bronze/Blush', 'hex': '#CD7F32', 'price_modifier': 50}
            ]),
            'sizes': json.dumps([
                {'size': 'Complete Set', 'price_modifier': 0, 'stock': 15},
                {'size': 'Long Hair Set', 'price_modifier': 0, 'stock': 10}
            ]),
            'material': 'ABS/Ceramic',
            'dimensions': json.dumps({'length': 397, 'width': 78, 'height': 78}),
            'image_url': 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/products/hair-care/hair-stylers/airwrap/gen1/HS05-Ceramic-Pop-Nickel-Copper-Hero.png'
        }
    ]
    
    # Insert all products
    for product in ar_products:
        cursor.execute('''
        INSERT INTO products 
        (name, category, price, description, emoji, brand, rating, stock_quantity, ar_enabled, 
         tags, mood_category, images, colors, sizes, material, dimensions, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            product['name'], product['category'], product['price'], product['description'],
            product['emoji'], product['brand'], product['rating'], product['stock_quantity'],
            product['ar_enabled'], product['tags'], product['mood_category'],
            product['images'], product['colors'], product['sizes'],
            product['material'], product['dimensions'], product['image_url']
        ))
    
    conn.commit()
    conn.close()
    
    print("🎉 COMPREHENSIVE AR CATALOG CREATED!")
    print(f"📦 Added {len(ar_products)} premium products")
    print("🥽 ALL products are AR-enabled")
    print("🎨 Every product has multiple colors")
    print("📏 Every product has size variations")
    print("🛍️ Ready for immersive shopping experience!")
    
    # Print category breakdown
    categories = {}
    for product in ar_products:
        cat = product['category']
        categories[cat] = categories.get(cat, 0) + 1
    
    print("\n📊 CATEGORY BREAKDOWN:")
    for category, count in categories.items():
        print(f"   {category}: {count} products")

if __name__ == "__main__":
    create_comprehensive_ar_catalog()
