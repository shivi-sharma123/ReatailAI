# 🛍️ RetailFlow AI - Intelligent Shopping Assistant

A modern retail AI chatbot application with a Flask backend and React frontend. The chatbot suggests products based on user mood or natural language, displays product images, and supports full CRUD operations for products via an admin panel.

## 🌟 Features

- **AI-Powered Chatbot**: Suggests products based on user mood, weather, or needs
- **Visual Product Gallery**: Displays product images with trending badges and stock indicators
- **Admin Panel**: Full CRUD operations for product management
- **Modern Database**: SQLite with support for product images, brands, ratings, and analytics
- **Beautiful UI**: Modern, responsive design with emoji and visual indicators
- **Analytics Dashboard**: Track user interactions and popular moods

## 🚀 Quick Start

### Option 1: Use the Startup Scripts

**For PowerShell users:**
```powershell
./start-servers.ps1
```

**For Command Prompt users:**
```cmd
start-servers.bat
```

### Option 2: Manual Startup

**1. Start the Flask Backend:**
```powershell
cd "c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\server"
python app.py
```

**2. Start the React Frontend (in a new terminal):**
```powershell
cd "c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client"
npm start
```

## 🌐 Access the Application

- **Frontend (Main App)**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📱 How to Use

### Chatbot Interface
1. Open the main app at http://localhost:3000
2. Type your mood or what you need:
   - "I feel happy today"
   - "suggest clothes for rainy season"
   - "need gym clothes"
   - "going to a party"
3. View product recommendations with images and details

### Admin Panel
1. Click "⚙️ Admin Panel" in the navigation
2. **Add Products**: Fill the form and click "Add Product"
3. **Edit Products**: Click "Edit" on any product card
4. **Delete Products**: Click "Delete" on any product card
5. **View Analytics**: Switch to "Analytics" tab to see user interaction data

## 🗄️ Database Schema

The application uses SQLite with the following product fields:
- Basic info: name, category, mood_category, price, description
- Visual: emoji, image_url
- Metadata: brand, rating, tags
- Status: is_trending, stock_quantity
- Timestamps: created_at, updated_at

## 🎯 Mood Categories

The AI recognizes these mood/context categories:
- **Weather**: rainy, sunny
- **Events**: party, professional, fitness, casual, romantic
- **Emotions**: happy, comfort, energetic
- **General**: for fallback suggestions

## 🛠️ Technical Stack

- **Backend**: Flask, SQLite, CORS support
- **Frontend**: React, modern CSS with flexbox/grid
- **AI Logic**: Natural language mood analysis
- **Styling**: Modern UI with emojis, badges, and visual indicators

## 📊 Sample Products

The application comes pre-loaded with 25+ sample products across all mood categories, including:
- Designer clothing and accessories
- Tech gadgets and fitness equipment
- Beauty and lifestyle products
- All with real product images from Unsplash

## 🔧 Development Notes

- Flask runs in debug mode for development
- React includes hot-reload for live updates
- CORS is configured for localhost:3000
- Database auto-initializes on first run

## 🤝 Usage Tips

1. **For PowerShell users**: Use `;` instead of `&&` for command chaining
2. **Product Images**: Use high-quality URLs (Unsplash recommended)
3. **Trending Products**: Toggle the trending flag for featured products
4. **Stock Management**: Set low stock numbers to show warning badges
5. **Analytics**: Check the analytics tab to see user behavior patterns

## 🎉 Enjoy Your Smart Shopping Assistant!

The app is now fully functional with beautiful UI, complete CRUD operations, and intelligent product suggestions based on user mood and context.
