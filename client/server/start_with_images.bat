@echo off
echo Starting RetailFlow AI with Product Images...
cd /d "%~dp0"

echo Initializing database with product images...
"C:\Users\sharm\AppData\Local\Programs\Python\Python312\python.exe" init_products.py

echo Starting Flask server...
start "Flask Server" "C:\Users\sharm\AppData\Local\Programs\Python\Python312\python.exe" app.py

echo Waiting 3 seconds for server to start...
timeout /t 3 /nobreak > nul

echo Starting React frontend...
cd ..
start "React App" npm start

echo.
echo ==============================================
echo RetailFlow AI is starting up!
echo ==============================================
echo Flask server: http://localhost:5000
echo React app: http://localhost:3000
echo ==============================================
echo Both applications should open automatically.
echo If not, manually navigate to http://localhost:3000
echo ==============================================

pause
