#!/usr/bin/env python3
"""
SIMPLE DATABASE KEEPER - RetailFlowAI
====================================
Simplified script to ensure database and backend are always running
"""

import os
import sys
import sqlite3
import subprocess
import time
import requests
import json
from datetime import datetime

def check_database_connection():
    """Check if database is connected and has products"""
    try:
        # Change to server directory
        current_dir = os.path.dirname(os.path.abspath(__file__))
        server_dir = os.path.join(current_dir, 'client', 'server')
        os.chdir(server_dir)
        
        # Import database functions
        sys.path.insert(0, server_dir)
        from database import get_all_products
        
        products = get_all_products()
        print(f"✅ Database connected with {len(products)} products")
        return len(products)
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return 0

def test_backend_health():
    """Test if backend server is running"""
    try:
        response = requests.get("http://localhost:5000/api/health", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Backend healthy with {data.get('products_count', 0)} products")
            return True
        else:
            print(f"❌ Backend returned status: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Backend not responding: {e}")
        return False

def start_backend_server():
    """Start the backend server"""
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        server_dir = os.path.join(current_dir, 'client', 'server')
        
        print("🚀 Starting backend server...")
        os.chdir(server_dir)
        
        # Start server in background
        process = subprocess.Popen(
            [sys.executable, 'app.py'],
            cwd=server_dir,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        
        # Wait for server to start
        time.sleep(3)
        
        if process.poll() is None:
            print("✅ Backend server started!")
            return True
        else:
            print("❌ Backend server failed to start")
            return False
            
    except Exception as e:
        print(f"❌ Error starting backend: {e}")
        return False

def test_key_endpoints():
    """Test important API endpoints"""
    endpoints = [
        ("Health", "http://localhost:5000/api/health"),
        ("Products", "http://localhost:5000/api/products"),
        ("Recommend", "http://localhost:5000/api/recommend")
    ]
    
    print("🧪 Testing API endpoints:")
    working_count = 0
    
    for name, url in endpoints:
        try:
            if name == "Recommend":
                # POST request for recommend endpoint
                response = requests.post(url, json={"user_input": "I'm happy"}, timeout=5)
            else:
                response = requests.get(url, timeout=5)
                
            if response.status_code == 200:
                print(f"   ✅ {name}: Working")
                working_count += 1
            else:
                print(f"   ❌ {name}: Status {response.status_code}")
        except Exception as e:
            print(f"   ❌ {name}: {str(e)}")
    
    print(f"📊 {working_count}/{len(endpoints)} endpoints working")
    return working_count == len(endpoints)

def monitor_system(minutes=30):
    """Monitor database and backend for specified minutes"""
    print(f"👁️ Monitoring system for {minutes} minutes...")
    start_time = time.time()
    end_time = start_time + (minutes * 60)
    
    while time.time() < end_time:
        timestamp = datetime.now().strftime("%H:%M:%S")
        
        # Check database
        product_count = check_database_connection()
        
        # Check backend
        backend_ok = test_backend_health()
        
        if product_count > 0 and backend_ok:
            print(f"💓 {timestamp} - System healthy")
        else:
            print(f"⚠️ {timestamp} - Issues detected")
            
        time.sleep(30)  # Check every 30 seconds
    
    print("✅ Monitoring completed!")

def full_setup():
    """Run complete setup"""
    print("=" * 50)
    print("🎯 RETAILFLOWAI QUICK SETUP")
    print("=" * 50)
    
    # Step 1: Check database
    product_count = check_database_connection()
    if product_count == 0:
        print("❌ Database has no products or is not accessible")
        return False
    
    # Step 2: Check/start backend
    if not test_backend_health():
        if not start_backend_server():
            return False
        time.sleep(2)  # Give it time to start
        
        if not test_backend_health():
            print("❌ Backend still not responding after restart")
            return False
    
    # Step 3: Test endpoints
    if not test_key_endpoints():
        print("⚠️ Some endpoints are not working properly")
    
    print("\n" + "=" * 50)
    print("🎉 SETUP COMPLETE!")
    print("✅ Database: Connected")
    print("✅ Backend: Running on http://localhost:5000")
    print("✅ API: Ready for requests")
    print("=" * 50)
    
    return True

def main():
    """Main function"""
    if len(sys.argv) > 1:
        command = sys.argv[1].lower()
        
        if command == "setup":
            full_setup()
        elif command == "monitor":
            minutes = int(sys.argv[2]) if len(sys.argv) > 2 else 30
            monitor_system(minutes)
        elif command == "test":
            test_key_endpoints()
        elif command == "db":
            check_database_connection()
        elif command == "backend":
            test_backend_health()
        else:
            print("Available commands: setup, monitor, test, db, backend")
    else:
        # Default: run setup
        if full_setup():
            # Ask about monitoring
            try:
                monitor = input("\n🤔 Monitor system? (y/n): ").lower()
                if monitor in ['y', 'yes']:
                    minutes = input("⏱️ Minutes to monitor (default 30): ").strip()
                    minutes = int(minutes) if minutes.isdigit() else 30
                    monitor_system(minutes)
            except KeyboardInterrupt:
                print("\n👋 Goodbye!")

if __name__ == "__main__":
    main()
