import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ParallaxLettersSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const letters = gsap.utils.toArray('.parallax-letter');
    
    // Initial falling animation
    letters.forEach((letter: any, index: number) => {
      const randomX = gsap.utils.random(-200, 200);
      const randomRotation = gsap.utils.random(-45, 45);
      const randomDelay = gsap.utils.random(0, 0.8);
      
      gsap.fromTo(letter,
        {
          y: -1000,
          x: randomX,
          rotation: randomRotation,
          opacity: 0,
          scale: 0.5
        },
        {
          y: 0,
          x: 0,
          rotation: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          delay: randomDelay,
          ease: "bounce.out"
        }
      );
    });

    // Enhanced scroll parallax animation
    setTimeout(() => {
      letters.forEach((letter: any) => {
        const speed = parseFloat(letter.getAttribute('data-speed'));
        
        gsap.to(letter, {
          y: (i, target) => {
            // Increased multiplier from 0.3 to 0.8 for more visible movement
            const offset = ScrollTrigger.maxScroll(window) * (1 - speed) * 0.8;
            return offset;
          },
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: "max",
            scrub: 0.5,
            invalidateOnRefresh: true
          }
        });
      });
    }, 1500);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const text = "FLICKARTS STUDIOS";
  const letters = text.split('');
  
  // Assign varying speeds to create dynamic parallax
  const speeds = [1.25, 0.8, 1.1, 0.9, 1.2, 0.85, 1.15, 0.95, 1.05, 1, 1.3, 0.9, 1.1, 0.8, 1.2, 0.95, 1.15];

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="letter-group flex items-center justify-center flex-wrap gap-4 md:gap-8 w-full max-w-7xl px-6">
        {letters.map((letter, index) => (
          <div
            key={index}
            className="parallax-letter text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-foreground"
            data-speed={speeds[index % speeds.length]}
            style={{
              display: letter === ' ' ? 'block' : 'inline-block',
              width: letter === ' ' ? '100%' : 'auto',
              height: letter === ' ' ? '2rem' : 'auto'
            }}
          >
            {letter === ' ' ? '' : letter}
          </div>
        ))}
      </div>

      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj4KICA8ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj4KICAgIDxmZVR1cmJ1bGVuY2UgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIiB0eXBlPSJmcmFjdGFsTm9pc2UiLz4KICAgIDxmZUNvbG9yTWF0cml4IHR5cGU9InNhdHVyYXRlIiB2YWx1ZXM9IjAiLz4KICA8L2ZpbHRlcj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9Ii4wNSIvPgo8L3N2Zz4=')] animate-grain pointer-events-none" />
    </section>
  );
};

export default ParallaxLettersSection;
