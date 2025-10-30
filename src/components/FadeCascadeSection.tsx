import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeCascadeSectionProps {
  title: string;
  items: { label: string; value: string }[];
}

const FadeCascadeSection = ({ title, items }: FadeCascadeSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemsRef.current) return;

    const elements = itemsRef.current.querySelectorAll('.cascade-item');

    gsap.fromTo(elements,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6">
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-16">{title}</h2>
        <div ref={itemsRef} className="space-y-8">
          {items.map((item, index) => (
            <div key={index} className="cascade-item flex items-baseline gap-4 border-b border-border pb-4">
              <span className="text-4xl font-bold text-primary">{item.label}</span>
              <span className="text-2xl text-muted-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FadeCascadeSection;
