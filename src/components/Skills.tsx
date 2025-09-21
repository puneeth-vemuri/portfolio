import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Skills = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.1);
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation(0.1);
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation(0.1);
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind", "Next.js"],
      color: "text-blue-400"
    },
    {
      title: "Backend",
      skills: ["Python", "Express", "FastAPI", "GraphQL", "REST API"],
      color: "text-green-400"
    },
    {
      title: "Database",
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
      color: "text-purple-400"
    },
    {
      title: "Dev Tools",
      skills: ["Git", "Figma"],
      color: "text-orange-400"
    },
    {
      title: "Soft Skills",
      skills: ["Problem Solving", "Teamwork", "Communication", "Creativity"],
      color: "text-pink-400"
    },
    {
      title: "Learning Now",
      skills: ["AI/ML", "GenAI", "Deep Learning"],
      color: "text-cyan-400"
    }
  ];

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className={`text-center mb-16 animate-fade-in ${titleVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Skills & Technologies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and the technologies I work with.
          </p>
        </div>

        <div ref={skillsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`gradient-card rounded-2xl p-6 card-shadow hover-float animate-slide-up ${skillsVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <h3 className={`text-xl font-bold mb-6 ${category.color}`}>
                {category.title}
              </h3>
              
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill}
                    className="relative overflow-hidden rounded-lg bg-muted/30 p-3 hover:bg-muted/50 transition-smooth"
                    style={{ animationDelay: `${(categoryIndex * 0.1) + (skillIndex * 0.05)}s` }}
                  >
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="font-medium text-foreground/90">{skill}</span>
                      
                      {/* Animated progress indicator */}
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    </div>
                    
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 animate-slide-glow"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Fun stats section */}
        <div ref={statsRef} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Languages", value: "6+" },
            { label: "Frameworks", value: "8+" },
            { label: "Databases", value: "4+" },
            { label: "Tools", value: "10+" }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center gradient-card rounded-xl p-6 hover-float animate-scale ${statsVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;