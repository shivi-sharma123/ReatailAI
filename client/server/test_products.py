#!/usr/bin/env python3
"""Test script to verify products in database"""

from database import get_all_products, get_products_by_mood

def test_database():
    print("🔍 Testing RetailFlow AI Database...")
    print("=" * 50)
    
    # Get all products
    all_products = get_all_products()
    print(f"📊 Total products in database: {len(all_products)}")
    
    # Test mood categories
    mood_categories = ['rainy', 'sunny', 'party', 'professional', 'fitness', 'casual', 'comfort', 'happy', 'energetic']
    
    for mood in mood_categories:
        products = get_products_by_mood(mood)
        print(f"🎭 {mood.capitalize()} mood: {len(products)} products")
    
    print("\n🛍️ Sample Products:")
    print("-" * 30)
    
    for i, product in enumerate(all_products[:5]):  # Show first 5 products
        ar_status = "🥽 AR Ready" if product.get('ar_enabled') else "❌ No AR"
        print(f"{i+1}. {product['emoji']} {product['name']}")
        print(f"   💰 ${product['price']} | ⭐ {product['rating']}/5 | {ar_status}")
        print(f"   📂 {product['category']} | 🎭 {product['mood_category']}")
        if product.get('image_url'):
            print(f"   🖼️ Has image: {product['image_url'][:50]}...")
        print()
    
    print("✅ Database test completed!")

if __name__ == "__main__":
    test_database()
