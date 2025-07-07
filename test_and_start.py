#!/usr/bin/env python3
"""
Simple test to start the backend and test mood responses
"""

import os
import sys
import subprocess
import time
import requests
import threading

def start_backend():
    """Start the Flask backend"""
    os.chdir(r"c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\server")
    subprocess.run([sys.executable, "app.py"])

def test_backend():
    """Test the backend after it starts"""
    print("⏳ Waiting for backend to start...")
    time.sleep(5)
    
    try:
        # Test health endpoint
        response = requests.get("http://localhost:5000/api/health", timeout=5)
        if response.status_code == 200:
            print("✅ Backend is running!")
            
            # Test mood detection
            test_cases = [
                "I'm feeling happy today!",
                "I'm sad and need comfort",
                "I need something for a rainy day"
            ]
            
            for test_case in test_cases:
                print(f"\n🧪 Testing: '{test_case}'")
                try:
                    chat_response = requests.post("http://localhost:5000/api/chat", 
                                                json={"message": test_case}, 
                                                timeout=10)
                    
                    if chat_response.status_code == 200:
                        data = chat_response.json()
                        if data.get('success'):
                            print(f"✅ Mood: {data.get('mood')}")
                            print(f"🛍️  Products: {len(data.get('products', []))}")
                        else:
                            print(f"❌ Error: {data.get('error')}")
                    else:
                        print(f"❌ HTTP Error: {chat_response.status_code}")
                        
                except Exception as e:
                    print(f"❌ Test failed: {e}")
        else:
            print(f"❌ Backend health check failed: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Backend not accessible: {e}")

def main():
    print("🚀 Starting RetailFlowAI Backend for Testing")
    print("=" * 50)
    
    # Start backend in a separate thread
    backend_thread = threading.Thread(target=start_backend, daemon=True)
    backend_thread.start()
    
    # Test the backend
    test_backend()
    
    print("\n💡 If backend is working, test the frontend at http://localhost:3000")
    print("💡 The backend will keep running. Press Ctrl+C to stop.")
    
    try:
        # Keep the main thread alive
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n👋 Stopping...")

if __name__ == "__main__":
    main()
