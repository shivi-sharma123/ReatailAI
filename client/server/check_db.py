import sqlite3

conn = sqlite3.connect('retailflow.db')
cursor = conn.cursor()

cursor.execute('SELECT id, name, image_url FROM products WHERE name LIKE "%Waterproof%"')
results = cursor.fetchall()

print("Waterproof jacket entries:")
for row in results:
    print(f"ID: {row[0]}, Name: {row[1]}, Image: {row[2]}")

conn.close()
