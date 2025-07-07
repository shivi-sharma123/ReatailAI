@echo off
title RetailFlowAI - Complete App Launcher
color 0A

echo.
echo ========================================
echo    RETAILFLOWAI - COMPLETE LAUNCHER
echo ========================================
echo.

echo 🔍 Checking current services...
echo.

REM Check if backend is running
curl -s http://localhost:5000/api/products >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Backend API: RUNNING
    set backend_running=1
) else (
    echo ❌ Backend API: NOT RUNNING
    set backend_running=0
)

REM Check if frontend is running
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Frontend App: RUNNING
    set frontend_running=1
) else (
    echo ❌ Frontend App: NOT RUNNING
    set frontend_running=0
)

echo.
echo ========================================
echo           SERVICE STATUS
echo ========================================

if %backend_running% == 1 if %frontend_running% == 1 (
    echo.
    echo 🎉 BOTH SERVICES ARE RUNNING!
    echo.
    echo 🌐 Access URLs:
    echo    Frontend:    http://localhost:3000
    echo    Backend API: http://localhost:5000
    echo    Products:    http://localhost:5000/api/products
    echo.
    echo 🚀 Features Available:
    echo    ✅ Color variants with pricing
    echo    ✅ Size options with stock
    echo    ✅ AR product visualization
    echo    ✅ AI chatbot assistance
    echo    ✅ Mobile-responsive design
    echo    ✅ Smart shopping cart
    echo    ✅ Analytics dashboard
    echo.
    echo 🌐 Opening your app in browser...
    start http://localhost:3000
    timeout /t 2 >nul
    start http://localhost:5000/api/products
    echo.
    echo ✨ Your RetailFlowAI is ready!
    echo    Press any key to open demo dashboard...
    pause >nul
    start complete_demo.html
) else (
    echo.
    echo ⚠️  SERVICES NEED TO BE STARTED
    echo ================================
    echo.
    echo 🔧 Use VS Code tasks to start:
    echo    1. Press Ctrl+Shift+P
    echo    2. Type: Tasks: Run Task
    echo    3. Select: Start Backend Server
    echo    4. Select: Start React Frontend
    echo.
    echo 💡 Or run manually:
    if %backend_running% == 0 (
        echo    Backend:  python client/server/app.py
    )
    if %frontend_running% == 0 (
        echo    Frontend: cd client ^&^& npm start
    )
)

echo.
echo Press any key to exit...
pause >nul
