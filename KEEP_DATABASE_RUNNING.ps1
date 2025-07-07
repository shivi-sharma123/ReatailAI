# RETAILFLOWAI DATABASE KEEPER
# ============================
# PowerShell script to ensure database and backend are always running
# Usage: .\KEEP_DATABASE_RUNNING.ps1 [setup|monitor|health|test]

param(
    [string]$Command = "setup"
)

# Colors for output
$Green = "Green"
$Red = "Red"
$Yellow = "Yellow"
$Blue = "Blue"
$Cyan = "Cyan"

function Write-ColorText {
    param([string]$Text, [string]$Color = "White")
    Write-Host $Text -ForegroundColor $Color
}

function Test-DatabaseConnection {
    Write-ColorText "🔍 Testing database connection..." $Blue
    
    try {
        $result = python -c "
import sys
import os
sys.path.insert(0, os.path.join(os.getcwd(), 'client', 'server'))
from database import get_all_products
products = get_all_products()
print(f'SUCCESS:{len(products)}')"
        
        if ($result -match "SUCCESS:(\d+)") {
            $count = $matches[1]
            Write-ColorText "✅ Database connected with $count products" $Green
            return $true
        } else {
            Write-ColorText "❌ Database connection failed" $Red
            return $false
        }
    } catch {
        Write-ColorText "❌ Error testing database: $_" $Red
        return $false
    }
}

function Test-BackendServer {
    Write-ColorText "🌐 Testing backend server..." $Blue
    
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -UseBasicParsing -TimeoutSec 5
        if ($response.StatusCode -eq 200) {
            $data = $response.Content | ConvertFrom-Json
            Write-ColorText "✅ Backend server is healthy with $($data.products_count) products" $Green
            return $true
        } else {
            Write-ColorText "❌ Backend server returned status: $($response.StatusCode)" $Red
            return $false
        }
    } catch {
        Write-ColorText "❌ Backend server is not responding" $Red
        return $false
    }
}

function Start-DatabaseSetup {
    Write-ColorText "🎯 STARTING RETAILFLOWAI DATABASE SETUP" $Cyan
    Write-ColorText "=" * 50 $Cyan
    
    # Check if we're in the right directory
    if (!(Test-Path "client\server\database.py")) {
        Write-ColorText "❌ Please run this script from the RetailFlowAI root directory" $Red
        return $false
    }
    
    # Initialize database
    Write-ColorText "🔧 Initializing database..." $Blue
    try {
        $initResult = python -c "
import sys
import os
sys.path.insert(0, os.path.join(os.getcwd(), 'client', 'server'))
from database import init_database
init_database()
print('INIT_SUCCESS')"
        
        if ($initResult -match "INIT_SUCCESS") {
            Write-ColorText "✅ Database initialized successfully!" $Green
        } else {
            Write-ColorText "❌ Database initialization failed" $Red
            return $false
        }
    } catch {
        Write-ColorText "❌ Error initializing database: $_" $Red
        return $false
    }
    
    # Check products count
    if (!(Test-DatabaseConnection)) {
        return $false
    }
    
    # Start backend if not running
    if (!(Test-BackendServer)) {
        Write-ColorText "🚀 Starting backend server..." $Blue
        
        # Start backend in background
        $job = Start-Job -ScriptBlock {
            Set-Location $args[0]
            Set-Location "client\server"
            python app.py
        } -ArgumentList (Get-Location)
        
        # Wait for server to start
        Start-Sleep -Seconds 3
        
        # Test again
        if (Test-BackendServer) {
            Write-ColorText "✅ Backend server started successfully!" $Green
        } else {
            Write-ColorText "❌ Failed to start backend server" $Red
            return $false
        }
    }
    
    Write-ColorText "🎉 SETUP COMPLETE!" $Green
    return $true
}

function Start-DatabaseMonitoring {
    param([int]$Minutes = 30)
    
    Write-ColorText "👁️ Monitoring database for $Minutes minutes..." $Blue
    
    $endTime = (Get-Date).AddMinutes($Minutes)
    
    while ((Get-Date) -lt $endTime) {
        $timestamp = Get-Date -Format "HH:mm:ss"
        
        if ((Test-DatabaseConnection) -and (Test-BackendServer)) {
            Write-ColorText "💓 $timestamp - System healthy" $Green
        } else {
            Write-ColorText "⚠️ $timestamp - System issues detected" $Yellow
        }
        
        Start-Sleep -Seconds 30
    }
    
    Write-ColorText "✅ Monitoring completed!" $Green
}

function Show-DatabaseHealth {
    Write-ColorText "🏥 DATABASE HEALTH REPORT" $Cyan
    Write-ColorText "=" * 30 $Cyan
    
    try {
        $healthData = python -c "
import sys
import os
sys.path.insert(0, os.path.join(os.getcwd(), 'client', 'server'))
from database import get_database_stats
import json
stats = get_database_stats()
print(json.dumps(stats))"
        
        $stats = $healthData | ConvertFrom-Json
        
        Write-ColorText "📦 Products: $($stats.products_count)" $Blue
        Write-ColorText "🏷️ Categories: $($stats.categories_count)" $Blue
        Write-ColorText "🏢 Brands: $($stats.brands_count)" $Blue
        Write-ColorText "🥽 AR-enabled: $($stats.ar_enabled_count)" $Blue
        Write-ColorText "🔥 Trending: $($stats.trending_count)" $Blue
        
    } catch {
        Write-ColorText "❌ Error getting health data: $_" $Red
    }
}

function Test-AllEndpoints {
    Write-ColorText "🧪 TESTING ALL API ENDPOINTS" $Cyan
    Write-ColorText "=" * 35 $Cyan
    
    $endpoints = @(
        @{Name="Health Check"; URL="http://localhost:5000/api/health"},
        @{Name="Products"; URL="http://localhost:5000/api/products"},
        @{Name="Categories"; URL="http://localhost:5000/api/categories"},
        @{Name="Brands"; URL="http://localhost:5000/api/brands"},
        @{Name="Search"; URL="http://localhost:5000/api/search?q=shoes"},
        @{Name="Recommend"; URL="http://localhost:5000/api/recommend"}
    )
    
    foreach ($endpoint in $endpoints) {
        try {
            $response = Invoke-WebRequest -Uri $endpoint.URL -UseBasicParsing -TimeoutSec 5
            if ($response.StatusCode -eq 200) {
                Write-ColorText "✅ $($endpoint.Name): Working" $Green
            } else {
                Write-ColorText "❌ $($endpoint.Name): Status $($response.StatusCode)" $Red
            }
        } catch {
            Write-ColorText "❌ $($endpoint.Name): Failed" $Red
        }
    }
}

# Main execution
Write-ColorText "🎯 RetailFlowAI Database Keeper" $Cyan
Write-ColorText "Current Time: $(Get-Date)" $Blue
Write-ColorText "Command: $Command" $Blue
Write-ColorText ""

switch ($Command.ToLower()) {
    "setup" {
        Start-DatabaseSetup
    }
    "monitor" {
        $minutes = if ($args[0]) { [int]$args[0] } else { 30 }
        Start-DatabaseMonitoring -Minutes $minutes
    }
    "health" {
        Show-DatabaseHealth
    }
    "test" {
        Test-AllEndpoints
    }
    default {
        Write-ColorText "❌ Unknown command: $Command" $Red
        Write-ColorText "Available commands: setup, monitor, health, test" $Yellow
    }
}

Write-ColorText ""
Write-ColorText "✨ Script completed at $(Get-Date)" $Blue
