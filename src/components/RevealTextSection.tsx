import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealTextSectionProps {
  text: string;
}

const RevealTextSection = ({ text }: RevealTextSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = textRef.current.querySelectorAll('.char');

    const animation = gsap.fromTo(chars,
      { opacity: 0.2, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1
        }
      }
    );
    
    scrollTriggerRef.current = animation.scrollTrigger || null;

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [text]);

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center">
      <div ref={textRef} className="container mx-auto px-6">
        <h2 className="text-5xl md:text-7xl font-bold leading-tight">
          {text.split('').map((char, index) => (
            <span key={index} className="char inline-block">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
};

export default RevealTextSection;
