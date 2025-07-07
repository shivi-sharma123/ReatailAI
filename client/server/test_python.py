print("Python is working!")
import sqlite3
print("SQLite3 is available")

# Test database creation
conn = sqlite3.connect('test.db')
cursor = conn.cursor()
cursor.execute('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, name TEXT)')
cursor.execute("INSERT INTO test (name) VALUES ('Hello World')")
conn.commit()

cursor.execute('SELECT * FROM test')
results = cursor.fetchall()
print(f"Database test successful: {results}")
conn.close()
