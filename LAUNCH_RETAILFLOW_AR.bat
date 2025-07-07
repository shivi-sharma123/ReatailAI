@echo off
echo 🚀 Starting RetailFlow AI - Complete AR Shopping Experience
echo.
echo 📊 Checking if backend is running...
timeout /t 2 >nul

echo 🎯 Opening RetailFlow AI in your browser...
echo.
echo 🌟 Your app will open at: http://localhost:3000
echo.
echo 🛍️ Features available:
echo    - 🤖 AI Shopping Assistant
echo    - 🥽 AR Product Catalog with Color Changing
echo    - 📏 Size Selection with Dynamic Pricing  
echo    - ⚙️ System Status Monitoring
echo.
echo 💡 To test AR functionality:
echo    1. Click "AR Catalog" 
echo    2. Click any "🥽 AR" button
echo    3. Click colors to change product appearance
echo    4. Click sizes to see price changes
echo.

start http://localhost:3000

echo ✅ RetailFlow AI is ready!
echo 🎉 Enjoy your AR shopping experience!
pause
