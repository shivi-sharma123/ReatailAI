import sqlite3
import json
import sys
import os

print("🚀 Starting RetailFlow AI Database Setup...")
print(f"Python version: {sys.version}")
print(f"Working directory: {os.getcwd()}")

def setup_products_with_images():
    """Setup the database with attractive product images"""
    
    try:
        # Connect to database
        conn = sqlite3.connect('retailflow.db')
        cursor = conn.cursor()
        print("✅ Database connection successful!")
        
        # Drop and recreate products table
        cursor.execute('DROP TABLE IF EXISTS products')
        cursor.execute('''
            CREATE TABLE products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                category TEXT NOT NULL,
                mood_category TEXT NOT NULL,
                price REAL DEFAULT 0.0,
                description TEXT,
                emoji TEXT,
                image_url TEXT,
                brand TEXT,
                rating REAL DEFAULT 0.0,
                tags TEXT,
                is_trending BOOLEAN DEFAULT 0,
                stock_quantity INTEGER DEFAULT 100,
                ar_model_url TEXT,
                ar_preview_url TEXT,
                multiple_images TEXT,
                size_chart TEXT,
                color_variants TEXT,
                ar_enabled BOOLEAN DEFAULT 0,
                three_d_model TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        print("✅ Products table created successfully!")
        
        # Sample products with attractive images
        products = [
            # Rainy weather - Professional rain gear
            (
                "Premium Waterproof Rain Jacket",
                "Clothing",
                "rainy",
                129.99,
                "Professional-grade waterproof jacket with sealed seams, breathable fabric, and stylish design for urban adventures in wet weather.",
                "☂️",
                "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "StormShield Pro",
                4.9,
                "waterproof,rain,jacket,premium,outdoor,commute",
                1,
                45,
                "https://models.example.com/rain-jacket.glb",
                "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                json.dumps([
                    "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                ]),
                json.dumps({"S": "36-38", "M": "40-42", "L": "44-46", "XL": "48-50"}),
                json.dumps(["Navy Blue", "Forest Green", "Charcoal Gray", "Bright Yellow"]),
                1,
                "rain_jacket_3d.glb"
            ),
            
            # Sunny weather - Luxury sunglasses
            (
                "Luxury Aviator Sunglasses",
                "Accessories",
                "sunny",
                159.99,
                "Premium aviator sunglasses with polarized lenses, titanium frame, and 100% UV protection. Perfect for sunny days and outdoor adventures.",
                "🕶️",
                "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "SunLux Premium",
                4.9,
                "sunglasses,aviator,luxury,polarized,UV protection,titanium",
                1,
                78,
                "https://models.example.com/aviator-sunglasses.glb",
                "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                json.dumps([
                    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                ]),
                json.dumps({"One Size": "58mm lens width"}),
                json.dumps(["Gold/Brown", "Silver/Gray", "Black/Green", "Rose Gold/Pink"]),
                1,
                "aviator_sunglasses_3d.glb"
            ),
            
            # Sunny weather - Summer shirt
            (
                "Premium Linen Summer Shirt",
                "Clothing",
                "sunny",
                89.99,
                "Breathable premium linen shirt perfect for sunny days, casual outings, and vacation wear. Comfortable and stylish.",
                "👔",
                "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "SunComfort",
                4.6,
                "linen,shirt,summer,breathable,casual,vacation",
                0,
                92,
                "https://models.example.com/linen-shirt.glb",
                "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                json.dumps([
                    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                ]),
                json.dumps({"S": "38", "M": "40", "L": "42", "XL": "44"}),
                json.dumps(["White", "Light Blue", "Beige", "Navy"]),
                1,
                "linen_shirt_3d.glb"
            ),
            
            # Party/Happy - Glamorous dress
            (
                "Glamorous Evening Dress",
                "Clothing",
                "party",
                249.99,
                "Stunning evening dress perfect for special occasions, parties, and formal events. Elegant design with premium materials.",
                "👗",
                "https://images.unsplash.com/photo-1566479179817-c4a4c3b5b9d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "Elegante",
                4.8,
                "dress,evening,party,elegant,special occasion,formal",
                1,
                23,
                "https://models.example.com/evening-dress.glb",
                "https://images.unsplash.com/photo-1566479179817-c4a4c3b5b9d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                json.dumps([
                    "https://images.unsplash.com/photo-1566479179817-c4a4c3b5b9d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                ]),
                json.dumps({"XS": "32", "S": "34", "M": "36", "L": "38", "XL": "40"}),
                json.dumps(["Black", "Navy", "Wine Red", "Royal Blue"]),
                1,
                "evening_dress_3d.glb"
            ),
            
            # Happy - Trendy sneakers
            (
                "Trendy Party Sneakers",
                "Footwear",
                "happy",
                129.99,
                "Stylish sneakers with metallic accents perfect for parties, casual outings, and making a fashion statement.",
                "👟",
                "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "HappyFeet",
                4.7,
                "sneakers,party,trendy,metallic,comfortable,fashion",
                1,
                56,
                "https://models.example.com/party-sneakers.glb",
                "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                json.dumps([
                    "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                ]),
                json.dumps({"6": "6", "7": "7", "8": "8", "9": "9", "10": "10", "11": "11", "12": "12"}),
                json.dumps(["White/Gold", "Black/Silver", "Pink/Rose Gold", "Blue/Chrome"]),
                1,
                "party_sneakers_3d.glb"
            ),
            
            # Professional - Business suit
            (
                "Executive Business Suit",
                "Clothing",
                "professional",
                599.99,
                "Premium business suit tailored for the modern professional. Perfect fit, premium materials, and timeless style.",
                "🤵",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "Executive Style",
                4.9,
                "suit,business,professional,formal,executive,tailored",
                0,
                18,
                "https://models.example.com/business-suit.glb",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                json.dumps([
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                ]),
                json.dumps({"36": "36", "38": "38", "40": "40", "42": "42", "44": "44", "46": "46"}),
                json.dumps(["Charcoal", "Navy", "Black", "Dark Gray"]),
                1,
                "business_suit_3d.glb"
            ),
            
            # Professional - Laptop bag
            (
                "Professional Leather Laptop Bag",
                "Accessories",
                "professional",
                179.99,
                "Premium leather laptop bag perfect for business professionals. Spacious, durable, and elegant design.",
                "💼",
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "ProfessionalGear",
                4.8,
                "laptop bag,business,professional,leather,premium,work",
                0,
                34,
                "https://models.example.com/laptop-bag.glb",
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                json.dumps([
                    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                ]),
                json.dumps({"15 inch": "15 inch laptop", "17 inch": "17 inch laptop"}),
                json.dumps(["Black", "Brown", "Navy", "Cognac"]),
                1,
                "laptop_bag_3d.glb"
            ),
            
            # Fitness - Athletic wear
            (
                "Performance Athletic Leggings",
                "Clothing",
                "fitness",
                69.99,
                "High-performance athletic leggings with moisture-wicking fabric, perfect for workouts and active lifestyle.",
                "🏃",
                "https://images.unsplash.com/photo-1506629905607-24e03040c271?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "ActiveFit",
                4.6,
                "leggings,athletic,workout,fitness,performance,activewear",
                1,
                87,
                "https://models.example.com/athletic-leggings.glb",
                "https://images.unsplash.com/photo-1506629905607-24e03040c271?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                json.dumps([
                    "https://images.unsplash.com/photo-1506629905607-24e03040c271?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                ]),
                json.dumps({"XS": "0-2", "S": "4-6", "M": "8-10", "L": "12-14", "XL": "16-18"}),
                json.dumps(["Black", "Navy", "Heather Gray", "Deep Purple"]),
                1,
                "athletic_leggings_3d.glb"
            )
        ]
        
        # Insert products
        cursor.executemany('''
            INSERT INTO products (
                name, category, mood_category, price, description, emoji, image_url, brand, rating, tags, 
                is_trending, stock_quantity, ar_model_url, ar_preview_url, multiple_images, size_chart, 
                color_variants, ar_enabled, three_d_model
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', products)
        
        # Create user_interactions table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS user_interactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_input TEXT NOT NULL,
                detected_mood TEXT NOT NULL,
                recommended_products TEXT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        conn.commit()
        
        # Verify data
        cursor.execute('SELECT COUNT(*) FROM products')
        count = cursor.fetchone()[0]
        print(f"✅ Successfully added {count} products with attractive images!")
        
        # Show sample products
        cursor.execute('SELECT name, mood_category, image_url FROM products LIMIT 5')
        sample_products = cursor.fetchall()
        print("\n🛍️ Sample products added:")
        for name, mood, image_url in sample_products:
            print(f"   • {name} ({mood})")
            print(f"     Image: {image_url[:60]}...")
        
        conn.close()
        print("\n🎉 Database setup completed successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Error setting up database: {e}")
        return False

if __name__ == "__main__":
    success = setup_products_with_images()
    if success:
        print("\n✅ RetailFlow AI is ready to go! Start the Flask server and React app to see the products with images.")
    else:
        print("\n❌ Setup failed. Please check the error messages above.")
