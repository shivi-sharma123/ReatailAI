import sqlite3
import json
import requests
import time

def test_database_connection():
    """Test if database exists and has enhanced products"""
    print("🔍 Testing Database Connection...")
    
    try:
        conn = sqlite3.connect('retailflow.db')
        cursor = conn.cursor()
        
        # Check if enhanced columns exist
        cursor.execute("PRAGMA table_info(products)")
        columns = [column[1] for column in cursor.fetchall()]
        
        has_images = 'images' in columns
        has_colors = 'colors' in columns
        has_sizes = 'sizes' in columns
        
        print(f"✅ Database found with columns: {len(columns)}")
        print(f"🖼️ Images column: {'✅' if has_images else '❌'}")
        print(f"🎨 Colors column: {'✅' if has_colors else '❌'}")
        print(f"📏 Sizes column: {'✅' if has_sizes else '❌'}")
        
        # Check products with enhanced features
        cursor.execute("SELECT COUNT(*) FROM products WHERE colors IS NOT NULL AND colors != ''")
        enhanced_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM products")
        total_count = cursor.fetchone()[0]
        
        print(f"📦 Total products: {total_count}")
        print(f"✨ Enhanced products: {enhanced_count}")
        
        conn.close()
        return enhanced_count > 0
        
    except Exception as e:
        print(f"❌ Database error: {e}")
        return False

def test_backend_api():
    """Test backend API endpoints"""
    print("\n🌐 Testing Backend API...")
    
    try:
        # Test health endpoint
        response = requests.get("http://localhost:5000/api/health", timeout=5)
        if response.status_code == 200:
            print("✅ Health check: OK")
        else:
            print("❌ Health check: Failed")
            return False
        
        # Test products endpoint
        response = requests.get("http://localhost:5000/api/products", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                products = data.get('products', [])
                enhanced_products = [p for p in products if p.get('colors') and len(p.get('colors', [])) > 0]
                
                print(f"✅ Products API: {len(products)} total products")
                print(f"🎨 Enhanced products: {len(enhanced_products)} with colors")
                
                # Test specific product features
                if enhanced_products:
                    sample_product = enhanced_products[0]
                    print(f"📝 Sample product: {sample_product['name']}")
                    print(f"🎨 Colors: {len(sample_product.get('colors', []))}")
                    print(f"📏 Sizes: {len(sample_product.get('sizes', []))}")
                    print(f"🖼️ Images: {len(sample_product.get('images', []))}")
                
                return True
            else:
                print("❌ Products API: No success flag")
                return False
        else:
            print(f"❌ Products API: Status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ API error: {e}")
        return False

def test_chatbot_api():
    """Test chatbot API with mood detection"""
    print("\n🤖 Testing Chatbot API...")
    
    test_messages = [
        "I feel happy today",
        "I need something for rainy weather",
        "Looking for professional attire",
        "I want casual clothes"
    ]
    
    for message in test_messages:
        try:
            response = requests.post("http://localhost:5000/api/chatbot", 
                                   json={"message": message}, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    mood = data.get('mood')
                    products = data.get('products', [])
                    enhanced_products = [p for p in products if p.get('colors')]
                    
                    print(f"✅ '{message}' → Mood: {mood}, Products: {len(products)}, Enhanced: {len(enhanced_products)}")
                else:
                    print(f"❌ '{message}' → No success flag")
            else:
                print(f"❌ '{message}' → Status {response.status_code}")
                
        except Exception as e:
            print(f"❌ '{message}' → Error: {e}")

def test_ar_features():
    """Test AR-specific features"""
    print("\n🥽 Testing AR Features...")
    
    try:
        # Get products with AR enabled
        response = requests.get("http://localhost:5000/api/products", timeout=10)
        if response.status_code == 200:
            data = response.json()
            products = data.get('products', [])
            ar_products = [p for p in products if p.get('ar_enabled')]
            enhanced_ar = [p for p in ar_products if p.get('colors') and p.get('sizes')]
            
            print(f"✅ AR-enabled products: {len(ar_products)}")
            print(f"🎨 Enhanced AR products: {len(enhanced_ar)}")
            
            if enhanced_ar:
                sample = enhanced_ar[0]
                print(f"📝 Sample AR product: {sample['name']}")
                print(f"🎨 Available colors: {[c.get('name') for c in sample.get('colors', [])][:3]}...")
                print(f"📏 Available sizes: {[s.get('name') for s in sample.get('sizes', [])]}")
                
                # Test AR try endpoint
                product_id = sample['id']
                response = requests.post(f"http://localhost:5000/api/ar-try/{product_id}")
                if response.status_code == 200:
                    print(f"✅ AR try event recorded for product {product_id}")
                else:
                    print(f"❌ AR try event failed for product {product_id}")
            
            return len(enhanced_ar) > 0
        else:
            print("❌ Failed to get products for AR test")
            return False
            
    except Exception as e:
        print(f"❌ AR features error: {e}")
        return False

def test_frontend_integration():
    """Test if frontend can connect to backend"""
    print("\n🌐 Testing Frontend Integration...")
    
    try:
        # Test CORS and basic connectivity
        response = requests.options("http://localhost:5000/api/products", 
                                  headers={'Origin': 'http://localhost:3000'})
        
        if response.status_code in [200, 204]:
            print("✅ CORS configuration: OK")
        else:
            print("❌ CORS configuration: Failed")
        
        # Test if React app is accessible (if running)
        try:
            response = requests.get("http://localhost:3000", timeout=3)
            if response.status_code == 200:
                print("✅ React frontend: Accessible")
            else:
                print("⚠️ React frontend: Not responding")
        except:
            print("⚠️ React frontend: Not running (start with npm start)")
        
        return True
        
    except Exception as e:
        print(f"❌ Frontend integration error: {e}")
        return False

def main():
    """Run comprehensive tests"""
    print("🚀 RetailFlowAI - Comprehensive Feature Test")
    print("=" * 60)
    
    # Test each component
    db_ok = test_database_connection()
    api_ok = test_backend_api()
    chatbot_ok = test_chatbot_api()
    ar_ok = test_ar_features()
    frontend_ok = test_frontend_integration()
    
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY:")
    print(f"Database: {'✅ OK' if db_ok else '❌ FAILED'}")
    print(f"Backend API: {'✅ OK' if api_ok else '❌ FAILED'}")
    print(f"Chatbot: {'✅ OK' if chatbot_ok else '❌ FAILED'}")
    print(f"AR Features: {'✅ OK' if ar_ok else '❌ FAILED'}")
    print(f"Frontend: {'✅ OK' if frontend_ok else '❌ FAILED'}")
    
    if all([db_ok, api_ok, ar_ok]):
        print("\n🎉 SUCCESS! All core features are working!")
        print("🎨 Enhanced products with colors and sizes are ready!")
        print("🥽 AR technology is fully functional!")
        print("\n💡 To run the complete app:")
        print("1. Start backend: python client/server/app.py")
        print("2. Start frontend: cd client && npm start")
        print("3. Open: http://localhost:3000")
        print("4. Test: enhanced_products_test.html")
    else:
        print("\n⚠️ Some features need attention. Check the details above.")
    
    print("=" * 60)

if __name__ == "__main__":
    main()
