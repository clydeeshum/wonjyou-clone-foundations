import { gsap } from 'gsap';

// Utility function to apply animations to elements
export const applyAnimation = (
  element: HTMLElement | null,
  animationType: 'stagger' | 'fade' | 'slide' | 'scale' | 'custom' = 'fade',
  options: {
    delay?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
  } = {}
) => {
  if (!element) return;

  const {
    delay = 0,
    duration = 0.8,
    stagger = 0.1,
    ease = "power4.out"
  } = options;

  switch (animationType) {
    case 'fade':
      gsap.fromTo(
        element,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration, delay, ease }
      );
      break;

    case 'slide':
      gsap.fromTo(
        element,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration, delay, ease }
      );
      break;

    case 'scale':
      gsap.fromTo(
        element,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration, delay, ease }
      );
      break;

    case 'stagger':
      // For text elements, split into characters
      const text = element.textContent || '';
      element.innerHTML = '';
      
      // Create span for each character
      text.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        element.appendChild(span);
      });
      
      const chars = Array.from(element.children) as HTMLElement[];
      
      // Animate each character with stagger
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: (Math.random() - 0.5) * 100,
          x: (Math.random() - 0.5) * 100,
          scale: 0,
          rotation: (Math.random() - 0.5) * 180
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotation: 0,
          duration: duration * 0.8,
          delay,
          ease,
          stagger
        }
      );
      break;

    case 'custom':
      // Do nothing, let the caller handle custom animations
      break;
  }

  // Add hover effect
  const handleMouseEnter = () => {
    gsap.to(element, {
      scale: 1.05,
      duration: 0.3,
      ease: "power4.out"
    });
  };
  
  const handleMouseLeave = () => {
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: "power4.out"
    });
  };
  
  element.addEventListener('mouseenter', handleMouseEnter);
  element.addEventListener('mouseleave', handleMouseLeave);
  
  // Return cleanup function
  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Auto-apply animations to all headers on page load
export const autoApplyHeaderAnimations = () => {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAnimations);
  } else {
    applyAnimations();
  }
  
  function applyAnimations() {
    const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    headers.forEach((header, index) => {
      applyAnimation(header as HTMLElement, 'fade', {
        delay: index * 0.1
      });
    });
  }
};

// Export GSAP for use in other components
export { gsap };