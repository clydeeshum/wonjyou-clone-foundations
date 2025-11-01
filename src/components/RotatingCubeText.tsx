import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RotatingCubeText = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trayRef.current) return;

    const n = 15;
    const rots = [
      { ry: 270, a: 0.5 },
      { ry: 0, a: 0.85 },
      { ry: 90, a: 0.4 },
      { ry: 180, a: 0.0 }
    ];

    gsap.set(".cube-face", {
      z: 150,
      rotateY: (i) => rots[i].ry,
      transformOrigin: "50% 50% -151px"
    });

    const dies = trayRef.current.querySelectorAll(".cube-die");
    
    dies.forEach((die, i) => {
      const cube = die.querySelector(".cube-inner");
      
      gsap.timeline({ 
        repeat: -1, 
        yoyo: true, 
        defaults: { ease: "power3.inOut", duration: 1 } 
      })
      .fromTo(cube, {
        rotateY: -90
      }, {
        rotateY: 90,
        ease: "power1.inOut",
        duration: 2
      })
      .fromTo(cube?.querySelectorAll(".cube-face"), {
        color: (j) => `hsl(${i / n * 75 + 180}, 67%, ${100 * [rots[3].a, rots[0].a, rots[1].a][j]}%)`
      }, {
        color: (j) => `hsl(${i / n * 75 + 180}, 67%, ${100 * [rots[0].a, rots[1].a, rots[2].a][j]}%)`
      }, 0)
      .to(cube?.querySelectorAll(".cube-face"), {
        color: (j) => `hsl(${i / n * 75 + 180}, 67%, ${100 * [rots[1].a, rots[2].a, rots[3].a][j]}%)`
      }, 1)
      .progress(i / n);
    });

    gsap.timeline()
      .from(trayRef.current, { yPercent: -3, duration: 2, ease: "power1.inOut", yoyo: true, repeat: -1 }, 0)
      .fromTo(trayRef.current, { rotate: -10 }, { rotate: 10, duration: 4, ease: "power1.inOut", yoyo: true, repeat: -1 }, 0)
      .from(".cube-die", { duration: 0.01, opacity: 0, stagger: { each: -0.05, ease: "power1.in" } }, 0)
      .to(trayRef.current, { scale: 1.15, duration: 2, ease: "power3.inOut", yoyo: true, repeat: -1 }, 0);

    const h = n * 56;
    gsap.set(trayRef.current, { height: h });
    gsap.set(containerRef.current, { scale: Math.min(window.innerHeight / h, 1) });

  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center overflow-hidden relative">
      <div ref={containerRef} className="flex items-center justify-center">
        <div ref={trayRef} className="relative">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="cube-die w-[300px] h-[55px] pb-2" style={{ perspective: "999px" }}>
              <div className="cube-inner absolute w-full h-full" style={{ transformStyle: "preserve-3d" }}>
                <div className="cube-face absolute w-full h-full flex items-center justify-center text-4xl font-black tracking-tight" style={{ backfaceVisibility: "hidden" }}>
                  THINK
                </div>
                <div className="cube-face absolute w-full h-full flex items-center justify-center text-[37px] font-black tracking-tight" style={{ backfaceVisibility: "hidden" }}>
                  DEEPLY
                </div>
                <div className="cube-face absolute w-full h-full flex items-center justify-center text-[34px] font-black tracking-tight" style={{ backfaceVisibility: "hidden" }}>
                  CREATE
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RotatingCubeText;
