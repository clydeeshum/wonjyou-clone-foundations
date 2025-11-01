import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WaveTextSection = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const bg1Ref = useRef<HTMLDivElement>(null);
  const bg2Ref = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stageRef.current || !wordRef.current || !bg1Ref.current || !bg2Ref.current) return;

    const word = wordRef.current;
    const text = "*INNOVATION*HAPPENS*HERE*";
    const chars = text.split("");
    
    word.innerHTML = chars.map((char, i) => 
      `<div class="wave-char" style="display:inline-block">${char}</div>`
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
      if (char.innerHTML === "*") gsap.set(char, { opacity: 0 });
      currentX += bb.width;
    });

    const setPath = () => {
      let path = "";
      boxes.forEach((b) => {
        path += `M${b.x},${b.y} ${b.x + b.width},${b.y} ${b.x + b.width},${b.y + b.height} ${b.x},${b.y + b.height}z`;
      });
      gsap.set(bg2Ref.current, { clipPath: `path('${path}')` });
    };
    setPath();

    const nClones = 8;
    for (let i = 0; i < nClones; i++) {
      const clone1 = word.cloneNode(true);
      const clone2 = word.cloneNode(true);
      bg1Ref.current?.prepend(clone1);
      bg2Ref.current?.prepend(clone2);
      
      gsap.timeline({
        repeat: -1,
        onRepeat: () => {
          bg1Ref.current?.append(clone1);
          bg2Ref.current?.append(clone2);
        }
      })
      .fromTo([clone1, clone2], {
        position: "absolute",
        y: (j: number) => (j % 2) ? 300 : 0
      }, {
        duration: 1,
        y: (j: number) => (j % 2) ? 0 : 300,
        ease: "sine"
      })
      .fromTo([clone1, clone2], {
        color: "hsl(var(--foreground))"
      }, {
        ease: "power1.inOut",
        color: "hsl(var(--muted-foreground))"
      }, 0.5)
      .play(i / nClones)
      .timeScale(0.15);
    }

    const tl = gsap.timeline({ onUpdate: setPath });
    
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

  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center overflow-hidden bg-background relative">
      <div ref={stageRef} className="relative">
        <div ref={bg1Ref} className="absolute inset-0 bg-background"></div>
        <div ref={bg2Ref} className="absolute inset-0 bg-primary/20"></div>
        <div ref={wordRef} className="relative text-5xl font-black uppercase tracking-tight leading-[60px]"></div>
      </div>
    </section>
  );
};

export default WaveTextSection;
