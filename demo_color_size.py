#!/usr/bin/env python3
"""
Color and Size Demo - RetailFlowAI
Show off the enhanced database features
"""

import sqlite3
import json

def demo_color_size_features():
    """Demonstrate color and size features"""
    print("🎨 RETAILFLOWAI - COLOR & SIZE FEATURE DEMO")
    print("=" * 60)
    
    conn = sqlite3.connect('retailflow.db')
    cursor = conn.cursor()
    
    # Get all products with their color and size data
    cursor.execute("""
        SELECT id, name, category, price, colors, sizes, brand, rating, ar_enabled
        FROM products
        WHERE colors IS NOT NULL AND sizes IS NOT NULL
    """)
    
    products = cursor.fetchall()
    
    print(f"📦 Found {len(products)} products with color and size options")
    print()
    
    for i, product in enumerate(products, 1):
        product_id, name, category, price, colors_json, sizes_json, brand, rating, ar_enabled = product
        
        colors = json.loads(colors_json) if colors_json else []
        sizes = json.loads(sizes_json) if sizes_json else []
        
        print(f"{i}. {name} ({brand})")
        print(f"   📂 Category: {category}")
        print(f"   💰 Base Price: ${price}")
        print(f"   ⭐ Rating: {rating}/5")
        print(f"   🔮 AR Enabled: {'Yes' if ar_enabled else 'No'}")
        
        # Show colors
        print(f"   🎨 Colors ({len(colors)}):")
        for j, color in enumerate(colors[:4]):  # Show first 4 colors
            modifier = color.get('price_modifier', 0)
            modifier_str = f"+${modifier}" if modifier > 0 else f"${modifier}" if modifier < 0 else "No extra cost"
            print(f"      • {color['name']} ({color['hex']}) - {modifier_str}")
        
        if len(colors) > 4:
            print(f"      ... and {len(colors) - 4} more colors")
        
        # Show sizes
        print(f"   📏 Sizes ({len(sizes)}):")
        for j, size in enumerate(sizes[:4]):  # Show first 4 sizes
            modifier = size.get('price_modifier', 0)
            stock = size.get('stock', 0)
            modifier_str = f"+${modifier}" if modifier > 0 else f"${modifier}" if modifier < 0 else "No extra cost"
            print(f"      • {size['name']} - {modifier_str} (Stock: {stock})")
        
        if len(sizes) > 4:
            print(f"      ... and {len(sizes) - 4} more sizes")
        
        # Calculate price range
        color_mods = [c.get('price_modifier', 0) for c in colors]
        size_mods = [s.get('price_modifier', 0) for s in sizes]
        
        min_price = price + min(color_mods + size_mods)
        max_price = price + max(color_mods + size_mods)
        
        if min_price != max_price:
            print(f"   💰 Price Range: ${min_price:.2f} - ${max_price:.2f}")
        
        print()
    
    conn.close()
    
    # Show feature summary
    print("🌟 FEATURE SUMMARY:")
    print("=" * 40)
    print("✅ Multiple color variants for each product")
    print("✅ Size options with dynamic pricing")
    print("✅ Stock tracking for each size")
    print("✅ Price modifiers for premium colors/sizes")
    print("✅ AR visualization support")
    print("✅ Brand and rating information")
    print("✅ Category-based organization")
    
    print("\n🎯 USAGE IN YOUR APP:")
    print("• Users can select colors and see real-time price changes")
    print("• Size selection shows availability and pricing")
    print("• AR features work with all color variants")
    print("• Chatbot can recommend based on color/size preferences")
    print("• Analytics track which colors/sizes are most popular")
    
    print("\n🌐 Your app is ready at:")
    print("   Frontend: http://localhost:3000 or http://localhost:3001")
    print("   Backend API: http://localhost:5000")

if __name__ == "__main__":
    demo_color_size_features()
