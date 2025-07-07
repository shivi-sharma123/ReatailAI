# RetailFlowAI Complete Startup Script
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "   RETAILFLOWAI - COMPLETE STARTUP GUIDE" -ForegroundColor Yellow
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Step 1: Starting Backend Server..." -ForegroundColor Green
Write-Host "----------------------------------------" -ForegroundColor Gray
Set-Location "c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\server"
Write-Host "Backend starting at http://localhost:5000" -ForegroundColor Blue

# Start backend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "python app.py"
Start-Sleep -Seconds 2

Write-Host ""
Write-Host "Step 2: Starting Frontend Server..." -ForegroundColor Green
Write-Host "----------------------------------------" -ForegroundColor Gray
Set-Location "c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client"
Write-Host "Starting React development server..." -ForegroundColor Blue
Write-Host "This will open your browser automatically" -ForegroundColor Yellow
Write-Host "Frontend will be at http://localhost:3000" -ForegroundColor Blue
Write-Host ""

Write-Host "Step 3: Opening Browser..." -ForegroundColor Green
Write-Host "----------------------------------------" -ForegroundColor Gray
Start-Sleep -Seconds 3
Start-Process "http://localhost:3000"
Write-Host ""

Write-Host "✅ STARTING REACT APP..." -ForegroundColor Green
& npm start

Write-Host ""
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "Your RetailFlowAI app is now running!" -ForegroundColor Yellow
Write-Host "Backend: http://localhost:5000" -ForegroundColor Blue
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Blue
Write-Host "==============================================" -ForegroundColor Cyan
