import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scroll = scrollRef.current;
    
    if (!section || !scroll) return;

    const cards = gsap.utils.toArray('.scroll-card');
    
    const scrollTween = gsap.to(cards, {
      xPercent: -100 * (cards.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        snap: 1 / (cards.length - 1),
        end: () => "+=" + scroll.offsetWidth
      }
    });

    return () => {
      scrollTween.kill();
    };
  }, []);

  const items = [
    { title: "WORKS", color: "bg-primary" },
    { title: "PROJECTS", color: "bg-accent" },
    { title: "DESIGN", color: "bg-secondary" },
    { title: "CODE", color: "bg-muted" },
    { title: "CREATE", color: "bg-primary" }
  ];

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <div ref={scrollRef} className="flex h-full">
        {items.map((item, index) => (
          <div
            key={index}
            className="scroll-card min-w-full h-full flex items-center justify-center relative"
          >
            <div className={`absolute inset-0 ${item.color} opacity-10`} />
            <h2 className="text-[20vw] font-black tracking-tighter relative z-10">
              {item.title}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
