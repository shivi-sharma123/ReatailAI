@echo off
echo.
echo ==========================================
echo   Starting RetailFlowAI Frontend
echo ==========================================
echo.

cd /d "c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client"

echo Checking current directory...
echo Current directory: %cd%
echo.

echo Checking if package.json exists...
if exist package.json (
    echo ✅ package.json found
) else (
    echo ❌ package.json not found
    pause
    exit /b 1
)

echo.
echo Installing dependencies...
call npm install

echo.
echo Starting React development server...
echo Note: This will open in a new window
echo.

set BROWSER=none
start "RetailFlowAI Frontend" cmd /k "npm start"

echo.
echo Frontend is starting...
echo Wait 10-15 seconds then open: http://localhost:3000
echo.

timeout /t 15 /nobreak >nul

echo Opening browser...
start http://localhost:3000

echo.
echo ==========================================
echo   Frontend should now be running!
echo   URL: http://localhost:3000
echo ==========================================
echo.

pause
