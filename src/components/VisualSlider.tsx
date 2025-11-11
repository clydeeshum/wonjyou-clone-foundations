import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './VisualSlider.css';

const VisualSlider = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null);
  const isTransitioningRef = useRef(false);
  
  // Single image instead of multiple slides
  const slide = {
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=80',
    title: 'ETHEREAL',
    description: 'Experience visual poetry'
  };

  useEffect(() => {
    if (!mountRef.current || !canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: false,
      alpha: false
    });
    
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Load texture
    const loader = new THREE.TextureLoader();
    loader.load(slide.url, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      textureRef.current = texture;
      
      // Initialize material with texture
      if (materialRef.current) {
        materialRef.current.uniforms.uTexture.value = texture;
      }
    });
    
    // Shader material for single image display
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: null },
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(
          mountRef.current.clientWidth, 
          mountRef.current.clientHeight
        )}
      },
      vertexShader: `
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uTime;
        uniform vec2 uResolution;
        varying vec2 vUv;
        
        void main() {
          // Adjust for aspect ratio
          vec2 uv = vUv;
          
          // Add subtle animation
          vec2 wave = vec2(
            sin(uv.y * 10.0 + uTime * 0.5) * 0.002,
            cos(uv.x * 8.0 + uTime * 0.7) * 0.002
          );
          
          uv += wave;
          
          // Sample texture
          vec4 textureColor = texture2D(uTexture, uv);
          
          // Add subtle glow
          float glow = sin(uTime * 2.0) * 0.02 + 0.02;
          textureColor.rgb += glow;
          
          gl_FragColor = textureColor;
        }
      `
    });

    materialRef.current = material;
    
    const geometry = new THREE.PlaneGeometry(2, 2);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    
    camera.position.z = 1;

    // Animation loop
    let animationId: number;
    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);
      
      // Update time uniform
      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value = time * 0.001;
      }
      
      renderer.render(scene, camera);
    };
    
    animate(0);

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      renderer.setSize(width, height);
      
      if (material.uniforms.uResolution) {
        material.uniforms.uResolution.value.set(width, height);
      }
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (textureRef.current) {
        textureRef.current.dispose();
      }
    };
  }, []);

  // Handle user interaction to change image
  const handleUserInteraction = () => {
    if (isTransitioningRef.current) return;
    
    isTransitioningRef.current = true;
    
    // Simple reload of the same image to show change
    if (materialRef.current && textureRef.current) {
      // Dispose of the old texture
      textureRef.current.dispose();
      
      // Load the same image again
      const loader = new THREE.TextureLoader();
      loader.load(slide.url, (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        textureRef.current = texture;
        
        // Update material with new texture
        if (materialRef.current) {
          materialRef.current.uniforms.uTexture.value = texture;
        }
        
        // Reset transitioning flag
        isTransitioningRef.current = false;
      });
    } else {
      isTransitioningRef.current = false;
    }
  };

  return (
    <section 
      ref={mountRef}
      className="visual-slider-container"
      onClick={handleUserInteraction}
      onTouchStart={handleUserInteraction}
      style={{
        position: 'relative',
        width: '100%',
        height: '80vh', // Reduced from full height
        maxWidth: '1200px', // Added max width
        margin: '2rem auto', // Center the card
        overflow: 'hidden',
        borderRadius: '1rem', // Add rounded corners
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)', // Add shadow
        cursor: 'pointer'
      }}
    >
      <canvas 
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
      
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        zIndex: 10,
        pointerEvents: 'none',
        textShadow: '0 2px 10px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{
          fontSize: 'clamp(1.5rem, 5vw, 3rem)', // Reduced font size
          fontWeight: 900,
          letterSpacing: '-0.05em',
          marginBottom: '1rem',
          textAlign: 'center',
          textTransform: 'uppercase',
        }}>
          {slide.title}
        </h2>
        <p style={{
          fontSize: 'clamp(0.8rem, 2vw, 1rem)', // Reduced font size
          maxWidth: '30rem',
          textAlign: 'center',
          padding: '0 1rem',
          opacity: 0.9
        }}>
          {slide.description}
        </p>
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.8rem',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        Tap to refresh image
      </div>
    </section>
  );
};

export default VisualSlider;