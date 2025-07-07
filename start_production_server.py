#!/usr/bin/env python3
"""
Production Server Launcher for RetailFlowAI
Uses Waitress WSGI server instead of Flask development server
"""

import os
import sys
import subprocess

def start_production_server():
    """Start the production server using Waitress"""
    print("🚀 RETAILFLOWAI - PRODUCTION SERVER")
    print("=" * 50)
    print("✅ Starting production WSGI server...")
    print("🌐 Server will run on http://localhost:5000")
    print("📊 No development warnings!")
    print("⚡ Better performance than development server")
    print("🔒 More secure for production use")
    print("=" * 50)
    
    # Change to server directory
    server_dir = os.path.join(os.path.dirname(__file__), 'client', 'server')
    os.chdir(server_dir)
    
    try:
        # Start Waitress server
        print("Starting Waitress WSGI server...")
        subprocess.run([
            sys.executable, '-m', 'waitress',
            '--host=0.0.0.0',
            '--port=5000',
            'app:app'
        ])
    except KeyboardInterrupt:
        print("\n👋 Production server stopped by user")
    except Exception as e:
        print(f"❌ Server error: {e}")
        print("💡 Falling back to development server...")
        
        # Fallback to development server
        try:
            subprocess.run([sys.executable, 'app.py'])
        except KeyboardInterrupt:
            print("\n👋 Development server stopped by user")

if __name__ == "__main__":
    start_production_server()
