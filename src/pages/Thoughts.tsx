import { useState } from "react";
import Navigation from "@/components/Navigation";
import ProgressBar from "@/components/ProgressBar";
import AnimatedText from "@/components/AnimatedText";
import "./Thoughts.css";

const Thoughts = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const thoughts = [
    {
      id: 1,
      title: "The Future of Web Development",
      excerpt: "Exploring the latest trends and technologies shaping the future of web development...",
      category: "tech",
      date: "2023-06-15",
    },
    {
      id: 2,
      title: "Mindfulness in the Digital Age",
      excerpt: "How to maintain mental wellness while navigating our hyperconnected world...",
      category: "life",
      date: "2023-05-22",
    },
    {
      id: 3,
      title: "Design Systems That Scale",
      excerpt: "Building robust design systems for enterprise-level applications...",
      category: "design",
      date: "2023-04-10",
    },
  ];

  const filteredThoughts =
    activeFilter === "all"
      ? thoughts
      : thoughts.filter((thought) => thought.category === activeFilter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProgressBar />
      <Navigation />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <AnimatedText animationType="fade">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Thoughts & Reflections</h1>
          </AnimatedText>
          
          <AnimatedText animationType="slide" delay={0.2}>
            <p className="text-xl text-muted-foreground mb-12">
              A collection of my thoughts on technology, design, and life. These are the ideas that 
              shape my perspective and influence my work.
            </p>
          </AnimatedText>

          <div className="flex gap-4 mb-12">
            {["all", "tech", "design", "life"].map((filter) => (
              <AnimatedText key={filter} animationType="scale" delay={0.1 * ["all", "tech", "design", "life"].indexOf(filter)}>
                <button
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    activeFilter === filter
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              </AnimatedText>
            ))}
          </div>

          <div className="space-y-8">
            {filteredThoughts.map((thought, index) => (
              <AnimatedText key={thought.id} animationType="fade" delay={0.1 * index}>
                <div className="p-6 border border-border rounded-lg hover:bg-muted/10 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {thought.title}
                    </h3>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {thought.date}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{thought.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
                      {thought.category}
                    </span>
                    <span className="text-primary group-hover:underline cursor-pointer">
                      Read more
                    </span>
                  </div>
                </div>
              </AnimatedText>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thoughts;