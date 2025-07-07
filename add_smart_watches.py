#!/usr/bin/env python3
"""
Add Smart Watches and Apple Watches to RetailFlowAI Database
- Creates AR-enabled watch products
- Adds multiple images and colors
- Connects to existing database
"""

import sqlite3
import os

def add_smart_watches():
    # Database path
    db_path = os.path.join(os.getcwd(), 'retailflow.db')
    
    # Smart Watch Products with AR capabilities
    watch_products = [
        {
            'name': 'Apple Watch Series 9 GPS',
            'category': 'Electronics',
            'price': 399.99,
            'description': 'The most advanced Apple Watch yet with S9 chip, carbon neutral, and incredible health features. Perfect for fitness tracking and smart connectivity.',
            'mood_category': 'tech',
            'emoji': '⌚',
            'image_url': 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'brand': 'Apple',
            'rating': 4.8,
            'tags': 'smartwatch,fitness,health,tech,gps',
            'is_trending': True,
            'stock_quantity': 50,
            'ar_model_url': '/models/apple_watch.svg',
            'ar_enabled': True,
            'multiple_images': 'https://images.unsplash.com/photo-1579586337278-3f436f25d4d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80,https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'color_variants': 'Midnight,Starlight,Silver,Product Red,Storm Blue,Winter Blue,Pink',
            'size_options': '41mm,45mm'
        },
        {
            'name': 'Apple Watch Ultra 2',
            'category': 'Electronics',
            'price': 799.99,
            'description': 'Rugged and capable smartwatch designed for endurance athletes and outdoor adventurers. Titanium case, Action Button, and precision dual-frequency GPS.',
            'mood_category': 'adventure',
            'emoji': '🏔️',
            'image_url': 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'brand': 'Apple',
            'rating': 4.9,
            'tags': 'smartwatch,adventure,outdoor,titanium,rugged',
            'is_trending': True,
            'stock_quantity': 25,
            'ar_model_url': '/models/apple_watch_ultra.svg',
            'ar_enabled': True,
            'multiple_images': 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80,https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'color_variants': 'Natural Titanium,Blue Titanium,White Titanium',
            'size_options': '49mm'
        },
        {
            'name': 'Samsung Galaxy Watch6 Classic',
            'category': 'Electronics',
            'price': 349.99,
            'description': 'Premium Android smartwatch with rotating bezel, advanced health monitoring, and sleek design. Perfect for Android users seeking style and functionality.',
            'mood_category': 'professional',
            'emoji': '📱',
            'image_url': 'https://images.unsplash.com/photo-1579586337278-3f436f25d4d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'brand': 'Samsung',
            'rating': 4.7,
            'tags': 'smartwatch,android,bezel,health,professional',
            'is_trending': True,
            'stock_quantity': 40,
            'ar_model_url': '/models/samsung_watch.svg',
            'ar_enabled': True,
            'multiple_images': 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80,https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'color_variants': 'Graphite,Silver,Gold,Rose Gold,Midnight Black,Ocean Blue',
            'size_options': '43mm,47mm'
        },
        {
            'name': 'Garmin Venu 3',
            'category': 'Electronics',
            'price': 449.99,
            'description': 'GPS smartwatch with bright AMOLED display, comprehensive health and fitness features, and up to 14 days of battery life.',
            'mood_category': 'fitness',
            'emoji': '🏃',
            'image_url': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'brand': 'Garmin',
            'rating': 4.6,
            'tags': 'smartwatch,gps,fitness,amoled,battery',
            'is_trending': True,
            'stock_quantity': 30,
            'ar_model_url': '/models/garmin_watch.svg',
            'ar_enabled': True,
            'multiple_images': 'https://images.unsplash.com/photo-1579586337278-3f436f25d4d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80,https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'color_variants': 'Slate,Silver,Rose Gold,Soft Gold,Whitestone,French Gray',
            'size_options': '41mm,45mm'
        },
        {
            'name': 'Fitbit Sense 2',
            'category': 'Electronics',
            'price': 299.99,
            'description': 'Health and fitness focused smartwatch with stress management tools, ECG app, and skin temperature sensor for comprehensive wellness tracking.',
            'mood_category': 'wellness',
            'emoji': '💚',
            'image_url': 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'brand': 'Fitbit',
            'rating': 4.5,
            'tags': 'smartwatch,health,wellness,ecg,stress',
            'is_trending': True,
            'stock_quantity': 45,
            'ar_model_url': '/models/fitbit_watch.svg',
            'ar_enabled': True,
            'multiple_images': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80,https://images.unsplash.com/photo-1579586337278-3f436f25d4d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'color_variants': 'Shadow Grey,Platinum,Sage Green,Lunar White,Charcoal,Soft Gold',
            'size_options': '40mm,44mm'
        },
        {
            'name': 'Fossil Gen 6 Wellness Edition',
            'category': 'Electronics',
            'price': 259.99,
            'description': 'Wear OS smartwatch with classic design, wellness features, and customizable watch faces. Perfect blend of traditional and smart technology.',
            'mood_category': 'casual',
            'emoji': '⌚',
            'image_url': 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'brand': 'Fossil',
            'rating': 4.4,
            'tags': 'smartwatch,wear os,classic,wellness,customizable',
            'is_trending': False,
            'stock_quantity': 35,
            'ar_model_url': '/models/fossil_watch.svg',
            'ar_enabled': True,
            'multiple_images': 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80,https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'color_variants': 'Stainless Steel,Black,Rose Gold,Two-Tone,Navy Blue,Brown Leather',
            'size_options': '42mm,44mm'
        }
    ]
    
    try:
        # Connect to database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        print("🏪 Adding Smart Watches to RetailFlowAI Database...")
        print("=" * 60)
        
        # Insert each watch product
        for watch in watch_products:
            cursor.execute('''
                INSERT INTO products (
                    name, category, mood_category, price, description, emoji, 
                    image_url, brand, rating, tags, is_trending, stock_quantity,
                    ar_model_url, ar_enabled, multiple_images, color_variants, size_options
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                watch['name'], watch['category'], watch['mood_category'], 
                watch['price'], watch['description'], watch['emoji'],
                watch['image_url'], watch['brand'], watch['rating'],
                watch['tags'], watch['is_trending'], watch['stock_quantity'],
                watch['ar_model_url'], watch['ar_enabled'], watch['multiple_images'],
                watch['color_variants'], watch['size_options']
            ))
            
            print(f"✅ Added: {watch['name']} - ${watch['price']}")
            print(f"   🎨 Colors: {watch['color_variants']}")
            print(f"   📏 Sizes: {watch['size_options']}")
            print(f"   🥽 AR Model: {watch['ar_model_url']}")
            print(f"   ⭐ Rating: {watch['rating']}/5")
            print()
        
        # Commit changes
        conn.commit()
        
        # Verify addition
        cursor.execute("SELECT COUNT(*) FROM products WHERE category = 'Electronics'")
        electronics_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM products")
        total_count = cursor.fetchone()[0]
        
        print("🎉 Smart Watches Successfully Added!")
        print("=" * 60)
        print(f"📱 Electronics products: {electronics_count}")
        print(f"🛍️ Total products: {total_count}")
        print(f"🥽 All watches are AR-enabled!")
        
        # Close connection
        conn.close()
        
        return True
        
    except Exception as e:
        print(f"❌ Error adding smart watches: {e}")
        return False

if __name__ == "__main__":
    success = add_smart_watches()
    if success:
        print("\n🚀 Ready for AR smartwatch experience!")
        print("Navigate to the app to see the new watches!")
    else:
        print("\n💥 Failed to add smart watches. Check the error above.")
