import Navigation from "@/components/Navigation";
import ParticleOverlay from "@/components/ParticleOverlay";
import ProgressBar from "@/components/ProgressBar";
import GalleryCarousel from "@/components/GalleryCarousel";

const Works = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <ProgressBar />
      <ParticleOverlay />
      <Navigation />
      
      <div className="relative z-10">
        {/* Hero Title */}
        <section className="min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-6 animate-fade-in">
              WORKS
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Explore the gallery of creative projects
            </p>
          </div>
        </section>

        {/* Gallery Carousel Section */}
        <GalleryCarousel />
      </div>
    </div>
  );
};

export default Works;
