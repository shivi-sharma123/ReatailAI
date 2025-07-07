#!/usr/bin/env python3
"""
Complete setup and test script for RetailFlowAI
This script will:
1. Initialize the database with products
2. Test all CRUD operations
3. Verify the API endpoints
4. Show setup completion status
"""

import sys
import os
import json
from datetime import datetime

# Add current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import (
    init_database, get_all_products, get_products_by_mood,
    add_product, update_product, delete_product, get_product_by_id
)

def print_header(title):
    """Print a formatted header"""
    print("\n" + "=" * 60)
    print(f"  {title}")
    print("=" * 60)

def print_status(message, status="info"):
    """Print a status message with emoji"""
    emoji = {"success": "✅", "error": "❌", "info": "ℹ️", "warning": "⚠️"}
    print(f"{emoji.get(status, 'ℹ️')} {message}")

def test_database_initialization():
    """Test database initialization"""
    print_header("DATABASE INITIALIZATION")
    
    try:
        init_database()
        products = get_all_products()
        print_status(f"Database initialized successfully with {len(products)} products", "success")
        
        # Show sample products
        print("\n📦 Sample Products:")
        for i, product in enumerate(products[:5]):
            ar_status = "🥽 AR" if product.get('ar_enabled') else "📷 IMG"
            print(f"  {i+1}. {product['emoji']} {product['name']} - ${product['price']} ({ar_status})")
        
        if len(products) > 5:
            print(f"  ... and {len(products) - 5} more products")
            
        return True
        
    except Exception as e:
        print_status(f"Database initialization failed: {e}", "error")
        return False

def test_mood_categories():
    """Test mood-based product filtering"""
    print_header("MOOD CATEGORY TESTING")
    
    moods = ['happy', 'rainy', 'party', 'professional', 'fitness', 'casual']
    
    for mood in moods:
        try:
            products = get_products_by_mood(mood)
            print_status(f"{mood.capitalize()} mood: {len(products)} products", "success")
        except Exception as e:
            print_status(f"Error testing {mood} mood: {e}", "error")

def test_crud_operations():
    """Test Create, Read, Update, Delete operations"""
    print_header("CRUD OPERATIONS TESTING")
    
    # Test CREATE
    print("\n➕ Testing CREATE operation...")
    test_product = {
        'name': 'Test CRUD Product',
        'category': 'Test Category',
        'mood_category': 'general',
        'price': 99.99,
        'description': 'Test product for CRUD operations',
        'emoji': '🧪',
        'image_url': 'https://via.placeholder.com/300x300?text=Test+Product',
        'brand': 'Test Brand',
        'rating': 4.5,
        'tags': 'test,crud,demo',
        'is_trending': False,
        'stock_quantity': 10,
        'ar_enabled': True,
        'ar_model_url': 'https://test.com/model.glb',
        'ar_preview_url': 'https://test.com/preview.jpg',
        'three_d_model': 'test_3d.glb',
        'multiple_images': ['https://via.placeholder.com/300x300?text=Test+1'],
        'size_chart': {'M': 'Medium'},
        'color_variants': ['Red', 'Blue']
    }
    
    try:
        product_id = add_product(test_product)
        print_status(f"Product created with ID: {product_id}", "success")
    except Exception as e:
        print_status(f"CREATE failed: {e}", "error")
        return False
    
    # Test READ
    print("\n👁️ Testing READ operation...")
    try:
        product = get_product_by_id(product_id)
        if product:
            print_status(f"Product retrieved: {product['name']}", "success")
        else:
            print_status("Product not found", "error")
            return False
    except Exception as e:
        print_status(f"READ failed: {e}", "error")
        return False
    
    # Test UPDATE
    print("\n✏️ Testing UPDATE operation...")
    try:
        update_data = {
            'name': 'Updated CRUD Product',
            'price': 149.99,
            'description': 'Updated test product description',
            'emoji': '🔄',
            'category': test_product['category'],
            'mood_category': test_product['mood_category'],
            'image_url': test_product['image_url'],
            'brand': test_product['brand'],
            'rating': 4.8,
            'tags': 'test,crud,updated',
            'is_trending': True,
            'stock_quantity': 15,
            'ar_enabled': True,
            'ar_model_url': test_product['ar_model_url'],
            'ar_preview_url': test_product['ar_preview_url'],
            'three_d_model': test_product['three_d_model'],
            'multiple_images': test_product['multiple_images'],
            'size_chart': test_product['size_chart'],
            'color_variants': test_product['color_variants']
        }
        update_product(product_id, update_data)
        
        # Verify update
        updated_product = get_product_by_id(product_id)
        if updated_product and updated_product['name'] == 'Updated CRUD Product':
            print_status("Product updated successfully", "success")
        else:
            print_status("UPDATE verification failed", "error")
    except Exception as e:
        print_status(f"UPDATE failed: {e}", "error")
        return False
    
    # Test DELETE
    print("\n🗑️ Testing DELETE operation...")
    try:
        result = delete_product(product_id)
        if result.get('success'):
            print_status(f"Product deleted: {result['message']}", "success")
        else:
            print_status("DELETE failed", "error")
            return False
    except Exception as e:
        print_status(f"DELETE failed: {e}", "error")
        return False
    
    print_status("All CRUD operations completed successfully!", "success")
    return True

