#!/usr/bin/env python3
"""
Test Color Filtering and Product Diversity
This script tests the functionality and verifies unique products
"""

import sqlite3
import json

def test_products_and_colors():
    """Test that we have unique products and proper color data"""
    
    conn = sqlite3.connect('products.db')
    cursor = conn.cursor()
    
    print("🧪 TESTING PRODUCT DIVERSITY AND COLOR FUNCTIONALITY")
    print("=" * 60)
    
    # Test 1: Check product uniqueness
    cursor.execute('SELECT id, name, category FROM products ORDER BY category, name')
    products = cursor.fetchall()
    
    print("📊 PRODUCT DIVERSITY TEST:")
    categories = {}
    for product_id, name, category in products:
        if category not in categories:
            categories[category] = []
        categories[category].append(name)
    
    for category, names in categories.items():
        print(f"\n🏷️ {category.upper()} ({len(names)} products):")
        for name in names:
            print(f"  ✨ {name}")
        
        # Check for duplicates
        if len(names) != len(set(names)):
            print(f"  ⚠️ WARNING: Duplicate products found in {category}!")
        else:
            print(f"  ✅ All products in {category} are unique!")
    
    # Test 2: Check color data quality
    print(f"\n🌈 COLOR DATA TEST:")
    cursor.execute('SELECT id, name, colors FROM products WHERE colors IS NOT NULL')
    products_with_colors = cursor.fetchall()
    
    for product_id, name, colors_json in products_with_colors:
        try:
            colors = json.loads(colors_json)
            print(f"\n🎨 {name}:")
            print(f"  Colors available: {len(colors)}")
            
            for color in colors[:3]:  # Show first 3 colors
                print(f"    • {color['name']} ({color['hex']}) ${color.get('price_modifier', 0):+}")
            
            if len(colors) > 3:
                print(f"    ... and {len(colors) - 3} more colors")
                
        except json.JSONDecodeError:
            print(f"  ❌ Invalid color data for {name}")
    
    # Test 3: Check size data quality
    print(f"\n📏 SIZE DATA TEST:")
    cursor.execute('SELECT id, name, sizes FROM products WHERE sizes IS NOT NULL')
    products_with_sizes = cursor.fetchall()
    
    for product_id, name, sizes_json in products_with_sizes:
        try:
            sizes = json.loads(sizes_json)
            print(f"\n📐 {name}:")
            print(f"  Sizes available: {len(sizes)}")
            
            for size in sizes[:3]:  # Show first 3 sizes
                print(f"    • {size['name']} (${size.get('price_modifier', 0):+}) - {size.get('measurements', 'N/A')}")
            
            if len(sizes) > 3:
                print(f"    ... and {len(sizes) - 3} more sizes")
                
        except json.JSONDecodeError:
            print(f"  ❌ Invalid size data for {name}")
    
    # Test 4: Summary
    total_products = len(products)
    unique_categories = len(categories)
    
    print(f"\n📋 SUMMARY:")
    print(f"  ✅ Total Products: {total_products}")
    print(f"  ✅ Categories: {unique_categories}")
    print(f"  ✅ Average per category: {total_products/unique_categories:.1f}")
    print(f"  ✅ Products with colors: {len(products_with_colors)}")
    print(f"  ✅ Products with sizes: {len(products_with_sizes)}")
    
    # Test 5: Verify AR enablement
    cursor.execute('SELECT COUNT(*) FROM products WHERE ar_enabled = 1')
    ar_enabled_count = cursor.fetchone()[0]
    print(f"  ✅ AR-enabled products: {ar_enabled_count}/{total_products}")
    
    if ar_enabled_count == total_products:
        print("  🎉 All products have AR functionality!")
    
    conn.close()
    
    print("\n" + "=" * 60)
    print("🎯 TEST COMPLETE!")
    print("💡 If you see this data in your app, color changing should work!")
    print("🔄 Make sure to refresh your browser to see the new products.")

if __name__ == "__main__":
    test_products_and_colors()
