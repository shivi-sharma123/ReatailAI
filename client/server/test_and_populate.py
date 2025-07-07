#!/usr/bin/env python3
"""
Test and populate database script for RetailFlowAI
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import init_database, get_all_products, add_product

def test_database():
    """Test database functionality"""
    print("🚀 Testing RetailFlowAI Database...")
    
    # Initialize database
    print("📊 Initializing database...")
    init_database()
    print("✅ Database initialized!")
    
    # Get all products
    print("\n📦 Fetching all products...")
    products = get_all_products()
    print(f"✅ Found {len(products)} products in database")
    
    # Display first few products
    print("\n🛍️ Sample products:")
    for i, product in enumerate(products[:5]):
        ar_status = "🥽 AR" if product.get('ar_enabled') else "📷 Image"
        print(f"  {i+1}. {product['emoji']} {product['name']} - ${product['price']} ({ar_status})")
    
    if len(products) > 5:
        print(f"  ... and {len(products) - 5} more products")
    
    # Test adding a new product
    print("\n➕ Testing add product functionality...")
    test_product = {
        'name': 'Test AR Headphones',
        'category': 'Electronics',
        'mood_category': 'energetic',
        'price': 199.99,
        'description': 'Premium wireless headphones with AR visualization',
        'emoji': '🎧',
        'image_url': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        'brand': 'Sony',
        'rating': 4.7,
        'tags': 'wireless,music,premium',
        'is_trending': True,
        'stock_quantity': 30,
        'ar_enabled': True,
        'ar_model_url': 'https://ar-models.com/headphones3d.glb',
        'ar_preview_url': 'https://ar-preview.com/headphones-ar.jpg',
        'three_d_model': 'headphones_3d.glb',
        'multiple_images': ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
        'size_chart': {'One Size': 'Universal'},
        'color_variants': ['Black', 'White', 'Silver']
    }
    
    try:
        product_id = add_product(test_product)
        print(f"✅ Test product added with ID: {product_id}")
        
        # Verify it was added
        products_after = get_all_products()
        print(f"✅ Database now has {len(products_after)} products")
        
    except Exception as e:
        print(f"❌ Error adding test product: {e}")
    
    print("\n🎉 Database test completed!")
    print("💡 You can now:")
    print("   - Start the Flask server: python app.py")
    print("   - Start the React frontend: npm start")
    print("   - Use the Admin panel to add/edit/delete products")
    print("   - Use the Chatbot to get product suggestions")

if __name__ == "__main__":
    test_database()
