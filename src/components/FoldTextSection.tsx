import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FoldTextSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquees = document.querySelectorAll('.marquee-fold');
    
    marquees.forEach((el, index) => {
      const track = el.querySelector('.track-fold');
      const [x, xEnd] = (index % 2 === 0) ? [-500, -1500] : [-500, 0];
      
      gsap.fromTo(track, { x }, {
        x: xEnd,
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1,
          start: "top bottom",
          end: "bottom top"
        }
      });
    });

    const centerContent = document.getElementById('center-content-fold');
    const centerFold = document.getElementById('center-fold-fold');
    const foldsContent = Array.from(document.querySelectorAll('.fold-content-fold'));

    let targetScroll = -(document.documentElement.scrollTop || document.body.scrollTop);
    let currentScroll = targetScroll;

    const tick = () => {
      if (!centerContent || !centerFold) return;
      
      const overflowHeight = centerContent.clientHeight - centerFold.clientHeight;
      targetScroll = -(document.documentElement.scrollTop || document.body.scrollTop);
      currentScroll += (targetScroll - currentScroll) * 0.1;
      
      foldsContent.forEach(content => {
        (content as HTMLElement).style.transform = `translateY(${currentScroll}px)`;
      });
      
      requestAnimationFrame(tick);
    };
    tick();
  }, []);

  const MarqueeText = () => (
    <>
      <div className="marquee-fold">
        <div className="track-fold">
          Creators.Creators.<span className="text-foreground font-black">Creators.</span>Creators.Creators.
        </div>
      </div>
      <div className="marquee-fold">
        <div className="track-fold">
          Thinkers.Thinkers.<span className="text-foreground font-black">Thinkers.</span>Thinkers.Thinkers.
        </div>
      </div>
      <div className="marquee-fold">
        <div className="track-fold">
          Innovators.Innovators.<span className="text-foreground font-black">Innovators.</span>Innovators.
        </div>
      </div>
      <div className="marquee-fold">
        <div className="track-fold">
          Rebels.Rebels.<span className="text-foreground font-black">Rebels.</span>Rebels.Rebels.
        </div>
      </div>
    </>
  );

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="wrapper-3d-fold">
        <div className="fold-fold fold-top-fold">
          <div className="fold-align-fold">
            <div className="fold-content-fold">
              <MarqueeText />
            </div>
          </div>
        </div>
        <div className="fold-fold fold-center-fold" id="center-fold-fold">
          <div className="fold-align-fold">
            <div className="fold-content-fold" id="center-content-fold">
              <MarqueeText />
            </div>
          </div>
        </div>
        <div className="fold-fold fold-bottom-fold">
          <div className="fold-align-fold">
            <div className="fold-content-fold">
              <MarqueeText />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoldTextSection;
