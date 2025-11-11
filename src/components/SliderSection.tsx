import { useEffect, useRef } from "react";
import "./SliderSection.css";

const SliderSection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activate = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!sliderRef.current) return;
      
      const items = sliderRef.current.querySelectorAll('.item');
      
      if (target.matches('.next') && items.length > 0) {
        sliderRef.current.append(items[0]);
      }
      
      if (target.matches('.prev') && items.length > 0) {
        sliderRef.current.prepend(items[items.length - 1]);
      }
    };

    document.addEventListener('click', activate, false);
    
    return () => {
      document.removeEventListener('click', activate, false);
    };
  }, []);

  const items = [
    {
      id: 1,
      title: "Ocean",
      description: "The ocean is a vast body of salt water that covers over 70% of the Earth's surface. It is home to countless species of marine life and plays a crucial role in regulating the planet's climate.",
      button: "Explore"
    },
    {
      id: 2,
      title: "Forest",
      description: "Forests cover about 31% of the world's land area and are home to more than 80% of terrestrial biodiversity. They play a vital role in producing oxygen and absorbing carbon dioxide.",
      button: "Discover"
    },
    {
      id: 3,
      title: "Mountains",
      description: "Mountains cover about 27% of the Earth's surface and are home to nearly half of the world's biodiversity hotspots. They are the source of most of the world's fresh water.",
      button: "Climb"
    },
    {
      id: 4,
      title: "Desert",
      description: "Deserts cover about one-third of the Earth's land surface. Despite their harsh conditions, they are home to a variety of specially adapted plants and animals.",
      button: "Journey"
    },
    {
      id: 5,
      title: "Sky",
      description: "The sky appears blue during the day due to the scattering of sunlight by molecules in Earth's atmosphere. At night, it reveals countless stars and celestial bodies.",
      button: "Soar"
    }
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative">
      <div className="main w-full h-full">
        <div className="slider" ref={sliderRef}>
          {items.map((item, index) => (
            <div 
              key={item.id} 
              className="item"
              style={{ 
                backgroundImage: `url(https://assets.codepen.io/33787/${item.title.toLowerCase()}.jpg)` 
              }}
            >
              <div className="content">
                <div className="title">{item.title}</div>
                <div className="description">{item.description}</div>
                <button>{item.button}</button>
              </div>
            </div>
          ))}
        </div>
        <nav className="nav">
          <button className="btn prev">{"<"}</button>
          <button className="btn next">{">"}</button>
        </nav>
      </div>
    </section>
  );
};

export default SliderSection;