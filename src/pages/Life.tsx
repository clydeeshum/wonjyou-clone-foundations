import Navigation from "@/components/Navigation";
import ParticleOverlay from "@/components/ParticleOverlay";
import ProgressBar from "@/components/ProgressBar";
import ScaleSection from "@/components/ScaleSection";
import PinSection from "@/components/PinSection";
import RevealTextSection from "@/components/RevealTextSection";
import ParallaxSection from "@/components/ParallaxSection";

const Life = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ProgressBar />
      <ParticleOverlay />
      <Navigation />
      
      <section className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-[15vw] font-black tracking-tighter leading-none animate-fade-in">
            LIFE
          </h1>
          <p className="text-2xl text-muted-foreground mt-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            The journey of experiences and growth
          </p>
        </div>
      </section>

      <ScaleSection
        title="MOMENTS"
        description="Every moment shapes who we are and who we become"
        bgColor="bg-primary/5"
      />

      <PinSection
        title="MILESTONES"
        items={[
          "Started my journey in design and technology",
          "Built products that impact millions",
          "Created meaningful connections worldwide",
          "Continuously learning and evolving"
        ]}
      />

      <RevealTextSection text="Life is about the stories we create and the impact we leave behind" />

      <ParallaxSection />

      <section className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-6xl font-bold mb-8">KEEP MOVING FORWARD</h2>
          <p className="text-xl text-muted-foreground">Every day is a new chapter</p>
        </div>
      </section>
    </div>
  );
};

export default Life;
