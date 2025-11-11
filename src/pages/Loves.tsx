import { useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Navigation from "@/components/Navigation";
import ParticleOverlay from '@/components/ParticleOverlay';
import ProgressBar from "@/components/ProgressBar";
import './Thoughts.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Loves = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsContainerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Section 1: Horizontal scroll panels
    const panelsSection = document.querySelector("#panels");
    const panelsContainer = document.querySelector("#panels-container");
    
    if (!panelsContainer) return;
    
    const scrollFunc = ScrollTrigger.getScrollFunc(window);
    
    // Type assertion for TypeScript
    type HTMLElementWithHref = HTMLElement & { href?: string };

    const anchorClickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const target = e.currentTarget;
      const href = target.getAttribute('href');
      if (!href) return;
      
      const targetElem = document.querySelector(href);
      if (!(targetElem instanceof HTMLElement)) return;
      
      let y: number = 0;
      
      if (panelsContainer && targetElem.parentElement && panelsContainer.isSameNode(targetElem.parentElement)) {
        const panels = Array.from(panelsContainer.querySelectorAll('.panel'));
        const panelIndex = panels.indexOf(targetElem);
        if (panelIndex === -1) return;
        
        const totalWidth = panels.reduce((sum, panel) => sum + (panel as HTMLElement).offsetWidth, 0);
        const viewportWidth = window.innerWidth;
        const maxScroll = Math.max(0, totalWidth - viewportWidth);
        
        y = Math.min(panelIndex * viewportWidth, maxScroll);
      } else {
        y = (targetElem as HTMLElement).offsetTop;
      }
      
      gsap.to(window, {
        scrollTo: { y, autoKill: false },
        onUpdate: ScrollTrigger.update,
        duration: 1
      });
    };
    
    const anchors = document.querySelectorAll<HTMLAnchorElement>('a.anchor');
    const clickHandlers: { element: Element; handler: (e: Event) => void }[] = [];
    
    anchors.forEach(anchor => {
      const handler = (e: Event) => {
        if (e instanceof MouseEvent) {
          anchorClickHandler(e as unknown as MouseEvent<HTMLAnchorElement>);
        }
      };
      anchor.addEventListener('click', handler);
      clickHandlers.push({ element: anchor, handler });
    });

    const panels = gsap.utils.toArray(".panel") as HTMLElement[];
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
            duration: { min: 0.1, max: 0.1 }
          },
          end: () => `+=${(panelsContainer as HTMLElement).offsetWidth - window.innerWidth}`
        }
      });
    }

    // Section 2: Pin and fade headings
    const trigger = document.querySelector('.trigger');
    const pinElement = document.querySelector('.pin');
    
    if (trigger && pinElement) {
      ScrollTrigger.create({
        trigger: trigger,
        pin: pinElement,
        start: 'top top',
        end: 'bottom bottom',
      });

      const headings = gsap.utils.toArray("h2") as HTMLElement[];
      gsap.set(headings, { y: 200, opacity: 0 });

      headings.forEach((heading, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".trigger",
            start: () => `top+=${i * window.innerHeight} top`,
            end: () => `top+=${(i + 1) * window.innerHeight} top`,
            scrub: true
          }
        });
        
        tl.to(heading, { y: 0, opacity: 1 })
          .to(heading, { y: -200, opacity: 0 }, "+=1");
      });
    }

    return () => {
      // Cleanup event listeners
      clickHandlers.forEach(({ element, handler }) => {
        element.removeEventListener('click', handler);
      });
      
      // Kill all ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Kill the tween if it exists
      if (tweenRef.current) {
        tweenRef.current.kill();
        tweenRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ProgressBar />
      <Navigation />
      {/* <ParticleOverlay /> */}
      
      {/* Section 1: Horizontal Scroll Panels */}
      <section>
        <div id="page" className="site">
          <div id="feather" className="feather"></div>


          <main id="content" className="site-content" role="main">
            <section id="intro" className="description panel min-h-screen flex flex-col justify-center">
              <div className="container mx-auto px-6 text-center">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
                  Anchor navigation, <span className="text-primary">ScrollTrigger</span>
                </h1>
                <div className="scroll-down mt-12 flex flex-col items-center">
                  <span className="text-muted-foreground mb-2">Scroll down</span>
                  <div className="arrow w-6 h-6 border-r-2 border-b-2 border-muted-foreground rotate-45 animate-bounce"></div>
                </div>
              </div>
            </section>

            <section id="panels">
              <div id="panels-container" style={{width: '500%'}}>
                <article id="panel-1" className="panel full-screen green">
                  <div className="container mx-auto px-6 h-full flex items-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                      <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-64">
                        <div className="text-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
                          <p className="mt-4 text-muted-foreground">Image Placeholder</p>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <h2 className="panel__number text-6xl font-black text-primary mb-6">1</h2>
                        <div className="panels-navigation text-right mt-auto">
                          <div className="nav-panel" data-sign="plus">
                            <a href="#panel-2" className="anchor inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors">
                              Next
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>

                <article id="panel-2" className="panel full-screen">
                  <div className="container mx-auto px-6 h-full flex items-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                      <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-64">
                        <div className="text-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
                          <p className="mt-4 text-muted-foreground">Image Placeholder</p>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <h2 className="panel__number text-6xl font-black text-secondary mb-6">2</h2>
                        <div className="panels-navigation flex justify-between mt-auto">
                          <div className="nav-panel" data-sign="minus">
                            <a href="#panel-1" className="anchor inline-block bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/80 transition-colors">
                              Prev
                            </a>
                          </div>
                          <div className="nav-panel" data-sign="plus">
                            <a href="#panel-3" className="anchor inline-block bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/80 transition-colors">
                              Next
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>

                <article id="panel-3" className="panel full-screen purple">
                  <div className="container mx-auto px-6 h-full flex items-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                      <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-64">
                        <div className="text-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
                          <p className="mt-4 text-muted-foreground">Image Placeholder</p>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <h2 className="panel__number text-6xl font-black text-accent mb-6">3</h2>
                        <div className="panels-navigation flex justify-between mt-auto">
                          <div className="nav-panel" data-sign="minus">
                            <a href="#panel-2" className="anchor inline-block bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/80 transition-colors">
                              Prev
                            </a>
                          </div>
                          <div className="nav-panel" data-sign="plus">
                            <a href="#panel-4" className="anchor inline-block bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/80 transition-colors">
                              Next
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>

                <article id="panel-4" className="panel full-screen">
                  <div className="container mx-auto px-6 h-full flex items-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                      <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-64">
                        <div className="text-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
                          <p className="mt-4 text-muted-foreground">Image Placeholder</p>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <h2 className="panel__number text-6xl font-black text-primary mb-6">4</h2>
                        <div className="panels-navigation flex justify-between mt-auto">
                          <div className="nav-panel" data-sign="minus">
                            <a href="#panel-3" className="anchor inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors">
                              Prev
                            </a>
                          </div>
                          <div className="nav-panel" data-sign="plus">
                            <a href="#panel-5" className="anchor inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors">
                              Next
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>

                <article id="panel-5" className="panel full-screen orange">
                  <div className="container mx-auto px-6 h-full flex items-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                      <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-64">
                        <div className="text-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
                          <p className="mt-4 text-muted-foreground">Image Placeholder</p>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <h2 className="panel__number text-6xl font-black text-secondary mb-6">5</h2>
                        <div className="panels-navigation text-right mt-auto">
                          <div className="nav-panel" data-sign="minus">
                            <a href="#panel-4" className="anchor inline-block bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/80 transition-colors">
                              Prev
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </section>

            <section id="panel-6" className="panel min-h-screen flex items-center justify-center">
              <h2 className="panel__number text-6xl font-black text-accent">6</h2>
            </section>
          </main>
        </div>
      </section>

      {/* Section 2: Pin and Fade Headings */}
      <section>
        <div className="spacer"></div>
        <section className="trigger">
          <div className="pin">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">What's Going On</h2>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Good Vibrations</h2>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Truth Hurts</h2>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Cosmic Dancer</h2>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Summertime Blues</h2>
          </div>
        </section>
        <div className="spacer"></div>
      </section>
    </div>
  );
};

export default Loves;