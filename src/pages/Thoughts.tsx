import Navigation from "@/components/Navigation";
import ParticleOverlay from "@/components/ParticleOverlay";
import ProgressBar from "@/components/ProgressBar";
import RevealTextSection from "@/components/RevealTextSection";
import RotateSection from "@/components/RotateSection";
import ParallaxSection from "@/components/ParallaxSection";
import ScaleSection from "@/components/ScaleSection";

const Thoughts = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ProgressBar />
      <ParticleOverlay />
      <Navigation />
      
      <section className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-[15vw] font-black tracking-tighter leading-none animate-fade-in">
            THOUGHTS
          </h1>
          <p className="text-2xl text-muted-foreground mt-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Ideas and perspectives
          </p>
        </div>
      </section>

      <RevealTextSection text="Innovation happens at the intersection of curiosity and courage" />

      <RotateSection
        title="MINDSET"
        subtitle="The way we think shapes the world we create"
      />

      <ParallaxSection />

      <ScaleSection
        title="VISION"
        description="Seeing possibilities where others see obstacles"
        bgColor="bg-muted/5"
      />

      <RevealTextSection text="Great ideas need time to grow and evolve" />

      <section className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-6xl font-bold mb-8">THINK DIFFERENTLY</h2>
          <p className="text-xl text-muted-foreground">Challenge assumptions and explore new perspectives</p>
        </div>
      </section>
    </div>
  );
};

export default Thoughts;
