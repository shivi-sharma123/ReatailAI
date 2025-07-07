# RetailFlowAI Backend Startup Script for Walmart Sparkathon
# Run this to start the Tier 1 Backend APIs

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "🏆 RETAILFLOWAI TIER 1 BACKEND STARTUP" -ForegroundColor Yellow
Write-Host "🎯 Walmart Sparkathon Victory Edition" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan

# Change to backend directory
$backendPath = Join-Path $PSScriptRoot "."
Set-Location $backendPath

Write-Host "`n🔧 Setting up Python environment..." -ForegroundColor Blue

# Install requirements
Write-Host "📦 Installing backend dependencies..." -ForegroundColor Blue
python -m pip install --upgrade pip
python -m pip install -r requirements.txt

Write-Host "`n🚀 Starting RetailFlowAI Backend Server..." -ForegroundColor Green
Write-Host "📊 Available APIs:" -ForegroundColor Yellow
Write-Host "   • /api/analytics - Real-time business analytics" -ForegroundColor White
Write-Host "   • /api/recommendations - AI-powered product suggestions" -ForegroundColor White
Write-Host "   • /api/cart/optimize - Smart price optimization" -ForegroundColor White
Write-Host "   • /api/search/voice - Advanced voice search processing" -ForegroundColor White

Write-Host "`n🌐 Backend URL: http://localhost:5000" -ForegroundColor Magenta
Write-Host "🔥 Hackathon Victory Mode: ACTIVATED!" -ForegroundColor Red
Write-Host "===============================================" -ForegroundColor Cyan

# Start the Flask backend
python app.py
