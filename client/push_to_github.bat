@echo off
echo ================================================
echo    🚀 RetailFlow AI - GitHub Push Script
echo ================================================
echo.
echo This script will help you push your project to GitHub
echo.
echo STEP 1: Create GitHub Repository
echo --------------------------------
echo 1. Go to https://github.com
echo 2. Click the "+" button (top right) → "New repository"
echo 3. Repository name: RetailFlowAI
echo 4. Description: AI-powered retail chatbot with mood detection and AR try-on
echo 5. Keep it Public
echo 6. DON'T check "Add a README file"
echo 7. Click "Create repository"
echo.
pause
echo.
echo STEP 2: Get Repository URL
echo --------------------------
echo After creating the repo, GitHub will show you a URL like:
echo https://github.com/YOUR_USERNAME/RetailFlowAI.git
echo.
echo Copy that URL and paste it when prompted below:
echo.
set /p REPO_URL="Enter your GitHub repository URL: "
echo.
echo STEP 3: Pushing to GitHub
echo -------------------------
git remote add origin %REPO_URL%
git push -u origin main
echo.
echo ================================================
echo 🎉 SUCCESS! Your RetailFlow AI is now on GitHub!
echo ================================================
echo.
echo Your repository URL: %REPO_URL%
echo You can now share this link with others!
echo.
pause
