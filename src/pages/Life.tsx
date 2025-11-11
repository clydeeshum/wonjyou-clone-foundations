// src/pages/Life.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Navigation from "@/components/Navigation";
import ParticleOverlay from "@/components/ParticleOverlay";
import ProgressBar from "@/components/ProgressBar";
import AnimatedText from "@/components/AnimatedText";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Life = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !containerRef.current || !contentRef.current) return;

    const sections = gsap.utils.toArray(".life-section", contentRef.current);
    
    const tl = gsap.timeline({
      defaults: {
        ease: "none"
      },
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=5000",
        pin: true,
        scrub: true,
      }
    });

    sections.forEach((section: any, i) => {
      const panels = section.querySelectorAll(".life-panel");
      
      // Vertical scroll within each section
      tl.to(
        section,
        {
          y: section.clientHeight - section.scrollHeight,
          duration: panels.length * 0.5
        },
        "section-" + i
      );
      
      // Horizontal transition to next section
      if (sections[i + 1]) {
        tl.to(contentRef.current, {
          xPercent: -100 * (i + 1)
        });
      }
    });

    // Button navigation
    const buttons = gsap.utils.toArray(".section-btn");
    buttons.forEach((btn: any, i) => {
      btn.addEventListener("click", () => {
        gsap.to(window, {
          scrollTo: {
            y: tl.scrollTrigger?.labelToScroll("section-" + i) || 0
          },
          ease: "power1.inOut"
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ProgressBar />
      <Navigation />
      {/* <ParticleOverlay /> */}
      
      <div ref={wrapperRef} className="w-full h-screen flex flex-col">
        <div 
          ref={containerRef} 
          className="w-full md:w-[600px] h-[500px] mx-auto no-overflow"
        >
          <div 
            ref={contentRef} 
            className="flex flex-nowrap w-full h-full"
          >
            {/* Section 1 - Journey */}
            <section className="life-section w-full h-full flex-shrink-0">
              <div className="life-panel w-full h-full min-h-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20">
                <AnimatedText animationType="stagger">
                  <h3 className="text-2xl md:text-3xl font-bold text-center">The Journey Begins</h3>
                </AnimatedText>
              </div>
              <div className="life-panel w-full h-full min-h-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/30">
                <AnimatedText animationType="stagger" delay={0.1}>
                  <h3 className="text-2xl md:text-3xl font-bold text-center">First Steps</h3>
                </AnimatedText>
              </div>
              <div className="life-panel w-full h-full min-h-0 flex items-center justify-center bg-gradient-to-br from-primary/30 to-primary/40">
                <AnimatedText animationType="stagger" delay={0.2}>
                  <h3 className="text-2xl md:text-3xl font-bold text-center">Discovering Passions</h3>
                </AnimatedText>
              </div>
            </section>

            {/* Section 2 - Growth */}
            <section className="life-section w-full h-full flex-shrink-0">
              <div className="life-panel w-full h-full min-h-0 flex items-center justify-center bg-gradient-to-br from-secondary/10 to-secondary/20">
                <AnimatedText animationType="stagger">
                  <h3 className="text-2xl md:text-3xl font-bold text-center">Learning & Growth</h3>
                </AnimatedText>
              </div>
              <div className="life-panel w-full h-full min-h-0 flex items-center justify-center bg-gradient-to-br from-secondary/20 to-secondary/30">
                <AnimatedText animationType="stagger" delay={0.1}>
                  <h3 className="text-2xl md:text-3xl font-bold text-center">Overcoming Challenges</h3>
                </AnimatedText>
              </div>
              <div className="life-panel w-full h-full min-h-0 flex items-center justify-center bg-gradient-to-br from-secondary/30 to-secondary/40">
                <AnimatedText animationType="stagger" delay={0.2}>
                  <h3 className="text-2xl md:text-3xl font-bold text-center">Building Confidence</h3>
                </AnimatedText>
              </div>
            </section>

            {/* Section 3 - Impact */}
            <section className="life-section w-full h-full flex-shrink-0">
              <div className="life-panel w-full h-full min-h-0 flex items-center justify-center bg-gradient-to-br from-accent/10 to-accent/20">
                <AnimatedText animationType="stagger">
                  <h3 className="text-2xl md:text-3xl font-bold text-center">Making an Impact</h3>
                </AnimatedText>
              </div>
              <div className="life-panel w-full h-full min-h-0 flex items-center justify-center bg-gradient-to-br from-accent/20 to-accent/30">
                <AnimatedText animationType="stagger" delay={0.1}>
                  <h3 className="text-2xl md:text-3xl font-bold text-center">Connecting with Others</h3>
                </AnimatedText>
              </div>
              <div className="life-panel w-full h-full min-h-0 flex items-center justify-center bg-gradient-to-br from-accent/30 to-accent/40">
                <AnimatedText animationType="stagger" delay={0.2}>
                  <h3 className="text-2xl md:text-3xl font-bold text-center">Leaving a Legacy</h3>
                </AnimatedText>
              </div>
            </section>

            {/* Section 4 - Reflection */}
            <section className="life-section w-full h-full flex-shrink-0">
              <div className="life-panel w-full h-full min-h-0 flex items-center justify-center bg-gradient-to-br from-muted/10 to-muted/20">
                <AnimatedText animationType="stagger">
                  <h3 className="text-2xl md:text-3xl font-bold text-center">Reflection & Wisdom</h3>
                </AnimatedText>
              </div>
              <div className="life-panel w-full h-full min-h-0 flex items-center justify-center bg-gradient-to-br from-muted/20 to-muted/30">
                <AnimatedText animationType="stagger" delay={0.1}>
                  <h3 className="text-2xl md:text-3xl font-bold text-center">Sharing Knowledge</h3>
                </AnimatedText>
              </div>
              <div className="life-panel w-full h-full min-h-0 flex items-center justify-center bg-gradient-to-br from-muted/30 to-muted/40">
                <AnimatedText animationType="stagger" delay={0.2}>
                  <h3 className="text-2xl md:text-3xl font-bold text-center">New Beginnings</h3>
                </AnimatedText>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Additional section after the animated squares */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-4xl text-center">
          <AnimatedText animationType="fade">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Life is a Continuous Journey</h2>
          </AnimatedText>
          <AnimatedText animationType="slide" delay={0.3}>
            <p className="text-xl text-muted-foreground mb-12">
              Every experience shapes us, every challenge makes us stronger, and every connection 
              adds meaning to our existence. Embrace the journey with open arms.
            </p>
          </AnimatedText>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-border rounded-lg">
              <AnimatedText animationType="stagger">
                <h3 className="text-2xl font-bold mb-4">Embrace Change</h3>
              </AnimatedText>
              <AnimatedText animationType="slide" delay={0.2}>
                <p className="text-muted-foreground">
                  Life is constantly evolving, and so should we. Adaptability is key to thriving.
                </p>
              </AnimatedText>
            </div>
            <div className="p-6 border border-border rounded-lg">
              <AnimatedText animationType="stagger">
                <h3 className="text-2xl font-bold mb-4">Find Purpose</h3>
              </AnimatedText>
              <AnimatedText animationType="slide" delay={0.2}>
                <p className="text-muted-foreground">
                  Discover what drives you and pursue it with passion and dedication.
                </p>
              </AnimatedText>
            </div>
            <div className="p-6 border border-border rounded-lg">
              <AnimatedText animationType="stagger">
                <h3 className="text-2xl font-bold mb-4">Create Connections</h3>
              </AnimatedText>
              <AnimatedText animationType="slide" delay={0.2}>
                <p className="text-muted-foreground">
                  Build meaningful relationships that enrich your life and the lives of others.
                </p>
              </AnimatedText>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Life;