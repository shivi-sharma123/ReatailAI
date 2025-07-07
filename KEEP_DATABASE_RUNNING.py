#!/usr/bin/env python3
"""
KEEP DATABASE RUNNING - RetailFlowAI
====================================
This script ensures the database is always connected, populated, and the backend is running.
Run this script to maintain persistent database connectivity.
"""

import os
import sys
import sqlite3
import subprocess
import time
import requests
import json
from datetime import datetime

# Add the client/server directory to the path
current_dir = os.path.dirname(os.path.abspath(__file__))
server_dir = os.path.join(current_dir, 'client', 'server')
sys.path.insert(0, server_dir)

# Import our database functions
try:
    from database import init_database, get_all_products, add_product, get_database_stats
    from add_diverse_products import populate_with_diverse_products
except ImportError as e:
    print(f"❌ Error importing database modules: {e}")
    print("Please ensure you're running this from the RetailFlowAI root directory")
    sys.exit(1)

class DatabaseManager:
    def __init__(self):
        self.server_dir = server_dir
        self.database_path = os.path.join(server_dir, 'retailflow.db')
        self.backend_process = None
        
    def check_database_exists(self):
        """Check if database file exists"""
        exists = os.path.exists(self.database_path)
        print(f"📁 Database file exists: {exists}")
        return exists
        
    def initialize_database(self):
        """Initialize database with tables"""
        try:
            print("🔧 Initializing database...")
            os.chdir(self.server_dir)
            init_database()
            print("✅ Database initialized successfully!")
            return True
        except Exception as e:
            print(f"❌ Database initialization failed: {e}")
            return False
            
    def check_products_count(self):
        """Check how many products are in the database"""
        try:
            os.chdir(self.server_dir)
            products = get_all_products()
            count = len(products)
            print(f"📦 Products in database: {count}")
            return count
        except Exception as e:
            print(f"❌ Error checking products: {e}")
            return 0
            
    def populate_database(self):
        """Populate database with diverse products"""
        try:
            print("🌟 Populating database with diverse products...")
            os.chdir(self.server_dir)
            populate_with_diverse_products()
            count = self.check_products_count()
            print(f"✅ Database populated with {count} products!")
            return True
        except Exception as e:
            print(f"❌ Database population failed: {e}")
            return False
            
    def get_database_health(self):
        """Get comprehensive database health info"""
        try:
            os.chdir(self.server_dir)
            stats = get_database_stats()
            print("🏥 Database Health Report:")
            print(f"   📦 Products: {stats['products_count']}")
            print(f"   🏷️ Categories: {stats['categories_count']}")
            print(f"   🏢 Brands: {stats['brands_count']}")
            print(f"   🥽 AR-enabled: {stats['ar_enabled_count']}")
            print(f"   🔥 Trending: {stats['trending_count']}")
            return stats
        except Exception as e:
            print(f"❌ Error getting database stats: {e}")
            return None
            
    def start_backend_server(self):
        """Start the backend server"""
        try:
            print("🚀 Starting backend server...")
            os.chdir(self.server_dir)
            
            # Start the server process
            self.backend_process = subprocess.Popen(
                [sys.executable, 'app.py'],
                cwd=self.server_dir,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            
            # Wait a moment for the server to start
            time.sleep(3)
            
            # Check if server is running
            if self.backend_process.poll() is None:
                print("✅ Backend server started successfully!")
                return True
            else:
                print("❌ Backend server failed to start")
                return False
                
        except Exception as e:
            print(f"❌ Error starting backend server: {e}")
            return False
            
    def test_api_endpoints(self):
        """Test key API endpoints"""
        endpoints = [
            ('Health Check', 'http://localhost:5000/api/health'),
            ('Products', 'http://localhost:5000/api/products'),
            ('Categories', 'http://localhost:5000/api/categories'),
            ('Brands', 'http://localhost:5000/api/brands')
        ]
        
        print("🧪 Testing API endpoints...")
        results = {}
        
        for name, url in endpoints:
            try:
                response = requests.get(url, timeout=5)
                if response.status_code == 200:
                    print(f"   ✅ {name}: Working")
                    results[name] = 'Working'
                else:
                    print(f"   ❌ {name}: Status {response.status_code}")
                    results[name] = f'Status {response.status_code}'
            except Exception as e:
                print(f"   ❌ {name}: {str(e)}")
                results[name] = f'Error: {str(e)}'
                
        return results
        
    def monitor_database_connection(self, duration_minutes=30):
        """Monitor database connection for a specified duration"""
        print(f"👁️ Monitoring database connection for {duration_minutes} minutes...")
        start_time = time.time()
        end_time = start_time + (duration_minutes * 60)
        
        while time.time() < end_time:
            try:
                # Check database connection
                os.chdir(self.server_dir)
                products = get_all_products()
                
                # Test API health
                response = requests.get('http://localhost:5000/api/health', timeout=5)
                
                if response.status_code == 200 and len(products) > 0:
                    print(f"💓 {datetime.now().strftime('%H:%M:%S')} - Database & API healthy ({len(products)} products)")
                else:
                    print(f"⚠️ {datetime.now().strftime('%H:%M:%S')} - Connection issues detected")
                    
            except Exception as e:
                print(f"❌ {datetime.now().strftime('%H:%M:%S')} - Monitor error: {e}")
                
            time.sleep(30)  # Check every 30 seconds
            
        print("✅ Monitoring completed!")
        
    def run_complete_setup(self):
        """Run complete database setup and server startup"""
        print("=" * 60)
        print("🎯 RETAILFLOWAI DATABASE SETUP & PERSISTENCE")
        print("=" * 60)
        
        # Step 1: Check/Initialize Database
        if not self.check_database_exists():
            if not self.initialize_database():
                return False
        else:
            print("✅ Database file already exists")
            
        # Step 2: Check Products
        product_count = self.check_products_count()
        if product_count < 10:  # Ensure we have enough products
            print(f"📦 Only {product_count} products found, populating database...")
            if not self.populate_database():
                return False
        else:
            print(f"✅ Database has sufficient products ({product_count})")
            
        # Step 3: Get Database Health
        stats = self.get_database_health()
        if not stats:
            return False
            
        # Step 4: Start Backend Server
        if not self.start_backend_server():
            return False
            
        # Step 5: Test API Endpoints
        time.sleep(2)  # Give server time to fully start
        api_results = self.test_api_endpoints()
        
        # Step 6: Final Status Report
        print("\n" + "=" * 60)
        print("🎉 SETUP COMPLETE - STATUS REPORT")
        print("=" * 60)
        print(f"📊 Database: Connected with {stats['products_count']} products")
        print(f"🚀 Backend: Running on http://localhost:5000")
        print(f"🧪 API Tests: {sum(1 for r in api_results.values() if r == 'Working')}/{len(api_results)} passed")
        print("=" * 60)
        
        return True

def main():
    """Main function to run the database manager"""
    manager = DatabaseManager()
    
    if len(sys.argv) > 1:
        command = sys.argv[1].lower()
        
        if command == 'setup':
            manager.run_complete_setup()
        elif command == 'monitor':
            duration = int(sys.argv[2]) if len(sys.argv) > 2 else 30
            manager.monitor_database_connection(duration)
        elif command == 'health':
            manager.get_database_health()
        elif command == 'test':
            manager.test_api_endpoints()
        else:
            print("❌ Unknown command. Use: setup, monitor, health, or test")
    else:
        # Default: run complete setup
        manager.run_complete_setup()
        
        # Ask if user wants to monitor
        monitor = input("\n🤔 Would you like to monitor the database connection? (y/n): ").lower()
        if monitor in ['y', 'yes']:
            duration = input("⏱️ How many minutes to monitor? (default 30): ").strip()
            duration = int(duration) if duration.isdigit() else 30
            manager.monitor_database_connection(duration)

if __name__ == "__main__":
    main()
