#!/usr/bin/env python3
import sqlite3
import json
from datetime import datetime

def add_enhanced_ar_products():
    """Add high-quality AR-enabled products with enhanced images and color variations"""
    
    # Connect to database
    conn = sqlite3.connect('retailflow.db')
    cursor = conn.cursor()
    
    # Enhanced AR products with clear, high-quality images
    enhanced_products = [
        {
            'name': 'Premium AR Smart Watch Pro',
            'description': 'High-end smartwatch with AR try-on technology. Crystal clear display and premium materials.',
            'price': 399.99,
            'category': 'Electronics',
            'image_url': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'colors': json.dumps([
                {'name': 'Space Gray', 'hex': '#4a4a4a', 'price_modifier': 0},
                {'name': 'Rose Gold', 'hex': '#e8b4a0', 'price_modifier': 50},
                {'name': 'Silver', 'hex': '#c0c0c0', 'price_modifier': 25},
                {'name': 'Midnight Blue', 'hex': '#2c3e50', 'price_modifier': 40},
                {'name': 'Product Red', 'hex': '#ff0000', 'price_modifier': 30}
            ]),
            'sizes': json.dumps([
                {'size': '38mm', 'price_modifier': -20},
                {'size': '42mm', 'price_modifier': 0},
                {'size': '46mm', 'price_modifier': 25}
            ]),
            'ar_enabled': True,
            'is_trending': True,
            'stock_quantity': 50
        },
        {
            'name': 'AR Designer Sunglasses Elite',
            'description': 'Luxury sunglasses with AR virtual try-on. UV protection and polarized lenses.',
            'price': 299.99,
            'category': 'Fashion',
            'image_url': 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'colors': json.dumps([
                {'name': 'Classic Black', 'hex': '#000000', 'price_modifier': 0},
                {'name': 'Tortoise Shell', 'hex': '#8b4513', 'price_modifier': 15},
                {'name': 'Gold Frame', 'hex': '#ffd700', 'price_modifier': 50},
                {'name': 'Silver Frame', 'hex': '#c0c0c0', 'price_modifier': 30},
                {'name': 'Blue Gradient', 'hex': '#1e90ff', 'price_modifier': 25}
            ]),
            'sizes': json.dumps([
                {'size': 'Small', 'price_modifier': -10},
                {'size': 'Medium', 'price_modifier': 0},
                {'size': 'Large', 'price_modifier': 15}
            ]),
            'ar_enabled': True,
            'is_trending': True,
            'stock_quantity': 75
        },
        {
            'name': 'AR Premium Sneakers Collection',
            'description': 'High-performance sneakers with AR sizing technology. Perfect fit guaranteed.',
            'price': 179.99,
            'category': 'Footwear',
            'image_url': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'colors': json.dumps([
                {'name': 'Pure White', 'hex': '#ffffff', 'price_modifier': 0},
                {'name': 'Jet Black', 'hex': '#000000', 'price_modifier': 10},
                {'name': 'Electric Blue', 'hex': '#0066ff', 'price_modifier': 20},
                {'name': 'Neon Green', 'hex': '#00ff00', 'price_modifier': 25},
                {'name': 'Sunset Orange', 'hex': '#ff6600', 'price_modifier': 15}
            ]),
            'sizes': json.dumps([
                {'size': 'US 7', 'price_modifier': 0},
                {'size': 'US 8', 'price_modifier': 0},
                {'size': 'US 9', 'price_modifier': 0},
                {'size': 'US 10', 'price_modifier': 0},
                {'size': 'US 11', 'price_modifier': 5},
                {'size': 'US 12', 'price_modifier': 10}
            ]),
            'ar_enabled': True,
            'is_trending': True,
            'stock_quantity': 100
        },
        {
            'name': 'AR Luxury Handbag Designer',
            'description': 'Premium leather handbag with AR color customization. Handcrafted excellence.',
            'price': 599.99,
            'category': 'Fashion',
            'image_url': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'colors': json.dumps([
                {'name': 'Classic Brown', 'hex': '#8b4513', 'price_modifier': 0},
                {'name': 'Midnight Black', 'hex': '#000000', 'price_modifier': 25},
                {'name': 'Cream White', 'hex': '#f5f5dc', 'price_modifier': 50},
                {'name': 'Royal Blue', 'hex': '#4169e1', 'price_modifier': 75},
                {'name': 'Burgundy Red', 'hex': '#800020', 'price_modifier': 100}
            ]),
            'sizes': json.dumps([
                {'size': 'Small', 'price_modifier': -50},
                {'size': 'Medium', 'price_modifier': 0},
                {'size': 'Large', 'price_modifier': 50}
            ]),
            'ar_enabled': True,
            'is_trending': True,
            'stock_quantity': 30
        },
        {
            'name': 'AR Gaming Headset Pro Max',
            'description': 'Professional gaming headset with AR fitting technology. Premium sound quality.',
            'price': 249.99,
            'category': 'Electronics',
            'image_url': 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'colors': json.dumps([
                {'name': 'Matte Black', 'hex': '#2c2c2c', 'price_modifier': 0},
                {'name': 'Arctic White', 'hex': '#f8f8ff', 'price_modifier': 20},
                {'name': 'Gaming Red', 'hex': '#ff0000', 'price_modifier': 30},
                {'name': 'Cyber Blue', 'hex': '#00ffff', 'price_modifier': 25},
                {'name': 'Neon Green', 'hex': '#39ff14', 'price_modifier': 35}
            ]),
            'sizes': json.dumps([
                {'size': 'Standard', 'price_modifier': 0},
                {'size': 'Large', 'price_modifier': 15}
            ]),
            'ar_enabled': True,
            'is_trending': True,
            'stock_quantity': 60
        },
        {
            'name': 'AR Fashion Cap Collection',
            'description': 'Trendy baseball cap with AR try-on. Adjustable fit and premium materials.',
            'price': 39.99,
            'category': 'Fashion',
            'image_url': 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'colors': json.dumps([
                {'name': 'Classic Navy', 'hex': '#000080', 'price_modifier': 0},
                {'name': 'Pure White', 'hex': '#ffffff', 'price_modifier': 5},
                {'name': 'Charcoal Gray', 'hex': '#36454f', 'price_modifier': 5},
                {'name': 'Forest Green', 'hex': '#228b22', 'price_modifier': 10},
                {'name': 'Crimson Red', 'hex': '#dc143c', 'price_modifier': 10}
            ]),
            'sizes': json.dumps([
                {'size': 'One Size', 'price_modifier': 0}
            ]),
            'ar_enabled': True,
            'is_trending': True,
            'stock_quantity': 120
        }
    ]
    
    print("🚀 Adding enhanced AR products to database...")
    
    for product in enhanced_products:
        try:
            cursor.execute('''
                INSERT INTO products (
                    name, description, price, category, image_url, colors, sizes, 
                    ar_enabled, is_trending, stock_quantity
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                product['name'],
                product['description'],
                product['price'],
                product['category'],
                product['image_url'],
                product['colors'],
                product['sizes'],
                product['ar_enabled'],
                product['is_trending'],
                product['stock_quantity']
            ))
            print(f"✅ Added: {product['name']}")
        except Exception as e:
            print(f"❌ Error adding {product['name']}: {e}")
    
    conn.commit()
    conn.close()
    
    print("\n🎉 Enhanced AR products added successfully!")
    print("📱 All products now have:")
    print("   • High-quality HD images")
    print("   • Advanced color variations")
    print("   • Enhanced AR try-on experience")
    print("   • Crystal clear product visualization")

if __name__ == "__main__":
    add_enhanced_ar_products()
