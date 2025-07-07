#!/usr/bin/env python3
"""Test the recommendation system with diverse products"""

import requests
import json

def test_recommendations():
    """Test various recommendation scenarios"""
    
    base_url = "http://localhost:5000"
    
    test_cases = [
        {
            "input": "I need stylish sunglasses for a sunny day",
            "expected_mood": "sunny",
            "expected_category": "Accessories"
        },
        {
            "input": "I want something fashionable for a party tonight",
            "expected_mood": "party", 
            "expected_category": "Clothing"
        },
        {
            "input": "I need comfortable shoes for running",
            "expected_mood": "energetic",
            "expected_category": "Footwear"
        },
        {
            "input": "I'm looking for kitchen utensils",
            "expected_mood": "general",
            "expected_category": "Kitchen"
        }
    ]
    
    print("🧪 Testing Recommendation System with Diverse Products")
    print("=" * 60)
    
    for i, test in enumerate(test_cases, 1):
        print(f"\n🔍 Test {i}: {test['input']}")
        print("-" * 40)
        
        try:
            response = requests.post(f"{base_url}/api/recommend", 
                                   json={"user_input": test['input']}, 
                                   timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                recommendations = data.get('recommendations', [])
                detected_mood = data.get('mood', 'unknown')
                
                print(f"✅ Detected Mood: {detected_mood}")
                print(f"✅ Found {len(recommendations)} recommendations")
                
                # Show first few recommendations
                for j, product in enumerate(recommendations[:3]):
                    emoji = product.get('emoji', '📦')
                    name = product.get('name', 'Unknown')
                    price = product.get('price', 0)
                    category = product.get('category', 'Unknown')
                    ar_status = "🥽" if product.get('ar_enabled') else "📷"
                    
                    print(f"   {j+1}. {emoji} {ar_status} {name}")
                    print(f"      Category: {category} | Price: ${price}")
                
            else:
                print(f"❌ HTTP Error: {response.status_code}")
                print(f"   Response: {response.text}")
                
        except Exception as e:
            print(f"❌ Error: {e}")
    
    print(f"\n🎉 Recommendation Testing Complete!")

if __name__ == "__main__":
    test_recommendations()
