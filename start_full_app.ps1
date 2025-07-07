# RetailFlowAI Application Startup Script
Write-Host "====================================" -ForegroundColor Green
Write-Host "Starting RetailFlowAI Application" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green

# Navigate to the server directory
Set-Location "client\server"

# Check and setup database
Write-Host "`nChecking database..." -ForegroundColor Yellow
if (-not (Test-Path "retailflow.db")) {
    Write-Host "Database not found, creating fresh database..." -ForegroundColor Yellow
    python create_fresh_database.py
    python add_essential_products.py
} else {
    Write-Host "Database found, checking products..." -ForegroundColor Yellow
    $productCount = python -c "import sqlite3; conn = sqlite3.connect('retailflow.db'); cursor = conn.cursor(); cursor.execute('SELECT COUNT(*) FROM products'); count = cursor.fetchone()[0]; print(count); conn.close()"
    Write-Host "Products in database: $productCount" -ForegroundColor Green
}

# Start backend server
Write-Host "`nStarting Backend Server..." -ForegroundColor Yellow
Start-Process -FilePath "python" -ArgumentList "app.py" -NoNewWindow

# Wait for backend to start
Write-Host "Waiting for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Navigate back and start frontend
Set-Location ".."
Write-Host "`nStarting Frontend React App..." -ForegroundColor Yellow
Start-Process -FilePath "npm" -ArgumentList "start" -NoNewWindow

# Wait for frontend to start
Write-Host "Waiting for frontend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Open browser
Write-Host "`nOpening application in browser..." -ForegroundColor Green
Start-Process "http://localhost:3000"

Write-Host "`n====================================" -ForegroundColor Green
Write-Host "Application is now running!" -ForegroundColor Green
Write-Host "Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Green

Write-Host "`nPress Ctrl+C to stop the application..." -ForegroundColor Yellow
try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
} catch {
    Write-Host "`nShutting down application..." -ForegroundColor Red
}
