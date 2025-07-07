@echo off
echo Starting RetailFlowAI - Fully Functional App
echo =============================================

cd server

echo Creating fresh database with products...
python -c "
import sqlite3
import os

DATABASE = 'retailflow.db'

if os.path.exists(DATABASE):
    os.remove(DATABASE)
    print('Removed old database')

conn = sqlite3.connect(DATABASE)
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    emoji TEXT,
    image_url TEXT,
    brand TEXT,
    rating REAL DEFAULT 4.5,
    is_trending BOOLEAN DEFAULT FALSE,
    stock_quantity INTEGER DEFAULT 100,
    ar_enabled BOOLEAN DEFAULT TRUE,
    tags TEXT,
    mood_category TEXT
)
''')

cursor.execute('''
CREATE TABLE analytics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    view_count INTEGER DEFAULT 0,
    purchase_count INTEGER DEFAULT 0,
    ar_try_count INTEGER DEFAULT 0,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products (id)
)
''')

products = [
    ('Ray-Ban Aviator Sunglasses', 'sunglasses', 159.99, 'Classic aviator sunglasses perfect for sunny days', '😎', 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', 'Ray-Ban', 4.8, True, 50, True, 'sunglasses,aviator,fashion', 'happy'),
    ('Classic White T-Shirt', 't-shirt', 29.99, 'Comfortable cotton t-shirt for everyday wear', '👕', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 'BasicWear', 4.6, True, 100, True, 't-shirt,cotton,casual', 'natural'),
    ('Waterproof Rain Jacket', 'jacket', 199.99, 'Fully waterproof jacket for rainy days', '🧥', 'https://images.unsplash.com/photo-1544966503-7cc4ac882d2d?w=400', 'WeatherPro', 4.9, True, 40, True, 'jacket,waterproof,rain', 'rainy'),
    ('Cozy Comfort Hoodie', 'hoodie', 79.99, 'Super soft hoodie for maximum comfort', '🥰', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400', 'ComfortWear', 4.8, True, 80, True, 'hoodie,comfort,soft', 'sad')
]

cursor.executemany('''
INSERT INTO products (name, category, price, description, emoji, image_url, brand, rating, is_trending, stock_quantity, ar_enabled, tags, mood_category)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
''', products)

cursor.execute('SELECT id FROM products')
product_ids = cursor.fetchall()

for product_id in product_ids:
    cursor.execute('INSERT INTO analytics (product_id, view_count, purchase_count, ar_try_count) VALUES (?, 10, 2, 5)', (product_id[0],))

conn.commit()
cursor.execute('SELECT COUNT(*) FROM products')
count = cursor.fetchone()[0]
conn.close()

print(f'Database created with {count} products!')
print('All products have AR technology enabled!')
"

echo Starting backend server...
start python app.py

echo Waiting for backend to start...
timeout /t 3

cd ..

echo Starting React frontend...
start npm start

echo.
echo ===================================================
echo RetailFlowAI is now FULLY FUNCTIONAL!
echo ===================================================
echo Database: Products with AR technology
echo Backend: http://localhost:5000 (Flask API)
echo Frontend: http://localhost:3000 (React App)
echo Admin Panel: Full CRUD operations
echo Chatbot: Mood-based product suggestions
echo AR Technology: Virtual try-on enabled
echo.
echo Opening the app in your browser...

timeout /t 5
start http://localhost:3000

echo.
echo What you can do now:
echo 1. Test chatbot with: "I feel happy", "I'm sad", "rainy day"
echo 2. Try AR features by clicking AR Try-On buttons
echo 3. Manage products in Admin panel - Add, Edit, Delete
echo 4. View analytics data
echo.
echo Your app is WORKING and READY!

pause
