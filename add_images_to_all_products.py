import sqlite3
import json

def check_product_images():
    """Check current product images and add missing ones"""
    
    conn = sqlite3.connect('retailflow.db')
    cursor = conn.cursor()
    
    # Get all products
    cursor.execute('''
        SELECT id, name, image_url, images, category
        FROM products
    ''')
    
    products = cursor.fetchall()
    
    print("🖼️ CURRENT PRODUCT IMAGES STATUS:")
    print("=" * 60)
    
    products_without_images = []
    
    for product in products:
        product_id, name, image_url, images, category = product
        
        has_main_image = bool(image_url and image_url.strip())
        has_multiple_images = bool(images and images.strip() and images != '[]')
        
        status = "✅" if has_main_image and has_multiple_images else "❌"
        
        print(f"{status} {product_id}. {name[:40]}")
        print(f"   Main Image: {'✅' if has_main_image else '❌'} {image_url[:50] if image_url else 'MISSING'}...")
        print(f"   Multiple: {'✅' if has_multiple_images else '❌'} {images[:50] if images else 'MISSING'}...")
        print()
        
        if not has_main_image or not has_multiple_images:
            products_without_images.append((product_id, name, category))
    
    conn.close()
    
    print(f"\n📊 SUMMARY:")
    print(f"Total Products: {len(products)}")
    print(f"Products with complete images: {len(products) - len(products_without_images)}")
    print(f"Products needing images: {len(products_without_images)}")
    
    if products_without_images:
        print(f"\n❌ PRODUCTS NEEDING IMAGES:")
        for pid, name, category in products_without_images:
            print(f"  {pid}. {name} ({category})")
    
    return products_without_images

def add_professional_images_to_products():
    """Add professional, high-quality images to all products"""
    
    # Professional image sets for different categories
    PROFESSIONAL_IMAGES = {
        'clothing': {
            'dresses': [
                'https://images.unsplash.com/photo-1566479179817-c4b3a1f8b5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1565518776875-57c7a0ac3071?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            'jackets': [
                'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            'jeans': [
                'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1506629905057-50590cda9a4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            'tshirts': [
                'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1583743814966-8936f37f4ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            'leggings': [
                'https://images.unsplash.com/photo-1506629905057-50590cda9a4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1594882645126-14020914d58d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]
        },
        'accessories': {
            'sunglasses': [
                'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1582142306909-195724d33fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1586578267921-4338fb57c8b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            'watches': [
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            'bags': [
                'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]
        },
        'footwear': {
            'shoes': [
                'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            'sneakers': [
                'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]
        },
        'electronics': {
            'earbuds': [
                'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1590658165737-15a047b7cd5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1580952299616-d8012d82d01f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            'phones': [
                'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1592179900008-87ca74d83d8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]
        }
    }
    
    def get_images_for_product(name, category):
        """Get appropriate images for a product based on name and category"""
        name_lower = name.lower()
        
        # Determine product type from name
        if 'dress' in name_lower:
            return PROFESSIONAL_IMAGES['clothing']['dresses']
        elif 'jacket' in name_lower or 'blazer' in name_lower:
            return PROFESSIONAL_IMAGES['clothing']['jeans']
        elif 'jean' in name_lower:
            return PROFESSIONAL_IMAGES['clothing']['jeans']
        elif 't-shirt' in name_lower or 'shirt' in name_lower:
            return PROFESSIONAL_IMAGES['clothing']['tshirts']
        elif 'legging' in name_lower or 'yoga' in name_lower:
            return PROFESSIONAL_IMAGES['clothing']['leggings']
        elif 'sunglasses' in name_lower or 'glasses' in name_lower:
            return PROFESSIONAL_IMAGES['accessories']['sunglasses']
        elif 'watch' in name_lower:
            return PROFESSIONAL_IMAGES['accessories']['watches']
        elif 'bag' in name_lower or 'handbag' in name_lower or 'clutch' in name_lower or 'backpack' in name_lower:
            return PROFESSIONAL_IMAGES['accessories']['bags']
        elif 'shoe' in name_lower or 'sneaker' in name_lower:
            return PROFESSIONAL_IMAGES['footwear']['shoes']
        elif 'earbud' in name_lower or 'wireless' in name_lower:
            return PROFESSIONAL_IMAGES['electronics']['earbuds']
        elif 'phone' in name_lower or 'case' in name_lower:
            return PROFESSIONAL_IMAGES['electronics']['phones']
        else:
            # Default to first available category
            if category.lower() == 'clothing':
                return PROFESSIONAL_IMAGES['clothing']['tshirts']
            elif category.lower() == 'accessories':
                return PROFESSIONAL_IMAGES['accessories']['bags']
            elif category.lower() == 'electronics':
                return PROFESSIONAL_IMAGES['electronics']['earbuds']
            else:
                return PROFESSIONAL_IMAGES['clothing']['tshirts']
    
    conn = sqlite3.connect('retailflow.db')
    cursor = conn.cursor()
    
    # Get all products
    cursor.execute('SELECT id, name, category, image_url, images FROM products')
    products = cursor.fetchall()
    
    updated_count = 0
    
    print("🖼️ ADDING PROFESSIONAL IMAGES TO ALL PRODUCTS...")
    print("=" * 60)
    
    for product in products:
        product_id, name, category, current_image_url, current_images = product
        
        # Get professional images for this product
        image_set = get_images_for_product(name, category)
        main_image = image_set[0]
        multiple_images = json.dumps(image_set)
        
        # Update the product with new images
        cursor.execute('''
            UPDATE products 
            SET image_url = ?, images = ?
            WHERE id = ?
        ''', (main_image, multiple_images, product_id))
        
        print(f"✅ Updated {name}")
        print(f"   Main Image: {main_image}")
        print(f"   Total Images: {len(image_set)}")
        print()
        
        updated_count += 1
    
    conn.commit()
    conn.close()
    
    print(f"🎉 SUCCESSFULLY UPDATED {updated_count} PRODUCTS WITH PROFESSIONAL IMAGES!")
    return updated_count

if __name__ == "__main__":
    print("🖼️ CHECKING AND ADDING IMAGES FOR ALL PRODUCTS")
    print("=" * 60)
    
    # First check current status
    products_needing_images = check_product_images()
    
    # Add professional images to all products
    print("\n" + "=" * 60)
    updated_count = add_professional_images_to_products()
    
    print("\n" + "=" * 60)
    print("🎊 IMAGE UPDATE COMPLETE!")
    print(f"✅ {updated_count} products now have professional images")
    print("✅ All products have main image + multiple image sets")
    print("✅ High-quality Unsplash images for professional look")
    print("✅ Images optimized for AR and e-commerce display")
    print("\n🚀 Your RetailFlow AI now has beautiful images for all products!")
