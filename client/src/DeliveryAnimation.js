import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';

const DeliveryAnimation = ({ style = {} }) => {
  const [animationData, setAnimationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        // Try multiple sources for delivery animations
        const sources = [
          'https://assets5.lottiefiles.com/packages/lf20_jcikwtux.json', // Delivery truck
          'https://assets2.lottiefiles.com/packages/lf20_DMgKk1.json',   // Delivery boy
          'https://assets4.lottiefiles.com/packages/lf20_u4yrau.json',   // Package delivery
        ];

        for (const source of sources) {
          try {
            const response = await fetch(source);
            if (response.ok) {
              const data = await response.json();
              setAnimationData(data);
              setLoading(false);
              return;
            }
          } catch (err) {
            console.log(`Failed to load from ${source}`);
          }
        }

        // If all fail, create a simple CSS animation
        setLoading(false);
      } catch (error) {
        console.error('Error loading animation:', error);
        setLoading(false);
      }
    };

    loadAnimation();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        ...style, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{
          fontSize: '30px',
          animation: 'pulse 1.5s ease-in-out infinite'
        }}>
          🚚
        </div>
      </div>
    );
  }

  if (!animationData) {
    return (
      <div style={{ 
        ...style, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{
          fontSize: '30px',
          animation: 'float 3s ease-in-out infinite'
        }}>
          🚚
        </div>
      </div>
    );
  }

  return (
    <div style={style}>
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default DeliveryAnimation;
