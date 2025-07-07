"""
Create Diverse Product Catalog for RetailFlowAI
Adding unique products for different categories:
- Bags, Heels, Dresses, Jeans, Kitchen Sets, Electronics, etc.
"""

import sqlite3
import json

def clear_and_add_diverse_products():
    """Clear existing products and add diverse, unique products"""
    conn = sqlite3.connect('retailflow.db')
    cursor = conn.cursor()
    
    # Clear existing products
    cursor.execute('DELETE FROM products')
    
    # Diverse product catalog
    diverse_products = [
        # BAGS - Different types
        {
            'name': 'Luxury Leather Handbag',
            'category': 'Bags',
            'mood_category': 'luxury',
            'price': 299.99,
            'description': 'Premium genuine leather handbag with gold hardware',
            'emoji': '👜',
            'image_url': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'brand': 'LuxeCraft',
            'rating': 4.8,
            'tags': 'luxury,leather,handbag,premium',
            'is_trending': 1,
            'stock_quantity': 50,
            'ar_enabled': 1,
            'images': json.dumps([
                'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]),
            'colors': json.dumps([
                {'name': 'Classic Black', 'hex': '#000000', 'price_modifier': 0, 'stock': 20},
                {'name': 'Rich Brown', 'hex': '#8b4513', 'price_modifier': 15, 'stock': 15},
                {'name': 'Burgundy Red', 'hex': '#800020', 'price_modifier': 25, 'stock': 10},
                {'name': 'Navy Blue', 'hex': '#000080', 'price_modifier': 20, 'stock': 5}
            ]),
            'sizes': json.dumps([
                {'name': 'Small', 'price_modifier': -30, 'stock': 15, 'measurements': '25cm x 20cm'},
                {'name': 'Medium', 'price_modifier': 0, 'stock': 20, 'measurements': '30cm x 25cm'},
                {'name': 'Large', 'price_modifier': 50, 'stock': 15, 'measurements': '35cm x 30cm'}
            ])
        },
        {
            'name': 'Student Canvas Backpack',
            'category': 'Bags',
            'mood_category': 'casual',
            'price': 89.99,
            'description': 'Durable canvas backpack perfect for students and travelers',
            'emoji': '🎒',
            'image_url': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'brand': 'EduPack',
            'rating': 4.5,
            'tags': 'backpack,student,canvas,casual',
            'is_trending': 1,
            'stock_quantity': 100,
            'ar_enabled': 1,
            'images': json.dumps([
                'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]),
            'colors': json.dumps([
                {'name': 'Forest Green', 'hex': '#228b22', 'price_modifier': 0, 'stock': 30},
                {'name': 'Navy Blue', 'hex': '#000080', 'price_modifier': 0, 'stock': 25},
                {'name': 'Charcoal Gray', 'hex': '#36454f', 'price_modifier': 5, 'stock': 25},
                {'name': 'Burgundy', 'hex': '#800020', 'price_modifier': 10, 'stock': 20}
            ]),
            'sizes': json.dumps([
                {'name': '20L', 'price_modifier': -10, 'stock': 30, 'measurements': '20 Liter capacity'},
                {'name': '30L', 'price_modifier': 0, 'stock': 50, 'measurements': '30 Liter capacity'},
                {'name': '40L', 'price_modifier': 20, 'stock': 20, 'measurements': '40 Liter capacity'}
            ])
        },
        
        # HEELS - Different styles
        {
            'name': 'Elegant Stiletto Heels',
            'category': 'Heels',
            'mood_category': 'elegant',
            'price': 199.99,
            'description': 'Classic pointed-toe stiletto heels for special occasions',
            'emoji': '👠',
            'image_url': 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'brand': 'GlamourStep',
            'rating': 4.7,
            'tags': 'heels,stiletto,elegant,formal',
            'is_trending': 1,
            'stock_quantity': 75,
            'ar_enabled': 1,
            'images': json.dumps([
                'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]),
            'colors': json.dumps([
                {'name': 'Classic Black', 'hex': '#000000', 'price_modifier': 0, 'stock': 25},
                {'name': 'Ruby Red', 'hex': '#e0115f', 'price_modifier': 20, 'stock': 20},
                {'name': 'Nude Beige', 'hex': '#f5deb3', 'price_modifier': 15, 'stock': 15},
                {'name': 'Metallic Gold', 'hex': '#ffd700', 'price_modifier': 30, 'stock': 15}
            ]),
            'sizes': json.dumps([
                {'name': 'Size 5', 'price_modifier': 0, 'stock': 10, 'measurements': 'US Size 5'},
                {'name': 'Size 6', 'price_modifier': 0, 'stock': 15, 'measurements': 'US Size 6'},
                {'name': 'Size 7', 'price_modifier': 0, 'stock': 20, 'measurements': 'US Size 7'},
                {'name': 'Size 8', 'price_modifier': 0, 'stock': 15, 'measurements': 'US Size 8'},
                {'name': 'Size 9', 'price_modifier': 0, 'stock': 15, 'measurements': 'US Size 9'}
            ])
        },
        {
            'name': 'Chunky Platform Heels',
            'category': 'Heels',
            'mood_category': 'trendy',
            'price': 149.99,
            'description': 'Trendy platform heels with chunky sole for comfort',
            'emoji': '👠',
            'image_url': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'brand': 'TrendyFeet',
            'rating': 4.4,
            'tags': 'heels,platform,chunky,trendy',
            'is_trending': 1,
            'stock_quantity': 60,
            'ar_enabled': 1,
            'images': json.dumps([
                'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]),
            'colors': json.dumps([
                {'name': 'White Leather', 'hex': '#ffffff', 'price_modifier': 0, 'stock': 20},
                {'name': 'Pink Blush', 'hex': '#ffb6c1', 'price_modifier': 10, 'stock': 15},
                {'name': 'Black Patent', 'hex': '#000000', 'price_modifier': 15, 'stock': 15},
                {'name': 'Silver Metallic', 'hex': '#c0c0c0', 'price_modifier': 25, 'stock': 10}
            ]),
            'sizes': json.dumps([
                {'name': 'Size 5', 'price_modifier': 0, 'stock': 10, 'measurements': 'US Size 5'},
                {'name': 'Size 6', 'price_modifier': 0, 'stock': 15, 'measurements': 'US Size 6'},
                {'name': 'Size 7', 'price_modifier': 0, 'stock': 20, 'measurements': 'US Size 7'},
                {'name': 'Size 8', 'price_modifier': 0, 'stock': 15, 'measurements': 'US Size 8'}
            ])
        },
        
        # DRESSES - Different styles
        {
            'name': 'Floral Summer Dress',
            'category': 'Dresses',
            'mood_category': 'casual',
            'price': 129.99,
            'description': 'Light and breezy floral dress perfect for summer outings',
            'emoji': '👗',
            'image_url': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'brand': 'SummerVibes',
            'rating': 4.6,
            'tags': 'dress,floral,summer,casual',
            'is_trending': 1,
            'stock_quantity': 85,
            'ar_enabled': 1,
            'images': json.dumps([
                'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]),
            'colors': json.dumps([
                {'name': 'Blue Floral', 'hex': '#4169e1', 'price_modifier': 0, 'stock': 25},
                {'name': 'Pink Roses', 'hex': '#ff69b4', 'price_modifier': 10, 'stock': 20},
                {'name': 'Yellow Sunshine', 'hex': '#ffd700', 'price_modifier': 5, 'stock': 20},
                {'name': 'White Garden', 'hex': '#ffffff', 'price_modifier': 15, 'stock': 20}
            ]),
            'sizes': json.dumps([
                {'name': 'XS', 'price_modifier': 0, 'stock': 15, 'measurements': 'Extra Small'},
                {'name': 'S', 'price_modifier': 0, 'stock': 20, 'measurements': 'Small'},
                {'name': 'M', 'price_modifier': 0, 'stock': 25, 'measurements': 'Medium'},
                {'name': 'L', 'price_modifier': 0, 'stock': 15, 'measurements': 'Large'},
                {'name': 'XL', 'price_modifier': 0, 'stock': 10, 'measurements': 'Extra Large'}
            ])
        },
        {
            'name': 'Evening Cocktail Dress',
            'category': 'Dresses',
            'mood_category': 'elegant',
            'price': 299.99,
            'description': 'Sophisticated cocktail dress for evening events',
            'emoji': '👗',
            'image_url': 'https://images.unsplash.com/photo-1566479179817-c7c2fb16baf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'brand': 'EveningGlow',
            'rating': 4.8,
            'tags': 'dress,cocktail,evening,elegant',
            'is_trending': 1,
            'stock_quantity': 40,
            'ar_enabled': 1,
            'images': json.dumps([
                'https://images.unsplash.com/photo-1566479179817-c7c2fb16baf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]),
            'colors': json.dumps([
                {'name': 'Midnight Black', 'hex': '#000000', 'price_modifier': 0, 'stock': 15},
                {'name': 'Deep Emerald', 'hex': '#50c878', 'price_modifier': 25, 'stock': 10},
                {'name': 'Royal Blue', 'hex': '#4169e1', 'price_modifier': 20, 'stock': 10},
                {'name': 'Burgundy Wine', 'hex': '#800020', 'price_modifier': 30, 'stock': 5}
            ]),
            'sizes': json.dumps([
                {'name': 'XS', 'price_modifier': 0, 'stock': 8, 'measurements': 'Extra Small'},
                {'name': 'S', 'price_modifier': 0, 'stock': 10, 'measurements': 'Small'},
                {'name': 'M', 'price_modifier': 0, 'stock': 12, 'measurements': 'Medium'},
                {'name': 'L', 'price_modifier': 0, 'stock': 8, 'measurements': 'Large'},
                {'name': 'XL', 'price_modifier': 0, 'stock': 2, 'measurements': 'Extra Large'}
            ])
        },
        
        # JEANS - Different styles
        {
            'name': 'Classic Skinny Jeans',
            'category': 'Jeans',
            'mood_category': 'casual',
            'price': 89.99,
            'description': 'Perfect fit skinny jeans with stretch comfort',
            'emoji': '👖',
            'image_url': 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'brand': 'DenimCraft',
            'rating': 4.5,
            'tags': 'jeans,skinny,denim,casual',
            'is_trending': 1,
            'stock_quantity': 120,
            'ar_enabled': 1,
            'images': json.dumps([
                'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]),
            'colors': json.dumps([
                {'name': 'Classic Blue', 'hex': '#4682b4', 'price_modifier': 0, 'stock': 40},
                {'name': 'Dark Indigo', 'hex': '#191970', 'price_modifier': 10, 'stock': 30},
                {'name': 'Light Wash', 'hex': '#87ceeb', 'price_modifier': 5, 'stock': 30},
                {'name': 'Black Denim', 'hex': '#2f2f2f', 'price_modifier': 15, 'stock': 20}
            ]),
            'sizes': json.dumps([
                {'name': '26', 'price_modifier': 0, 'stock': 20, 'measurements': '26 inch waist'},
                {'name': '28', 'price_modifier': 0, 'stock': 25, 'measurements': '28 inch waist'},
                {'name': '30', 'price_modifier': 0, 'stock': 25, 'measurements': '30 inch waist'},
                {'name': '32', 'price_modifier': 0, 'stock': 25, 'measurements': '32 inch waist'},
                {'name': '34', 'price_modifier': 0, 'stock': 15, 'measurements': '34 inch waist'},
                {'name': '36', 'price_modifier': 0, 'stock': 10, 'measurements': '36 inch waist'}
            ])
        },
        {
            'name': 'Vintage Wide Leg Jeans',
            'category': 'Jeans',
            'mood_category': 'retro',
            'price': 119.99,
            'description': 'Retro-inspired wide leg jeans with vintage wash',
            'emoji': '👖',
            'image_url': 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'brand': 'RetroStyle',
            'rating': 4.3,
            'tags': 'jeans,wide-leg,vintage,retro',
            'is_trending': 1,
            'stock_quantity': 80,
            'ar_enabled': 1,
            'images': json.dumps([
                'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]),
            'colors': json.dumps([
                {'name': 'Vintage Blue', 'hex': '#6495ed', 'price_modifier': 0, 'stock': 25},
                {'name': 'Faded Black', 'hex': '#36454f', 'price_modifier': 15, 'stock': 20},
                {'name': 'Stone Wash', 'hex': '#b0c4de', 'price_modifier': 10, 'stock': 20},
                {'name': 'Raw Denim', 'hex': '#1e3a8a', 'price_modifier': 20, 'stock': 15}
            ]),
            'sizes': json.dumps([
                {'name': '26', 'price_modifier': 0, 'stock': 15, 'measurements': '26 inch waist'},
                {'name': '28', 'price_modifier': 0, 'stock': 20, 'measurements': '28 inch waist'},
                {'name': '30', 'price_modifier': 0, 'stock': 20, 'measurements': '30 inch waist'},
                {'name': '32', 'price_modifier': 0, 'stock': 15, 'measurements': '32 inch waist'},
                {'name': '34', 'price_modifier': 0, 'stock': 10, 'measurements': '34 inch waist'}
            ])
        },
        
        # KITCHEN SETS - Different types
        {
            'name': 'Professional Chef Knife Set',
            'category': 'Kitchen',
            'mood_category': 'professional',
            'price': 249.99,
            'description': 'Complete professional-grade knife set for serious cooking',
            'emoji': '🔪',
            'image_url': 'https://images.unsplash.com/photo-1586074299757-cd84c5c96736?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'brand': 'ChefMaster',
            'rating': 4.9,
            'tags': 'kitchen,knives,professional,cooking',
            'is_trending': 1,
            'stock_quantity': 45,
            'ar_enabled': 1,
            'images': json.dumps([
                'https://images.unsplash.com/photo-1586074299757-cd84c5c96736?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]),
            'colors': json.dumps([
                {'name': 'Stainless Steel', 'hex': '#c0c0c0', 'price_modifier': 0, 'stock': 20},
                {'name': 'Black Handle', 'hex': '#000000', 'price_modifier': 25, 'stock': 15},
                {'name': 'Wood Handle', 'hex': '#8b4513', 'price_modifier': 35, 'stock': 10}
            ]),
            'sizes': json.dumps([
                {'name': '5-Piece Set', 'price_modifier': -50, 'stock': 15, 'measurements': '5 essential knives'},
                {'name': '8-Piece Set', 'price_modifier': 0, 'stock': 20, 'measurements': '8 piece complete set'},
                {'name': '12-Piece Set', 'price_modifier': 100, 'stock': 10, 'measurements': '12 piece master set'}
            ])
        },
        {
            'name': 'Non-Stick Cookware Set',
            'category': 'Kitchen',
            'mood_category': 'practical',
            'price': 189.99,
            'description': 'Premium non-stick cookware set for everyday cooking',
            'emoji': '🍳',
            'image_url': 'https://images.unsplash.com/photo-1556909114-4fdd7b350ba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'brand': 'CookEasy',
            'rating': 4.6,
            'tags': 'kitchen,cookware,non-stick,pans',
            'is_trending': 1,
            'stock_quantity': 65,
            'ar_enabled': 1,
            'images': json.dumps([
                'https://images.unsplash.com/photo-1556909114-4fdd7b350ba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]),
            'colors': json.dumps([
                {'name': 'Classic Black', 'hex': '#2f2f2f', 'price_modifier': 0, 'stock': 25},
                {'name': 'Ceramic White', 'hex': '#f8f8ff', 'price_modifier': 20, 'stock': 20},
                {'name': 'Copper Bottom', 'hex': '#b87333', 'price_modifier': 30, 'stock': 15},
                {'name': 'Granite Gray', 'hex': '#708090', 'price_modifier': 15, 'stock': 5}
            ]),
            'sizes': json.dumps([
                {'name': '6-Piece Set', 'price_modifier': -40, 'stock': 20, 'measurements': '6 piece starter set'},
                {'name': '10-Piece Set', 'price_modifier': 0, 'stock': 25, 'measurements': '10 piece family set'},
                {'name': '14-Piece Set', 'price_modifier': 60, 'stock': 20, 'measurements': '14 piece complete set'}
            ])
        },
        
        # ELECTRONICS - Different gadgets
        {
            'name': 'Wireless Bluetooth Headphones',
            'category': 'Electronics',
            'mood_category': 'tech',
            'price': 199.99,
            'description': 'Premium wireless headphones with noise cancellation',
            'emoji': '🎧',
            'image_url': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'brand': 'AudioMax',
            'rating': 4.7,
            'tags': 'electronics,headphones,wireless,audio',
            'is_trending': 1,
            'stock_quantity': 90,
            'ar_enabled': 1,
            'images': json.dumps([
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]),
            'colors': json.dumps([
                {'name': 'Matte Black', 'hex': '#28282B', 'price_modifier': 0, 'stock': 30},
                {'name': 'Pearl White', 'hex': '#f8f8ff', 'price_modifier': 10, 'stock': 25},
                {'name': 'Rose Gold', 'hex': '#e8b4cb', 'price_modifier': 25, 'stock': 20},
                {'name': 'Space Gray', 'hex': '#708090', 'price_modifier': 15, 'stock': 15}
            ]),
            'sizes': json.dumps([
                {'name': 'Regular', 'price_modifier': 0, 'stock': 60, 'measurements': 'Standard fit'},
                {'name': 'Large', 'price_modifier': 20, 'stock': 30, 'measurements': 'Large head size'}
            ])
        },
        {
            'name': 'Smart Fitness Watch',
            'category': 'Electronics',
            'mood_category': 'fitness',
            'price': 299.99,
            'description': 'Advanced fitness tracking watch with heart rate monitor',
            'emoji': '⌚',
            'image_url': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'brand': 'FitTech',
            'rating': 4.8,
            'tags': 'electronics,watch,fitness,smart',
            'is_trending': 1,
            'stock_quantity': 70,
            'ar_enabled': 1,
            'images': json.dumps([
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]),
            'colors': json.dumps([
                {'name': 'Space Black', 'hex': '#1a1a1a', 'price_modifier': 0, 'stock': 25},
                {'name': 'Silver', 'hex': '#c0c0c0', 'price_modifier': 0, 'stock': 20},
                {'name': 'Gold', 'hex': '#ffd700', 'price_modifier': 50, 'stock': 15},
                {'name': 'Rose Gold', 'hex': '#e8b4cb', 'price_modifier': 50, 'stock': 10}
            ]),
            'sizes': json.dumps([
                {'name': '40mm', 'price_modifier': -30, 'stock': 30, 'measurements': '40mm case'},
                {'name': '44mm', 'price_modifier': 0, 'stock': 40, 'measurements': '44mm case'}
            ])
        }
    ]
    
    # Insert all products
    for product in diverse_products:
        cursor.execute('''
            INSERT INTO products (
                name, category, mood_category, price, description, emoji, image_url,
                brand, rating, tags, is_trending, stock_quantity, ar_enabled,
                images, colors, sizes
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            product['name'], product['category'], product['mood_category'],
            product['price'], product['description'], product['emoji'], product['image_url'],
            product['brand'], product['rating'], product['tags'], product['is_trending'],
            product['stock_quantity'], product['ar_enabled'], product['images'],
            product['colors'], product['sizes']
        ))
    
    conn.commit()
    conn.close()
    print(f"✅ Added {len(diverse_products)} diverse, unique products!")
    
    # Verify products
    conn = sqlite3.connect('retailflow.db')
    cursor = conn.cursor()
    cursor.execute('SELECT name, category FROM products')
    products = cursor.fetchall()
    
    print("\n🛍️ Product Catalog:")
    categories = {}
    for name, category in products:
        if category not in categories:
            categories[category] = []
        categories[category].append(name)
    
    for category, items in categories.items():
        print(f"\n{category.upper()}:")
        for item in items:
            print(f"  - {item}")
    
    conn.close()

if __name__ == "__main__":
    clear_and_add_diverse_products()
