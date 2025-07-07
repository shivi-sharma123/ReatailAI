import sqlite3

conn = sqlite3.connect('retailflow.db')
cursor = conn.cursor()

# Update the waterproof jacket with a better image
new_image_url = "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400"

cursor.execute(
    'UPDATE products SET image_url = ? WHERE name = "Waterproof Jacket"',
    (new_image_url,)
)

conn.commit()

# Verify the update
cursor.execute('SELECT id, name, image_url FROM products WHERE name = "Waterproof Jacket"')
result = cursor.fetchone()

print(f"Updated Waterproof Jacket:")
print(f"ID: {result[0]}, Name: {result[1]}")
print(f"New Image URL: {result[2]}")

conn.close()
print("✅ Waterproof jacket image updated successfully!")
