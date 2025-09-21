import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Award } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Certificates = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.1);
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(0.1);
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation(0.1);
  const certificates = [
    {
      title: "Fullstack Development",
      issuer: "Coursera",
      description: "Comprehensive full-stack web development certificate covering modern technologies and best practices.",
      link: "https://coursera.org/share/05c633bc500d26c3674357b4d5fdaf21"
    },
    {
      title: "Git Version Control",
      issuer: "LinkedIn Learning", 
      description: "Advanced Git and version control workflows for collaborative development.",
      link: "https://www.linkedin.com/learning/certificates/7c7a08dba4df487211eb810f81fd343f3dd20b73d34771d7b06f7143e1c8ac7f"
    },
    {
      title: "Python Programming",
      issuer: "LinkedIn Learning",
      description: "Python programming fundamentals and advanced concepts for software development.",
      link: "https://www.linkedin.com/in/puneethvemuri/details/certifications/"
    },
    {
      title: "Generative AI",
      issuer: "Coursera",
      description: "Specialized training in generative AI technologies and machine learning applications.",
      link: "https://www.coursera.org/account/accomplishments/specialization/N9W5M0WNGNUA"
    }
  ];

  return (
    <section id="certificates" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className={`text-center mb-16 animate-fade-in ${titleVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Certificates & Achievements
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and courses that showcase my commitment to continuous learning.
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 gap-8">
          {certificates.map((cert, index) => (
            <Card
              key={cert.title}
              className={`gradient-card border-border/20 hover-float group transition-all duration-500 animate-slide-up ${gridVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-smooth">
                    <Award className="w-6 h-6" />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="border-primary/30 hover:border-primary hover:bg-primary/10 group-hover:glow-effect"
                  >
                    <a href={cert.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </a>
                  </Button>
                </div>

                <CardTitle className="text-xl font-bold text-foreground group-hover:text-gradient transition-smooth">
                  {cert.title}
                </CardTitle>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-primary font-medium">{cert.issuer}</span>
                  <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                  <span className="text-muted-foreground text-sm">Certified</span>
                </div>

                <CardDescription className="text-muted-foreground leading-relaxed">
                  {cert.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center gap-2 text-sm text-primary">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>Verified Certificate</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievement stats */}
        <div ref={statsRef} className="mt-16 text-center">
          <div className={`inline-flex items-center gap-8 gradient-card rounded-2xl px-8 py-6 card-shadow animate-scale ${statsVisible ? 'visible' : ''}`}>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4+</div>
              <div className="text-sm text-muted-foreground">Certificates</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">2024</div>
              <div className="text-sm text-muted-foreground">Latest Year</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;