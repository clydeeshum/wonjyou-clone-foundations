import { useEffect, useRef } from "react";
import "./ThoughtsSlider.css";

interface SliderItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  button: string;
}

const ThoughtsSlider = () => {
  const sliderRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const activate = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!sliderRef.current) return;
      
      const items = sliderRef.current.querySelectorAll('.item');
      
      if (target.closest('.next') && items.length > 0) {
        sliderRef.current.append(items[0]);
      }
      
      if (target.closest('.prev') && items.length > 0) {
        sliderRef.current.prepend(items[items.length - 1]);
      }
    };

    document.addEventListener('click', activate, false);
    
    return () => {
      document.removeEventListener('click', activate, false);
    };
  }, []);

  const items: SliderItem[] = [
    {
      id: 1,
      title: "Lossless Youths",
      description: "Exploring the intersection of technology and human experience through creative coding and interactive design.",
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80",
      button: "Read More"
    },
    {
      id: 2,
      title: "Estrange Bond",
      description: "The delicate balance between human connection and digital isolation in the modern age.",
      imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80",
      button: "Read More"
    },
    {
      id: 3,
      title: "The Gate Keeper",
      description: "Navigating the boundaries between virtual and physical realities in contemporary design.",
      imageUrl: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200&q=80",
      button: "Read More"
    },
    {
      id: 4,
      title: "Last Trace Of Us",
      description: "Examining the digital footprints we leave behind and their impact on future generations.",
      imageUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&q=80",
      button: "Read More"
    },
    {
      id: 5,
      title: "Urban Decay",
      description: "The beauty in imperfection and the stories told through weathered digital landscapes.",
      imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
      button: "Read More"
    },
    {
      id: 6,
      title: "The Migration",
      description: "The continuous evolution of digital spaces and our journey through them.",
      imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&q=80",
      button: "Read More"
    }
  ];

  return (
    <main>
      <ul className="slider" ref={sliderRef}>
        {items.map((item) => (
          <li 
            key={item.id} 
            className="item"
            style={{ 
              backgroundImage: `url('${item.imageUrl}')`
            }}
          >
            <div className="content">
              <h2 className="title">{item.title}</h2>
              <p className="description">{item.description}</p>
              <button>{item.button}</button>
            </div>
          </li>
        ))}
      </ul>
      <nav className="nav">
        <button 
          className="btn prev"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button 
          className="btn next"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </nav>
    </main>
  );
};

export default ThoughtsSlider;