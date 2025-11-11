import React from "react";
import Navigation from "@/components/Navigation";
import ProgressBar from "@/components/ProgressBar";
import GalleryCarousel from "@/components/work/GalleryCarousel";
import ProductivitySlider from "@/components/work/ProductivitySlider";

const Works: React.FC = () => {
  const handleGalleryComplete = () => {
    console.log("Gallery completed - scrolling to productivity section");
  };

  return (
    <div className="work-wrapper bg-background text-foreground min-h-screen">
      <ProgressBar />
      <Navigation />
      
      {/* Gallery Carousel Section - Full height with scroll trigger */}
      <div className="gallery-section h-[100vh]">
        <GalleryCarousel onSectionComplete={handleGalleryComplete} />
      </div>
      
      {/* Productivity Slider Section */}
      <div className="productivity-section min-h-[100vh]">
        <ProductivitySlider />
      </div>
    </div>
  );
};

export default Works;