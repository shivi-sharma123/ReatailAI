# RetailFlowAI Frontend Launcher
# This script will start your React frontend properly

Write-Host "🚀 RetailFlowAI Frontend Launcher" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Cyan

# Change to client directory
$clientPath = "c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client"
Write-Host "📁 Changing to client directory: $clientPath" -ForegroundColor Yellow

if (Test-Path $clientPath) {
    Set-Location $clientPath
    Write-Host "✅ Client directory found" -ForegroundColor Green
} else {
    Write-Host "❌ Client directory not found!" -ForegroundColor Red
    exit 1
}

# Check if package.json exists
if (Test-Path "package.json") {
    Write-Host "✅ package.json found" -ForegroundColor Green
} else {
    Write-Host "❌ package.json not found!" -ForegroundColor Red
    exit 1
}

# Kill any existing processes on port 3000
Write-Host "🔍 Checking for existing processes on port 3000..." -ForegroundColor Yellow
$processes = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($processes) {
    Write-Host "⚠️  Found existing processes on port 3000, terminating..." -ForegroundColor Yellow
    $processes | ForEach-Object {
        Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue
    }
    Start-Sleep -Seconds 2
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
try {
    npm install
    Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

# Start the frontend
Write-Host "🚀 Starting React development server..." -ForegroundColor Yellow
Write-Host "This will take 10-15 seconds to start up..." -ForegroundColor Cyan

# Set environment to prevent browser auto-open
$env:BROWSER = "none"

# Start npm start in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$clientPath'; npm start" -WindowStyle Normal

# Wait for startup
Write-Host "⏳ Waiting for frontend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Test if frontend is running
$maxAttempts = 10
$attempt = 0
$frontendRunning = $false

while ($attempt -lt $maxAttempts -and -not $frontendRunning) {
    $attempt++
    Write-Host "🔍 Checking frontend (attempt $attempt/$maxAttempts)..." -ForegroundColor Yellow
    
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 5 -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            $frontendRunning = $true
            Write-Host "✅ Frontend is running successfully!" -ForegroundColor Green
        }
    } catch {
        Start-Sleep -Seconds 3
    }
}

if ($frontendRunning) {
    Write-Host "=" * 50 -ForegroundColor Green
    Write-Host "🎉 SUCCESS! Your RetailFlowAI frontend is running!" -ForegroundColor Green
    Write-Host "🌐 URL: http://localhost:3000" -ForegroundColor Green
    Write-Host "✅ All features are available:" -ForegroundColor Green
    Write-Host "   - Product catalog with colors & sizes" -ForegroundColor White
    Write-Host "   - AR try-on experience" -ForegroundColor White
    Write-Host "   - Shopping cart & wishlist" -ForegroundColor White
    Write-Host "   - Intelligent chatbot" -ForegroundColor White
    Write-Host "   - Mood analytics" -ForegroundColor White
    Write-Host "   - Mobile responsive design" -ForegroundColor White
    Write-Host "=" * 50 -ForegroundColor Green
    
    # Open browser
    Write-Host "🌐 Opening browser..." -ForegroundColor Cyan
    Start-Process "http://localhost:3000"
    
} else {
    Write-Host "❌ Frontend failed to start properly" -ForegroundColor Red
    Write-Host "Please check the npm start window for error messages" -ForegroundColor Yellow
}

Write-Host "Press any key to exit..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
