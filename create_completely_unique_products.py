#!/usr/bin/env python3
"""
Create Truly Unique Products for RetailFlowAI
This script ensures each category has completely unique and diverse products
"""

import sqlite3
import json
import random

def clear_and_create_unique_products():
    """Clear existing products and create unique ones for each category"""
    
    conn = sqlite3.connect('products.db')
    cursor = conn.cursor()
    
    # First, create the products table if it doesn't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            category TEXT NOT NULL,
            image_url TEXT,
            ar_enabled INTEGER DEFAULT 0,
            colors TEXT,
            sizes TEXT,
            images TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Clear all existing products
    cursor.execute('DELETE FROM products')
    print("🗑️ Cleared all existing products")
    
    # Define unique products for each category
    unique_products = [
        # BAGS CATEGORY - Unique bag styles
        {
            'name': 'Luxury Italian Leather Handbag',
            'description': 'Handcrafted Italian leather handbag with gold hardware and silk lining. Perfect for elegant occasions.',
            'price': 299.99,
            'category': 'bags',
            'image_url': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&crop=center',
            'ar_enabled': 1,
            'colors': json.dumps([
                {'name': 'Classic Black', 'hex': '#000000', 'price_modifier': 0, 'stock': 20},
                {'name': 'Rich Brown', 'hex': '#8b4513', 'price_modifier': 15, 'stock': 15},
                {'name': 'Burgundy Red', 'hex': '#800020', 'price_modifier': 25, 'stock': 10},
                {'name': 'Navy Blue', 'hex': '#000080', 'price_modifier': 20, 'stock': 5}
            ]),
            'sizes': json.dumps([
                {'name': 'Small', 'price_modifier': -30, 'stock': 15, 'measurements': '25cm x 20cm'},
                {'name': 'Medium', 'price_modifier': 0, 'stock': 20, 'measurements': '30cm x 25cm'},
                {'name': 'Large', 'price_modifier': 50, 'stock': 15, 'measurements': '35cm x 30cm'}
            ]),
            'images': json.dumps([
                'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&crop=center',
                'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop&crop=center'
            ])
        },
        {
            'name': 'Adventure Canvas Backpack',
            'description': 'Durable canvas backpack with multiple compartments, perfect for hiking and outdoor adventures.',
            'price': 89.99,
            'category': 'bags',
            'image_url': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&crop=center',
            'ar_enabled': 1,
            'colors': json.dumps([
                {'name': 'Forest Green', 'hex': '#228b22', 'price_modifier': 0, 'stock': 30},
                {'name': 'Navy Blue', 'hex': '#000080', 'price_modifier': 0, 'stock': 25},
                {'name': 'Charcoal Gray', 'hex': '#36454f', 'price_modifier': 5, 'stock': 25},
                {'name': 'Burgundy', 'hex': '#800020', 'price_modifier': 10, 'stock': 20}
            ]),
            'sizes': json.dumps([
                {'name': '20L', 'price_modifier': -10, 'stock': 30, 'measurements': '20 Liter capacity'},
                {'name': '30L', 'price_modifier': 0, 'stock': 50, 'measurements': '30 Liter capacity'},
                {'name': '40L', 'price_modifier': 20, 'stock': 20, 'measurements': '40 Liter capacity'}
            ]),
            'images': json.dumps([
                'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&crop=center',
                'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&h=500&fit=crop&crop=center'
            ])
        },
        {
            'name': 'Designer Clutch Evening Bag',
            'description': 'Elegant beaded clutch with chain strap, perfect for formal events and evening occasions.',
            'price': 159.99,
            'category': 'bags',
            'image_url': 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&h=500&fit=crop&crop=center',
            'ar_enabled': 1,
            'colors': json.dumps([
                {'name': 'Metallic Gold', 'hex': '#ffd700', 'price_modifier': 20, 'stock': 15},
                {'name': 'Silver', 'hex': '#c0c0c0', 'price_modifier': 15, 'stock': 18},
                {'name': 'Rose Gold', 'hex': '#e8b4a0', 'price_modifier': 25, 'stock': 12},
                {'name': 'Black Pearl', 'hex': '#1c1c1c', 'price_modifier': 0, 'stock': 20}
            ]),
            'sizes': json.dumps([
                {'name': 'Mini', 'price_modifier': -20, 'stock': 15, 'measurements': '15cm x 10cm'},
                {'name': 'Standard', 'price_modifier': 0, 'stock': 25, 'measurements': '20cm x 12cm'}
            ]),
            'images': json.dumps([
                'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&h=500&fit=crop&crop=center'
            ])
        },
        
        # HEELS CATEGORY - Unique heel styles
        {
            'name': 'Classic Stiletto Heels',
            'description': 'Elegant pointed-toe stiletto heels with premium leather finish and comfortable padding.',
            'price': 199.99,
            'category': 'heels',
            'image_url': 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=500&fit=crop&crop=center',
            'ar_enabled': 1,
            'colors': json.dumps([
                {'name': 'Classic Black', 'hex': '#000000', 'price_modifier': 0, 'stock': 25},
                {'name': 'Ruby Red', 'hex': '#e0115f', 'price_modifier': 20, 'stock': 20},
                {'name': 'Nude Beige', 'hex': '#f5deb3', 'price_modifier': 15, 'stock': 15},
                {'name': 'Metallic Gold', 'hex': '#ffd700', 'price_modifier': 30, 'stock': 15}
            ]),
            'sizes': json.dumps([
                {'name': 'Size 5', 'price_modifier': 0, 'stock': 10, 'measurements': 'US Size 5'},
                {'name': 'Size 6', 'price_modifier': 0, 'stock': 15, 'measurements': 'US Size 6'},
                {'name': 'Size 7', 'price_modifier': 0, 'stock': 20, 'measurements': 'US Size 7'},
                {'name': 'Size 8', 'price_modifier': 0, 'stock': 15, 'measurements': 'US Size 8'},
                {'name': 'Size 9', 'price_modifier': 0, 'stock': 15, 'measurements': 'US Size 9'}
            ]),
            'images': json.dumps([
                'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=500&fit=crop&crop=center',
                'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=500&h=500&fit=crop&crop=center'
            ])
        },
        {
            'name': 'Chunky Platform Boots',
            'description': 'Trendy platform ankle boots with chunky heels and side zipper for easy wear.',
            'price': 149.99,
            'category': 'heels',
            'image_url': 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=500&h=500&fit=crop&crop=center',
            'ar_enabled': 1,
            'colors': json.dumps([
                {'name': 'Matte Black', 'hex': '#2c2c2c', 'price_modifier': 0, 'stock': 30},
                {'name': 'Tan Brown', 'hex': '#d2691e', 'price_modifier': 10, 'stock': 25},
                {'name': 'White Leather', 'hex': '#ffffff', 'price_modifier': 15, 'stock': 20}
            ]),
            'sizes': json.dumps([
                {'name': 'Size 6', 'price_modifier': 0, 'stock': 12, 'measurements': 'US Size 6'},
                {'name': 'Size 7', 'price_modifier': 0, 'stock': 18, 'measurements': 'US Size 7'},
                {'name': 'Size 8', 'price_modifier': 0, 'stock': 20, 'measurements': 'US Size 8'},
                {'name': 'Size 9', 'price_modifier': 0, 'stock': 15, 'measurements': 'US Size 9'},
                {'name': 'Size 10', 'price_modifier': 0, 'stock': 10, 'measurements': 'US Size 10'}
            ]),
            'images': json.dumps([
                'https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=500&h=500&fit=crop&crop=center'
            ])
        },
        {
            'name': 'Strappy Sandal Heels',
            'description': 'Elegant strappy sandals with moderate heels, perfect for summer events and parties.',
            'price': 129.99,
            'category': 'heels',
            'image_url': 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=500&h=500&fit=crop&crop=center',
            'ar_enabled': 1,
            'colors': json.dumps([
                {'name': 'Rose Gold', 'hex': '#e8b4a0', 'price_modifier': 20, 'stock': 15},
                {'name': 'Silver Metallic', 'hex': '#c0c0c0', 'price_modifier': 15, 'stock': 18},
                {'name': 'Coral Pink', 'hex': '#ff7f50', 'price_modifier': 10, 'stock': 20},
                {'name': 'Champagne', 'hex': '#f7e7ce', 'price_modifier': 25, 'stock': 12}
            ]),
            'sizes': json.dumps([
                {'name': 'Size 5', 'price_modifier': 0, 'stock': 8, 'measurements': 'US Size 5'},
                {'name': 'Size 6', 'price_modifier': 0, 'stock': 12, 'measurements': 'US Size 6'},
                {'name': 'Size 7', 'price_modifier': 0, 'stock': 15, 'measurements': 'US Size 7'},
                {'name': 'Size 8', 'price_modifier': 0, 'stock': 15, 'measurements': 'US Size 8'},
                {'name': 'Size 9', 'price_modifier': 0, 'stock': 10, 'measurements': 'US Size 9'}
            ]),
            'images': json.dumps([
                'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=500&h=500&fit=crop&crop=center'
            ])
        },
        
        # DRESSES CATEGORY - Unique dress styles
        {
            'name': 'Elegant Evening Gown',
            'description': 'Flowing chiffon evening gown with beaded bodice and flowing skirt, perfect for formal events.',
            'price': 349.99,
            'category': 'dresses',
            'image_url': 'https://images.unsplash.com/photo-1566479179817-0ff66f63678c?w=500&h=500&fit=crop&crop=center',
            'ar_enabled': 1,
            'colors': json.dumps([
                {'name': 'Midnight Blue', 'hex': '#191970', 'price_modifier': 0, 'stock': 15},
                {'name': 'Emerald Green', 'hex': '#50c878', 'price_modifier': 25, 'stock': 10},
                {'name': 'Burgundy Wine', 'hex': '#722f37', 'price_modifier': 20, 'stock': 12},
                {'name': 'Classic Black', 'hex': '#000000', 'price_modifier': 15, 'stock': 18}
            ]),
            'sizes': json.dumps([
                {'name': 'XS', 'price_modifier': 0, 'stock': 8, 'measurements': 'Bust: 32", Waist: 24", Hips: 34"'},
                {'name': 'S', 'price_modifier': 0, 'stock': 12, 'measurements': 'Bust: 34", Waist: 26", Hips: 36"'},
                {'name': 'M', 'price_modifier': 0, 'stock': 15, 'measurements': 'Bust: 36", Waist: 28", Hips: 38"'},
                {'name': 'L', 'price_modifier': 0, 'stock': 12, 'measurements': 'Bust: 38", Waist: 30", Hips: 40"'},
                {'name': 'XL', 'price_modifier': 0, 'stock': 8, 'measurements': 'Bust: 40", Waist: 32", Hips: 42"'}
            ]),
            'images': json.dumps([
                'https://images.unsplash.com/photo-1566479179817-0ff66f63678c?w=500&h=500&fit=crop&crop=center',
                'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=500&fit=crop&crop=center'
            ])
        },
        {
            'name': 'Casual Summer Sundress',
            'description': 'Light and breezy cotton sundress with floral print, perfect for casual summer days.',
            'price': 79.99,
            'category': 'dresses',
            'image_url': 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=500&fit=crop&crop=center',
            'ar_enabled': 1,
            'colors': json.dumps([
                {'name': 'Floral Blue', 'hex': '#4169e1', 'price_modifier': 0, 'stock': 25},
                {'name': 'Sunny Yellow', 'hex': '#ffff00', 'price_modifier': 5, 'stock': 20},
                {'name': 'Rose Pink', 'hex': '#ff69b4', 'price_modifier': 5, 'stock': 22},
                {'name': 'Lavender Purple', 'hex': '#e6e6fa', 'price_modifier': 10, 'stock': 18}
            ]),
            'sizes': json.dumps([
                {'name': 'XS', 'price_modifier': 0, 'stock': 15, 'measurements': 'Bust: 32", Length: 36"'},
                {'name': 'S', 'price_modifier': 0, 'stock': 20, 'measurements': 'Bust: 34", Length: 37"'},
                {'name': 'M', 'price_modifier': 0, 'stock': 25, 'measurements': 'Bust: 36", Length: 38"'},
                {'name': 'L', 'price_modifier': 0, 'stock': 20, 'measurements': 'Bust: 38", Length: 39"'},
                {'name': 'XL', 'price_modifier': 0, 'stock': 15, 'measurements': 'Bust: 40", Length: 40"'}
            ]),
            'images': json.dumps([
                'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=500&fit=crop&crop=center'
            ])
        },
        {
            'name': 'Professional Business Dress',
            'description': 'Sophisticated knee-length dress with structured silhouette, perfect for office and business meetings.',
            'price': 159.99,
            'category': 'dresses',
            'image_url': 'https://images.unsplash.com/photo-1551048632-1d4b0e3b7e3b?w=500&h=500&fit=crop&crop=center',
            'ar_enabled': 1,
            'colors': json.dumps([
                {'name': 'Navy Blue', 'hex': '#000080', 'price_modifier': 0, 'stock': 20},
                {'name': 'Charcoal Gray', 'hex': '#36454f', 'price_modifier': 5, 'stock': 18},
                {'name': 'Deep Purple', 'hex': '#483d8b', 'price_modifier': 10, 'stock': 15},
                {'name': 'Classic Black', 'hex': '#000000', 'price_modifier': 0, 'stock': 22}
            ]),
            'sizes': json.dumps([
                {'name': 'XS', 'price_modifier': 0, 'stock': 10, 'measurements': 'Bust: 32", Waist: 25", Length: 35"'},
                {'name': 'S', 'price_modifier': 0, 'stock': 15, 'measurements': 'Bust: 34", Waist: 27", Length: 36"'},
                {'name': 'M', 'price_modifier': 0, 'stock': 20, 'measurements': 'Bust: 36", Waist: 29", Length: 37"'},
                {'name': 'L', 'price_modifier': 0, 'stock': 15, 'measurements': 'Bust: 38", Waist: 31", Length: 38"'},
                {'name': 'XL', 'price_modifier': 0, 'stock': 10, 'measurements': 'Bust: 40", Waist: 33", Length: 39"'}
            ]),
            'images': json.dumps([
                'https://images.unsplash.com/photo-1551048632-1d4b0e3b7e3b?w=500&h=500&fit=crop&crop=center'
            ])
        },
        
        # JEANS CATEGORY - Unique jean styles
        {
            'name': 'Classic Straight-Leg Jeans',
            'description': 'Timeless straight-leg jeans with premium denim and comfortable fit for everyday wear.',
            'price': 89.99,
            'category': 'jeans',
            'image_url': 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=500&fit=crop&crop=center',
            'ar_enabled': 1,
            'colors': json.dumps([
                {'name': 'Classic Blue', 'hex': '#4169e1', 'price_modifier': 0, 'stock': 30},
                {'name': 'Dark Indigo', 'hex': '#2e003e', 'price_modifier': 10, 'stock': 25},
                {'name': 'Light Wash', 'hex': '#87ceeb', 'price_modifier': 5, 'stock': 28},
                {'name': 'Black Denim', 'hex': '#36454f', 'price_modifier': 15, 'stock': 22}
            ]),
            'sizes': json.dumps([
                {'name': 'Size 26', 'price_modifier': 0, 'stock': 15, 'measurements': 'Waist: 26", Inseam: 30"'},
                {'name': 'Size 28', 'price_modifier': 0, 'stock': 20, 'measurements': 'Waist: 28", Inseam: 30"'},
                {'name': 'Size 30', 'price_modifier': 0, 'stock': 25, 'measurements': 'Waist: 30", Inseam: 32"'},
                {'name': 'Size 32', 'price_modifier': 0, 'stock': 20, 'measurements': 'Waist: 32", Inseam: 32"'},
                {'name': 'Size 34', 'price_modifier': 0, 'stock': 15, 'measurements': 'Waist: 34", Inseam: 34"'}
            ]),
            'images': json.dumps([
                'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=500&fit=crop&crop=center',
                'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=500&h=500&fit=crop&crop=center'
            ])
        },
        {
            'name': 'High-Waisted Skinny Jeans',
            'description': 'Modern high-waisted skinny jeans with stretch fabric for comfort and style.',
            'price': 99.99,
            'category': 'jeans',
            'image_url': 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop&crop=center',
            'ar_enabled': 1,
            'colors': json.dumps([
                {'name': 'Deep Blue', 'hex': '#000080', 'price_modifier': 0, 'stock': 28},
                {'name': 'Jet Black', 'hex': '#343434', 'price_modifier': 10, 'stock': 25},
                {'name': 'Vintage Wash', 'hex': '#6495ed', 'price_modifier': 5, 'stock': 20},
                {'name': 'Gray Denim', 'hex': '#708090', 'price_modifier': 8, 'stock': 22}
            ]),
            'sizes': json.dumps([
                {'name': 'Size 24', 'price_modifier': 0, 'stock': 12, 'measurements': 'Waist: 24", Hip: 34", Inseam: 28"'},
                {'name': 'Size 26', 'price_modifier': 0, 'stock': 18, 'measurements': 'Waist: 26", Hip: 36", Inseam: 30"'},
                {'name': 'Size 28', 'price_modifier': 0, 'stock': 22, 'measurements': 'Waist: 28", Hip: 38", Inseam: 30"'},
                {'name': 'Size 30', 'price_modifier': 0, 'stock': 18, 'measurements': 'Waist: 30", Hip: 40", Inseam: 32"'},
                {'name': 'Size 32', 'price_modifier': 0, 'stock': 12, 'measurements': 'Waist: 32", Hip: 42", Inseam: 32"'}
            ]),
            'images': json.dumps([
                'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop&crop=center'
            ])
        },
        {
            'name': 'Distressed Boyfriend Jeans',
            'description': 'Relaxed-fit boyfriend jeans with trendy distressed details and comfortable loose fit.',
            'price': 119.99,
            'category': 'jeans',
            'image_url': 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=500&h=500&fit=crop&crop=center',
            'ar_enabled': 1,
            'colors': json.dumps([
                {'name': 'Light Blue Distressed', 'hex': '#add8e6', 'price_modifier': 0, 'stock': 20},
                {'name': 'Medium Wash', 'hex': '#4682b4', 'price_modifier': 5, 'stock': 18},
                {'name': 'Dark Distressed', 'hex': '#2f4f4f', 'price_modifier': 10, 'stock': 15}
            ]),
            'sizes': json.dumps([
                {'name': 'Size 25', 'price_modifier': 0, 'stock': 10, 'measurements': 'Waist: 25", Hip: 36", Inseam: 28"'},
                {'name': 'Size 27', 'price_modifier': 0, 'stock': 15, 'measurements': 'Waist: 27", Hip: 38", Inseam: 30"'},
                {'name': 'Size 29', 'price_modifier': 0, 'stock': 18, 'measurements': 'Waist: 29", Hip: 40", Inseam: 30"'},
                {'name': 'Size 31', 'price_modifier': 0, 'stock': 15, 'measurements': 'Waist: 31", Hip: 42", Inseam: 32"'},
                {'name': 'Size 33', 'price_modifier': 0, 'stock': 10, 'measurements': 'Waist: 33", Hip: 44", Inseam: 32"'}
            ]),
            'images': json.dumps([
                'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=500&h=500&fit=crop&crop=center'
            ])
        },
        
        # KITCHEN CATEGORY - Unique kitchen products
        {
            'name': 'Professional Chef Knife Set',
            'description': 'Premium stainless steel knife set with ergonomic handles and wooden block storage.',
            'price': 249.99,
            'category': 'kitchen',
            'image_url': 'https://images.unsplash.com/photo-1593618998160-e34014f6df3c?w=500&h=500&fit=crop&crop=center',
            'ar_enabled': 1,
            'colors': json.dumps([
                {'name': 'Stainless Steel', 'hex': '#c0c0c0', 'price_modifier': 0, 'stock': 25},
                {'name': 'Black Handle', 'hex': '#2c2c2c', 'price_modifier': 20, 'stock': 20},
                {'name': 'Bamboo Handle', 'hex': '#daa520', 'price_modifier': 30, 'stock': 15}
            ]),
            'sizes': json.dumps([
                {'name': '5-Piece Set', 'price_modifier': -50, 'stock': 20, 'measurements': '5 Essential Knives'},
                {'name': '8-Piece Set', 'price_modifier': 0, 'stock': 30, 'measurements': '8 Professional Knives'},
                {'name': '12-Piece Set', 'price_modifier': 80, 'stock': 15, 'measurements': '12 Complete Set'}
            ]),
            'images': json.dumps([
                'https://images.unsplash.com/photo-1593618998160-e34014f6df3c?w=500&h=500&fit=crop&crop=center'
            ])
        },
        {
            'name': 'Smart Air Fryer Deluxe',
            'description': 'WiFi-enabled air fryer with digital touchscreen and pre-programmed cooking modes.',
            'price': 199.99,
            'category': 'kitchen',
            'image_url': 'https://images.unsplash.com/photo-1585515656788-1ca94e9dbd93?w=500&h=500&fit=crop&crop=center',
            'ar_enabled': 1,
            'colors': json.dumps([
                {'name': 'Sleek Black', 'hex': '#1c1c1c', 'price_modifier': 0, 'stock': 30},
                {'name': 'Stainless Steel', 'hex': '#c0c0c0', 'price_modifier': 25, 'stock': 25},
                {'name': 'Rose Gold', 'hex': '#e8b4a0', 'price_modifier': 40, 'stock': 15}
            ]),
            'sizes': json.dumps([
                {'name': '3.5L Compact', 'price_modifier': -30, 'stock': 20, 'measurements': '3.5 Liter capacity'},
                {'name': '5.8L Standard', 'price_modifier': 0, 'stock': 35, 'measurements': '5.8 Liter capacity'},
                {'name': '8L Family Size', 'price_modifier': 50, 'stock': 15, 'measurements': '8 Liter capacity'}
            ]),
            'images': json.dumps([
                'https://images.unsplash.com/photo-1585515656788-1ca94e9dbd93?w=500&h=500&fit=crop&crop=center'
            ])
        },
        {
            'name': 'Espresso Coffee Machine',
            'description': 'Professional-grade espresso machine with milk frother and pressure gauge.',
            'price': 399.99,
            'category': 'kitchen',
            'image_url': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop&crop=center',
            'ar_enabled': 1,
            'colors': json.dumps([
                {'name': 'Chrome Silver', 'hex': '#c0c0c0', 'price_modifier': 0, 'stock': 20},
                {'name': 'Matte Black', 'hex': '#2c2c2c', 'price_modifier': 30, 'stock': 18},
                {'name': 'Copper Bronze', 'hex': '#cd7f32', 'price_modifier': 50, 'stock': 12}
            ]),
            'sizes': json.dumps([
                {'name': 'Compact', 'price_modifier': -60, 'stock': 15, 'measurements': 'Single shot, countertop'},
                {'name': 'Standard', 'price_modifier': 0, 'stock': 25, 'measurements': 'Double shot, full features'},
                {'name': 'Commercial', 'price_modifier': 120, 'stock': 10, 'measurements': 'Professional grade'}
            ]),
            'images': json.dumps([
                'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop&crop=center'
            ])
        },
        
        # ELECTRONICS CATEGORY - Unique electronic products
        {
            'name': 'Premium Wireless Headphones',
            'description': 'Active noise cancellation wireless headphones with 30-hour battery life and premium sound quality.',
            'price': 299.99,
            'category': 'electronics',
            'image_url': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&crop=center',
            'ar_enabled': 1,
            'colors': json.dumps([
                {'name': 'Midnight Black', 'hex': '#000000', 'price_modifier': 0, 'stock': 30},
                {'name': 'Silver Metallic', 'hex': '#c0c0c0', 'price_modifier': 10, 'stock': 25},
                {'name': 'Rose Gold', 'hex': '#e8b4a0', 'price_modifier': 25, 'stock': 20},
                {'name': 'Navy Blue', 'hex': '#000080', 'price_modifier': 15, 'stock': 22}
            ]),
            'sizes': json.dumps([
                {'name': 'Standard', 'price_modifier': 0, 'stock': 50, 'measurements': 'Universal fit'},
                {'name': 'Large Cushions', 'price_modifier': 20, 'stock': 30, 'measurements': 'Extra comfort padding'}
            ]),
            'images': json.dumps([
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&crop=center',
                'https://images.unsplash.com/photo-1583394838974-17ba410ac8d6?w=500&h=500&fit=crop&crop=center'
            ])
        },
        {
            'name': 'Smart Fitness Watch',
            'description': 'Advanced fitness tracking smartwatch with heart rate monitor, GPS, and 7-day battery life.',
            'price': 249.99,
            'category': 'electronics',
            'image_url': 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&h=500&fit=crop&crop=center',
            'ar_enabled': 1,
            'colors': json.dumps([
                {'name': 'Space Black', 'hex': '#1c1c1c', 'price_modifier': 0, 'stock': 25},
                {'name': 'Silver Aluminum', 'hex': '#c0c0c0', 'price_modifier': 0, 'stock': 30},
                {'name': 'Gold Edition', 'hex': '#ffd700', 'price_modifier': 50, 'stock': 15},
                {'name': 'Rose Gold', 'hex': '#e8b4a0', 'price_modifier': 30, 'stock': 20}
            ]),
            'sizes': json.dumps([
                {'name': '38mm', 'price_modifier': -20, 'stock': 20, 'measurements': '38mm case size'},
                {'name': '42mm', 'price_modifier': 0, 'stock': 35, 'measurements': '42mm case size'},
                {'name': '46mm', 'price_modifier': 25, 'stock': 15, 'measurements': '46mm case size'}
            ]),
            'images': json.dumps([
                'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&h=500&fit=crop&crop=center',
                'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&h=500&fit=crop&crop=center'
            ])
        },
        {
            'name': 'Gaming Mechanical Keyboard',
            'description': 'RGB backlit mechanical gaming keyboard with customizable keys and ultra-responsive switches.',
            'price': 159.99,
            'category': 'electronics',
            'image_url': 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop&crop=center',
            'ar_enabled': 1,
            'colors': json.dumps([
                {'name': 'RGB Black', 'hex': '#000000', 'price_modifier': 0, 'stock': 40},
                {'name': 'White Edition', 'hex': '#ffffff', 'price_modifier': 20, 'stock': 30},
                {'name': 'Gaming Red', 'hex': '#ff0000', 'price_modifier': 15, 'stock': 25}
            ]),
            'sizes': json.dumps([
                {'name': 'Compact 60%', 'price_modifier': -30, 'stock': 20, 'measurements': '60% layout, compact'},
                {'name': 'Standard Full', 'price_modifier': 0, 'stock': 35, 'measurements': 'Full size with numpad'},
                {'name': 'Extended', 'price_modifier': 40, 'stock': 15, 'measurements': 'Extra macro keys'}
            ]),
            'images': json.dumps([
                'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop&crop=center'
            ])
        }
    ]
    
    # Insert all unique products
    for product in unique_products:
        cursor.execute('''
            INSERT INTO products (name, description, price, category, image_url, ar_enabled, colors, sizes, images)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            product['name'],
            product['description'],
            product['price'],
            product['category'],
            product['image_url'],
            product['ar_enabled'],
            product['colors'],
            product['sizes'],
            product['images']
        ))
    
    conn.commit()
    
    # Verify products were created
    cursor.execute('SELECT COUNT(*) FROM products')
    total_products = cursor.fetchone()[0]
    
    print(f"\n✅ Successfully created {total_products} unique products!")
    
    # Show products by category
    cursor.execute('SELECT category, COUNT(*) FROM products GROUP BY category ORDER BY category')
    categories = cursor.fetchall()
    
    print("\n📊 Products by Category:")
    for category, count in categories:
        print(f"  🏷️ {category.upper()}: {count} unique products")
    
    # Show sample of each category
    print("\n🛍️ Sample Products from Each Category:")
    for category, _ in categories:
        cursor.execute('SELECT name FROM products WHERE category = ? LIMIT 2', (category,))
        products = cursor.fetchall()
        print(f"\n📁 {category.upper()}:")
        for product in products:
            print(f"  ✨ {product[0]}")
    
    conn.close()
    print("\n🎉 Database now has completely unique and diverse products!")
    print("🔄 Please refresh your browser to see the new products!")

if __name__ == "__main__":
    clear_and_create_unique_products()
