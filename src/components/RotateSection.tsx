import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RotateSectionProps {
  title: string;
  subtitle: string;
}

const RotateSection = ({ title, subtitle }: RotateSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const animation = gsap.fromTo(cardRef.current,
      { rotateY: -90, opacity: 0 },
      {
        rotateY: 0,
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
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center perspective-[1000px]">
      <div ref={cardRef} className="container mx-auto px-6 max-w-4xl">
        <div className="border border-border rounded-lg p-16 bg-card">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">{title}</h2>
          <p className="text-2xl text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default RotateSection;
