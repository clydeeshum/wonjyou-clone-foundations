import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import ParticleOverlay from "@/components/ParticleOverlay";
import ProgressBar from "@/components/ProgressBar";

gsap.registerPlugin(ScrollTrigger);

const StackedCards = ({ title, description, images }: { title: string; description: string; images: string[] }) => {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current || !images || images.length === 0) return;

    const cards = gsap.utils.toArray(".card", cardsRef.current);
    const stackHeight = window.innerHeight * 0.25;

    cards.forEach((card: any, i) => {
      const img = card.querySelector("img");
      
      if (img) {
        gsap.fromTo(
          img,
          {
            scale: 1,
            transformOrigin: "center top",
            filter: "blur(0px)",
          },
          {
            y: gsap.utils.mapRange(1, cards.length, -20, -stackHeight + 20, cards.length - i),
            scale: gsap.utils.mapRange(1, cards.length, 0.4, 0.9, i),
            filter: "blur(" + gsap.utils.mapRange(1, cards.length, 4, 25, cards.length - i) + "px)",
            scrollTrigger: {
              trigger: card,
              scrub: true,
              start: "top " + stackHeight,
              end: "+=" + window.innerHeight * 2,
              invalidateOnRefresh: true,
            }
          }
        );

        // Pin separately because we want the pinning to last the whole length of the page, but the animation should only be part of it. 
        ScrollTrigger.create({
          trigger: card,
          pin: true,
          start: "top " + stackHeight,
          endTrigger: ".following-content",
          end: "top " + (stackHeight + 100),
          pinSpacing: false
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [images]);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ProgressBar />
      <ParticleOverlay />
      <Navigation />
      
      <div className="h-screen"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            {title} <span className="text-primary">Gallery</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        </div>
      </div>
      
      <div className="h-screen"></div>
      
      <div ref={cardsRef} className="cards">
        {images?.map((img: string, i: number) => (
          <div key={i} className="card w-full max-w-4xl mx-auto px-4">
            <div className="relative overflow-hidden rounded-xl aspect-[3/4]">
              <img 
                src={`${img}?w=800&h=1000&fit=crop`} 
                alt={`${title} #${i + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white font-bold bg-black/50 px-3 py-2 rounded-lg">
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="following-content min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">End of {title} Gallery</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Each image represents a unique perspective in {title.toLowerCase()} photography
          </p>
        </div>
      </div>
      
      <div className="h-screen bg-black"></div>
      <div className="h-screen bg-black"></div>
      <div className="h-screen bg-black"></div>
    </div>
  );
};

export default StackedCards;