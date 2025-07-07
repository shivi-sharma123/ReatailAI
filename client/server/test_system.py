#!/usr/bin/env python3
"""
Quick test to verify database connection and server functionality
"""

import sqlite3
import os
import requests
import time

DATABASE = 'retailflow.db'

def test_database():
    """Test database connection and products"""
    print("🔍 Testing database connection...")
    
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        # Check if products table exists
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='products';")
        table_exists = cursor.fetchone()
        
        if table_exists:
            print("✅ Products table exists")
            
            # Count products
            cursor.execute('SELECT COUNT(*) FROM products')
            count = cursor.fetchone()[0]
            print(f"✅ Found {count} products in database")
            
            # Get sample products
            cursor.execute('SELECT name, mood_category, price, image_url FROM products LIMIT 3')
            sample_products = cursor.fetchall()
            
            print("\n📦 Sample Products:")
            for product in sample_products:
                print(f"   • {product[0]} ({product[1]}) - ${product[2]} - {product[3][:50]}...")
                
        else:
            print("❌ Products table does not exist")
            
        conn.close()
        
    except Exception as e:
        print(f"❌ Database error: {e}")

def test_server():
    """Test server endpoints"""
    print("\n🌐 Testing server endpoints...")
    
    base_url = "http://localhost:5000"
    
    # Test basic connection
    try:
        response = requests.get(f"{base_url}/api/test", timeout=3)
        if response.status_code == 200:
            print("✅ Server is running and responding")
            data = response.json()
            print(f"   Status: {data.get('status')}")
            print(f"   Message: {data.get('message')}")
        else:
            print(f"❌ Server returned status {response.status_code}")
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to server (not running?)")
    except Exception as e:
        print(f"❌ Server test error: {e}")
    
    # Test chatbot endpoint
    try:
        chatbot_data = {'message': 'I feel happy'}
        response = requests.post(f"{base_url}/api/chatbot", json=chatbot_data, timeout=3)
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                print("✅ Chatbot API is working")
                print(f"   Detected mood: {data.get('mood')}")
                print(f"   Found {len(data.get('products', []))} products")
            else:
                print(f"❌ Chatbot error: {data.get('error')}")
        else:
            print(f"❌ Chatbot API returned status {response.status_code}")
    except Exception as e:
        print(f"❌ Chatbot test error: {e}")

if __name__ == "__main__":
    print("🧪 RetailFlowAI System Test")
    print("=" * 40)
    
    test_database()
    test_server()
    
    print("\n" + "=" * 40)
    print("🎯 Test complete!")
