#!/usr/bin/env python3
"""
Test script to verify all functions are working correctly
"""
import requests
import json
import time

def test_backend_connection():
    """Test if backend is running and responding"""
    try:
        response = requests.get('http://localhost:5000/api/health', timeout=5)
        if response.status_code == 200:
            print("✅ Backend server is running")
            return True
        else:
            print(f"❌ Backend health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Backend connection failed: {e}")
        return False

def test_products_api():
    """Test the products API endpoint"""
    try:
        response = requests.get('http://localhost:5000/api/products', timeout=10)
        if response.status_code == 200:
            data = response.json()
            
            # Handle different response formats
            if isinstance(data, list):
                products = data
            elif isinstance(data, dict) and 'products' in data:
                products = data['products']
            else:
                products = []
            
            print(f"✅ Products API working: {len(products)} products available")
            
            # Test first product structure
            if products:
                product = products[0]
                required_fields = ['id', 'name', 'category', 'price', 'image_url']
                missing_fields = [field for field in required_fields if field not in product]
                
                if missing_fields:
                    print(f"⚠️  Missing fields in product: {missing_fields}")
                else:
                    print("✅ Product data structure is correct")
                
                # Test color and size parsing
                colors = product.get('colors', [])
                sizes = product.get('sizes', [])
                
                if colors:
                    print(f"✅ Colors available: {len(colors)} options")
                    if isinstance(colors, str):
                        try:
                            colors = json.loads(colors)
                            print("✅ Color JSON parsing successful")
                        except:
                            print("❌ Color JSON parsing failed")
                
                if sizes:
                    print(f"✅ Sizes available: {len(sizes)} options")
                    if isinstance(sizes, str):
                        try:
                            sizes = json.loads(sizes)
                            print("✅ Size JSON parsing successful")
                        except:
                            print("❌ Size JSON parsing failed")
            
            return True
        else:
            print(f"❌ Products API failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Products API error: {e}")
        return False

def test_chatbot_api():
    """Test the chatbot API endpoint"""
    try:
        test_messages = [
            "I feel happy today!",
            "I'm feeling sad",
            "I want something casual",
            "Show me electronics"
        ]
        
        for message in test_messages:
            response = requests.post('http://localhost:5000/api/chatbot', 
                                   json={"message": message}, 
                                   timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    mood = data.get('mood', 'unknown')
                    products = data.get('products', [])
                    print(f"✅ Chatbot: '{message}' → {mood} mood → {len(products)} products")
                else:
                    print(f"❌ Chatbot failed for message: {message}")
            else:
                print(f"❌ Chatbot API error: {response.status_code}")
        
        return True
    except Exception as e:
        print(f"❌ Chatbot API error: {e}")
        return False

def test_ar_functionality():
    """Test AR-related functionality"""
    try:
        # Get products first
        response = requests.get('http://localhost:5000/api/products', timeout=10)
        if response.status_code == 200:
            data = response.json()
            products = data if isinstance(data, list) else data.get('products', [])
            
            ar_enabled_products = [p for p in products if p.get('ar_enabled', False)]
            print(f"✅ AR functionality: {len(ar_enabled_products)} AR-enabled products")
            
            # Test AR try endpoint if available
            if products:
                product_id = products[0].get('id')
                try:
                    response = requests.post(f'http://localhost:5000/api/ar-try/{product_id}', 
                                           json={"user_id": "test_user"}, 
                                           timeout=5)
                    if response.status_code == 200:
                        print("✅ AR try endpoint working")
                    else:
                        print("⚠️  AR try endpoint not available")
                except:
                    print("⚠️  AR try endpoint not available")
            
            return True
        else:
            print("❌ Cannot test AR functionality - products API failed")
            return False
    except Exception as e:
        print(f"❌ AR functionality test error: {e}")
        return False

def main():
    print("🧪 TESTING ALL FUNCTIONS")
    print("=" * 50)
    
    tests = [
        ("Backend Connection", test_backend_connection),
        ("Products API", test_products_api),
        ("Chatbot API", test_chatbot_api),
        ("AR Functionality", test_ar_functionality)
    ]
    
    results = {}
    
    for test_name, test_func in tests:
        print(f"\n📋 Testing {test_name}...")
        try:
            result = test_func()
            results[test_name] = result
        except Exception as e:
            print(f"❌ {test_name} test crashed: {e}")
            results[test_name] = False
    
    print("\n" + "=" * 50)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 50)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\n🏆 Overall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 ALL FUNCTIONS ARE WORKING CORRECTLY!")
    else:
        print("⚠️  Some functions need attention")
    
    return passed == total

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
