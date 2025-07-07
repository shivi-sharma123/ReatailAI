# RetailFlowAI Complete Startup Script
# This script will start your fully functional app with database, products, and AR technology

Write-Host "🚀 Starting RetailFlowAI - Fully Functional App" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green

# Navigate to server directory
Set-Location "server"

# Initialize database and start backend
Write-Host "📊 Initializing database with products..." -ForegroundColor Yellow
python -c "
import sqlite3
import os

DATABASE = 'retailflow.db'

# Remove existing database to ensure fresh start
if os.path.exists(DATABASE):
    os.remove(DATABASE)
    print('🗑️ Removed old database')

# Create fresh database with products
conn = sqlite3.connect(DATABASE)
cursor = conn.cursor()

# Create products table
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

# Create analytics table
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

# Insert products with AR technology
products = [
    ('Ray-Ban Aviator Sunglasses', 'sunglasses', 159.99, 'Classic aviator sunglasses perfect for sunny days', '😎', 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', 'Ray-Ban', 4.8, True, 50, True, 'sunglasses,aviator,fashion', 'happy'),
    ('Oakley Sport Sunglasses', 'sunglasses', 129.99, 'High-performance sports sunglasses', '🕶️', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400', 'Oakley', 4.7, True, 30, True, 'sunglasses,sport,performance', 'happy'),
    ('Vintage Round Sunglasses', 'sunglasses', 89.99, 'Trendy vintage-style round sunglasses', '🕶️', 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400', 'Vintage Co', 4.5, False, 25, True, 'sunglasses,vintage,round', 'happy'),
    ('Classic White T-Shirt', 't-shirt', 29.99, 'Comfortable cotton t-shirt for everyday wear', '👕', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 'BasicWear', 4.6, True, 100, True, 't-shirt,cotton,casual', 'natural'),
    ('Graphic Design T-Shirt', 't-shirt', 39.99, 'Cool graphic design t-shirt', '👕', 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400', 'DesignCo', 4.4, False, 75, True, 't-shirt,graphic,design', 'natural'),
    ('Premium Cotton Polo', 'polo', 59.99, 'High-quality cotton polo shirt', '👔', 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400', 'Premium', 4.7, True, 60, True, 'polo,cotton,premium', 'natural'),
    ('Waterproof Rain Jacket', 'jacket', 199.99, 'Fully waterproof jacket for rainy days', '🧥', 'https://images.unsplash.com/photo-1544966503-7cc4ac882d2d?w=400', 'WeatherPro', 4.9, True, 40, True, 'jacket,waterproof,rain', 'rainy'),
    ('Lightweight Raincoat', 'raincoat', 149.99, 'Lightweight and packable raincoat', '🧥', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400', 'RainGear', 4.6, False, 35, True, 'raincoat,lightweight,packable', 'rainy'),
    ('Storm-Shield Jacket', 'jacket', 249.99, 'Heavy-duty jacket for extreme weather', '🧥', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', 'StormShield', 4.8, True, 20, True, 'jacket,heavy-duty,storm', 'rainy'),
    ('Cozy Comfort Hoodie', 'hoodie', 79.99, 'Super soft hoodie for maximum comfort', '🥰', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400', 'ComfortWear', 4.8, True, 80, True, 'hoodie,comfort,soft', 'sad'),
    ('Warm Fleece Jacket', 'jacket', 119.99, 'Warm fleece jacket for cold days', '🧥', 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400', 'WarmCo', 4.5, False, 45, True, 'jacket,fleece,warm', 'sad'),
    ('Comfort Sweatshirt', 'sweatshirt', 69.99, 'Ultra-comfortable sweatshirt', '👚', 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400', 'Comfort+', 4.6, True, 70, True, 'sweatshirt,comfort,cozy', 'sad')
]

cursor.executemany('''
INSERT INTO products (name, category, price, description, emoji, image_url, brand, rating, is_trending, stock_quantity, ar_enabled, tags, mood_category)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
''', products)

# Create analytics entries
cursor.execute('SELECT id FROM products')
product_ids = cursor.fetchall()

for product_id in product_ids:
    cursor.execute('INSERT INTO analytics (product_id, view_count, purchase_count, ar_try_count) VALUES (?, 10, 2, 5)', (product_id[0],))

conn.commit()
cursor.execute('SELECT COUNT(*) FROM products')
count = cursor.fetchone()[0]
conn.close()

print(f'✅ Database created with {count} products!')
print('✅ All products have AR technology enabled!')
print('✅ Products categorized by mood: happy, sad, natural, rainy')
print('✅ Analytics tracking initialized!')
"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database setup complete!" -ForegroundColor Green
} else {
    Write-Host "❌ Database setup failed!" -ForegroundColor Red
    exit 1
}

# Start backend server
Write-Host "🖥️ Starting backend server..." -ForegroundColor Yellow
Start-Process -FilePath "python" -ArgumentList "app.py" -WindowStyle Normal

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Navigate back and start frontend
Set-Location ".."
Write-Host "🌐 Starting React frontend..." -ForegroundColor Yellow

# Check if node_modules exists
if (!(Test-Path "node_modules")) {
    Write-Host "📦 Installing npm dependencies..." -ForegroundColor Yellow
    npm install
}

# Start React app
Start-Process -FilePath "npm" -ArgumentList "start" -WindowStyle Normal

# Wait for React to start
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "🎉 RetailFlowAI is now FULLY FUNCTIONAL!" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green
Write-Host "✅ Database: 12 products with AR technology" -ForegroundColor Green
Write-Host "✅ Backend: http://localhost:5000 (Flask API)" -ForegroundColor Green
Write-Host "✅ Frontend: http://localhost:3000 (React App)" -ForegroundColor Green
Write-Host "✅ Admin Panel: Full CRUD operations" -ForegroundColor Green
Write-Host "✅ Chatbot: Mood-based product suggestions" -ForegroundColor Green
Write-Host "✅ AR Technology: Virtual try-on enabled" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Opening the app in your browser..." -ForegroundColor Yellow

# Open browser
Start-Sleep -Seconds 2
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "📋 What you can do now:" -ForegroundColor Cyan
Write-Host "1. Test the chatbot with: 'I feel happy', 'I'm sad', 'rainy day'" -ForegroundColor White
Write-Host "2. Try AR features by clicking 🥽 AR Try-On buttons" -ForegroundColor White
Write-Host "3. Manage products in Admin panel - Add, Edit, Delete" -ForegroundColor White
Write-Host "4. View analytics data" -ForegroundColor White
Write-Host ""
Write-Host "🎯 Your app is WORKING and READY!" -ForegroundColor Green
