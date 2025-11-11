import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import ParticleOverlay from "@/components/ParticleOverlay";
import ProgressBar from "@/components/ProgressBar";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollGallery = ({ title, description, images }: { title: string; description: string; images: string[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current || !images || images.length === 0) return;

    const track = trackRef.current;
    const cards = gsap.utils.toArray(".gallery-card", track);

    // Horizontal scroll animation
    gsap.to(cards, {
      xPercent: -100 * (cards.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 2,
        end: () => "+=" + (track.offsetWidth - document.documentElement.clientWidth)
      }
    });

    // Individual card animations
    cards.forEach((card: HTMLElement) => {
      const img = card.querySelector("img") as HTMLImageElement;
      
      if (img) {
        gsap.fromTo(
          img,
          { scale: 0.8 },
          {
            scale: 1,
            scrollTrigger: {
              trigger: card,
              start: "left center",
              end: "right center",
              scrub: 0.5
            }
          }
        );
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
      
      <section className="min-h-screen flex flex-col items-center justify-center py-20">
        <div className="container mx-auto px-6 text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            {title} <span className="text-primary">Gallery</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        </div>
      </section>
      
      <div 
        ref={containerRef}
        className="w-full h-screen overflow-hidden"
      >
        <div 
          ref={trackRef}
          className="flex h-full"
          style={{ width: `${images?.length * 50}%` }}
        >
          {images?.map((img: string, i: number) => (
            <div 
              key={i}
              className="gallery-card w-full h-full flex-shrink-0 flex items-center justify-center p-0"
            >
              <div className="relative w-full h-full max-w-6xl rounded-2xl overflow-hidden bg-white shadow-2xl">
                <img 
                  src={`${img}?w=1200&h=800&fit=crop`} 
                  alt={`${title} #${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                  <div>
                    <h3 className="text-white text-3xl font-bold">{title} #{i + 1}</h3>
                    <p className="text-white/80 text-lg mt-2">Horizontal Scroll Gallery</p>
                  </div>
                </div>
                <div className="absolute top-8 right-8 text-white font-bold bg-black/50 px-3 py-2 rounded-lg text-lg">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/10 to-muted/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">End of {title} Gallery</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Each image represents a unique perspective in {title.toLowerCase()} photography
          </p>
        </div>
      </section>
    </div>
  );
};

export default HorizontalScrollGallery;