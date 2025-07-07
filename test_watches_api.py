#!/usr/bin/env python3
"""
Test API for Smart Watches
"""

import requests

try:
    response = requests.get('http://localhost:5000/api/products')
    print(f"API Status: {response.status_code}")
    
    if response.status_code == 200:
        products = response.json()
        watches = [p for p in products if p['category'] == 'Electronics']
        print(f"Found {len(watches)} electronics products")
        
        for watch in watches:
            print(f"- {watch['name']} (AR: {watch.get('ar_enabled', False)})")
            if watch.get('color_variants'):
                colors = watch['color_variants'].split(',')
                print(f"  Colors: {len(colors)} options")
            if watch.get('size_options'):
                sizes = watch['size_options'].split(',')
                print(f"  Sizes: {len(sizes)} options")
            print()
    else:
        print("API not responding correctly")
        
except Exception as e:
    print(f"Error: {e}")
