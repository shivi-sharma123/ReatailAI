# PowerShell script to start RetailFlowAI
Write-Host "Starting RetailFlowAI Application..." -ForegroundColor Green
Write-Host ""

# Start Backend Server
Write-Host "Starting Backend Server..." -ForegroundColor Yellow
$backendPath = "c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\server"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; python app.py"

# Wait a bit for backend to start
Write-Host "Waiting for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Start Frontend React App
Write-Host "Starting Frontend React App..." -ForegroundColor Yellow
$frontendPath = "c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; npm start"

Write-Host ""
Write-Host "Both servers are starting..." -ForegroundColor Green
Write-Host "Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
