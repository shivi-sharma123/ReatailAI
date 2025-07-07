#!/usr/bin/env python3
"""
Enhanced AR Product Setup Script
Creates products with comprehensive AR features, color variations, and size options
"""

import sqlite3
import json
import os

# Database path
DATABASE = os.path.join(os.path.dirname(__file__), 'retailflow.db')

def create_ar_products():
    """Create AR-enabled products with color and size variations"""
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Enhanced products with AR features
    ar_products = [
        {
            'name': 'Apple Watch Series 9 GPS',
            'category': 'Smartwatch',
            'price': 399.00,
            'description': 'Experience the most advanced Apple Watch with health tracking, fitness features, and seamless connectivity.',
            'emoji': '⌚',
            'brand': 'Apple',
            'rating': 4.8,
            'stock_quantity': 50,
            'ar_enabled': True,
            'tags': json.dumps(['fitness', 'health', 'smartwatch', 'apple']),
            'mood_category': 'active',
            'images': json.dumps([
                'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s9-gps-41-product-red-sport-band-s9-gps-41-product-red-sport-band-witb-geo_GEO_IN?wid=1000&hei=1000&fmt=png-alpha&.v=1693010169669',
                'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s9-gps-41-blue-sport-band-s9-gps-41-blue-sport-band-witb-geo_GEO_IN?wid=1000&hei=1000&fmt=png-alpha&.v=1693010169669',
                'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s9-gps-41-pink-sport-band-s9-gps-41-pink-sport-band-witb-geo_GEO_IN?wid=1000&hei=1000&fmt=png-alpha&.v=1693010169669'
            ]),
            'colors': json.dumps([
                {'name': 'Midnight', 'hex': '#1D1D1F', 'price_modifier': 0},
                {'name': 'Starlight', 'hex': '#F5F5DC', 'price_modifier': 0},
                {'name': 'Silver', 'hex': '#C0C0C0', 'price_modifier': 0},
                {'name': 'Product Red', 'hex': '#FF3B30', 'price_modifier': 0},
                {'name': 'Pink', 'hex': '#FF69B4', 'price_modifier': 0}
            ]),
            'sizes': json.dumps([
                {'size': '41mm', 'price_modifier': 0, 'stock': 30},
                {'size': '45mm', 'price_modifier': 30, 'stock': 20}
            ]),
            'material': 'Aluminum',
            'dimensions': json.dumps({'length': 45, 'width': 38, 'height': 10.7}),
            'image_url': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s9-gps-41-product-red-sport-band-s9-gps-41-product-red-sport-band-witb-geo_GEO_IN?wid=1000&hei=1000&fmt=png-alpha&.v=1693010169669'
        },
        {
            'name': 'Nike Air Max 270 React',
            'category': 'Shoes',
            'price': 150.00,
            'description': 'Revolutionary Nike Air Max 270 React with enhanced cushioning and modern design for ultimate comfort.',
            'emoji': '👟',
            'brand': 'Nike',
            'rating': 4.6,
            'stock_quantity': 40,
            'ar_enabled': True,
            'tags': json.dumps(['shoes', 'nike', 'running', 'comfort']),
            'mood_category': 'active',
            'images': json.dumps([
                'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-max-270-react-mens-shoe-AO4971-100.jpg',
                'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-max-270-react-mens-shoe-AO4971-001.jpg'
            ]),
            'colors': json.dumps([
                {'name': 'White/Black', 'hex': '#FFFFFF', 'price_modifier': 0},
                {'name': 'Black/White', 'hex': '#000000', 'price_modifier': 0},
                {'name': 'Red/White', 'hex': '#FF0000', 'price_modifier': 10},
                {'name': 'Blue/White', 'hex': '#0000FF', 'price_modifier': 10},
                {'name': 'Green/White', 'hex': '#00FF00', 'price_modifier': 10}
            ]),
            'sizes': json.dumps([
                {'size': '7', 'price_modifier': 0, 'stock': 8},
                {'size': '7.5', 'price_modifier': 0, 'stock': 10},
                {'size': '8', 'price_modifier': 0, 'stock': 12},
                {'size': '8.5', 'price_modifier': 0, 'stock': 10},
                {'size': '9', 'price_modifier': 0, 'stock': 12},
                {'size': '9.5', 'price_modifier': 0, 'stock': 8},
                {'size': '10', 'price_modifier': 0, 'stock': 10},
                {'size': '10.5', 'price_modifier': 0, 'stock': 6},
                {'size': '11', 'price_modifier': 0, 'stock': 8},
                {'size': '12', 'price_modifier': 0, 'stock': 4}
            ]),
            'material': 'Synthetic/Textile',
            'dimensions': json.dumps({'length': 31, 'width': 11, 'height': 12}),
            'image_url': 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-max-270-react-mens-shoe-AO4971-100.jpg'
        },
        {
            'name': 'Ray-Ban Aviator Classic',
            'category': 'Sunglasses',
            'price': 150.00,
            'description': 'Iconic Ray-Ban Aviator sunglasses with classic style and superior UV protection.',
            'emoji': '🕶️',
            'brand': 'Ray-Ban',
            'rating': 4.7,
            'stock_quantity': 35,
            'ar_enabled': True,
            'tags': json.dumps(['sunglasses', 'fashion', 'rayban', 'aviator']),
            'mood_category': 'trendy',
            'images': json.dumps([
                'https://assets.ray-ban.com/is/image/RayBan/8053672818543__STD__shad__qt.png?$PDP_STANDARD_1440$',
                'https://assets.ray-ban.com/is/image/RayBan/8053672818543__STD__shad__qt.png?$PDP_STANDARD_1440$'
            ]),
            'colors': json.dumps([
                {'name': 'Gold/Green', 'hex': '#FFD700', 'price_modifier': 0},
                {'name': 'Silver/Blue', 'hex': '#C0C0C0', 'price_modifier': 0},
                {'name': 'Black/Gray', 'hex': '#000000', 'price_modifier': 0},
                {'name': 'Brown/Brown', 'hex': '#8B4513', 'price_modifier': 10},
                {'name': 'Rose Gold/Pink', 'hex': '#E8B4B8', 'price_modifier': 25}
            ]),
            'sizes': json.dumps([
                {'size': '55mm', 'price_modifier': 0, 'stock': 15},
                {'size': '58mm', 'price_modifier': 0, 'stock': 20}
            ]),
            'material': 'Metal/Glass',
            'dimensions': json.dumps({'width': 140, 'height': 50, 'depth': 4}),
            'image_url': 'https://assets.ray-ban.com/is/image/RayBan/8053672818543__STD__shad__qt.png?$PDP_STANDARD_1440$'
        },
        {
            'name': 'Levi\'s 501 Original Fit Jeans',
            'category': 'Clothing',
            'price': 89.50,
            'description': 'The original blue jean. Modeled after the 1955 501 Original, with a straight leg and regular fit.',
            'emoji': '👖',
            'brand': 'Levi\'s',
            'rating': 4.5,
            'stock_quantity': 60,
            'ar_enabled': True,
            'tags': json.dumps(['jeans', 'denim', 'levis', 'classic']),
            'mood_category': 'casual',
            'images': json.dumps([
                'https://lsco.scene7.com/is/image/lsco/005010000-front-pdp?fmt=jpeg&qlt=70,1&op_sharpen=0&resMode=sharp2&op_usm=0.8,1,10,0&fit=crop,0&wid=750&hei=1000',
                'https://lsco.scene7.com/is/image/lsco/005010114-front-pdp?fmt=jpeg&qlt=70,1&op_sharpen=0&resMode=sharp2&op_usm=0.8,1,10,0&fit=crop,0&wid=750&hei=1000'
            ]),
            'colors': json.dumps([
                {'name': 'Dark Stonewash', 'hex': '#2F4F4F', 'price_modifier': 0},
                {'name': 'Medium Stonewash', 'hex': '#4682B4', 'price_modifier': 0},
                {'name': 'Light Stonewash', 'hex': '#87CEEB', 'price_modifier': 0},
                {'name': 'Black', 'hex': '#000000', 'price_modifier': 5},
                {'name': 'Raw Denim', 'hex': '#1B2951', 'price_modifier': 10}
            ]),
            'sizes': json.dumps([
                {'size': '28', 'price_modifier': 0, 'stock': 8},
                {'size': '30', 'price_modifier': 0, 'stock': 12},
                {'size': '32', 'price_modifier': 0, 'stock': 15},
                {'size': '34', 'price_modifier': 0, 'stock': 12},
                {'size': '36', 'price_modifier': 0, 'stock': 10},
                {'size': '38', 'price_modifier': 0, 'stock': 6},
                {'size': '40', 'price_modifier': 0, 'stock': 4}
            ]),
            'material': '100% Cotton',
            'dimensions': json.dumps({'inseam': 32, 'rise': 12}),
            'image_url': 'https://lsco.scene7.com/is/image/lsco/005010000-front-pdp?fmt=jpeg&qlt=70,1&op_sharpen=0&resMode=sharp2&op_usm=0.8,1,10,0&fit=crop,0&wid=750&hei=1000'
        },
        {
            'name': 'Sony WH-1000XM4 Headphones',
            'category': 'Electronics',
            'price': 279.00,
            'description': 'Industry-leading noise canceling headphones with exceptional sound quality and smart features.',
            'emoji': '🎧',
            'brand': 'Sony',
            'rating': 4.8,
            'stock_quantity': 25,
            'ar_enabled': True,
            'tags': json.dumps(['headphones', 'audio', 'sony', 'noise-canceling']),
            'mood_category': 'productive',
            'images': json.dumps([
                'https://sony.scene7.com/is/image/sonyglobalsolutions/wh-1000xm4_Primary_image?$categorypdpnav$&fmt=jpeg',
                'https://sony.scene7.com/is/image/sonyglobalsolutions/wh-1000xm4_B_Black_3?$categorypdpnav$&fmt=jpeg'
            ]),
            'colors': json.dumps([
                {'name': 'Black', 'hex': '#000000', 'price_modifier': 0},
                {'name': 'Silver', 'hex': '#C0C0C0', 'price_modifier': 0},
                {'name': 'Blue', 'hex': '#0000FF', 'price_modifier': 20},
                {'name': 'White', 'hex': '#FFFFFF', 'price_modifier': 20}
            ]),
            'sizes': json.dumps([
                {'size': 'Standard', 'price_modifier': 0, 'stock': 25}
            ]),
            'material': 'Synthetic Leather/Plastic',
            'dimensions': json.dumps({'width': 254, 'height': 193, 'depth': 76}),
            'image_url': 'https://sony.scene7.com/is/image/sonyglobalsolutions/wh-1000xm4_Primary_image?$categorypdpnav$&fmt=jpeg'
        }
    ]
    
    # Insert products
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
    
    print("✅ AR-enabled products created successfully!")
    print(f"📦 Added {len(ar_products)} products with color and size variations")
    print("🎨 Each product includes multiple color options")
    print("📏 Each product includes multiple size options")
    print("🥽 All products are AR-enabled for immersive shopping")

if __name__ == "__main__":
    create_ar_products()
