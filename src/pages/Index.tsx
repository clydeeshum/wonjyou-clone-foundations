import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import ProgressBar from "@/components/ProgressBar";
import LoadingScreen from "@/components/LoadingScreen";
import ParticleOverlay from "@/components/ParticleOverlay";
import ParallaxLettersSection from "@/components/ParallaxLettersSection";
import HeroSection from "@/components/HeroSection";
import FoldTextSection from "@/components/FoldTextSection";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import ParallaxSection from "@/components/ParallaxSection";
import TextAnimationWrapper from "@/components/TextAnimationWrapper";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically import the LiquidBackground module for global background
    const initGlobalLiquidBackground = async () => {
      try {
        // @ts-ignore
        const { default: LiquidBackground } = await import('threejs-components/build/backgrounds/liquid1.min.js');
        
        if (canvasRef.current) {
          // Initialize the liquid background
          appRef.current = LiquidBackground(canvasRef.current);
          
          // Load the image and configure settings for black liquid effect
          appRef.current.loadImage('https://assets.codepen.io/33787/liquid.webp');
          appRef.current.liquidPlane.material.metalness = 0.9;
          appRef.current.liquidPlane.material.roughness = 0.1;
          appRef.current.liquidPlane.material.color.set(0x000000); // Set to black
          appRef.current.liquidPlane.uniforms.displacementScale.value = 3;
          appRef.current.setRain(false);
        }
      } catch (error) {
        console.error('Error loading global LiquidBackground:', error);
      }
    };

    if (!isLoading) {
      initGlobalLiquidBackground();
    }

    // Cleanup function
    return () => {
      if (appRef.current) {
        // Dispose of the liquid background if needed
        appRef.current = null;
      }
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <div className="fixed inset-0 -z-10">
          <canvas 
            ref={canvasRef}
            className="absolute top-0 right-0 bottom-0 left-0 overflow-hidden"
            style={{ touchAction: 'none' }}
          />
        </div>
      )}
      
      <div className="min-h-screen bg-black/90 text-foreground relative">
        <ProgressBar />
        <Navigation />
        {/* <ParticleOverlay /> */}
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