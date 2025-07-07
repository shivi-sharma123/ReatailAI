#!/usr/bin/env python3
"""Test the chatbot API directly"""

import requests
import json

def test_chatbot_api():
    """Test the chatbot API functionality"""
    
    # Test different mood inputs
    test_cases = [
        {"input": "I'm feeling sad", "expected_mood": "comfort"},
        {"input": "It's raining outside", "expected_mood": "rainy"},
        {"input": "Going to a party", "expected_mood": "party"},
        {"input": "Beautiful sunny day", "expected_mood": "sunny"},
        {"input": "Need workout clothes", "expected_mood": "energetic"},
        {"input": "Just want something casual", "expected_mood": "casual"},
        {"input": "Business meeting tomorrow", "expected_mood": "professional"},
        {"input": "Date night", "expected_mood": "romantic"},
        {"input": "Feeling happy", "expected_mood": "happy"},
        {"input": "Something random", "expected_mood": "general"}
    ]
    
    print("🧪 Testing RetailFlowAI Chatbot API")
    print("="*50)
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\n{i}. Testing: '{test_case['input']}'")
        
        try:
            # Make API request
            response = requests.post(
                'http://localhost:5000/api/products',
                headers={'Content-Type': 'application/json'},
                json={'mood': test_case['input']},
                timeout=5
            )
            
            if response.status_code == 200:
                data = response.json()
                detected_mood = data.get('mood', 'unknown')
                items = data.get('items', [])
                message = data.get('message', '')
                
                print(f"   ✅ API Response OK")
                print(f"   🎯 Detected Mood: {detected_mood}")
                print(f"   🛍️  Products Found: {len(items)}")
                print(f"   💬 Message: {message}")
                
                # Show first few products
                for j, item in enumerate(items[:3]):
                    if isinstance(item, dict):
                        print(f"      • {item.get('name', 'Product')} - ${item.get('price', 0)}")
                    else:
                        print(f"      • {item}")
                        
            else:
                print(f"   ❌ API Error: {response.status_code}")
                print(f"   📝 Response: {response.text}")
                
        except requests.exceptions.ConnectionError:
            print(f"   ❌ Connection Error: Flask server not running on port 5000")
        except Exception as e:
            print(f"   ❌ Error: {e}")
    
    print("\n" + "="*50)
    print("🎯 Test Summary:")
    print("• If you see connection errors, start the Flask server:")
    print("  python app.py")
    print("• If API responses are OK, the chatbot is working!")
    print("• Check the React frontend at http://localhost:3000")

if __name__ == "__main__":
    test_chatbot_api()
