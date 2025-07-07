#!/usr/bin/env python3
"""
Check Database Schema for RetailFlowAI
"""

import sqlite3

def check_schema():
    conn = sqlite3.connect('retailflow.db')
    cursor = conn.cursor()
    
    print("📊 Products Table Schema:")
    print("=" * 50)
    
    cursor.execute('PRAGMA table_info(products)')
    columns = cursor.fetchall()
    
    for col in columns:
        print(f"{col[1]:20} | {col[2]:10} | Required: {bool(col[3])}")
    
    conn.close()

if __name__ == "__main__":
    check_schema()
