#!/usr/bin/env python3
"""
Diagnostic script to check for common issues in RetailFlowAI
"""

import os
import sys
import json
import sqlite3
import requests
import subprocess
from pathlib import Path

def check_file_exists(file_path, description):
    """Check if a file exists"""
    if os.path.exists(file_path):
        print(f"✅ {description}: {file_path}")
        return True
    else:
        print(f"❌ {description} NOT FOUND: {file_path}")
        return False

def check_database():
    """Check database status"""
    db_path = r"c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\server\retailflow.db"
    try:
        if os.path.exists(db_path):
            conn = sqlite3.connect(db_path)
            cursor = conn.cursor()
            
            # Check if products table exists and has data
            cursor.execute("SELECT COUNT(*) FROM products")
            product_count = cursor.fetchone()[0]
            print(f"✅ Database found with {product_count} products")
            
            # Check table structure
            cursor.execute("PRAGMA table_info(products)")
            columns = cursor.fetchall()
            print(f"✅ Products table has {len(columns)} columns")
            
            conn.close()
            return True
        else:
            print(f"❌ Database not found: {db_path}")
            return False
    except Exception as e:
        print(f"❌ Database error: {e}")
        return False

def check_backend():
    """Check backend server"""
    try:
        response = requests.get("http://localhost:5000/api/health", timeout=5)
        if response.status_code == 200:
            print("✅ Backend server is responding")
            
            # Test chat endpoint
            chat_response = requests.post("http://localhost:5000/api/chat", 
                                        json={"message": "test"}, timeout=5)
            if chat_response.status_code == 200:
                data = chat_response.json()
                print(f"✅ Chat endpoint working, success: {data.get('success')}")
            else:
                print(f"⚠️ Chat endpoint returned: {chat_response.status_code}")
            
            return True
        else:
            print(f"⚠️ Backend server returned: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Backend server not accessible: {e}")
        return False

def check_frontend():
    """Check frontend server"""
    try:
        response = requests.get("http://localhost:3000", timeout=5)
        if response.status_code == 200:
            print("✅ Frontend server is responding")
            return True
        else:
            print(f"⚠️ Frontend server returned: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Frontend server not accessible: {e}")
        return False

def check_package_json():
    """Check package.json for dependencies"""
    package_json_path = r"c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\package.json"
    try:
        with open(package_json_path, 'r') as f:
            package_data = json.load(f)
        
        required_deps = ['react', 'react-dom', 'react-scripts']
        missing_deps = []
        
        dependencies = package_data.get('dependencies', {})
        for dep in required_deps:
            if dep not in dependencies:
                missing_deps.append(dep)
        
        if missing_deps:
            print(f"❌ Missing dependencies: {missing_deps}")
            return False
        else:
            print("✅ All required dependencies found")
            return True
            
    except Exception as e:
        print(f"❌ Error checking package.json: {e}")
        return False

def check_python_requirements():
    """Check Python requirements"""
    requirements_path = r"c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\server\requirements.txt"
    if os.path.exists(requirements_path):
        print("✅ Requirements.txt found")
        try:
            import flask
            import flask_cors
            print("✅ Flask and Flask-CORS installed")
            return True
        except ImportError as e:
            print(f"❌ Missing Python dependencies: {e}")
            return False
    else:
        print(f"❌ Requirements.txt not found: {requirements_path}")
        return False

def main():
    print("🔍 RetailFlowAI Diagnostic Check")
    print("=" * 50)
    
    # Check critical files
    critical_files = [
        (r"c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\src\App.js", "App.js"),
        (r"c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\src\Chatbot.js", "Chatbot.js"),
        (r"c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\src\Admin.js", "Admin.js"),
        (r"c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\src\BasicARViewer.js", "BasicARViewer.js"),
        (r"c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\src\WalmartFeatures.js", "WalmartFeatures.js"),
        (r"c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\server\app.py", "Backend app.py"),
        (r"c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\package.json", "package.json"),
    ]
    
    files_ok = True
    for file_path, description in critical_files:
        if not check_file_exists(file_path, description):
            files_ok = False
    
    print("\n📦 Checking Dependencies...")
    deps_ok = check_package_json() and check_python_requirements()
    
    print("\n🗄️ Checking Database...")
    db_ok = check_database()
    
    print("\n🌐 Checking Servers...")
    backend_ok = check_backend()
    frontend_ok = check_frontend()
    
    print("\n" + "=" * 50)
    print("📊 DIAGNOSTIC SUMMARY")
    print("=" * 50)
    
    if files_ok and deps_ok and db_ok and backend_ok and frontend_ok:
        print("🎉 ALL CHECKS PASSED! Your app should be working perfectly.")
    else:
        print("⚠️ Issues detected:")
        if not files_ok:
            print("   - Missing critical files")
        if not deps_ok:
            print("   - Missing dependencies")
        if not db_ok:
            print("   - Database issues")
        if not backend_ok:
            print("   - Backend server issues")
        if not frontend_ok:
            print("   - Frontend server issues")
    
    print("\n💡 Quick fixes:")
    if not backend_ok:
        print("   - Start backend: python client/server/app.py")
    if not frontend_ok:
        print("   - Start frontend: cd client && npm start")
    if not db_ok:
        print("   - Initialize database: python client/server/create_db.py")
    if not deps_ok:
        print("   - Install dependencies: cd client && npm install")

if __name__ == "__main__":
    main()
