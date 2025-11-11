import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'stagger' | 'fade' | 'slide' | 'scale';
  delay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  children, 
  className = '',
  animationType = 'fade',
  delay = 0
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    // Set initial state based on animation type
    switch (animationType) {
      case 'fade':
        gsap.set(element, { opacity: 0, y: 30 });
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power4.out"
        });
        break;
      case 'slide':
        gsap.set(element, { x: -50, opacity: 0 });
        gsap.to(element, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay,
          ease: "power4.out"
        });
        break;
      case 'scale':
        gsap.set(element, { scale: 0.8, opacity: 0 });
        gsap.to(element, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          delay,
          ease: "power4.out"
        });
        break;
      case 'stagger':
        // For text elements, we can split into characters
        const text = element.innerText;
        element.innerHTML = '';
        
        // Create span for each character
        text.split('').forEach(char => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.display = 'inline-block';
          element.appendChild(span);
        });
        
        const chars = Array.from(element.children) as HTMLElement[];
        
        // Set initial state for each character
        chars.forEach(char => {
          gsap.set(char, {
            opacity: 0,
            y: (Math.random() - 0.5) * 100,
            x: (Math.random() - 0.5) * 100,
            scale: 0,
            rotation: (Math.random() - 0.5) * 180
          });
        });
        
        // Animate each character with stagger
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotation: 0,
          duration: 0.5,
          delay,
          ease: "power4.out",
          stagger: 0.02
        });
        break;
    }
  }, [animationType, delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default AnimatedText;