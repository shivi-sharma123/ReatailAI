#!/usr/bin/env python3
"""
Test script to verify chatbot database connectivity and products
"""

import requests
import json
import sys
import os

# Add server directory to path
sys.path.append('./client/server')

def test_backend_health():
    """Test if backend server is running"""
    try:
        response = requests.get('http://localhost:5000/api/health', timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Backend Health Check: {data.get('status', 'unknown')}")
            print(f"📊 Products in Database: {data.get('products_count', 0)}")
            return True
        else:
            print(f"❌ Backend Health Check Failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Cannot connect to backend: {e}")
        return False

def test_chatbot_moods():
    """Test chatbot with different moods"""
    test_messages = [
        "I feel happy",
        "I'm sad today",
        "It's a rainy day",
        "I need something natural",
        "Show me sunglasses",
        "I want a jacket"
    ]
    
    print("\n🤖 Testing Chatbot Responses:")
    print("="*50)
    
    for message in test_messages:
        try:
            response = requests.post(
                'http://localhost:5000/api/chat',
                json={'message': message},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    mood = data.get('mood', 'unknown')
                    products_count = len(data.get('products', []))
                    print(f"✅ '{message}' → Mood: {mood}, Products: {products_count}")
                    
                    # Show first product details if available
                    if products_count > 0:
                        first_product = data['products'][0]
                        print(f"   📦 Sample Product: {first_product.get('name', 'Unknown')} - ${first_product.get('price', 0)}")
                else:
                    print(f"❌ '{message}' → Error: {data.get('error', 'Unknown error')}")
            else:
                print(f"❌ '{message}' → HTTP {response.status_code}")
                
        except Exception as e:
            print(f"❌ '{message}' → Exception: {e}")
    
    print("="*50)

def test_database_directly():
    """Test database connection directly"""
    try:
        # Import from server directory
        from app import get_db_connection, get_products_by_mood
        
        print("\n💾 Testing Direct Database Access:")
        print("="*50)
        
        # Test database connection
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Count total products
        cursor.execute('SELECT COUNT(*) FROM products')
        total_products = cursor.fetchone()[0]
        print(f"📊 Total Products in Database: {total_products}")
        
        # Test products by mood
        moods = ['happy', 'sad', 'natural', 'rainy']
        for mood in moods:
            products = get_products_by_mood(mood)
            print(f"🎭 {mood.capitalize()} mood products: {len(products)}")
            if products:
                print(f"   📦 Example: {products[0]['name']} - ${products[0]['price']}")
        
        conn.close()
        print("✅ Direct database access successful!")
        
    except Exception as e:
        print(f"❌ Direct database test failed: {e}")

def main():
    """Run all tests"""
    print("🔍 RetailFlowAI Chatbot Database Connectivity Test")
    print("="*60)
    
    # Test 1: Backend Health
    if not test_backend_health():
        print("\n⚠️  Backend server is not running. Please start it first:")
        print("   python client/server/app.py")
        return
    
    # Test 2: Chatbot API
    test_chatbot_moods()
    
    # Test 3: Direct Database Access
    test_database_directly()
    
    print("\n🎉 All tests completed!")
    print("\n💡 If you see products for each mood, your chatbot database is working perfectly!")
    print("🌐 Access your app at: http://localhost:3000")

if __name__ == "__main__":
    main()
