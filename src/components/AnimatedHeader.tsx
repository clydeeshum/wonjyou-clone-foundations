import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedHeader: React.FC<{ text: string }> = ({ text }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathsRef = useRef<SVGElement[]>([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Get all paths in the SVG
    const paths = Array.from(svg.querySelectorAll('path, polygon')) as SVGElement[];
    pathsRef.current = paths;

    // Initialize paths with random positions and rotations
    paths.forEach((path, i) => {
      const randomX = (Math.random() - 0.5) * 1000;
      const randomY = (Math.random() - 0.5) * 1000;
      const randomRotation = (Math.random() - 0.5) * 720;
      
      gsap.set(path, {
        x: randomX,
        y: randomY,
        rotation: randomRotation,
        scale: 0,
        opacity: 0
      });
    });

    // Animate paths in staggered fashion
    const staggerValue = 0.0125;
    const duration = 0.75;

    gsap.to(paths, {
      duration: duration,
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      ease: "power4.inOut",
      stagger: staggerValue
    });

    // Set up hover effects for individual paths
    const handlePathMouseEnter = (e: MouseEvent) => {
      const target = e.target as SVGElement;
      gsap.to(target, {
        scale: 1.2,
        rotation: 15,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handlePathMouseLeave = (e: MouseEvent) => {
      const target = e.target as SVGElement;
      gsap.to(target, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Add event listeners to each path
    paths.forEach(path => {
      path.addEventListener('mouseenter', handlePathMouseEnter);
      path.addEventListener('mouseleave', handlePathMouseLeave);
    });

    return () => {
      paths.forEach(path => {
        path.removeEventListener('mouseenter', handlePathMouseEnter);
        path.removeEventListener('mouseleave', handlePathMouseLeave);
      });
    };
  }, [text]);

  return (
    <figure className="animated-header-figure">
      <svg 
        ref={svgRef}
        x="0px" 
        y="0px" 
        viewBox="0 0 883 105.2" 
        xmlSpace="preserve" 
        overflow="visible"
        className="animated-header-svg"
      >
        <polygon points="359.9,49.6 359.8,49.7 359.9,49.8 "/>
        <polygon points="28,0 10.8,0 28,9 "/>
        <polygon points="28,12.6 0,46 0,51.9 28,48.9 "/>
        <polygon points="0.8,105 28,105 28,74.7 20.3,69.7 "/>
        <polygon points="28,9 10.8,0 0,0 0,46 28,12.6 "/>
        <polygon points="0,51.9 0,57.3 20,69.8 20,69.8 20,69.8 28,74.7 28,48.9 "/>
        <polygon points="0,57.3 0,105 0.8,105 20.1,69.7 "/>
        <polygon points="89.7,40.6 61,25.9 38,46 38,47.8 91,41.9 "/>
        <polygon points="89.7,40.6 68.4,19.4 61,25.9 "/>
        <polygon points="99,41 126,37.9 126,30.3 99,0 99,0 "/>
        <polygon points="38,47.8 38,48.9 103.1,63.5 98.9,49.8 91,41.9 "/>
        <polygon points="68.4,19.3 49.2,0 38,0 38,14.1 61,25.8 "/>
        <polygon points="38,48.9 38,80.9 66,98.3 66,55.5 115.2,105 115.8,105 103.1,63.4 "/>
        <polygon points="61,25.9 38,14.1 38,46 "/>
        <polygon points="38,105 66,105 66,98.3 38,80.9 "/>
        <polygon points="126,0 99,0 126,30.3 "/>
        <polygon points="99,49.8 102.9,63.5 126,68.7 126,59.4 99,45.3 "/>
        <polygon points="99,41 99,45.3 126,59.4 126,37.9 "/>
        <polygon points="115.8,105 126,105 126,68.7 102.8,63.4 "/>
        <path d="M225.8,74.2l-12.6,24.5c7.5,4.1,16.1,6.5,25.3,6.5c2.2,0,4.3-0.1,6.4-0.4L237,77.7C233,77.5,229.1,76.2,225.8,74.2z"/>
        <path d="M213.8,55.7l-20.8,23c4.8,8.4,11.8,15.4,20.3,20.1l12.6-24.5C219.3,70.3,214.7,63.5,213.8,55.7z"/>
        <path d="M238.5,77.8c-0.5,0-1,0-1.4,0l7.8,27.1c8.7-1,16.7-4.2,23.6-8.9l-14.6-23.3C249.5,75.8,244.3,77.8,238.5,77.8z"/>
        <path d="M251.5,31.3c6.7,4.1,11.3,11.2,11.9,19.4l27.5,1.5c-0.1-12.4-4.6-23.9-12-32.8L251.5,31.3z"/>
        <path d="M263.6,52.7c0,8-3.8,15.2-9.8,19.8l14.6,23.3c13.6-9.4,22.6-25.2,22.6-43c0-0.2,0-0.4,0-0.6l-27.5-1.5 C263.5,51.4,263.6,52,263.6,52.7z"/>
        <path d="M227.3,30.3L212.7,7.1c-8.5,4.9-15.6,12.1-20.3,20.8L218.3,38C220.6,34.8,223.7,32.1,227.3,30.3z"/>
        <path d="M213.6,52.7c0-5.5,1.8-10.6,4.7-14.7l-25.9-10.2c-4,7.5-6.3,16-6.3,25c0,9.4,2.5,18.2,6.8,25.8l20.8-23 C213.6,54.7,213.6,53.7,213.6,52.7z"/>
        <path d="M238.5,27.7c3.6,0,7,0.8,10.1,2.1l12.5-24.4c-6.8-3.3-14.5-5.1-22.6-5.1c-9.4,0-18.2,2.5-25.8,6.8l14.6,23 C230.7,28.6,234.5,27.7,238.5,27.7z"/>
        <path d="M251.5,31.3L279,19.4c-4.9-5.9-11-10.7-17.9-14.1l-12.5,24.4C249.6,30.2,250.6,30.7,251.5,31.3z"/>
        <polygon points="387,105 360,50 360,89.1 376.1,105 "/>
        <polygon points="387,29.5 360.8,0 360,0 360,49.6 387,30.8 "/>
        <polygon points="387,0 360.8,0 387,29.5 "/>
        <polygon points="359.9,49.8 359.8,49.7 336.6,65.6 360,89.1 360,50 "/>
        <polygon points="336.1,26 335.6,26.1 330.8,59.8 335.6,26.1 308.8,27.1 335.6,26.1 335.6,25.5 310.2,0 299,0 299,8.2 327,61.4 327,55.5 336.8,65.6 359.9,49.7 "/>
        <polygon points="360,50 360,50 360,50 387,105 387,105 387,30.8 360,49.6 360,49.8 "/>
        <polygon points="299,105 326.1,105 310.9,78.9 326.1,105 327,105 327,69.5 299,86.5 "/>
        <polygon points="299,52.7 299,86.5 327,69.5 327,65.1 299,36.4 "/>
        <polygon points="336.1,26 335.6,25.6 335.6,26.1 "/>
        <polygon points="299,8.2 299,36.4 327,65.1 327,61.4 "/>
        <polygon points="425,36 425,27.8 399.8,0 397,0 397,49.5 397,49.5 "/>
        <polygon points="425,76 397,76 397,105.2 425,80.3 "/>
        <polygon points="432.5,63 438.1,40 425,40 425,36 397.4,49.5 425,66.1 425,63 "/>
      </svg>
    </figure>
  );
};

export default AnimatedHeader;