import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GalleryCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const [currentMode, setCurrentMode] = useState("circle");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const draggableRef = useRef<any>(null);
  const activeAnimationsRef = useRef<any[]>([]);

  const images = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
    "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d",
    "https://images.unsplash.com/photo-1618556450991-2f1af64e8191",
    "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead",
    "https://images.unsplash.com/photo-1618556450935-2c57e5b78e6d",
    "https://images.unsplash.com/photo-1618556450994-2f1af64e8191",
    "https://images.unsplash.com/photo-1618005198379-0a5e3f7e4a3d",
    "https://images.unsplash.com/photo-1618556450991-2f1af64e8191",
    "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
    "https://images.unsplash.com/photo-1618556450991-2f1af64e8191",
    "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead",
  ];

  const killActiveAnimations = () => {
    activeAnimationsRef.current.forEach((anim) => {
      if (anim && anim.kill) anim.kill();
    });
    activeAnimationsRef.current = [];
    gsap.killTweensOf(".gallery-item");
    gsap.killTweensOf(itemsRef.current);
  };

  const setupCircleLayout = (animated = true) => {
    const items = gsap.utils.toArray(".gallery-item");
    const viewportSize = Math.min(window.innerWidth, window.innerHeight);
    const radius = viewportSize * 0.35;
    const angleStep = (2 * Math.PI) / items.length;
    const currentRotation = gsap.getProperty(itemsRef.current, "rotation") || 0;
    const currentRotationRad = Number(currentRotation) * (Math.PI / 180);

    const timeline = gsap.timeline();
    items.forEach((item: any, i) => {
      const angle = i * angleStep + currentRotationRad;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      if (animated) {
        timeline.to(item, { x, y, rotation: -Number(currentRotation), scale: 0.8, duration: 1.2, ease: "power2.inOut" }, 0);
      } else {
        gsap.set(item, { x, y, rotation: -Number(currentRotation), scale: 0.8 });
      }
    });
    return timeline;
  };

  const setupWaveLayout = () => {
    const items = gsap.utils.toArray(".gallery-item");
    const lineWidth = Math.min(window.innerWidth * 0.8, items.length * 150);
    const cardSpacing = lineWidth / (items.length - 1);
    const waveHeight = Math.min(window.innerHeight * 0.1, 80);

    const timeline = gsap.timeline();
    items.forEach((item: any, i) => {
      const xPos = (i - (items.length - 1) / 2) * cardSpacing;
      const yPos = Math.sin((i / (items.length - 1)) * Math.PI * 2) * waveHeight;
      timeline.to(item, { x: xPos, y: yPos, rotation: 0, scale: 0.7, duration: 1.2, ease: "power2.inOut" }, 0);
    });

    return timeline;
  };

  const startWaveAnimation = () => {
    const items = gsap.utils.toArray(".gallery-item");
    const waveHeight = Math.min(window.innerHeight * 0.1, 80);
    
    return gsap.to(items, {
      y: (i) => {
        const normalizedIndex = i / (items.length - 1);
        return Math.sin(normalizedIndex * Math.PI * 2 + Math.PI) * waveHeight;
      },
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  };

  const setupGridLayout = () => {
    const items = gsap.utils.toArray(".gallery-item");
    const cols = 4;
    const rows = 3;
    const scale = 0.7;
    const xSpacing = 250 * scale;
    const ySpacing = 350 * scale;

    const timeline = gsap.timeline();
    items.forEach((item: any, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const xPos = (col - (cols - 1) / 2) * xSpacing;
      const yPos = (row - (rows - 1) / 2) * ySpacing;
      timeline.to(item, { x: xPos, y: yPos, rotation: 0, scale, duration: 1.2, ease: "power2.inOut" }, 0);
    });
    return timeline;
  };

  const setupFanLayout = () => {
    const items = gsap.utils.toArray(".gallery-item");
    const maxFanAngle = Math.min(180, window.innerWidth / 5);
    const fanStartAngle = -maxFanAngle / 2;
    const fanEndAngle = maxFanAngle / 2;

    const timeline = gsap.timeline();
    items.forEach((item: any, i) => {
      const progress = i / (items.length - 1);
      const angle = fanStartAngle + progress * (fanEndAngle - fanStartAngle);
      const yOffset = Math.sin((progress - 0.5) * Math.PI) * 50;
      timeline.to(item, { x: 0, y: yOffset, rotation: angle, scale: 0.8, duration: 1.2, ease: "power2.inOut" }, 0);
    });
    return timeline;
  };

  const setup3DDepthLayout = () => {
    const items = gsap.utils.toArray(".gallery-item");
    const positions = [
      { x: -window.innerWidth * 0.25, y: -window.innerHeight * 0.2, z: -200, scale: 0.9, rotX: -5, rotY: 5 },
      { x: window.innerWidth * 0.25, y: -window.innerHeight * 0.25, z: -300, scale: 0.85, rotX: -3, rotY: -4 },
      { x: -window.innerWidth * 0.3, y: window.innerHeight * 0.2, z: -400, scale: 0.8, rotX: 4, rotY: 6 },
      { x: window.innerWidth * 0.3, y: window.innerHeight * 0.25, z: -500, scale: 0.75, rotX: 5, rotY: -5 },
      { x: 0, y: -window.innerHeight * 0.3, z: -700, scale: 0.7, rotX: -6, rotY: 0 },
      { x: -window.innerWidth * 0.35, y: 0, z: -800, scale: 0.65, rotX: 0, rotY: 7 },
      { x: window.innerWidth * 0.35, y: 0, z: -900, scale: 0.6, rotX: 0, rotY: -7 },
      { x: 0, y: window.innerHeight * 0.3, z: -1000, scale: 0.55, rotX: 6, rotY: 0 },
      { x: -window.innerWidth * 0.2, y: -window.innerHeight * 0.15, z: -1200, scale: 0.5, rotX: -3, rotY: 3 },
      { x: window.innerWidth * 0.2, y: -window.innerHeight * 0.15, z: -1300, scale: 0.45, rotX: -3, rotY: -3 },
      { x: -window.innerWidth * 0.2, y: window.innerHeight * 0.15, z: -1400, scale: 0.4, rotX: 3, rotY: 3 },
      { x: window.innerWidth * 0.2, y: window.innerHeight * 0.15, z: -1500, scale: 0.35, rotX: 3, rotY: -3 }
    ];

    const timeline = gsap.timeline();
    items.forEach((item: any, i) => {
      if (i >= positions.length) return;
      const pos = positions[i];
      timeline.to(item, {
        x: pos.x, y: pos.y, z: pos.z,
        rotationX: pos.rotX, rotationY: pos.rotY,
        scale: pos.scale, duration: 1.2, ease: "power2.inOut"
      }, 0);
    });
    return timeline;
  };

  const transitionToMode = (mode: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentMode(mode);

    killActiveAnimations();

    const timeline = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
        if (mode === "wave") {
          const waveAnim = startWaveAnimation();
          if (waveAnim) activeAnimationsRef.current.push(waveAnim);
        }
      }
    });

    let patternTimeline;
    switch (mode) {
      case "circle":
        patternTimeline = setupCircleLayout(true);
        break;
      case "wave":
        patternTimeline = setupWaveLayout();
        timeline.to(itemsRef.current, { rotation: 0, duration: 1.2, ease: "power2.inOut" }, 0);
        break;
      case "grid":
        patternTimeline = setupGridLayout();
        timeline.to(itemsRef.current, { rotation: 0, duration: 1.2, ease: "power2.inOut" }, 0);
        break;
      case "fan":
        patternTimeline = setupFanLayout();
        timeline.to(itemsRef.current, { rotation: 0, duration: 1.2, ease: "power2.inOut" }, 0);
        break;
      case "depth":
        patternTimeline = setup3DDepthLayout();
        timeline.to(itemsRef.current, { rotation: 0, duration: 1.2, ease: "power2.inOut" }, 0);
        break;
    }

    if (patternTimeline) timeline.add(patternTimeline, 0);
    activeAnimationsRef.current.push(timeline);
  };

  useEffect(() => {
    const items = gsap.utils.toArray(".gallery-item");
    
    gsap.set(items, { x: 0, y: 0, rotation: 0, scale: 0, opacity: 0 });

    const timeline = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
      }
    });

    items.forEach((item: any, i) => {
      const delay = (items.length - 1 - i) * 0.1;
      timeline.to(item, { opacity: 1, scale: 0.8, duration: 0.5, ease: "power2.out" }, delay);
    });

    timeline.to({}, { duration: 0.3 });
    const circleTimeline = setupCircleLayout(true);
    timeline.add(circleTimeline);

    activeAnimationsRef.current.push(timeline);

    // Setup scroll-triggered pattern transitions
    const patterns = ["circle", "wave", "grid", "fan", "depth"];
    const section = carouselRef.current?.parentElement;
    
    if (section) {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: carouselRef.current,
        pinSpacing: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          // Divide the scroll into equal segments for each pattern
          const patternIndex = Math.min(Math.floor(progress * patterns.length), patterns.length - 1);
          const targetPattern = patterns[patternIndex];
          
          if (targetPattern !== currentMode && !isTransitioning) {
            transitionToMode(targetPattern);
          }
        }
      });
    }

    return () => {
      killActiveAnimations();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="relative h-[500vh] overflow-hidden">
      <div ref={carouselRef} className="fixed inset-0 flex items-center justify-center" style={{ perspective: "2500px" }}>
        <div ref={itemsRef} className="absolute" style={{ transformStyle: "preserve-3d" }}>
          {images.map((img, i) => (
            <div
              key={i}
              className="gallery-item absolute cursor-pointer rounded-lg overflow-hidden shadow-2xl"
              style={{
                width: "300px",
                height: "400px",
                backgroundImage: `url(${img}?w=400&h=600&fit=crop)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: "translate(-50%, -50%)",
                transformStyle: "preserve-3d"
              }}
            >
              <div className="absolute top-2 left-2 text-white font-bold text-sm bg-black/50 px-2 py-1 rounded">
                {String(i + 1).padStart(3, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-5 bg-card/80 backdrop-blur-sm px-6 py-3 rounded-lg z-50 border border-border">
        <div className="text-sm font-bold text-muted-foreground">
          SCROLL TO EXPLORE
        </div>
        <div className="flex gap-2">
          {["CIRCLE", "WAVE", "GRID", "FAN", "3D DEPTH"].map((label, index) => (
            <div
              key={label}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentMode === label.toLowerCase().replace(" ", "") ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryCarousel;
