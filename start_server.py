import subprocess
import sys
import os

print("Starting RetailFlowAI Backend Server...")
print("Current directory:", os.getcwd())
print("Python version:", sys.version)

# Check if we're in the right directory
server_path = r"c:\Users\sharm\OneDrive\Desktop\RetailFlowAI\client\server"
app_file = os.path.join(server_path, "app.py")

if os.path.exists(app_file):
    print(f"Found app.py at: {app_file}")
    os.chdir(server_path)
    print(f"Changed to directory: {os.getcwd()}")
    
    # Start the Flask app
    try:
        subprocess.run([sys.executable, "app.py"], check=True)
    except KeyboardInterrupt:
        print("\nServer stopped by user")
    except Exception as e:
        print(f"Error running server: {e}")
else:
    print(f"Could not find app.py at: {app_file}")
