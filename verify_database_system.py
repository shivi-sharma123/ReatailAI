"""
RetailFlowAI - Database Connection Verification & System Status
This script ensures the database is properly connected and all systems are operational.
"""

import sqlite3
import requests
import json
import os
from datetime import datetime

def verify_database_connection():
    """Verify database connection and data integrity"""
    print("💾 VERIFYING DATABASE CONNECTION")
    print("=" * 50)
    
    db_file = 'retailflow.db'
    
    # Check file existence
    if not os.path.exists(db_file):
        print(f"❌ Database file {db_file} not found!")
        return False
    
    print(f"✅ Database file found: {db_file}")
    print(f"📁 File size: {os.path.getsize(db_file):,} bytes")
    
    try:
        conn = sqlite3.connect(db_file)
        cursor = conn.cursor()
        
        # Check all required tables
        required_tables = [
            'products', 'user_interactions', 'analytics',
            'mood_analytics', 'mood_patterns', 'real_time_analytics', 'mood_summary'
        ]
        
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        existing_tables = [row[0] for row in cursor.fetchall()]
        
        print(f"📊 Tables in database: {len(existing_tables)}")
        for table in existing_tables:
            cursor.execute(f"SELECT COUNT(*) FROM {table}")
            count = cursor.fetchone()[0]
            print(f"   ✅ {table}: {count} records")
        
        # Verify products have enhanced fields
        cursor.execute("PRAGMA table_info(products)")
        columns = [row[1] for row in cursor.fetchall()]
        
        enhanced_fields = ['mood_category', 'ar_enabled', 'rating', 'reviews']
        missing_fields = [field for field in enhanced_fields if field not in columns]
        
        if missing_fields:
            print(f"⚠️ Missing enhanced fields: {missing_fields}")
        else:
            print("✅ All enhanced product fields present")
        
        # Test sample data
        cursor.execute("SELECT name, mood_category, ar_enabled FROM products LIMIT 3")
        samples = cursor.fetchall()
        print("🛍️ Sample products:")
        for product in samples:
            print(f"   - {product[0]} ({product[1]}) AR: {bool(product[2])}")
        
        conn.close()
        print("✅ Database connection verified successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Database error: {e}")
        return False

