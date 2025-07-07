#!/usr/bin/env python3
"""
RetailFlowAI Startup Script
Initializes database, adds sample products, and starts the Flask server
"""

import os
import sys
from database import init_database, add_product, get_all_products

def setup_comprehensive_database():
    """Setup database with comprehensive product data"""
    
    print("🔧 Initializing RetailFlowAI database...")
    init_database()
    
    # Check if we already have products
    existing_products = get_all_products()
    if len(existing_products) > 10:
        print(f"✅ Database already has {len(existing_products)} products. Skipping setup.")
        return
    
    print("📦 Adding comprehensive product catalog...")
    
    # Comprehensive product data for all mood categories
    products = [
        # Rainy weather products
        {
            "name": "Waterproof Rain Jacket",
            "category": "Clothing",
            "mood_category": "rainy",
            "price": 89.99,
            "description": "Stay dry and stylish with this premium waterproof jacket",
            "emoji": "☂️",
            "image_url": "https://m.media-amazon.com/images/I/71J+9n+RJEL._AC_UX679_.jpg",
            "brand": "RainShield Pro",
            "rating": 4.8,
            "tags": "waterproof,jacket,rain,weather",
            "is_trending": True,
            "stock_quantity": 45,
            "ar_enabled": True,
            "ar_model_url": "https://ar-models.com/rain-jacket.glb",
            "ar_preview_url": "https://ar-preview.com/rain-jacket.jpg",
            "multiple_images": ["https://m.media-amazon.com/images/I/71J+9n+RJEL._AC_UX679_.jpg"],
            "size_chart": {"S": "36-38", "M": "40-42", "L": "44-46", "XL": "48-50"},
            "color_variants": ["Navy", "Black", "Yellow"],
            "three_d_model": "rain_jacket.glb"
        },
        
        # Sunny weather products
        {
            "name": "Premium UV Protection Sunglasses",
            "category": "Accessories",
            "mood_category": "sunny",
            "price": 79.99,
            "description": "High-quality sunglasses with 100% UV protection",
            "emoji": "🕶️",
            "image_url": "https://m.media-amazon.com/images/I/61HGpzQFEVL._AC_UX679_.jpg",
            "brand": "SunStyle Elite",
            "rating": 4.7,
            "tags": "sunglasses,UV,protection,summer",
            "is_trending": True,
            "stock_quantity": 80,
            "ar_enabled": True,
            "ar_model_url": "https://ar-models.com/sunglasses.glb",
            "ar_preview_url": "https://ar-preview.com/sunglasses.jpg",
            "multiple_images": ["https://m.media-amazon.com/images/I/61HGpzQFEVL._AC_UX679_.jpg"],
            "size_chart": {"One Size": "Universal"},
            "color_variants": ["Black", "Brown", "Gold", "Silver"],
            "three_d_model": "sunglasses.glb"
        },
        
        # Party mood products
        {
            "name": "Elegant Party Dress",
            "category": "Clothing",
            "mood_category": "party",
            "price": 149.99,
            "description": "Stunning dress perfect for any celebration",
            "emoji": "🎉",
            "image_url": "https://m.media-amazon.com/images/I/71H8VqHLHTL._AC_UX569_.jpg",
            "brand": "Party Perfect",
            "rating": 4.9,
            "tags": "dress,party,elegant,celebration",
            "is_trending": True,
            "stock_quantity": 25,
            "ar_enabled": True,
            "ar_model_url": "https://ar-models.com/party-dress.glb",
            "ar_preview_url": "https://ar-preview.com/party-dress.jpg",
            "multiple_images": ["https://m.media-amazon.com/images/I/71H8VqHLHTL._AC_UX569_.jpg"],
            "size_chart": {"XS": "32", "S": "34", "M": "36", "L": "38", "XL": "40"},
            "color_variants": ["Black", "Red", "Navy", "Emerald"],
            "three_d_model": "party_dress.glb"
        },
        
        # Comfort/sad mood products
        {
            "name": "Ultra Soft Comfort Hoodie",
            "category": "Clothing",
            "mood_category": "comfort",
            "price": 59.99,
            "description": "Incredibly soft hoodie for maximum comfort",
            "emoji": "🤗",
            "image_url": "https://m.media-amazon.com/images/I/71H9oQKMPnL._AC_UX679_.jpg",
            "brand": "CozyWear",
            "rating": 4.8,
            "tags": "comfort,soft,hoodie,cozy",
            "is_trending": False,
            "stock_quantity": 120,
            "ar_enabled": True,
            "ar_model_url": "https://ar-models.com/hoodie.glb",
            "ar_preview_url": "https://ar-preview.com/hoodie.jpg",
            "multiple_images": ["https://m.media-amazon.com/images/I/71H9oQKMPnL._AC_UX679_.jpg"],
            "size_chart": {"S": "36-38", "M": "40-42", "L": "44-46", "XL": "48-50"},
            "color_variants": ["Gray", "Navy", "Black", "Cream"],
            "three_d_model": "hoodie.glb"
        },
        
        # Energetic/fitness mood
        {
            "name": "Performance Running Shoes",
            "category": "Footwear",
            "mood_category": "energetic",
            "price": 129.99,
            "description": "High-performance shoes for active lifestyles",
            "emoji": "👟",
            "image_url": "https://m.media-amazon.com/images/I/71VhNtOfyNL._AC_UX679_.jpg",
            "brand": "SpeedRunner",
            "rating": 4.9,
            "tags": "running,shoes,performance,sports",
            "is_trending": True,
            "stock_quantity": 65,
            "ar_enabled": True,
            "ar_model_url": "https://ar-models.com/running-shoes.glb",
            "ar_preview_url": "https://ar-preview.com/running-shoes.jpg",
            "multiple_images": ["https://m.media-amazon.com/images/I/71VhNtOfyNL._AC_UX679_.jpg"],
            "size_chart": {"6": "6", "7": "7", "8": "8", "9": "9", "10": "10", "11": "11", "12": "12"},
            "color_variants": ["Black/White", "Blue/Orange", "Gray/Red"],
            "three_d_model": "running_shoes.glb"
        },
        
        # Casual mood
        {
            "name": "Classic Denim Jeans",
            "category": "Clothing",
            "mood_category": "casual",
            "price": 79.99,
            "description": "Perfect everyday jeans for casual comfort",
            "emoji": "👖",
            "image_url": "https://m.media-amazon.com/images/I/61U0XdRtlkL._AC_UX679_.jpg",
            "brand": "DenimCraft",
            "rating": 4.6,
            "tags": "jeans,casual,everyday,denim",
            "is_trending": False,
            "stock_quantity": 90,
            "ar_enabled": True,
            "ar_model_url": "https://ar-models.com/jeans.glb",
            "ar_preview_url": "https://ar-preview.com/jeans.jpg",
            "multiple_images": ["https://m.media-amazon.com/images/I/61U0XdRtlkL._AC_UX679_.jpg"],
            "size_chart": {"28": "28W", "30": "30W", "32": "32W", "34": "34W", "36": "36W"},
            "color_variants": ["Dark Blue", "Light Blue", "Black"],
            "three_d_model": "jeans.glb"
        },
        
        # Professional mood
        {
            "name": "Executive Business Suit",
            "category": "Clothing",
            "mood_category": "professional",
            "price": 299.99,
            "description": "Premium business suit for professional excellence",
            "emoji": "👔",
            "image_url": "https://m.media-amazon.com/images/I/71L+2DT6RyL._AC_UX679_.jpg",
            "brand": "Executive Elite",
            "rating": 4.9,
            "tags": "suit,business,professional,formal",
            "is_trending": True,
            "stock_quantity": 35,
            "ar_enabled": True,
            "ar_model_url": "https://ar-models.com/business-suit.glb",
            "ar_preview_url": "https://ar-preview.com/business-suit.jpg",
            "multiple_images": ["https://m.media-amazon.com/images/I/71L+2DT6RyL._AC_UX679_.jpg"],
            "size_chart": {"38": "38R", "40": "40R", "42": "42R", "44": "44R", "46": "46R"},
            "color_variants": ["Navy", "Charcoal", "Black"],
            "three_d_model": "business_suit.glb"
        },
        
        # Romantic mood
        {
            "name": "Romantic Evening Gown",
            "category": "Clothing",
            "mood_category": "romantic",
            "price": 199.99,
            "description": "Elegant gown perfect for romantic occasions",
            "emoji": "💖",
            "image_url": "https://m.media-amazon.com/images/I/71K7RfTYIkL._AC_UX679_.jpg",
            "brand": "Romance Couture",
            "rating": 4.8,
            "tags": "romantic,elegant,gown,date",
            "is_trending": True,
            "stock_quantity": 20,
            "ar_enabled": True,
            "ar_model_url": "https://ar-models.com/evening-gown.glb",
            "ar_preview_url": "https://ar-preview.com/evening-gown.jpg",
            "multiple_images": ["https://m.media-amazon.com/images/I/71K7RfTYIkL._AC_UX679_.jpg"],
            "size_chart": {"XS": "32", "S": "34", "M": "36", "L": "38"},
            "color_variants": ["Deep Red", "Midnight Blue", "Champagne"],
            "three_d_model": "evening_gown.glb"
        },
        
        # Happy mood
        {
            "name": "Bright Summer Dress",
            "category": "Clothing",
            "mood_category": "happy",
            "price": 69.99,
            "description": "Cheerful dress to brighten your day",
            "emoji": "😊",
            "image_url": "https://m.media-amazon.com/images/I/71mhNKBMeHL._AC_UX679_.jpg",
            "brand": "Sunshine Style",
            "rating": 4.7,
            "tags": "happy,bright,summer,cheerful",
            "is_trending": True,
            "stock_quantity": 75,
            "ar_enabled": True,
            "ar_model_url": "https://ar-models.com/summer-dress.glb",
            "ar_preview_url": "https://ar-preview.com/summer-dress.jpg",
            "multiple_images": ["https://m.media-amazon.com/images/I/71mhNKBMeHL._AC_UX679_.jpg"],
            "size_chart": {"XS": "32", "S": "34", "M": "36", "L": "38", "XL": "40"},
            "color_variants": ["Sunshine Yellow", "Coral Pink", "Sky Blue"],
            "three_d_model": "summer_dress.glb"
        },
        
        # General/bestsellers
        {
            "name": "Essential White T-Shirt",
            "category": "Clothing",
            "mood_category": "general",
            "price": 24.99,
            "description": "Classic white t-shirt, a wardrobe essential",
            "emoji": "👕",
            "image_url": "https://m.media-amazon.com/images/I/61Y8HKqDd5L._AC_UX679_.jpg",
            "brand": "Essentials",
            "rating": 4.5,
            "tags": "basic,essential,cotton,everyday",
            "is_trending": False,
            "stock_quantity": 200,
            "ar_enabled": True,
            "ar_model_url": "https://ar-models.com/white-tshirt.glb",
            "ar_preview_url": "https://ar-preview.com/white-tshirt.jpg",
            "multiple_images": ["https://m.media-amazon.com/images/I/61Y8HKqDd5L._AC_UX679_.jpg"],
            "size_chart": {"S": "36-38", "M": "40-42", "L": "44-46", "XL": "48-50"},
            "color_variants": ["White", "Black", "Gray"],
            "three_d_model": "white_tshirt.glb"
        }
    ]
    
    # Add products to database
    added_count = 0
    for product_data in products:
        try:
            product_id = add_product(product_data)
            print(f"✅ Added: {product_data['name']} (Mood: {product_data['mood_category']})")
            added_count += 1
        except Exception as e:
            print(f"❌ Failed to add {product_data['name']}: {e}")
    
    print(f"\n🎉 Successfully added {added_count} products to the database!")
    
    # Show final statistics
    final_products = get_all_products()
    mood_stats = {}
    for product in final_products:
        mood = product['mood_category']
        mood_stats[mood] = mood_stats.get(mood, 0) + 1
    
    print(f"\n📊 Database Summary:")
    print(f"Total products: {len(final_products)}")
    for mood, count in sorted(mood_stats.items()):
        print(f"  {mood}: {count} products")

def main():
    """Main startup function"""
    print("🚀 Starting RetailFlowAI Application...")
    print("="*50)
    
    # Setup database
    setup_comprehensive_database()
    
    print("\n" + "="*50)
    print("🎯 RetailFlowAI is ready!")
    print("📱 Frontend: http://localhost:3000")
    print("🖥️  Backend: http://localhost:5000")
    print("🛠️  Admin Panel: http://localhost:3000/admin")
    print("🤖 Chatbot supports these moods:")
    print("   • Rainy/Weather: 'It's raining', 'cold day'")
    print("   • Sunny: 'sunny day', 'beach time'")
    print("   • Party: 'going to party', 'celebration'")
    print("   • Professional: 'work meeting', 'office'")
    print("   • Comfort: 'feeling sad', 'need comfort'")
    print("   • Energetic: 'workout time', 'gym'")
    print("   • Casual: 'casual day', 'relaxing'")
    print("   • Romantic: 'date night', 'romantic dinner'")
    print("   • Happy: 'feeling great', 'excited'")
    print("   • General: any other input")
    print("="*50)
    
    # Start Flask app
    print("\n🔥 Starting Flask server...")
    from app import app
    app.run(debug=True, host='localhost', port=5000)

if __name__ == "__main__":
    main()
