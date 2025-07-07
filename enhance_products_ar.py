import sqlite3
import json

def enhance_products_with_variants():
    conn = sqlite3.connect('retailflow.db')
    cursor = conn.cursor()
    
    # Default color variants for different product types
    clothing_colors = [
        {'name': 'Black', 'hex': '#000000', 'image': None},
        {'name': 'White', 'hex': '#FFFFFF', 'image': None},
        {'name': 'Navy Blue', 'hex': '#000080', 'image': None},
        {'name': 'Red', 'hex': '#FF0000', 'image': None},
        {'name': 'Gray', 'hex': '#808080', 'image': None}
    ]
    
    accessory_colors = [
        {'name': 'Silver', 'hex': '#C0C0C0', 'image': None},
        {'name': 'Gold', 'hex': '#FFD700', 'image': None},
        {'name': 'Black', 'hex': '#000000', 'image': None},
        {'name': 'Rose Gold', 'hex': '#E8B4A0', 'image': None}
    ]
    
    # Default size options
    clothing_sizes = [
        {'name': 'XS', 'price_modifier': -5, 'stock': 15},
        {'name': 'S', 'price_modifier': -2, 'stock': 25},
        {'name': 'M', 'price_modifier': 0, 'stock': 40},
        {'name': 'L', 'price_modifier': 0, 'stock': 35},
        {'name': 'XL', 'price_modifier': 3, 'stock': 20},
        {'name': 'XXL', 'price_modifier': 5, 'stock': 10}
    ]
    
    accessory_sizes = [
        {'name': 'One Size', 'price_modifier': 0, 'stock': 50}
    ]
    
    shoes_sizes = [
        {'name': '6', 'price_modifier': 0, 'stock': 12},
        {'name': '7', 'price_modifier': 0, 'stock': 18},
        {'name': '8', 'price_modifier': 0, 'stock': 22},
        {'name': '9', 'price_modifier': 0, 'stock': 25},
        {'name': '10', 'price_modifier': 0, 'stock': 20},
        {'name': '11', 'price_modifier': 0, 'stock': 15},
        {'name': '12', 'price_modifier': 0, 'stock': 10}
    ]
    
    # Get all products
    cursor.execute('SELECT id, name, category, image_url FROM products')
    products = cursor.fetchall()
    
    print(f"🔄 Enhancing {len(products)} products with AR variants...")
    
    for product_id, name, category, image_url in products:
        # Determine colors and sizes based on category
        if category.lower() in ['clothing', 'dress', 'jacket', 'shirt', 'pants']:
            colors = clothing_colors.copy()
            sizes = clothing_sizes.copy()
        elif category.lower() in ['shoes', 'boots', 'sneakers']:
            colors = clothing_colors.copy()
            sizes = shoes_sizes.copy()
        else:  # Accessories, electronics, etc.
            colors = accessory_colors.copy()
            sizes = accessory_sizes.copy()
        
        # Update image URLs for colors to use the product's image
        for color in colors:
            color['image'] = image_url
        
        # Convert to JSON
        colors_json = json.dumps(colors)
        sizes_json = json.dumps(sizes)
        
        # Update the product
        cursor.execute('''
            UPDATE products 
            SET colors = ?, sizes = ?, material = ?, dimensions = ?
            WHERE id = ?
        ''', (colors_json, sizes_json, 'Premium Quality Material', '30cm x 20cm x 10cm', product_id))
        
        print(f"✅ Enhanced: {name}")
    
    conn.commit()
    conn.close()
    print("🎉 All products enhanced with AR variants!")

if __name__ == "__main__":
    enhance_products_with_variants()
