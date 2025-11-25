import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Code, Server, Database, Wrench, Users, Brain, Cpu, Globe, Terminal, Layers } from "lucide-react";

const Skills = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.1);
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation(0.1);
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation(0.1);

  const skillCategories = [
    {
      title: "Frontend",
      icon: <Globe className="w-6 h-6 mb-2" />,
      skills: [
        { name: "React", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "JavaScript", level: 90 },
        { name: "HTML/CSS", level: 95 },
        { name: "Tailwind", level: 90 },
        { name: "Next.js", level: 80 }
      ],
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      title: "Backend",
      icon: <Server className="w-6 h-6 mb-2" />,
      skills: [
        { name: "Python", level: 85 },
        { name: "Express", level: 80 },
        { name: "FastAPI", level: 75 },
        { name: "GraphQL", level: 70 },
        { name: "REST API", level: 90 }
      ],
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/20"
    },
    {
      title: "Database",
      icon: <Database className="w-6 h-6 mb-2" />,
      skills: [
        { name: "MongoDB", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "MySQL", level: 80 },
        { name: "Firebase", level: 75 }
      ],
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    },
    {
      title: "Dev Tools",
      icon: <Wrench className="w-6 h-6 mb-2" />,
      skills: [
        { name: "Git", level: 90 },
        { name: "Figma", level: 75 },
        { name: "Docker", level: 60 },
        { name: "VS Code", level: 95 }
      ],
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20"
    },
    {
      title: "Soft Skills",
      icon: <Users className="w-6 h-6 mb-2" />,
      skills: [
        { name: "Problem Solving", level: 90 },
        { name: "Teamwork", level: 95 },
        { name: "Communication", level: 90 },
        { name: "Creativity", level: 85 }
      ],
      color: "text-pink-400",
      bg: "bg-pink-500/10",
      border: "border-pink-500/20"
    },
    {
      title: "Learning Now",
      icon: <Brain className="w-6 h-6 mb-2" />,
      skills: [
        { name: "AI/ML", level: 60 },
        { name: "GenAI", level: 70 },
        { name: "Deep Learning", level: 50 }
      ],
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20"
    }
  ];

  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={titleRef} className={`text-center mb-16 animate-fade-in ${titleVisible ? 'visible' : ''}`}>
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <Cpu className="w-5 h-5 text-primary mr-2" />
            <span className="text-primary font-medium text-sm">Expertise</span>
          </div>
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
              className={`gradient-card rounded-2xl p-6 card-shadow hover-float animate-slide-up border ${category.border} ${skillsVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl ${category.bg} ${category.color}`}>
                  {category.icon}
                </div>
                <h3 className={`text-xl font-bold ${category.color}`}>
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className="relative"
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-foreground/90 text-sm">{skill.name}</span>
                      <span className="text-muted-foreground text-xs">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${category.bg.replace('/10', '')} transition-all duration-1000 ease-out`}
                        style={{
                          width: skillsVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${(categoryIndex * 0.1) + (skillIndex * 0.05)}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Fun stats section */}
        <div ref={statsRef} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Languages", value: "6+", icon: <Code className="w-5 h-5" /> },
            { label: "Frameworks", value: "8+", icon: <Layers className="w-5 h-5" /> },
            { label: "Databases", value: "4+", icon: <Database className="w-5 h-5" /> },
            { label: "Tools", value: "10+", icon: <Terminal className="w-5 h-5" /> }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center gradient-card rounded-xl p-6 hover-float animate-scale border border-border/40 ${statsVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center mb-3 text-primary opacity-80">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;