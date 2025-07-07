import requests
import subprocess
import os
import time

def check_service_status():
    print("🔍 Checking RetailFlowAI Services Status...")
    print("=" * 50)
    
    # Check Backend (Port 5000)
    try:
        response = requests.get("http://localhost:5000/api/products", timeout=5)
        if response.status_code == 200:
            print("✅ Backend (Port 5000): RUNNING")
        else:
            print("❌ Backend (Port 5000): ERROR")
    except:
        print("❌ Backend (Port 5000): NOT RUNNING")
    
    # Check Frontend (Port 3000)
    try:
        response = requests.get("http://localhost:3000", timeout=5)
        if response.status_code == 200:
            print("✅ Frontend (Port 3000): RUNNING")
        else:
            print("❌ Frontend (Port 3000): ERROR")
    except:
        print("❌ Frontend (Port 3000): NOT RUNNING")
    
    print("=" * 50)
    
    # Check if processes are running on ports
    print("🔍 Checking Port Usage...")
    try:
        result = subprocess.run(["netstat", "-ano"], capture_output=True, text=True)
        lines = result.stdout.split('\n')
        
        port_3000_used = any(":3000" in line for line in lines)
        port_5000_used = any(":5000" in line for line in lines)
        
        print(f"Port 3000 in use: {'YES' if port_3000_used else 'NO'}")
        print(f"Port 5000 in use: {'YES' if port_5000_used else 'NO'}")
        
    except Exception as e:
        print(f"Error checking ports: {e}")

def start_services():
    print("\n🚀 Starting Services...")
    
    # Start Backend
    print("Starting Backend...")
    backend_dir = r"c:\Users\sharm\OneDrive\Desktop\RetailFlowAI"
    backend_process = subprocess.Popen(
        ["python", "client/server/app.py"],
        cwd=backend_dir,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    
    # Wait a moment
    time.sleep(2)
    
    # Start Frontend
    print("Starting Frontend...")
    frontend_dir = r"c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client"
    frontend_process = subprocess.Popen(
        ["npm", "start"],
        cwd=frontend_dir,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        env={**os.environ, "BROWSER": "none"}
    )
    
    print("Services started! Check status in a few seconds...")
    time.sleep(5)
    check_service_status()

if __name__ == "__main__":
    check_service_status()
    
    # Ask user if they want to start services
    user_input = input("\nWould you like to start the services? (y/n): ")
    if user_input.lower() == 'y':
        start_services()
    else:
        print("\nTo manually start services:")
        print("Backend: python client/server/app.py")
        print("Frontend: cd client && npm start")
