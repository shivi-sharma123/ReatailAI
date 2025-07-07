#!/usr/bin/env python3
"""Test AR data structure and API response"""

import requests
import json

def test_products_api():
    try:
        print("🧪 Testing Products API...")
        response = requests.get('http://localhost:5000/api/products')
        
        if response.status_code == 200:
            products = response.json()
            print(f"✅ API Response successful - Found {len(products)} products")
            print(f"📊 Raw products data: {products}")
            
            # Check first product structure
            if products and len(products) > 0:
                first_product = products[0]
                print(f"\n📦 First product: {first_product.get('name', 'Unknown')}")
                print(f"🔗 Image URL: {first_product.get('image_url', 'None')}")
                print(f"🎨 Colors: {first_product.get('colors', 'None')}")
                print(f"📏 Sizes: {first_product.get('sizes', 'None')}")
                print(f"🏷️ AR Ready: {first_product.get('ar_ready', 'None')}")
                
                # Check color data type
                colors = first_product.get('colors', [])
                if colors:
                    print(f"\n🎨 Color data type: {type(colors)}")
                    if isinstance(colors, list) and len(colors) > 0:
                        print(f"🎨 First color: {colors[0]}")
                        print(f"🎨 Color type: {type(colors[0])}")
                    elif isinstance(colors, str):
                        print(f"⚠️ Colors is string: {colors}")
                        try:
                            parsed_colors = json.loads(colors)
                            print(f"🔧 Parsed colors: {parsed_colors}")
                        except:
                            print(f"❌ Failed to parse colors string")
                
                # Check sizes data type
                sizes = first_product.get('sizes', [])
                if sizes:
                    print(f"\n📏 Size data type: {type(sizes)}")
                    if isinstance(sizes, list) and len(sizes) > 0:
                        print(f"📏 First size: {sizes[0]}")
                        print(f"📏 Size type: {type(sizes[0])}")
                    elif isinstance(sizes, str):
                        print(f"⚠️ Sizes is string: {sizes}")
                        try:
                            parsed_sizes = json.loads(sizes)
                            print(f"🔧 Parsed sizes: {parsed_sizes}")
                        except:
                            print(f"❌ Failed to parse sizes string")
        else:
            print(f"❌ API Error: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Error testing API: {e}")

if __name__ == "__main__":
    test_products_api()
