"""
Database Schema Updater for RetailFlowAI
Adds enhanced columns to existing products table
"""

import sqlite3
import json

DB_PATH = 'retailflow.db'

def update_database_schema():
    """Add new columns to existing products table"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # List of new columns to add
    new_columns = [
        ('quality_tiers', 'TEXT'),
        ('customization_options', 'TEXT'),
        ('interactive_features', 'TEXT')
    ]
    
    for column_name, column_type in new_columns:
        try:
            cursor.execute(f'ALTER TABLE products ADD COLUMN {column_name} {column_type}')
            print(f"✅ Added column: {column_name}")
        except sqlite3.OperationalError as e:
            if "duplicate column name" in str(e):
                print(f"⚠️ Column {column_name} already exists")
            else:
                print(f"❌ Error adding {column_name}: {e}")
    
    conn.commit()
    conn.close()
    print("✅ Database schema updated!")

def add_enhanced_features_to_existing():
    """Add enhanced features to existing products"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Get all existing products
    cursor.execute("SELECT id, name, category FROM products")
    products = cursor.fetchall()
    
    for product_id, name, category in products:
        # Generate quality tiers based on category
        if category.lower() in ['electronics', 'tech']:
            quality_tiers = json.dumps([
                {'name': 'Standard', 'price_modifier': 0, 'features': ['Basic features', 'Standard warranty']},
                {'name': 'Premium', 'price_modifier': 50, 'features': ['Enhanced features', 'Extended warranty', 'Priority support']},
                {'name': 'Pro', 'price_modifier': 100, 'features': ['All Premium features', 'Advanced capabilities', 'Premium materials']}
            ])
        elif category.lower() in ['clothing', 'fashion']:
            quality_tiers = json.dumps([
                {'name': 'Regular', 'price_modifier': 0, 'features': ['Standard fabric', 'Basic construction']},
                {'name': 'Premium', 'price_modifier': 25, 'features': ['High-quality fabric', 'Enhanced durability', 'Better fit']},
                {'name': 'Luxury', 'price_modifier': 60, 'features': ['Premium materials', 'Hand-finished details', 'Designer quality']}
            ])
        else:
            quality_tiers = json.dumps([
                {'name': 'Basic', 'price_modifier': 0, 'features': ['Standard quality', 'Basic features']},
                {'name': 'Enhanced', 'price_modifier': 30, 'features': ['Improved quality', 'Additional features']},
                {'name': 'Premium', 'price_modifier': 60, 'features': ['Top quality', 'All premium features']}
            ])
        
        # Generate customization options
        customization_options = json.dumps({
            'personalization': True,
            'gift_wrapping': True,
            'express_shipping': True,
            'custom_engraving': category.lower() in ['electronics', 'accessories']
        })
        
        # Generate interactive features
        interactive_features = json.dumps({
            'color_preview': True,
            'size_guide': True,
            '360_view': True,
            'ar_try_on': True,
            'zoom_view': True,
            'compare_feature': True
        })
        
        # Update the product
        cursor.execute('''
            UPDATE products 
            SET quality_tiers = ?, customization_options = ?, interactive_features = ?
            WHERE id = ?
        ''', (quality_tiers, customization_options, interactive_features, product_id))
    
    conn.commit()
    conn.close()
    print(f"✅ Enhanced features added to {len(products)} existing products!")

if __name__ == "__main__":
    print("🔧 Updating database schema...")
    update_database_schema()
    add_enhanced_features_to_existing()
    print("🎉 Database update complete!")
