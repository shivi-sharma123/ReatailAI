import requests
import json

def test_api_connection():
    """Test RetailFlowAI API connection and functionality"""
    print("🧪 Testing RetailFlowAI API Connection...")
    print("-" * 40)
    
    base_url = "http://localhost:5000"
    
    # Test health endpoint
    try:
        response = requests.get(f"{base_url}/api/health", timeout=5)
        if response.status_code == 200:
            print("✅ Health Check: Backend is running!")
        else:
            print(f"⚠️ Health Check: Status {response.status_code}")
    except Exception as e:
        print(f"❌ Health Check Failed: {e}")
        return False
    
    # Test products endpoint
    try:
        response = requests.get(f"{base_url}/api/products", timeout=5)
        if response.status_code == 200:
            data = response.json()
            products_count = len(data.get('products', []))
            print(f"✅ Products API: {products_count} products loaded")
            
            # Show first product as sample
            if products_count > 0:
                first_product = data['products'][0]
                print(f"   📦 Sample: {first_product.get('name', 'Unknown')}")
                print(f"   💰 Price: ${first_product.get('price', 0)}")
                print(f"   🥽 AR Enabled: {first_product.get('ar_enabled', False)}")
        else:
            print(f"⚠️ Products API: Status {response.status_code}")
    except Exception as e:
        print(f"❌ Products API Failed: {e}")
        return False
    
    # Test analytics endpoint
    try:
        response = requests.get(f"{base_url}/api/analytics", timeout=5)
        if response.status_code == 200:
            data = response.json()
            analytics_count = len(data.get('analytics', []))
            print(f"✅ Analytics API: {analytics_count} analytics entries")
        else:
            print(f"⚠️ Analytics API: Status {response.status_code}")
    except Exception as e:
        print(f"❌ Analytics API Failed: {e}")
    
    print("-" * 40)
    print("🎉 API Connection Test Complete!")
    return True

if __name__ == "__main__":
    test_api_connection()
