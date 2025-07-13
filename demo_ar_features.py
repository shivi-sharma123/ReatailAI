"""
Demo script to test the Amazon-style search and AR functionality
"""
import requests
import json
import time

def test_search_functionality():
    """Test the search API endpoints"""
    base_url = "http://localhost:5000"
    
    print("🔍 Testing Search Functionality")
    print("=" * 50)
    
    # Test 1: Basic product search
    print("\n1. Testing basic product search...")
    try:
        response = requests.get(f"{base_url}/api/search/products", params={
            'q': 'phone',
            'limit': 5
        })
        if response.status_code == 200:
            data = response.json()
            if data['success']:
                print(f"✅ Found {len(data['data']['products'])} products matching 'phone'")
                for product in data['data']['products'][:3]:
                    print(f"   • {product['name']} - ${product['price']} ({product['brand']})")
            else:
                print(f"❌ Search failed: {data.get('error', 'Unknown error')}")
        else:
            print(f"❌ API Error: {response.status_code}")
    except Exception as e:
        print(f"❌ Connection Error: {e}")
    
    # Test 2: Category-specific search
    print("\n2. Testing category-specific search...")
    try:
        response = requests.get(f"{base_url}/api/search/products", params={
            'q': 'shoes',
            'category': 'Fashion',
            'limit': 5
        })
        if response.status_code == 200:
            data = response.json()
            if data['success']:
                print(f"✅ Found {len(data['data']['products'])} shoes in Fashion category")
                for product in data['data']['products'][:3]:
                    print(f"   • {product['name']} - ${product['price']} ({product['category']})")
            else:
                print(f"❌ Category search failed: {data.get('error', 'Unknown error')}")
        else:
            print(f"❌ API Error: {response.status_code}")
    except Exception as e:
        print(f"❌ Connection Error: {e}")
    
    # Test 3: Search suggestions
    print("\n3. Testing search suggestions...")
    try:
        response = requests.get(f"{base_url}/api/search/suggestions", params={
            'q': 'nike',
            'limit': 8
        })
        if response.status_code == 200:
            data = response.json()
            if data['success']:
                suggestions = data['data']['suggestions']
                products = data['data']['products']
                print(f"✅ Generated {len(suggestions)} search suggestions and {len(products)} product suggestions")
                print("   Search suggestions:")
                for suggestion in suggestions[:3]:
                    print(f"   • \"{suggestion['text']}\"")
                print("   Product suggestions:")
                for product in products[:3]:
                    print(f"   • {product['name']} - ${product['price']}")
            else:
                print(f"❌ Suggestions failed: {data.get('error', 'Unknown error')}")
        else:
            print(f"❌ API Error: {response.status_code}")
    except Exception as e:
        print(f"❌ Connection Error: {e}")
    
    # Test 4: Voice search
    print("\n4. Testing voice search...")
    try:
        response = requests.post(f"{base_url}/api/search/voice", json={
            'text': 'show me the best headphones under 300 dollars',
            'userId': 'demo_user'
        })
        if response.status_code == 200:
            data = response.json()
            if data['success']:
                intent = data['data']['intent']
                results_count = len(data['data']['results'])
                print(f"✅ Voice search processed with intent: '{intent}' - {results_count} results")
                print(f"   Response: \"{data['data']['response_text']}\"")
            else:
                print(f"❌ Voice search failed: {data.get('error', 'Unknown error')}")
        else:
            print(f"❌ API Error: {response.status_code}")
    except Exception as e:
        print(f"❌ Connection Error: {e}")