def test_api_endpoints():
    """Test all API endpoints"""
    print("\n🌐 TESTING API ENDPOINTS")
    print("=" * 50)
    
    endpoints = [
        ('GET', '/api/products', 'Products API'),
        ('GET', '/api/mood-analytics', 'Mood Analytics API'),
        ('POST', '/api/enhanced-recommend', 'Enhanced Recommendations API')
    ]
    
    base_url = 'http://localhost:5000'
    
    for method, endpoint, name in endpoints:
        try:
            if method == 'GET':
                response = requests.get(f"{base_url}{endpoint}", timeout=10)
            else:
                # POST request with test data
                test_data = {'message': 'I feel happy and want party clothes!'}
                response = requests.post(f"{base_url}{endpoint}", 
                                       json=test_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if endpoint == '/api/products':
                    print(f"✅ {name}: {len(data)} products")
                elif endpoint == '/api/mood-analytics':
                    mood_count = len(data.get('mood_summary', []))
                    metrics_count = len(data.get('real_time_metrics', []))
                    print(f"✅ {name}: {mood_count} moods, {metrics_count} metrics")
                elif endpoint == '/api/enhanced-recommend':
                    mood = data.get('mood', 'unknown')
                    products = len(data.get('products', []))
                    confidence = data.get('confidence_score', 0) * 100
                    print(f"✅ {name}: Mood={mood}, Products={products}, Confidence={confidence:.1f}%")
            else:
                print(f"❌ {name}: HTTP {response.status_code}")
                
        except requests.exceptions.ConnectionError:
            print(f"❌ {name}: Backend not running")
        except Exception as e:
            print(f"❌ {name}: Error - {e}")

def check_frontend_status():
    """Check frontend status"""
    print("\n🎨 CHECKING FRONTEND STATUS")
    print("=" * 50)
    
    try:
        response = requests.get('http://localhost:3000', timeout=5)
        if response.status_code == 200:
            print("✅ Frontend React app is running")
            print("🌐 URL: http://localhost:3000")
            
            # Check if analytics dashboard component exists
            dashboard_file = 'client/src/EnhancedAnalyticsDashboard.js'
            if os.path.exists(dashboard_file):
                print("✅ Enhanced Analytics Dashboard component found")
            else:
                print("⚠️ Analytics Dashboard component missing")
                
        else:
            print(f"❌ Frontend HTTP error: {response.status_code}")
    except Exception as e:
        print(f"❌ Frontend error: {e}")

def create_system_status_report():
    """Create a comprehensive system status report"""
    print("\n📋 SYSTEM STATUS REPORT")
    print("=" * 50)
    
    status = {
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'database': 'Unknown',
        'backend': 'Unknown',
        'frontend': 'Unknown',
        'analytics': 'Unknown'
    }
    
    # Database status
    if os.path.exists('retailflow.db'):
        try:
            conn = sqlite3.connect('retailflow.db')
            cursor = conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM products")
            product_count = cursor.fetchone()[0]
            conn.close()
            status['database'] = f'✅ Connected ({product_count} products)'
        except:
            status['database'] = '❌ Connection error'
    else:
        status['database'] = '❌ File not found'
    
    # Backend status
    try:
        response = requests.get('http://localhost:5000/api/products', timeout=3)
        if response.status_code == 200:
            status['backend'] = '✅ Running (Port 5000)'
        else:
            status['backend'] = f'❌ HTTP {response.status_code}'
    except:
        status['backend'] = '❌ Not running'
    
    # Frontend status
    try:
        response = requests.get('http://localhost:3000', timeout=3)
        if response.status_code == 200:
            status['frontend'] = '✅ Running (Port 3000)'
        else:
            status['frontend'] = f'❌ HTTP {response.status_code}'
    except:
        status['frontend'] = '❌ Not running'
    
    # Analytics status
    try:
        response = requests.get('http://localhost:5000/api/mood-analytics', timeout=3)
        if response.status_code == 200:
            data = response.json()
            mood_count = len(data.get('mood_summary', []))
            status['analytics'] = f'✅ Active ({mood_count} moods)'
        else:
            status['analytics'] = '❌ API error'
    except:
        status['analytics'] = '❌ Not available'
    
    print(f"📅 Report Time: {status['timestamp']}")
    print(f"💾 Database: {status['database']}")
    print(f"🔧 Backend: {status['backend']}")
    print(f"🎨 Frontend: {status['frontend']}")
    print(f"📊 Analytics: {status['analytics']}")
    
    # Overall status
    all_working = all('✅' in str(v) for k, v in status.items() if k != 'timestamp')
    
    if all_working:
        print("\n🎉 SYSTEM STATUS: ALL SYSTEMS OPERATIONAL! 🎉")
        print("🚀 Ready for demonstration!")
        print("🌐 Open: http://localhost:3000")
    else:
        print("\n⚠️ SYSTEM STATUS: ISSUES DETECTED")
        print("🔧 Please check the components marked with ❌")
    
    return status

def main():
    """Main verification function"""
    print("🔍 RETAILFLOWAI - SYSTEM VERIFICATION")
    print("=" * 70)
    print("Checking database connection and system status...")
    print()
    
    # Step 1: Verify database
    db_ok = verify_database_connection()
    
    # Step 2: Test APIs
    test_api_endpoints()
    
    # Step 3: Check frontend
    check_frontend_status()
    
    # Step 4: Create status report
    status = create_system_status_report()
    
    print("\n" + "=" * 70)
    print("🎯 VERIFICATION COMPLETE!")
    print("=" * 70)
    
    return status

if __name__ == "__main__":
    main()
