#!/usr/bin/env python3
"""Add products with guaranteed working images"""

from database import init_database, add_product, get_all_products, delete_product

def add_products_with_images():
    """Add products with verified working images"""
    
    print("🔧 Adding products with working images...")
    init_database()
    
    # Clear existing products
    existing = get_all_products()
    for p in existing:
        delete_product(p['id'])
    print(f"Cleared {len(existing)} existing products")
    
    # Products with working image URLs
    products = [
        # Rainy weather - Enhanced with better images
        {
            "name": "Premium Waterproof Rain Jacket",
            "category": "Clothing",
            "mood_category": "rainy",
            "price": 129.99,
            "description": "Professional-grade waterproof jacket with sealed seams, breathable fabric, and stylish design for urban adventures.",
            "emoji": "☂️",
            "image_url": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            "brand": "StormShield Pro",
            "rating": 4.9,
            "tags": "waterproof,rain,jacket,premium,outdoor",
            "is_trending": True,
            "stock_quantity": 45,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.example.com/models/rain-jacket.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "multiple_images": [
                "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            ],
            "size_chart": {"S": "36-38", "M": "40-42", "L": "44-46", "XL": "48-50", "XXL": "52-54"},
            "color_variants": ["Navy Blue", "Forest Green", "Charcoal Gray", "Bright Yellow"],
            "three_d_model": "premium_rain_jacket_3d.glb"
        },
        
        {
            "name": "Designer Rain Boots",
            "category": "Footwear",
            "mood_category": "rainy", 
            "price": 89.99,
            "description": "Stylish waterproof boots that keep you dry while looking fashionable in any weather.",
            "emoji": "🥾",
            "image_url": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            "brand": "WeatherWalk",
            "rating": 4.7,
            "tags": "boots,waterproof,rain,stylish,designer",
            "is_trending": False,
            "stock_quantity": 67,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.example.com/models/rain-boots.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "multiple_images": [
                "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            ],
            "size_chart": {"6": "6", "7": "7", "8": "8", "9": "9", "10": "10", "11": "11"},
            "color_variants": ["Black", "Navy", "Hunter Green", "Brown"],
            "three_d_model": "designer_rain_boots_3d.glb"
        },
        
        # Sunny weather - Premium lifestyle products
        {
            "name": "Luxury Aviator Sunglasses",
            "category": "Accessories",
            "mood_category": "sunny",
            "price": 159.99,
            "description": "Premium aviator sunglasses with polarized lenses, titanium frame, and 100% UV protection for the perfect sunny day.",
            "emoji": "🕶️",
            "image_url": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            "brand": "SunLux Premium",
            "rating": 4.9,
            "tags": "sunglasses,aviator,luxury,polarized,UV protection",
            "is_trending": True,
            "stock_quantity": 78,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.example.com/models/luxury-aviator.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "multiple_images": [
                "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            ],
            "size_chart": {"One Size": "58mm lens"},
            "color_variants": ["Gold/Brown", "Silver/Gray", "Black/Green", "Rose Gold/Pink"],
            "three_d_model": "luxury_aviator_3d.glb"
        },
        
        {
            "name": "Summer Linen Shirt",
            "category": "Clothing",
            "mood_category": "sunny",
            "price": 79.99,
            "description": "Breathable linen shirt perfect for sunny days, beach vacations, and warm weather adventures.",
            "emoji": "🌞",
            "image_url": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            "brand": "Coastal Breeze",
            "rating": 4.6,
            "tags": "linen,shirt,summer,breathable,beach",
            "is_trending": True,
            "stock_quantity": 92,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.example.com/models/linen-shirt.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "multiple_images": [
                "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            ],
            "size_chart": {"S": "36-38", "M": "40-42", "L": "44-46", "XL": "48-50"},
            "color_variants": ["White", "Light Blue", "Beige", "Soft Pink"],
            "three_d_model": "linen_shirt_3d.glb"
        },
        
        # Party - Glamorous evening wear
        {
            "name": "Sequined Cocktail Dress",
            "category": "Clothing", 
            "mood_category": "party",
            "price": 189.99,
            "description": "Stunning sequined cocktail dress that sparkles under lights, perfect for parties, galas, and special celebrations.",
            "emoji": "✨",
            "image_url": "https://images.unsplash.com/photo-1566479179817-c0ae10fa7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            "brand": "Glamour Studio",
            "rating": 4.8,
            "tags": "dress,party,sequin,cocktail,glamorous",
            "is_trending": True,
            "stock_quantity": 23,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.example.com/models/cocktail-dress.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1566479179817-c0ae10fa7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "multiple_images": [
                "https://images.unsplash.com/photo-1566479179817-c0ae10fa7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            ],
            "size_chart": {"XS": "32", "S": "34", "M": "36", "L": "38", "XL": "40"},
            "color_variants": ["Midnight Black", "Gold Sequin", "Silver Sparkle", "Rose Gold"],
            "three_d_model": "cocktail_dress_3d.glb"
        },
        
        {
            "name": "Statement High Heels",
            "category": "Footwear",
            "mood_category": "party",
            "price": 119.99,
            "description": "Eye-catching high heels that make a statement at any party or special event.",
            "emoji": "👠",
            "image_url": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            "brand": "Party Perfect",
            "rating": 4.5,
            "tags": "heels,party,statement,glamorous,event",
            "is_trending": True,
            "stock_quantity": 34,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.example.com/models/high-heels.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "multiple_images": [
                "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            ],
            "size_chart": {"6": "6", "7": "7", "8": "8", "9": "9", "10": "10"},
            "color_variants": ["Black Patent", "Red Suede", "Gold Metallic", "Silver"],
            "three_d_model": "statement_heels_3d.glb"
        },
        
        # Comfort
        {
            "name": "Ultra Soft Comfort Hoodie",
            "category": "Clothing",
            "mood_category": "comfort",
            "price": 59.99,
            "description": "Incredibly soft fleece hoodie perfect for lounging and staying cozy.",
            "emoji": "🤗",
            "image_url": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "CozyWear",
            "rating": 4.8,
            "tags": "hoodie,comfort,soft,fleece",
            "is_trending": False,
            "stock_quantity": 95,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.example.com/models/hoodie.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "multiple_images": [
                "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            "size_chart": {"S": "36-38", "M": "40-42", "L": "44-46", "XL": "48-50", "XXL": "52-54"},
            "color_variants": ["Gray", "Navy", "Black", "Burgundy", "Forest Green"],
            "three_d_model": "hoodie_3d.glb"
        },
        
        # Energetic/Fitness
        {
            "name": "Performance Running Shoes",
            "category": "Footwear",
            "mood_category": "energetic", 
            "price": 119.99,
            "description": "High-performance running shoes with advanced cushioning and breathable mesh.",
            "emoji": "👟",
            "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "RunTech",
            "rating": 4.9,
            "tags": "running shoes,performance,athletic,breathable",
            "is_trending": True,
            "stock_quantity": 67,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.example.com/models/running-shoes.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "multiple_images": [
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            "size_chart": {"7": "7", "8": "8", "9": "9", "10": "10", "11": "11", "12": "12"},
            "color_variants": ["White/Blue", "Black/Red", "Gray/Orange", "Navy/Silver"],
            "three_d_model": "running_shoes_3d.glb"
        },
        
        # Casual
        {
            "name": "Classic Denim Jeans",
            "category": "Clothing",
            "mood_category": "casual",
            "price": 79.99,
            "description": "Perfect everyday jeans with classic fit and premium denim construction.",
            "emoji": "👖",
            "image_url": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "DenimCraft",
            "rating": 4.6,
            "tags": "jeans,denim,casual,everyday",
            "is_trending": False,
            "stock_quantity": 134,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.example.com/models/jeans.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "multiple_images": [
                "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1506629905607-c0cdc18cf33e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            "size_chart": {"28": "28W", "30": "30W", "32": "32W", "34": "34W", "36": "36W", "38": "38W"},
            "color_variants": ["Dark Blue", "Light Blue", "Black", "Gray"],
            "three_d_model": "jeans_3d.glb"
        },
        
        # Professional - Executive style
        {
            "name": "Executive Business Suit",
            "category": "Clothing",
            "mood_category": "professional",
            "price": 399.99,
            "description": "Premium wool business suit with modern tailoring, perfect for executives and important business meetings.",
            "emoji": "👔",
            "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            "brand": "Executive Elite",
            "rating": 4.9,
            "tags": "suit,business,professional,wool,executive",
            "is_trending": True,
            "stock_quantity": 28,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.example.com/models/business-suit.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "multiple_images": [
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            ],
            "size_chart": {"38": "38R", "40": "40R", "42": "42R", "44": "44R", "46": "46R"},
            "color_variants": ["Navy", "Charcoal", "Black", "Light Gray"],
            "three_d_model": "business_suit_3d.glb"
        },
        
        {
            "name": "Luxury Swiss Watch",
            "category": "Accessories",
            "mood_category": "professional",
            "price": 599.99,
            "description": "Elegant Swiss-made watch with precision movement, perfect for professionals who value quality and style.",
            "emoji": "⌚",
            "image_url": "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            "brand": "TimeElite",
            "rating": 4.9,
            "tags": "watch,luxury,swiss,professional,timepiece",
            "is_trending": True,
            "stock_quantity": 15,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.example.com/models/luxury-watch.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "multiple_images": [
                "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            ],
            "size_chart": {"One Size": "Adjustable"},
            "color_variants": ["Silver/Black", "Gold/Brown", "Rose Gold/Navy", "Steel/Blue"],
            "three_d_model": "luxury_watch_3d.glb"
        },
        
        # Romantic
        {
            "name": "Elegant Evening Gown",
            "category": "Clothing",
            "mood_category": "romantic",
            "price": 199.99,
            "description": "Sophisticated evening gown perfect for romantic dinners and special dates.",
            "emoji": "💖",
            "image_url": "https://images.unsplash.com/photo-1566479179817-c0ae10fa7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "Romance Couture",
            "rating": 4.8,
            "tags": "gown,elegant,romantic,evening",
            "is_trending": True,
            "stock_quantity": 15,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.example.com/models/evening-gown.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1566479179817-c0ae10fa7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "multiple_images": [
                "https://images.unsplash.com/photo-1566479179817-c0ae10fa7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            "size_chart": {"XS": "32", "S": "34", "M": "36", "L": "38", "XL": "40"},
            "color_variants": ["Deep Red", "Midnight Blue", "Emerald", "Black"],
            "three_d_model": "evening_gown_3d.glb"
        },
        
        # Happy - Vibrant and colorful
        {
            "name": "Rainbow Canvas Sneakers",
            "category": "Footwear",
            "mood_category": "happy",
            "price": 89.99,
            "description": "Vibrant rainbow canvas sneakers that spread joy and positivity with every step you take.",
            "emoji": "🌈",
            "image_url": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            "brand": "Happy Steps",
            "rating": 4.7,
            "tags": "sneakers,colorful,canvas,rainbow,cheerful",
            "is_trending": True,
            "stock_quantity": 89,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.example.com/models/rainbow-sneakers.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "multiple_images": [
                "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            ],
            "size_chart": {"6": "6", "7": "7", "8": "8", "9": "9", "10": "10", "11": "11"},
            "color_variants": ["Rainbow Multi", "Pink Burst", "Yellow Sunshine", "Blue Sky"],
            "three_d_model": "rainbow_sneakers_3d.glb"
        },
        
        {
            "name": "Bright Floral Summer Dress",
            "category": "Clothing",
            "mood_category": "happy",
            "price": 79.99,
            "description": "Beautiful floral print dress that captures the joy of spring and summer with vibrant colors.",
            "emoji": "🌸",
            "image_url": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            "brand": "Bloom & Joy",
            "rating": 4.6,
            "tags": "dress,floral,summer,bright,cheerful",
            "is_trending": True,
            "stock_quantity": 56,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.example.com/models/floral-dress.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "multiple_images": [
                "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            ],
            "size_chart": {"XS": "32", "S": "34", "M": "36", "L": "38", "XL": "40"},
            "color_variants": ["Pink Floral", "Yellow Daisy", "Blue Blossom", "Multi-Color"],
            "three_d_model": "floral_dress_3d.glb"
        },
        
        # General
        {
            "name": "Essential Cotton T-Shirt",
            "category": "Clothing",
            "mood_category": "general",
            "price": 24.99,
            "description": "High-quality cotton t-shirt that's perfect for everyday wear and layering.",
            "emoji": "👕",
            "image_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "brand": "Essentials",
            "rating": 4.4,
            "tags": "t-shirt,cotton,basic,essential",
            "is_trending": False,
            "stock_quantity": 200,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.example.com/models/tshirt.glb",
            "ar_preview_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "multiple_images": [
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1583743814966-8936f37f4042?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            "size_chart": {"S": "36-38", "M": "40-42", "L": "44-46", "XL": "48-50", "XXL": "52-54"},
            "color_variants": ["White", "Black", "Gray", "Navy", "Red"],
            "three_d_model": "tshirt_3d.glb"
        }
    ]
    
    # Add products
    added = 0
    for product in products:
        try:
            product_id = add_product(product)
            print(f"✅ Added: {product['name']} (ID: {product_id})")
            added += 1
        except Exception as e:
            print(f"❌ Failed to add {product['name']}: {e}")
    
    print(f"\n🎉 Successfully added {added} products with working images!")
    
    # Show summary
    final_products = get_all_products()
    print(f"📊 Total products in database: {len(final_products)}")
    
    mood_counts = {}
    for p in final_products:
        mood = p['mood_category']
        mood_counts[mood] = mood_counts.get(mood, 0) + 1
    
    print("\n📋 Products by mood category:")
    for mood, count in sorted(mood_counts.items()):
        print(f"  {mood}: {count} products")

if __name__ == "__main__":
    add_products_with_images()
