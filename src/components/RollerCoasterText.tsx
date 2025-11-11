import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RollerCoasterText = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stageRef.current || !containerRef.current) return;

    // Clear previous content
    containerRef.current.innerHTML = '';
    
    // Create 6 lines
    const lines = [];
    for (let i = 0; i < 6; i++) {
      const line = document.createElement('div');
      line.textContent = "LIFE IS A ROLLER COASTER";
      line.className = "absolute whitespace-nowrap text-5xl md:text-6xl font-mono font-bold";
      line.style.top = `${i * 60}px`;
      line.style.left = "50%";
      line.style.transform = "translateX(-50%)";
      containerRef.current.appendChild(line);
      lines.push(line);
    }

    // Animate characters in each line
    lines.forEach((line, lineIndex) => {
      const chars = line.textContent?.split('') || [];
      line.innerHTML = '';
      
      chars.forEach((char, charIndex) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.className = 'inline-block';
        line.appendChild(span);
        
        // Animate each character with wave effect
        gsap.to(span, {
          y: 50,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          duration: 2,
          delay: charIndex * 0.05 + lineIndex * 0.2,
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: false
          }
        });
      });
    });

    // Add scroll trigger for overall animation
    ScrollTrigger.create({
      trigger: stageRef.current,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        // Animation starts when entering viewport
      }
    });

    const handleResize = () => {
      if (stageRef.current) {
        gsap.set(stageRef.current, {
          position: 'absolute',
          left: '50%',
          top: '50%',
          xPercent: -50,
          yPercent: -50,
          width: 800, // Fixed width for better control
          height: 300,
          scale: gsap.utils.clamp(0, 1.2, window.innerWidth / 800)
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="relative"
      style={{
        width: 'fit-content',
        height: '300px',
        color: 'hsl(0, 0%, 100%)'
      }}
    >
      <div
        ref={containerRef}
        className="relative"
        style={{
          height: '100%',
          textShadow: '0 0 9px rgba(0,0,0,0.5)'
        }}
      ></div>
    </div>
  );
};

export default RollerCoasterText;