#!/usr/bin/env python3
"""Test the diverse product catalog"""

import sqlite3

DATABASE = 'retailflow.db'

def test_products():
    """Test that products were added correctly"""
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Get all products
    cursor.execute('SELECT name, category, emoji, image_url FROM products ORDER BY category, name')
    products = cursor.fetchall()
    
    print("🛍️ DIVERSE PRODUCT CATALOG TEST\n")
    print(f"Total products: {len(products)}\n")
    
    # Group by category
    categories = {}
    for name, category, emoji, image_url in products:
        if category not in categories:
            categories[category] = []
        categories[category].append((name, emoji, image_url))
    
    # Display by category
    for category, items in categories.items():
        print(f"📂 {category.upper()} ({len(items)} items)")
        for name, emoji, image_url in items:
            print(f"   {emoji} {name}")
            print(f"      🖼️  Image: {image_url[:60]}...")
        print()
    
    conn.close()

if __name__ == "__main__":
    test_products()
