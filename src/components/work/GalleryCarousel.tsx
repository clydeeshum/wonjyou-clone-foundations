import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
import { CustomEase } from "gsap/CustomEase";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger, Flip, Draggable, CustomEase);

const GalleryCarousel = ({ onSectionComplete }: { onSectionComplete?: () => void }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const splitScreenRef = useRef<HTMLDivElement>(null);
  const zoomTargetRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  
  const [currentMode, setCurrentMode] = useState("circle");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [gridZoom, setGridZoom] = useState(0.6);
  const [isZoomMode, setIsZoomMode] = useState(false);
  const [isGrid2Mode, setIsGrid2Mode] = useState(false);
  
  const activeAnimationsRef = useRef<any[]>([]);
  const currentModeIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const draggableRef = useRef<any>(null);
  const gridItemsRef = useRef<any[]>([]);
  const zoomStateRef = useRef<any>({
    isActive: false,
    selectedItem: null,
    scalingOverlay: null,
    cardData: null
  });
  
  const navigate = useNavigate();
  
  // Custom eases for smoother animations
  const customEase = useRef(CustomEase.create("smooth", ".87,0,.13,1"));
  const centerEase = useRef(CustomEase.create("center", ".25,.46,.45,.94"));
  
  const patternSequence = ["circle", "wave", "grid", "fan", "depth", "grid2"];
  const patternNames = ["Circular", "Wave", "Grid", "Fan", "Depth", "Grid Gallery"];
  const patternDescriptions = [
    "Circular arrangements showcase subjects in a harmonious, flowing composition",
    "Wave patterns capture the rhythmic movement and energy of subjects",
    "Grid layouts provide structured, organized presentations of photographic works",
    "Fan arrangements create dynamic, spread-out compositions for visual impact",
    "Depth patterns emphasize the three-dimensional aspects and layers in photography",
    "Interactive grid gallery with drag navigation and zoom controls"
  ];

  const imageSets = {
    circle: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      "https://images.unsplash.com/photo-1511497584788-876760111969",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1",
      "https://images.unsplash.com/photo-1506260408121-e353d10b87c7",
      "https://images.unsplash.com/photo-1476820865390-c52aeebb9891",
      "https://images.unsplash.com/photo-1511497584788-876760111969",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1",
      "https://images.unsplash.com/photo-1506260408121-e353d10b87c7"
    ],
    wave: [
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      "https://images.unsplash.com/photo-1476820865390-c52aeebb9891",
      "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1",
      "https://images.unsplash.com/photo-1506260408121-e353d10b87c7",
      "https://images.unsplash.com/photo-1476820865390-c52aeebb9891",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
    ],
    grid: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      "https://images.unsplash.com/photo-1476820865390-c52aeebb9891",
      "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
      "https://images.unsplash.com/photo-1511497584788-876760111969",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b"
    ],
    fan: [
      "https://images.unsplash.com/photo-1511497584788-876760111969",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      "https://images.unsplash.com/photo-1476820865390-c52aeebb9891",
      "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716"
    ],
    depth: [
      "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
      "https://images.unsplash.com/photo-1511497584788-876760111969",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      "https://images.unsplash.com/photo-1476820865390-c52aeebb9891"
    ],
    grid2: []
  };

  // Generate Grid2 images (8x12 = 96 images)
  const generateGrid2Images = useCallback(() => {
    const baseImages = imageSets.circle;
    const grid2Images = [];
    for (let i = 0; i < 96; i++) {
      grid2Images.push(baseImages[i % baseImages.length]);
    }
    return grid2Images;
  }, []);

  imageSets.grid2 = generateGrid2Images();

  const killActiveAnimations = useCallback(() => {
    activeAnimationsRef.current.forEach((anim) => {
      if (anim && anim.kill) anim.kill();
    });
    activeAnimationsRef.current = [];
    gsap.killTweensOf(".gallery-item");
    gsap.killTweensOf(".grid-item-interactive");
    gsap.killTweensOf(itemsRef.current);
    if (draggableRef.current) {
      draggableRef.current.kill();
      draggableRef.current = null;
    }
  }, []);

  const setupCircleLayout = useCallback((animated = true) => {
    const items = gsap.utils.toArray(".gallery-item");
    const viewportSize = Math.min(window.innerWidth, window.innerHeight);
    const radius = viewportSize * 0.25;
    const angleStep = (2 * Math.PI) / items.length;
    const currentRotation = gsap.getProperty(itemsRef.current, "rotation") || 0;
    const currentRotationRad = Number(currentRotation) * (Math.PI / 180);

    const timeline = gsap.timeline();
    items.forEach((item: any, i) => {
      const angle = i * angleStep + currentRotationRad;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      if (animated) {
        timeline.to(item, { 
          x, y, 
          rotation: -Number(currentRotation), 
          scale: 0.7, 
          duration: 1.2, 
          ease: customEase.current 
        }, 0);
      } else {
        gsap.set(item, { x, y, rotation: -Number(currentRotation), scale: 0.7 });
      }
    });
    return timeline;
  }, []);

  const setupWaveLayout = useCallback(() => {
    const items = gsap.utils.toArray(".gallery-item");
    const lineWidth = Math.min(window.innerWidth * 0.8, items.length * 120);
    const cardSpacing = lineWidth / (items.length - 1);
    const waveHeight = Math.min(window.innerHeight * 0.1, 60);

    const timeline = gsap.timeline();
    items.forEach((item: any, i) => {
      const xPos = (i - (items.length - 1) / 2) * cardSpacing;
      const yPos = Math.sin((i / (items.length - 1)) * Math.PI * 2) * waveHeight;
      timeline.to(item, { 
        x: xPos, 
        y: yPos, 
        rotation: 0, 
        scale: 0.6, 
        duration: 1.2, 
        ease: customEase.current 
      }, 0);
    });

    return timeline;
  }, []);

  const startWaveAnimation = useCallback(() => {
    const items = gsap.utils.toArray(".gallery-item");
    const waveHeight = Math.min(window.innerHeight * 0.1, 60);
    
    return gsap.to(items, {
      y: (i) => {
        const normalizedIndex = i / (items.length - 1);
        return Math.sin(normalizedIndex * Math.PI * 2 + Math.PI) * waveHeight;
      },
      duration: 2.0,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  const setupGridLayout = useCallback(() => {
    const items = gsap.utils.toArray(".gallery-item");
    const cols = 4;
    const rows = 3;
    const scale = 0.6;
    const xSpacing = 200 * scale;
    const ySpacing = 250 * scale;

    const timeline = gsap.timeline();
    items.forEach((item: any, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const xPos = (col - (cols - 1) / 2) * xSpacing;
      const yPos = (row - (rows - 1) / 2) * ySpacing;
      timeline.to(item, { 
        x: xPos, 
        y: yPos, 
        rotation: 0, 
        scale, 
        duration: 1.2, 
        ease: customEase.current 
      }, 0);
    });
    return timeline;
  }, []);

  const setupFanLayout = useCallback(() => {
    const items = gsap.utils.toArray(".gallery-item");
    const maxFanAngle = Math.min(120, window.innerWidth / 6);
    const fanStartAngle = -maxFanAngle / 2;
    const fanEndAngle = maxFanAngle / 2;

    const timeline = gsap.timeline();
    items.forEach((item: any, i) => {
      const progress = i / (items.length - 1);
      const angle = fanStartAngle + progress * (fanEndAngle - fanStartAngle);
      const yOffset = Math.sin((progress - 0.5) * Math.PI) * 40;
      timeline.to(item, { 
        x: 0, 
        y: yOffset, 
        rotation: angle, 
        scale: 0.7, 
        duration: 1.2, 
        ease: customEase.current 
      }, 0);
    });
    return timeline;
  }, []);

  const setup3DDepthLayout = useCallback(() => {
    const items = gsap.utils.toArray(".gallery-item");
    const positions = [
      { x: -window.innerWidth * 0.2, y: -window.innerHeight * 0.15, z: -150, scale: 0.8, rotX: -5, rotY: 5 },
      { x: window.innerWidth * 0.2, y: -window.innerHeight * 0.2, z: -250, scale: 0.75, rotX: -3, rotY: -4 },
      { x: -window.innerWidth * 0.25, y: window.innerHeight * 0.15, z: -350, scale: 0.7, rotX: 4, rotY: 6 },
      { x: window.innerWidth * 0.25, y: window.innerHeight * 0.2, z: -450, scale: 0.65, rotX: 5, rotY: -5 },
      { x: 0, y: -window.innerHeight * 0.25, z: -600, scale: 0.6, rotX: -6, rotY: 0 },
      { x: -window.innerWidth * 0.3, y: 0, z: -700, scale: 0.55, rotX: 0, rotY: 7 },
      { x: window.innerWidth * 0.3, y: 0, z: -800, scale: 0.5, rotX: 0, rotY: -7 },
      { x: 0, y: window.innerHeight * 0.25, z: -900, scale: 0.45, rotX: 6, rotY: 0 },
      { x: -window.innerWidth * 0.15, y: -window.innerHeight * 0.1, z: -1000, scale: 0.4, rotX: -3, rotY: 3 },
      { x: window.innerWidth * 0.15, y: -window.innerHeight * 0.1, z: -1100, scale: 0.35, rotX: -3, rotY: -3 },
      { x: -window.innerWidth * 0.15, y: window.innerHeight * 0.1, z: -1200, scale: 0.3, rotX: 3, rotY: 3 },
      { x: window.innerWidth * 0.15, y: window.innerHeight * 0.1, z: -1300, scale: 0.25, rotX: 3, rotY: -3 }
    ];

    const timeline = gsap.timeline();
    items.forEach((item: any, i) => {
      if (i >= positions.length) return;
      const pos = positions[i];
      timeline.to(item, {
        x: pos.x, y: pos.y, z: pos.z,
        rotationX: pos.rotX, rotationY: pos.rotY,
        scale: pos.scale, 
        duration: 1.2, 
        ease: customEase.current
      }, 0);
    });
    return timeline;
  }, []);

  const calculateGapForZoom = useCallback((zoomLevel: number) => {
    if (zoomLevel >= 1.0) return 16;
    else if (zoomLevel >= 0.6) return 32;
    else return 64;
  }, []);

  const setupGrid2Layout = useCallback(() => {
    if (!canvasWrapperRef.current || !gridContainerRef.current) return;

    const itemSize = 320;
    const gap = calculateGapForZoom(gridZoom);
    const rows = 8;
    const cols = 12;

    const gridWidth = cols * (itemSize + gap) - gap;
    const gridHeight = rows * (itemSize + gap) - gap;

    canvasWrapperRef.current.style.width = gridWidth + "px";
    canvasWrapperRef.current.style.height = gridHeight + "px";
    
    gridContainerRef.current.innerHTML = "";
    gridItemsRef.current = [];

    const images = imageSets.grid2;
    
    let imageIndex = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const item = document.createElement("div");
        item.className = "grid-item-interactive";
        item.style.cssText = `
          position: absolute;
          width: ${itemSize}px;
          height: ${itemSize}px;
          background-image: url(${images[imageIndex]}?w=640&h=640&fit=crop);
          background-size: cover;
          background-position: center;
          cursor: pointer;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        `;

        const x = col * (itemSize + gap);
        const y = row * (itemSize + gap);
        item.style.left = x + "px";
        item.style.top = y + "px";

        const index = imageIndex;
        
        // Hover effect
        item.addEventListener("mouseenter", () => {
          if (!isZoomMode) {
            gsap.to(item, {
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
        
        item.addEventListener("mouseleave", () => {
          if (!isZoomMode) {
            gsap.to(item, {
              scale: 1,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
        
        item.addEventListener("click", () => {
          if (!isZoomMode) {
            enterZoomMode(item, index, `${images[index]}?w=1200&h=1200&fit=crop`);
          }
        });

        gridContainerRef.current?.appendChild(item);
        gridItemsRef.current.push({ element: item, index: imageIndex });
        imageIndex++;
      }
    }

    // Center the grid
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scaledWidth = gridWidth * gridZoom;
    const scaledHeight = gridHeight * gridZoom;
    const centerX = (vw - scaledWidth) / 2;
    const centerY = (vh - scaledHeight) / 2;

    gsap.set(canvasWrapperRef.current, {
      scale: gridZoom,
      x: centerX,
      y: centerY
    });

    initDraggable();
  }, [gridZoom, isZoomMode, calculateGapForZoom]);

  const initDraggable = useCallback(() => {
    if (!canvasWrapperRef.current) return;
    
    if (draggableRef.current) {
      draggableRef.current.kill();
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const gridWidth = parseFloat(canvasWrapperRef.current.style.width);
    const gridHeight = parseFloat(canvasWrapperRef.current.style.height);
    const scaledWidth = gridWidth * gridZoom;
    const scaledHeight = gridHeight * gridZoom;
    const margin = 32 * gridZoom;

    let minX, maxX, minY, maxY;
    if (scaledWidth <= vw) {
      const centerX = (vw - scaledWidth) / 2;
      minX = maxX = centerX;
    } else {
      maxX = margin;
      minX = vw - scaledWidth - margin;
    }

    if (scaledHeight <= vh) {
      const centerY = (vh - scaledHeight) / 2;
      minY = maxY = centerY;
    } else {
      maxY = margin;
      minY = vh - scaledHeight - margin;
    }

    draggableRef.current = Draggable.create(canvasWrapperRef.current, {
      type: "x,y",
      bounds: { minX, maxX, minY, maxY },
      edgeResistance: 0.65,
      inertia: true,
      throwProps: true,
      onDragStart: () => {
        if (canvasWrapperRef.current) {
          canvasWrapperRef.current.style.cursor = "grabbing";
        }
      },
      onDragEnd: () => {
        if (canvasWrapperRef.current) {
          canvasWrapperRef.current.style.cursor = "grab";
        }
      }
    })[0];
  }, [gridZoom]);

  const setGrid2Zoom = useCallback((zoomLevel: number) => {
    if (!canvasWrapperRef.current || !gridContainerRef.current) return;

    setGridZoom(zoomLevel);
    
    const itemSize = 320;
    const newGap = calculateGapForZoom(zoomLevel);
    const rows = 8;
    const cols = 12;

    const newGridWidth = cols * (itemSize + newGap) - newGap;
    const newGridHeight = rows * (itemSize + newGap) - newGap;

    canvasWrapperRef.current.style.width = newGridWidth + "px";
    canvasWrapperRef.current.style.height = newGridHeight + "px";

    // Reposition grid items
    const items = gridContainerRef.current.querySelectorAll(".grid-item-interactive");
    items.forEach((item: any, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = col * (itemSize + newGap);
      const y = row * (itemSize + newGap);
      
      gsap.to(item, {
        left: x,
        top: y,
        duration: 1.2,
        ease: customEase.current
      });
    });

    // Center and scale
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scaledWidth = newGridWidth * zoomLevel;
    const scaledHeight = newGridHeight * zoomLevel;
    const centerX = (vw - scaledWidth) / 2;
    const centerY = (vh - scaledHeight) / 2;

    gsap.to(canvasWrapperRef.current, {
      scale: zoomLevel,
      x: centerX,
      y: centerY,
      duration: 1.2,
      ease: customEase.current,
      onComplete: () => {
        initDraggable();
      }
    });
  }, [calculateGapForZoom, initDraggable]);

  const transitionToMode = useCallback((mode: string) => {
    killActiveAnimations();
    
    isTransitioningRef.current = true;
    setIsTransitioning(true);
    setCurrentMode(mode);

    if (mode === "grid2") {
      setIsGrid2Mode(true);
      
      // Fade out standard gallery items
      gsap.to(".gallery-item", {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: "power2.inOut",
        stagger: 0.02,
        onComplete: () => {
          setupGrid2Layout();
          
          // Show canvas wrapper with fade and scale
          if (canvasWrapperRef.current) {
            gsap.fromTo(canvasWrapperRef.current,
              { opacity: 0, scale: 0.95 },
              { 
                opacity: 1, 
                scale: gridZoom, 
                duration: 1.0, 
                ease: customEase.current
              }
            );
          }
          
          isTransitioningRef.current = false;
          setIsTransitioning(false);
        }
      });
    } else {
      setIsGrid2Mode(false);
      
      // Hide grid2 layout
      if (canvasWrapperRef.current) {
        gsap.to(canvasWrapperRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "power2.inOut"
        });
      }

      // Show standard gallery items with stagger
      gsap.to(".gallery-item", {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.inOut",
        stagger: 0.02
      });

      const timeline = gsap.timeline({
        onComplete: () => {
          isTransitioningRef.current = false;
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
          timeline.to(itemsRef.current, { rotation: 0, duration: 1.2, ease: customEase.current }, 0);
          break;
        case "grid":
          patternTimeline = setupGridLayout();
          timeline.to(itemsRef.current, { rotation: 0, duration: 1.2, ease: customEase.current }, 0);
          break;
        case "fan":
          patternTimeline = setupFanLayout();
          timeline.to(itemsRef.current, { rotation: 0, duration: 1.2, ease: customEase.current }, 0);
          break;
        case "depth":
          patternTimeline = setup3DDepthLayout();
          timeline.to(itemsRef.current, { rotation: 0, duration: 1.2, ease: customEase.current }, 0);
          break;
      }

      if (patternTimeline) {
        timeline.add(patternTimeline, 0);
      }
      activeAnimationsRef.current.push(timeline);
    }
  }, [killActiveAnimations, setupGrid2Layout, gridZoom, startWaveAnimation, setupCircleLayout, setupWaveLayout, setupGridLayout, setupFanLayout, setup3DDepthLayout]);

  const navigateToCategory = useCallback((mode: string) => {
    const modeIndex = patternSequence.indexOf(mode);
    if (modeIndex !== -1) {
      navigate(`/works/${mode}`, {
        state: {
          title: patternNames[modeIndex],
          description: patternDescriptions[modeIndex],
          images: imageSets[mode as keyof typeof imageSets]
        }
      });
    }
  }, [navigate]);

  const createScalingOverlay = useCallback((sourceElement: HTMLElement, imgUrl: string) => {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      pointer-events: none;
      will-change: transform;
    `;
    
    const img = document.createElement("img");
    img.src = imgUrl;
    img.style.cssText = `
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-radius: 0.5rem;
    `;
    
    overlay.appendChild(img);
    document.body.appendChild(overlay);

    const sourceRect = sourceElement.getBoundingClientRect();
    gsap.set(overlay, {
      left: sourceRect.left,
      top: sourceRect.top,
      width: sourceRect.width,
      height: sourceRect.height,
      opacity: 1
    });

    return overlay;
  }, []);

  const enterZoomMode = useCallback((cardElement: HTMLElement, cardIndex: number, imgUrl: string) => {
    if (zoomStateRef.current.isActive) return;

    zoomStateRef.current.isActive = true;
    zoomStateRef.current.selectedItem = cardElement;
    zoomStateRef.current.cardData = { index: cardIndex, imgUrl, mode: currentMode };
    setIsZoomMode(true);

    if (splitScreenRef.current) {
      splitScreenRef.current.style.display = "flex";
      gsap.to(splitScreenRef.current, {
        opacity: 1,
        duration: 1.2,
        ease: customEase.current
      });
    }

    zoomStateRef.current.scalingOverlay = createScalingOverlay(cardElement, imgUrl);
    gsap.set(cardElement, { opacity: 0 });

    if (zoomTargetRef.current) {
      Flip.fit(zoomStateRef.current.scalingOverlay, zoomTargetRef.current, {
        duration: 1.2,
        ease: customEase.current,
        absolute: true,
        onComplete: () => {
          const titleOverlay = document.getElementById("zoom-title-overlay");
          if (titleOverlay) {
            titleOverlay.style.display = "block";
            
            gsap.fromTo("#zoom-number", 
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.1 }
            );
            
            gsap.fromTo("#zoom-title",
              { y: 60, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.15 }
            );
            
            gsap.fromTo("#zoom-description",
              { y: 80, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
            );
          }
        }
      });
    }

    if (closeButtonRef.current) {
      gsap.fromTo(closeButtonRef.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.9 }
      );
    }
  }, [currentMode, createScalingOverlay]);

  const exitZoomMode = useCallback(() => {
    if (!zoomStateRef.current.isActive || !zoomStateRef.current.selectedItem || !zoomStateRef.current.scalingOverlay) {
      return;
    }

    const selectedElement = zoomStateRef.current.selectedItem;

    const titleOverlay = document.getElementById("zoom-title-overlay");
    if (titleOverlay) {
      gsap.to("#zoom-number", { y: -20, opacity: 0, duration: 0.4, ease: "power2.out" });
      gsap.to("#zoom-title", { y: -60, opacity: 0, duration: 0.4, ease: "power2.out" });
      gsap.to("#zoom-description", { 
        y: -80, 
        opacity: 0, 
        duration: 0.4, 
        ease: "power2.out",
        onComplete: () => {
          if (titleOverlay) titleOverlay.style.display = "none";
        }
      });
    }

    if (closeButtonRef.current) {
      gsap.to(closeButtonRef.current, {
        opacity: 0,
        x: 40,
        duration: 0.3,
        ease: "power2.in"
      });
    }

    if (splitScreenRef.current) {
      gsap.to(splitScreenRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    }

    Flip.fit(zoomStateRef.current.scalingOverlay, selectedElement, {
      duration: 1.2,
      ease: customEase.current,
      absolute: true,
      onComplete: () => {
        gsap.set(selectedElement, { opacity: 1 });
        
        if (zoomStateRef.current.scalingOverlay) {
          document.body.removeChild(zoomStateRef.current.scalingOverlay);
          zoomStateRef.current.scalingOverlay = null;
        }

        if (splitScreenRef.current) {
          splitScreenRef.current.style.display = "none";
        }

        zoomStateRef.current.isActive = false;
        zoomStateRef.current.selectedItem = null;
        zoomStateRef.current.cardData = null;
        setIsZoomMode(false);
      }
    });

    if (zoomStateRef.current.scalingOverlay) {
      gsap.to(zoomStateRef.current.scalingOverlay, {
        opacity: 0.4,
        duration: 0.8,
        ease: "power2.out"
      });
    }
  }, []);

  const handleZoomClick = useCallback(() => {
    if (zoomStateRef.current.isActive && zoomStateRef.current.cardData) {
      navigateToCategory(zoomStateRef.current.cardData.mode);
    }
  }, [navigateToCategory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isZoomMode) {
        exitZoomMode();
      } else if (e.key === "1" && isGrid2Mode && !isZoomMode) {
        setGrid2Zoom(0.3);
      } else if (e.key === "2" && isGrid2Mode && !isZoomMode) {
        setGrid2Zoom(0.6);
      } else if (e.key === "3" && isGrid2Mode && !isZoomMode) {
        setGrid2Zoom(1.0);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isZoomMode, isGrid2Mode, exitZoomMode, setGrid2Zoom]);

  useEffect(() => {
    const items = gsap.utils.toArray(".gallery-item");
    
    gsap.set(items, { x: 0, y: 0, rotation: 0, scale: 0, opacity: 0 });

    const timeline = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
        isTransitioningRef.current = false;
      }
    });

    items.forEach((item: any, i) => {
      const delay = (items.length - 1 - i) * 0.05;
      timeline.to(item, { 
        opacity: 1, 
        scale: 0.8, 
        duration: 0.6, 
        ease: "power2.out" 
      }, delay);
    });

    timeline.to({}, { duration: 0.2 });
    const circleTimeline = setupCircleLayout(true);
    timeline.add(circleTimeline);
    activeAnimationsRef.current.push(timeline);

    const section = carouselRef.current?.parentElement;
    
    if (!section) return;
    
    const sectionHeight = window.innerHeight;
    const totalPatterns = patternSequence.length;
    const scrollDistance = sectionHeight * (totalPatterns + 1);
    
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${scrollDistance}`,
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        markers: false,
        id: "gallery-scroll",
        onUpdate: (self) => {
          const progress = self.progress;
          const exactIndex = progress * (totalPatterns - 1);
          const patternIndex = Math.round(exactIndex);
          
          const targetMode = patternSequence[patternIndex];
          
          if (targetMode && patternIndex !== currentModeIndexRef.current) {
            currentModeIndexRef.current = patternIndex;
            transitionToMode(targetMode);
          }
        },
        onLeave: () => {
          onSectionComplete?.();
        },
        onLeaveBack: () => {
          if (currentModeIndexRef.current !== 0) {
            currentModeIndexRef.current = 0;
            transitionToMode(patternSequence[0]);
          }
        }
      }
    });

    activeAnimationsRef.current.push(scrollTl);

    return () => {
      killActiveAnimations();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.id === "gallery-scroll") {
          trigger.kill();
        }
      });
    };
  }, [setupCircleLayout, transitionToMode, killActiveAnimations, onSectionComplete]);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden" ref={carouselRef}>
      {/* Standard Gallery Items (Circle, Wave, Grid, Fan, Depth) */}
      <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center" style={{ perspective: "2500px" }}>
        <div ref={itemsRef} className="relative" style={{ transformStyle: "preserve-3d" }}>
          {imageSets[currentMode as keyof typeof imageSets].slice(0, 12).map((img, i) => (
            <div
              key={i}
              className="gallery-item absolute cursor-pointer rounded-lg overflow-hidden shadow-2xl transition-shadow duration-300 hover:shadow-3xl"
              style={{
                width: "200px",
                height: "250px",
                backgroundImage: `url(${img}?w=400&h=600&fit=crop)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: "translate(-50%, -50%)",
                transformStyle: "preserve-3d"
              }}
              onClick={(e) => {
                if (!isZoomMode && !isGrid2Mode) {
                  enterZoomMode(e.currentTarget, i, `${img}?w=800&h=1000&fit=crop`);
                }
              }}
            >
              <div className="absolute top-2 left-2 text-white font-bold text-sm bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                {String(i + 1).padStart(3, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid2 Layout (Draggable Grid) */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          opacity: 0,
          pointerEvents: isGrid2Mode ? "all" : "none",
          cursor: isGrid2Mode ? "grab" : "default"
        }}
      >
        <div 
          ref={canvasWrapperRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transformOrigin: "0 0",
            willChange: "transform",
            cursor: "grab"
          }}
        >
          <div 
            ref={gridContainerRef}
            style={{
              position: "relative",
              width: "100%",
              height: "100%"
            }}
          />
        </div>
      </div>

      {/* Split Screen Container */}
      <div 
        ref={splitScreenRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "none",
          opacity: 0,
          zIndex: 100
        }}
      >
        <div 
          style={{
            position: "relative",
            width: "50vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(10px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transition: "background 0.3s ease"
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              exitZoomMode();
            }
          }}
        >
          <div 
            ref={zoomTargetRef}
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
            onClick={handleZoomClick}
          />
        </div>
        <div 
          style={{
            position: "relative",
            width: "50vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(10px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transition: "background 0.3s ease"
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              exitZoomMode();
            }
          }}
        />
      </div>

      {/* Zoom Title Overlay */}
      <div 
        id="zoom-title-overlay"
        style={{
          position: "fixed",
          bottom: "40px",
          left: "40px",
          color: "white",
          zIndex: 101,
          display: "none",
          pointerEvents: "none"
        }}
      >
        <div 
          id="zoom-number"
          style={{
            fontFamily: "monospace",
            fontSize: "12px",
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "0.5em",
            opacity: 0
          }}
        >
          {String(patternSequence.indexOf(currentMode) + 1).padStart(2, "0")}
        </div>
        <h1 
          id="zoom-title"
          style={{
            fontSize: "48px",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: "1em",
            opacity: 0
          }}
        >
          {patternNames[patternSequence.indexOf(currentMode)]}
        </h1>
        <p 
          id="zoom-description"
          style={{
            fontSize: "16px",
            fontWeight: 300,
            lineHeight: 1.4,
            maxWidth: "400px",
            color: "rgba(255, 255, 255, 0.8)",
            opacity: 0
          }}
        >
          {patternDescriptions[patternSequence.indexOf(currentMode)]}
        </p>
      </div>

      {/* Close Button */}
      <button
        ref={closeButtonRef}
        onClick={exitZoomMode}
        style={{
          position: "fixed",
          top: "50%",
          right: "20px",
          width: "64px",
          height: "64px",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 102,
          opacity: 0,
          transform: "translate(40px, -50%)",
          pointerEvents: isZoomMode ? "all" : "none",
          transition: "opacity 0.3s ease"
        }}
      >
        <svg width="64" height="64" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "rotate(180deg)", filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))" }}>
          <path d="M7.89873 16L6.35949 14.48L11.8278 9.08H0V6.92H11.8278L6.35949 1.52L7.89873 0L16 8L7.89873 16Z" fill="white" />
        </svg>
      </button>

      {/* Grid2 Zoom Controls - Only show when in grid2 mode */}
      {isGrid2Mode && (
        <div 
          ref={controlsRef}
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "0.75rem",
            zIndex: 20,
            opacity: isZoomMode ? 0 : 1,
            pointerEvents: isZoomMode ? "none" : "all",
            transition: "opacity 0.5s ease"
          }}
        >
          <div 
            style={{
              background: "rgba(240, 240, 240, 0.95)",
              backdropFilter: "blur(10px)",
              padding: "0.625em 1.25em",
              borderRadius: "0.375em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "monospace",
              fontSize: "0.75em",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "#333",
              minWidth: "5em",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
          >
            {Math.round(gridZoom * 100)}%
          </div>
          <div 
            style={{
              display: "flex",
              gap: "0.5em",
              background: "rgba(34, 34, 34, 0.95)",
              backdropFilter: "blur(10px)",
              padding: "0.5em 1em",
              borderRadius: "0.375em",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
          >
            <button
              onClick={() => setGrid2Zoom(0.3)}
              style={{
                background: gridZoom === 0.3 ? "rgba(240, 240, 240, 0.15)" : "none",
                border: "none",
                color: gridZoom === 0.3 ? "#f0f0f0" : "#666",
                cursor: "pointer",
                fontFamily: "monospace",
                fontSize: "0.75em",
                fontWeight: 600,
                textTransform: "uppercase",
                padding: "8px 12px",
                borderRadius: "0.25em",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                if (gridZoom !== 0.3) {
                  e.currentTarget.style.background = "rgba(240, 240, 240, 0.08)";
                  e.currentTarget.style.color = "#999";
                }
              }}
              onMouseLeave={(e) => {
                if (gridZoom !== 0.3) {
                  e.currentTarget.style.background = "none";
                  e.currentTarget.style.color = "#666";
                }
              }}
            >
              ZOOM OUT
            </button>
            <button
              onClick={() => setGrid2Zoom(0.6)}
              style={{
                background: gridZoom === 0.6 ? "rgba(240, 240, 240, 0.15)" : "none",
                border: "none",
                color: gridZoom === 0.6 ? "#f0f0f0" : "#666",
                cursor: "pointer",
                fontFamily: "monospace",
                fontSize: "0.75em",
                fontWeight: 600,
                textTransform: "uppercase",
                padding: "8px 12px",
                borderRadius: "0.25em",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                if (gridZoom !== 0.6) {
                  e.currentTarget.style.background = "rgba(240, 240, 240, 0.08)";
                  e.currentTarget.style.color = "#999";
                }
              }}
              onMouseLeave={(e) => {
                if (gridZoom !== 0.6) {
                  e.currentTarget.style.background = "none";
                  e.currentTarget.style.color = "#666";
                }
              }}
            >
              NORMAL
            </button>
            <button
              onClick={() => setGrid2Zoom(1.0)}
              style={{
                background: gridZoom === 1.0 ? "rgba(240, 240, 240, 0.15)" : "none",
                border: "none",
                color: gridZoom === 1.0 ? "#f0f0f0" : "#666",
                cursor: "pointer",
                fontFamily: "monospace",
                fontSize: "0.75em",
                fontWeight: 600,
                textTransform: "uppercase",
                padding: "8px 12px",
                borderRadius: "0.25em",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                if (gridZoom !== 1.0) {
                  e.currentTarget.style.background = "rgba(240, 240, 240, 0.08)";
                  e.currentTarget.style.color = "#999";
                }
              }}
              onMouseLeave={(e) => {
                if (gridZoom !== 1.0) {
                  e.currentTarget.style.background = "none";
                  e.currentTarget.style.color = "#666";
                }
              }}
            >
              ZOOM IN
            </button>
          </div>
        </div>
      )}

      {/* Pattern Navigation */}
      <div 
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 bg-card/90 backdrop-blur-lg px-6 py-3 rounded-lg z-20 border border-border shadow-lg" 
        style={{ 
          marginBottom: isGrid2Mode ? "80px" : "0px",
          transition: "all 0.5s ease",
          opacity: isZoomMode ? 0.5 : 1
        }}
      >
        {patternSequence.map((mode, index) => (
          <div
            key={mode}
            className={`relative px-3 py-2 text-xs font-bold transition-all duration-300 cursor-pointer rounded ${
              currentMode === mode ? "text-foreground bg-primary/10" : "text-muted-foreground/60 hover:text-muted-foreground hover:bg-muted/50"
            }`}
            onClick={() => {
              if (!isZoomMode) {
                const newIndex = index;
                if (newIndex !== currentModeIndexRef.current) {
                  currentModeIndexRef.current = newIndex;
                  transitionToMode(mode);
                }
              }
            }}
          >
            {currentMode === mode && (
              <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full" style={{ animation: "pulse 2s ease-in-out infinite" }} />
            )}
            {patternNames[index].toUpperCase()}
          </div>
        ))}
      </div>
      
      {/* Pattern Info */}
      <div 
        className="fixed top-1/2 left-8 transform -translate-y-1/2 flex flex-col gap-4 z-20" 
        style={{ 
          opacity: isZoomMode ? 0 : 1, 
          transition: "opacity 0.5s ease",
          pointerEvents: isZoomMode ? "none" : "all"
        }}
      >
        <div className="bg-card/90 backdrop-blur-lg p-6 rounded-xl border border-border max-w-xs shadow-xl">
          <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {patternNames[patternSequence.indexOf(currentMode)]}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {patternDescriptions[patternSequence.indexOf(currentMode)]}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
};

export default GalleryCarousel;