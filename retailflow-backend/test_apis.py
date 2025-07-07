"""
API Testing Script for RetailFlowAI Tier 1 Backend
Tests all 4 essential APIs for Walmart Sparkathon
"""

import requests
import json
import time
from datetime import datetime

BASE_URL = "http://localhost:5000"

def test_api_endpoint(endpoint, method="GET", data=None, description=""):
    """Test a single API endpoint."""
    print(f"\n🧪 Testing {endpoint}")
    print(f"📝 {description}")
    print("-" * 50)
    
    try:
        url = f"{BASE_URL}{endpoint}"
        
        if method == "GET":
            response = requests.get(url, timeout=10)
        elif method == "POST":
            response = requests.post(url, json=data, timeout=10)
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ SUCCESS!")
            
            # Print key information from response
            if 'data' in result:
                data_keys = list(result['data'].keys())[:5]  # Show first 5 keys
                print(f"📊 Data Keys: {data_keys}")
                
                # Show specific highlights for each API
                if 'totalRevenue' in result['data']:
                    print(f"💰 Total Revenue: ${result['data']['totalRevenue']:,}")
                elif 'recommendations' in result['data']:
                    rec_count = len(result['data']['recommendations'])
                    print(f"🎯 Recommendations: {rec_count} products")
                elif 'total_savings' in result['data']:
                    savings = result['data']['total_savings']
                    print(f"💸 Cart Savings: ${savings}")
                elif 'results' in result['data']:
                    result_count = len(result['data']['results'])
                    print(f"🔍 Search Results: {result_count} items")
            
            return True
        else:
            print(f"❌ FAILED: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ CONNECTION ERROR: Backend server not running!")
        print("🚀 Please start the backend first with: python start_backend.py")
        return False
    except Exception as e:
        print(f"❌ ERROR: {e}")
        return False

def main():
    """Run comprehensive API tests."""
    print("=" * 60)
    print("🏆 RETAILFLOWAI TIER 1 API TEST SUITE")
    print("🎯 Walmart Sparkathon Victory Edition")
    print("=" * 60)
    
    # Test data for different APIs
    test_cases = [
        {
            "endpoint": "/api/health",
            "method": "GET",
            "description": "Health check - verify backend is running"
        },
        {
            "endpoint": "/api/analytics",
            "method": "GET", 
            "description": "Real-time analytics dashboard data"
        },
        {
            "endpoint": "/api/recommendations",
            "method": "POST",
            "data": {
                "userId": "sparkathon_judge_001",
                "category": "Electronics",
                "priceRange": [50, 500]
            },
            "description": "AI-powered product recommendations"
        },
        {
            "endpoint": "/api/cart/optimize",
            "method": "POST",
            "data": {
                "items": [
                    {"name": "iPhone 15", "price": 799.99, "quantity": 1, "category": "Electronics"},
                    {"name": "AirPods Pro", "price": 249.99, "quantity": 1, "category": "Electronics"},
                    {"name": "Apple Watch", "price": 399.99, "quantity": 1, "category": "Electronics"}
                ],
                "userTier": "premium"
            },
            "description": "Smart cart price optimization"
        },
        {
            "endpoint": "/api/search/voice",
            "method": "POST",
            "data": {
                "text": "find me the best wireless headphones under 200 dollars"
            },
            "description": "Voice search processing with NLP"
        }
    ]
    
    # Run all tests
    passed = 0
    total = len(test_cases)
    
    for test_case in test_cases:
        success = test_api_endpoint(
            test_case["endpoint"],
            test_case["method"],
            test_case.get("data"),
            test_case["description"]
        )
        if success:
            passed += 1
        time.sleep(1)  # Brief pause between tests
    
    # Results summary
    print("\n" + "=" * 60)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 60)
    print(f"✅ Passed: {passed}/{total} tests")
    print(f"❌ Failed: {total - passed}/{total} tests")
    
    if passed == total:
        print("\n🎉 ALL TESTS PASSED! Backend is ready for Sparkathon victory! 🏆")
        print("🚀 Your Tier 1 APIs are working perfectly!")
        print("🔥 Judges will be impressed by this backend functionality!")
    else:
        print(f"\n⚠️  {total - passed} tests failed. Please check the backend server.")
        
    print("\n🌐 Backend URL: http://localhost:5000")
    print("📁 API Documentation: Check app.py for full API details")

if __name__ == "__main__":
    main()
