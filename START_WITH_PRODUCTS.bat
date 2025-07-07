@echo off
echo ============================================
echo    STARTING RETAILFLOWAI WITH NEW PRODUCTS
echo ============================================
echo.

echo ✅ 12 Products Added:
echo   • Happy Mood: Sunglasses, T-Shirt, Shorts
echo   • Sad Mood: Hoodie, Blanket, Tea Mug  
echo   • Natural Mood: Jeans, T-Shirt, Sneakers
echo   • Rainy Mood: Rain Coat, Boots, Umbrella
echo.

echo Starting Backend Server...
cd /d "%~dp0client\server"
start "Backend" cmd /k "python app.py"
echo Backend starting at http://localhost:5000
echo.

echo Starting Frontend Server...
cd /d "%~dp0client"
echo Frontend will be at http://localhost:3000
echo.

timeout /t 3 /nobreak > nul
start "" "http://localhost:3000"

echo ✅ STARTING REACT APP WITH FULL CRUD + MOOD CHATBOT...
npm start

pause
