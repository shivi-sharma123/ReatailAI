@echo off
echo 🚀 Starting RetailFlowAI Backend...
echo.

cd /d "c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\server"

echo 📁 Current directory: %cd%
echo.

echo 🗄️ Adding diverse products to database...
python add_diverse_products.py
echo.

echo 🖥️ Starting backend server...
echo Open browser to: http://localhost:5000/api/products
echo.
python app.py

pause
