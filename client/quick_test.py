import requests
import json

def quick_test():
    print("🔍 Quick Backend Test...")
    
    try:
        # Test health endpoint
        response = requests.get("http://localhost:5000/api/health", timeout=5)
        if response.status_code == 200:
            print("✅ Backend server is running!")
            
            # Test products
            response = requests.get("http://localhost:5000/api/products", timeout=5)
            data = response.json()
            
            if data.get('success'):
                print(f"✅ Found {len(data['products'])} products in database")
                
                # Test chatbot
                response = requests.post("http://localhost:5000/api/chatbot", 
                                       json={"message": "I feel happy"}, 
                                       timeout=5)
                chatbot_data = response.json()
                
                if chatbot_data.get('success'):
                    print(f"✅ Chatbot working! Detected mood: {chatbot_data.get('mood')}")
                    print(f"✅ Suggested {len(chatbot_data.get('products', []))} products")
                    
                    print("\n🎉 ALL SYSTEMS WORKING!")
                    print("🌐 Frontend: http://localhost:3000")
                    print("🔧 Backend: http://localhost:5000")
                    
                else:
                    print("❌ Chatbot not responding")
            else:
                print("❌ Products API not working")
        else:
            print("❌ Backend server not responding")
            
    except Exception as e:
        print(f"❌ Connection error: {e}")
        print("Make sure both servers are running!")

if __name__ == "__main__":
    quick_test()
