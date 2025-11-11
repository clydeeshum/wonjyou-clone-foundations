import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const HorizontalPanels = () => {
  const panelsContainerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<any>(null);

  useEffect(() => {
    if (!panelsContainerRef.current) return;

    // Navigation handling
    const scrollFunc = ScrollTrigger.getScrollFunc(window);

    const handleAnchorClick = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute("href");
      if (!href) return;
      
      const targetElem = document.querySelector(href) as HTMLElement;
      let y: number | HTMLElement = targetElem;
      
      if (panelsContainerRef.current && targetElem && panelsContainerRef.current.isSameNode(targetElem.parentElement)) {
        const panels = gsap.utils.toArray("#panels-container .panel") as HTMLElement[];
        if (tweenRef.current && tweenRef.current.scrollTrigger) {
          const totalScroll = tweenRef.current.scrollTrigger.end - tweenRef.current.scrollTrigger.start;
          const totalMovement = (panels.length - 1) * targetElem.offsetWidth;
          y = Math.round(tweenRef.current.scrollTrigger.start + (targetElem.offsetLeft / totalMovement) * totalScroll);
        }
      }
      
      gsap.to(window, {
        scrollTo: {
          y: y,
          autoKill: false
        },
        onUpdate: ScrollTrigger.update,
        duration: 1
      });
    };

    document.querySelectorAll(".anchor").forEach(anchor => {
      anchor.addEventListener("click", handleAnchorClick);
    });

    // Panel animations
    const panels = gsap.utils.toArray("#panels-container .panel") as HTMLElement[];
    if (panels.length > 0) {
      tweenRef.current = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: "#panels-container",
          pin: true,
          start: "top top",
          scrub: 1,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (panels.length - 1),
            inertia: false,
            duration: {min: 0.1, max: 0.1}
          },
          end: () => "+=" + (panelsContainerRef.current!.offsetWidth - innerWidth)
        }
      });
    }

    return () => {
      document.querySelectorAll(".anchor").forEach(anchor => {
        anchor.removeEventListener("click", handleAnchorClick);
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="panels" className="relative">
      <nav className="fixed-nav z-50 top-4 left-4 flex gap-4 bg-card/80 backdrop-blur-sm p-3 rounded-lg border border-border">
        <a href="#intro" className="anchor text-foreground hover:text-primary transition-colors text-sm">Home</a>
        <a href="#panel-1" className="anchor text-foreground hover:text-primary transition-colors text-sm">Panel 1</a>
        <a href="#panel-3" className="anchor text-foreground hover:text-primary transition-colors text-sm">Panel 3</a>
        <a href="#panel-5" className="anchor text-foreground hover:text-primary transition-colors text-sm">Panel 5</a>
        <a href="#panel-6" className="anchor text-foreground hover:text-primary transition-colors text-sm">Panel 6</a>
      </nav>

      <main id="content" className="site-content">
        <section id="intro" className="description panel min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">Anchor navigation, ScrollTrigger</h1>
            <div className="scroll-down flex flex-col items-center text-muted-foreground">
              Scroll down
              <div className="arrow mt-2 w-6 h-6 border-r-2 border-b-2 border-muted-foreground rotate-45"></div>
            </div>
          </div>
        </section>

        <div id="panels-container" ref={panelsContainerRef} style={{ width: '500%' }}>
          <article id="panel-1" className="panel full-screen w-full h-screen overflow-hidden flex text-left bg-gradient-to-br from-green-500/10 to-emerald-500/10">
            <div className="container mx-auto px-6 flex items-center">
              <div className="row flex flex-wrap w-full">
                <div className="col-6 w-1/2">
                  <div className="bg-muted h-64 rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Image Placeholder</span>
                  </div>
                </div>
                <div className="col-6 w-1/2 flex flex-col">
                  <h2 className="panel__number text-9xl font-bold text-muted-foreground/20">1</h2>
                  <div className="panels-navigation flex justify-end mt-auto mb-8">
                    <div className="nav-panel" data-sign="plus">
                      <a href="#panel-2" className="anchor px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                        Next
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
          
          <article id="panel-2" className="panel full-screen w-full h-screen overflow-hidden flex text-left">
            <div className="container mx-auto px-6 flex items-center">
              <div className="row flex flex-wrap w-full">
                <div className="col-6 w-1/2">
                  <div className="bg-muted h-64 rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Image Placeholder</span>
                  </div>
                </div>
                <div className="col-6 w-1/2 flex flex-col">
                  <h2 className="panel__number text-9xl font-bold text-muted-foreground/20">2</h2>
                  <div className="panels-navigation flex justify-between mt-auto mb-8">
                    <div className="nav-panel" data-sign="minus">
                      <a href="#panel-1" className="anchor px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 transition-colors">
                        Prev
                      </a>
                    </div>
                    <div className="nav-panel" data-sign="plus">
                      <a href="#panel-3" className="anchor px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                        Next
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
          
          <article id="panel-3" className="panel full-screen w-full h-screen overflow-hidden flex text-left bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10">
            <div className="container mx-auto px-6 flex items-center">
              <div className="row flex flex-wrap w-full">
                <div className="col-6 w-1/2">
                  <div className="bg-muted h-64 rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Image Placeholder</span>
                  </div>
                </div>
                <div className="col-6 w-1/2 flex flex-col">
                  <h2 className="panel__number text-9xl font-bold text-muted-foreground/20">3</h2>
                  <div className="panels-navigation flex justify-between mt-auto mb-8">
                    <div className="nav-panel" data-sign="minus">
                      <a href="#panel-2" className="anchor px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 transition-colors">
                        Prev
                      </a>
                    </div>
                    <div className="nav-panel" data-sign="plus">
                      <a href="#panel-4" className="anchor px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                        Next
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
          
          <article id="panel-4" className="panel full-screen w-full h-screen overflow-hidden flex text-left">
            <div className="container mx-auto px-6 flex items-center">
              <div className="row flex flex-wrap w-full">
                <div className="col-6 w-1/2">
                  <div className="bg-muted h-64 rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Image Placeholder</span>
                  </div>
                </div>
                <div className="col-6 w-1/2 flex flex-col">
                  <h2 className="panel__number text-9xl font-bold text-muted-foreground/20">4</h2>
                  <div className="panels-navigation flex justify-between mt-auto mb-8">
                    <div className="nav-panel" data-sign="minus">
                      <a href="#panel-3" className="anchor px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 transition-colors">
                        Prev
                      </a>
                    </div>
                    <div className="nav-panel" data-sign="plus">
                      <a href="#panel-5" className="anchor px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                        Next
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
          
          <article id="panel-5" className="panel full-screen w-full h-screen overflow-hidden flex text-left bg-gradient-to-br from-orange-500/10 to-amber-500/10">
            <div className="container mx-auto px-6 flex items-center">
              <div className="row flex flex-wrap w-full">
                <div className="col-6 w-1/2">
                  <div className="bg-muted h-64 rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Image Placeholder</span>
                  </div>
                </div>
                <div className="col-6 w-1/2 flex flex-col">
                  <h2 className="panel__number text-9xl font-bold text-muted-foreground/20">5</h2>
                  <div className="panels-navigation flex justify-end mt-auto mb-8">
                    <div className="nav-panel" data-sign="minus">
                      <a href="#panel-4" className="anchor px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 transition-colors">
                        Prev
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        <section id="panel-6" className="panel min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500/10 to-blue-500/10">
          <h2 className="panel__number text-9xl font-bold text-muted-foreground/20">6</h2>
        </section>
      </main>
    </section>
  );
};

export default HorizontalPanels;