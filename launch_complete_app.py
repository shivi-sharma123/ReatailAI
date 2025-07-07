import subprocess
import sys
import time
import requests
import os
from threading import Thread

def start_backend():
    """Start the Flask backend server"""
    print("🚀 Starting Backend Server...")
    os.chdir(r"c:\Users\sharm\OneDrive\Desktop\RetailFlowAI")
    try:
        subprocess.run([sys.executable, "client/server/app.py"], check=True)
    except Exception as e:
        print(f"❌ Backend error: {e}")

def test_backend():
    """Test if backend is responding"""
    max_attempts = 10
    for i in range(max_attempts):
        try:
            response = requests.get("http://localhost:5000/api/products", timeout=5)
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Backend is running! Found {len(data.get('products', []))} products")
                return True
        except Exception as e:
            print(f"⏳ Attempt {i+1}/{max_attempts}: Backend not ready yet...")
            time.sleep(2)
    
    print("❌ Backend failed to start or respond")
    return False

def start_frontend():
    """Start React frontend"""
    print("🌐 Frontend should be running on http://localhost:3000")
    print("🎮 Admin Panel: http://localhost:3000/admin")
    print("🤖 Chatbot: http://localhost:3000/chatbot")

def main():
    print("🎯 RetailFlowAI Complete Launcher")
    print("="*50)
    
    # Start backend in a separate thread
    backend_thread = Thread(target=start_backend, daemon=True)
    backend_thread.start()
    
    # Wait a moment for backend to start
    time.sleep(3)
    
    # Test backend
    if test_backend():
        start_frontend()
        print("\n🎉 App is ready!")
        print("\n📋 Features available:")
        print("• 🛍️  Product management with AR variants")
        print("• 🎨 Color selection for each product")
        print("• 📏 Size options with pricing")
        print("• 🥽 AR viewer with 360° rotation")
        print("• 🤖 AI chatbot with mood-based recommendations")
        print("• 📊 Analytics and reporting")
        
        print("\n🔧 How to use AR:")
        print("1. Go to Admin Panel or Chatbot")
        print("2. Click 'View AR' or 'Try AR' on any product")
        print("3. Select different colors and sizes")
        print("4. Enjoy 360° AR viewing experience!")
        
        # Keep the script running
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("\n⏹️  Shutting down...")
    else:
        print("❌ Failed to start backend. Please check for errors.")

if __name__ == "__main__":
    main()
