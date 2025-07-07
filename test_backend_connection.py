import requests
import json

def test_backend():
    base_url = "http://localhost:5000"
    
    try:
        # Test basic connection
        response = requests.get(f"{base_url}/api/products")
        print(f"Products endpoint status: {response.status_code}")
        if response.status_code == 200:
            products = response.json()
            print(f"Found {len(products)} products")
        
        # Test chatbot endpoint
        chat_data = {"message": "I'm feeling happy"}
        response = requests.post(f"{base_url}/api/chat", 
                               json=chat_data,
                               headers={'Content-Type': 'application/json'})
        print(f"Chat endpoint status: {response.status_code}")
        if response.status_code == 200:
            chat_response = response.json()
            print(f"Chat response: {chat_response}")
        
        print("✅ Backend is running and accessible!")
        
    except requests.exceptions.ConnectionError:
        print("❌ Backend connection failed - server may not be running")
    except Exception as e:
        print(f"❌ Error testing backend: {e}")

if __name__ == "__main__":
    test_backend()
