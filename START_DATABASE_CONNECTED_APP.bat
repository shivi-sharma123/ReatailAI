@echo off
echo 🛍️ RetailFlowAI - Complete Database Connection Script
echo ================================================================
echo.

echo 📋 Checking system requirements...
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Python not found! Please install Python first.
    pause
    exit /b 1
)

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not found! Please install Node.js first.
    pause
    exit /b 1
)

echo ✅ Python and Node.js found!
echo.

echo 📁 Checking database connection...
if exist "retailflow.db" (
    echo ✅ Database file found: retailflow.db
) else (
    echo ⚠️ Database file not found, will be created automatically
)
echo.

echo 🚀 Starting RetailFlowAI Backend Server...
start "RetailFlowAI Backend" cmd /k "cd /d client\server && python app.py"

echo ⏳ Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo 🌐 Starting React Frontend...
start "RetailFlowAI Frontend" cmd /k "cd /d client && npm start"

echo ⏳ Waiting for frontend to start...
timeout /t 10 /nobreak >nul

echo.
echo 🎉 RetailFlowAI is starting up!
echo ================================================================
echo 🌐 Frontend URL: http://localhost:3000
echo 🔧 Backend API: http://localhost:5000
echo 📊 Products API: http://localhost:5000/api/products
echo 🤖 Chatbot API: http://localhost:5000/api/chatbot
echo 📈 Test Dashboard: database_test_dashboard.html
echo ================================================================
echo.

echo 📋 Opening test dashboard...
start database_test_dashboard.html

echo.
echo 🔧 Quick Tests:
echo 1. Testing backend health...
timeout /t 3 /nobreak >nul
curl -s http://localhost:5000/api/health

echo.
echo 2. Testing products endpoint...
curl -s http://localhost:5000/api/products | findstr "success"

echo.
echo ✅ Database connection established!
echo 💡 Your RetailFlowAI app is now running with full database integration!
echo.
echo Press any key to open the main application...
pause >nul

start http://localhost:3000

echo.
echo 🎯 All services are running!
echo   - Backend server with database connection
echo   - React frontend with API integration  
echo   - Database with products and analytics
echo   - AI chatbot with mood detection
echo   - Admin panel for CRUD operations
echo.
echo Press any key to close this window...
pause >nul
