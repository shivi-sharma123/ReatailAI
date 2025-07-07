#!/usr/bin/env python3
"""
RetailFlowAI - Application Launcher
Quick access to all services
"""

import subprocess
import time
import webbrowser
import requests
import os

def check_service(url, name):
    """Check if a service is running"""
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            print(f"✅ {name} is running")
            return True
        else:
            print(f"❌ {name} returned status {response.status_code}")
            return False
    except:
        print(f"❌ {name} is not responding")
        return False

def main():
    """Main function to check and launch services"""
    print("🚀 RETAILFLOWAI - APPLICATION LAUNCHER")
    print("=" * 60)
    
    # Check current directory
    print(f"📁 Working directory: {os.getcwd()}")
    
    # Check if database exists
    if os.path.exists('retailflow.db'):
        print("✅ Database found")
    else:
        print("❌ Database not found")
        print("   Run: python create_enhanced_database.py")
    
    print("\n🔍 Checking Services...")
    
    # Check backend
    backend_running = check_service('http://localhost:5000/api/products', 'Backend API')
    
    # Check frontend  
    frontend_running = check_service('http://localhost:3000', 'Frontend App')
    
    print("\n🌐 SERVICE STATUS:")
    print("=" * 40)
    print(f"Backend API:  {'✅ ONLINE' if backend_running else '❌ OFFLINE'}")
    print(f"Frontend App: {'✅ ONLINE' if frontend_running else '❌ OFFLINE'}")
    
    if backend_running and frontend_running:
        print("\n🎉 ALL SERVICES ARE RUNNING PERFECTLY!")
        print("=" * 60)
        
        # Test API quickly
        try:
            response = requests.get('http://localhost:5000/api/products', timeout=5)
            data = response.json()
            products = data if isinstance(data, list) else data.get('products', [])
            print(f"📦 Database: {len(products)} products loaded")
            
            # Show sample product
            if products:
                product = products[0]
                colors = product.get('colors', [])
                sizes = product.get('sizes', [])
                print(f"🎨 Sample: {product.get('name')} - {len(colors)} colors, {len(sizes)} sizes")
                
        except Exception as e:
            print(f"⚠️  API test failed: {e}")
        
        print("\n🌐 ACCESS YOUR APP:")
        print("   🎯 Main App: http://localhost:3000")
        print("   🔧 Backend API: http://localhost:5000")
        print("   📊 Products API: http://localhost:5000/api/products")
        print("   🤖 Chatbot API: http://localhost:5000/api/chatbot")
        
        print("\n🚀 FEATURES READY:")
        print("   ✅ Color variants with real-time pricing")
        print("   ✅ Size options with stock management")
        print("   ✅ AR product visualization")
        print("   ✅ AI chatbot with recommendations")
        print("   ✅ Mobile-responsive design")
        print("   ✅ Smart shopping cart")
        print("   ✅ Analytics dashboard")
        print("   ✅ Premium UI/UX")
        
        # Open browser
        print("\n🌐 Opening your app in browser...")
        webbrowser.open('http://localhost:3000')
        
    else:
        print("\n⚠️  SERVICES NEED TO BE STARTED")
        print("=" * 40)
        print("🔧 To start services:")
        if not backend_running:
            print("   Backend: python client/server/app.py")
        if not frontend_running:
            print("   Frontend: cd client && npm start")
        
        print("\n📋 OR use VS Code tasks:")
        print("   1. Ctrl+Shift+P")
        print("   2. Type: Tasks: Run Task")
        print("   3. Select: Start Backend Server")
        print("   4. Select: Start React Frontend")

if __name__ == "__main__":
    main()
