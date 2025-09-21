import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github, Zap, Shield, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Projects = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.1);
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(0.1);
  const projects = [
    {
      title: "INFOPULSE",
      description: "A modern dashboard for real-time global news, crypto data, and weather forecasts.",
      tech: ["JavaScript", "HTML", "CSS", "API"],
      github: "https://github.com/puneeth-vemuri",
      live: "https://infopulsee.netlify.app",
      icon: <Zap className="w-6 h-6" />,
      status: "Completed"
    },
    {
      title: "ABHAYAM",
      description: "An IoT-based safety device designed to enhance personal security for women in emergencies.",
      tech: ["C++", "Arduino", "ESP32c3"],
      github: "https://github.com/puneeth-vemuri",
      icon: <Shield className="w-6 h-6" />,
      status: "Completed"
    },
    {
      title: "TRIP PLANNER",
      description: "An intelligent trip planner to organize itineraries, book flights, and discover new destinations.",
      tech: ["Python", "React", "GenAI"],
      github: "https://github.com/puneeth-vemuri",
      icon: <MapPin className="w-6 h-6" />,
      status: "In Progress"
    }
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className={`text-center mb-16 animate-fade-in ${titleVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for development.
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.title}
              className={`gradient-card border-border/20 hover-float group transition-all duration-500 animate-scale ${gridVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-smooth">
                    {project.icon}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Completed' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {project.status}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-gradient transition-smooth">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-muted/50 text-muted-foreground text-sm rounded-full border border-border/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1 border-primary/30 hover:border-primary hover:bg-primary/10"
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  
                  {project.live && (
                    <Button
                      size="sm"
                      asChild
                      className="flex-1 gradient-primary hover:glow-effect text-white border-0"
                    >
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;