import sqlite3
import json

def create_amazing_product_database():
    """Create an amazing product database with lots of colors and products for AR"""
    
    # Amazing color palettes for different product types
    CLOTHING_COLORS = [
        {"name": "Midnight Black", "hex": "#000000", "image": "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&h=500&fit=crop"},
        {"name": "Pure White", "hex": "#FFFFFF", "image": "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=500&fit=crop"},
        {"name": "Ocean Blue", "hex": "#1E3A8A", "image": "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop"},
        {"name": "Crimson Red", "hex": "#DC2626", "image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop"},
        {"name": "Forest Green", "hex": "#065F46", "image": "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=500&fit=crop"},
        {"name": "Royal Purple", "hex": "#7C3AED", "image": "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=500&fit=crop"},
        {"name": "Sunset Orange", "hex": "#EA580C", "image": "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=500&fit=crop"},
        {"name": "Charcoal Gray", "hex": "#374151", "image": "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=500&fit=crop"},
        {"name": "Hot Pink", "hex": "#EC4899", "image": "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=500&fit=crop"},
        {"name": "Electric Teal", "hex": "#0891B2", "image": "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop"}
    ]
    
    ACCESSORY_COLORS = [
        {"name": "Platinum Silver", "hex": "#E5E7EB", "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop"},
        {"name": "24K Gold", "hex": "#F59E0B", "image": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop"},
        {"name": "Rose Gold", "hex": "#F87171", "image": "https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=500&h=500&fit=crop"},
        {"name": "Space Black", "hex": "#1F2937", "image": "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?w=500&h=500&fit=crop"},
        {"name": "Copper Bronze", "hex": "#92400E", "image": "https://images.unsplash.com/photo-1506629905058-96d8c7c8a5c9?w=500&h=500&fit=crop"},
        {"name": "Titanium Gray", "hex": "#6B7280", "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop"},
        {"name": "Emerald Green", "hex": "#10B981", "image": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop"},
        {"name": "Sapphire Blue", "hex": "#3B82F6", "image": "https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=500&h=500&fit=crop"}
    ]
    
    # Size options with realistic pricing
    CLOTHING_SIZES = [
        {"name": "XS", "price_modifier": -5, "stock": 15, "measurements": "30-32 inch chest"},
        {"name": "S", "price_modifier": 0, "stock": 25, "measurements": "32-34 inch chest"},
        {"name": "M", "price_modifier": 0, "stock": 30, "measurements": "34-36 inch chest"},
        {"name": "L", "price_modifier": 2, "stock": 25, "measurements": "36-38 inch chest"},
        {"name": "XL", "price_modifier": 5, "stock": 20, "measurements": "38-40 inch chest"},
        {"name": "XXL", "price_modifier": 8, "stock": 15, "measurements": "40-42 inch chest"},
        {"name": "3XL", "price_modifier": 12, "stock": 10, "measurements": "42-44 inch chest"}
    ]
    
    ACCESSORY_SIZES = [
        {"name": "Small", "price_modifier": -10, "stock": 20, "measurements": "6-7 inch"},
        {"name": "Medium", "price_modifier": 0, "stock": 30, "measurements": "7-8 inch"},
        {"name": "Large", "price_modifier": 5, "stock": 25, "measurements": "8-9 inch"},
        {"name": "One Size", "price_modifier": 0, "stock": 40, "measurements": "Adjustable"}
    ]
    
    # Amazing product collection with AR capabilities
    AMAZING_PRODUCTS = [
        # PARTY & EVENING WEAR
        {
            "name": "Glamorous Sequin Party Dress",
            "category": "Clothing",
            "mood_category": "party",
            "price": 299.99,
            "description": "Stunning sequin dress that sparkles under lights - perfect for unforgettable nights",
            "emoji": "✨",
            "image_url": "https://images.unsplash.com/photo-1566479179817-c7e0f55de506?w=500&h=500&fit=crop",
            "brand": "Glamour Couture",
            "rating": 4.9,
            "is_trending": True,
            "stock_quantity": 50,
            "colors": CLOTHING_COLORS,
            "sizes": CLOTHING_SIZES,
            "tags": "party,evening,glamour,sequin,sparkle"
        },
        {
            "name": "Elegant Velvet Blazer",
            "category": "Clothing", 
            "mood_category": "professional",
            "price": 189.99,
            "description": "Sophisticated velvet blazer that commands attention in any room",
            "emoji": "👔",
            "image_url": "https://images.unsplash.com/photo-1594026412046-d5b063f11c83?w=500&h=500&fit=crop",
            "brand": "Executive Style",
            "rating": 4.8,
            "is_trending": True,
            "stock_quantity": 75,
            "colors": CLOTHING_COLORS,
            "sizes": CLOTHING_SIZES,
            "tags": "professional,blazer,velvet,elegant,business"
        },
        {
            "name": "Rainbow Holographic Jacket",
            "category": "Clothing",
            "mood_category": "party",
            "price": 249.99,
            "description": "Eye-catching holographic jacket that changes colors with movement - be the center of attention",
            "emoji": "🌈",
            "image_url": "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop",
            "brand": "Futuristic Fashion",
            "rating": 4.7,
            "is_trending": True,
            "stock_quantity": 30,
            "colors": CLOTHING_COLORS,
            "sizes": CLOTHING_SIZES,
            "tags": "party,holographic,rainbow,futuristic,trendy"
        },
        
        # CASUAL & STREETWEAR
        {
            "name": "Premium Denim Collection Jeans",
            "category": "Clothing",
            "mood_category": "casual",
            "price": 129.99,
            "description": "Perfect-fit premium denim with stretch technology for all-day comfort",
            "emoji": "👖",
            "image_url": "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=500&h=500&fit=crop",
            "brand": "Denim Masters",
            "rating": 4.6,
            "is_trending": True,
            "stock_quantity": 100,
            "colors": CLOTHING_COLORS,
            "sizes": CLOTHING_SIZES,
            "tags": "casual,denim,jeans,comfortable,everyday"
        },
        {
            "name": "Color-Changing Smart T-Shirt",
            "category": "Clothing",
            "mood_category": "cool",
            "price": 79.99,
            "description": "Revolutionary smart fabric that changes color based on temperature and mood",
            "emoji": "👕",
            "image_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
            "brand": "Tech Wear",
            "rating": 4.5,
            "is_trending": True,
            "stock_quantity": 80,
            "colors": CLOTHING_COLORS,
            "sizes": CLOTHING_SIZES,
            "tags": "casual,smart,tech,color-changing,innovative"
        },
        
        # LUXURY ACCESSORIES
        {
            "name": "Designer Crystal Sunglasses",
            "category": "Accessories",
            "mood_category": "cool",
            "price": 399.99,
            "description": "Luxury sunglasses with Swarovski crystals and UV protection",
            "emoji": "🕶️",
            "image_url": "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500&h=500&fit=crop",
            "brand": "Crystal Vision",
            "rating": 4.9,
            "is_trending": True,
            "stock_quantity": 25,
            "colors": ACCESSORY_COLORS,
            "sizes": ACCESSORY_SIZES,
            "tags": "luxury,sunglasses,crystal,designer,premium"
        },
        {
            "name": "Smart Hologram Watch",
            "category": "Electronics",
            "mood_category": "professional",
            "price": 599.99,
            "description": "Futuristic smartwatch with holographic display and health monitoring",
            "emoji": "⌚",
            "image_url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
            "brand": "Future Tech",
            "rating": 4.8,
            "is_trending": True,
            "stock_quantity": 40,
            "colors": ACCESSORY_COLORS,
            "sizes": ACCESSORY_SIZES,
            "tags": "smartwatch,hologram,tech,professional,future"
        },
        {
            "name": "Infinity Color-Shift Handbag",
            "category": "Accessories",
            "mood_category": "romantic",
            "price": 199.99,
            "description": "Magical handbag that shifts through infinite colors as you move",
            "emoji": "👜",
            "image_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
            "brand": "Mystique Bags",
            "rating": 4.7,
            "is_trending": True,
            "stock_quantity": 60,
            "colors": ACCESSORY_COLORS,
            "sizes": ACCESSORY_SIZES,
            "tags": "handbag,color-shift,magical,romantic,trendy"
        },
        
        # FITNESS & ATHLETIC
        {
            "name": "Neon Athletic Performance Shoes",
            "category": "Footwear",
            "mood_category": "fitness",
            "price": 159.99,
            "description": "High-performance athletic shoes with LED accents and energy return technology",
            "emoji": "👟",
            "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
            "brand": "Neon Athletics",
            "rating": 4.6,
            "is_trending": True,
            "stock_quantity": 90,
            "colors": CLOTHING_COLORS,
            "sizes": CLOTHING_SIZES,
            "tags": "athletic,shoes,neon,performance,LED"
        },
        {
            "name": "Chromatic Yoga Leggings",
            "category": "Clothing",
            "mood_category": "fitness",
            "price": 89.99,
            "description": "Stretchy leggings that change color during your workout for motivation",
            "emoji": "🧘",
            "image_url": "https://images.unsplash.com/photo-1506629905058-96d8c7c8a5c9?w=500&h=500&fit=crop",
            "brand": "Zen Activewear",
            "rating": 4.5,
            "is_trending": True,
            "stock_quantity": 70,
            "colors": CLOTHING_COLORS,
            "sizes": CLOTHING_SIZES,
            "tags": "yoga,leggings,chromatic,fitness,motivation"
        },
        
        # TECH & GADGETS
        {
            "name": "Aurora Wireless Earbuds",
            "category": "Electronics",
            "mood_category": "cool",
            "price": 249.99,
            "description": "Premium earbuds that glow with aurora-like colors while playing music",
            "emoji": "🎧",
            "image_url": "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
            "brand": "Aurora Audio",
            "rating": 4.8,
            "is_trending": True,
            "stock_quantity": 55,
            "colors": ACCESSORY_COLORS,
            "sizes": ACCESSORY_SIZES,
            "tags": "earbuds,aurora,wireless,premium,glow"
        },
        {
            "name": "Prismatic Phone Case",
            "category": "Electronics",
            "mood_category": "cool",
            "price": 49.99,
            "description": "Phone case that reflects rainbow colors and provides ultimate protection",
            "emoji": "📱",
            "image_url": "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500&h=500&fit=crop",
            "brand": "Prism Tech",
            "rating": 4.4,
            "is_trending": True,
            "stock_quantity": 120,
            "colors": ACCESSORY_COLORS,
            "sizes": ACCESSORY_SIZES,
            "tags": "phone,case,prismatic,rainbow,protection"
        },
        
        # LUXURY & PREMIUM
        {
            "name": "Diamond-Studded Evening Clutch",
            "category": "Accessories",
            "mood_category": "romantic",
            "price": 899.99,
            "description": "Exquisite evening clutch with genuine diamonds and silk lining",
            "emoji": "💎",
            "image_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
            "brand": "Diamond Luxury",
            "rating": 5.0,
            "is_trending": True,
            "stock_quantity": 15,
            "colors": ACCESSORY_COLORS,
            "sizes": ACCESSORY_SIZES,
            "tags": "luxury,diamonds,evening,clutch,premium"
        },
        {
            "name": "Celestial Silk Scarf",
            "category": "Accessories",
            "mood_category": "romantic",
            "price": 149.99,
            "description": "Pure silk scarf with celestial patterns that shimmer in different lights",
            "emoji": "🌟",
            "image_url": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop",
            "brand": "Celestial Silk",
            "rating": 4.7,
            "is_trending": True,
            "stock_quantity": 45,
            "colors": ACCESSORY_COLORS,
            "sizes": ACCESSORY_SIZES,
            "tags": "silk,scarf,celestial,shimmer,luxury"
        },
        
        # TRENDY & UNIQUE
        {
            "name": "Glow-in-the-Dark Backpack",
            "category": "Accessories",
            "mood_category": "cool",
            "price": 119.99,
            "description": "Futuristic backpack that glows in the dark with multiple color patterns",
            "emoji": "🎒",
            "image_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
            "brand": "Glow Gear",
            "rating": 4.6,
            "is_trending": True,
            "stock_quantity": 65,
            "colors": ACCESSORY_COLORS,
            "sizes": ACCESSORY_SIZES,
            "tags": "backpack,glow,dark,futuristic,patterns"
        }
    ]
    
    conn = sqlite3.connect('retailflow.db')
    cursor = conn.cursor()
    
    # Clear existing products to start fresh
    cursor.execute('DELETE FROM products')
    
    print("🚀 Creating AMAZING product database with many colors...")
    print(f"✨ Adding {len(AMAZING_PRODUCTS)} incredible products...")
    
    for product in AMAZING_PRODUCTS:
        try:
            # Convert lists to JSON strings
            colors_json = json.dumps(product['colors'])
            sizes_json = json.dumps(product['sizes'])
            images_json = json.dumps([product['image_url']] * 3)  # Multiple images
            
            cursor.execute('''
                INSERT INTO products (
                    name, category, mood_category, price, description, emoji, image_url, 
                    brand, rating, is_trending, stock_quantity, ar_enabled, tags,
                    images, colors, sizes, material, dimensions
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                product['name'],
                product['category'],
                product['mood_category'],
                product['price'],
                product['description'],
                product['emoji'],
                product['image_url'],
                product['brand'],
                product['rating'],
                product['is_trending'],
                product['stock_quantity'],
                True,  # ar_enabled
                product['tags'],
                images_json,
                colors_json,
                sizes_json,
                "Premium AR-Ready Material",
                "AR-Optimized Dimensions"
            ))
            
            print(f"✅ Added: {product['name']} with {len(product['colors'])} colors")
            
        except Exception as e:
            print(f"❌ Error adding {product['name']}: {e}")
    
    conn.commit()
    conn.close()
    
    print(f"\n🎉 SUCCESS! Created amazing AR product database!")
    print(f"📊 Total Products: {len(AMAZING_PRODUCTS)}")
    print(f"🎨 Colors per Product: {len(CLOTHING_COLORS)} for clothing, {len(ACCESSORY_COLORS)} for accessories")
    print(f"📏 Size Options: {len(CLOTHING_SIZES)} for clothing, {len(ACCESSORY_SIZES)} for accessories")
    print("🥽 All products are AR-ready with professional color and size options!")
    
    return len(AMAZING_PRODUCTS)

if __name__ == "__main__":
    create_amazing_product_database()
