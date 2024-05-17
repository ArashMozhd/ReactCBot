import React, { useEffect, useRef } from 'react';
import '../styles/FireflyAnimation.css';

const FireflyAnimation = ({
    speedRange = [5, 10], // Default speed range is 5s to 10s
    intervalRange = [500, 1500] // Default interval range for creating new fireflies
}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        const createFirefly = () => {
            const firefly = document.createElement('div');
            firefly.classList.add('firefly');
            firefly.style.setProperty('--x', Math.random());
            firefly.style.setProperty('--y', Math.random());

            // Set a random starting position around the viewport
            const side = Math.floor(Math.random() * 4);
            if (side === 0) { // top
                firefly.style.left = `${Math.random() * 100}vw`;
                firefly.style.top = '-10px';
            } else if (side === 1) { // right
                firefly.style.left = '100vw';
                firefly.style.top = `${Math.random() * 100}vh`;
            } else if (side === 2) { // bottom
                firefly.style.left = `${Math.random() * 100}vw`;
                firefly.style.top = '100vh';
            } else { // left
                firefly.style.left = '-10px';
                firefly.style.top = `${Math.random() * 100}vh`;
            }

            // Set random movement direction
            const angle = Math.random() * 2 * Math.PI;
            const distance = 100 + Math.random() * 200; // Distance can be adjusted
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            firefly.style.setProperty('--dx', `${dx}px`);
            firefly.style.setProperty('--dy', `${dy}px`);

            // Set a random animation duration within the speed range
            const speed = Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0];
            firefly.style.animationDuration = `${speed}s`;

            container.appendChild(firefly);

            // Remove firefly when it goes out of view
            firefly.addEventListener('animationend', () => {
                container.removeChild(firefly);
            });
        };

        // Continuously create new fireflies at random intervals
        const interval = setInterval(() => {
            createFirefly();
        }, Math.random() * (intervalRange[1] - intervalRange[0]) + intervalRange[0]);

        return () => {
            clearInterval(interval);
        };
    }, [speedRange, intervalRange]);

    return <div className="firefly-container" ref={containerRef}></div>;
};

export default FireflyAnimation;
