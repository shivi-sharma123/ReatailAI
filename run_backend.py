#!/usr/bin/env python3
import os
import sys
import subprocess
import time

print("🚀 Starting RetailFlowAI Backend Server...")

# Change to server directory
server_dir = r"c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\server"
os.chdir(server_dir)
print(f"📁 Working directory: {os.getcwd()}")

# Check if app.py exists
if not os.path.exists("app.py"):
    print("❌ app.py not found!")
    sys.exit(1)

print("✅ Found app.py")
print("🔧 Starting Flask server...")

try:
    # Start the Flask app
    subprocess.run([sys.executable, "app.py"], check=True)
except KeyboardInterrupt:
    print("\n🛑 Server stopped by user")
except Exception as e:
    print(f"❌ Error: {e}")
    print("💡 Make sure you have all required packages installed:")
    print("   pip install flask flask-cors sqlite3")
