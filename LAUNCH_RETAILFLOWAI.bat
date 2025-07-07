@echo off
cls
echo.
echo ==========================================
echo 🏆 RETAILFLOWAI - WALMART SPARKATHON 🏆
echo ==========================================
echo.
echo 🚀 Starting your award-winning AI retail app...
echo.

REM Check if we're in the right directory
if not exist "client" (
    echo ❌ Error: Please run this from the RetailFlowAI root directory
    pause
    exit /b 1
)

echo 📊 Step 1: Checking database...
cd client\server
if exist "retailflow.db" (
    echo ✅ Database found with products ready!
) else (
    echo ⚠️ Creating database...
    python setup_database.py
)

echo.
echo 🔧 Step 2: Starting backend server...
start "RetailFlowAI Backend" cmd /k "echo 🚀 Starting Backend Server... & python app.py"
timeout /t 3 /nobreak >nul

echo.
echo 🖥️ Step 3: Starting frontend...
cd ..
start "RetailFlowAI Frontend" cmd /k "echo 🌐 Starting Frontend... & npm start"
timeout /t 5 /nobreak >nul

echo.
echo 🧪 Step 4: Running system test...
cd ..
python test_database_connection.py

echo.
echo ==========================================
echo 🎉 RETAILFLOWAI IS NOW RUNNING! 🎉
echo ==========================================
echo.
echo 📱 ACCESS YOUR APP:
echo    🌐 Frontend: http://localhost:3001
echo    🔧 Backend:  http://localhost:5000
echo.
echo 💡 AMAZING FEATURES TO DEMO:
echo    🤖 AI Chatbot with mood detection
echo    🥽 AR product try-on technology
echo    🎤 Voice-activated shopping
echo    🛍️ Smart product recommendations
echo    💰 Walmart pricing integration
echo.
echo 🏆 READY FOR SPARKATHON PRESENTATION!
echo.
echo Press any key to open the app in your browser...
pause >nul

REM Open the app in browser
start http://localhost:3001
start http://localhost:5000

echo.
echo 🌟 RetailFlowAI is now live and impressive!
echo 🚀 Good luck with your presentation!
echo.
pause
