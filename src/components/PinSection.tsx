import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PinSectionProps {
  title: string;
  items: string[];
}

const PinSection = ({ title, items }: PinSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !itemsRef.current) return;

    const itemElements = itemsRef.current.querySelectorAll('.pin-item');

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        start: "top top",
        end: "+=3000",
        scrub: 1
      }
    });
    
    scrollTriggerRef.current = timeline.scrollTrigger || null;
    
    timeline.from(itemElements, {
      y: 100,
      opacity: 0,
      stagger: 0.5,
      ease: "power2.out"
    });

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [items]);

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-16 text-center">{title}</h2>
        <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="pin-item p-8 border border-border rounded-lg"
            >
              <h3 className="text-3xl font-bold mb-4">0{index + 1}</h3>
              <p className="text-xl text-muted-foreground">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PinSection;
