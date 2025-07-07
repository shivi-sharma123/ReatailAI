# RetailFlow AI - Server Startup Script
# This script starts both the Flask backend and React frontend servers

Write-Host "🛍️ Starting RetailFlow AI Servers..." -ForegroundColor Green

# Start Flask Backend in a new PowerShell window
Write-Host "Starting Flask Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\server'; python app.py"

# Wait a moment for Flask to start
Start-Sleep -Seconds 3

# Start React Frontend in a new PowerShell window  
Write-Host "Starting React Frontend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client'; npm start"

Write-Host "✅ Both servers are starting!" -ForegroundColor Green
Write-Host "🌐 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🚀 Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
