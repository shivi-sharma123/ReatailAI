@echo off
echo.
echo ========================================
echo   🚀 RetailFlowAI App Launcher
echo ========================================
echo.
echo 📊 Starting Backend Server (Port 5000)...
start "Backend Server" cmd /k "python client/server/app.py"

echo ⏳ Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo 🌐 Starting Frontend Server (Port 3000)...
start "Frontend Server" cmd /k "cd client && npm start"

echo ⏳ Waiting for frontend to start...
timeout /t 5 /nobreak >nul

echo.
echo ✅ Both servers are starting!
echo.
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend:  http://localhost:5000
echo.
echo 📱 Open your browser and go to: http://localhost:3000
echo.
echo Press any key to exit...
pause >nul
