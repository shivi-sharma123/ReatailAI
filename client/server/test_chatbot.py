#!/usr/bin/env python3
"""Test the chatbot functionality directly"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import init_database, get_products_by_mood, add_product

def test_chatbot_functionality():
    """Test the core chatbot and database functionality"""
    
    print("🔧 Initializing database...")
    init_database()
    
    print("📦 Adding test products for all mood categories...")
    
    # Test products for each mood category
    test_products = [
        {
            "name": "Waterproof Rain Jacket",
            "category": "Clothing",
            "mood_category": "rainy",
            "price": 89.99,
            "description": "Stay dry with this waterproof jacket",
            "emoji": "☂️",
            "image_url": "https://example.com/rain-jacket.jpg",
            "brand": "RainShield",
            "rating": 4.8,
            "tags": "waterproof,jacket,rain",
            "is_trending": True,
            "stock_quantity": 50,
            "ar_enabled": True,
            "three_d_model": "jacket.glb"
        },
        {
            "name": "Bright Sunglasses",
            "category": "Accessories",
            "mood_category": "sunny",
            "price": 59.99,
            "description": "Protect your eyes in style",
            "emoji": "🕶️",
            "image_url": "https://example.com/sunglasses.jpg",
            "brand": "SunStyle",
            "rating": 4.6,
            "tags": "sunglasses,summer,protection",
            "is_trending": False,
            "stock_quantity": 100,
            "ar_enabled": True,
            "three_d_model": "sunglasses.glb"
        },
        {
            "name": "Party Dress",
            "category": "Clothing",
            "mood_category": "party",
            "price": 129.99,
            "description": "Perfect dress for celebrations",
            "emoji": "🎉",
            "image_url": "https://example.com/party-dress.jpg",
            "brand": "PartyWear",
            "rating": 4.9,
            "tags": "dress,party,celebration",
            "is_trending": True,
            "stock_quantity": 25,
            "ar_enabled": True,
            "three_d_model": "dress.glb"
        },
        {
            "name": "Cozy Blanket",
            "category": "Home",
            "mood_category": "comfort",
            "price": 39.99,
            "description": "Ultra soft comfort blanket",
            "emoji": "🛋️",
            "image_url": "https://example.com/blanket.jpg",
            "brand": "CozyHome",
            "rating": 4.7,
            "tags": "blanket,cozy,comfort",
            "is_trending": False,
            "stock_quantity": 75,
            "ar_enabled": False,
            "three_d_model": None
        },
        {
            "name": "Running Shoes",
            "category": "Footwear",
            "mood_category": "energetic",
            "price": 119.99,
            "description": "High-performance running shoes",
            "emoji": "👟",
            "image_url": "https://example.com/running-shoes.jpg",
            "brand": "RunFast",
            "rating": 4.8,
            "tags": "shoes,running,sports",
            "is_trending": True,
            "stock_quantity": 60,
            "ar_enabled": True,
            "three_d_model": "shoes.glb"
        },
        {
            "name": "Casual T-Shirt",
            "category": "Clothing",
            "mood_category": "casual",
            "price": 24.99,
            "description": "Comfortable everyday t-shirt",
            "emoji": "👕",
            "image_url": "https://example.com/tshirt.jpg",
            "brand": "CasualWear",
            "rating": 4.5,
            "tags": "tshirt,casual,everyday",
            "is_trending": False,
            "stock_quantity": 150,
            "ar_enabled": True,
            "three_d_model": "tshirt.glb"
        }
    ]
    
    for product in test_products:
        try:
            product_id = add_product(product)
            print(f"✅ Added: {product['name']} (ID: {product_id}, Mood: {product['mood_category']})")
        except Exception as e:
            print(f"❌ Failed to add {product['name']}: {e}")
    
    print("\n🧪 Testing mood detection and product retrieval...")
    
    # Test different mood inputs
    test_inputs = [
        ("I'm feeling sad", "comfort"),
        ("It's raining outside", "rainy"),
        ("Going to a party tonight", "party"),
        ("Beautiful sunny day", "sunny"),
        ("Need workout clothes", "energetic"),
        ("Just want something casual", "casual"),
        ("happy vibes", "happy"),
        ("random", "general")
    ]
    
    def analyze_mood_from_text(text):
        """Copy of the mood analysis function"""
        text = text.lower()
        
        if any(word in text for word in ['rainy', 'rain', 'wet', 'cold', 'winter']):
            return 'rainy'
        elif any(word in text for word in ['sunny', 'summer', 'hot', 'beach', 'vacation']):
            return 'sunny'
        elif any(word in text for word in ['party', 'celebration', 'fun', 'dancing']):
            return 'party'
        elif any(word in text for word in ['work', 'office', 'meeting', 'professional']):
            return 'professional'
        elif any(word in text for word in ['gym', 'workout', 'exercise', 'fitness', 'sport']):
            return 'energetic'
        elif any(word in text for word in ['casual', 'comfort', 'relax', 'home']):
            return 'casual'
        elif any(word in text for word in ['date', 'romantic', 'dinner', 'elegant']):
            return 'romantic'
        elif any(word in text for word in ['happy', 'joy', 'excited', 'great', 'awesome']):
            return 'happy'
        elif any(word in text for word in ['sad', 'down', 'blue', 'upset', 'tired']):
            return 'comfort'
        elif any(word in text for word in ['energy', 'active', 'motivated', 'pumped']):
            return 'energetic'
        
        return 'general'
    
    for user_input, expected_mood in test_inputs:
        detected_mood = analyze_mood_from_text(user_input)
        products = get_products_by_mood(detected_mood)
        
        print(f"\n📝 Input: '{user_input}'")
        print(f"🎯 Detected mood: {detected_mood}")
        print(f"🛍️ Found {len(products)} products:")
        
        for product in products[:3]:  # Show first 3 products
            trending = '🔥 ' if product.get('is_trending') else ''
            rating = f" ⭐{product.get('rating', 0)}/5" if product.get('rating') else ''
            stock = ' ⚠️ Low Stock' if product.get('stock_quantity', 0) < 10 else ''
            display = f"{trending}{product.get('emoji', '🛍️')} {product.get('name', 'Product')} - ${product.get('price', 0)}{rating}{stock}"
            print(f"  • {display}")
    
    print("\n🎉 Chatbot functionality test completed!")
    print("\n💡 To fix the connection issue:")
    print("1. Make sure Flask server is running on port 5000")
    print("2. Check that CORS is enabled for localhost:3000")
    print("3. Verify the API endpoint matches the frontend requests")

if __name__ == "__main__":
    test_chatbot_functionality()
