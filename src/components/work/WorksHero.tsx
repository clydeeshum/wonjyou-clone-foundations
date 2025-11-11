import React from 'react';

const WorksHero = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto px-6 text-center mb-12">
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-6 animate-fade-in">
          WORKS
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground animate-fade-in max-w-3xl mx-auto" style={{ animationDelay: "0.2s" }}>
          Explore different photography styles through interactive galleries
        </p>
        <div className="mt-8 text-muted-foreground max-w-2xl mx-auto">
          <p className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Scroll or use the navigation to explore various photography arrangements. 
            Each pattern represents a unique category of photographic expression.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorksHero;
