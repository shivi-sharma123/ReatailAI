#!/usr/bin/env python3
"""Add diverse products with different categories and unique images"""

from database import init_database, add_product, get_all_products, delete_product

def add_diverse_product_catalog():
    """Add a diverse catalog of products with unique images for different categories"""
    
    print("🔧 Setting up diverse product catalog...")
    init_database()
    
    # Clear existing products first
    existing_products = get_all_products()
    for product in existing_products:
        delete_product(product['id'])
    print(f"🗑️ Cleared {len(existing_products)} existing products")
    
    # Diverse product catalog with unique categories
    diverse_products = [
        
        # 🕶️ GLASSES CATEGORY
        {
            "name": "Ray-Ban Aviator Classic Sunglasses",
            "category": "Accessories",
            "mood_category": "sunny",
            "price": 154.00,
            "description": "Iconic aviator sunglasses with timeless style and superior UV protection.",
            "emoji": "🕶️",
            "image_url": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "Ray-Ban",
            "rating": 4.9,
            "tags": "aviator,classic,UV protection,pilot,sunglasses",
            "is_trending": True,
            "stock_quantity": 85,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/aviator.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
            "multiple_images": [
                "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            "size_chart": {"One Size": "58mm lens"},
            "color_variants": ["Gold/Brown", "Silver/Gray", "Black/Green"],
            "three_d_model": "aviator_sunglasses.glb"
        },
        
        {
            "name": "Modern Reading Glasses",
            "category": "Accessories", 
            "mood_category": "professional",
            "price": 89.99,
            "description": "Stylish reading glasses with blue light protection for digital screens.",
            "emoji": "👓",
            "image_url": "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "LensWorld",
            "rating": 4.6,
            "tags": "reading,blue light,professional,glasses",
            "is_trending": False,
            "stock_quantity": 67,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/reading_glasses.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400",
            "multiple_images": [
                "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            "size_chart": {"One Size": "Medium frame"},
            "color_variants": ["Black", "Tortoise", "Clear"],
            "three_d_model": "reading_glasses.glb"
        },

        # 🧥 JACKET CATEGORY
        {
            "name": "Premium Leather Jacket",
            "category": "Clothing",
            "mood_category": "party",
            "price": 299.99,
            "description": "Classic leather jacket with timeless style perfect for casual outings and special occasions.",
            "emoji": "🧥",
            "image_url": "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "LeatherCraft",
            "rating": 4.8,
            "tags": "leather,jacket,classic,motorcycle,style",
            "is_trending": True,
            "stock_quantity": 34,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/leather_jacket.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
            "multiple_images": [
                "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            "size_chart": {"S": "36-38", "M": "40-42", "L": "44-46", "XL": "48-50"},
            "color_variants": ["Black", "Brown", "Dark Red"],
            "three_d_model": "leather_jacket.glb"
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
            "is_trending": False,
            "stock_quantity": 56,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/rain_jacket.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=400",
            "multiple_images": [
                "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            "size_chart": {"S": "36-38", "M": "40-42", "L": "44-46", "XL": "48-50"},
            "color_variants": ["Navy Blue", "Black", "Gray"],
            "three_d_model": "rain_jacket.glb"
        },

        # 🎒 BAG CATEGORY
        {
            "name": "Designer Leather Backpack",
            "category": "Accessories",
            "mood_category": "professional",
            "price": 189.99,
            "description": "Elegant leather backpack perfect for work, travel, and everyday use.",
            "emoji": "🎒",
            "image_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "UrbanCarry",
            "rating": 4.8,
            "tags": "backpack,leather,professional,travel,laptop",
            "is_trending": True,
            "stock_quantity": 42,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/backpack.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
            "multiple_images": [
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            "size_chart": {"One Size": "Fits 15 inch laptop"},
            "color_variants": ["Black", "Brown", "Navy"],
            "three_d_model": "leather_backpack.glb"
        },

        {
            "name": "Trendy Handbag",
            "category": "Accessories",
            "mood_category": "happy",
            "price": 119.99,
            "description": "Stylish handbag with vibrant colors perfect for everyday fashion.",
            "emoji": "👜",
            "image_url": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "FashionForward",
            "rating": 4.5,
            "tags": "handbag,fashion,trendy,colorful,style",
            "is_trending": True,
            "stock_quantity": 73,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/handbag.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
            "multiple_images": [
                "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            "size_chart": {"One Size": "Medium size"},
            "color_variants": ["Pink", "Red", "Blue", "Yellow"],
            "three_d_model": "handbag.glb"
        },

        # 👟 SHOES CATEGORY
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
            "is_trending": True,
            "stock_quantity": 89,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/running_shoes.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
            "multiple_images": [
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            "size_chart": {"7": "7", "8": "8", "9": "9", "10": "10", "11": "11"},
            "color_variants": ["White/Blue", "Black/Red", "Gray/Green"],
            "three_d_model": "running_shoes.glb"
        },

        {
            "name": "Elegant High Heels",
            "category": "Footwear",
            "mood_category": "party",
            "price": 159.99,
            "description": "Sophisticated high heels perfect for formal events and special occasions.",
            "emoji": "👠",
            "image_url": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "GlamourSteps",
            "rating": 4.6,
            "tags": "heels,elegant,formal,party,sophisticated",
            "is_trending": False,
            "stock_quantity": 47,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/high_heels.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
            "multiple_images": [
                "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            "size_chart": {"6": "6", "7": "7", "8": "8", "9": "9", "10": "10"},
            "color_variants": ["Black", "Red", "Gold", "Silver"],
            "three_d_model": "high_heels.glb"
        },

        {
            "name": "Casual Canvas Sneakers",
            "category": "Footwear",
            "mood_category": "casual",
            "price": 79.99,
            "description": "Comfortable canvas sneakers perfect for everyday casual wear.",
            "emoji": "👟",
            "image_url": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "ComfortWalk",
            "rating": 4.4,
            "tags": "sneakers,casual,canvas,comfortable,everyday",
            "is_trending": False,
            "stock_quantity": 95,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/canvas_sneakers.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
            "multiple_images": [
                "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            "size_chart": {"7": "7", "8": "8", "9": "9", "10": "10", "11": "11"},
            "color_variants": ["White", "Black", "Red", "Blue"],
            "three_d_model": "canvas_sneakers.glb"
        },

        # 🍴 KITCHEN/UTENSILS CATEGORY
        {
            "name": "Premium Stainless Steel Fork Set",
            "category": "Kitchen",
            "mood_category": "general",
            "price": 49.99,
            "description": "High-quality stainless steel fork set perfect for dining and entertaining.",
            "emoji": "🍴",
            "image_url": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "CulinaryPro",
            "rating": 4.7,
            "tags": "fork,utensils,stainless steel,dining,kitchen",
            "is_trending": False,
            "stock_quantity": 120,
            "ar_enabled": False,
            "ar_model_url": "",
            "ar_preview_url": "",
            "multiple_images": [
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            "size_chart": {"One Size": "Standard dinner fork size"},
            "color_variants": ["Silver", "Gold Plated"],
            "three_d_model": ""
        },

        {
            "name": "Chef's Knife Set",
            "category": "Kitchen",
            "mood_category": "general",
            "price": 199.99,
            "description": "Professional chef's knife set for all your cooking needs.",
            "emoji": "🔪",
            "image_url": "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "ChefMaster",
            "rating": 4.9,
            "tags": "knife,chef,cooking,kitchen,professional",
            "is_trending": True,
            "stock_quantity": 67,
            "ar_enabled": False,
            "ar_model_url": "",
            "ar_preview_url": "",
            "multiple_images": [
                "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            "size_chart": {"One Size": "8 inch chef knife"},
            "color_variants": ["Stainless Steel"],
            "three_d_model": ""
        },

        # 🛏️ FURNITURE/BED CATEGORY
        {
            "name": "Modern Platform Bed Frame",
            "category": "Furniture",
            "mood_category": "comfort",
            "price": 499.99,
            "description": "Sleek modern platform bed frame with minimalist design perfect for contemporary bedrooms.",
            "emoji": "🛏️",
            "image_url": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "ModernHome",
            "rating": 4.6,
            "tags": "bed,furniture,modern,platform,bedroom",
            "is_trending": True,
            "stock_quantity": 23,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/platform_bed.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
            "multiple_images": [
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            "size_chart": {"Queen": "60x80 inches", "King": "76x80 inches"},
            "color_variants": ["Walnut", "Oak", "White"],
            "three_d_model": "platform_bed.glb"
        },

        {
            "name": "Luxury Memory Foam Mattress",
            "category": "Furniture",
            "mood_category": "comfort",
            "price": 799.99,
            "description": "Premium memory foam mattress for the perfect night's sleep.",
            "emoji": "🛌",
            "image_url": "https://images.unsplash.com/photo-1541558869434-2840d308329a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "SleepWell",
            "rating": 4.8,
            "tags": "mattress,memory foam,sleep,comfort,luxury",
            "is_trending": False,
            "stock_quantity": 34,
            "ar_enabled": False,
            "ar_model_url": "",
            "ar_preview_url": "",
            "multiple_images": [
                "https://images.unsplash.com/photo-1541558869434-2840d308329a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            "size_chart": {"Queen": "60x80 inches", "King": "76x80 inches"},
            "color_variants": ["White"],
            "three_d_model": ""
        },

        # 📱 ELECTRONICS CATEGORY
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
            "is_trending": True,
            "stock_quantity": 78,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/headphones.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
            "multiple_images": [
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            "size_chart": {"One Size": "Adjustable"},
            "color_variants": ["Black", "White", "Silver"],
            "three_d_model": "headphones.glb"
        },

        {
            "name": "Smartwatch Fitness Tracker",
            "category": "Electronics",
            "mood_category": "energetic",
            "price": 249.99,
            "description": "Advanced smartwatch with fitness tracking, heart rate monitor, and GPS.",
            "emoji": "⌚",
            "image_url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "FitTech",
            "rating": 4.5,
            "tags": "smartwatch,fitness,tracker,health,technology",
            "is_trending": True,
            "stock_quantity": 56,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/smartwatch.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
            "multiple_images": [
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            "size_chart": {"S": "Small wrist", "M": "Medium wrist", "L": "Large wrist"},
            "color_variants": ["Black", "Silver", "Rose Gold"],
            "three_d_model": "smartwatch.glb"
        },

        # 👕 CLOTHING CATEGORY
        {
            "name": "Classic Cotton T-Shirt",
            "category": "Clothing",
            "mood_category": "casual",
            "price": 29.99,
            "description": "Comfortable cotton t-shirt perfect for everyday casual wear.",
            "emoji": "👕",
            "image_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "BasicWear",
            "rating": 4.3,
            "tags": "t-shirt,cotton,casual,basic,comfortable",
            "is_trending": False,
            "stock_quantity": 150,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/t_shirt.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
            "multiple_images": [
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            "size_chart": {"S": "36-38", "M": "40-42", "L": "44-46", "XL": "48-50"},
            "color_variants": ["White", "Black", "Navy", "Gray"],
            "three_d_model": "t_shirt.glb"
        },

        {
            "name": "Elegant Evening Dress",
            "category": "Clothing",
            "mood_category": "romantic",
            "price": 199.99,
            "description": "Beautiful evening dress perfect for romantic dinners and special occasions.",
            "emoji": "👗",
            "image_url": "https://images.unsplash.com/photo-1566479179817-c0ae10fa7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "ElegantStyle",
            "rating": 4.7,
            "tags": "dress,evening,elegant,romantic,formal",
            "is_trending": True,
            "stock_quantity": 45,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/evening_dress.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1566479179817-c0ae10fa7efc?w=400",
            "multiple_images": [
                "https://images.unsplash.com/photo-1566479179817-c0ae10fa7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            "size_chart": {"XS": "32", "S": "34", "M": "36", "L": "38"},
            "color_variants": ["Black", "Navy", "Red", "Emerald"],
            "three_d_model": "evening_dress.glb"
        }
    ]
    
    # Add all products to database
    added_count = 0
    for product_data in diverse_products:
        try:
            result = add_product(product_data)
            if result:
                added_count += 1
                print(f"✅ Added: {product_data['name']} ({product_data['emoji']})")
            else:
                print(f"❌ Failed to add: {product_data['name']}")
        except Exception as e:
            print(f"❌ Error adding {product_data['name']}: {str(e)}")
    
    print(f"\n🎉 Successfully added {added_count} diverse products to the catalog!")
    print("\n📸 Product Categories Added:")
    print("🕶️ Glasses: Ray-Ban Aviator, Reading Glasses")
    print("🧥 Jackets: Leather Jacket, Rain Jacket") 
    print("🎒 Bags: Leather Backpack, Trendy Handbag")
    print("👟 Shoes: Running Shoes, High Heels, Canvas Sneakers")
    print("🍴 Kitchen: Fork Set, Chef's Knife Set")
    print("🛏️ Furniture: Platform Bed, Memory Foam Mattress")
    print("📱 Electronics: Bluetooth Headphones, Smartwatch")
    print("👕 Clothing: Cotton T-Shirt, Evening Dress")
    
    return added_count

if __name__ == "__main__":
    add_diverse_product_catalog()