def test_product_apis():
    """Test product-related APIs"""
    base_url = "http://localhost:5000"
    
    print("\n\n🛍️ Testing Product APIs")
    print("=" * 50)
    
    # Test 1: Get enhanced products
    print("\n1. Testing enhanced products API...")
    try:
        response = requests.get(f"{base_url}/api/products/enhanced")
        if response.status_code == 200:
            data = response.json()
            if data['success']:
                products = data['data']
                print(f"✅ Retrieved {len(products)} enhanced products")
                
                # Show AR-enabled products
                ar_products = [p for p in products if p.get('ar_enabled')]
                print(f"   📱 {len(ar_products)} products have AR features enabled")
                
                # Show products with color options
                color_products = [p for p in products if p.get('colors')]
                print(f"   🎨 {len(color_products)} products have color customization")
                
                # Show sample product details
                if products:
                    sample = products[0]
                    print(f"\n   Sample Product: {sample['name']}")
                    print(f"   • Brand: {sample.get('brand', 'N/A')}")
                    print(f"   • Price: ${sample['price']}")
                    print(f"   • Rating: {sample.get('rating', 'N/A')} ⭐")
                    print(f"   • AR Enabled: {'Yes' if sample.get('ar_enabled') else 'No'}")
                    if sample.get('colors'):
                        color_names = [c.get('name', 'Unknown') for c in sample['colors']]
                        print(f"   • Colors: {', '.join(color_names)}")
            else:
                print(f"❌ Enhanced products failed: {data.get('error', 'Unknown error')}")
        else:
            print(f"❌ API Error: {response.status_code}")
    except Exception as e:
        print(f"❌ Connection Error: {e}")
    
    # Test 2: Test color options for a specific product
    print("\n2. Testing product color options...")
    try:
        # First get a product ID
        response = requests.get(f"{base_url}/api/products/enhanced")
        if response.status_code == 200:
            data = response.json()
            if data['success'] and data['data']:
                product_id = data['data'][0]['id']
                
                # Get colors for this product
                color_response = requests.get(f"{base_url}/api/products/{product_id}/colors")
                if color_response.status_code == 200:
                    color_data = color_response.json()
                    if color_data['success']:
                        colors = color_data['colors']
                        print(f"✅ Product {product_id} has {len(colors)} color options:")
                        for color in colors[:3]:
                            print(f"   • {color.get('name', 'Unknown')} ({color.get('hex', 'N/A')})")
                    else:
                        print(f"❌ Color options failed: {color_data.get('error', 'Unknown error')}")
                else:
                    print(f"❌ API Error: {color_response.status_code}")
            else:
                print("❌ No products available for color testing")
        else:
            print(f"❌ API Error: {response.status_code}")
    except Exception as e:
        print(f"❌ Connection Error: {e}")

def display_demo_instructions():
    """Display instructions for testing the AR features"""
    print("\n\n🥽 AR Feature Demo Instructions")
    print("=" * 50)
    print("1. Open your browser and go to: http://localhost:3000")
    print("2. Log in to the Walmart app")
    print("3. Try the enhanced search functionality:")
    print("   • Type 'phone' and see instant suggestions with images")
    print("   • Try 'nike shoes' for category-specific results")
    print("   • Search for 'headphones' and click on a product")
    print("\n4. Test the 3D AR Viewer:")
    print("   • Click the '🥽 AR View' button on any product")
    print("   • Use mouse to drag and rotate the 3D model")
    print("   • Scroll to zoom in/out")
    print("   • Try different color options to see real-time changes")
    print("   • Select different sizes and see price updates")
    print("   • Test the 'Try On' and 'Room View' modes")
    print("\n5. AR Features to explore:")
    print("   • 360° product rotation")
    print("   • Real-time color changing")
    print("   • Size selection with price updates")
    print("   • Interactive 3D shadows and highlights")
    print("   • Camera try-on simulation")
    print("   • Room placement preview")
    print("\n6. Search Features to test:")
    print("   • Instant suggestions as you type")
    print("   • Product images in search dropdown")
    print("   • Category filtering")
    print("   • Recent search history")
    print("   • Voice search integration")

def main():
    print("🚀 RetailFlowAI Demo - Amazon-Style Search & AR Features")
    print("=" * 60)
    
    # Test backend functionality
    test_search_functionality()
    test_product_apis()
    
    # Display demo instructions
    display_demo_instructions()
    
    print("\n" + "=" * 60)
    print("Demo completed! Your Amazon-style search with 3D AR is ready! 🎉")
    print("=" * 60)

if __name__ == "__main__":
    main()
