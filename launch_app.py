#!/usr/bin/env python3
"""
Complete RetailFlowAI Application Launcher
This script ensures the database is properly connected and starts both backend and frontend
"""
import os
import sys
import subprocess
import time
import requests
import sqlite3
from pathlib import Path

def check_database():
    """Check if database exists and has products"""
    db_path = "retailflow.db"
    if not os.path.exists(db_path):
        print("❌ Database not found!")
        return False
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM products")
        count = cursor.fetchone()[0]
        conn.close()
        print(f"✅ Database connected! Found {count} products")
        return True
    except Exception as e:
        print(f"❌ Database error: {e}")
        return False

def start_backend():
    """Start the Flask backend server"""
    print("🚀 Starting Backend Server...")
    
    # Navigate to client/server directory and start app.py
    server_path = os.path.join("client", "server", "app.py")
    if os.path.exists(server_path):
        cmd = [sys.executable, server_path]
        return subprocess.Popen(cmd, cwd=os.getcwd())
    else:
        print("❌ Backend server file not found!")
        return None

def start_frontend():
    """Start the React frontend"""
    print("🚀 Starting Frontend Server...")
    
    client_dir = "client"
    if os.path.exists(client_dir):
        if os.name == 'nt':  # Windows
            cmd = ["npm", "start"]
        else:  # Unix/Linux/Mac
            cmd = ["npm", "start"]
        
        return subprocess.Popen(cmd, cwd=client_dir, shell=True)
    else:
        print("❌ Client directory not found!")
        return None

def wait_for_backend():
    """Wait for backend to be ready"""
    print("⏳ Waiting for backend to start...")
    
    for i in range(30):  # Wait up to 30 seconds
        try:
            response = requests.get("http://localhost:5000/api/health", timeout=2)
            if response.status_code == 200:
                print("✅ Backend is ready!")
                return True
        except:
            pass
        
        time.sleep(1)
        print(f"   Waiting... ({i+1}/30)")
    
    print("❌ Backend failed to start!")
    return False

def test_api_connection():
    """Test API endpoints"""
    print("🔧 Testing API connections...")
    
    try:
        # Test products endpoint
        response = requests.get("http://localhost:5000/api/products")
        if response.status_code == 200:
            data = response.json()
            products = data.get('products', [])
            print(f"✅ Products API: {len(products)} products available")
        else:
            print("❌ Products API failed")
            return False
        
        # Test chatbot endpoint
        response = requests.post("http://localhost:5000/api/chatbot", 
                               json={"message": "I feel happy today"})
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Chatbot API: Detected mood '{data.get('mood', 'unknown')}'")
        else:
            print("❌ Chatbot API failed")
            return False
        
        return True
        
    except Exception as e:
        print(f"❌ API test failed: {e}")
        return False

def main():
    """Main application launcher"""
    print("🛍️ RetailFlowAI - Complete Application Launcher")
    print("=" * 60)
    
    # Check database
    if not check_database():
        print("Please run setup_database.py first!")
        return False
    
    # Start backend
    backend_process = start_backend()
    if not backend_process:
        return False
    
    # Wait for backend to be ready
    if not wait_for_backend():
        backend_process.terminate()
        return False
    
    # Test API connections
    if not test_api_connection():
        backend_process.terminate()
        return False
    
    # Start frontend
    frontend_process = start_frontend()
    if not frontend_process:
        backend_process.terminate()
        return False
    
    print("=" * 60)
    print("🎉 RetailFlowAI is now running!")
    print("🌐 Frontend: http://localhost:3000")
    print("🔧 Backend API: http://localhost:5000")
    print("📊 Database: Connected and ready")
    print("=" * 60)
    print("Press Ctrl+C to stop all services")
    
    try:
        # Keep the script running
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n🛑 Stopping services...")
        backend_process.terminate()
        frontend_process.terminate()
        print("✅ All services stopped!")

if __name__ == "__main__":
    main()
