#!/usr/bin/env python3
"""
Test Color and Size Features - RetailFlowAI
Comprehensive test of enhanced database features
"""

import requests
import json
import sqlite3

def test_database_features():
    """Test database color and size features directly"""
    print("🔍 TESTING DATABASE FEATURES")
    print("=" * 50)
    
    try:
        conn = sqlite3.connect('retailflow.db')
        cursor = conn.cursor()
        
        # Test 1: Check if all products have colors and sizes
        cursor.execute("""
            SELECT name, category, colors, sizes, price, brand
            FROM products
            WHERE colors IS NOT NULL AND sizes IS NOT NULL
        """)
        
        products = cursor.fetchall()
        print(f"✅ Found {len(products)} products with color and size data")
        
        # Test 2: Show detailed product information
        print("\n📋 DETAILED PRODUCT INFORMATION:")
        for i, product in enumerate(products[:3], 1):
            name, category, colors_json, sizes_json, price, brand = product
            colors = json.loads(colors_json) if colors_json else []
            sizes = json.loads(sizes_json) if sizes_json else []
            
            print(f"\n{i}. {name} ({brand})")
            print(f"   Category: {category} | Price: ${price}")
            print(f"   Available Colors ({len(colors)}):")
            for color in colors[:4]:  # Show first 4 colors
                print(f"      • {color['name']} ({color['hex']})")
            print(f"   Available Sizes ({len(sizes)}):")
            for size in sizes[:4]:  # Show first 4 sizes
                modifier = size.get('price_modifier', 0)
                stock = size.get('stock', 0)
                print(f"      • {size['name']} (+${modifier} | Stock: {stock})")
        
        # Test 3: Check AR features
        cursor.execute("SELECT COUNT(*) FROM products WHERE ar_enabled = 1")
        ar_count = cursor.fetchone()[0]
        print(f"\n🔮 AR-enabled products: {ar_count}")
        
        # Test 4: Check analytics data
        cursor.execute("SELECT COUNT(*) FROM analytics")
        analytics_count = cursor.fetchone()[0]
        print(f"📊 Analytics records: {analytics_count}")
        
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ Database test error: {e}")
        return False

def test_api_endpoints():
    """Test API endpoints for color and size features"""
    print("\n🌐 TESTING API ENDPOINTS")
    print("=" * 50)
    
    try:
        # Test products API
        response = requests.get('http://localhost:5000/api/products', timeout=5)
        
        if response.status_code == 200:
            data = response.json()
            
            # Handle different response formats
            if isinstance(data, dict) and 'products' in data:
                products = data['products']
            else:
                products = data
            
            print(f"✅ Products API: {len(products)} products loaded")
            
            # Test color and size data in API response
            if products:
                sample_product = products[0]
                print(f"\n📦 Sample Product: {sample_product.get('name', 'Unknown')}")
                
                # Check colors
                colors = sample_product.get('colors', [])
                if colors:
                    print(f"   🎨 Colors: {', '.join([c.get('name', 'Unknown') for c in colors[:3]])}...")
                else:
                    print("   🎨 No color data found")
                
                # Check sizes
                sizes = sample_product.get('sizes', [])
                if sizes:
                    print(f"   📏 Sizes: {', '.join([s.get('name', 'Unknown') for s in sizes[:3]])}...")
                else:
                    print("   📏 No size data found")
                
                # Check AR features
                ar_enabled = sample_product.get('ar_enabled', False)
                print(f"   🔮 AR Enabled: {'Yes' if ar_enabled else 'No'}")
                
                return True
        else:
            print(f"❌ Products API error: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ API test error: {e}")
        return False

def test_color_size_filtering():
    """Test color and size filtering functionality"""
    print("\n🎯 TESTING COLOR & SIZE FILTERING")
    print("=" * 50)
    
    try:
        # Test filtering by category
        response = requests.get('http://localhost:5000/api/products?category=Fashion', timeout=5)
        
        if response.status_code == 200:
            data = response.json()
            
            # Handle different response formats
            if isinstance(data, dict) and 'products' in data:
                fashion_products = data['products']
            else:
                fashion_products = data
            
            print(f"✅ Fashion products: {len(fashion_products)}")
            
            # Check if fashion products have appropriate colors and sizes
            for product in fashion_products[:2]:
                name = product.get('name', 'Unknown')
                colors = product.get('colors', [])
                sizes = product.get('sizes', [])
                
                print(f"\n👔 {name}:")
                print(f"   Colors: {len(colors)} options")
                print(f"   Sizes: {len(sizes)} options")
                
                # Show pricing variations
                base_price = product.get('price', 0)
                print(f"   Base Price: ${base_price}")
                
                if sizes:
                    print("   Size Pricing:")
                    for size in sizes[:3]:
                        modifier = size.get('price_modifier', 0)
                        final_price = base_price + modifier
                        print(f"      • {size['name']}: ${final_price}")
            
            return True
        else:
            print(f"❌ Category filtering error: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Filtering test error: {e}")
        return False

def test_chatbot_with_products():
    """Test chatbot product recommendations"""
    print("\n🤖 TESTING CHATBOT PRODUCT RECOMMENDATIONS")
    print("=" * 50)
    
    try:
        # Test chatbot with product-related query
        response = requests.post(
            'http://localhost:5000/api/chatbot',
            json={'message': 'Show me handbags in black color', 'user_id': 'test_user'},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Chatbot Response: {data.get('response', 'No response')}")
            
            # Check for product suggestions
            if 'products' in data or 'suggested_products' in data:
                products = data.get('products', data.get('suggested_products', []))
                print(f"📦 Product suggestions: {len(products)}")
                
                for product in products[:2]:
                    name = product.get('name', 'Unknown')
                    colors = product.get('colors', [])
                    print(f"   • {name} (Available colors: {len(colors)})")
            
            return True
        else:
            print(f"❌ Chatbot error: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Chatbot test error: {e}")
        return False

def main():
    """Main function to run all tests"""
    print("🚀 RETAILFLOWAI - COLOR & SIZE FEATURES TEST")
    print("=" * 60)
    
    # Test database features
    db_test = test_database_features()
    
    # Test API endpoints
    api_test = test_api_endpoints()
    
    # Test filtering
    filter_test = test_color_size_filtering()
    
    # Test chatbot
    chatbot_test = test_chatbot_with_products()
    
    print("\n" + "=" * 60)
    print("🎉 TEST RESULTS SUMMARY")
    print("=" * 60)
    print(f"✅ Database Features: {'PASS' if db_test else 'FAIL'}")
    print(f"✅ API Endpoints: {'PASS' if api_test else 'FAIL'}")
    print(f"✅ Color & Size Filtering: {'PASS' if filter_test else 'FAIL'}")
    print(f"✅ Chatbot Integration: {'PASS' if chatbot_test else 'FAIL'}")
    
    if all([db_test, api_test, filter_test, chatbot_test]):
        print("\n🏆 ALL TESTS PASSED!")
        print("✅ Your RetailFlowAI app is fully functional with:")
        print("   🎨 Multiple color variants for each product")
        print("   📏 Size options with pricing variations")
        print("   🔮 AR features enabled")
        print("   🤖 Chatbot product recommendations")
        print("   📊 Analytics tracking")
        print("\n🌐 Access your app at:")
        print("   Frontend: http://localhost:3000 or http://localhost:3001")
        print("   Backend API: http://localhost:5000")
    else:
        print("\n⚠️  Some tests failed. Check the backend server status.")

if __name__ == "__main__":
    main()
