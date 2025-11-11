import { useEffect, useRef } from 'react';

const LiquidBackgroundSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically import the LiquidBackground module
    const initLiquidBackground = async () => {
      try {
        // @ts-ignore
        const { default: LiquidBackground } = await import('threejs-components/build/backgrounds/liquid1.min.js');
        
        if (canvasRef.current) {
          // Initialize the liquid background
          appRef.current = LiquidBackground(canvasRef.current);
          
          // Load the image and configure settings
          appRef.current.loadImage('https://assets.codepen.io/33787/liquid.webp');
          appRef.current.liquidPlane.material.metalness = 0.9;
          appRef.current.liquidPlane.material.roughness = 0.1;
          appRef.current.liquidPlane.material.color.set(0x000000); // Set to black
          appRef.current.liquidPlane.uniforms.displacementScale.value = 3;
          appRef.current.setRain(false);
        }
      } catch (error) {
        console.error('Error loading LiquidBackground:', error);
      }
    };

    initLiquidBackground();

    // Cleanup function
    return () => {
      if (appRef.current) {
        // Dispose of the liquid background if needed
        appRef.current = null;
      }
    };
  }, []);

  return (
    <section className="relative w-full h-64 md:h-80 overflow-hidden">
      <div 
        id="app"
        className="absolute inset-0"
        style={{ 
          height: '100%',
          fontFamily: '"Montserrat", serif'
        }}
      >
        <canvas 
          ref={canvasRef}
          id="canvas"
          className="absolute top-0 right-0 bottom-0 left-0 overflow-hidden"
          style={{ touchAction: 'none' }}
        />
      </div>
      
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-4">
        </div>
      </div>
    </section>
  );
};

export default LiquidBackgroundSection;