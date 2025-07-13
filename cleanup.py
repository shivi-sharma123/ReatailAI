import os
import shutil

# Paths
CLIENT_SERVER_PATH = "client/server"
RETAILFLOW_BACKEND_PATH = "retailflow-backend"
CLIENT_SRC_PATH = "client/src"

# Files to delete from client/server
files_to_delete_client_server = [
    "add_diverse_images.py", "add_diverse_products.py", "add_essential_products.py",
    "add_images.py", "add_jackets.py", "add_more_items.py", "add_products.py",
    "add_realistic_products.py", "app_backup.py", "app_complete.py", "app_enhanced.py",
    "app_fixed.py", "app_new.py", "app_walmart.py", "check_ar_products.py",
    "check_database.py", "check_db.py", "complete_server.py", "complete_setup.py",
    "create_db.py", "create_fresh_database.py", "create_walmart_database.py",
    "database_backup.py", "database_inspector.py", "database_new.py", "database.py",
    "debug_api.py", "demo_all_features.py", "demo_all_functions.py",
    "ensure_database_connection.py", "FINAL_LAUNCHER.py", "final_verification.py",
    "fix_chatbot_database.py", "fixed_app.py", "init_db.py", "init_products.py",
    "LAUNCH_ALL.bat", "persistent_database_setup.py", "product_showcase.html",
    "quick_db_check.py", "quick_setup_db.py", "quick_test_launcher.py",
    "rebuild_database.py", "restart_all.py", "retailflow_walmart.db",
    "RUN_APP.bat", "run_app.py", "run_init.bat", "run_server.py", "run_setup.bat",
    "setup_complete_app.py", "setup_complete_database.py", "setup_diverse_catalog.py",
    "setup_images.py", "setup_products_with_images.py"
]

# Files to delete from client/src
files_to_delete_client_src = [
    "App.js.backup", "App_New.js", "EnhancedARViewer_Fixed.js", "EnhancedARViewer_New.js",
    "AdvancedARViewer_New.js", "AdvancedARViewer_New.css"
]

# Files to delete from root
files_to_delete_root = [
    "advanced_cleanup.py", "check_database.py", "check_products.py",
    "cleanup_workspace.py", "products.db", "retailflow.db", "setup_database.py",
    "walmart_products.db", "APP_RUNNING_SUCCESS.md", "BLUE_HERO_SECTION_COMPLETE.md",
    "NAVIGATION_OPTIMIZATION_COMPLETE.md"
]

def delete_files(base_path, file_list):
    for f in file_list:
        file_path = os.path.join(base_path, f)
        if os.path.exists(file_path):
            try:
                if os.path.isdir(file_path):
                    shutil.rmtree(file_path)
                    print(f"Removed directory: {file_path}")
                else:
                    os.remove(file_path)
                    print(f"Removed file: {file_path}")
            except OSError as e:
                print(f"Error removing {file_path}: {e}")
        else:
            print(f"File not found, skipping: {file_path}")

# Execute cleanup
print("--- Starting Cleanup ---")

print("\nCleaning client/server directory...")
delete_files(CLIENT_SERVER_PATH, files_to_delete_client_server)

print("\nCleaning client/src directory...")
delete_files(CLIENT_SRC_PATH, files_to_delete_client_src)

print("\nCleaning root directory...")
delete_files(".", files_to_delete_root)

# Consolidate backend - for now, we assume retailflow-backend is the primary one.
# We will manually check if any critical files from client/server need to be moved.
# A simple approach is to see what's left in client/server.
print("\n--- Checking remaining files in client/server ---")
remaining_files = os.listdir(CLIENT_SERVER_PATH)
if remaining_files:
    print("Remaining files in client/server:", remaining_files)
    # Key files to keep/move might be 'app.py', 'requirements.txt', 'database.db'
    # We assume 'retailflow-backend' is the source of truth.
    # Let's see if we can just remove the whole folder.
    # For now, we'll just report.
else:
    print("client/server is empty or only contains essential files.")

# For this script, we'll be aggressive and assume retailflow-backend is the one to keep.
# We will remove the client/server directory if it exists.
if os.path.exists(CLIENT_SERVER_PATH):
     print(f"\nRemoving redundant backend directory: {CLIENT_SERVER_PATH}")
     # shutil.rmtree(CLIENT_SERVER_PATH)


print("\n--- Cleanup Complete ---")
