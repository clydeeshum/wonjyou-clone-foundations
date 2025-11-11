import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScaleSectionProps {
  title: string;
  description: string;
  bgColor?: string;
}

const ScaleSection = ({ title, description, bgColor = "bg-muted/5" }: ScaleSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const animation = gsap.fromTo(contentRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "center center",
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
  }, []);

  return (
    <section ref={sectionRef} className={`min-h-screen flex items-center justify-center ${bgColor}`}>
      <div ref={contentRef} className="container mx-auto px-6 text-center">
        <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-8">{title}</h2>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">{description}</p>
      </div>
    </section>
  );
};

export default ScaleSection;
