import React, { useEffect, useRef } from 'react';
import '../styles/BubbleAnimation.css';

const BubbleAnimation = () => {
    const containerRef = useRef(null);
  
    useEffect(() => {
      const bubbles = containerRef.current.querySelectorAll('.bubble');
  
      bubbles.forEach((bubble) => {
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        const size = Math.random() * 100 + 30;
  
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
  
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animationDelay = `${delay}s`;
      });
  
    }, []);
  
    return (
      <div className="bubble-container" ref={containerRef}>
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
      </div>
    );
  };
  
  export default BubbleAnimation;
