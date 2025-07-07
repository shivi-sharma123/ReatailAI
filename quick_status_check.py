#!/usr/bin/env python3
"""
RetailFlowAI - Quick Status Check
Verifies both frontend and backend are running properly
"""

import requests
import json
from datetime import datetime

def check_service(url, name):
    """Check if a service is running"""
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            print(f"✅ {name}: RUNNING - Status {response.status_code}")
            return True
        else:
            print(f"❌ {name}: ERROR - Status {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ {name}: NOT ACCESSIBLE - {e}")
        return False

def main():
    print("🚀 RetailFlowAI Status Check")
    print("=" * 40)
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 40)
    
    # Check backend
    backend_ok = check_service('http://localhost:5000/api/products', 'Backend API')
    
    # Check frontend
    frontend_ok = check_service('http://localhost:3000', 'Frontend')
    
    print("=" * 40)
    
    if backend_ok and frontend_ok:
        print("🎉 SUCCESS: Both services are running!")
        print("🌐 Frontend: http://localhost:3000")
        print("🔗 Backend: http://localhost:5000/api/products")
        print("✅ Your RetailFlowAI app is ready to use!")
    else:
        print("⚠️  Some services are not running:")
        if not backend_ok:
            print("  - Backend needs to be started")
        if not frontend_ok:
            print("  - Frontend needs to be started")

if __name__ == "__main__":
    main()
