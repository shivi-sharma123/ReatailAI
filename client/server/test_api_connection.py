import requests
import json

def test_api():
    """Test the Flask API endpoints"""
    base_url = "http://localhost:5000"
    
    print("🚀 Testing RetailFlowAI API...")
    
    try:
        # Test products endpoint
        print("\n📦 Testing products recommendation...")
        response = requests.post(f"{base_url}/api/recommend", 
                               json={"user_input": "I feel happy today"}, 
                               timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Products API working! Found {len(data.get('recommendations', []))} items")
            print(f"   Detected mood: {data.get('mood', 'unknown')}")
        else:
            print(f"❌ Products API error: {response.status_code}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to Flask server. Make sure it's running on port 5000")
        return False
    except Exception as e:
        print(f"❌ API test error: {e}")
        return False
    
    try:
        # Test admin products endpoint
        print("\n👤 Testing all products...")
        response = requests.get(f"{base_url}/api/products", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            products = data.get('products', [])
            print(f"✅ All Products API working! Found {len(products)} products in database")
            
            # Show first few products
            for i, product in enumerate(products[:3]):
                ar_status = "🥽" if product.get('ar_enabled') else "📷"
                print(f"   {i+1}. {ar_status} {product.get('name', 'Unknown')} - ${product.get('price', 0)}")
                
        else:
            print(f"❌ All Products API error: {response.status_code}")
            
    except Exception as e:
        print(f"❌ All Products API test error: {e}")
        
    return True
    
    print("\n🎉 API test completed!")
    return True

if __name__ == "__main__":
    test_api()
