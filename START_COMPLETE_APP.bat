@echo off
echo ==============================================
echo    RETAILFLOWAI - COMPLETE STARTUP GUIDE
echo ==============================================
echo.

echo Step 1: Starting Backend Server...
echo ----------------------------------------
cd /d "c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\server"
start "RetailFlowAI Backend" cmd /k "python app.py"
echo Backend starting at http://localhost:5000
echo.

echo Step 2: Starting Frontend Server...
echo ----------------------------------------
cd /d "c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client"
echo Starting React development server...
echo This will open your browser automatically
echo Frontend will be at http://localhost:3000
echo.

echo Step 3: Opening Browser...
echo ----------------------------------------
timeout /t 3 /nobreak > nul
start "" "http://localhost:3000"
echo.

echo ✅ STARTING REACT APP...
npm start

echo.
echo ==============================================
echo Your RetailFlowAI app is now running!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo ==============================================
pause
