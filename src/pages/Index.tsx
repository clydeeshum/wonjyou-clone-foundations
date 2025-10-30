import { useState } from "react";
import Navigation from "@/components/Navigation";
import LoadingScreen from "@/components/LoadingScreen";
import ParticleOverlay from "@/components/ParticleOverlay";
import HeroSection from "@/components/HeroSection";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <div className="min-h-screen bg-background text-foreground relative">
        <ParticleOverlay />
        <Navigation />
        <HeroSection />
      </div>
    </>
  );
};

export default Index;
