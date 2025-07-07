import requests
import json

try:
    # Test backend API
    response = requests.get('http://localhost:5000/api/products')
    
    if response.status_code == 200:
        data = response.json()
        products = data.get('products', [])
        
        if products:
            print("✅ Backend API working!")
            print(f"📦 Found {len(products)} products")
            
            # Check first product
            first_product = products[0]
            print(f"\n🔍 First product: {first_product['name']}")
            print(f"💰 Price: ${first_product['price']}")
            
            # Check colors format
            colors = first_product.get('colors')
            if colors:
                print(f"🎨 Colors type: {type(colors)}")
                if isinstance(colors, str):
                    try:
                        parsed_colors = json.loads(colors)
                        print(f"🎨 Colors (parsed): {len(parsed_colors)} colors")
                    except:
                        print("❌ Colors parsing failed")
                else:
                    print(f"🎨 Colors (direct): {len(colors)} colors")
            else:
                print("❌ No colors found")
                
            # Check sizes format
            sizes = first_product.get('sizes')
            if sizes:
                print(f"📏 Sizes type: {type(sizes)}")
                if isinstance(sizes, str):
                    try:
                        parsed_sizes = json.loads(sizes)
                        print(f"📏 Sizes (parsed): {len(parsed_sizes)} sizes")
                    except:
                        print("❌ Sizes parsing failed")
                else:
                    print(f"📏 Sizes (direct): {len(sizes)} sizes")
            else:
                print("❌ No sizes found")
                
        else:
            print("❌ No products found")
    else:
        print(f"❌ Backend API error: {response.status_code}")
        
except Exception as e:
    print(f"❌ Error: {e}")
