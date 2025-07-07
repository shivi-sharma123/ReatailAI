@echo off
echo ====================================
echo Starting RetailFlowAI Application
echo ====================================

echo Checking if database exists...
cd client\server
if not exist retailflow.db (
    echo Database not found, creating fresh database...
    python create_fresh_database.py
    python add_essential_products.py
) else (
    echo Database found, checking products...
    python -c "import sqlite3; conn = sqlite3.connect('retailflow.db'); cursor = conn.cursor(); cursor.execute('SELECT COUNT(*) FROM products'); count = cursor.fetchone()[0]; print(f'Products in database: {count}'); conn.close()"
)

echo.
echo Starting Backend Server...
start /B python app.py

echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo Starting Frontend React App...
cd ..
start /B npm start

echo.
echo Application is starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to view the application in browser...
pause > nul

start http://localhost:3000

echo.
echo Both servers are running in background.
echo Close this window to stop the application.
pause
