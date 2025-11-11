import React, { createContext, useContext, useEffect } from 'react';
import { gsap } from 'gsap';

interface GlobalAnimationContextType {
  applyHeaderAnimation: (element: HTMLElement) => void;
}

const GlobalAnimationContext = createContext<GlobalAnimationContextType | null>(null);

export const useGlobalAnimation = () => {
  const context = useContext(GlobalAnimationContext);
  if (!context) {
    throw new Error('useGlobalAnimation must be used within a GlobalAnimationProvider');
  }
  return context;
};

interface GlobalAnimationProviderProps {
  children: React.ReactNode;
}

export const GlobalAnimationProvider: React.FC<GlobalAnimationProviderProps> = ({ children }) => {
  // Apply animations to all headers on the page
  useEffect(() => {
    // Find all headers
    const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    headers.forEach((header, index) => {
      // Set initial state
      gsap.set(header, {
        opacity: 0,
        y: 30,
      });
      
      // Animate in with stagger
      gsap.to(header, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power4.out"
      });
      
      // Add hover effect
      const handleMouseEnter = () => {
        gsap.to(header, {
          scale: 1.05,
          duration: 0.3,
          ease: "power4.out"
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(header, {
          scale: 1,
          duration: 0.3,
          ease: "power4.out"
        });
      };
      
      header.addEventListener('mouseenter', handleMouseEnter);
      header.addEventListener('mouseleave', handleMouseLeave);
      
      // Cleanup
      return () => {
        header.removeEventListener('mouseenter', handleMouseEnter);
        header.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);

  const applyHeaderAnimation = (element: HTMLElement) => {
    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: 30,
    });
    
    // Animate in
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power4.out"
    });
  };

  return (
    <GlobalAnimationContext.Provider value={{ applyHeaderAnimation }}>
      {children}
    </GlobalAnimationContext.Provider>
  );
};