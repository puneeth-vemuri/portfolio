import profilePicture from "@/assets/profile-picture.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Code, Award, Target, Heart, Zap, Rocket, Brain, Globe } from "lucide-react";

const About = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.1);
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation(0.1);
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation(0.1);

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={titleRef} className={`text-center mb-16 animate-fade-in ${titleVisible ? 'visible' : ''}`}>
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <Brain className="w-5 h-5 text-primary mr-2" />
            <span className="text-primary font-medium text-sm">Get to know me</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            About Me
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            A glimpse into my journey, passion, and what drives me to create.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Profile & Stats */}
          <div ref={contentRef} className={`animate-slide-left ${contentVisible ? 'visible' : ''}`}>
            <div className="relative group">
              <div className="relative flex flex-col items-center mb-10">
                <img
                  src={profilePicture}
                  alt="Puneeth Vemuri - Profile Picture"
                  className="w-56 h-56 rounded-full object-cover border-4 border-background shadow-lg mb-8 hover-float transition-transform duration-300"
                />
              </div>
            </div>

            <div className="gradient-card rounded-2xl p-8 card-shadow backdrop-blur-sm border border-white/10">
              <p className="text-lg leading-relaxed text-foreground/90 mb-6">
                I'm a <span className="font-semibold text-primary">Computer Science undergrad</span> passionate about building impactful projects with modern web and AI technologies.
              </p>
              <p className="text-lg leading-relaxed text-foreground/90">
                As an aspiring <span className="font-semibold text-primary">Full Stack & AI Developer</span>, I'm dedicated to solving real-world problems through technology, blending creativity with code from frontend experiences to backend intelligence.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 bg-background/50 rounded-xl border border-border/50 text-center hover:border-primary/30 transition-colors">
                  <div className="flex justify-center mb-2">
                    <Code className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">3+</div>
                  <div className="text-sm text-muted-foreground font-medium">Projects Built</div>
                </div>
                <div className="p-4 bg-background/50 rounded-xl border border-border/50 text-center hover:border-primary/30 transition-colors">
                  <div className="flex justify-center mb-2">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">4+</div>
                  <div className="text-sm text-muted-foreground font-medium">Certificates</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cards */}
          <div ref={cardsRef} className={`space-y-6 animate-slide-right ${cardsVisible ? 'visible' : ''}`}>
            <div className="gradient-card rounded-xl p-6 hover-float border-l-4 border-l-primary transition-all hover:bg-accent/5">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">Current Focus</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Building scalable full-stack applications and exploring the depths of AI/ML technologies to create intelligent, adaptive solutions.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-card rounded-xl p-6 hover-float border-l-4 border-l-purple-500 transition-all hover:bg-accent/5">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <Heart className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">Passion</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Solving complex real-world problems through innovative technology and crafting intuitive, impactful user experiences that delight.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-card rounded-xl p-6 hover-float border-l-4 border-l-blue-500 transition-all hover:bg-accent/5">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Rocket className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">Goals</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Becoming a versatile developer who bridges the gap between frontend creativity and backend intelligence to build the future of web.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-card rounded-xl p-6 hover-float border-l-4 border-l-green-500 transition-all hover:bg-accent/5">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <Globe className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">Perspective</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    I believe in continuous learning and sharing knowledge with the community to grow together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;