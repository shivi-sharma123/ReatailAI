#!/usr/bin/env python3
"""Add real product images and enhanced AR data to the database"""

from database import init_database, add_product, get_all_products, delete_product

def clear_and_add_realistic_products():
    """Clear existing products and add realistic products with real images"""
    
    print("🔧 Initializing database with realistic product data...")
    init_database()
    
    # Clear existing products first
    existing_products = get_all_products()
    for product in existing_products:
        delete_product(product['id'])
    print(f"🗑️ Cleared {len(existing_products)} existing products")
    
    # Real product data with actual images
    realistic_products = [
        # Rainy Weather Products
        {
            "name": "Nike Windrunner Rain Jacket",
            "category": "Clothing",
            "mood_category": "rainy",
            "price": 129.99,
            "description": "Lightweight, packable rain jacket with Nike's signature style. Perfect for unpredictable weather.",
            "emoji": "☂️",
            "image_url": "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff7-4919-9aba-a77b174ee953/windrunner-jacket-8BwwRz.png",
            "brand": "Nike",
            "rating": 4.6,
            "tags": "waterproof,windproof,packable,nike",
            "is_trending": True,
            "stock_quantity": 45,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/jacket.glb",
            "ar_preview_url": "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/ar_preview_jacket.jpg",
            "multiple_images": [
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff7-4919-9aba-a77b174ee953/windrunner-jacket-8BwwRz.png",
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/side_view_jacket.jpg"
            ],
            "size_chart": {"S": "36-38", "M": "40-42", "L": "44-46", "XL": "48-50"},
            "color_variants": ["Black/White", "Navy/Gray", "Red/Black"],
            "three_d_model": "nike_windrunner.glb"
        },
        
        {
            "name": "Hunter Original Tall Rain Boots",
            "category": "Footwear", 
            "mood_category": "rainy",
            "price": 150.00,
            "description": "Iconic waterproof rain boots handcrafted from natural rubber. A British heritage brand.",
            "emoji": "🥾",
            "image_url": "https://cdn.shopify.com/s/files/1/0419/1525/products/1026875_1024x1024.jpg",
            "brand": "Hunter",
            "rating": 4.8,
            "tags": "waterproof,rubber,tall,classic",
            "is_trending": True,
            "stock_quantity": 30,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/boots.glb",
            "ar_preview_url": "https://cdn.shopify.com/ar/boots_preview.jpg",
            "multiple_images": [
                "https://cdn.shopify.com/s/files/1/0419/1525/products/1026875_1024x1024.jpg"
            ],
            "size_chart": {"6": "6", "7": "7", "8": "8", "9": "9", "10": "10"},
            "color_variants": ["Black", "Navy", "Green", "Red"],
            "three_d_model": "hunter_boots.glb"
        },

        # Sunny Weather Products
        {
            "name": "Ray-Ban Aviator Classic Sunglasses",
            "category": "Accessories",
            "mood_category": "sunny", 
            "price": 154.00,
            "description": "The original pilot sunglasses. Timeless style with superior sun protection.",
            "emoji": "🕶️",
            "image_url": "https://assets.ray-ban.com/is/image/RayBan/8056597139236_shad_qt.png",
            "brand": "Ray-Ban",
            "rating": 4.9,
            "tags": "aviator,classic,UV protection,pilot",
            "is_trending": True,
            "stock_quantity": 85,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/aviator.glb",
            "ar_preview_url": "https://assets.ray-ban.com/ar/aviator_preview.jpg",
            "multiple_images": [
                "https://assets.ray-ban.com/is/image/RayBan/8056597139236_shad_qt.png"
            ],
            "size_chart": {"One Size": "58mm"},
            "color_variants": ["Gold/Green", "Gold/Brown", "Silver/Gray"],
            "three_d_model": "rayban_aviator.glb"
        },

        {
            "name": "Patagonia Baggies Shorts 5\"",
            "category": "Clothing",
            "mood_category": "sunny",
            "price": 55.00,
            "description": "Versatile shorts perfect for beach, hiking, or casual summer days. Made with recycled materials.",
            "emoji": "🩱",
            "image_url": "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw04c3a9f1/images/hi-res/57021_SMDB.jpg",
            "brand": "Patagonia",
            "rating": 4.7,
            "tags": "shorts,summer,beach,sustainable",
            "is_trending": False,
            "stock_quantity": 120,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/shorts.glb",
            "ar_preview_url": "https://www.patagonia.com/ar/shorts_preview.jpg",
            "multiple_images": [
                "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw04c3a9f1/images/hi-res/57021_SMDB.jpg"
            ],
            "size_chart": {"S": "30-32", "M": "33-34", "L": "36-38", "XL": "40-42"},
            "color_variants": ["Navy", "Khaki", "Black", "Blue"],
            "three_d_model": "patagonia_shorts.glb"
        },

        # Party Products
        {
            "name": "Zara Sequin Party Dress",
            "category": "Clothing",
            "mood_category": "party",
            "price": 89.90,
            "description": "Stunning sequin dress perfect for parties and special occasions. Modern fit with elegant details.",
            "emoji": "✨",
            "image_url": "https://static.zara.net/photos///2023/V/0/1/p/4661/044/800/2/w/850/4661044800_6_1_1.jpg",
            "brand": "Zara",
            "rating": 4.5,
            "tags": "sequin,party,elegant,evening",
            "is_trending": True,
            "stock_quantity": 25,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/party_dress.glb",
            "ar_preview_url": "https://static.zara.net/ar/party_dress_preview.jpg",
            "multiple_images": [
                "https://static.zara.net/photos///2023/V/0/1/p/4661/044/800/2/w/850/4661044800_6_1_1.jpg"
            ],
            "size_chart": {"XS": "32", "S": "34", "M": "36", "L": "38", "XL": "40"},
            "color_variants": ["Black", "Gold", "Silver"],
            "three_d_model": "zara_sequin_dress.glb"
        },

        # Comfort Products
        {
            "name": "Champion Powersoft Fleece Hoodie",
            "category": "Clothing",
            "mood_category": "comfort",
            "price": 45.00,
            "description": "Ultra-soft fleece hoodie for maximum comfort. Perfect for lounging or casual wear.",
            "emoji": "🤗",
            "image_url": "https://www.champion.com/dw/image/v2/AAFS_PRD/on/demandware.static/-/Sites-champion-master-catalog/default/dw8c7f9e95/images/champion/GF89H/GF89H_Y05797_1.jpg",
            "brand": "Champion",
            "rating": 4.6,
            "tags": "hoodie,fleece,comfort,soft",
            "is_trending": False,
            "stock_quantity": 95,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/hoodie.glb",
            "ar_preview_url": "https://www.champion.com/ar/hoodie_preview.jpg",
            "multiple_images": [
                "https://www.champion.com/dw/image/v2/AAFS_PRD/on/demandware.static/-/Sites-champion-master-catalog/default/dw8c7f9e95/images/champion/GF89H/GF89H_Y05797_1.jpg"
            ],
            "size_chart": {"S": "36-38", "M": "40-42", "L": "44-46", "XL": "48-50"},
            "color_variants": ["Gray", "Navy", "Black", "Burgundy"],
            "three_d_model": "champion_hoodie.glb"
        },

        # Energetic/Fitness Products
        {
            "name": "Nike Air Zoom Pegasus 40",
            "category": "Footwear",
            "mood_category": "energetic",
            "price": 130.00,
            "description": "Responsive running shoe with Zoom Air technology. Perfect for daily runs and training.",
            "emoji": "👟",
            "image_url": "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7c5678e2-c876-4f3a-8b91-61c7dda4d346/air-zoom-pegasus-40-road-running-shoes-W5XSGw.png",
            "brand": "Nike",
            "rating": 4.8,
            "tags": "running,training,zoom air,performance",
            "is_trending": True,
            "stock_quantity": 75,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/running_shoes.glb",
            "ar_preview_url": "https://static.nike.com/ar/pegasus_preview.jpg",
            "multiple_images": [
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7c5678e2-c876-4f3a-8b91-61c7dda4d346/air-zoom-pegasus-40-road-running-shoes-W5XSGw.png"
            ],
            "size_chart": {"7": "7", "8": "8", "9": "9", "10": "10", "11": "11", "12": "12"},
            "color_variants": ["White/Blue", "Black/Red", "Gray/Orange"],
            "three_d_model": "nike_pegasus.glb"
        },

        # Casual Products
        {
            "name": "Levi's 501 Original Jeans",
            "category": "Clothing",
            "mood_category": "casual",
            "price": 89.50,
            "description": "The original jean. Iconic straight fit with timeless style and durability.",
            "emoji": "👖",
            "image_url": "https://lsco.scene7.com/is/image/lsco/005010114-front-pdp-lse",
            "brand": "Levi's",
            "rating": 4.7,
            "tags": "jeans,denim,classic,501",
            "is_trending": False,
            "stock_quantity": 150,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/jeans.glb",
            "ar_preview_url": "https://lsco.scene7.com/ar/jeans_preview.jpg",
            "multiple_images": [
                "https://lsco.scene7.com/is/image/lsco/005010114-front-pdp-lse"
            ],
            "size_chart": {"28": "28W", "30": "30W", "32": "32W", "34": "34W", "36": "36W"},
            "color_variants": ["Dark Blue", "Light Blue", "Black"],
            "three_d_model": "levis_501.glb"
        },

        # Professional Products
        {
            "name": "Hugo Boss Slim Fit Suit",
            "category": "Clothing",
            "mood_category": "professional",
            "price": 595.00,
            "description": "Modern slim-fit suit crafted from premium wool. Perfect for business and formal occasions.",
            "emoji": "👔",
            "image_url": "https://static.hugoboss.com/is/image/hugoboss/50438203_001_100",
            "brand": "Hugo Boss",
            "rating": 4.9,
            "tags": "suit,business,formal,wool",
            "is_trending": True,
            "stock_quantity": 20,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/suit.glb",
            "ar_preview_url": "https://static.hugoboss.com/ar/suit_preview.jpg",
            "multiple_images": [
                "https://static.hugoboss.com/is/image/hugoboss/50438203_001_100"
            ],
            "size_chart": {"38": "38R", "40": "40R", "42": "42R", "44": "44R"},
            "color_variants": ["Navy", "Charcoal", "Black"],
            "three_d_model": "hugo_boss_suit.glb"
        },

        # Romantic Products
        {
            "name": "Self Portrait Lace Midi Dress",
            "category": "Clothing",
            "mood_category": "romantic",
            "price": 340.00,
            "description": "Elegant lace midi dress with romantic details. Perfect for special occasions and date nights.",
            "emoji": "💕",
            "image_url": "https://selfportrait-us.imgix.net/spw/media/catalog/product/s/s/ss23-083n-black_1.jpg",
            "brand": "Self-Portrait",
            "rating": 4.8,
            "tags": "lace,romantic,midi,elegant",
            "is_trending": True,
            "stock_quantity": 15,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/lace_dress.glb",
            "ar_preview_url": "https://selfportrait-us.imgix.net/ar/lace_dress_preview.jpg",
            "multiple_images": [
                "https://selfportrait-us.imgix.net/spw/media/catalog/product/s/s/ss23-083n-black_1.jpg"
            ],
            "size_chart": {"XS": "32", "S": "34", "M": "36", "L": "38"},
            "color_variants": ["Black", "White", "Navy"],
            "three_d_model": "selfportrait_lace.glb"
        },

        # Happy Products
        {
            "name": "Staud Shirley Bag",
            "category": "Accessories",
            "mood_category": "happy",
            "price": 195.00,
            "description": "Cheerful beaded mini bag that adds a pop of color to any outfit. Handcrafted with attention to detail.",
            "emoji": "🌈",
            "image_url": "https://cdn.shopify.com/s/files/1/0062/0618/0887/products/STAUD_Shirley_Bag_Rainbow_Beaded_Front_1024x1024.jpg",
            "brand": "Staud",
            "rating": 4.6,
            "tags": "bag,beaded,colorful,mini",
            "is_trending": True,
            "stock_quantity": 35,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/beaded_bag.glb",
            "ar_preview_url": "https://cdn.shopify.com/ar/bag_preview.jpg",
            "multiple_images": [
                "https://cdn.shopify.com/s/files/1/0062/0618/0887/products/STAUD_Shirley_Bag_Rainbow_Beaded_Front_1024x1024.jpg"
            ],
            "size_chart": {"One Size": "Mini"},
            "color_variants": ["Rainbow", "Pink", "Blue", "Yellow"],
            "three_d_model": "staud_shirley.glb"
        },

        # General Products
        {
            "name": "Uniqlo Heattech Crew Neck T-Shirt",
            "category": "Clothing",
            "mood_category": "general",
            "price": 14.90,
            "description": "Essential crew neck t-shirt with Heattech technology. Soft, warm, and perfect for layering.",
            "emoji": "👕",
            "image_url": "https://im.uniqlo.com/global-cms/spa/res/media/catalog/product/4/2/429306.jpg",
            "brand": "Uniqlo",
            "rating": 4.5,
            "tags": "basic,essential,heattech,layering",
            "is_trending": False,
            "stock_quantity": 200,
            "ar_enabled": True,
            "ar_model_url": "https://cdn.shopify.com/3d/models/basic_tee.glb",
            "ar_preview_url": "https://im.uniqlo.com/ar/tshirt_preview.jpg",
            "multiple_images": [
                "https://im.uniqlo.com/global-cms/spa/res/media/catalog/product/4/2/429306.jpg"
            ],
            "size_chart": {"S": "36-38", "M": "40-42", "L": "44-46", "XL": "48-50"},
            "color_variants": ["White", "Black", "Gray", "Navy"],
            "three_d_model": "uniqlo_heattech.glb"
        }
    ]
    
    # Add products to database
    added_count = 0
    for product_data in realistic_products:
        try:
            product_id = add_product(product_data)
            print(f"✅ Added: {product_data['name']} (${product_data['price']})")
            added_count += 1
        except Exception as e:
            print(f"❌ Failed to add {product_data['name']}: {e}")
    
    print(f"\n🎉 Successfully added {added_count} realistic products!")
    
    # Show final statistics
    final_products = get_all_products()
    mood_stats = {}
    for product in final_products:
        mood = product['mood_category']
        mood_stats[mood] = mood_stats.get(mood, 0) + 1
    
    print(f"\n📊 Product Database Summary:")
    print(f"Total products: {len(final_products)}")
    for mood, count in sorted(mood_stats.items()):
        print(f"  {mood}: {count} products")

if __name__ == "__main__":
    clear_and_add_realistic_products()
