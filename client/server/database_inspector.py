#!/usr/bin/env python3
"""
Database Inspector for RetailFlowAI
This tool helps you view and manage the database data
"""

import sqlite3
import json
from datetime import datetime

DATABASE = 'retailflow.db'

def print_separator(title=""):
    """Print a visual separator"""
    print("\n" + "="*60)
    if title:
        print(f"  {title}")
        print("="*60)

def show_database_schema():
    """Show the database structure"""
    print_separator("DATABASE SCHEMA")
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Get table names
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    
    print(f"📊 Database: {DATABASE}")
    print(f"📋 Tables: {len(tables)}")
    
    for table in tables:
        table_name = table[0]
        print(f"\n🗂️  Table: {table_name}")
        
        # Get table schema
        cursor.execute(f"PRAGMA table_info({table_name})")
        columns = cursor.fetchall()
        
        print("   Columns:")
        for col in columns:
            col_id, name, data_type, not_null, default, pk = col
            pk_marker = " (PRIMARY KEY)" if pk else ""
            not_null_marker = " NOT NULL" if not_null else ""
            default_marker = f" DEFAULT {default}" if default else ""
            print(f"     - {name}: {data_type}{pk_marker}{not_null_marker}{default_marker}")
    
    conn.close()

def show_products_summary():
    """Show products summary"""
    print_separator("PRODUCTS SUMMARY")
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Total count
    cursor.execute('SELECT COUNT(*) FROM products')
    total = cursor.fetchone()[0]
    print(f"📦 Total Products: {total}")
    
    # AR enabled count
    cursor.execute('SELECT COUNT(*) FROM products WHERE ar_enabled = 1')
    ar_count = cursor.fetchone()[0]
    print(f"🥽 AR-Enabled: {ar_count}")
    
    # Products by category
    cursor.execute('SELECT category, COUNT(*) FROM products GROUP BY category ORDER BY COUNT(*) DESC')
    categories = cursor.fetchall()
    print(f"\n📂 By Category:")
    for cat, count in categories:
        print(f"   - {cat}: {count} products")
    
    # Products by mood
    cursor.execute('SELECT mood_category, COUNT(*) FROM products GROUP BY mood_category ORDER BY COUNT(*) DESC')
    moods = cursor.fetchall()
    print(f"\n🎭 By Mood:")
    for mood, count in moods:
        print(f"   - {mood}: {count} products")
    
    # Price range
    cursor.execute('SELECT MIN(price), MAX(price), AVG(price) FROM products')
    min_price, max_price, avg_price = cursor.fetchone()
    print(f"\n💰 Price Range:")
    print(f"   - Min: ${min_price:.2f}")
    print(f"   - Max: ${max_price:.2f}")
    print(f"   - Average: ${avg_price:.2f}")
    
    # Trending products
    cursor.execute('SELECT COUNT(*) FROM products WHERE is_trending = 1')
    trending = cursor.fetchone()[0]
    print(f"\n🔥 Trending Products: {trending}")
    
    conn.close()

