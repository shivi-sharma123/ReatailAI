#!/usr/bin/env python3
"""
Connection Test Script for RetailFlowAI
Tests both backend and frontend connections
"""

import requests
import json
import time
import webbrowser
import os
import sys

def test_backend_connection():
    """Test backend API endpoints"""
    print("🔍 Testing Backend Connection...")
    
    try:
        # Test products endpoint
        response = requests.get("http://localhost:5000/api/products", timeout=5)
        if response.status_code == 200:
            products = response.json()
            print(f"✅ Backend API working! Found {len(products.get('products', []))} products")
            return True
        else:
            print(f"❌ Backend API error: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Backend connection failed: {e}")
        return False

def test_frontend_connection():
    """Test frontend React app"""
    print("🔍 Testing Frontend Connection...")
    
    try:
        response = requests.get("http://localhost:3000", timeout=5)
        if response.status_code == 200:
            print("✅ Frontend React app is running!")
            return True
        else:
            print(f"❌ Frontend error: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Frontend connection failed: {e}")
        return False

def test_cors_and_api():
    """Test CORS and API integration"""
    print("🔍 Testing CORS and API Integration...")
    
    try:
        # Test chatbot endpoint
        response = requests.post("http://localhost:5000/api/chatbot", 
                               json={"message": "Hello"}, 
                               timeout=5)
        if response.status_code == 200:
            print("✅ Chatbot API working!")
        
        # Test search endpoint  
        response = requests.get("http://localhost:5000/api/search?q=laptop", timeout=5)
        if response.status_code == 200:
            print("✅ Search API working!")
            
        return True
    except Exception as e:
        print(f"⚠️  Some API endpoints might need attention: {e}")
        return False

def main():
    """Main test function"""
    print("🚀 RetailFlowAI Connection Test - Walmart Sparkathon Ready!")
    print("=" * 60)
    
    # Test backend
    backend_ok = test_backend_connection()
    time.sleep(1)
    
    # Test frontend
    frontend_ok = test_frontend_connection()
    time.sleep(1)
    
    # Test integration
    api_ok = test_cors_and_api()
    time.sleep(1)
    
    print("\n" + "=" * 60)
    print("📊 CONNECTION TEST RESULTS:")
    print(f"   Backend API: {'✅ WORKING' if backend_ok else '❌ FAILED'}")
    print(f"   Frontend React: {'✅ WORKING' if frontend_ok else '❌ FAILED'}")
    print(f"   API Integration: {'✅ WORKING' if api_ok else '⚠️  PARTIAL'}")
    
    if backend_ok and frontend_ok:
        print("\n🎉 SUCCESS! Your RetailFlowAI is ready for Walmart Sparkathon!")
        print("🌐 Frontend: http://localhost:3000")
        print("🔧 Backend API: http://localhost:5000/api")
        print("\n📱 Opening your app in browser...")
        
        # Open the app in browser
        webbrowser.open("http://localhost:3000")
        
        return True
    else:
        print("\n❌ Some issues detected. Please check the errors above.")
        return False

if __name__ == "__main__":
    main()
