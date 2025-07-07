@echo off
echo Starting RetailFlow AI Application...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd server && python app.py"

timeout /t 3 /nobreak > nul

echo Starting Frontend...
start "Frontend" cmd /k "npm start"

echo.
echo Both servers are starting up!
echo Backend will be available at: http://localhost:5000
echo Frontend will be available at: http://localhost:3000
echo.
pause
