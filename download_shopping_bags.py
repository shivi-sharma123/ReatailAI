import urllib.request
import os

def download_shopping_bags_image():
    """Download a colorful shopping bags image similar to the one provided"""
    # Using a high-quality colorful shopping bags image
    url = "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80"
    
    try:
        # Create images directory if it doesn't exist
        os.makedirs("client/src/images", exist_ok=True)
        
        # Download the image
        urllib.request.urlretrieve(url, "client/src/images/shopping_bags.jpg")
        print("✅ Shopping bags image downloaded successfully!")
        print("📁 Saved to: client/src/images/shopping_bags.jpg")
        return True
    except Exception as e:
        print(f"❌ Error downloading image: {e}")
        return False

if __name__ == "__main__":
    print("🛍️ Downloading colorful shopping bags image...")
    success = download_shopping_bags_image()
    
    if success:
        print("\n🎉 Image ready for chatbot background!")
        print("The CSS will be updated to use this local image.")
    else:
        print("\n⚠️ Failed to download image. Will use online URL fallback.")
