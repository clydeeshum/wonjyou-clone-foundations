import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import ParticleOverlay from "@/components/ParticleOverlay";
import ProgressBar from "@/components/ProgressBar";

gsap.registerPlugin(ScrollTrigger);

const MasonryGrid = ({ title, description, images }: { title: string; description: string; images: string[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !images || images.length === 0) return;

    let ctx: gsap.Context;

    const animateItems = () => {
      // Clear previous animations
      ctx = gsap.context(() => {
        const items = containerRef.current!.querySelectorAll(".masonry-item");

        items.forEach((item, i) => {
          gsap.fromTo(
            item,
            { 
              y: 100,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "top 50%",
                scrub: 1,
              }
            }
          );
        });
      }, containerRef.current);

      return () => {
        ctx.revert(); // Revert GSAP animations
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    };

    const cleanup = animateItems(); // Initial animation setup

    // Re-initialize animations on window resize
    const handleResize = () => {
      cleanup?.(); // Cleanup previous animations
      animateItems(); // Re-initialize
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cleanup?.();
    };
  }, [images]);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ProgressBar />
      <ParticleOverlay />
      <Navigation />
      
      <section className="min-h-screen flex flex-col items-center justify-center pt-20 pb-16">
        <div className="container mx-auto px-6 text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            {title} <span className="text-primary">Gallery</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        
        <div 
          ref={containerRef}
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 px-6 max-w-7xl mx-auto"
        >
          {images?.map((img: string, i: number) => (
            <div 
              key={i}
              className="masonry-item break-inside-avoid rounded-xl overflow-hidden group"
            >
              <div className="relative overflow-hidden rounded-xl">
                <img 
                  src={`${img}?w=600&h=800&fit=crop`} 
                  alt={`${title} #${i + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <h3 className="text-white text-xl font-bold">{title} #{i + 1}</h3>
                  </div>
                </div>
                <div className="absolute top-4 right-4 text-white font-bold bg-black/50 px-2 py-1 rounded text-sm">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
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

export default MasonryGrid;