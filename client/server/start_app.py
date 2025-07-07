#!/usr/bin/env python3
"""
RetailFlowAI Startup Script
Starts both backend and provides instructions for frontend
"""

import subprocess
import time
import sys
import os

def start_backend():
    """Start the Flask backend server"""
    print("🚀 Starting RetailFlowAI Backend Server...")
    print("=" * 50)
    
    try:
        # Initialize database first
        import database
        database.init_database()
        print("✅ Database initialized")
        
        # Start Flask server
        print("🔧 Starting Flask server on http://127.0.0.1:5000")
        print("📊 API endpoints available:")
        print("   • GET  /api/products - Get all products")
        print("   • GET  /api/products/mood/<mood> - Get products by mood")
        print("   • POST /api/products - Add new product")
        print("   • PUT  /api/products/<id> - Update product")
        print("   • DELETE /api/products/<id> - Delete product")
        print("   • POST /api/chat - Chat with AI assistant")
        print("   • GET  /api/analytics - Get interaction analytics")
        print()
        print("🌐 Backend ready! Starting server...")
        print("⏸️  Press CTRL+C to stop the server")
        print("=" * 50)
        
        # Start the Flask app
        os.system("python app.py")
        
    except KeyboardInterrupt:
        print("\n👋 Backend server stopped")
    except Exception as e:
        print(f"❌ Error starting backend: {e}")

def show_frontend_instructions():
    """Show instructions for starting the frontend"""
    print("\n" + "=" * 60)
    print("🎨 FRONTEND STARTUP INSTRUCTIONS")
    print("=" * 60)
    print("To start the React frontend, open a NEW terminal and run:")
    print()
    print("   cd c:\\Users\\sharm\\OneDrive\\Desktop\\RetailFlowAI\\client")
    print("   npm start")
    print()
    print("The frontend will be available at: http://localhost:3000")
    print("=" * 60)

def main():
    """Main startup function"""
    print("🤖 RETAILFLOWAI STARTUP MANAGER")
    print("Modern Retail AI Chatbot with AR Features")
    print()
    
    # Show feature summary
    print("✨ FEATURES READY:")
    print("   • 🗄️  SQLite Database with AR support")
    print("   • 🤖 AI-powered mood-based chatbot")
    print("   • 🕶️  AR product try-on capabilities")
    print("   • 📱 Modern React frontend")
    print("   • ⚙️  Complete CRUD operations")
    print("   • 📊 Analytics and user tracking")
    print()
    
    show_frontend_instructions()
    
    # Start backend
    start_backend()

if __name__ == "__main__":
    main()
