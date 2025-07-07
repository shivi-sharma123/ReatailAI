#!/usr/bin/env python3
"""Check database schema and add products with basic structure"""

import sqlite3

DATABASE = 'retailflow.db'

def check_schema():
    """Check what columns exist in the products table"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    try:
        cursor.execute("PRAGMA table_info(products)")
        columns = cursor.fetchall()
        print("Current database columns:")
        for col in columns:
            print(f"  - {col[1]} ({col[2]})")
        return [col[1] for col in columns]
    except Exception as e:
        print(f"Error checking schema: {e}")
        return []
    finally:
        conn.close()

def add_basic_products():
    """Add products with basic columns only"""
    
    # Check what columns exist
    existing_columns = check_schema()
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Clear existing products
    cursor.execute('DELETE FROM products')
    print("\n🗑️ Cleared existing products")
    
    # Simple products with basic columns
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
            "is_trending": 1,
            "stock_quantity": 85,
            "ar_enabled": 1
        },
        
        {
            "name": "Reading Glasses",
            "category": "Accessories", 
            "mood_category": "professional",
            "price": 89.99,
            "description": "Stylish reading glasses with blue light protection for digital screens.",
            "emoji": "👓",
            "image_url": "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "LensWorld",
            "rating": 4.6,
            "tags": "reading,blue light,glasses,professional",
            "is_trending": 0,
            "stock_quantity": 67,
            "ar_enabled": 1
        },

        # 🧥 JACKETS
        {
            "name": "Premium Leather Jacket",
            "category": "Clothing",
            "mood_category": "party",
            "price": 299.99,
            "description": "Classic leather jacket with timeless style perfect for parties and special occasions.",
            "emoji": "🧥",
            "image_url": "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "LeatherCraft",
            "rating": 4.8,
            "tags": "leather,jacket,classic,motorcycle,style",
            "is_trending": 1,
            "stock_quantity": 34,
            "ar_enabled": 1
        },

        {
            "name": "Waterproof Rain Jacket",
            "category": "Clothing",
            "mood_category": "rainy",
            "price": 129.99,
            "description": "Professional waterproof jacket with sealed seams for wet weather protection.",
            "emoji": "☂️",
            "image_url": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "StormShield",
            "rating": 4.7,
            "tags": "waterproof,rain,outdoor,weather,protection",
            "is_trending": 0,
            "stock_quantity": 56,
            "ar_enabled": 1
        },

        # 🎒 BAGS
        {
            "name": "Designer Leather Backpack",
            "category": "Accessories",
            "mood_category": "professional",
            "price": 189.99,
            "description": "Elegant leather backpack perfect for work, travel, and everyday professional use.",
            "emoji": "🎒",
            "image_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "UrbanCarry",
            "rating": 4.8,
            "tags": "backpack,leather,professional,travel,laptop",
            "is_trending": 1,
            "stock_quantity": 42,
            "ar_enabled": 1
        },

        {
            "name": "Trendy Fashion Handbag",
            "category": "Accessories",
            "mood_category": "happy",
            "price": 119.99,
            "description": "Stylish handbag with vibrant colors perfect for everyday fashion and outings.",
            "emoji": "👜",
            "image_url": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "FashionForward",
            "rating": 4.5,
            "tags": "handbag,fashion,trendy,colorful,style",
            "is_trending": 1,
            "stock_quantity": 73,
            "ar_enabled": 1
        },

        # 👟 SHOES
        {
            "name": "Athletic Running Shoes",
            "category": "Footwear",
            "mood_category": "energetic",
            "price": 139.99,
            "description": "High-performance running shoes with advanced cushioning and breathable design.",
            "emoji": "👟",
            "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "SpeedTech",
            "rating": 4.9,
            "tags": "running,athletic,performance,breathable,sports",
            "is_trending": 1,
            "stock_quantity": 89,
            "ar_enabled": 1
        },

        {
            "name": "Elegant High Heels",
            "category": "Footwear",
            "mood_category": "party",
            "price": 159.99,
            "description": "Sophisticated high heels perfect for formal events and special party occasions.",
            "emoji": "👠",
            "image_url": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "GlamourSteps",
            "rating": 4.6,
            "tags": "heels,elegant,formal,party,sophisticated",
            "is_trending": 0,
            "stock_quantity": 47,
            "ar_enabled": 1
        },

        {
            "name": "Casual Canvas Sneakers",
            "category": "Footwear",
            "mood_category": "casual",
            "price": 79.99,
            "description": "Comfortable canvas sneakers perfect for everyday casual wear and relaxation.",
            "emoji": "👟",
            "image_url": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "ComfortWalk",
            "rating": 4.4,
            "tags": "sneakers,casual,canvas,comfortable,everyday",
            "is_trending": 0,
            "stock_quantity": 95,
            "ar_enabled": 1
        },

        # 🍴 KITCHEN/UTENSILS 
        {
            "name": "Premium Steel Fork Set",
            "category": "Kitchen",
            "mood_category": "general",
            "price": 49.99,
            "description": "High-quality stainless steel fork set perfect for dining and entertaining guests.",
            "emoji": "🍴",
            "image_url": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "CulinaryPro",
            "rating": 4.7,
            "tags": "fork,utensils,stainless steel,dining,kitchen",
            "is_trending": 0,
            "stock_quantity": 120,
            "ar_enabled": 0
        },

        {
            "name": "Professional Chef Knife Set",
            "category": "Kitchen",
            "mood_category": "general",
            "price": 199.99,
            "description": "Professional chef's knife set for all your cooking and culinary needs.",
            "emoji": "🔪",
            "image_url": "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "ChefMaster",
            "rating": 4.9,
            "tags": "knife,chef,cooking,kitchen,professional",
            "is_trending": 1,
            "stock_quantity": 67,
            "ar_enabled": 0
        },

        # 🛏️ FURNITURE/BED
        {
            "name": "Modern Platform Bed Frame",
            "category": "Furniture",
            "mood_category": "comfort",
            "price": 499.99,
            "description": "Sleek modern platform bed frame with minimalist design for contemporary bedrooms.",
            "emoji": "🛏️",
            "image_url": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "ModernHome",
            "rating": 4.6,
            "tags": "bed,furniture,modern,platform,bedroom",
            "is_trending": 1,
            "stock_quantity": 23,
            "ar_enabled": 1
        },

        {
            "name": "Luxury Memory Foam Mattress",
            "category": "Furniture",
            "mood_category": "comfort",
            "price": 799.99,
            "description": "Premium memory foam mattress designed for the perfect night's sleep and comfort.",
            "emoji": "🛌",
            "image_url": "https://images.unsplash.com/photo-1541558869434-2840d308329a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "SleepWell",
            "rating": 4.8,
            "tags": "mattress,memory foam,sleep,comfort,luxury",
            "is_trending": 0,
            "stock_quantity": 34,
            "ar_enabled": 0
        },

        # 📱 ELECTRONICS
        {
            "name": "Wireless Bluetooth Headphones",
            "category": "Electronics",
            "mood_category": "energetic",
            "price": 159.99,
            "description": "Premium wireless headphones with noise cancellation and superior sound quality.",
            "emoji": "🎧",
            "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "SoundTech",
            "rating": 4.7,
            "tags": "headphones,wireless,bluetooth,audio,music",
            "is_trending": 1,
            "stock_quantity": 78,
            "ar_enabled": 1
        },

        {
            "name": "Smartwatch Fitness Tracker",
            "category": "Electronics",
            "mood_category": "energetic",
            "price": 249.99,
            "description": "Advanced smartwatch with fitness tracking, heart rate monitor, and GPS technology.",
            "emoji": "⌚",
            "image_url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "FitTech",
            "rating": 4.5,
            "tags": "smartwatch,fitness,tracker,health,technology",
            "is_trending": 1,
            "stock_quantity": 56,
            "ar_enabled": 1
        },

        # 👕 CLOTHING
        {
            "name": "Essential Cotton T-Shirt",
            "category": "Clothing",
            "mood_category": "casual",
            "price": 29.99,
            "description": "Comfortable cotton t-shirt perfect for everyday casual wear and layering.",
            "emoji": "👕",
            "image_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "BasicWear",
            "rating": 4.3,
            "tags": "t-shirt,cotton,casual,basic,comfortable",
            "is_trending": 0,
            "stock_quantity": 150,
            "ar_enabled": 1
        },

        {
            "name": "Elegant Evening Dress",
            "category": "Clothing",
            "mood_category": "romantic",
            "price": 199.99,
            "description": "Beautiful evening dress perfect for romantic dinners and special formal occasions.",
            "emoji": "👗",
            "image_url": "https://images.unsplash.com/photo-1566479179817-c0ae10fa7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "ElegantStyle",
            "rating": 4.7,
            "tags": "dress,evening,elegant,romantic,formal",
            "is_trending": 1,
            "stock_quantity": 45,
            "ar_enabled": 1
        }
    ]
    
    # Add products with only existing columns
    added_count = 0
    for product in products:
        try:
            # Use basic INSERT with only standard columns
            cursor.execute('''
                INSERT INTO products (name, category, price, description, emoji, image_url, brand, rating, is_trending, stock_quantity, ar_enabled, tags, mood_category)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                product['name'],
                product['category'],
                product['price'],
                product['description'],
                product['emoji'],
                product['image_url'],
                product['brand'],
                product['rating'],
                product['is_trending'],
                product['stock_quantity'],
                product['ar_enabled'],
                product['tags'],
                product['mood_category']
            ))
            added_count += 1
            print(f"✅ Added: {product['name']} ({product['emoji']})")
        except Exception as e:
            print(f"❌ Failed to add {product['name']}: {e}")
    
    conn.commit()
    conn.close()
    
    print(f"\n🎉 Successfully added {added_count} diverse products!")
    print("\n📸 Product Categories with Unique Images:")
    print("🕶️ Glasses: Ray-Ban Aviator, Reading Glasses")
    print("🧥 Jackets: Premium Leather, Waterproof Rain Jacket") 
    print("🎒 Bags: Designer Leather Backpack, Trendy Fashion Handbag")
    print("👟 Shoes: Athletic Running, Elegant High Heels, Casual Canvas Sneakers")
    print("🍴 Kitchen: Premium Steel Fork Set, Professional Chef Knife Set")
    print("🛏️ Furniture: Modern Platform Bed Frame, Luxury Memory Foam Mattress")
    print("📱 Electronics: Wireless Bluetooth Headphones, Smartwatch Fitness Tracker")
    print("👕 Clothing: Essential Cotton T-Shirt, Elegant Evening Dress")

if __name__ == "__main__":
    add_basic_products()
