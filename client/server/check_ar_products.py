import sqlite3

# Connect to database
conn = sqlite3.connect('retailflow.db')
cursor = conn.cursor()

# Check if products exist
cursor.execute('SELECT COUNT(*) FROM products')
count = cursor.fetchone()[0]
print(f"Total products: {count}")

# Check AR enabled products
cursor.execute('SELECT name, category, ar_enabled, image_url FROM products WHERE ar_enabled = 1 LIMIT 5')
products = cursor.fetchall()
print(f"\nAR-enabled products:")
for p in products:
    print(f"- {p[0]} ({p[1]}) - AR: {p[2]} - Image: {p[3][:50] if p[3] else 'None'}...")

# Check if any products lack AR flag
cursor.execute('SELECT name, category, ar_enabled FROM products WHERE ar_enabled IS NULL OR ar_enabled = 0 LIMIT 3')
products = cursor.fetchall()
print(f"\nNon-AR products:")
for p in products:
    print(f"- {p[0]} ({p[1]}) - AR: {p[2]}")

conn.close()
