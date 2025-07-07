import sqlite3

# Check retailflow.db database
conn = sqlite3.connect('retailflow.db')
cursor = conn.cursor()

# Check tables
cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
tables = cursor.fetchall()
print('Tables in retailflow.db:')
for table in tables:
    print(f'- {table[0]}')
print()

# Check products
try:
    cursor.execute('SELECT COUNT(*) FROM products')
    count = cursor.fetchone()[0]
    print(f'Total products in database: {count}')

    cursor.execute('SELECT name, category, ar_enabled FROM products LIMIT 10')
    products = cursor.fetchall()
    print('\nFirst 10 products:')
    for product in products:
        print(f'- {product[0]} ({product[1]}) - AR: {product[2]}')
except Exception as e:
    print(f'Error checking products: {e}')

conn.close()
