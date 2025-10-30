import Navigation from "@/components/Navigation";
import ParticleOverlay from "@/components/ParticleOverlay";
import ProgressBar from "@/components/ProgressBar";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import PinSection from "@/components/PinSection";
import FoldTextSection from "@/components/FoldTextSection";
import ScaleSection from "@/components/ScaleSection";

const Works = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ProgressBar />
      <ParticleOverlay />
      <Navigation />
      
      <section className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-[15vw] font-black tracking-tighter leading-none animate-fade-in">
            WORKS
          </h1>
          <p className="text-2xl text-muted-foreground mt-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Projects that push boundaries
          </p>
        </div>
      </section>

      <HorizontalScrollSection />

      <PinSection
        title="FEATURED"
        items={[
          "Digital products that delight users and solve real problems",
          "Innovative solutions that challenge the status quo",
          "Design systems that scale across platforms",
          "Experiences that users remember and love"
        ]}
      />

      <FoldTextSection />

      <ScaleSection
        title="IMPACT"
        description="Creating products that matter and make a difference"
        bgColor="bg-secondary/5"
      />

      <section className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-6xl font-bold mb-8">BUILD WHAT MATTERS</h2>
          <p className="text-xl text-muted-foreground">Every project is an opportunity to create value</p>
        </div>
      </section>
    </div>
  );
};

export default Works;
