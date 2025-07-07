# RetailFlowAI - Frontend Starter Script
Write-Host "🚀 RETAILFLOWAI - FRONTEND LAUNCHER" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Cyan

# Check current directory
Write-Host "📁 Current Directory: $(Get-Location)" -ForegroundColor Yellow

# Navigate to client directory
Set-Location client

# Check if package.json exists
if (Test-Path "package.json") {
    Write-Host "✅ React app found" -ForegroundColor Green
    
    # Install dependencies
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install --silent
    
    # Start the React app
    Write-Host "🚀 Starting React frontend..." -ForegroundColor Green
    Write-Host "🌐 Frontend will be available at: http://localhost:3000" -ForegroundColor Cyan
    
    # Open browser
    Start-Process "http://localhost:3000"
    
    # Start npm
    npm start
} else {
    Write-Host "❌ React app not found" -ForegroundColor Red
    Write-Host "Please make sure you're in the correct directory" -ForegroundColor Red
}

Write-Host "Press any key to continue..." -ForegroundColor Yellow
$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
