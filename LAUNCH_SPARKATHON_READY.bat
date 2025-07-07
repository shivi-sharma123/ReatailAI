@echo off
echo 🚀 Starting RetailFlowAI - Walmart Sparkathon Ready!
echo ================================================

echo 🔧 Starting Backend Server...
start "Backend Server" cmd /c "cd /d c:\Users\sharm\OneDrive\Desktop\RetailFlowAI && C:/Users/sharm/AppData/Local/Programs/Python/Python312/python.exe client/server/app.py"

echo ⏳ Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo 🌐 Starting Frontend React App...
start "Frontend React" cmd /c "cd /d c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client && npm start"

echo ⏳ Waiting for frontend to start...
timeout /t 10 /nobreak > nul

echo 🧪 Running connection test...
C:/Users/sharm/AppData/Local/Programs/Python/Python312/python.exe connection_test.py

echo ✅ RetailFlowAI is ready for Walmart Sparkathon!
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:5000/api
pause
