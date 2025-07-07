#!/usr/bin/env python3
"""
Check database structure and add products properly
"""

import sqlite3
import json

def check_and_add_products():
    conn = sqlite3.connect('retailflow.db')
    cursor = conn.cursor()
    
    # Check table structure
    cursor.execute("PRAGMA table_info(products)")
    columns = cursor.fetchall()
    
    print("📋 Products table structure:")
    for col in columns:
        print(f"  {col[1]} ({col[2]})")
    
    # Check if colors column exists
    column_names = [col[1] for col in columns]
    
    if 'colors' not in column_names:
        print("\n🔧 Adding 'colors' column to products table...")
        try:
            cursor.execute("ALTER TABLE products ADD COLUMN colors TEXT")
            conn.commit()
            print("✅ Added 'colors' column successfully!")
        except Exception as e:
            print(f"❌ Error adding column: {e}")
    
    # Update existing products with color arrays
    print("\n🎨 Updating existing products with color options...")
    
    # Get all products
    cursor.execute("SELECT id, name, category FROM products")
    products = cursor.fetchall()
    
    for product_id, name, category in products:
        # Create extensive color arrays based on product type
        if 'glass' in name.lower() or 'sunglass' in name.lower():
            colors = [
                "Black", "Silver", "Gold", "Rose Gold", "Blue", "Green",
                "Red", "Purple", "Brown", "Tortoise", "Clear", "Gunmetal"
            ]
        elif 'dress' in name.lower() or 'women' in name.lower():
            colors = [
                "Rose Pink", "Sky Blue", "Emerald Green", "Sunset Orange",
                "Lavender Purple", "Coral Red", "Midnight Blue", "Cream White",
                "Burgundy Wine", "Forest Green", "Golden Yellow", "Charcoal Gray"
            ]
        elif 'shirt' in name.lower() or 't-shirt' in name.lower():
            colors = [
                "Classic Black", "Pure White", "Navy Blue", "Heather Gray",
                "Olive Green", "Burnt Orange", "Deep Purple", "Maroon Red",
                "Steel Blue", "Khaki Tan", "Electric Blue", "Slate Gray"
            ]
        elif 'jacket' in name.lower() or 'coat' in name.lower():
            colors = [
                "Classic Black", "Rich Brown", "Cognac Tan", "Deep Burgundy",
                "Midnight Navy", "Espresso Brown", "Charcoal Gray", "Vintage Tan",
                "Forest Green", "Wine Red", "Camel Beige", "Storm Gray"
            ]
        elif 'sport' in name.lower() or 'athletic' in name.lower() or 'hoodie' in name.lower():
            colors = [
                "Electric Blue", "Neon Green", "Hot Pink", "Bright Orange",
                "Purple Power", "Racing Red", "Jet Black", "Arctic White",
                "Solar Yellow", "Turquoise Blue", "Lime Green", "Magenta Pink"
            ]
        else:
            # Default color array for other products
            colors = [
                "Black", "White", "Gray", "Navy", "Red", "Blue",
                "Green", "Purple", "Orange", "Yellow", "Pink", "Brown"
            ]
        
        try:
            cursor.execute(
                "UPDATE products SET colors = ? WHERE id = ?",
                (json.dumps(colors), product_id)
            )
            print(f"  ✅ Updated {name} with {len(colors)} colors")
        except Exception as e:
            print(f"  ❌ Error updating {name}: {e}")
    
    conn.commit()
    
    # Show final count
    cursor.execute("SELECT COUNT(*) FROM products")
    count = cursor.fetchone()[0]
    print(f"\n🎉 Database now has {count} products, all with extensive color options!")
    
    conn.close()

if __name__ == "__main__":
    check_and_add_products()
