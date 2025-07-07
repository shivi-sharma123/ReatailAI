@echo off
echo ===============================================
echo 🏆 RETAILFLOWAI TIER 1 BACKEND STARTUP
echo 🎯 Walmart Sparkathon Victory Edition  
echo ===============================================

cd /d %~dp0

echo.
echo 🔧 Setting up Python environment...
echo 📦 Installing backend dependencies...
python -m pip install --upgrade pip
python -m pip install -r requirements.txt

echo.
echo 🚀 Starting RetailFlowAI Backend Server...
echo 📊 Available APIs:
echo    • /api/analytics - Real-time business analytics
echo    • /api/recommendations - AI-powered product suggestions  
echo    • /api/cart/optimize - Smart price optimization
echo    • /api/search/voice - Advanced voice search processing

echo.
echo 🌐 Backend URL: http://localhost:5000
echo 🔥 Hackathon Victory Mode: ACTIVATED!
echo ===============================================

python app.py

pause
