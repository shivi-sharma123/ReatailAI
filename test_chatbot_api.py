import requests
import json

def test_chatbot():
    url = "http://localhost:5000/api/chat"
    
    test_messages = [
        "I'm feeling happy",
        "I'm sad today", 
        "It's raining",
        "Normal day"
    ]
    
    for message in test_messages:
        print(f"\nTesting: '{message}'")
        try:
            response = requests.post(url, 
                                   json={"message": message},
                                   headers={'Content-Type': 'application/json'},
                                   timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Mood detected: {data.get('mood')}")
                print(f"✅ Products found: {len(data.get('products', []))}")
                
                # Show first product if available
                products = data.get('products', [])
                if products:
                    product = products[0]
                    print(f"✅ First product: {product.get('name')} - ${product.get('price')}")
                    print(f"✅ Image URL: {product.get('image_url', 'N/A')}")
                else:
                    print("❌ No products returned")
            else:
                print(f"❌ Error: {response.status_code} - {response.text}")
                
        except requests.exceptions.ConnectionError:
            print("❌ Connection failed - backend not running")
        except Exception as e:
            print(f"❌ Error: {e}")

if __name__ == "__main__":
    print("🧪 Testing Chatbot API...")
    test_chatbot()
