import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TextAnimationWrapperProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'stagger' | 'fade' | 'slide';
}

const TextAnimationWrapper: React.FC<TextAnimationWrapperProps> = ({ 
  children, 
  className = '',
  animationType = 'stagger'
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    // Different animation types
    switch (animationType) {
      case 'stagger':
        // Split text into characters for staggered animation
        const textNodes = element.querySelectorAll('*');
        const allChildren = Array.from(textNodes);
        
        // Initialize with random positions
        allChildren.forEach((child, i) => {
          const randomX = (Math.random() - 0.5) * 200;
          const randomY = (Math.random() - 0.5) * 200;
          const randomRotation = (Math.random() - 0.5) * 180;
          
          gsap.set(child, {
            x: randomX,
            y: randomY,
            rotation: randomRotation,
            scale: 0,
            opacity: 0
          });
        });

        // Animate with stagger
        gsap.to(allChildren, {
          duration: 0.5,
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          ease: "power4.out",
          stagger: 0.05
        });
        break;

      case 'fade':
        gsap.set(element, { opacity: 0, y: 20 });
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power4.out"
        });
        break;

      case 'slide':
        gsap.set(element, { x: -50, opacity: 0 });
        gsap.to(element, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power4.out"
        });
        break;
    }

    // Set up hover effects
    const handleMouseEnter = () => {
      gsap.globalTimeline.timeScale(0.25);
    };

    const handleMouseLeave = () => {
      gsap.globalTimeline.timeScale(1);
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [animationType]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default TextAnimationWrapper;