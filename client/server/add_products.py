#!/usr/bin/env python3
"""Add comprehensive product data to the database for all mood categories"""

from database import init_database, add_product, get_all_products

def add_comprehensive_products():
    """Add products for all mood categories"""
    
    # Initialize database first
    init_database()
    
    # Check existing products
    existing_products = get_all_products()
    existing_count = len(existing_products)
    print(f"Current products in database: {existing_count}")
    
    # Define comprehensive product data
    products_to_add = [
        # Happy mood products
        {
            "name": "Bright Yellow Sundress",
            "category": "Clothing",
            "mood_category": "happy",
            "price": 89.99,
            "description": "Cheerful yellow sundress perfect for sunny days",
            "emoji": "🌞",
            "image_url": "https://m.media-amazon.com/images/I/71mhNKBMeHL._AC_UX679_.jpg",
            "brand": "Happy Fashion",
            "rating": 4.7,
            "tags": "happy,summer,bright,cheerful",
            "is_trending": True,
            "stock_quantity": 75,
            "ar_enabled": True,
            "ar_model_url": "https://ar-models.com/sundress3d.glb",
            "ar_preview_url": "https://ar-preview.com/sundress-ar.jpg",
            "multiple_images": ["https://m.media-amazon.com/images/I/71mhNKBMeHL._AC_UX679_.jpg"],
            "size_chart": {"S": "32-34", "M": "36-38", "L": "40-42"},
            "color_variants": ["Yellow", "Pink", "Orange"],
            "three_d_model": "sundress_3d.glb"
        },
        
        # Comfort/Sad mood products
        {
            "name": "Ultra Soft Comfort Hoodie",
            "category": "Clothing",
            "mood_category": "comfort",
            "price": 69.99,
            "description": "Super soft hoodie for ultimate comfort and warmth",
            "emoji": "🤗",
            "image_url": "https://m.media-amazon.com/images/I/71H9oQKMPnL._AC_UX679_.jpg",
            "brand": "Cozy Wear",
            "rating": 4.9,
            "tags": "comfort,soft,warm,hoodie",
            "is_trending": True,
            "stock_quantity": 100,
            "ar_enabled": True,
            "ar_model_url": "https://ar-models.com/hoodie3d.glb",
            "ar_preview_url": "https://ar-preview.com/hoodie-ar.jpg",
            "multiple_images": ["https://m.media-amazon.com/images/I/71H9oQKMPnL._AC_UX679_.jpg"],
            "size_chart": {"S": "36-38", "M": "40-42", "L": "44-46", "XL": "48-50"},
            "color_variants": ["Gray", "Navy", "Black", "Cream"],
            "three_d_model": "hoodie_3d.glb"
        },
        
        # Casual mood products
        {
            "name": "Classic Denim Jeans",
            "category": "Clothing",
            "mood_category": "casual",
            "price": 79.99,
            "description": "Perfect everyday jeans for casual comfort",
            "emoji": "👖",
            "image_url": "https://m.media-amazon.com/images/I/61U0XdRtlkL._AC_UX679_.jpg",
            "brand": "Casual Co",
            "rating": 4.5,
            "tags": "casual,jeans,everyday,comfortable",
            "is_trending": False,
            "stock_quantity": 80,
            "ar_enabled": True,
            "ar_model_url": "https://ar-models.com/jeans3d.glb",
            "ar_preview_url": "https://ar-preview.com/jeans-ar.jpg",
            "multiple_images": ["https://m.media-amazon.com/images/I/61U0XdRtlkL._AC_UX679_.jpg"],
            "size_chart": {"28": "28W", "30": "30W", "32": "32W", "34": "34W", "36": "36W"},
            "color_variants": ["Blue", "Black", "Gray"],
            "three_d_model": "jeans_3d.glb"
        },
        
        # Romantic mood products
        {
            "name": "Elegant Red Evening Gown",
            "category": "Clothing",
            "mood_category": "romantic",
            "price": 199.99,
            "description": "Stunning red gown perfect for romantic occasions",
            "emoji": "❤️",
            "image_url": "https://m.media-amazon.com/images/I/71K7RfTYIkL._AC_UX679_.jpg",
            "brand": "Romance Couture",
            "rating": 4.8,
            "tags": "romantic,elegant,dress,evening",
            "is_trending": True,
            "stock_quantity": 30,
            "ar_enabled": True,
            "ar_model_url": "https://ar-models.com/gown3d.glb",
            "ar_preview_url": "https://ar-preview.com/gown-ar.jpg",
            "multiple_images": ["https://m.media-amazon.com/images/I/71K7RfTYIkL._AC_UX679_.jpg"],
            "size_chart": {"XS": "32", "S": "34", "M": "36", "L": "38", "XL": "40"},
            "color_variants": ["Red", "Black", "Navy", "Burgundy"],
            "three_d_model": "gown_3d.glb"
        },
        
        # Energetic mood products
        {
            "name": "High-Performance Running Shoes",
            "category": "Footwear",
            "mood_category": "energetic",
            "price": 129.99,
            "description": "Advanced running shoes for peak performance",
            "emoji": "⚡",
            "image_url": "https://m.media-amazon.com/images/I/71VhNtOfyNL._AC_UX679_.jpg",
            "brand": "Speed Runner",
            "rating": 4.9,
            "tags": "energetic,running,sports,performance",
            "is_trending": True,
            "stock_quantity": 60,
            "ar_enabled": True,
            "ar_model_url": "https://ar-models.com/shoes3d.glb",
            "ar_preview_url": "https://ar-preview.com/shoes-ar.jpg",
            "multiple_images": ["https://m.media-amazon.com/images/I/71VhNtOfyNL._AC_UX679_.jpg"],
            "size_chart": {"7": "7", "8": "8", "9": "9", "10": "10", "11": "11", "12": "12"},
            "color_variants": ["White/Blue", "Black/Red", "Gray/Orange"],
            "three_d_model": "shoes_3d.glb"
        },
        
        # General products
        {
            "name": "Classic White T-Shirt",
            "category": "Clothing",
            "mood_category": "general",
            "price": 24.99,
            "description": "Essential white t-shirt for everyday wear",
            "emoji": "👕",
            "image_url": "https://m.media-amazon.com/images/I/61Y8HKqDd5L._AC_UX679_.jpg",
            "brand": "Essentials",
            "rating": 4.6,
            "tags": "basic,essential,everyday,cotton",
            "is_trending": False,
            "stock_quantity": 200,
            "ar_enabled": True,
            "ar_model_url": "https://ar-models.com/tshirt3d.glb",
            "ar_preview_url": "https://ar-preview.com/tshirt-ar.jpg",
            "multiple_images": ["https://m.media-amazon.com/images/I/61Y8HKqDd5L._AC_UX679_.jpg"],
            "size_chart": {"S": "36-38", "M": "40-42", "L": "44-46", "XL": "48-50"},
            "color_variants": ["White", "Black", "Gray", "Navy"],
            "three_d_model": "tshirt_3d.glb"
        }
    ]
    
    # Add products to database
    added_count = 0
    for product_data in products_to_add:
        try:
            product_id = add_product(product_data)
            print(f"✅ Added product: {product_data['name']} (ID: {product_id})")
            added_count += 1
        except Exception as e:
            print(f"❌ Failed to add {product_data['name']}: {e}")
    
    print(f"\n🎉 Successfully added {added_count} new products!")
    
    # Show final count
    final_products = get_all_products()
    final_count = len(final_products)
    print(f"Total products in database: {final_count}")
    
    # Show products by mood category
    mood_categories = {}
    for product in final_products:
        mood = product['mood_category']
        if mood not in mood_categories:
            mood_categories[mood] = []
        mood_categories[mood].append(product['name'])
    
    print("\n📊 Products by mood category:")
    for mood, products in mood_categories.items():
        print(f"  {mood}: {len(products)} products")
        for product in products:
            print(f"    • {product}")

if __name__ == "__main__":
    add_comprehensive_products()
