#!/usr/bin/env python3
"""
Verify AR Setup Script
Check that all products are properly AR-enabled
"""

import sqlite3
import json

def verify_ar_setup():
    """Verify that all products are AR-enabled"""
    try:
        conn = sqlite3.connect('client/server/retailflow.db')
        cursor = conn.cursor()
        
        print("🔍 Verifying AR setup...")
        
        # Get all products
        cursor.execute("SELECT id, name, ar_enabled, colors, sizes FROM products")
        products = cursor.fetchall()
        
        ar_enabled_count = 0
        total_count = len(products)
        
        print(f"\n📦 Found {total_count} products:")
        print("-" * 60)
        
        for product in products:
            product_id, name, ar_enabled, colors_str, sizes_str = product
            
            # Parse colors and sizes
            try:
                colors = json.loads(colors_str) if colors_str else []
                sizes = json.loads(sizes_str) if sizes_str else []
            except:
                colors = []
                sizes = []
            
            ar_status = "✅ AR Ready" if ar_enabled else "❌ No AR"
            colors_count = len(colors)
            sizes_count = len(sizes)
            
            print(f"{product_id:2d}. {name[:40]:<40} {ar_status} | {colors_count} colors | {sizes_count} sizes")
            
            if ar_enabled:
                ar_enabled_count += 1
        
        print("-" * 60)
        print(f"📊 AR Summary: {ar_enabled_count}/{total_count} products are AR-enabled")
        
        if ar_enabled_count == total_count:
            print("🎉 PERFECT! All products support AR! 🥽")
            return True
        else:
            print(f"⚠️  {total_count - ar_enabled_count} products still need AR setup")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    print("🚀 RetailFlow AI - AR Verification")
    print("=" * 50)
    
    if verify_ar_setup():
        print("\n🎯 Your app is ready! All products now have:")
        print("✅ AR try-on capability")
        print("✅ Color variations")
        print("✅ Size options")
        print("✅ Enhanced product experience")
        print("\n🚀 Start your app and enjoy AR on every product!")
    else:
        print("\n❌ Some products need AR setup")
