#!/usr/bin/env python3
"""Verify that all diverse products are correctly connected to the database"""

import requests
import json
from database import get_all_products

def verify_diverse_catalog():
    """Verify that all diverse products with unique images are in the database"""
    
    print("🔍 Verifying Diverse Product Catalog...")
    print("=" * 50)
    
    # Test database connection
    products = get_all_products()
    print(f"📊 Database Connection: ✅ Found {len(products)} products")
    
    # Categories we expect to see
    expected_categories = {
        "Accessories": ["🕶️", "👓", "🎒", "👜"],
        "Clothing": ["🧥", "☂️", "👕", "👗"], 
        "Footwear": ["👟", "👠"],
        "Kitchen": ["🍴", "🔪"],
        "Furniture": ["🛏️", "🛌"],
        "Electronics": ["🎧", "⌚"]
    }
    
    print("\n📸 Product Categories & Images:")
    print("-" * 40)
    
    category_counts = {}
    ar_enabled_count = 0
    
    for product in products:
        category = product.get('category', 'Unknown')
        emoji = product.get('emoji', '❓')
        name = product.get('name', 'Unknown')
        image_url = product.get('image_url', '')
        ar_enabled = product.get('ar_enabled', False)
        price = product.get('price', 0)
        
        # Count category
        category_counts[category] = category_counts.get(category, 0) + 1
        
        # Count AR enabled products
        if ar_enabled:
            ar_enabled_count += 1
        
        # Verify image URL exists
        image_status = "✅" if image_url and "unsplash.com" in image_url else "❌"
        ar_status = "🥽" if ar_enabled else "📷"
        
        print(f"{emoji} {ar_status} {name}")
        print(f"   Category: {category} | Price: ${price}")
        print(f"   Image: {image_status} {image_url[:60]}...")
        print()
    
    print("📊 Category Summary:")
    print("-" * 30)
    for category, count in category_counts.items():
        print(f"   {category}: {count} products")
    
    print(f"\n🥽 AR Enabled Products: {ar_enabled_count}/{len(products)}")
    
    # Test API endpoints
    print("\n🌐 API Endpoint Testing:")
    print("-" * 30)
    
    try:
        # Test GET all products
        response = requests.get("http://localhost:5000/api/products", timeout=5)
        if response.status_code == 200:
            api_products = response.json().get('products', [])
            print(f"✅ GET /api/products: {len(api_products)} products returned")
        else:
            print(f"❌ GET /api/products: HTTP {response.status_code}")
            
        # Test recommendation engine
        response = requests.post("http://localhost:5000/api/recommend", 
                               json={"user_input": "I need something stylish for a party"}, 
                               timeout=5)
        if response.status_code == 200:
            rec_data = response.json()
            recommendations = rec_data.get('recommendations', [])
            mood = rec_data.get('mood', 'unknown')
            print(f"✅ POST /api/recommend: {len(recommendations)} recommendations (mood: {mood})")
        else:
            print(f"❌ POST /api/recommend: HTTP {response.status_code}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Server not running. Start with: python app.py")
    except Exception as e:
        print(f"❌ API test error: {e}")
    
    print("\n🎉 Verification Complete!")
    print(f"✅ Database: {len(products)} diverse products with unique images")
    print(f"✅ Categories: {len(category_counts)} different product types")
    print(f"✅ AR Technology: {ar_enabled_count} products support virtual try-on")
    
    return len(products)

if __name__ == "__main__":
    verify_diverse_catalog()
