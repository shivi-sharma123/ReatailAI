"""
RetailFlowAI Backend Startup Script
Quick launch for Walmart Sparkathon demo
"""

import subprocess
import sys
import os
import time

def install_requirements():
    """Install required packages."""
    print("🔧 Installing backend dependencies...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Dependencies installed successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install dependencies: {e}")
        return False

def start_backend():
    """Start the Flask backend server."""
    print("🚀 Starting RetailFlowAI Backend Server...")
    print("📊 Tier 1 APIs Ready:")
    print("   • /api/analytics - Real-time business analytics")
    print("   • /api/recommendations - AI-powered product suggestions")
    print("   • /api/cart/optimize - Smart price optimization")
    print("   • /api/search/voice - Advanced voice search processing")
    print("\n🌐 Backend will be available at: http://localhost:5000")
    print("🔥 Walmart Sparkathon Victory Mode: ACTIVATED!")
    print("-" * 60)
    
    try:
        # Change to backend directory
        backend_dir = os.path.dirname(os.path.abspath(__file__))
        os.chdir(backend_dir)
        
        # Start Flask app
        subprocess.run([sys.executable, "app.py"])
        
    except KeyboardInterrupt:
        print("\n🛑 Backend server stopped by user")
    except Exception as e:
        print(f"❌ Error starting backend: {e}")

if __name__ == "__main__":
    print("=" * 60)
    print("🏆 RETAILFLOWAI TIER 1 BACKEND - SPARKATHON EDITION")
    print("=" * 60)
    
    # Install dependencies first
    if install_requirements():
        time.sleep(1)
        start_backend()
    else:
        print("❌ Cannot start backend without dependencies. Please check your Python environment.")
        sys.exit(1)
