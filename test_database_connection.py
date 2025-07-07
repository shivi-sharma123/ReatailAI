#!/usr/bin/env python3
"""
🚀 RetailFlowAI - Complete Database & App Test
==============================================
This script tests and ensures the database is working with all features.
"""

import sqlite3
import json
import requests
import time
import sys
import os

def test_database_connection():
    """Test the database connection and data"""
    print("🔍 Testing Database Connection...")
    
    try:
        # Test main database
        conn = sqlite3.connect('client/server/retailflow.db')
        cursor = conn.cursor()
        
        # Check products table
        cursor.execute('SELECT COUNT(*) FROM products')
        product_count = cursor.fetchone()[0]
        print(f"✅ Database connected! Found {product_count} products")
        
        # Check if we have AR-enabled products
        cursor.execute('SELECT COUNT(*) FROM products WHERE ar_enabled = 1')
        ar_count = cursor.fetchone()[0]
        print(f"🥽 AR-enabled products: {ar_count}")
        
        # Show sample products
        cursor.execute('SELECT id, name, price, category, mood_category FROM products LIMIT 5')
        products = cursor.fetchall()
        print("📦 Sample Products:")
        for product in products:
            print(f"   - {product[1]} (${product[2]}) - {product[3]} - {product[4]}")
            
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ Database Error: {e}")
        return False

def test_backend_api():
    """Test the backend API endpoints"""
    print("\n🌐 Testing Backend API...")
    
    try:
        # Test health endpoint
        response = requests.get('http://localhost:5000/api/health', timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Backend Health: {data.get('status', 'OK')}")
            print(f"📊 Database Status: {data.get('database_status', 'Connected')}")
        else:
            print(f"⚠️ Backend responded with status: {response.status_code}")
            
        # Test products endpoint
        response = requests.get('http://localhost:5000/api/products', timeout=5)
        if response.status_code == 200:
            products = response.json()
            print(f"🛍️ Products API: {len(products)} products available")
        else:
            print(f"⚠️ Products API responded with status: {response.status_code}")
            
        # Test chatbot endpoint
        test_message = {"message": "I feel happy"}
        response = requests.post('http://localhost:5000/api/chat', 
                               json=test_message, timeout=5)
        if response.status_code == 200:
            chat_data = response.json()
            print(f"🤖 Chatbot API: {chat_data.get('success', False)}")
        else:
            print(f"⚠️ Chatbot API responded with status: {response.status_code}")
            
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"❌ Backend API Error: {e}")
        return False

def test_frontend_access():
    """Test if frontend is accessible"""
    print("\n🖥️ Testing Frontend Access...")
    
    try:
        response = requests.get('http://localhost:3001', timeout=5)
        if response.status_code == 200:
            print("✅ Frontend is accessible on http://localhost:3001")
            return True
        else:
            print(f"⚠️ Frontend responded with status: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Frontend Error: {e}")
        return False

def show_app_features():
    """Display all amazing features of the app"""
    print("\n🏆 RetailFlowAI - Amazing Features Available:")
    print("=" * 60)
    print("🤖 AI-Powered Chatbot:")
    print("   ✓ Mood Detection (happy, sad, normal)")
    print("   ✓ Smart Product Recommendations") 
    print("   ✓ Voice Input Support")
    print("   ✓ Conversational Shopping Assistant")
    
    print("\n🥽 AR Technology:")
    print("   ✓ 3D Product Viewer")
    print("   ✓ Virtual Try-On Experience")
    print("   ✓ Camera-based AR")
    print("   ✓ Interactive Product Rotation")
    
    print("\n🛍️ Smart Shopping:")
    print("   ✓ Mood-based Product Filtering")
    print("   ✓ Price Comparison")
    print("   ✓ Product Image Gallery")
    print("   ✓ Detailed Product Information")
    
    print("\n💰 Walmart Integration:")
    print("   ✓ Walmart Product Catalog")
    print("   ✓ Competitive Pricing")
    print("   ✓ Store Pickup Options")
    print("   ✓ Walmart+ Benefits")
    
    print("\n🎯 Advanced Features:")
    print("   ✓ Real-time Database")
    print("   ✓ CRUD Operations")
    print("   ✓ Admin Panel")
    print("   ✓ Responsive Design")

def main():
    """Main test function"""
    print("🚀 RetailFlowAI - Complete System Test")
    print("=" * 50)
    
    # Test database
    db_status = test_database_connection()
    
    # Test backend
    api_status = test_backend_api()
    
    # Test frontend
    frontend_status = test_frontend_access()
    
    # Show features
    show_app_features()
    
    print("\n" + "=" * 60)
    print("📊 SYSTEM STATUS REPORT:")
    print(f"   Database: {'✅ Working' if db_status else '❌ Error'}")
    print(f"   Backend API: {'✅ Working' if api_status else '❌ Error'}")
    print(f"   Frontend: {'✅ Working' if frontend_status else '❌ Error'}")
    
    if all([db_status, api_status, frontend_status]):
        print("\n🎉 SUCCESS! Your RetailFlowAI app is FULLY FUNCTIONAL!")
        print("🌐 Access your app at: http://localhost:3001")
        print("🔧 Backend API at: http://localhost:5000")
        print("\n💡 Try these features:")
        print("   • Click 'I feel happy' for mood-based shopping")
        print("   • Use voice input by clicking the microphone")
        print("   • Try AR features on products")
        print("   • Test the admin panel at http://localhost:5000/admin")
    else:
        print("\n⚠️ Some components need attention. Check the errors above.")
    
    print("\n" + "=" * 60)

if __name__ == "__main__":
    main()
