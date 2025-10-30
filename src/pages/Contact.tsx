import Navigation from "@/components/Navigation";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-fade-in">Contact</h1>
        <p className="text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Content coming soon...
        </p>
      </main>
    </div>
  );
};

export default Contact;
