import requests
import json

def test_backend():
    print("🧪 Testing RetailFlowAI Backend Connection...")
    
    base_url = "http://localhost:5000"
    
    # Test 1: Health check
    try:
        print("\n1️⃣ Testing health endpoint...")
        response = requests.get(f"{base_url}/api/health", timeout=5)
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.text}")
    except Exception as e:
        print(f"   ❌ Health check failed: {e}")
        return False
    
    # Test 2: Smart recommendations
    try:
        print("\n2️⃣ Testing smart recommendations...")
        data = {"input": "I feel happy", "preferences": {}}
        response = requests.post(f"{base_url}/api/smart-recommend", 
                               json=data, timeout=10)
        print(f"   Status: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"   Success: {result.get('success', False)}")
            print(f"   Products found: {len(result.get('products', []))}")
        else:
            print(f"   Response: {response.text}")
    except Exception as e:
        print(f"   ❌ Smart recommendations failed: {e}")
    
    # Test 3: Regular chat
    try:
        print("\n3️⃣ Testing regular chat...")
        data = {"message": "hello"}
        response = requests.post(f"{base_url}/api/chat", 
                               json=data, timeout=10)
        print(f"   Status: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"   Success: {result.get('success', False)}")
            print(f"   Response: {result.get('response', 'No response')[:100]}...")
        else:
            print(f"   Response: {response.text}")
    except Exception as e:
        print(f"   ❌ Regular chat failed: {e}")
    
    # Test 4: Products endpoint
    try:
        print("\n4️⃣ Testing products endpoint...")
        response = requests.get(f"{base_url}/api/products", timeout=5)
        print(f"   Status: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"   Products found: {len(result)}")
        else:
            print(f"   Response: {response.text}")
    except Exception as e:
        print(f"   ❌ Products test failed: {e}")
    
    print("\n✅ Backend testing complete!")
    return True

if __name__ == "__main__":
    test_backend()
