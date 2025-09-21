import profilePicture from "@/assets/profile-picture.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.1);
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation(0.1);
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation(0.1);
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div ref={titleRef} className={`text-center mb-16 animate-fade-in ${titleVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            About Me
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={contentRef} className={`animate-slide-left ${contentVisible ? 'visible' : ''}`}>
            <div className="flex flex-col items-center mb-8">
              <img 
                src={profilePicture}
                alt="Puneeth Vemuri - Profile Picture" 
                className="w-48 h-48 rounded-full object-cover border-4 border-primary/20 shadow-lg mb-6 hover-float"
              />
            </div>
            <div className="gradient-card rounded-2xl p-8 card-shadow hover-float">
              <p className="text-lg leading-relaxed text-foreground/90">
                I'm a Computer Science undergrad passionate about building impactful projects with modern web and AI technologies. As an aspiring Full Stack & AI Developer, I'm dedicated to solving real-world problems through technology, blending creativity with code from frontend experiences to backend intelligence.
              </p>
              
              <div className="mt-8 grid grid-cols-2 gap-6 text-center">
                <div className="border-r border-border/30 pr-6">
                  <div className="text-2xl font-bold text-primary mb-2">3+</div>
                  <div className="text-sm text-muted-foreground">Projects Built</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-2">4+</div>
                  <div className="text-sm text-muted-foreground">Certificates</div>
                </div>
              </div>
            </div>
          </div>

          <div ref={cardsRef} className={`animate-slide-right ${cardsVisible ? 'visible' : ''}`}>
            <div className="space-y-6">
              <div className="gradient-card rounded-xl p-6 hover-float">
                <h3 className="text-xl font-semibold mb-3 text-primary">🎯 Current Focus</h3>
                <p className="text-foreground/80">Building full-stack applications and exploring AI/ML technologies to create intelligent solutions.</p>
              </div>
              
              <div className="gradient-card rounded-xl p-6 hover-float">
                <h3 className="text-xl font-semibold mb-3 text-primary">💡 Passion</h3>
                <p className="text-foreground/80">Solving real-world problems through innovative technology and creating impactful user experiences.</p>
              </div>
              
              <div className="gradient-card rounded-xl p-6 hover-float">
                <h3 className="text-xl font-semibold mb-3 text-primary">🚀 Goals</h3>
                <p className="text-foreground/80">Becoming a versatile developer who bridges the gap between frontend creativity and backend intelligence.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;