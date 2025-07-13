"""
Add more diverse products to the database for better search testing
"""
import sqlite3
import json

def add_sample_products():
    db_path = r"c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\retailflow.db"
    
    # Sample products with diverse categories for search testing
    products = [
        # Electronics
        {
            'name': 'Samsung Galaxy S24 Ultra',
            'category': 'Electronics',
            'price': 1199.99,
            'description': 'Latest Samsung flagship smartphone with AI features and S Pen',
            'emoji': '📱',
            'image_url': 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
            'brand': 'Samsung',
            'rating': 4.7,
            'is_trending': 1,
            'stock_quantity': 25,
            'ar_enabled': 1,
            'tags': 'smartphone,android,camera,AI,S Pen',
            'mood_category': 'professional'
        },
        {
            'name': 'MacBook Air M3',
            'category': 'Electronics',
            'price': 1299.99,
            'description': 'Ultra-thin laptop with Apple M3 chip and all-day battery',
            'emoji': '💻',
            'image_url': 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
            'brand': 'Apple',
            'rating': 4.9,
            'is_trending': 1,
            'stock_quantity': 15,
            'ar_enabled': 1,
            'tags': 'laptop,apple,M3,portable,productivity',
            'mood_category': 'professional'
        },
        {
            'name': 'AirPods Pro 3rd Gen',
            'category': 'Electronics',
            'price': 249.99,
            'description': 'Active noise cancelling wireless earbuds with spatial audio',
            'emoji': '🎧',
            'image_url': 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400',
            'brand': 'Apple',
            'rating': 4.6,
            'is_trending': 1,
            'stock_quantity': 50,
            'ar_enabled': 1,
            'tags': 'earbuds,wireless,noise-cancelling,apple',
            'mood_category': 'casual'
        },
        
        # Fashion
        {
            'name': 'Nike Air Force 1',
            'category': 'Fashion',
            'price': 110.00,
            'description': 'Classic white leather sneakers, timeless basketball shoe design',
            'emoji': '👟',
            'image_url': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
            'brand': 'Nike',
            'rating': 4.8,
            'is_trending': 1,
            'stock_quantity': 100,
            'ar_enabled': 1,
            'tags': 'shoes,sneakers,white,basketball,classic',
            'mood_category': 'casual'
        },
        {
            'name': 'Adidas Ultraboost 22',
            'category': 'Fashion',
            'price': 180.00,
            'description': 'High-performance running shoes with boost technology',
            'emoji': '👟',
            'image_url': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
            'brand': 'Adidas',
            'rating': 4.5,
            'is_trending': 0,
            'stock_quantity': 75,
            'ar_enabled': 1,
            'tags': 'running,shoes,boost,performance,adidas',
            'mood_category': 'energetic'
        },
        {
            'name': 'Levi\'s 501 Original Jeans',
            'category': 'Fashion',
            'price': 69.99,
            'description': 'Classic straight-fit denim jeans, the original blue jean',
            'emoji': '👖',
            'image_url': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
            'brand': 'Levi\'s',
            'rating': 4.4,
            'is_trending': 0,
            'stock_quantity': 200,
            'ar_enabled': 1,
            'tags': 'jeans,denim,classic,straight-fit,blue',
            'mood_category': 'casual'
        },
        {
            'name': 'Calvin Klein Cotton T-Shirt',
            'category': 'Fashion',
            'price': 24.99,
            'description': 'Premium cotton crew neck t-shirt in classic colors',
            'emoji': '👕',
            'image_url': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
            'brand': 'Calvin Klein',
            'rating': 4.3,
            'is_trending': 0,
            'stock_quantity': 150,
            'ar_enabled': 1,
            'tags': 'tshirt,cotton,basic,crew neck,comfortable',
            'mood_category': 'casual'
        },
        
        # Home & Garden
        {
            'name': 'Dyson V15 Detect Vacuum',
            'category': 'Home & Garden',
            'price': 749.99,
            'description': 'Cordless vacuum with laser dust detection and powerful suction',
            'emoji': '🧹',
            'image_url': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
            'brand': 'Dyson',
            'rating': 4.7,
            'is_trending': 1,
            'stock_quantity': 30,
            'ar_enabled': 1,
            'tags': 'vacuum,cordless,cleaning,laser,suction',
            'mood_category': 'productive'
        },
        {
            'name': 'Instant Pot Duo 7-in-1',
            'category': 'Home & Garden',
            'price': 99.99,
            'description': 'Multi-use pressure cooker, slow cooker, rice cooker and more',
            'emoji': '🍲',
            'image_url': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
            'brand': 'Instant Pot',
            'rating': 4.6,
            'is_trending': 0,
            'stock_quantity': 80,
            'ar_enabled': 1,
            'tags': 'pressure cooker,kitchen,cooking,appliance',
            'mood_category': 'productive'
        },
        
        # Sports & Outdoors
        {
            'name': 'Yeti Rambler Tumbler',
            'category': 'Sports & Outdoors',
            'price': 39.99,
            'description': 'Insulated stainless steel tumbler keeps drinks hot or cold',
            'emoji': '🥤',
            'image_url': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
            'brand': 'Yeti',
            'rating': 4.8,
            'is_trending': 0,
            'stock_quantity': 120,
            'ar_enabled': 1,
            'tags': 'tumbler,insulated,drinks,outdoor,stainless steel',
            'mood_category': 'active'
        },
        {
            'name': 'Wilson Pro Staff Tennis Racket',
            'category': 'Sports & Outdoors',
            'price': 199.99,
            'description': 'Professional tennis racket used by tour players',
            'emoji': '🎾',
            'image_url': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
            'brand': 'Wilson',
            'rating': 4.5,
            'is_trending': 0,
            'stock_quantity': 40,
            'ar_enabled': 1,
            'tags': 'tennis,racket,professional,sports,wilson',
            'mood_category': 'competitive'
        }
    ]
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        for product in products:
            # Check if product already exists
            cursor.execute("SELECT id FROM products WHERE name = ?", (product['name'],))
            if cursor.fetchone():
                print(f"Product '{product['name']}' already exists, skipping...")
                continue
            
            # Prepare colors and sizes as JSON
            colors = json.dumps([
                {"name": "Black", "hex": "#000000"},
                {"name": "White", "hex": "#FFFFFF"},
                {"name": "Gray", "hex": "#808080"}
            ])
            
            sizes = json.dumps([
                {"name": "S", "price_modifier": 0, "stock": 20},
                {"name": "M", "price_modifier": 0, "stock": 25},
                {"name": "L", "price_modifier": 0, "stock": 20},
                {"name": "XL", "price_modifier": 5, "stock": 15}
            ])
            
            cursor.execute("""
                INSERT INTO products (
                    name, category, price, description, emoji, image_url, brand, rating,
                    is_trending, stock_quantity, ar_enabled, tags, mood_category, colors, sizes
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                product['name'], product['category'], product['price'], product['description'],
                product['emoji'], product['image_url'], product['brand'], product['rating'],
                product['is_trending'], product['stock_quantity'], product['ar_enabled'],
                product['tags'], product['mood_category'], colors, sizes
            ))
            
            print(f"Added product: {product['name']}")
        
        conn.commit()
        conn.close()
        print(f"\n✅ Successfully added {len(products)} new products to the database!")
        
    except Exception as e:
        print(f"❌ Error adding products: {e}")

if __name__ == "__main__":
    add_sample_products()
