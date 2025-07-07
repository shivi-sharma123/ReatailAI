import sqlite3
import requests
import json

def test_database():
    """Test database connection and content"""
    print("🔗 Testing Database Connection...")
    try:
        conn = sqlite3.connect('retailflow.db')
        cursor = conn.cursor()
        
        # Check products
        cursor.execute('SELECT COUNT(*) FROM products')
        product_count = cursor.fetchone()[0]
        print(f"✅ Database connected - {product_count} products found")
        
        # Check products with images
        cursor.execute('SELECT id, name, image_url FROM products WHERE image_url IS NOT NULL LIMIT 5')
        products = cursor.fetchall()
        print("\n📸 Products with images:")
        for product in products:
            print(f"   {product[1]} - {product[2][:50]}...")
        
        conn.close()
        return True
    except Exception as e:
        print(f"❌ Database error: {e}")
        return False

def test_backend_api():
    """Test backend API endpoints"""
    print("\n🔗 Testing Backend API...")
    base_url = "http://localhost:5000"
    
    try:
        # Test health endpoint
        response = requests.get(f"{base_url}/api/health", timeout=5)
        if response.status_code == 200:
            print("✅ Backend server is running")
        else:
            print(f"⚠️ Health check returned: {response.status_code}")
            return False
        
        # Test products endpoint
        response = requests.get(f"{base_url}/api/products", timeout=5)
        if response.status_code == 200:
            data = response.json()
            products = data.get('products', [])
            print(f"✅ Products API working - {len(products)} products retrieved")
            
            # Check if products have images
            products_with_images = [p for p in products if p.get('image_url')]
            print(f"📸 Products with images: {len(products_with_images)}")
            return True
        else:
            print(f"❌ Products API error: {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend server")
        print("   Make sure to start the Flask server first:")
        print("   cd client/server && python app.py")
        return False
    except Exception as e:
        print(f"❌ API error: {e}")
        return False

def test_chatbot_api():
    """Test chatbot functionality"""
    print("\n🤖 Testing Chatbot API...")
    try:
        response = requests.post(
            "http://localhost:5000/api/chatbot",
            json={"message": "I feel happy today"},
            timeout=5
        )
        
        if response.status_code == 200:
            data = response.json()
            products = data.get('products', [])
            mood = data.get('mood', 'unknown')
            print(f"✅ Chatbot API working - Detected mood: {mood}")
            print(f"📦 Returned {len(products)} product recommendations")
            
            # Check if products have images
            if products:
                sample_product = products[0]
                if sample_product.get('image_url'):
                    print(f"📸 Sample product image: {sample_product['image_url'][:50]}...")
            return True
        else:
            print(f"❌ Chatbot API error: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Chatbot error: {e}")
        return False

def main():
    print("🚀 RetailFlowAI Complete System Test")
    print("=" * 50)
    
    # Test database
    db_ok = test_database()
    
    # Test backend
    api_ok = test_backend_api()
    
    # Test chatbot
    chatbot_ok = test_chatbot_api()
    
    print("\n" + "=" * 50)
    print("📊 Test Results Summary:")
    print(f"   Database: {'✅ PASS' if db_ok else '❌ FAIL'}")
    print(f"   Backend API: {'✅ PASS' if api_ok else '❌ FAIL'}")
    print(f"   Chatbot: {'✅ PASS' if chatbot_ok else '❌ FAIL'}")
    
    if all([db_ok, api_ok, chatbot_ok]):
        print("\n🎉 ALL TESTS PASSED!")
        print("✅ Your RetailFlowAI system is fully functional")
        print("🌐 Frontend ready at: http://localhost:3000")
        print("🔗 Backend running at: http://localhost:5000")
    else:
        print("\n⚠️ Some tests failed. Check the errors above.")
        if not api_ok:
            print("💡 Start the backend server: python client/server/app.py")

if __name__ == "__main__":
    main()