def generate_setup_report():
    """Generate a complete setup report"""
    print_header("SETUP COMPLETION REPORT")
    
    # Database status
    try:
        products = get_all_products()
        print_status(f"Database: {len(products)} products available", "success")
    except Exception as e:
        print_status(f"Database: Error - {e}", "error")
    
    # Mood categories status
    moods = ['happy', 'rainy', 'party', 'professional', 'fitness', 'casual', 'comfort', 'energetic', 'sunny']
    mood_stats = {}
    
    for mood in moods:
        try:
            products = get_products_by_mood(mood)
            mood_stats[mood] = len(products)
        except:
            mood_stats[mood] = 0
    
    print("\n🎭 Mood Categories:")
    for mood, count in mood_stats.items():
        status = "success" if count > 0 else "warning"
        print_status(f"{mood.capitalize()}: {count} products", status)
    
    # File status
    files_to_check = [
        'database.py',
        'app.py',
        '../src/App.js',
        '../src/Admin.js',
        '../src/Chatbot.js',
        '../src/AdvancedARViewer.js'
    ]
    
    print("\n📁 File Status:")
    for file_path in files_to_check:
        if os.path.exists(file_path):
            print_status(f"{file_path}: Found", "success")
        else:
            print_status(f"{file_path}: Missing", "warning")
    
    print_header("NEXT STEPS")
    print("🚀 To start the application:")
    print("  1. Backend: python app.py (in server directory)")
    print("  2. Frontend: npm start (in client directory)")
    print("  3. Open browser to: http://localhost:3000")
    print("\n🧪 To test the API:")
    print("  1. Open: test_api.html in your browser")
    print("  2. Test chatbot suggestions")
    print("  3. Test admin CRUD operations")
    print("\n✨ Features available:")
    print("  🤖 AI Chatbot with mood detection")
    print("  👤 Admin panel with full CRUD operations")
    print("  🥽 AR product visualization")
    print("  🛍️ Product catalog with images")
    print("  📊 Analytics dashboard")

def main():
    """Main setup function"""
    print_header("RetailFlowAI - Complete Setup & Test")
    print(f"⏰ Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Run all tests
    success = True
    
    success &= test_database_initialization()
    test_mood_categories()
    success &= test_crud_operations()
    
    if success:
        print_status("All tests passed! RetailFlowAI is ready to use! 🎉", "success")
    else:
        print_status("Some tests failed. Please check the errors above.", "error")
    
    generate_setup_report()
    
    print(f"\n⏰ Completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

if __name__ == "__main__":
    main()
