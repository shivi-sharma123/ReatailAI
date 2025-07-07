import sys
import os
import subprocess

print("🚀 Starting RetailFlowAI Backend Server...")

# Change to project directory
project_dir = os.getcwd()
server_path = os.path.join(project_dir, "client", "server", "app.py")

print(f"📂 Project directory: {project_dir}")
print(f"🔧 Server path: {server_path}")

if os.path.exists(server_path):
    print("✅ Backend file found!")
    try:
        # Start the server
        os.chdir(os.path.join(project_dir, "client", "server"))
        print("📂 Changed to server directory")
        
        # Import and run the Flask app
        sys.path.insert(0, os.getcwd())
        import app
        print("✅ Backend server started successfully!")
        print("🌐 Server running on http://localhost:5000")
        print("📋 Available endpoints:")
        print("   - GET  /api/products")
        print("   - POST /api/chatbot")
        print("   - GET  /api/analytics")
        print("   - GET  /api/health")
        
    except Exception as e:
        print(f"❌ Error starting server: {e}")
else:
    print(f"❌ Backend file not found at: {server_path}")
