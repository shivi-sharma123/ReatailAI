#!/usr/bin/env python3
"""
Test Cart and Wishlist Functionality
This script helps verify that the localStorage functionality is working
"""

def create_test_storage_checker():
    """Create a simple HTML test page to check localStorage functionality"""
    
    html_content = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RetailFlowAI - Storage Test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        .container {
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .section {
            margin: 20px 0;
            padding: 15px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
        }
        button {
            background: linear-gradient(45deg, #4caf50, #45a049);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 20px;
            cursor: pointer;
            margin: 5px;
            font-weight: bold;
            transition: all 0.3s ease;
        }
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        .clear-btn {
            background: linear-gradient(45deg, #f44336, #d32f2f);
        }
        .data-display {
            background: rgba(0, 0, 0, 0.3);
            padding: 15px;
            border-radius: 8px;
            font-family: monospace;
            margin-top: 10px;
            white-space: pre-wrap;
        }
        h1, h2 {
            text-align: center;
            margin-bottom: 20px;
        }
        .status {
            padding: 10px;
            border-radius: 5px;
            margin: 10px 0;
            text-align: center;
            font-weight: bold;
        }
        .status.success {
            background: rgba(76, 175, 80, 0.3);
            border: 1px solid #4caf50;
        }
        .status.info {
            background: rgba(33, 150, 243, 0.3);
            border: 1px solid #2196f3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🛒 RetailFlowAI Storage Test</h1>
        <p>This page helps you test the cart and wishlist functionality from the AR viewer.</p>
        
        <div class="section">
            <h2>🛍️ Shopping Cart</h2>
            <button onclick="checkCart()">🔍 Check Cart</button>
            <button onclick="clearCart()" class="clear-btn">🗑️ Clear Cart</button>
            <div id="cartData" class="data-display">Click "Check Cart" to see stored items...</div>
        </div>
        
        <div class="section">
            <h2>💖 Wishlist</h2>
            <button onclick="checkWishlist()">🔍 Check Wishlist</button>
            <button onclick="clearWishlist()" class="clear-btn">🗑️ Clear Wishlist</button>
            <div id="wishlistData" class="data-display">Click "Check Wishlist" to see stored items...</div>
        </div>
        
        <div class="section">
            <h2>🧪 Test Actions</h2>
            <button onclick="addTestItem()">➕ Add Test Item to Cart</button>
            <button onclick="addTestWishlistItem()">💝 Add Test Item to Wishlist</button>
            <button onclick="clearAll()" class="clear-btn">🧹 Clear All Data</button>
        </div>
        
        <div id="status"></div>
        
        <div class="section">
            <h2>📱 Instructions</h2>
            <p>1. Open the main RetailFlowAI app in another tab</p>
            <p>2. Use the AR viewer to add items to cart and wishlist</p>
            <p>3. Come back to this page and check the stored data</p>
            <p>4. Use the clear buttons to reset the storage</p>
        </div>
    </div>

    <script>
        function showStatus(message, type = 'info') {
            const statusDiv = document.getElementById('status');
            statusDiv.innerHTML = `<div class="status ${type}">${message}</div>`;
            setTimeout(() => {
                statusDiv.innerHTML = '';
            }, 3000);
        }

        function checkCart() {
            try {
                const cart = localStorage.getItem('retailflow_cart');
                const cartDiv = document.getElementById('cartData');
                
                if (cart) {
                    const cartData = JSON.parse(cart);
                    cartDiv.textContent = JSON.stringify(cartData, null, 2);
                    showStatus(`✅ Cart found with ${cartData.length} items`, 'success');
                } else {
                    cartDiv.textContent = 'No cart data found.';
                    showStatus('ℹ️ No cart data found', 'info');
                }
            } catch (error) {
                document.getElementById('cartData').textContent = 'Error: ' + error.message;
                showStatus('❌ Error checking cart', 'info');
            }
        }

        function checkWishlist() {
            try {
                const wishlist = localStorage.getItem('retailflow_wishlist');
                const wishlistDiv = document.getElementById('wishlistData');
                
                if (wishlist) {
                    const wishlistData = JSON.parse(wishlist);
                    wishlistDiv.textContent = JSON.stringify(wishlistData, null, 2);
                    showStatus(`✅ Wishlist found with ${wishlistData.length} items`, 'success');
                } else {
                    wishlistDiv.textContent = 'No wishlist data found.';
                    showStatus('ℹ️ No wishlist data found', 'info');
                }
            } catch (error) {
                document.getElementById('wishlistData').textContent = 'Error: ' + error.message;
                showStatus('❌ Error checking wishlist', 'info');
            }
        }

        function clearCart() {
            localStorage.removeItem('retailflow_cart');
            document.getElementById('cartData').textContent = 'Cart cleared.';
            showStatus('🗑️ Cart cleared successfully', 'success');
        }

        function clearWishlist() {
            localStorage.removeItem('retailflow_wishlist');
            document.getElementById('wishlistData').textContent = 'Wishlist cleared.';
            showStatus('🗑️ Wishlist cleared successfully', 'success');
        }

        function clearAll() {
            localStorage.removeItem('retailflow_cart');
            localStorage.removeItem('retailflow_wishlist');
            document.getElementById('cartData').textContent = 'Cart cleared.';
            document.getElementById('wishlistData').textContent = 'Wishlist cleared.';
            showStatus('🧹 All data cleared successfully', 'success');
        }

        function addTestItem() {
            const testCartItem = {
                id: 999,
                name: 'Test Product',
                selectedColor: 'Red',
                selectedSize: 'M',
                finalPrice: 99.99,
                quantity: 1,
                timestamp: new Date().toISOString()
            };
            
            let cart = [];
            try {
                const existingCart = localStorage.getItem('retailflow_cart');
                if (existingCart) {
                    cart = JSON.parse(existingCart);
                }
            } catch (error) {
                console.error('Error loading cart:', error);
            }
            
            cart.push(testCartItem);
            localStorage.setItem('retailflow_cart', JSON.stringify(cart));
            showStatus('✅ Test item added to cart', 'success');
            checkCart();
        }

        function addTestWishlistItem() {
            const testWishlistItem = {
                id: 999,
                name: 'Test Wishlist Product',
                selectedColor: 'Blue',
                selectedSize: 'L',
                finalPrice: 149.99,
                dateAdded: new Date().toISOString()
            };
            
            let wishlist = [];
            try {
                const existingWishlist = localStorage.getItem('retailflow_wishlist');
                if (existingWishlist) {
                    wishlist = JSON.parse(existingWishlist);
                }
            } catch (error) {
                console.error('Error loading wishlist:', error);
            }
            
            wishlist.push(testWishlistItem);
            localStorage.setItem('retailflow_wishlist', JSON.stringify(wishlist));
            showStatus('✅ Test item added to wishlist', 'success');
            checkWishlist();
        }

        // Auto-check on page load
        window.onload = function() {
            checkCart();
            checkWishlist();
        };
    </script>
</body>
</html>'''
    
    with open('storage_test.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print("✅ Storage test page created: storage_test.html")
    print("🌐 Open this file in your browser to test cart and wishlist functionality")
    print("📱 Instructions:")
    print("  1. Open this test page in one browser tab")
    print("  2. Open your RetailFlowAI app in another tab")
    print("  3. Use AR viewer to add items to cart/wishlist")
    print("  4. Switch back to test page to see the stored data")

if __name__ == "__main__":
    create_test_storage_checker()
