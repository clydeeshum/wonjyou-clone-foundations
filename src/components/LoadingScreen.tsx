import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter">
          <span className="inline-block animate-float">L</span>
          <span className="inline-block animate-float" style={{ animationDelay: "0.1s" }}>O</span>
          <span className="inline-block animate-float" style={{ animationDelay: "0.2s" }}>A</span>
          <span className="inline-block animate-float" style={{ animationDelay: "0.3s" }}>D</span>
          <span className="inline-block animate-float" style={{ animationDelay: "0.4s" }}>I</span>
          <span className="inline-block animate-float" style={{ animationDelay: "0.5s" }}>N</span>
          <span className="inline-block animate-float" style={{ animationDelay: "0.6s" }}>G</span>
        </h2>
        <div className="text-8xl font-bold text-primary">{progress}%</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
