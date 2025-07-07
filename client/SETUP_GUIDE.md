# RetailFlowAI - Intelligent Retail Chatbot with AR

## 🚀 Quick Start

### 1. Start the Backend
```bash
cd server
python start_retail_ai.py
```

### 2. Start the Frontend (in another terminal)
```bash
npm start
```

## 🎯 Features

### 🤖 AI Chatbot
- **Mood Detection**: Analyzes user input to detect mood/weather/needs
- **Smart Suggestions**: Recommends products based on context
- **AR Integration**: Products with AR try-on capabilities
- **Natural Language**: Understands phrases like:
  - "I'm feeling sad" → Comfort products
  - "It's raining" → Weather protection items
  - "Going to a party" → Party/elegant clothing
  - "Need workout clothes" → Fitness gear

### 🥽 AR Features
- **Virtual Try-On**: AR preview for clothing and accessories
- **3D Models**: Interactive product visualization
- **Size Chart**: Detailed sizing information
- **Color Variants**: Multiple color options

### 🛠️ Admin Panel
- **Product Management**: Full CRUD operations
- **Image Upload**: Visual product management
- **Analytics**: User interaction insights
- **Stock Management**: Inventory tracking

## 🧪 Test the Chatbot

Try these sample inputs in the chatbot:

### Weather-Based
- "It's raining outside"
- "Beautiful sunny day"
- "Cold winter day"

### Mood-Based
- "I'm feeling sad"
- "Happy and excited"
- "Need some comfort"

### Activity-Based
- "Going to a party tonight"
- "Need workout clothes"
- "Business meeting tomorrow"
- "Casual day at home"
- "Date night plans"

## 📊 Database Structure

The system automatically creates and populates the database with:

### Product Categories by Mood
- **Rainy**: Waterproof jackets, rain boots, umbrellas
- **Sunny**: Sunglasses, light clothing, swimwear
- **Party**: Elegant dresses, accessories, party wear
- **Professional**: Business suits, formal shoes, briefcases
- **Comfort**: Hoodies, blankets, cozy items
- **Energetic**: Running shoes, workout gear, sports items
- **Casual**: Jeans, t-shirts, everyday wear
- **Romantic**: Evening gowns, jewelry, elegant items
- **Happy**: Bright colors, cheerful accessories
- **General**: Bestsellers, essentials, popular items

## 🔧 API Endpoints

### Chatbot
- `POST /api/products` - Get mood-based product recommendations

### Admin
- `GET /api/admin/products` - Get all products
- `POST /api/admin/products` - Create new product
- `PUT /api/admin/products/<id>` - Update product
- `DELETE /api/admin/products/<id>` - Delete product
- `GET /api/admin/analytics` - Get usage analytics

## 🎨 UI Components

### Frontend Structure
- **App.js**: Main application router
- **Chatbot.js**: AI chatbot interface
- **ARViewer.js**: AR product viewer
- **Admin.js**: Admin panel for product management

### Styling
- **Modern Design**: Clean, professional interface
- **Responsive**: Works on all device sizes
- **Walmart-Style**: Corporate color scheme and branding
- **Interactive**: Smooth animations and transitions

## 📱 Usage Instructions

### For Customers
1. Open the app at `http://localhost:3000`
2. Type your mood, weather, or what you need
3. Browse AI-recommended products
4. Click "Try in AR" for virtual try-on
5. View product details, sizes, and colors

### For Admins
1. Go to `http://localhost:3000/admin`
2. View all products in the catalog
3. Add new products with images and AR models
4. Edit existing products
5. Delete products
6. View analytics and user interactions

## 🔍 Troubleshooting

### Chatbot Shows Connection Error
1. Make sure Flask server is running on port 5000
2. Check that CORS is enabled
3. Verify API endpoints are accessible

### Products Not Loading
1. Check database initialization
2. Verify product data format
3. Check console for errors

### AR Not Working
1. Use HTTPS for production
2. Ensure AR model URLs are accessible
3. Check browser AR support

## 🌟 Key Features for Walmart Scale

- **High Performance**: Optimized database queries
- **Scalable Architecture**: Modular component design
- **Analytics**: User behavior tracking
- **AR Integration**: Next-gen shopping experience
- **Mobile Ready**: Responsive design
- **Admin Tools**: Easy product management
- **Mood Intelligence**: Advanced AI recommendations

## 📈 Analytics Dashboard

The admin panel includes:
- Most popular mood categories
- Recent user interactions
- Product recommendation effectiveness
- User engagement metrics
