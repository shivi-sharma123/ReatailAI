#!/usr/bin/env python3
"""
Test script to verify chatbot mood detection and product recommendations
"""

import requests
import json
import time

# Backend URL
BACKEND_URL = "http://localhost:5000"

def test_mood_input(message):
    """Test a specific mood input"""
    print(f"\n🧪 Testing: '{message}'")
    print("-" * 50)
    
    try:
        # Test smart-recommend endpoint first
        response = requests.post(f"{BACKEND_URL}/api/smart-recommend", 
                               json={"input": message, "preferences": {}}, 
                               timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and data.get('products'):
                print(f"✅ Smart-recommend worked!")
                print(f"📊 Analysis: {data.get('analysis', {})}")
                print(f"🛍️  Products: {len(data.get('products', []))} items")
                for product in data.get('products', [])[:3]:
                    print(f"   • {product.get('name')} - ${product.get('price')} ({product.get('category')})")
                return True
        
        # Fallback to regular chat endpoint
        response = requests.post(f"{BACKEND_URL}/api/chat", 
                               json={"message": message}, 
                               timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                print(f"✅ Regular chat worked!")
                print(f"🧠 Detected mood: {data.get('mood', 'unknown')}")
                print(f"💬 Response: {data.get('message', 'No message')[:100]}...")
                print(f"🛍️  Products: {len(data.get('products', []))} items")
                for product in data.get('products', [])[:3]:
                    print(f"   • {product.get('name')} - ${product.get('price')} ({product.get('category')})")
                return True
        
        print(f"❌ Both endpoints failed: {response.status_code}")
        print(f"Response: {response.text[:200]}...")
        return False
        
    except requests.exceptions.RequestException as e:
        print(f"❌ Connection error: {e}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

def test_health():
    """Test if backend is running"""
    try:
        response = requests.get(f"{BACKEND_URL}/api/health", timeout=5)
        if response.status_code == 200:
            print("✅ Backend is running!")
            return True
        else:
            print(f"⚠️  Backend returned: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Backend not accessible: {e}")
        return False

def main():
    print("🤖 RetailFlowAI Chatbot Mood Testing")
    print("=" * 60)
    
    # Check backend health
    if not test_health():
        print("❌ Cannot proceed - backend is not running!")
        print("💡 Please start the backend with: python client/server/app.py")
        return
    
    # Test different mood inputs
    test_cases = [
        "I'm feeling happy today!",
        "I'm sad and need comfort",
        "I need something for a rainy day",
        "Show me natural everyday clothes",
        "I'm going to a party tonight",
        "I need a jacket for cold weather",
        "Looking for sunglasses",
        "I'm tired and want something cozy",
        "Recommend something casual",
        "What do you have for BBQ party?"
    ]
    
    successful_tests = 0
    total_tests = len(test_cases)
    
    for test_case in test_cases:
        if test_mood_input(test_case):
            successful_tests += 1
        time.sleep(1)  # Small delay between tests
    
    print("\n" + "=" * 60)
    print(f"📊 Test Results: {successful_tests}/{total_tests} tests passed")
    
    if successful_tests == total_tests:
        print("🎉 All tests passed! Chatbot is working perfectly!")
    elif successful_tests > total_tests // 2:
        print("⚠️  Most tests passed, but some issues detected.")
    else:
        print("❌ Many tests failed. Chatbot needs fixing.")
    
    print("\n💡 Next: Test the frontend at http://localhost:3000")

if __name__ == "__main__":
    main()
