import Navigation from "@/components/Navigation";
import ParticleOverlay from "@/components/ParticleOverlay";
import ProgressBar from "@/components/ProgressBar";
import ScaleSection from "@/components/ScaleSection";
import FadeCascadeSection from "@/components/FadeCascadeSection";
import RotateSection from "@/components/RotateSection";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ProgressBar />
      <ParticleOverlay />
      <Navigation />
      
      <section className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-[15vw] font-black tracking-tighter leading-none animate-fade-in">
            CONTACT
          </h1>
          <p className="text-2xl text-muted-foreground mt-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Let's create something together
          </p>
        </div>
      </section>

      <ScaleSection
        title="CONNECT"
        description="Always open to interesting conversations and collaborations"
        bgColor="bg-primary/5"
      />

      <FadeCascadeSection
        title="REACH OUT"
        items={[
          { label: "EMAIL", value: "hello@wonjyou.com" },
          { label: "TWITTER", value: "@wonjyou" },
          { label: "LINKEDIN", value: "/in/wonjyou" },
          { label: "INSTAGRAM", value: "@wonjyou" }
        ]}
      />

      <RotateSection
        title="COLLABORATE"
        subtitle="Let's build something amazing together"
      />

      <section className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-6xl font-bold mb-8">GET IN TOUCH</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Whether you have a project in mind, want to collaborate, or just want to say hello, 
            I'd love to hear from you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 border border-border rounded-lg hover:border-primary transition-colors">
              <h3 className="text-2xl font-bold mb-4">PROJECTS</h3>
              <p className="text-muted-foreground">Interested in working together</p>
            </div>
            <div className="p-8 border border-border rounded-lg hover:border-primary transition-colors">
              <h3 className="text-2xl font-bold mb-4">SPEAKING</h3>
              <p className="text-muted-foreground">Available for talks and workshops</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
