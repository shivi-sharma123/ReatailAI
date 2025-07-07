@echo off
echo 🛍️ RetailFlow AI - Quick Start
echo.
echo Starting servers...
echo.

REM Start Flask backend
echo Starting Flask Backend...
start "Flask Backend" cmd /k "cd /d c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\server && python app.py"

REM Wait a moment
timeout /t 3 /nobreak > nul

REM Start React frontend
echo Starting React Frontend...
start "React Frontend" cmd /k "cd /d c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client && npm start"

echo.
echo ✅ Servers are starting!
echo 🌐 Frontend: http://localhost:3000
echo 🚀 Backend: http://localhost:5000
echo.
pause
