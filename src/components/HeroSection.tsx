const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj4KICA8ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj4KICAgIDxmZVR1cmJ1bGVuY2UgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIiB0eXBlPSJmcmFjdGFsTm9pc2UiLz4KICAgIDxmZUNvbG9yTWF0cml4IHR5cGU9InNhdHVyYXRlIiB2YWx1ZXM9IjAiLz4KICA8L2ZpbHRlcj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9Ii4wNSIvPgo8L3N2Zz4=')] animate-grain" />
      
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-20">
        {/* Left side - Title */}
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter">
            <span className="block">Rebel</span>
            <span className="block">Entrepreneur</span>
            <span className="block">Disruptor</span>
            <span className="block">Designer</span>
          </h1>
        </div>

        {/* Right side - Description */}
        <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <p className="text-lg md:text-xl leading-relaxed">
            My passion is creating meaningful products for the world that solves real problems, 
            delights users and exceeds expectations.
          </p>
        </div>
      </div>

      {/* Large background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <h2 
          className="text-[20vw] font-black tracking-tighter text-primary opacity-20 select-none"
          style={{
            WebkitTextStroke: "2px currentColor",
            WebkitTextFillColor: "transparent",
          }}
        >
          WONJYOU
        </h2>
      </div>
    </section>
  );
};

export default HeroSection;
