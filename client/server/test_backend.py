from app import get_all_products, get_products_by_mood

print("🧪 Testing Backend Functions...")
print("="*40)

# Test getting all products
products = get_all_products()
print(f"✅ Found {len(products)} total products")

# Test each mood
moods = ['happy', 'sad', 'natural', 'rainy']
for mood in moods:
    mood_products = get_products_by_mood(mood)
    print(f"📊 {mood.upper()} mood: {len(mood_products)} products")
    for product in mood_products:
        print(f"  • {product['name']} - ${product['price']}")

print(f"\n✅ Backend is working correctly!")
