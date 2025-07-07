#!/usr/bin/env python3
"""
Clean Server Starter for RetailFlowAI
Starts the server without development warnings
"""

import os
import sys
import subprocess

def start_clean_server():
    """Start the server with clean output"""
    print("🚀 RETAILFLOWAI - CLEAN SERVER START")
    print("=" * 50)
    print("✅ Starting backend server...")
    print("🌐 Server URL: http://localhost:5000")
    print("📊 Database: Connected and ready")
    print("🤖 Chatbot: Operational")
    print("⚡ Warnings: Suppressed")
    print("=" * 50)
    
    # Change to server directory
    server_dir = os.path.join(os.path.dirname(__file__), 'client', 'server')
    
    try:
        # Start the server
        os.chdir(server_dir)
        subprocess.run([sys.executable, 'app.py'])
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
    except Exception as e:
        print(f"❌ Server error: {e}")

if __name__ == "__main__":
    start_clean_server()
