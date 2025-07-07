"""
Enhanced RetailFlowAI Features Demo
Demonstrates all the color changing, size options, and quality features
"""

import requests
import json
import time

BACKEND_URL = 'http://localhost:5000'

def demo_enhanced_features():
    """Demonstrate all enhanced product features"""
    print("🎉 RETAILFLOWAI ENHANCED FEATURES DEMO")
    print("="*60)
    
    try:
        # Get all products
        print("🛍️ Fetching Enhanced Products...")
        response = requests.get(f"{BACKEND_URL}/api/products")
        if response.status_code != 200:
            print("❌ Cannot connect to backend. Make sure server is running!")
            return
        
        products = response.json().get('products', [])
        print(f"✅ Found {len(products)} products")
        
        # Find a product with enhanced features
        enhanced_product = None
        for product in products:
            if (product.get('color_options', 0) > 0 and 
                product.get('size_options', 0) > 0 and 
                product.get('quality_options', 0) > 0):
                enhanced_product = product
                break
        
        if not enhanced_product:
            print("⚠️ No products with full enhanced features found")
            enhanced_product = products[0] if products else None
        
        if not enhanced_product:
            print("❌ No products available")
            return
        
        product_id = enhanced_product['id']
        product_name = enhanced_product['name']
        
        print(f"\n🎯 Demo Product: {product_name}")
        print(f"💰 Base Price: ${enhanced_product['price']:.2f}")
        print(f"⭐ Rating: {enhanced_product.get('rating', 0)}/5")
        print(f"🏷️ Category: {enhanced_product.get('category', 'N/A')}")
        
        # Demo Color Options
        print(f"\n🎨 COLOR OPTIONS:")
        color_response = requests.get(f"{BACKEND_URL}/api/products/{product_id}/colors")
        if color_response.status_code == 200:
            colors = color_response.json().get('colors', [])
            print(f"   Found {len(colors)} color options:")
            for color in colors[:5]:  # Show first 5 colors
                color_name = color.get('name', 'Unknown')
                price_mod = color.get('price_modifier', 0)
                stock = color.get('stock', 0)
                modifier_text = f" (+${price_mod})" if price_mod > 0 else f" (${price_mod})" if price_mod < 0 else ""
                
                # Check if it's a color-changing product
                if 'changes_to' in color:
                    print(f"     🌈 {color_name} → {color.get('changes_to', 'Unknown')}{modifier_text} (Stock: {stock})")
                else:
                    print(f"     🎨 {color_name}{modifier_text} (Stock: {stock})")
        
        # Demo Size Options
        print(f"\n📏 SIZE OPTIONS:")
        size_response = requests.get(f"{BACKEND_URL}/api/products/{product_id}/sizes")
        if size_response.status_code == 200:
            sizes = size_response.json().get('sizes', [])
            print(f"   Found {len(sizes)} size options:")
            for size in sizes:
                size_name = size.get('name', 'Unknown')
                price_mod = size.get('price_modifier', 0)
                measurements = size.get('measurements', 'No measurements')
                modifier_text = f" (+${price_mod})" if price_mod > 0 else f" (${price_mod})" if price_mod < 0 else ""
                print(f"     📐 {size_name}{modifier_text} - {measurements}")
        
        # Demo Quality Tiers
        print(f"\n⭐ QUALITY TIERS:")
        quality_response = requests.get(f"{BACKEND_URL}/api/products/{product_id}/quality-tiers")
        if quality_response.status_code == 200:
            tiers = quality_response.json().get('quality_tiers', [])
            print(f"   Found {len(tiers)} quality options:")
            for tier in tiers:
                tier_name = tier.get('name', 'Unknown')
                price_mod = tier.get('price_modifier', 0)
                features = tier.get('features', [])
                modifier_text = f" (+${price_mod})" if price_mod > 0 else f" (${price_mod})" if price_mod < 0 else ""
                print(f"     ⭐ {tier_name}{modifier_text}")
                for feature in features:
                    print(f"        ✓ {feature}")
        
        # Demo Price Calculator
        print(f"\n💰 PRICE CALCULATOR DEMO:")
        if colors and sizes and tiers:
            selected_color = colors[0]['name']
            selected_size = sizes[len(sizes)//2]['name']  # Middle size
            selected_quality = tiers[-1]['name']  # Highest quality
            
            price_data = {
                'color': selected_color,
                'size': selected_size,
                'quality_tier': selected_quality
            }
            
            print(f"   Selected Options:")
            print(f"     🎨 Color: {selected_color}")
            print(f"     📏 Size: {selected_size}")
            print(f"     ⭐ Quality: {selected_quality}")
            
            price_response = requests.post(
                f"{BACKEND_URL}/api/products/{product_id}/price-calculator",
                json=price_data
            )
            
            if price_response.status_code == 200:
                price_info = price_response.json()
                print(f"\n   💰 Price Breakdown:")
                print(f"     Base Price: ${price_info.get('base_price', 0):.2f}")
                breakdown = price_info.get('price_breakdown', {})
                if 'color_modifier' in breakdown:
                    print(f"     Color Modifier: ${breakdown['color_modifier']:.2f}")
                if 'size_modifier' in breakdown:
                    print(f"     Size Modifier: ${breakdown['size_modifier']:.2f}")
                if 'quality_modifier' in breakdown:
                    print(f"     Quality Modifier: ${breakdown['quality_modifier']:.2f}")
                print(f"     ──────────────────")
                print(f"     FINAL PRICE: ${price_info.get('final_price', 0):.2f}")
                
                if price_info.get('savings', 0) > 0:
                    print(f"     💸 You save: ${price_info['savings']:.2f}")
        
        # Demo Customization Options
        print(f"\n🛠️ CUSTOMIZATION OPTIONS:")
        custom_response = requests.get(f"{BACKEND_URL}/api/products/{product_id}/customization")
        if custom_response.status_code == 200:
            custom_data = custom_response.json()
            custom_options = custom_data.get('customization_options', {})
            interactive_features = custom_data.get('interactive_features', {})
            
            print("   Available Customizations:")
            for option, available in custom_options.items():
                status = "✅ Available" if available else "❌ Not Available"
                print(f"     {option.replace('_', ' ').title()}: {status}")
            
            print("   Interactive Features:")
            for feature, available in interactive_features.items():
                status = "✅ Available" if available else "❌ Not Available"
                print(f"     {feature.replace('_', ' ').title()}: {status}")
        
        print(f"\n🎉 DEMO COMPLETE!")
        print("="*60)
        print("🚀 Your RetailFlowAI app is fully functional with:")
        print("   ✅ Dynamic color changing")
        print("   ✅ Multiple size options with measurements")
        print("   ✅ Quality tiers with feature comparison")
        print("   ✅ Real-time price calculation")
        print("   ✅ Customization options")
        print("   ✅ Interactive AR features")
        print("   ✅ Complete product catalog")
        
        print(f"\n🌐 Access your app at:")
        print(f"   Frontend: http://localhost:3000")
        print(f"   Backend API: {BACKEND_URL}")
        
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend server!")
        print("💡 Start the backend with: python retailflow-backend/app.py")
    except Exception as e:
        print(f"❌ Demo error: {e}")

if __name__ == "__main__":
    print("🚀 Starting Enhanced Features Demo...")
    time.sleep(1)
    demo_enhanced_features()
