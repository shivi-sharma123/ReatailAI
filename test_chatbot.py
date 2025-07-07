#!/usr/bin/env python3
"""
Quick test script to verify the chatbot is working
"""

import requests
import json

def test_chatbot():
    """Test the chatbot functionality"""
    print("🧪 Testing RetailFlowAI Chatbot...")
    
    # Test cases
    test_cases = [
        ("I feel happy", "happy"),
        ("I'm sad", "sad"), 
        ("rainy day", "rainy"),
        ("need sunglasses", "happy"),
        ("need coat", "rainy"),
        ("natural style", "natural")
    ]
    
    for user_input, expected_mood in test_cases:
        try:
            response = requests.post(
                'http://localhost:5000/api/chatbot',
                json={'message': user_input},
                timeout=5
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    mood = data.get('mood', 'unknown')
                    products = data.get('products', [])
                    print(f"✅ '{user_input}' → Mood: {mood}, Products: {len(products)}")
                else:
                    print(f"❌ '{user_input}' → Error: {data.get('error')}")
            else:
                print(f"❌ '{user_input}' → HTTP {response.status_code}")
                
        except requests.exceptions.ConnectionError:
            print(f"❌ '{user_input}' → Connection failed (server not running?)")
        except Exception as e:
            print(f"❌ '{user_input}' → Error: {e}")
    
    print("\n🔍 Testing product retrieval...")
    try:
        response = requests.get('http://localhost:5000/api/products', timeout=5)
        if response.status_code == 200:
            data = response.json()
            products = data.get('products', [])
            print(f"✅ Found {len(products)} products in database")
        else:
            print(f"❌ Failed to get products: HTTP {response.status_code}")
    except Exception as e:
        print(f"❌ Failed to get products: {e}")

if __name__ == "__main__":
    test_chatbot()
