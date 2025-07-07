import sys
import os
import subprocess
import time

def start_backend_server():
    """Start the Flask backend server in the background"""
    print("🚀 Starting RetailFlowAI Backend Server...")
    
    # Get paths
    project_dir = os.getcwd()
    server_file = os.path.join(project_dir, "client", "server", "app.py")
    
    if not os.path.exists(server_file):
        print(f"❌ Backend file not found: {server_file}")
        return False
    
    try:
        # Start server in background
        print("🔧 Starting Flask server in background...")
        process = subprocess.Popen([
            sys.executable, server_file
        ], cwd=os.path.join(project_dir, "client", "server"))
        
        print(f"✅ Backend started with PID: {process.pid}")
        print("🌐 Server should be running on http://localhost:5000")
        
        # Wait a moment for server to start
        time.sleep(3)
        
        # Test connection
        try:
            import requests
            response = requests.get("http://localhost:5000/api/health", timeout=5)
            if response.status_code == 200:
                print("✅ Backend is responding!")
                return True
            else:
                print("❌ Backend started but not responding correctly")
                return False
        except Exception as e:
            print(f"⏳ Backend starting... (might need more time): {e}")
            return True  # Assume it's starting
            
    except Exception as e:
        print(f"❌ Failed to start backend: {e}")
        return False

if __name__ == "__main__":
    if start_backend_server():
        print("\n🎉 Backend started successfully!")
        print("\n📋 Next steps:")
        print("1. Make sure React frontend is running on http://localhost:3000")
        print("2. Go to Admin Panel: http://localhost:3000/admin")
        print("3. Go to Chatbot: http://localhost:3000/chatbot")
        print("4. Test AR features by clicking 'View AR' or 'Try AR' buttons")
        print("\n🥽 AR Features available:")
        print("• Click different colors to change product appearance")
        print("• Select different sizes to see price updates")
        print("• Drag mouse to rotate products 360°")
        print("• Toggle AR mode for enhanced effects")
        
        # Keep script running to show status
        try:
            print("\n⏳ Press Ctrl+C to stop monitoring...")
            while True:
                time.sleep(5)
                try:
                    import requests
                    response = requests.get("http://localhost:5000/api/health", timeout=2)
                    if response.status_code == 200:
                        print("✅ Backend still running...")
                    else:
                        print("⚠️  Backend not responding")
                except:
                    print("❌ Backend connection lost")
                    break
        except KeyboardInterrupt:
            print("\n⏹️  Monitoring stopped by user")
    else:
        print("❌ Failed to start backend")
        input("Press Enter to exit...")
