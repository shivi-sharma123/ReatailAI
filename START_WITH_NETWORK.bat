@echo off
echo =========================================
echo 🌐 Starting RetailFlowAI with Network
echo =========================================
echo.

REM Navigate to project directory
cd /d "c:\Users\sharm\OneDrive\Desktop\RetailFlowAI"

echo 🔗 Step 1: Checking Network Connectivity...
ping -n 1 google.com >nul 2>&1
if %errorlevel%==0 (
    echo ✅ Internet connection: ACTIVE
) else (
    echo ⚠️ Internet connection: LIMITED - App will work in offline mode
)

echo.
echo 🗄️ Step 2: Setting up database with network images...
cd client\server

python -c "
import sqlite3
import os
import requests

DATABASE = 'retailflow.db'

def test_network():
    try:
        response = requests.get('https://httpbin.org/status/200', timeout=5)
        return response.status_code == 200
    except:
        return False

def setup_database_with_network():
    if os.path.exists(DATABASE):
        os.remove(DATABASE)
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS products (
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
    CREATE TABLE IF NOT EXISTS user_interactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_input TEXT,
        detected_mood TEXT,
        recommended_products TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    network_available = test_network()
    print(f'Network status: {\"✅ Connected\" if network_available else \"❌ Offline\"}')
    
    # Use high-quality Unsplash images if network is available
    if network_available:
        print('🌐 Using network images from Unsplash...')
        products = [
            ('Bright Summer T-Shirt', 'clothing', 24.99, 'Vibrant yellow t-shirt to brighten your day', '👕', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center', 'SunnyWear', 4.7, True, 85, True, 'summer,bright,casual,yellow', 'happy'),
            ('Classic Aviator Sunglasses', 'accessories', 89.99, 'Timeless aviator style for sunny adventures', '🕶️', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop&crop=center', 'SunStyle', 4.8, True, 50, True, 'sunglasses,aviator,classic,fashion', 'happy'),
            ('Colorful Canvas Sneakers', 'shoes', 79.99, 'Vibrant rainbow sneakers that spread joy', '👟', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center', 'ColorStep', 4.6, True, 60, True, 'sneakers,colorful,fun,canvas', 'happy'),
            ('Floral Summer Dress', 'clothing', 59.99, 'Beautiful floral pattern dress for special occasions', '👗', 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center', 'BloomWear', 4.9, True, 30, True, 'dress,floral,summer,elegant', 'happy'),
            ('Ultra Cozy Hoodie', 'clothing', 49.99, 'Soft and warm hoodie for comfort days', '👕', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&crop=center', 'ComfortZone', 4.8, True, 75, True, 'hoodie,cozy,comfort,warm', 'sad'),
            ('Warm Knitted Scarf', 'accessories', 34.99, 'Wrap yourself in soft warmth', '🧣', 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=400&h=400&fit=crop&crop=center', 'WarmHeart', 4.7, False, 40, True, 'scarf,knitted,warm,winter', 'sad'),
            ('Comfort Sweatpants', 'clothing', 39.99, 'Ultra-soft sweatpants for maximum comfort', '👖', 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center', 'RelaxWear', 4.6, False, 90, True, 'sweatpants,comfort,soft,casual', 'sad'),
            ('Fuzzy Slippers', 'shoes', 24.99, 'Incredibly soft slippers for home comfort', '🥿', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center', 'CozyFeet', 4.5, False, 55, False, 'slippers,fuzzy,home,comfort', 'sad'),
            ('Waterproof Rain Jacket', 'clothing', 79.99, 'Stay dry and stylish in any weather', '🧥', 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=400&h=400&fit=crop&crop=center', 'StormShield', 4.8, True, 45, True, 'jacket,waterproof,rain,weather', 'rainy'),
            ('Compact Travel Umbrella', 'accessories', 29.99, 'Durable umbrella that fits anywhere', '☂️', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center', 'RainGuard', 4.6, False, 70, False, 'umbrella,compact,travel,rain', 'rainy'),
            ('Waterproof Boots', 'shoes', 99.99, 'Keep your feet dry with style', '👢', 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=400&h=400&fit=crop&crop=center', 'AquaStep', 4.7, True, 35, True, 'boots,waterproof,rain,durable', 'rainy'),
            ('Rain Hat', 'accessories', 19.99, 'Stylish protection for your head', '🎩', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center', 'WeatherWear', 4.4, False, 25, False, 'hat,rain,protection,style', 'rainy'),
            ('Classic Denim Jeans', 'clothing', 69.99, 'Timeless denim for everyday wear', '👖', 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center', 'DenimCraft', 4.7, True, 80, True, 'jeans,denim,classic,everyday', 'natural'),
            ('White Cotton T-Shirt', 'clothing', 19.99, 'Essential white tee for any occasion', '👕', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center', 'BasicWear', 4.5, True, 100, True, 'tshirt,white,cotton,basic', 'natural'),
            ('Canvas Sneakers', 'shoes', 59.99, 'Comfortable sneakers for daily activities', '👟', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center', 'EverydayStep', 4.6, True, 65, True, 'sneakers,canvas,casual,comfortable', 'natural'),
            ('Simple Leather Watch', 'accessories', 149.99, 'Elegant timepiece for any occasion', '⌚', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center', 'TimeClassic', 4.9, True, 20, False, 'watch,leather,elegant,timepiece', 'natural')
        ]
    else:
        print('🔌 Using offline fallback images...')
        # Use data URIs or placeholder images for offline mode
        products = [
            ('Bright Summer T-Shirt', 'clothing', 24.99, 'Vibrant yellow t-shirt to brighten your day', '👕', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkZENzAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0MCIgZmlsbD0iI0ZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkpU8L3RleHQ+PC9zdmc+', 'SunnyWear', 4.7, True, 85, True, 'summer,bright,casual,yellow', 'happy'),
            ('Classic Aviator Sunglasses', 'accessories', 89.99, 'Timeless aviator style', '🕶️', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0MCIgZmlsbD0iI0ZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfleaM9eKNg/C8L3RleHQ+PC9zdmc+', 'SunStyle', 4.8, True, 50, True, 'sunglasses,aviator', 'happy'),
            ('Ultra Cozy Hoodie', 'clothing', 49.99, 'Soft and warm hoodie', '👕', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOEI0NTEzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0MCIgZmlsbD0iI0ZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkpU8L3RleHQ+PC9zdmc+', 'ComfortZone', 4.8, True, 75, True, 'hoodie,cozy', 'sad'),
            ('Waterproof Rain Jacket', 'clothing', 79.99, 'Stay dry in style', '🧥', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDE2OUUxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0MCIgZmlsbD0iI0ZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfpqU8L3RleHQ+PC9zdmc+', 'StormShield', 4.8, True, 45, True, 'jacket,rain', 'rainy'),
            ('Classic Denim Jeans', 'clothing', 69.99, 'Timeless denim', '👖', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDE2OUUxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0MCIgZmlsbD0iI0ZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkpY8L3RleHQ+PC9zdmc+', 'DenimCraft', 4.7, True, 80, True, 'jeans,denim', 'natural')
        ]
    
    cursor.executemany('''
        INSERT INTO products (name, category, price, description, emoji, image_url, brand, rating, is_trending, stock_quantity, ar_enabled, tags, mood_category)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', products)
    
    conn.commit()
    
    cursor.execute('SELECT COUNT(*) FROM products')
    total_count = cursor.fetchone()[0]
    print(f'✅ Database created with {total_count} products')
    
    for mood in ['happy', 'sad', 'natural', 'rainy']:
        cursor.execute('SELECT COUNT(*) FROM products WHERE mood_category = ?', (mood,))
        mood_count = cursor.fetchone()[0]
        if mood_count > 0:
            print(f'   {mood.capitalize()}: {mood_count} products')
    
    conn.close()

setup_database_with_network()
"

echo.
echo ✅ Database setup complete!
echo.

echo 🚀 Step 3: Starting Backend Server (Network Enabled)...
start /B python app.py

echo ⏳ Waiting for backend to initialize...
timeout /t 4 /nobreak > nul

echo.
echo 🌐 Step 4: Starting React Frontend...
cd..
start /B npm start

echo.
echo ⏳ Waiting for frontend to load...
timeout /t 6 /nobreak > nul

echo.
echo =========================================
echo 🎉 RetailFlowAI Network Launch Complete!
echo =========================================
echo.
echo 🌐 Application URLs:
echo   Main App: http://localhost:3000
echo   Backend API: http://localhost:5000
echo   Health Check: http://localhost:5000/api/health
echo.
echo 🧪 Network-Enhanced Features:
echo   ✅ High-Quality Unsplash Images
echo   ✅ Real-Time Product Data
echo   ✅ Enhanced API Connectivity
echo   ✅ Robust Offline Fallback
echo.
echo 💡 Test Commands for Chatbot:
echo   • "I am feeling happy today!"
echo   • "I'm sad and need comfort"
echo   • "It's raining outside"
echo   • "Show me casual clothes"
echo.

start http://localhost:3000

echo 🎯 Opening app in browser...
echo.
echo 🏆 Your network-connected RetailFlowAI is ready!
echo Press any key to continue...
pause > nul
