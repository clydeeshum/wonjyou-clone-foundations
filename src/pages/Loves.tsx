import Navigation from "@/components/Navigation";
import ParticleOverlay from "@/components/ParticleOverlay";
import ProgressBar from "@/components/ProgressBar";
import FadeCascadeSection from "@/components/FadeCascadeSection";
import RotateSection from "@/components/RotateSection";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import ScaleSection from "@/components/ScaleSection";

const Loves = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ProgressBar />
      <ParticleOverlay />
      <Navigation />
      
      <section className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-[15vw] font-black tracking-tighter leading-none animate-fade-in">
            LOVES
          </h1>
          <p className="text-2xl text-muted-foreground mt-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Passions that drive creativity
          </p>
        </div>
      </section>

      <FadeCascadeSection
        title="PASSIONS"
        items={[
          { label: "DESIGN", value: "Creating beautiful experiences" },
          { label: "TECHNOLOGY", value: "Building the future" },
          { label: "ART", value: "Expressing creativity" },
          { label: "MUSIC", value: "Finding rhythm in chaos" },
          { label: "NATURE", value: "Connecting with the world" }
        ]}
      />

      <RotateSection
        title="CREATIVITY"
        subtitle="The intersection of imagination and execution"
      />

      <HorizontalScrollSection />

      <ScaleSection
        title="INSPIRED"
        description="By the endless possibilities of human potential"
        bgColor="bg-accent/5"
      />

      <section className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-6xl font-bold mb-8">FOLLOW YOUR PASSION</h2>
          <p className="text-xl text-muted-foreground">It leads to extraordinary places</p>
        </div>
      </section>
    </div>
  );
};

export default Loves;
