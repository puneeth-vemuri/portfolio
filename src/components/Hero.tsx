import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTypewriterLoop } from "@/hooks/useTypewriter";

const Hero = () => {
  const { ref, isVisible } = useScrollAnimation();
  const typeWriterText = useTypewriterLoop(
    ["Full Stack Developer", "AI Enthusiast", "Problem Solver", "Tech Explorer"],
    100,
    50,
    2000
  );

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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-50"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div
        ref={ref}
        className={`relative z-10 max-w-5xl mx-auto px-6 text-center animate-fade-in ${isVisible ? "visible" : ""
          }`}
      >
        <div className="mb-8">
          <div className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20 animate-fade-in">
            Available for hire
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-light tracking-wide">
            Hello, I'm
          </p>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            <span className="text-gradient">Puneeth Vemuri</span>
          </h1>
          <div className="h-12 md:h-16 mb-8 flex items-center justify-center">
            <p className="text-2xl md:text-4xl text-foreground/90 font-light">
              I am a <span className="font-semibold text-primary">{typeWriterText}</span>
              <span className="animate-pulse">|</span>
            </p>
          </div>
        </div>

        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Computer Science undergrad passionate about building impactful projects with modern web and AI technologies.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Button
            size="lg"
            onClick={scrollToProjects}
            className="h-14 px-8 text-lg rounded-full gradient-primary hover:glow-effect transition-all duration-300 hover:scale-105 text-white border-0 shadow-lg shadow-primary/25"
          >
            View Projects
            <ArrowDown className="ml-2 w-5 h-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToContact}
            className="h-14 px-8 text-lg rounded-full border-2 border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            Contact Me
          </Button>
        </div>

        <div className="flex justify-center gap-8 mb-16">
          <a
            href="https://github.com/puneeth-vemuri"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-background/50 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:-translate-y-1 shadow-sm"
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/puneethvemuri/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-background/50 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:-translate-y-1 shadow-sm"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:puneethvemuri@gmail.com"
            className="p-3 rounded-full bg-background/50 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:-translate-y-1 shadow-sm"
            aria-label="Email"
          >
            <Mail size={24} />
          </a>
          <a
            href="/resume.pdf" // Assuming resume is in public folder
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-background/50 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:-translate-y-1 shadow-sm"
            aria-label="Resume"
          >
            <FileText size={24} />
          </a>
        </div>

        <div className="animate-bounce absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer" onClick={scrollToProjects}>
          <ArrowDown className="text-muted-foreground" size={32} />
        </div>
      </div>
    </section>
  );
};

export default Hero;