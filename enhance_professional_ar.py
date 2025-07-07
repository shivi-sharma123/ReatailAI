import sqlite3
import json

def enhance_products_with_professional_data():
    """Enhance all products with professional color and size data for AR"""
    
    conn = sqlite3.connect('retailflow.db')
    cursor = conn.cursor()
    
    # Professional color palettes for different categories
    clothing_colors = [
        {"name": "Classic Black", "hex": "#000000", "image": "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&h=500&fit=crop"},
        {"name": "Pure White", "hex": "#FFFFFF", "image": "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=500&fit=crop"},
        {"name": "Navy Blue", "hex": "#1B263B", "image": "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop"},
        {"name": "Crimson Red", "hex": "#DC2626", "image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop"},
        {"name": "Forest Green", "hex": "#065F46", "image": "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=500&fit=crop"},
        {"name": "Charcoal Gray", "hex": "#374151", "image": "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=500&fit=crop"}
    ]
    
    electronics_colors = [
        {"name": "Space Gray", "hex": "#8B8B8D", "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop"},
        {"name": "Silver", "hex": "#C0C0C0", "image": "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop"},
        {"name": "Rose Gold", "hex": "#E8B4B8", "image": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=500&fit=crop"},
        {"name": "Midnight Black", "hex": "#0F172A", "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop"},
        {"name": "Deep Blue", "hex": "#1E40AF", "image": "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500&h=500&fit=crop"}
    ]
    
    accessories_colors = [
        {"name": "Platinum", "hex": "#E5E7EB", "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop"},
        {"name": "Gold", "hex": "#F59E0B", "image": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop"},
        {"name": "Bronze", "hex": "#92400E", "image": "https://images.unsplash.com/photo-1506629905058-96d8c7c8a5c9?w=500&h=500&fit=crop"},
        {"name": "Black Steel", "hex": "#1F2937", "image": "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?w=500&h=500&fit=crop"},
        {"name": "Rose Gold", "hex": "#F87171", "image": "https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=500&h=500&fit=crop"}
    ]
    
    # Professional size options for different categories
    clothing_sizes = [
        {"name": "XS", "price_modifier": -5, "stock": 15, "measurements": "32-34 inch chest"},
        {"name": "S", "price_modifier": 0, "stock": 25, "measurements": "34-36 inch chest"},
        {"name": "M", "price_modifier": 0, "stock": 30, "measurements": "36-38 inch chest"},
        {"name": "L", "price_modifier": 2, "stock": 25, "measurements": "38-40 inch chest"},
        {"name": "XL", "price_modifier": 5, "stock": 20, "measurements": "40-42 inch chest"},
        {"name": "XXL", "price_modifier": 8, "stock": 15, "measurements": "42-44 inch chest"}
    ]
    
    electronics_sizes = [
        {"name": "32GB", "price_modifier": 0, "stock": 20, "measurements": "Standard capacity"},
        {"name": "64GB", "price_modifier": 50, "stock": 25, "measurements": "Extended capacity"},
        {"name": "128GB", "price_modifier": 100, "stock": 15, "measurements": "Premium capacity"},
        {"name": "256GB", "price_modifier": 200, "stock": 10, "measurements": "Professional capacity"}
    ]
    
    accessories_sizes = [
        {"name": "Small", "price_modifier": -10, "stock": 15, "measurements": "6-7 inch"},
        {"name": "Medium", "price_modifier": 0, "stock": 25, "measurements": "7-8 inch"},
        {"name": "Large", "price_modifier": 5, "stock": 20, "measurements": "8-9 inch"},
        {"name": "One Size", "price_modifier": 0, "stock": 30, "measurements": "Adjustable"}
    ]
    
    # Get all products
    cursor.execute("SELECT id, name, category, price FROM products")
    products = cursor.fetchall()
    
    print(f"🚀 Enhancing {len(products)} products with professional AR data...")
    
    for product in products:
        product_id, name, category, price = product
        
        # Determine colors and sizes based on category
        if 'clothing' in category.lower() or 'jacket' in name.lower() or 'dress' in name.lower() or 'shirt' in name.lower():
            colors = clothing_colors
            sizes = clothing_sizes
        elif 'electronics' in category.lower() or 'phone' in name.lower() or 'laptop' in name.lower() or 'watch' in name.lower():
            colors = electronics_colors
            sizes = electronics_sizes
        else:
            colors = accessories_colors
            sizes = accessories_sizes
        
        # Convert to JSON strings
        colors_json = json.dumps(colors)
        sizes_json = json.dumps(sizes)
        
        # Update the product with enhanced data
        cursor.execute("""
            UPDATE products 
            SET colors = ?, sizes = ?, material = ?, dimensions = ?
            WHERE id = ?
        """, (
            colors_json,
            sizes_json,
            "Premium Quality Material",
            "Professional AR Compatible",
            product_id
        ))
        
        print(f"✅ Enhanced: {name} with {len(colors)} colors and {len(sizes)} sizes")
    
    conn.commit()
    conn.close()
    
    print("\n🎉 SUCCESS! All products enhanced with professional AR data!")
    print("✨ Features added:")
    print("   🎨 6 professional colors per clothing item")
    print("   🎨 5 premium colors per electronics/accessories")
    print("   📏 6 size options for clothing (XS-XXL)")
    print("   📏 4 storage/size options for electronics")
    print("   📏 Size-specific measurements and stock levels")
    print("   💰 Dynamic pricing based on size")
    print("   🖼️ High-quality product images for each color")

if __name__ == "__main__":
    enhance_products_with_professional_data()
