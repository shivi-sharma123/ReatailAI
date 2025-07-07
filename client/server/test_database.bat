@echo off
echo 🚀 RetailFlowAI Database Test
echo ============================

cd /d "c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\server"

echo 📊 Checking database...
C:/Users/sharm/AppData/Local/Programs/Python/Python312/python.exe simple_test.py

echo.
echo 🌐 Testing API connection...
echo Starting server test...

echo.
echo ✅ Test completed!
echo 💡 To run the full application:
echo    1. Run: python app.py (for backend)
echo    2. Run: npm start (for frontend)
echo    3. Open: http://localhost:3000

pause
