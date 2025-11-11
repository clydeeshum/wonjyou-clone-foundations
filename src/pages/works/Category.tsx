import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ParticleOverlay from "@/components/ParticleOverlay";
import ProgressBar from "@/components/ProgressBar";
import StackedCards from "./StackedCards";
import MasonryGrid from "./MasonryGrid";
import HorizontalScrollGallery from "./HorizontalScrollGallery";

const Category = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { title, description, images } = location.state || {};
  
  useEffect(() => {
    if (!title) {
      // Redirect to works page if no category data
      navigate("/works");
      return;
    }
  }, [title, navigate]);

  if (!title) {
    return null;
  }

  // Determine which display style to use based on title
  const renderCategoryStyle = () => {
    if (title === "Circular") {
      return <StackedCards title={title} description={description} images={images} />;
    } else if (title === "Wave") {
      return <MasonryGrid title={title} description={description} images={images} />;
    } else if (title === "Grid") {
      return <HorizontalScrollGallery title={title} description={description} images={images} />;
    } else {
      // Default grid style
      return (
        <div className="min-h-screen bg-background text-foreground relative">
          <ProgressBar />
          <ParticleOverlay />
          <Navigation />
          
          <section className="min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
                  {title} <span className="text-primary">Gallery</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  {description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {(images || []).map((img: string, i: number) => (
                  <div 
                    key={i}
                    className="group relative overflow-hidden rounded-lg aspect-[3/4] cursor-pointer"
                  >
                    <div 
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${img}?w=600&h=800&fit=crop)` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div>
                          <h3 className="text-white text-xl font-bold">{title} #{i + 1}</h3>
                          <p className="text-white/80 text-sm mt-1">Photography Collection</p>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 text-white font-bold bg-black/50 px-2 py-1 rounded text-sm">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      );
    }
  };

  return renderCategoryStyle();
};

export default Category;