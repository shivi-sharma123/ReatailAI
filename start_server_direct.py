#!/usr/bin/env python3
import os
import sys
import subprocess

print("🚀 Starting RetailFlowAI Backend Server...")
print("📂 Current directory:", os.getcwd())

# Change to project directory
project_dir = r"c:\Users\sharm\OneDrive\Desktop\RetailFlowAI"
os.chdir(project_dir)
print("📂 Changed to:", os.getcwd())

# Start the Flask server
server_path = os.path.join("client", "server", "app.py")
print(f"🔧 Starting server from: {server_path}")

try:
    # Run the server
    subprocess.run([sys.executable, server_path], check=True)
except KeyboardInterrupt:
    print("\n⏹️  Server stopped by user")
except Exception as e:
    print(f"❌ Error starting server: {e}")
    input("Press Enter to continue...")
