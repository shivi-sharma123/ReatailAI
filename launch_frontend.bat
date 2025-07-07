@echo off
title RetailFlowAI - Frontend Launcher
color 0B

echo.
echo ========================================
echo     RETAILFLOWAI - FRONTEND LAUNCHER
echo ========================================
echo.

echo 📁 Current Directory: %CD%
echo 🔍 Checking React app...
echo.

cd client

if exist package.json (
    echo ✅ React app found
    echo 📦 Installing dependencies if needed...
    call npm install --silent
    echo.
    echo 🚀 Starting React frontend...
    echo 🌐 Frontend will be available at: http://localhost:3000
    echo.
    echo Starting in 3 seconds...
    timeout /t 3 >nul
    call npm start
) else (
    echo ❌ React app not found
    echo Please make sure you're in the correct directory
    pause
)

echo.
echo Press any key to continue...
pause >nul
