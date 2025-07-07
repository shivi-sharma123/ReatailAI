#!/usr/bin/env python3
"""
RetailFlowAI Complete Status Verification
This script verifies that both frontend and backend are running correctly
"""

import requests
import json
import time
from datetime import datetime

def check_frontend():
    """Check if React frontend is accessible"""
    try:
        response = requests.get('http://localhost:3000', timeout=5)
        if response.status_code == 200:
            print("✅ FRONTEND: React app is running on http://localhost:3000")
            return True
        else:
            print(f"❌ FRONTEND: Responded with status {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ FRONTEND: Not accessible - {e}")
        return False

def check_backend():
    """Check if Flask backend is accessible"""
    try:
        response = requests.get('http://localhost:5000/api/products', timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ BACKEND: Flask API is running on http://localhost:5000")
            print(f"✅ DATABASE: Connected with {len(data)} products")
            return True, data
        else:
            print(f"❌ BACKEND: API responded with status {response.status_code}")
            return False, None
    except requests.exceptions.RequestException as e:
        print(f"❌ BACKEND: Not accessible - {e}")
        return False, None

def check_features(products):
    """Check if products have color and size features"""
    if not products:
        print("❌ FEATURES: No products to check")
        return False
    
    has_colors = any(p.get('available_colors') for p in products)
    has_sizes = any(p.get('available_sizes') for p in products)
    has_ar = any(p.get('ar_enabled') for p in products)
    
    print(f"✅ FEATURES: Colors available: {has_colors}")
    print(f"✅ FEATURES: Sizes available: {has_sizes}")
    print(f"✅ FEATURES: AR enabled: {has_ar}")
    
    return has_colors and has_sizes

def main():
    """Main verification function"""
    print("🚀 RetailFlowAI Complete Status Check")
    print("=" * 50)
    print(f"⏰ Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 50)
    
    # Check frontend
    frontend_ok = check_frontend()
    print()
    
    # Check backend and database
    backend_ok, products = check_backend()
    print()
    
    # Check features
    if products:
        features_ok = check_features(products)
        print()
    else:
        features_ok = False
    
    # Final status
    print("=" * 50)
    print("🎯 FINAL STATUS")
    print("=" * 50)
    
    if frontend_ok and backend_ok and features_ok:
        print("🎉 SUCCESS: RetailFlowAI is FULLY FUNCTIONAL!")
        print("✅ Frontend: Running")
        print("✅ Backend: Running")
        print("✅ Database: Connected")
        print("✅ Features: Working")
        print()
        print("🚀 Your app is ready to use!")
        print("🔗 Frontend: http://localhost:3000")
        print("🔗 Backend: http://localhost:5000/api/products")
        return True
    else:
        print("❌ ISSUES DETECTED:")
        if not frontend_ok:
            print("  - Frontend not accessible")
        if not backend_ok:
            print("  - Backend not accessible")
        if not features_ok:
            print("  - Features not working properly")
        return False

if __name__ == "__main__":
    success = main()
    if success:
        print("\n🎊 Congratulations! Your RetailFlowAI app is working perfectly!")
    else:
        print("\n⚠️  Some issues need to be resolved.")
