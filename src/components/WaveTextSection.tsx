import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidText from "@/components/LiquidText";

gsap.registerPlugin(ScrollTrigger);

const WaveTextSection = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const timelinesRef = useRef<gsap.core.Timeline[]>([]);

  useEffect(() => {
    if (!stageRef.current || !wordRef.current) return;

    const word = wordRef.current;
    const text = "INNOVATION HAPPENS HERE";
    const chars = text.split("");
    
    word.innerHTML = chars.map((char, i) => 
      `<div class="wave-char liquid-char" style="display:inline-block">${char === " " ? "&nbsp;" : char}</div>`
    ).join("");

    let currentX = 0;
    const boxes: any[] = [];
    const charElements = word.querySelectorAll(".wave-char");

    charElements.forEach((char: any) => {
      const bb = char.getBoundingClientRect();
      boxes.push({
        x: currentX,
        y: 0,
        width: bb.width,
        height: bb.height
      });
      currentX += bb.width;
    });

    // Add liquid hover effects to characters
    charElements.forEach((char) => {
      char.addEventListener("mouseenter", () => {
        gsap.to(char, {
          duration: 0.3,
          scale: 1.8,
          y: -20,
          rotation: gsap.utils.random(-15, 15),
          ease: "elastic.out(1, 0.5)"
        });
      });

      char.addEventListener("mouseleave", () => {
        gsap.to(char, {
          duration: 0.5,
          scale: 1,
          y: 0,
          rotation: 0,
          ease: "elastic.out(1, 0.3)"
        });
      });
    });

    const nClones = 5;
    for (let i = 0; i < nClones; i++) {
      const clone = word.cloneNode(true) as HTMLElement;
      wordRef.current?.prepend(clone);
      
      const tl = gsap.timeline({
        repeat: -1,
        onRepeat: () => {
          wordRef.current?.append(clone);
        }
      })
      .fromTo(clone, {
        position: "absolute",
        y: (j: number) => (j % 2) ? 300 : 0,
        color: "hsl(0, 0%, 100%)"
      }, {
        duration: 1,
        y: (j: number) => (j % 2) ? 0 : 300,
        ease: "sine.inOut",
        color: "hsl(0, 0%, 60%)"
      })
      .play(i / nClones)
      .timeScale(0.15);
      
      timelinesRef.current.push(tl);
    }

    const tl = gsap.timeline();
    
    charElements.forEach((char, i) => {
      tl.add(
        gsap.to(char, {
          y: 300,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          duration: 2.4,
          delay: i * 0.1
        }),
        0
      );
    });

    boxes.forEach((b, i) => {
      tl.add(
        gsap.to(b, {
          duration: 2.4,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 0.1,
          height: 300
        }),
        0
      );
    });

    tl.play(99);
    timelinesRef.current.push(tl);

    gsap.set(stageRef.current, {
      position: "absolute",
      left: "50%",
      top: "50%",
      xPercent: -50,
      yPercent: -50,
      width: currentX,
      height: 300,
      scale: gsap.utils.clamp(0, 1.2, window.innerWidth / currentX)
    });

    const handleResize = () => {
      gsap.set(stageRef.current, {
        scale: gsap.utils.clamp(0, 1.2, window.innerWidth / currentX)
      });
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      timelinesRef.current.forEach(tl => tl.kill());
      charElements.forEach((char) => {
        char.removeEventListener("mouseenter", () => {});
        char.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative">
      <div 
        ref={stageRef}
        className="relative"
        style={{
          width: 'fit-content',
          height: '300px',
          color: 'hsl(0, 0%, 100%)'
        }}
      >
        <div
          ref={wordRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            whiteSpace: 'nowrap'
          }}
        ></div>
      </div>
    </div>
  );
};

export default WaveTextSection;