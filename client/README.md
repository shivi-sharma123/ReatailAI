# 🛍️ RetailFlow AI - Intelligent Shopping Assistant

> AI-powered retail chatbot with mood detection, AR try-on technology, and beautiful product imagery

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-2.x-green.svg)](https://flask.palletsprojects.com/)
[![Python](https://img.shields.io/badge/Python-3.7+-yellow.svg)](https://python.org/)
[![SQLite](https://img.shields.io/badge/SQLite-3.x-lightgrey.svg)](https://sqlite.org/)

## ✨ Features

### 🤖 AI-Powered Shopping
- **Mood Detection**: Analyzes user input to understand shopping needs
- **Intelligent Recommendations**: Context-aware product suggestions
- **Natural Language Processing**: Conversational shopping experience

### 🥽 AR Technology
- **Virtual Try-On**: AR-enabled product visualization
- **3D Product Models**: Interactive product exploration
- **Size & Fit Guides**: AR-powered fitting assistance

### 🛍️ Product Management
- **Visual Product Gallery**: High-quality product imagery from Unsplash
- **Admin Panel**: Full CRUD operations for products
- **Analytics Dashboard**: User interaction insights

### 📱 Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Chat Interface**: Smooth messaging experience
- **Professional Styling**: Modern, clean design with gradients

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## 🚀 Quick Start

### Prerequisites
- Node.js (14.x or higher)
- Python (3.7 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/RetailFlowAI.git
cd RetailFlowAI/client
```

### 2. Setup Backend
```bash
# Navigate to server directory
cd server

# Install Python dependencies
pip install flask flask-cors

# Initialize database with sample products
python setup_images.py

# Start Flask server
python app.py
```

### 3. Setup Frontend
```bash
# Navigate back to client directory
cd ..

# Install Node.js dependencies
npm install

# Start React development server
npm start
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Panel**: Click "Admin Panel" in the app

## 🛍️ Product Categories

The application includes products across multiple mood categories:

### 🌧️ Rainy Weather
- Premium Waterproof Rain Jacket with professional imagery

### ☀️ Sunny Weather
- Luxury Aviator Sunglasses
- Breathable summer linen shirts

### 🎉 Party/Happy
- Glamorous Evening Dresses
- Trendy party sneakers with metallic accents

### 👔 Professional
- Executive Business Suits
- Professional leather laptop bags

### 🏃 Fitness
- Performance athletic leggings
- Workout accessories

## 🧪 Try These Commands

Test the AI chatbot with these example queries:

```
"I feel happy today"
"Need clothes for rainy weather"
"Going to a professional meeting"
"Want party clothes"
"I love sunny weather"
"Need workout gear"
```

## 🏗️ Architecture

### Frontend (React)
- **Components**: Chatbot, Admin Panel, AR Viewer
- **Styling**: Modern CSS with gradients and animations
- **State Management**: React hooks
- **Responsive**: Mobile-first design

### Backend (Flask)
- **API Endpoints**: RESTful API for products and analytics
- **Database**: SQLite with comprehensive product schema
- **CORS**: Cross-origin resource sharing enabled
- **Analytics**: User interaction tracking

## 📁 Project Structure

```
RetailFlowAI/
├── client/                    # React frontend
│   ├── public/               # Static assets
│   ├── src/                  # React components
│   │   ├── Chatbot.js       # Main chat interface
│   │   ├── Admin.js         # Admin panel
│   │   ├── ARViewer.js      # AR functionality
│   │   └── App.js           # Main application
│   ├── server/              # Flask backend
│   │   ├── app.py           # Flask application
│   │   ├── database.py      # Database operations
│   │   ├── setup_images.py  # Database initialization
│   │   └── retailflow.db    # SQLite database
│   └── package.json         # Dependencies
```

## 🎨 Key Features

### Image Integration
- **High-Quality Images**: Curated Unsplash photography
- **Fallback Support**: Placeholder images for failed loads
- **Lazy Loading**: Optimized performance
- **Responsive Images**: Adaptive sizing

### AR Integration
- **AR Badges**: Visual indicators for AR-enabled products
- **3D Models**: Interactive product visualization
- **Size Charts**: Digital fitting guides
- **Color Variants**: Multiple product options

## 🔧 API Endpoints

### Products
- `POST /api/products` - Get product recommendations
- `GET /api/admin/products` - Get all products
- `POST /api/admin/products` - Create new product
- `PUT /api/admin/products/{id}` - Update product
- `DELETE /api/admin/products/{id}` - Delete product

### Analytics
- `GET /api/admin/analytics` - Get user interaction analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

Built with ❤️ for the future of AI-powered retail experiences ✨
