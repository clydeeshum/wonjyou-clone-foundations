import { useEffect } from 'react';

/**
 * Hook to lock/unlock scroll
 * NOTE: This is now primarily managed by GSAP ScrollTrigger
 * Only use this for specific UI components that need independent scroll control
 */
export function useScrollLock(lock: boolean) {
  useEffect(() => {
    if (lock) {
      const scrollY = window.scrollY;
      const previousOverflow = document.body.style.overflow;
      const previousPosition = document.body.style.position;
      const previousTop = document.body.style.top;
      const previousWidth = document.body.style.width;

      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        document.body.style.overflow = previousOverflow;
        document.body.style.position = previousPosition;
        document.body.style.top = previousTop;
        document.body.style.width = previousWidth;
        window.scrollTo(0, scrollY);
      };
    }
  }, [lock]);
}