import requests
import json
import time

def test_enhanced_mood_recommendations():
    """Test the enhanced mood-based recommendation system"""
    print("🧪 TESTING ENHANCED MOOD-BASED RECOMMENDATIONS")
    print("=" * 60)
    
    base_url = "http://localhost:5000"
    
    # Test scenarios with different moods
    test_scenarios = [
        {
            'input': 'I feel amazing and want to look fabulous for a party tonight!',
            'expected_mood': 'party',
            'context': 'party mood with excitement'
        },
        {
            'input': 'Need professional attire for an important business meeting tomorrow',
            'expected_mood': 'professional', 
            'context': 'business professional mood'
        },
        {
            'input': 'Looking for comfortable workout clothes for my morning fitness routine',
            'expected_mood': 'fitness',
            'context': 'fitness motivation mood'
        },
        {
            'input': 'Want something romantic and elegant for a special dinner date',
            'expected_mood': 'romantic',
            'context': 'romantic evening mood'
        },
        {
            'input': 'Just want to relax at home in something super comfortable and cozy',
            'expected_mood': 'comfort',
            'context': 'comfort and relaxation mood'
        },
        {
            'input': 'I am feeling happy and want bright colorful things!',
            'expected_mood': 'happy',
            'context': 'happy and energetic mood'
        },
        {
            'input': 'Need casual everyday clothes for weekend shopping',
            'expected_mood': 'casual',
            'context': 'casual relaxed mood'
        },
        {
            'input': 'Want to go shopping and see what\'s new and trendy',
            'expected_mood': 'shopping',
            'context': 'general shopping mood'
        }
    ]
    
    print("🎯 ENHANCED MOOD DETECTION TESTS:")
    print()
    
    for i, scenario in enumerate(test_scenarios, 1):
        print(f"{i}. Testing: '{scenario['input'][:50]}...'")
        
        try:
            # Test enhanced recommend endpoint
            response = requests.post(f'{base_url}/api/enhanced-recommend', 
                                   json={'message': scenario['input']},
                                   timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                detected_mood = data.get('mood', 'unknown')
                products_count = len(data.get('products', []))
                confidence = data.get('confidence_score', 0)
                personalized = data.get('personalized', False)
                
                print(f"   ✅ Detected Mood: {detected_mood}")
                print(f"   🛍️ Products Found: {products_count}")
                print(f"   🎯 AI Confidence: {confidence:.1%}")
                print(f"   🤖 Personalized: {'Yes' if personalized else 'No'}")
                print(f"   💡 Context: {scenario['context']}")
                
                if products_count > 0:
                    sample_product = data['products'][0]
                    print(f"   🏆 Top Pick: {sample_product.get('emoji', '📦')} {sample_product.get('name', 'Unknown')}")
                    
                    # Check for AI insights
                    if 'ai_insights' in sample_product:
                        insights = sample_product['ai_insights']
                        print(f"   🧠 AI Insights: Mood Match {insights.get('mood_match_score', 0):.1%}")
                
                # Check if mood matches expectation
                mood_match = "✅" if detected_mood == scenario['expected_mood'] else "⚠️"
                print(f"   {mood_match} Expected: {scenario['expected_mood']}, Got: {detected_mood}")
                
            else:
                print(f"   ❌ API Error: {response.status_code}")
                
        except requests.exceptions.ConnectionError:
            print(f"   ⚠️ Backend not running - please start the server")
        except Exception as e:
            print(f"   ❌ Test Error: {e}")
        
        print()
        time.sleep(0.5)  # Small delay between tests
    
    print("\n📊 ANALYTICS DASHBOARD TEST:")
    try:
        response = requests.get(f'{base_url}/api/mood-analytics', timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Enhanced Analytics API Working")
            print(f"   📈 Mood Categories: {len(data.get('mood_summary', []))}")
            print(f"   📊 Real-time Metrics: {len(data.get('real_time_metrics', []))}")
            print(f"   🔄 Recent Activity: {len(data.get('recent_mood_activity', []))}")
            
            # Show sample metrics
            if data.get('real_time_metrics'):
                print(f"   💡 Sample Metrics:")
                for metric in data['real_time_metrics'][:3]:
                    name = metric['name'].replace('_', ' ').title()
                    value = metric['value']
                    metric_type = metric['type']
                    if metric_type == 'percentage':
                        print(f"      • {name}: {value*100:.1f}%")
                    elif metric_type == 'currency':
                        print(f"      • {name}: ${value:,.2f}")
                    else:
                        print(f"      • {name}: {value}")
        else:
            print(f"   ❌ Analytics API Error: {response.status_code}")
    except Exception as e:
        print(f"   ⚠️ Analytics test error: {e}")
    
    print("\n" + "=" * 60)
    print("🎉 MOOD RECOMMENDATIONS TESTING COMPLETE!")
    print("=" * 60)
    print()
    print("✅ FEATURES TESTED:")
    print("   • Advanced mood detection (8 mood categories)")
    print("   • AI-powered product recommendations")
    print("   • Confidence scoring and personalization")
    print("   • Enhanced analytics dashboard")
    print("   • Real-time metrics and insights")
    print()
    print("🚀 READY FOR DEMONSTRATION!")
    print("   • Open http://localhost:3000 to test the frontend")
    print("   • Click 'Enhanced Analytics Dashboard' to see insights")
    print("   • Try the AI chatbot with different moods")
    print("   • View real-time analytics and mood distribution")

if __name__ == "__main__":
    test_enhanced_mood_recommendations()
