import { useState } from "react";
import Navigation from "@/components/Navigation";
import LoadingScreen from "@/components/LoadingScreen";
import ParticleOverlay from "@/components/ParticleOverlay";
import ParallaxLettersSection from "@/components/ParallaxLettersSection";
import HeroSection from "@/components/HeroSection";
import FoldTextSection from "@/components/FoldTextSection";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import ParallaxSection from "@/components/ParallaxSection";
import ProgressBar from "@/components/ProgressBar";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <div className="min-h-screen bg-background text-foreground relative">
        <ProgressBar />
        <ParticleOverlay />
        <Navigation />
        <ParallaxLettersSection />
        <HeroSection />
        <FoldTextSection />
        <HorizontalScrollSection />
        <ParallaxSection />
      </div>
    </>
  );
};

export default Index;
