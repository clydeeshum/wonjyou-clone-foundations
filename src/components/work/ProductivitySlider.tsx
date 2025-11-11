import { useEffect, useRef, useState } from 'react';
import './ProductivitySlider.css';

const ProductivitySlider = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const touchStartRef = useRef({ x: 0, y: 0 });
  
  const cardsData = [
    {
      id: 1,
      title: "Designers",
      description: "Tools that work like you do.",
      bgImage: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/designers.webp",
      thumbImage: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/img-designer.webp?w=480"
    },
    {
      id: 2,
      title: "Marketers",
      description: "Create faster, explore new possibilities.",
      bgImage: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/marketers.webp",
      thumbImage: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/img-marketer.webp?w=480"
    },
    {
      id: 3,
      title: "VFX filmmakers",
      description: "From concept to cut, faster.",
      bgImage: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/filmmakers.webp",
      thumbImage: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/img-film.webp?w=480"
    },
    {
      id: 4,
      title: "Content creators",
      description: "Make scroll-stopping content, easily.",
      bgImage: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/content-creators.webp",
      thumbImage: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/img-content.webp?w=480"
    },
    {
      id: 5,
      title: "Art directors",
      description: "Creative control at every stage.",
      bgImage: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/art-directors.webp",
      thumbImage: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/img-art.webp?w=480"
    }
  ];

  const isMobile = () => window.matchMedia("(max-width: 767px)").matches;

  const center = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    
    const cards = Array.from(track.children) as HTMLElement[];
    const card = cards[index];
    if (!card) return;
    
    const mobile = isMobile();
    const trackSize = track[mobile ? "clientHeight" : "clientWidth"] as number;
    const cardSize = card[mobile ? "offsetHeight" : "offsetWidth"] as number;
    const cardOffset = mobile ? card.offsetTop : card.offsetLeft;
    const scrollPosition = cardOffset - (trackSize / 2) + (cardSize / 2);
    
    if (mobile) {
      track.scrollTop = scrollPosition;
    } else {
      track.scrollLeft = scrollPosition;
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    const dotsBox = dotsRef.current;
    
    if (!track || !dotsBox) return;

    // Create dots
    if (dotsBox.children.length === 0) {
      cardsData.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.className = "dot";
        dot.onclick = () => {
          currentRef.current = i;
          activate(i, true);
        };
        dotsBox.appendChild(dot);
      });
    }
    
    const dots = Array.from(dotsBox.children) as HTMLSpanElement[];
    
    center(0);

    function toggleUI(i: number) {
      const track = trackRef.current;
      if (!track) return;
      
      const cards = Array.from(track.children) as HTMLElement[];
      cards.forEach((c, k) => {
        if (k === i) {
          c.setAttribute('data-active', 'true');
        } else {
          c.removeAttribute('data-active');
        }
      });
      dots.forEach((d, k) => d.classList.toggle("active", k === i));
      
      // Use refs instead of getElementById for better reliability
      const buttons = track.closest('.productivity-slider-container')?.querySelectorAll('.nav-btn');
      if (buttons && buttons.length >= 2) {
        const prevBtn = buttons[0] as HTMLButtonElement;
        const nextBtn = buttons[1] as HTMLButtonElement;
        prevBtn.disabled = i === 0;
        nextBtn.disabled = i === cardsData.length - 1;
      }
    }

    function activate(i: number, scroll: boolean) {
      if (i === currentRef.current) return;
      currentRef.current = i;
      toggleUI(i);
      if (scroll) center(i);
    }

    function go(step: number) {
      const newIndex = Math.min(Math.max(currentRef.current + step, 0), cardsData.length - 1);
      activate(newIndex, true);
    }

    // Use refs instead of getElementById for better reliability
    const container = trackRef.current?.closest('.productivity-slider-container');
    const buttons = container?.querySelectorAll('.nav-btn');
    
    if (buttons && buttons.length >= 2) {
      const prevBtn = buttons[0];
      const nextBtn = buttons[1];
      prevBtn.addEventListener('click', () => go(-1));
      nextBtn.addEventListener('click', () => go(1));
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown"].includes(e.key)) go(1);
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) go(-1);
    };

    window.addEventListener("keydown", handleKeyDown, { passive: true });

    const cards = Array.from(track.children) as HTMLDivElement[];
    cards.forEach((card, i) => {
      card.addEventListener("mouseenter", () => {
        if (matchMedia("(hover:hover)").matches) activate(i, true);
      });
      
      card.addEventListener("click", () => activate(i, true));
    });
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const { x: startX, y: startY } = touchStartRef.current;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      
      if (isMobile() ? Math.abs(dy) > 60 : Math.abs(dx) > 60) {
        go((isMobile() ? dy : dx) > 0 ? -1 : 1);
      }
    };

    track.addEventListener("touchstart", handleTouchStart, { passive: true });
    track.addEventListener("touchend", handleTouchEnd, { passive: true });

    if (window.matchMedia("(max-width:767px)").matches) {
      dotsBox.hidden = true;
    }

    // Initialize first card
    toggleUI(0);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (track) {
        track.removeEventListener("touchstart", handleTouchStart);
        track.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, []);

  return (
    <section className="productivity-slider-container min-h-screen flex flex-col justify-center">
      <div className="head">
        <h2>Boost your professional workflow and productivity</h2>

        <div className="controls">
          <button id="prev" className="nav-btn" aria-label="Prev">‹</button>
          <button id="next" className="nav-btn" aria-label="Next">›</button>
        </div>
      </div>

      <div className="slider">
        <div className="track" id="track" ref={trackRef}>
          {cardsData.map((card, index) => (
            <article 
              key={card.id} 
              className="project-card"
              {...(index === 0 ? { 'data-active': 'true' } : {})}
            >
              <img 
                className="project-card__bg" 
                src={card.bgImage} 
                alt="" 
              />
              <div className="project-card__content">
                <img 
                  className="project-card__thumb" 
                  src={card.thumbImage} 
                  alt="" 
                />
                <div>
                  <h3 className="project-card__title">{card.title}</h3>
                  <p className="project-card__desc">{card.description}</p>
                  <button className="project-card__btn">Details</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="dots" id="dots" ref={dotsRef}></div>
    </section>
  );
};

export default ProductivitySlider;