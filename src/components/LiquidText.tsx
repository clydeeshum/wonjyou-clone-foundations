import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LiquidTextProps {
  text: string;
  className?: string;
}

const LiquidText = ({ text, className = "" }: LiquidTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(".liquid-char");

    // Add hover effect to each character
    chars.forEach((char) => {
      char.addEventListener("mouseenter", () => {
        gsap.to(char, {
          duration: 0.3,
          scale: 1.5,
          y: -10,
          rotation: gsap.utils.random(-10, 10),
          ease: "elastic.out(1, 0.5)",
        });
      });

      char.addEventListener("mouseleave", () => {
        gsap.to(char, {
          duration: 0.5,
          scale: 1,
          y: 0,
          rotation: 0,
          ease: "elastic.out(1, 0.3)",
        });
      });
    });

    return () => {
      chars.forEach((char) => {
        char.removeEventListener("mouseenter", () => {});
        char.removeEventListener("mouseleave", () => {});
      });
    };
  }, [text]);

  return (
    <div ref={containerRef} className={className}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="liquid-char inline-block cursor-pointer transition-all duration-300"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};

export default LiquidText;