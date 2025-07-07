#!/usr/bin/env python3
"""Simple backend server starter with error checking"""

import os
import sys
import subprocess
import sqlite3
import time

def check_database():
    """Check if database exists and has products"""
    db_path = 'retailflow.db'
    if not os.path.exists(db_path):
        print("❌ Database not found. Creating...")
        return False
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    try:
        cursor.execute('SELECT COUNT(*) FROM products')
        count = cursor.fetchone()[0]
        conn.close()
        print(f"✅ Database found with {count} products")
        return count > 0
    except:
        conn.close()
        print("❌ Database exists but tables missing")
        return False

def init_database():
    """Initialize database with products"""
    print("🔄 Initializing database...")
    try:
        result = subprocess.run([sys.executable, 'init_db.py'], 
                              capture_output=True, text=True, timeout=30)
        if result.returncode == 0:
            print("✅ Database initialized successfully")
            return True
        else:
            print(f"❌ Database initialization failed: {result.stderr}")
            return False
    except subprocess.TimeoutExpired:
        print("❌ Database initialization timed out")
        return False
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        return False

def start_server():
    """Start the Flask server"""
    print("🚀 Starting RetailFlowAI Backend Server...")
    print("📊 Server will run on http://localhost:5000")
    print("🤖 Chatbot endpoint: http://localhost:5000/api/chat")
    print("🛍️ Products endpoint: http://localhost:5000/api/products")
    print("💡 Health check: http://localhost:5000/api/health")
    print("="*50)
    
    try:
        # Start the server
        subprocess.run([sys.executable, 'app.py'], check=False)
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
    except Exception as e:
        print(f"❌ Server error: {e}")

def main():
    """Main startup function"""
    print("🚀 RetailFlowAI Backend Startup")
    print("="*40)
    
    # Check if we're in the right directory
    if not os.path.exists('app.py'):
        print("❌ app.py not found. Make sure you're in the server directory")
        sys.exit(1)
    
    # Check database
    if not check_database():
        if not init_database():
            print("❌ Failed to initialize database. Exiting.")
            sys.exit(1)
    
    # Start server
    start_server()

if __name__ == "__main__":
    main()
