import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ParallaxSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = gsap.utils.toArray('.parallax-item');
    
    elements.forEach((element: any) => {
      const speed = element.dataset.speed || 1;
      
      gsap.to(element, {
        y: () => (1 - speed) * ScrollTrigger.maxScroll(window),
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: "max",
          invalidateOnRefresh: true,
          scrub: 0.5
        }
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[200vh] flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-3 gap-8 relative">
          <div className="parallax-item flex flex-col gap-4" data-speed="0.8">
            <div className="w-full h-64 bg-primary/20 rounded-lg" />
            <h3 className="text-2xl font-bold">FAST</h3>
            <p className="text-muted-foreground">Moving quickly through space</p>
          </div>
          
          <div className="parallax-item flex flex-col gap-4" data-speed="1.2">
            <div className="w-full h-64 bg-accent/20 rounded-lg" />
            <h3 className="text-2xl font-bold">SLOW</h3>
            <p className="text-muted-foreground">Taking time to observe</p>
          </div>
          
          <div className="parallax-item flex flex-col gap-4" data-speed="0.9">
            <div className="w-full h-64 bg-secondary/20 rounded-lg" />
            <h3 className="text-2xl font-bold">SMOOTH</h3>
            <p className="text-muted-foreground">Flowing with the rhythm</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
