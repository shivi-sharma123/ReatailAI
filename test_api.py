#!/usr/bin/env python3
"""
API Test - Check if backend is responding
"""
import requests
import json

def test_api():
    print("🔍 TESTING BACKEND API")
    print("=" * 40)
    
    try:
        # Test products endpoint
        print("Testing products endpoint...")
        response = requests.get('http://localhost:5000/api/products', timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                products = data
            elif isinstance(data, dict) and 'products' in data:
                products = data['products']
            else:
                products = []
            
            print(f"✅ Found {len(products)} products")
            
            # Show first product details
            if products:
                product = products[0]
                print(f"\nFirst Product:")
                print(f"  Name: {product.get('name', 'Unknown')}")
                print(f"  Price: ${product.get('price', 0)}")
                print(f"  Category: {product.get('category', 'Unknown')}")
                print(f"  Colors: {len(product.get('colors', []))}")
                print(f"  Sizes: {len(product.get('sizes', []))}")
                print(f"  AR Enabled: {product.get('ar_enabled', False)}")
            
            return True
        else:
            print(f"❌ API Error: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Connection Error: {e}")
        return False

if __name__ == "__main__":
    success = test_api()
    
    print("\n" + "=" * 40)
    if success:
        print("✅ Backend API is working!")
        print("🌐 API available at: http://localhost:5000")
        print("📦 Products endpoint: http://localhost:5000/api/products")
        print("🤖 Chatbot endpoint: http://localhost:5000/api/chatbot")
    else:
        print("❌ Backend API has issues")
    
    print("\n🌐 Access URLs:")
    print("   Frontend: http://localhost:3000")
    print("   Backend API: http://localhost:5000")
    print("   API Docs: http://localhost:5000/api/products")
