#!/usr/bin/env python3
"""Simple script to add diverse products with different images"""

import sqlite3
import json

DATABASE = 'retailflow.db'

def init_database():
    """Initialize the database with required tables"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Create products table if it doesn't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            mood_category TEXT NOT NULL,
            price REAL DEFAULT 0.0,
            description TEXT,
            emoji TEXT,
            image_url TEXT,
            brand TEXT,
            rating REAL DEFAULT 0.0,
            tags TEXT,
            is_trending BOOLEAN DEFAULT 0,
            stock_quantity INTEGER DEFAULT 100,
            ar_model_url TEXT,
            ar_preview_url TEXT,
            multiple_images TEXT,
            size_chart TEXT,
            color_variants TEXT,
            ar_enabled BOOLEAN DEFAULT 0,
            three_d_model TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

def clear_products():
    """Clear all existing products"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('DELETE FROM products')
    conn.commit()
    conn.close()

def add_product(product_data):
    """Add a single product to the database"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    try:
        cursor.execute('''
            INSERT INTO products (
                name, category, mood_category, price, description, emoji, 
                image_url, brand, rating, tags, is_trending, stock_quantity,
                ar_model_url, ar_preview_url, multiple_images, size_chart, 
                color_variants, ar_enabled, three_d_model
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            product_data['name'],
            product_data['category'],
            product_data['mood_category'],
            product_data['price'],
            product_data['description'],
            product_data['emoji'],
            product_data['image_url'],
            product_data['brand'],
            product_data['rating'],
            product_data['tags'],
            product_data['is_trending'],
            product_data['stock_quantity'],
            product_data.get('ar_model_url', ''),
            product_data.get('ar_preview_url', ''),
            json.dumps(product_data.get('multiple_images', [])),
            json.dumps(product_data.get('size_chart', {})),
            json.dumps(product_data.get('color_variants', [])),
            product_data.get('ar_enabled', False),
            product_data.get('three_d_model', '')
        ))
        
        conn.commit()
        return True
    except Exception as e:
        print(f"Error adding product: {e}")
        return False
    finally:
        conn.close()

def setup_diverse_products():
    """Setup diverse product catalog with different images"""
    
    print("🔧 Setting up diverse product catalog...")
    init_database()
    clear_products()
    
    # Diverse product catalog
    products = [
        
        # 🕶️ GLASSES
        {
            "name": "Ray-Ban Aviator Sunglasses",
            "category": "Accessories",
            "mood_category": "sunny",
            "price": 154.00,
            "description": "Iconic aviator sunglasses with timeless style and superior UV protection.",
            "emoji": "🕶️",
            "image_url": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "Ray-Ban",
            "rating": 4.9,
            "tags": "aviator,classic,UV protection,sunglasses",
            "is_trending": True,
            "stock_quantity": 85,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/aviator.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
            "multiple_images": [
                "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            "size_chart": {"One Size": "58mm lens"},
            "color_variants": ["Gold/Brown", "Silver/Gray", "Black/Green"],
            "three_d_model": "aviator_sunglasses.glb"
        },
        
        {
            "name": "Reading Glasses",
            "category": "Accessories", 
            "mood_category": "professional",
            "price": 89.99,
            "description": "Stylish reading glasses with blue light protection.",
            "emoji": "👓",
            "image_url": "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "LensWorld",
            "rating": 4.6,
            "tags": "reading,blue light,glasses",
            "is_trending": False,
            "stock_quantity": 67,
            "ar_enabled": True,
            "multiple_images": ["https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
            "size_chart": {"One Size": "Medium frame"},
            "color_variants": ["Black", "Tortoise", "Clear"]
        },

        # 🧥 JACKETS
        {
            "name": "Leather Jacket",
            "category": "Clothing",
            "mood_category": "party",
            "price": 299.99,
            "description": "Classic leather jacket with timeless style.",
            "emoji": "🧥",
            "image_url": "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "LeatherCraft",
            "rating": 4.8,
            "tags": "leather,jacket,classic,style",
            "is_trending": True,
            "stock_quantity": 34,
            "ar_enabled": True,
            "multiple_images": ["https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
            "size_chart": {"S": "36-38", "M": "40-42", "L": "44-46", "XL": "48-50"},
            "color_variants": ["Black", "Brown", "Dark Red"]
        },

        {
            "name": "Rain Jacket",
            "category": "Clothing",
            "mood_category": "rainy",
            "price": 129.99,
            "description": "Waterproof jacket for wet weather protection.",
            "emoji": "☂️",
            "image_url": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "StormShield",
            "rating": 4.7,
            "tags": "waterproof,rain,outdoor,protection",
            "is_trending": False,
            "stock_quantity": 56,
            "ar_enabled": True,
            "multiple_images": ["https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
            "size_chart": {"S": "36-38", "M": "40-42", "L": "44-46"},
            "color_variants": ["Navy Blue", "Black", "Gray"]
        },

        # 🎒 BAGS
        {
            "name": "Leather Backpack",
            "category": "Accessories",
            "mood_category": "professional",
            "price": 189.99,
            "description": "Elegant leather backpack for work and travel.",
            "emoji": "🎒",
            "image_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "UrbanCarry",
            "rating": 4.8,
            "tags": "backpack,leather,professional,travel",
            "is_trending": True,
            "stock_quantity": 42,
            "ar_enabled": True,
            "multiple_images": ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
            "size_chart": {"One Size": "Fits 15 inch laptop"},
            "color_variants": ["Black", "Brown", "Navy"]
        },

        {
            "name": "Trendy Handbag",
            "category": "Accessories",
            "mood_category": "happy",
            "price": 119.99,
            "description": "Stylish handbag with vibrant colors.",
            "emoji": "👜",
            "image_url": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "FashionForward",
            "rating": 4.5,
            "tags": "handbag,fashion,trendy,colorful",
            "is_trending": True,
            "stock_quantity": 73,
            "ar_enabled": True,
            "multiple_images": ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
            "size_chart": {"One Size": "Medium size"},
            "color_variants": ["Pink", "Red", "Blue", "Yellow"]
        },

        # 👟 SHOES
        {
            "name": "Running Shoes",
            "category": "Footwear",
            "mood_category": "energetic",
            "price": 139.99,
            "description": "High-performance running shoes with advanced cushioning.",
            "emoji": "👟",
            "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "SpeedTech",
            "rating": 4.9,
            "tags": "running,athletic,performance,sports",
            "is_trending": True,
            "stock_quantity": 89,
            "ar_enabled": True,
            "multiple_images": ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
            "size_chart": {"7": "7", "8": "8", "9": "9", "10": "10", "11": "11"},
            "color_variants": ["White/Blue", "Black/Red", "Gray/Green"]
        },

        {
            "name": "High Heels",
            "category": "Footwear",
            "mood_category": "party",
            "price": 159.99,
            "description": "Elegant high heels for formal events.",
            "emoji": "👠",
            "image_url": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "GlamourSteps",
            "rating": 4.6,
            "tags": "heels,elegant,formal,party",
            "is_trending": False,
            "stock_quantity": 47,
            "ar_enabled": True,
            "multiple_images": ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
            "size_chart": {"6": "6", "7": "7", "8": "8", "9": "9", "10": "10"},
            "color_variants": ["Black", "Red", "Gold", "Silver"]
        },

        {
            "name": "Canvas Sneakers",
            "category": "Footwear",
            "mood_category": "casual",
            "price": 79.99,
            "description": "Comfortable canvas sneakers for everyday wear.",
            "emoji": "👟",
            "image_url": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "ComfortWalk",
            "rating": 4.4,
            "tags": "sneakers,casual,canvas,comfortable",
            "is_trending": False,
            "stock_quantity": 95,
            "ar_enabled": True,
            "multiple_images": ["https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
            "size_chart": {"7": "7", "8": "8", "9": "9", "10": "10", "11": "11"},
            "color_variants": ["White", "Black", "Red", "Blue"]
        },

        # 🍴 KITCHEN/UTENSILS
        {
            "name": "Steel Fork Set",
            "category": "Kitchen",
            "mood_category": "general",
            "price": 49.99,
            "description": "High-quality stainless steel fork set.",
            "emoji": "🍴",
            "image_url": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "CulinaryPro",
            "rating": 4.7,
            "tags": "fork,utensils,stainless steel,dining",
            "is_trending": False,
            "stock_quantity": 120,
            "ar_enabled": False,
            "multiple_images": ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
            "size_chart": {"One Size": "Standard dinner fork"},
            "color_variants": ["Silver", "Gold Plated"]
        },

        {
            "name": "Chef Knife Set",
            "category": "Kitchen",
            "mood_category": "general",
            "price": 199.99,
            "description": "Professional chef's knife set for cooking.",
            "emoji": "🔪",
            "image_url": "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "ChefMaster",
            "rating": 4.9,
            "tags": "knife,chef,cooking,kitchen,professional",
            "is_trending": True,
            "stock_quantity": 67,
            "ar_enabled": False,
            "multiple_images": ["https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
            "size_chart": {"One Size": "8 inch chef knife"},
            "color_variants": ["Stainless Steel"]
        },

        # 🛏️ FURNITURE/BED
        {
            "name": "Platform Bed Frame",
            "category": "Furniture",
            "mood_category": "comfort",
            "price": 499.99,
            "description": "Modern platform bed frame with minimalist design.",
            "emoji": "🛏️",
            "image_url": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "ModernHome",
            "rating": 4.6,
            "tags": "bed,furniture,modern,platform,bedroom",
            "is_trending": True,
            "stock_quantity": 23,
            "ar_enabled": True,
            "multiple_images": ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
            "size_chart": {"Queen": "60x80 inches", "King": "76x80 inches"},
            "color_variants": ["Walnut", "Oak", "White"]
        },

        {
            "name": "Memory Foam Mattress",
            "category": "Furniture",
            "mood_category": "comfort",
            "price": 799.99,
            "description": "Premium memory foam mattress for perfect sleep.",
            "emoji": "🛌",
            "image_url": "https://images.unsplash.com/photo-1541558869434-2840d308329a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "SleepWell",
            "rating": 4.8,
            "tags": "mattress,memory foam,sleep,comfort,luxury",
            "is_trending": False,
            "stock_quantity": 34,
            "ar_enabled": False,
            "multiple_images": ["https://images.unsplash.com/photo-1541558869434-2840d308329a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
            "size_chart": {"Queen": "60x80 inches", "King": "76x80 inches"},
            "color_variants": ["White"]
        },

        # 📱 ELECTRONICS
        {
            "name": "Bluetooth Headphones",
            "category": "Electronics",
            "mood_category": "energetic",
            "price": 159.99,
            "description": "Premium wireless headphones with noise cancellation.",
            "emoji": "🎧",
            "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "SoundTech",
            "rating": 4.7,
            "tags": "headphones,wireless,bluetooth,audio,music",
            "is_trending": True,
            "stock_quantity": 78,
            "ar_enabled": True,
            "multiple_images": ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
            "size_chart": {"One Size": "Adjustable"},
            "color_variants": ["Black", "White", "Silver"]
        },

        {
            "name": "Smartwatch",
            "category": "Electronics",
            "mood_category": "energetic",
            "price": 249.99,
            "description": "Advanced smartwatch with fitness tracking.",
            "emoji": "⌚",
            "image_url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "FitTech",
            "rating": 4.5,
            "tags": "smartwatch,fitness,tracker,health,technology",
            "is_trending": True,
            "stock_quantity": 56,
            "ar_enabled": True,
            "multiple_images": ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
            "size_chart": {"S": "Small wrist", "M": "Medium wrist", "L": "Large wrist"},
            "color_variants": ["Black", "Silver", "Rose Gold"]
        },

        # 👕 CLOTHING
        {
            "name": "Cotton T-Shirt",
            "category": "Clothing",
            "mood_category": "casual",
            "price": 29.99,
            "description": "Comfortable cotton t-shirt for everyday wear.",
            "emoji": "👕",
            "image_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "BasicWear",
            "rating": 4.3,
            "tags": "t-shirt,cotton,casual,basic,comfortable",
            "is_trending": False,
            "stock_quantity": 150,
            "ar_enabled": True,
            "multiple_images": ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
            "size_chart": {"S": "36-38", "M": "40-42", "L": "44-46", "XL": "48-50"},
            "color_variants": ["White", "Black", "Navy", "Gray"]
        },

        {
            "name": "Evening Dress",
            "category": "Clothing",
            "mood_category": "romantic",
            "price": 199.99,
            "description": "Beautiful evening dress for special occasions.",
            "emoji": "👗",
            "image_url": "https://images.unsplash.com/photo-1566479179817-c0ae10fa7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "ElegantStyle",
            "rating": 4.7,
            "tags": "dress,evening,elegant,romantic,formal",
            "is_trending": True,
            "stock_quantity": 45,
            "ar_enabled": True,
            "multiple_images": ["https://images.unsplash.com/photo-1566479179817-c0ae10fa7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
            "size_chart": {"XS": "32", "S": "34", "M": "36", "L": "38"},
            "color_variants": ["Black", "Navy", "Red", "Emerald"]
        }
    ]
    
    # Add all products
    added_count = 0
    for product in products:
        if add_product(product):
            added_count += 1
            print(f"✅ Added: {product['name']} ({product['emoji']})")
        else:
            print(f"❌ Failed: {product['name']}")
    
    print(f"\n🎉 Successfully added {added_count} diverse products!")
    print("\n📸 Product Categories with Unique Images:")
    print("🕶️ Glasses: Aviator Sunglasses, Reading Glasses")
    print("🧥 Jackets: Leather Jacket, Rain Jacket") 
    print("🎒 Bags: Leather Backpack, Trendy Handbag")
    print("👟 Shoes: Running Shoes, High Heels, Canvas Sneakers")
    print("🍴 Kitchen: Steel Fork Set, Chef Knife Set")
    print("🛏️ Furniture: Platform Bed Frame, Memory Foam Mattress")
    print("📱 Electronics: Bluetooth Headphones, Smartwatch")
    print("👕 Clothing: Cotton T-Shirt, Evening Dress")
    
    return added_count

if __name__ == "__main__":
    setup_diverse_products()
