import sqlite3

def update_database_schema():
    conn = sqlite3.connect('retailflow.db')
    cursor = conn.cursor()
    
    # Add new columns if they don't exist
    new_columns = [
        ('colors', 'TEXT'),
        ('sizes', 'TEXT'),
        ('material', 'TEXT'),
        ('dimensions', 'TEXT'),
        ('ar_model_url', 'TEXT'),
        ('ar_preview_url', 'TEXT'),
        ('color_variants', 'TEXT'),
        ('size_options', 'TEXT')
    ]
    
    for column_name, column_type in new_columns:
        try:
            cursor.execute(f'ALTER TABLE products ADD COLUMN {column_name} {column_type}')
            print(f"✅ Added column: {column_name}")
        except sqlite3.OperationalError as e:
            if "duplicate column name" in str(e):
                print(f"⏭️  Column already exists: {column_name}")
            else:
                print(f"❌ Error adding {column_name}: {e}")
    
    conn.commit()
    conn.close()
    print("🎉 Database schema updated!")

if __name__ == "__main__":
    update_database_schema()
