import requests
import json

# Test the chatbot endpoint
response = requests.post('http://localhost:5000/api/chatbot', json={'message': 'I need luxury handbags'}, timeout=10)
print(f'Status: {response.status_code}')
data = response.json()
print(f'Message: {data.get("message", "No message")}')
print(f'Mood: {data.get("mood", "No mood")}')
print(f'Products: {len(data.get("products", []))}')
if data.get('products'):
    for i, product in enumerate(data.get('products', [])[:3]):
        print(f'  {i+1}. {product.get("name", "Unknown")} - {product.get("category", "Unknown")} - ${product.get("price", 0)}')
else:
    print("No products returned")
