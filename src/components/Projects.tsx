import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github, Zap, Shield, MapPin, Code, Database, Globe, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Projects = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.1);
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(0.1);
  const [filter, setFilter] = useState("All");

  const projects = [
    {
      title: "INFOPULSE",
      description: "InfoPulse is a modern, all-in-one dashboard built with React. It provides a real-time, at-a-glance view of global news headlines, cryptocurrency market data, and local weather forecasts.",
      tech: ["JavaScript", "HTML", "CSS", "API"],
      category: "Frontend",
      github: "https://github.com/puneeth-vemuri/InfoPulse",
      live: "https://infopulsee.netlify.app",
      icon: <Zap className="w-6 h-6" />,
      status: "Completed",
      featured: true
    },
    {
      title: "ABHAYAM",
      description: "An IoT-based safety device designed to enhance personal security for women in emergencies. Sends real-time alerts with location data.",
      tech: ["C++", "Arduino", "ESP32c3", "IoT"],
      category: "Hardware/IoT",
      github: "https://github.com/puneeth-vemuri/Abhayam-IoT-Women-Safety-Device",
      icon: <Shield className="w-6 h-6" />,
      status: "Completed",
      featured: true
    },
    {
      title: "TRIP PLANNER AI",
      description: "Multi-agent trip planner using CrewAI framework. Automates destination research, flight recommendations, itinerary generation, and budget analysis with real-time progress tracking.",
      tech: ["Python", "CrewAI", "LangChain", "Streamlit", "OpenRouter"],
      category: "Full Stack",
      github: "https://github.com/puneeth-vemuri/trip_planner",
      live: "https://huggingface.co/spaces/puneethvemuri/trip_planner",
      icon: <MapPin className="w-6 h-6" />,
      status: "Completed",
      featured: true
    }
  ];

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={titleRef} className={`text-center mb-16 animate-fade-in ${titleVisible ? 'visible' : ''}`}>
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <Code className="w-5 h-5 text-primary mr-2" />
            <span className="text-primary font-medium text-sm">My Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Here are some of my recent projects that showcase my skills and passion for development.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat
                  ? "bg-primary text-white shadow-lg shadow-primary/25 scale-105"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.title}
              className={`gradient-card border-border/40 hover-float group transition-all duration-500 animate-scale flex flex-col h-full overflow-hidden ${gridVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-2 bg-gradient-to-r from-primary to-purple-600 w-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <CardHeader className="pb-4 flex-grow-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                    {project.icon}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${project.status === 'Completed'
                    ? 'bg-green-500/10 text-green-500 border-green-500/20'
                    : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                    }`}>
                    {project.status}
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed mt-2 line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-muted/50 text-muted-foreground text-xs font-medium rounded-md border border-border/30 hover:border-primary/30 hover:text-primary transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto pt-4 border-t border-border/30">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1 border-primary/20 hover:border-primary/50 hover:bg-primary/5 group/btn"
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2 group-hover/btn:text-primary transition-colors" />
                      Code
                    </a>
                  </Button>

                  {project.live && (
                    <Button
                      size="sm"
                      asChild
                      className="flex-1 gradient-primary hover:glow-effect text-white border-0 group/btn"
                    >
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                        <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button variant="outline" size="lg" className="rounded-full px-8 border-primary/20 hover:border-primary/50 hover:bg-primary/5" asChild>
            <a href="https://github.com/puneeth-vemuri" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2" />
              View More on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;