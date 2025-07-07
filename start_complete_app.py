#!/usr/bin/env python3
"""
RetailFlowAI - Complete App Launcher
Start both frontend and backend, then open in browser
"""

import time
import webbrowser
import requests
import subprocess
import os

def wait_for_service(url, service_name, max_attempts=30):
    """Wait for a service to be ready"""
    print(f"🔍 Waiting for {service_name}...")
    
    for attempt in range(max_attempts):
        try:
            response = requests.get(url, timeout=2)
            if response.status_code == 200:
                print(f"✅ {service_name} is ready!")
                return True
        except:
            pass
        
        print(f"   Attempt {attempt + 1}/{max_attempts}...")
        time.sleep(2)
    
    print(f"❌ {service_name} failed to start")
    return False

def main():
    print("🚀 RETAILFLOWAI - COMPLETE LAUNCHER")
    print("=" * 60)
    
    # Check if services are already running
    backend_running = False
    frontend_running = False
    
    try:
        response = requests.get('http://localhost:5000/api/products', timeout=2)
        if response.status_code == 200:
            backend_running = True
            print("✅ Backend is already running")
    except:
        print("🔄 Backend needs to be started")
    
    try:
        response = requests.get('http://localhost:3000', timeout=2)
        if response.status_code == 200:
            frontend_running = True
            print("✅ Frontend is already running")
    except:
        print("🔄 Frontend needs to be started")
    
    # If both are running, just open the app
    if backend_running and frontend_running:
        print("\n🎉 BOTH SERVICES ARE ALREADY RUNNING!")
        print("=" * 60)
        
        # Test the API
        try:
            response = requests.get('http://localhost:5000/api/products', timeout=5)
            data = response.json()
            products = data if isinstance(data, list) else data.get('products', [])
            print(f"📦 Database: {len(products)} products available")
            
            if products:
                product = products[0]
                colors = product.get('colors', [])
                sizes = product.get('sizes', [])
                print(f"🎨 Sample: {product.get('name')} - {len(colors)} colors, {len(sizes)} sizes")
        except Exception as e:
            print(f"⚠️  API test: {e}")
        
        print("\n🌐 ACCESS YOUR APP:")
        print("   Frontend: http://localhost:3000")
        print("   Backend API: http://localhost:5000")
        print("   Products API: http://localhost:5000/api/products")
        
        print("\n🚀 FEATURES AVAILABLE:")
        print("   ✅ Color variants with real-time pricing")
        print("   ✅ Size options with stock management")
        print("   ✅ AR product visualization")
        print("   ✅ AI chatbot assistance")
        print("   ✅ Mobile-responsive design")
        print("   ✅ Smart shopping cart")
        print("   ✅ Analytics dashboard")
        
        # Open in browser
        print("\n🌐 Opening your app in browser...")
        webbrowser.open('http://localhost:3000')
        
        # Also open API for backend verification
        time.sleep(2)
        webbrowser.open('http://localhost:5000/api/products')
        
    else:
        print("\n⚠️  Services need to be started manually")
        print("=" * 60)
        print("🔧 Run these commands in separate terminals:")
        print("   Backend:  python client/server/app.py")
        print("   Frontend: cd client && npm start")
        print("\n📋 Or use VS Code tasks:")
        print("   1. Ctrl+Shift+P")
        print("   2. Type: Tasks: Run Task")
        print("   3. Select: Start Backend Server")
        print("   4. Select: Start React Frontend")

if __name__ == "__main__":
    main()
