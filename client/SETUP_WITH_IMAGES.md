# 🛍️ RetailFlow AI - Setup Guide with Product Images

## 🚀 Quick Start with Product Images

### Prerequisites
- Node.js (version 14 or higher)
- Python 3.7+ 
- npm or yarn

### 1. Setup Database with Product Images

Navigate to the server directory and run the database initialization:

```bash
cd client/server
python init_products.py
```

This will create a SQLite database with 8+ attractive products across different mood categories, each with high-quality Unsplash images.

### 2. Install Backend Dependencies

```bash
cd client/server
pip install flask flask-cors
```

### 3. Start the Flask Server

```bash
cd client/server
python app.py
```

The server will start on `http://localhost:5000`

### 4. Install Frontend Dependencies

```bash
cd client
npm install
```

### 5. Start the React Application

```bash
cd client
npm start
```

The application will open automatically at `http://localhost:3000`

## 🛍️ Product Categories with Images

The database includes products for these mood categories:

### 🌧️ Rainy Weather
- **Premium Waterproof Rain Jacket** - $129.99
  - Image: Professional rain jacket on Unsplash
  - AR enabled with 3D model

### ☀️ Sunny Weather  
- **Luxury Aviator Sunglasses** - $159.99
  - Image: Premium sunglasses with polarized lenses
  - AR try-on functionality
- **Premium Linen Summer Shirt** - $89.99
  - Image: Breathable linen shirt perfect for summer

### 🎉 Party/Happy
- **Glamorous Evening Dress** - $249.99
  - Image: Elegant evening dress for special occasions
  - AR fitting room experience
- **Trendy Party Sneakers** - $129.99
  - Image: Stylish sneakers with metallic accents

### 👔 Professional
- **Executive Business Suit** - $599.99
  - Image: Premium tailored business suit
  - AR fitting and customization
- **Professional Leather Laptop Bag** - $179.99
  - Image: Premium leather bag for professionals

### 🏃 Fitness
- **Performance Athletic Leggings** - $69.99
  - Image: High-performance workout leggings
  - AR size and fit visualization

## 🎯 Key Features

### Product Images
- **High-Quality Images**: All products use curated Unsplash images
- **Fallback Support**: Placeholder images for failed loads
- **Responsive Design**: Images adapt to different screen sizes
- **Lazy Loading**: Optimized loading for better performance

### AR Integration
- **AR Try-On**: Virtual try-on for clothing and accessories
- **3D Models**: Interactive 3D product visualization
- **Size Charts**: Digital size fitting guides
- **Color Variants**: Multiple color options for products

### Admin Panel Features
- **Product Management**: Add, edit, delete products with images
- **Image URL Support**: Easy image management with URL inputs
- **Visual Product Cards**: Rich product display with images
- **Analytics Dashboard**: User interaction insights

## 🔧 Testing the Application

### 1. Test Product Image Display

Start the application and try these commands in the chatbot:

```
"I feel happy today"
"Need clothes for rainy weather"
"Going to a professional meeting"
"Want to workout"
```

### 2. Verify AR Functionality

Look for the "AR 🥽" badge on products and click "Try in AR" to test the AR viewer.

### 3. Test Admin Panel

Navigate to the Admin Panel to:
- View all products with images
- Add new products with image URLs
- Edit existing product information
- View analytics on user interactions

## 🛠️ Troubleshooting

### Images Not Loading
1. Check internet connection (images are hosted on Unsplash)
2. Verify the database was initialized properly
3. Check browser developer tools for image load errors

### Database Issues
```bash
cd client/server
python init_products.py
```

### Server Connection Issues
- Ensure Flask server is running on port 5000
- Check for CORS issues in browser console
- Verify no other applications are using port 5000

## 📱 Mobile Responsiveness

The application is fully responsive and includes:
- Mobile-optimized product grids
- Touch-friendly AR controls
- Responsive image sizing
- Mobile-first CSS design

## 🎨 Customization

### Adding New Products with Images

1. Use the Admin Panel to add products
2. Include image URLs from Unsplash or other sources
3. Set appropriate mood categories
4. Enable AR features as needed

### Image Requirements
- **Recommended Size**: 800x800px or larger
- **Format**: JPG, PNG, WebP
- **Aspect Ratio**: Square (1:1) preferred
- **Quality**: High resolution for AR viewer

## 🌟 Production Deployment

For production deployment:

1. Replace demo 3D models with actual product models
2. Use a production image CDN
3. Implement user authentication
4. Add payment processing
5. Set up production database

---

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify all dependencies are installed
3. Ensure both frontend and backend servers are running
4. Check the database file exists and has data

Enjoy your AI-powered retail experience with beautiful product images! 🛍️✨
