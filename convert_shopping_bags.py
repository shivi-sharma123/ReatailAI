import base64
import requests
from io import BytesIO
from PIL import Image
import os

def image_to_base64(image_path):
    """Convert image to base64 string"""
    try:
        with open(image_path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
            return encoded_string
    except Exception as e:
        print(f"Error converting image: {e}")
        return None

def download_similar_image():
    """Download a similar colorful shopping bags image"""
    # Using a similar shopping bags image from a reliable source
    url = "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80"
    
    try:
        response = requests.get(url)
        if response.status_code == 200:
            # Save the image
            with open("shopping_bags.jpg", "wb") as f:
                f.write(response.content)
            print("Image downloaded successfully!")
            return "shopping_bags.jpg"
        else:
            print(f"Failed to download image. Status code: {response.status_code}")
            return None
    except Exception as e:
        print(f"Error downloading image: {e}")
        return None

if __name__ == "__main__":
    # Try to download a similar image
    image_path = download_similar_image()
    
    if image_path:
        # Convert to base64
        base64_string = image_to_base64(image_path)
        if base64_string:
            print("Base64 conversion successful!")
            print(f"Length: {len(base64_string)} characters")
            
            # Save to file for CSS usage
            with open("shopping_bags_base64.txt", "w") as f:
                f.write(base64_string)
            
            print("Base64 string saved to shopping_bags_base64.txt")
        else:
            print("Failed to convert image to base64")
    else:
        print("Failed to download image")
