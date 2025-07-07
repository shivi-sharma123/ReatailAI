# 🚀 RetailFlow AI - Beautiful App Launcher (PowerShell)
Clear-Host

Write-Host ""
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "🚀 RETAILFLOW AI - COMPLETE APP LAUNCHER 🚀" -ForegroundColor Yellow
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Starting your beautiful RetailFlowAI application..." -ForegroundColor Green
Write-Host ""

# Verify Database
Write-Host "📊 Verifying Database Connection..." -ForegroundColor Blue
try {
    $dbResult = python COMPLETE_DATABASE_SETUP.py
    Write-Host "✅ Database verified successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Database setup failed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "🔧 Starting Backend Server..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; python client/server/app.py" -WindowStyle Normal

Write-Host ""
Write-Host "⏳ Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "🎨 Starting React Frontend..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot/client'; npm start" -WindowStyle Normal

Write-Host ""
Write-Host "⏳ Waiting for frontend to build and start..." -ForegroundColor Yellow
Start-Sleep -Seconds 8

Write-Host ""
Write-Host "🌐 Opening RetailFlowAI in your browser..." -ForegroundColor Blue
Start-Sleep -Seconds 2
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "✅ RETAILFLOW AI IS NOW RUNNING BEAUTIFULLY!" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "🏠 Homepage: http://localhost:3000" -ForegroundColor White
Write-Host "🤖 AI Assistant: Click 'Try AI Assistant'" -ForegroundColor White
Write-Host "🥽 AR Catalog: Click 'Explore AR Catalog'" -ForegroundColor White
Write-Host "📊 System Status: Click 'Status'" -ForegroundColor White
Write-Host ""

Write-Host "🔧 Backend API: http://localhost:5000" -ForegroundColor Gray
Write-Host "📊 Database: retailflow.db (17 products loaded)" -ForegroundColor Gray
Write-Host ""

Write-Host "💡 Features Available:" -ForegroundColor Yellow
Write-Host "   ✅ AI-Powered Shopping Assistant" -ForegroundColor Green
Write-Host "   ✅ AR Product Visualization" -ForegroundColor Green
Write-Host "   ✅ Color & Size Selection" -ForegroundColor Green
Write-Host "   ✅ Mood-Based Recommendations" -ForegroundColor Green
Write-Host "   ✅ Professional Admin Panel" -ForegroundColor Green
Write-Host "   ✅ Real-time Analytics" -ForegroundColor Green
Write-Host ""

Write-Host "⚠️  To stop the app: Close both PowerShell windows" -ForegroundColor Red
Write-Host ""
Write-Host "🎉 Enjoy your beautiful RetailFlowAI experience!" -ForegroundColor Magenta
Write-Host "===============================================" -ForegroundColor Cyan

Read-Host "Press Enter to keep this window open for monitoring"
