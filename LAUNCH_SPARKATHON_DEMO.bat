@echo off
title RetailFlowAI - Walmart Sparkathon Victory Launch

echo ===============================================
echo 🏆 RETAILFLOWAI COMPLETE LAUNCH
echo 🎯 Walmart Sparkathon Victory Edition
echo ===============================================
echo.

echo 🔧 Starting Complete RetailFlowAI Application...
echo.

echo 📊 Step 1: Starting Tier 1 Backend APIs...
cd /d "%~dp0retailflow-backend"
start "RetailFlowAI Backend" cmd /k "echo 🚀 Backend starting... && python app.py"

echo ⏳ Waiting for backend to initialize...
timeout /t 5 /nobreak >nul

echo 🌐 Step 2: Starting React Frontend...
cd /d "%~dp0client"
start "RetailFlowAI Frontend" cmd /k "echo 🎨 Frontend starting... && npm start"

echo ⏳ Waiting for frontend to initialize...
timeout /t 10 /nobreak >nul

echo.
echo 🎉 RETAILFLOWAI COMPLETE LAUNCH SUCCESSFUL!
echo ===============================================
echo 📊 Backend APIs: http://localhost:5000
echo 🌐 Frontend App: http://localhost:3000
echo 🧪 API Tests: retailflow-backend/api_test_dashboard.html
echo ===============================================
echo.
echo 🏆 WALMART SPARKATHON DEMO READY!
echo.
echo Your application features:
echo ✅ Real-time Analytics Dashboard
echo ✅ AI-Powered Smart Search with Voice
echo ✅ Smart Shopping Cart with Price Optimization  
echo ✅ Intelligent Chatbot
echo ✅ Professional Business Intelligence
echo.
echo 🎯 Demo Script:
echo 1. Show Analytics Dashboard - Live business metrics
echo 2. Use Voice Search - "Find wireless headphones under $200"
echo 3. Add items to Smart Cart - Watch price optimization
echo 4. Chat with AI - Ask for product recommendations
echo 5. Show Backend APIs - Demonstrate technical excellence
echo.
echo 🚀 Ready to win Walmart Sparkathon!
echo.
pause
