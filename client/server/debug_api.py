#!/usr/bin/env python3
"""Debug the API issues"""

import requests
import json

def debug_api_issues():
    """Debug specific API endpoint issues"""
    
    base_url = "http://localhost:5000"
    
    print("🔍 DEBUGGING API ISSUES")
    print("=" * 40)
    
    # Test 1: Simple health check
    print("\n1️⃣ Testing Health Check:")
    try:
        response = requests.get(f"{base_url}/api/health", timeout=5)
        print(f"   Status: {response.status_code}")
        if response.status_code == 200:
            print(f"   Response: {response.json()}")
        else:
            print(f"   Error: {response.text}")
    except Exception as e:
        print(f"   Exception: {e}")
    
    # Test 2: GET all products
    print("\n2️⃣ Testing GET /api/products:")
    try:
        response = requests.get(f"{base_url}/api/products", timeout=5)
        print(f"   Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Products count: {len(data.get('products', []))}")
        else:
            print(f"   Error: {response.text}")
    except Exception as e:
        print(f"   Exception: {e}")
    
    # Test 3: POST recommend with simple input
    print("\n3️⃣ Testing POST /api/recommend:")
    try:
        test_data = {"user_input": "happy"}
        response = requests.post(f"{base_url}/api/recommend", 
                               json=test_data, 
                               timeout=5)
        print(f"   Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Mood: {data.get('mood', 'unknown')}")
            print(f"   Recommendations: {len(data.get('recommendations', []))}")
        else:
            print(f"   Error: {response.text}")
    except Exception as e:
        print(f"   Exception: {e}")
    
    # Test 4: Direct database query
    print("\n4️⃣ Testing Direct Database Access:")
    try:
        import sqlite3
        conn = sqlite3.connect('retailflow.db')
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM products")
        count = cursor.fetchone()[0]
        print(f"   Products in database: {count}")
        
        cursor.execute("SELECT name, mood_category FROM products LIMIT 3")
        samples = cursor.fetchall()
        print("   Sample products:")
        for name, mood in samples:
            print(f"     - {name} (mood: {mood})")
        
        conn.close()
    except Exception as e:
        print(f"   Database Error: {e}")

if __name__ == "__main__":
    debug_api_issues()
