import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tighter hover:text-primary transition-colors duration-300"
        >
          W
        </Link>

        <div className="flex items-center gap-8">
          <Link
            to="/life"
            className="text-sm tracking-wide hover:text-primary transition-colors duration-300"
          >
            Life
          </Link>
          <Link
            to="/loves"
            className="text-sm tracking-wide hover:text-primary transition-colors duration-300"
          >
            Loves
          </Link>
          <Link
            to="/works"
            className="text-sm tracking-wide hover:text-primary transition-colors duration-300"
          >
            Works
          </Link>
          <Link
            to="/thoughts"
            className="text-sm tracking-wide hover:text-primary transition-colors duration-300"
          >
            Thoughts
          </Link>
          <Link
            to="/contact"
            className="text-sm tracking-wide hover:text-primary transition-colors duration-300"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
