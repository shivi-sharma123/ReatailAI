import sqlite3

conn = sqlite3.connect('retailflow.db')
cursor = conn.cursor()

# Add more waterproof jacket options
new_jackets = [
    ("Premium Rain Jacket", "Clothing", "rainy", 129.99, "Professional waterproof jacket with breathable fabric", "🧥", 
     "https://images.unsplash.com/photo-1520637836862-4d197d17c43a?w=400", "Patagonia", 4.8, "waterproof,premium,breathable", 1, 25),
    
    ("Lightweight Rain Coat", "Clothing", "rainy", 69.99, "Packable and lightweight rain protection", "☔", 
     "https://images.unsplash.com/photo-1559563458-527698bf5295?w=400", "Columbia", 4.4, "lightweight,packable,rain", 0, 40),
     
    ("Heavy Duty Waterproof Parka", "Clothing", "rainy", 199.99, "Ultimate protection for extreme weather", "🧥", 
     "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400", "North Face", 4.9, "heavy-duty,parka,extreme", 1, 15)
]

cursor.executemany('''
    INSERT INTO products (name, category, mood_category, price, description, emoji, image_url, brand, rating, tags, is_trending, stock_quantity)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
''', new_jackets)

conn.commit()

# Show all rain jackets
cursor.execute('SELECT name, price, brand, image_url FROM products WHERE mood_category = "rainy" AND category = "Clothing"')
results = cursor.fetchall()

print("All Rain Jackets in Database:")
for i, jacket in enumerate(results, 1):
    print(f"{i}. {jacket[0]} - ${jacket[1]} by {jacket[2]}")
    print(f"   Image: {jacket[3]}")
    print()

conn.close()
print(f"✅ Added {len(new_jackets)} new waterproof jackets!")