def show_all_products():
    """Show all products in detail"""
    print_separator("ALL PRODUCTS")
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT id, name, emoji, category, mood_category, price, brand, 
               rating, stock_quantity, is_trending, ar_enabled, image_url
        FROM products 
        ORDER BY id
    ''')
    
    products = cursor.fetchall()
    
    for p in products:
        id, name, emoji, category, mood, price, brand, rating, stock, trending, ar, image = p
        
        print(f"\n🆔 ID: {id}")
        print(f"📦 Name: {emoji} {name}")
        print(f"🏷️  Brand: {brand or 'N/A'}")
        print(f"📂 Category: {category}")
        print(f"🎭 Mood: {mood}")
        print(f"💰 Price: ${price}")
        print(f"⭐ Rating: {rating}/5")
        print(f"📊 Stock: {stock}")
        print(f"🔥 Trending: {'Yes' if trending else 'No'}")
        print(f"🥽 AR: {'Yes' if ar else 'No'}")
        if image:
            print(f"🖼️  Image: {image[:50]}{'...' if len(image) > 50 else ''}")
        print("-" * 40)
    
    conn.close()

def show_products_by_mood(mood_filter=None):
    """Show products filtered by mood"""
    if not mood_filter:
        mood_filter = input("Enter mood category (or 'all'): ").strip().lower()
    
    print_separator(f"PRODUCTS - {mood_filter.upper()}")
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    if mood_filter.lower() == 'all':
        cursor.execute('SELECT DISTINCT mood_category FROM products ORDER BY mood_category')
        moods = [row[0] for row in cursor.fetchall()]
        
        for mood in moods:
            cursor.execute('''
                SELECT id, name, emoji, price, ar_enabled 
                FROM products 
                WHERE mood_category = ? 
                ORDER BY name
            ''', (mood,))
            
            mood_products = cursor.fetchall()
            print(f"\n🎭 {mood.upper()} ({len(mood_products)} products):")
            
            for p in mood_products:
                id, name, emoji, price, ar = p
                ar_badge = " 🥽" if ar else ""
                print(f"   {id:2d}. {emoji} {name} - ${price}{ar_badge}")
    else:
        cursor.execute('''
            SELECT id, name, emoji, category, price, brand, rating, ar_enabled, image_url
            FROM products 
            WHERE LOWER(mood_category) = LOWER(?)
            ORDER BY name
        ''', (mood_filter,))
        
        products = cursor.fetchall()
        
        if products:
            print(f"Found {len(products)} products for '{mood_filter}' mood:\n")
            
            for p in products:
                id, name, emoji, category, price, brand, rating, ar, image = p
                ar_badge = " 🥽" if ar else ""
                print(f"🆔 {id:2d}. {emoji} {name}")
                print(f"    💰 ${price} | 📂 {category} | 🏷️ {brand or 'N/A'}")
                print(f"    ⭐ {rating}/5{ar_badge}")
                if image:
                    print(f"    🖼️ {image[:60]}{'...' if len(image) > 60 else ''}")
                print()
        else:
            print(f"❌ No products found for mood: {mood_filter}")
    
    conn.close()

def search_products():
    """Search products by name or description"""
    search_term = input("Enter search term: ").strip()
    
    print_separator(f"SEARCH RESULTS: '{search_term}'")
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT id, name, emoji, category, price, description, ar_enabled
        FROM products 
        WHERE LOWER(name) LIKE LOWER(?) OR LOWER(description) LIKE LOWER(?)
        ORDER BY name
    ''', (f'%{search_term}%', f'%{search_term}%'))
    
    results = cursor.fetchall()
    
    if results:
        print(f"Found {len(results)} products matching '{search_term}':\n")
        
        for p in results:
            id, name, emoji, category, price, desc, ar = p
            ar_badge = " 🥽" if ar else ""
            print(f"🆔 {id:2d}. {emoji} {name}{ar_badge}")
            print(f"    💰 ${price} | 📂 {category}")
            print(f"    📝 {desc[:80]}{'...' if len(desc) > 80 else ''}")
            print()
    else:
        print(f"❌ No products found matching: {search_term}")
    
    conn.close()

def show_user_interactions():
    """Show user interaction analytics"""
    print_separator("USER INTERACTIONS")
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    try:
        # Total interactions
        cursor.execute('SELECT COUNT(*) FROM user_interactions')
        total = cursor.fetchone()[0]
        print(f"💬 Total Interactions: {total}")
        
        if total > 0:
            # Most popular moods
            cursor.execute('''
                SELECT detected_mood, COUNT(*) as count 
                FROM user_interactions 
                GROUP BY detected_mood 
                ORDER BY count DESC 
                LIMIT 10
            ''')
            mood_stats = cursor.fetchall()
            
            print(f"\n🎭 Popular Moods:")
            for mood, count in mood_stats:
                print(f"   - {mood}: {count} searches")
            
            # Recent interactions
            cursor.execute('''
                SELECT user_input, detected_mood, timestamp 
                FROM user_interactions 
                ORDER BY timestamp DESC 
                LIMIT 10
            ''')
            recent = cursor.fetchall()
            
            print(f"\n📝 Recent Searches:")
            for input_text, mood, timestamp in recent:
                print(f"   \"{input_text}\" → {mood} ({timestamp})")
        else:
            print("📭 No user interactions recorded yet")
    
    except sqlite3.OperationalError:
        print("❌ User interactions table not found")
    
    conn.close()

def main_menu():
    """Main interactive menu"""
    while True:
        print_separator("RETAILFLOWAI DATABASE INSPECTOR")
        print("📊 Choose an option:")
        print("   1. 🏗️  Show Database Schema")
        print("   2. 📦 Products Summary")
        print("   3. 📋 Show All Products")
        print("   4. 🎭 Products by Mood")
        print("   5. 🔍 Search Products")
        print("   6. 💬 User Interactions")
        print("   7. 🚪 Exit")
        
        choice = input("\nEnter your choice (1-7): ").strip()
        
        if choice == '1':
            show_database_schema()
        elif choice == '2':
            show_products_summary()
        elif choice == '3':
            show_all_products()
        elif choice == '4':
            show_products_by_mood()
        elif choice == '5':
            search_products()
        elif choice == '6':
            show_user_interactions()
        elif choice == '7':
            print("\n👋 Thank you for using RetailFlowAI Database Inspector!")
            break
        else:
            print("❌ Invalid choice. Please enter 1-7.")
        
        input("\nPress Enter to continue...")

if __name__ == "__main__":
    print("🛍️ RetailFlowAI Database Inspector")
    print(f"⏰ Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Check if database exists
    try:
        conn = sqlite3.connect(DATABASE)
        conn.close()
        main_menu()
    except Exception as e:
        print(f"❌ Error accessing database: {e}")
        print("💡 Make sure the database file exists and is accessible.")
