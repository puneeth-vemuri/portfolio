import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation"; // Import the hook

const Hero = () => {
  const { ref, isVisible } = useScrollAnimation(); // Use the hook

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div
        ref={ref} // Apply the ref
        className={`relative z-10 max-w-4xl mx-auto px-6 text-center animate-fade-in ${
          isVisible ? "visible" : ""
        }`} // Conditionally add 'visible' class
      >
        <div className="mb-6">
          <p className="text-lg md:text-xl text-muted-foreground mb-2">
            Hi, I'm
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gradient">
            Puneeth Vemuri
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 font-light">
            Aspiring Full Stack & AI Developer
          </p>
        </div>

        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Computer Science undergrad passionate about building impactful projects with modern web and AI technologies.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            onClick={scrollToProjects}
            className="gradient-primary hover:glow-effect transition-spring text-white border-0"
          >
            View Projects
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToContact}
            className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-smooth"
          >
            Contact Me
          </Button>
        </div>

        <div className="flex justify-center gap-6 mb-12">
          <a
            href="https://github.com/puneeth-vemuri"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-smooth hover-float"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/puneethvemuri/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-smooth hover-float"
          >
            <Linkedin size={24} />
          </a>
        </div>

        <div className="animate-bounce">
          <ArrowDown className="mx-auto text-muted-foreground" size={24} />
        </div>
      </div>
    </section>
  );
};

export default Hero;