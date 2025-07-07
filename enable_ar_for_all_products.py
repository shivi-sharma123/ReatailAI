#!/usr/bin/env python3
"""
Enable AR for All Products Script
This script ensures all products in the database have AR capability
"""

import sqlite3
import json
import sys

def enable_ar_for_all_products():
    """Enable AR functionality for all products in the database"""
    try:
        # Connect to database
        conn = sqlite3.connect('client/server/retailflow.db')
        cursor = conn.cursor()
        
        print("🔍 Fetching all products...")
        cursor.execute("SELECT id, name, colors, sizes, ar_enabled FROM products")
        products = cursor.fetchall()
        
        print(f"📦 Found {len(products)} products")
        
        updated_count = 0
        for product in products:
            product_id, name, colors_str, sizes_str, ar_enabled = product
            
            # Parse existing colors and sizes
            try:
                colors = json.loads(colors_str) if colors_str else []
            except:
                colors = []
            
            try:
                sizes = json.loads(sizes_str) if sizes_str else []
            except:
                sizes = []
            
            # Ensure at least default colors if none exist
            if not colors:
                colors = [
                    {'name': 'Original', 'hex': '#333333', 'price_modifier': 0},
                    {'name': 'Dark', 'hex': '#1a1a1a', 'price_modifier': 5},
                    {'name': 'Blue', 'hex': '#2196F3', 'price_modifier': 10}
                ]
            
            # Ensure at least default sizes if none exist
            if not sizes:
                sizes = [
                    {'size': 'Regular', 'price_modifier': 0},
                    {'size': 'Large', 'price_modifier': 15}
                ]
            
            # Update product with AR enabled and proper colors/sizes
            cursor.execute("""
                UPDATE products 
                SET ar_enabled = 1, 
                    colors = ?, 
                    sizes = ?
                WHERE id = ?
            """, (json.dumps(colors), json.dumps(sizes), product_id))
            
            updated_count += 1
            print(f"✅ Enabled AR for: {name}")
        
        conn.commit()
        print(f"\n🎉 Successfully enabled AR for {updated_count} products!")
        
        # Verify the changes
        cursor.execute("SELECT COUNT(*) FROM products WHERE ar_enabled = 1")
        ar_enabled_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM products")
        total_count = cursor.fetchone()[0]
        
        print(f"📊 AR Status: {ar_enabled_count}/{total_count} products are now AR-enabled")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False
    finally:
        if conn:
            conn.close()
    
    return True

def add_enhanced_ar_products():
    """Add some enhanced demo products specifically for AR testing"""
    try:
        conn = sqlite3.connect('client/server/retailflow.db')
        cursor = conn.cursor()
        
        ar_demo_products = [
            {
                'name': 'AR Demo Smart Watch Pro',
                'category': 'Electronics',
                'mood_category': 'professional',
                'price': 399.99,
                'description': 'Premium smart watch with advanced AR try-on experience',
                'emoji': '⌚',
                'image_url': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
                'brand': 'TechFlow',
                'rating': 4.8,
                'tags': 'smart, fitness, professional, AR-ready',
                'is_trending': True,
                'stock_quantity': 50,
                'ar_enabled': True,
                'colors': json.dumps([
                    {'name': 'Space Gray', 'hex': '#4a5568', 'price_modifier': 0},
                    {'name': 'Rose Gold', 'hex': '#ed8936', 'price_modifier': 50},
                    {'name': 'Silver', 'hex': '#cbd5e0', 'price_modifier': 25},
                    {'name': 'Ocean Blue', 'hex': '#2b6cb0', 'price_modifier': 30}
                ]),
                'sizes': json.dumps([
                    {'size': '38mm', 'price_modifier': 0},
                    {'size': '42mm', 'price_modifier': 50},
                    {'size': '45mm', 'price_modifier': 100}
                ]),
                'material': 'Aluminum with Sport Band',
                'dimensions': '45mm x 38mm x 10.7mm'
            },
            {
                'name': 'AR Fashion Sneakers',
                'category': 'Shoes',
                'mood_category': 'energetic',
                'price': 159.99,
                'description': 'Revolutionary sneakers with perfect AR color changing technology',
                'emoji': '👟',
                'image_url': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
                'brand': 'AR Sport',
                'rating': 4.7,
                'tags': 'fashion, sport, AR-enabled, colorful',
                'is_trending': True,
                'stock_quantity': 75,
                'ar_enabled': True,
                'colors': json.dumps([
                    {'name': 'Classic White', 'hex': '#ffffff', 'price_modifier': 0},
                    {'name': 'Electric Blue', 'hex': '#0099ff', 'price_modifier': 15},
                    {'name': 'Neon Green', 'hex': '#39ff14', 'price_modifier': 20},
                    {'name': 'Fire Red', 'hex': '#ff3333', 'price_modifier': 15},
                    {'name': 'Sunset Orange', 'hex': '#ff6600', 'price_modifier': 18}
                ]),
                'sizes': json.dumps([
                    {'size': 'US 7', 'price_modifier': 0},
                    {'size': 'US 8', 'price_modifier': 0},
                    {'size': 'US 9', 'price_modifier': 0},
                    {'size': 'US 10', 'price_modifier': 0},
                    {'size': 'US 11', 'price_modifier': 5},
                    {'size': 'US 12', 'price_modifier': 10}
                ]),
                'material': 'Premium Mesh and Synthetic',
                'dimensions': 'Standard Athletic Fit'
            }
        ]
        
        print("🎯 Adding enhanced AR demo products...")
        
        for product in ar_demo_products:
            try:
                cursor.execute("""
                    INSERT INTO products (
                        name, category, mood_category, price, description, emoji, 
                        image_url, brand, rating, tags, is_trending, stock_quantity, 
                        ar_enabled, colors, sizes, material, dimensions
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    product['name'], product['category'], product['mood_category'],
                    product['price'], product['description'], product['emoji'],
                    product['image_url'], product['brand'], product['rating'],
                    product['tags'], product['is_trending'], product['stock_quantity'],
                    product['ar_enabled'], product['colors'], product['sizes'],
                    product['material'], product['dimensions']
                ))
                print(f"✨ Added: {product['name']}")
            except sqlite3.IntegrityError:
                print(f"⚠️  Product already exists: {product['name']}")
        
        conn.commit()
        print("🎉 Enhanced AR products added successfully!")
        
    except Exception as e:
        print(f"❌ Error adding AR products: {e}")
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    print("🚀 Starting AR Enhancement for All Products...")
    print("=" * 50)
    
    # Enable AR for all existing products
    if enable_ar_for_all_products():
        print("\n🎯 Adding enhanced AR demo products...")
        add_enhanced_ar_products()
        
        print("\n" + "=" * 50)
        print("🎉 ALL PRODUCTS ARE NOW AR-ENABLED! 🥽")
        print("✅ Every product in your database now supports AR try-on")
        print("✅ Enhanced color and size options added")
        print("✅ Professional AR demo products included")
        print("🚀 Your RetailFlow AI is ready for the ultimate AR experience!")
    else:
        print("❌ Failed to enable AR for products")
        sys.exit(1)
