import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";

const RotatingCubeText = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trayRef = useRef<HTMLDivElement>(null);
  
  // Configuration constants
  const config = useMemo(() => ({
    cubeCount: 15,
    faceDepth: 150,
    rotations: [
      { ry: 270, brightness: 0.5 },
      { ry: 0, brightness: 0.85 },
      { ry: 90, brightness: 0.4 },
      { ry: 180, brightness: 0.0 }
    ],
    words: ["THINK", "DEEPLY", "CREATE"],
    fontSizes: ["text-4xl", "text-[37px]", "text-[34px]"],
    hueStart: 180,
    hueRange: 75,
    saturation: 67
  }), []);

  useEffect(() => {
    if (!containerRef.current || !trayRef.current) return;

    const ctx = gsap.context(() => {
      const { cubeCount, faceDepth, rotations, hueStart, hueRange, saturation } = config;

      // Setup cube faces with optimized transforms
      gsap.set(".cube-face", {
        z: faceDepth,
        rotateY: (i) => rotations[i % rotations.length].ry,
        transformOrigin: `50% 50% -${faceDepth + 1}px`,
        willChange: "transform"
      });

      const dies = trayRef.current!.querySelectorAll(".cube-die");
      
      // Animate each cube with staggered timing
      dies.forEach((die, i) => {
        const cube = die.querySelector(".cube-inner");
        const faces = cube?.querySelectorAll(".cube-face");
        
        if (!cube || !faces) return;

        const progress = i / cubeCount;
        const hue = progress * hueRange + hueStart;

        // Create rotation timeline
        gsap.timeline({ 
          repeat: -1, 
          yoyo: true, 
          defaults: { ease: "power3.inOut" } 
        })
        .fromTo(cube, {
          rotateY: -90
        }, {
          rotateY: 90,
          ease: "power1.inOut",
          duration: 2
        })
        .set(faces, {
          color: (j) => `hsl(${hue}, ${saturation}%, ${100 * rotations[(3 + j) % 4].brightness}%)`
        }, 0)
        .to(faces, {
          color: (j) => `hsl(${hue}, ${saturation}%, ${100 * rotations[j % 4].brightness}%)`
        }, 0)
        .to(faces, {
          color: (j) => `hsl(${hue}, ${saturation}%, ${100 * rotations[(j + 1) % 4].brightness}%)`
        }, 1)
        .progress(progress);
      });

      // Container animations with smooth easing
      const tray = trayRef.current!;
      gsap.timeline()
        .from(tray, { 
          yPercent: -3, 
          duration: 2, 
          ease: "power1.inOut", 
          yoyo: true, 
          repeat: -1 
        }, 0)
        .fromTo(tray, 
          { rotate: -10 }, 
          { 
            rotate: 10, 
            duration: 4, 
            ease: "power1.inOut", 
            yoyo: true, 
            repeat: -1 
          }, 0)
        .from(".cube-die", { 
          duration: 0.01, 
          opacity: 0, 
          stagger: { 
            each: -0.05, 
            ease: "power1.in" 
          } 
        }, 0)
        .to(tray, { 
          scale: 1.15, 
          duration: 2, 
          ease: "power3.inOut", 
          yoyo: true, 
          repeat: -1 
        }, 0);

      // Responsive sizing
      const trayHeight = cubeCount * 56;
      gsap.set(tray, { height: trayHeight });
      
      const handleResize = () => {
        const scale = Math.min(window.innerHeight / trayHeight * 0.9, 1);
        gsap.set(containerRef.current, { scale });
      };
      
      handleResize();
      window.addEventListener("resize", handleResize);
      
      return () => window.removeEventListener("resize", handleResize);
    }, containerRef);

    return () => ctx.revert();
  }, [config]);

  return (
    <section className="min-h-screen flex items-center justify-center overflow-hidden relative bg-background">
      <div 
        ref={containerRef} 
        className="flex items-center justify-center"
        style={{ willChange: "transform" }}
      >
        <div 
          ref={trayRef} 
          className="relative"
          style={{ willChange: "transform" }}
        >
          {Array.from({ length: config.cubeCount }).map((_, i) => (
            <div 
              key={i} 
              className="cube-die w-[300px] h-[55px] pb-2" 
              style={{ perspective: "999px" }}
            >
              <div 
                className="cube-inner absolute w-full h-full" 
                style={{ 
                  transformStyle: "preserve-3d",
                  willChange: "transform"
                }}
              >
                {config.words.map((word, j) => (
                  <div 
                    key={j}
                    className={`cube-face absolute w-full h-full flex items-center justify-center ${config.fontSizes[j]} font-black tracking-tight`}
                    style={{ 
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      willChange: "color, transform"
                    }}
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RotatingCubeText;
