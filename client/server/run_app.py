#!/usr/bin/env python3
"""Run the RetailFlowAI application with enhanced product images"""

import subprocess
import sys
import os

def run_script(script_name, description):
    """Run a Python script and show the output"""
    print(f"\n🔄 {description}...")
    print("="*50)
    
    try:
        result = subprocess.run([sys.executable, script_name], 
                              capture_output=True, text=True, cwd=os.getcwd())
        
        if result.stdout:
            print(result.stdout)
        if result.stderr:
            print(f"Error: {result.stderr}")
            
        if result.returncode == 0:
            print(f"✅ {description} completed successfully!")
        else:
            print(f"❌ {description} failed with return code {result.returncode}")
            
    except Exception as e:
        print(f"❌ Failed to run {script_name}: {e}")

def main():
    """Main function to set up and run the application"""
    print("🚀 Setting up RetailFlowAI with Enhanced Product Images")
    print("="*60)
    
    # Step 1: Add products with attractive images
    run_script("add_images.py", "Adding products with attractive Unsplash images")
    
    print("\n" + "="*60)
    print("🎯 Setup Complete! Now you can:")
    print("1. Start Flask backend: python app.py")
    print("2. Visit frontend: http://localhost:3000")
    print("3. Try these chatbot inputs:")
    print("   • 'It's raining' → See waterproof jacket with images")
    print("   • 'Sunny day' → Get luxury sunglasses with AR")
    print("   • 'Party tonight' → Sequined dress with multiple angles")
    print("   • 'Business meeting' → Executive suit and luxury watch")
    print("   • 'Feeling happy' → Colorful sneakers and floral dress")
    print("   • 'Need comfort' → Soft hoodie for cozy times")
    print("   • 'Workout time' → Performance running shoes")
    print("   • 'Casual day' → Classic jeans for relaxation")
    print("   • 'Date night' → Elegant evening gown")
    print("4. Click 'Try in AR' on any product for enhanced AR experience")
    print("5. Visit admin panel: http://localhost:3000/admin")
    print("="*60)
    
    # Try to start the Flask app
    print("\n🔥 Starting Flask backend...")
    try:
        subprocess.run([sys.executable, "app.py"], cwd=os.getcwd())
    except KeyboardInterrupt:
        print("\n👋 Application stopped by user")
    except Exception as e:
        print(f"\n❌ Failed to start Flask app: {e}")

if __name__ == "__main__":
    main()
