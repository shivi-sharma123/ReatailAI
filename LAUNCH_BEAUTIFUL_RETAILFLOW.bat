@echo off
cls
echo.
echo ===============================================
echo 🚀 RETAILFLOW AI - COMPLETE APP LAUNCHER 🚀
echo ===============================================
echo.
echo Starting your beautiful RetailFlowAI application...
echo.

echo 📊 Verifying Database Connection...
python COMPLETE_DATABASE_SETUP.py
if %errorlevel% neq 0 (
    echo ❌ Database setup failed!
    pause
    exit /b 1
)

echo.
echo 🔧 Starting Backend Server...
start "RetailFlow Backend" cmd /k "cd /d %~dp0 && python client/server/app.py"

echo.
echo ⏳ Waiting for backend to initialize...
timeout /t 3 /nobreak >nul

echo.
echo 🎨 Starting React Frontend...
start "RetailFlow Frontend" cmd /k "cd /d %~dp0client && npm start"

echo.
echo ⏳ Waiting for frontend to build and start...
timeout /t 5 /nobreak >nul

echo.
echo 🌐 Opening RetailFlowAI in your browser...
timeout /t 3 /nobreak >nul
start http://localhost:3000

echo.
echo ===============================================
echo ✅ RETAILFLOW AI IS NOW RUNNING BEAUTIFULLY!
echo ===============================================
echo.
echo 🏠 Homepage: http://localhost:3000
echo 🤖 AI Assistant: Click "Try AI Assistant"
echo 🥽 AR Catalog: Click "Explore AR Catalog"
echo 📊 System Status: Click "Status"
echo.
echo 🔧 Backend API: http://localhost:5000
echo 📊 Database: retailflow.db (17 products loaded)
echo.
echo 💡 Features Available:
echo    ✅ AI-Powered Shopping Assistant
echo    ✅ AR Product Visualization
echo    ✅ Color & Size Selection
echo    ✅ Mood-Based Recommendations
echo    ✅ Professional Admin Panel
echo    ✅ Real-time Analytics
echo.
echo ⚠️  To stop the app: Close both terminal windows
echo.
echo 🎉 Enjoy your beautiful RetailFlowAI experience!
echo ===============================================
pause
