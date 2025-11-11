import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface UseScrollAnimationProps {
  animationType?: 'stagger' | 'fade' | 'slide' | 'scale';
  triggerOnce?: boolean;
  threshold?: number;
}

const useScrollAnimation = ({
  animationType = 'fade',
  triggerOnce = true,
  threshold = 0.1
}: UseScrollAnimationProps = {}) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    // Set initial state based on animation type
    switch (animationType) {
      case 'fade':
        gsap.set(element, { opacity: 0, y: 30 });
        break;
      case 'slide':
        gsap.set(element, { x: -50, opacity: 0 });
        break;
      case 'scale':
        gsap.set(element, { scale: 0.8, opacity: 0 });
        break;
      case 'stagger':
        // For stagger, we would need to handle child elements
        gsap.set(element, { opacity: 0, y: 20 });
        break;
    }

    // Create observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate based on type
            switch (animationType) {
              case 'fade':
                gsap.to(element, {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power4.out"
                });
                break;
              case 'slide':
                gsap.to(element, {
                  x: 0,
                  opacity: 1,
                  duration: 0.6,
                  ease: "power4.out"
                });
                break;
              case 'scale':
                gsap.to(element, {
                  scale: 1,
                  opacity: 1,
                  duration: 0.6,
                  ease: "power4.out"
                });
                break;
              case 'stagger':
                gsap.to(element, {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power4.out"
                });
                break;
            }

            // Stop observing if triggerOnce is true
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [animationType, triggerOnce, threshold]);

  return elementRef;
};

export default useScrollAnimation;