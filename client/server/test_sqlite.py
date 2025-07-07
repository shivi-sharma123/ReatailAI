import sqlite3
print("Testing basic SQLite functionality...")

try:
    conn = sqlite3.connect('test_db.sqlite')
    cursor = conn.cursor()
    
    cursor.execute('CREATE TABLE test (id INTEGER PRIMARY KEY, name TEXT)')
    cursor.execute("INSERT INTO test (name) VALUES ('Test Product')")
    conn.commit()
    
    cursor.execute('SELECT * FROM test')
    result = cursor.fetchone()
    print(f"Test successful: {result}")
    
    conn.close()
    print("SQLite is working correctly!")
    
except Exception as e:
    print(f"Error: {e}")
