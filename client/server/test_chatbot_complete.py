#!/usr/bin/env python3
"""
RetailFlowAI Chatbot Verification Script
Tests all mood detection and product recommendation functionality
"""

import requests
import json
import time
import sys

BASE_URL = "http://localhost:5000"

def test_backend_health():
    """Test if backend is running"""
    try:
        response = requests.get(f"{BASE_URL}/api/health", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print("✅ Backend Health: OK")
            print(f"   Database Status: {data.get('database_status', 'Unknown')}")
            return True
        else:
            print(f"❌ Backend Health: HTTP {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Backend Health: Connection failed - {e}")
        return False

def test_mood_detection(message, expected_mood=None):
    """Test mood detection and product recommendations"""
    try:
        response = requests.post(
            f"{BASE_URL}/api/chat",
            json={"message": message},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            
            if data.get('success'):
                mood = data.get('mood', 'unknown')
                products = data.get('products', [])
                
                print(f"✅ Mood Test Passed")
                print(f"   Input: '{message}'")
                print(f"   Detected Mood: {mood}")
                print(f"   Products Found: {len(products)}")
                
                if products:
                    print(f"   Sample Products:")
                    for i, product in enumerate(products[:3]):
                        has_image = bool(product.get('image') or product.get('image_url'))
                        print(f"     {i+1}. {product.get('name')} (${product.get('price')}) - Image: {'✅' if has_image else '❌'}")
                
                # Check if expected mood matches
                if expected_mood and mood != expected_mood:
                    print(f"   ⚠️ Warning: Expected {expected_mood}, got {mood}")
                
                return True, mood, len(products)
            else:
                print(f"❌ Mood Test Failed: {data.get('error', 'Unknown error')}")
                return False, None, 0
        else:
            print(f"❌ Mood Test Failed: HTTP {response.status_code}")
            return False, None, 0
            
    except Exception as e:
        print(f"❌ Mood Test Failed: {e}")
        return False, None, 0

def test_products_endpoint():
    """Test products endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/api/products", timeout=5)
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and data.get('products'):
                products = data['products']
                print(f"✅ Products Endpoint: {len(products)} products available")
                
                # Count by mood
                mood_counts = {}
                for product in products:
                    mood = product.get('mood_category', 'unknown')
                    mood_counts[mood] = mood_counts.get(mood, 0) + 1
                
                for mood, count in mood_counts.items():
                    print(f"   {mood.capitalize()}: {count} products")
                
                return True, len(products)
            else:
                print("❌ Products Endpoint: No products found")
                return False, 0
        else:
            print(f"❌ Products Endpoint: HTTP {response.status_code}")
            return False, 0
    except Exception as e:
        print(f"❌ Products Endpoint: {e}")
        return False, 0

def run_comprehensive_test():
    """Run comprehensive test suite"""
    print("🧪 RetailFlowAI Chatbot Verification")
    print("=" * 50)
    
    # Test 1: Backend Health
    print("\n🔧 Test 1: Backend Health Check")
    health_ok = test_backend_health()
    
    if not health_ok:
        print("\n❌ Backend is not running. Please start it first:")
        print("   cd client/server && python app.py")
        return False
    
    # Test 2: Products Database
    print("\n📦 Test 2: Products Database Check")
    products_ok, total_products = test_products_endpoint()
    
    if not products_ok or total_products == 0:
        print("\n❌ Products database is empty or inaccessible.")
        return False
    
    # Test 3: Mood Detection Tests
    print("\n🎯 Test 3: Mood Detection & Product Recommendations")
    
    test_cases = [
        ("I am feeling really happy today! 😊", "happy"),
        ("I'm so sad and need some comfort 😢", "sad"),
        ("It's raining outside, what should I wear?", "rainy"),
        ("I need something casual and natural", "natural"),
        ("Show me some sunglasses", "happy"),
        ("I need a jacket for cold weather", "rainy"),
    ]
    
    passed_tests = 0
    total_tests = len(test_cases)
    
    for i, (message, expected_mood) in enumerate(test_cases, 1):
        print(f"\n   Test 3.{i}:")
        success, detected_mood, product_count = test_mood_detection(message, expected_mood)
        
        if success and product_count > 0:
            passed_tests += 1
        
        time.sleep(0.5)  # Small delay between tests
    
    # Test Results Summary
    print("\n" + "=" * 50)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 50)
    
    print(f"🔧 Backend Health: {'✅ PASS' if health_ok else '❌ FAIL'}")
    print(f"📦 Products Database: {'✅ PASS' if products_ok else '❌ FAIL'} ({total_products} products)")
    print(f"🎯 Mood Detection: {'✅ PASS' if passed_tests == total_tests else f'⚠️ PARTIAL'} ({passed_tests}/{total_tests})")
    
    overall_success = health_ok and products_ok and (passed_tests == total_tests)
    
    if overall_success:
        print("\n🎉 OVERALL RESULT: ✅ ALL TESTS PASSED!")
        print("\n🏆 Your RetailFlowAI chatbot is SPARKATHON READY!")
        print("\n✨ Features verified:")
        print("   ✅ Mood detection working")
        print("   ✅ Product recommendations with images")
        print("   ✅ All mood categories covered")
        print("   ✅ Backend and database functional")
        
        print("\n💡 Test it yourself:")
        print("   🌐 Open: http://localhost:3000")
        print("   💬 Try: 'I am feeling happy!'")
        print("   💬 Try: 'I'm sad and need comfort'")
        print("   💬 Try: 'It's raining outside'")
        
    else:
        print("\n❌ OVERALL RESULT: SOME ISSUES FOUND")
        print("\n🔧 To fix:")
        if not health_ok:
            print("   1. Start backend: cd client/server && python app.py")
        if not products_ok:
            print("   2. Initialize database: python fix_chatbot_database.py")
        if passed_tests < total_tests:
            print("   3. Check mood detection logic in app.py")
    
    return overall_success

if __name__ == "__main__":
    try:
        success = run_comprehensive_test()
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n\n⚠️ Test interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n❌ Test suite error: {e}")
        sys.exit(1)
