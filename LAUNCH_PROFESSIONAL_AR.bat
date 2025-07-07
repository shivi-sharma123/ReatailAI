@echo off
title RetailFlowAI - Professional AR Experience

echo.
echo ████████████████████████████████████████████████
echo ██     RETAILFLOWAI - PROFESSIONAL AR         ██
echo ██           LIKE ZAKEKE EXPERIENCE           ██
echo ████████████████████████████████████████████████
echo.

echo 🚀 Starting Professional AR Experience...
echo.

echo 🔧 Starting Backend Server...
start /B python client\server\app.py

echo ⏳ Waiting for server to start...
timeout /t 3 /nobreak >nul

echo 🌐 Opening AR Experience...
start http://localhost:3000

echo.
echo ✅ PROFESSIONAL AR READY!
echo.
echo 🎯 WHAT TO TRY:
echo    1. Click "🥽 AR Catalog" 
echo    2. Click any "🥽 AR" button
echo    3. Try "📹 Live AR" with your camera
echo    4. Test colors and sizes
echo    5. Take AR photos
echo.
echo 🔥 Features: Camera AR • Color Selection • Size Options • Photo Capture
echo.
pause
