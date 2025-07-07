@echo off
echo 🚀 Starting RetailFlowAI - Full Stack Application
echo ================================================

echo.
echo 📁 Current Directory: %CD%
echo.

echo 🖥️ Starting Backend Server...
start "RetailFlowAI Backend" cmd /k "cd client\server && python app.py"

echo ⏳ Waiting for backend to initialize...
timeout /t 5 /nobreak > nul

echo 🌐 Starting Frontend Server...
start "RetailFlowAI Frontend" cmd /k "cd client && npm start"

echo.
echo ✅ Both servers are starting!
echo.
echo 📱 Frontend will be available at: http://localhost:3000 or http://localhost:3001
echo 🖥️ Backend API available at: http://localhost:5000
echo.
echo 🎉 RetailFlowAI is launching!
echo.
echo Press any key to test the connection...
pause > nul

echo.
echo 🧪 Testing connection...
python test_full_connection.py

echo.
echo ✅ Setup complete! Your RetailFlowAI app is running!
echo.
pause
