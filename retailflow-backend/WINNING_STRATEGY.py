"""
RetailFlowAI Backend - Winning Strategy & Demo Launcher
This script launches the backend and prints the winning strategy for judges.
"""

import os
import time
import webbrowser

WINNING_STRATEGY = '''
🏆 RETAILFLOWAI WINNING STRATEGY FOR SPARKATHON

1. Real-Time Analytics: Show live business metrics and dashboard impact.
2. AI Recommendations: Personalized, trending, and deep learning powered.
3. Smart Cart Optimization: Dynamic discounts, bundles, and loyalty benefits.
4. Voice Search: Natural language, intent detection, and smart results.
5. AR Shopping: Enhanced product API with AR, colors, and customization.
6. Health & Status APIs: Judges can verify backend health instantly.
7. Demo Script: Automated API tests for instant validation.

How to Win:
- Start backend with this script.
- Run test_apis.py for instant API validation.
- Show judges the API documentation in app.py.
- Highlight AR, AI, and analytics features.
- Use the React frontend for live demo.

Backend URL: http://localhost:5000
API Docs: retailflow-backend/app.py
Demo Tests: retailflow-backend/test_apis.py
'''

def main():
    print(WINNING_STRATEGY)
    print("\n🚀 Starting RetailFlowAI Backend...")
    os.system("python retailflow-backend/app.py")

if __name__ == "__main__":
    main()
