import requests
import json

def test_delete_endpoint():
    """Test the delete product endpoint"""
    base_url = "http://localhost:5000"
    
    print("🧪 Testing Admin Panel DELETE functionality...")
    
    try:
        # First, get all products to find one to delete
        response = requests.get(f"{base_url}/api/products")
        if response.status_code == 200:
            data = response.json()
            products = data.get('products', [])
            
            if products:
                # Test delete on the last product (usually safest)
                test_product = products[-1]
                product_id = test_product['id']
                product_name = test_product['name']
                
                print(f"📦 Found test product: {product_name} (ID: {product_id})")
                
                # Test delete endpoint
                delete_response = requests.delete(f"{base_url}/api/products/{product_id}")
                
                if delete_response.status_code == 200:
                    delete_data = delete_response.json()
                    if delete_data.get('success'):
                        print(f"✅ DELETE endpoint working! Deleted: {product_name}")
                    else:
                        print(f"❌ DELETE failed: {delete_data.get('error')}")
                else:
                    print(f"❌ DELETE request failed with status: {delete_response.status_code}")
                    
            else:
                print("❌ No products found to test delete")
        else:
            print(f"❌ Failed to fetch products: {response.status_code}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Backend server not accessible. Make sure it's running on localhost:5000")
    except Exception as e:
        print(f"❌ Error testing delete: {e}")

def test_chatbot_endpoint():
    """Test the chatbot endpoint"""
    base_url = "http://localhost:5000"
    
    print("\n🤖 Testing Chatbot endpoint...")
    
    try:
        test_messages = [
            "I'm feeling happy",
            "I'm sad today", 
            "It's raining",
            "normal day"
        ]
        
        for message in test_messages:
            response = requests.post(f"{base_url}/api/chat", 
                                   json={"message": message},
                                   headers={'Content-Type': 'application/json'})
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    mood = data.get('mood')
                    products_count = len(data.get('products', []))
                    print(f"✅ '{message}' → Mood: {mood}, Products: {products_count}")
                else:
                    print(f"❌ Chatbot failed for '{message}': {data.get('error')}")
            else:
                print(f"❌ Chatbot request failed for '{message}': {response.status_code}")
                
    except Exception as e:
        print(f"❌ Error testing chatbot: {e}")

if __name__ == "__main__":
    test_delete_endpoint()
    test_chatbot_endpoint()
    print("\n🎉 Testing complete!")
