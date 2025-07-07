#!/usr/bin/env python3
"""
Add fashion products with extensive color options to the RetailFlowAI database
"""

import sqlite3
import json

def add_fashion_products():
    # Connect to database
    conn = sqlite3.connect('retailflow.db')
    cursor = conn.cursor()
    
    # Fashion products with 12+ colors each
    fashion_products = [
        {
            'name': 'Elegant Summer Dress',
            'description': 'Beautiful flowy summer dress perfect for any occasion',
            'price': 79.99,
            'category': 'Women',
            'brand': 'StyleFlow',
            'mood': 'Happy',
            'color': 'Multiple',
            'size': 'S,M,L,XL',
            'ar_enabled': 1,
            'image_url': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'images': json.dumps([
                'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1585487000143-66b1526f2833?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]),
            'colors': json.dumps([
                'Rose Pink', 'Sky Blue', 'Emerald Green', 'Sunset Orange', 
                'Lavender Purple', 'Coral Red', 'Midnight Blue', 'Cream White',
                'Burgundy Wine', 'Forest Green', 'Golden Yellow', 'Charcoal Gray'
            ])
        },
        {
            'name': 'Designer Casual T-Shirt',
            'description': 'Premium cotton t-shirt with modern fit and style',
            'price': 39.99,
            'category': 'Men',
            'brand': 'UrbanStyle',
            'mood': 'Confident',
            'color': 'Multiple',
            'size': 'XS,S,M,L,XL,XXL',
            'ar_enabled': 1,
            'image_url': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'images': json.dumps([
                'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1583743814966-8936f37f4ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]),
            'colors': json.dumps([
                'Classic Black', 'Pure White', 'Navy Blue', 'Heather Gray',
                'Olive Green', 'Burnt Orange', 'Deep Purple', 'Maroon Red',
                'Steel Blue', 'Khaki Tan', 'Electric Blue', 'Slate Gray'
            ])
        },
        {
            'name': 'Luxury Designer Jacket',
            'description': 'Premium leather jacket with contemporary design',
            'price': 299.99,
            'category': 'Outerwear',
            'brand': 'LuxeFashion',
            'mood': 'Sophisticated',
            'color': 'Multiple',
            'size': 'S,M,L,XL',
            'ar_enabled': 1,
            'image_url': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'images': json.dumps([
                'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1594038796128-ef93cc42b68a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]),
            'colors': json.dumps([
                'Classic Black', 'Rich Brown', 'Cognac Tan', 'Deep Burgundy',
                'Midnight Navy', 'Espresso Brown', 'Charcoal Gray', 'Vintage Tan',
                'Forest Green', 'Wine Red', 'Camel Beige', 'Storm Gray'
            ])
        },
        {
            'name': 'Athletic Performance Hoodie',
            'description': 'High-performance hoodie for active lifestyle with moisture-wicking technology',
            'price': 89.99,
            'category': 'Sportswear',
            'brand': 'FitWear Pro',
            'mood': 'Energetic',
            'color': 'Multiple',
            'size': 'XS,S,M,L,XL,XXL',
            'ar_enabled': 1,
            'image_url': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'images': json.dumps([
                'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]),
            'colors': json.dumps([
                'Electric Blue', 'Neon Green', 'Hot Pink', 'Bright Orange',
                'Purple Power', 'Racing Red', 'Jet Black', 'Arctic White',
                'Solar Yellow', 'Turquoise Blue', 'Lime Green', 'Magenta Pink'
            ])
        }
    ]
    
    # Insert products
    for product in fashion_products:
        try:
            cursor.execute('''
                INSERT INTO products (name, description, price, category, brand, mood, color, size, ar_enabled, image_url, images, colors)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                product['name'],
                product['description'],
                product['price'],
                product['category'],
                product['brand'],
                product['mood'],
                product['color'],
                product['size'],
                product['ar_enabled'],
                product['image_url'],
                product['images'],
                product['colors']
            ))
            print(f"✅ Added: {product['name']} with {len(json.loads(product['colors']))} colors")
        except Exception as e:
            print(f"❌ Error adding {product['name']}: {e}")
    
    conn.commit()
    conn.close()
    print(f"\n🎉 Added {len(fashion_products)} fashion products with extensive color options!")

if __name__ == "__main__":
    add_fashion_products()
