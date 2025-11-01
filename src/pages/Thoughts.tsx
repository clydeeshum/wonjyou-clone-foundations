import Navigation from "@/components/Navigation";
import ParticleOverlay from "@/components/ParticleOverlay";
import ProgressBar from "@/components/ProgressBar";
import RevealTextSection from "@/components/RevealTextSection";
import RotateSection from "@/components/RotateSection";
import ParallaxSection from "@/components/ParallaxSection";
import ScaleSection from "@/components/ScaleSection";
import RotatingCubeText from "@/components/RotatingCubeText";
import WaveTextSection from "@/components/WaveTextSection";

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

      <RotatingCubeText />

      <RevealTextSection text="Innovation happens at the intersection of curiosity and courage" />

      <WaveTextSection />

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
    </div>
  );
};

export default Thoughts;
