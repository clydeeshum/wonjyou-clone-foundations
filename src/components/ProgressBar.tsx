import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProgressBar = () => {
  useEffect(() => {
    gsap.to(".progress-bar", {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5
      }
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-border z-50">
      <div className="progress-bar h-full bg-primary w-0" />
    </div>
  );
};

export default ProgressBar;
