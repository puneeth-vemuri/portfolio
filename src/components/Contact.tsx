import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, Github, Linkedin, MessageSquare, Twitter } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Contact = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.1);
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation(0.1);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    const mailtoLink = `mailto:puneethvemuri@gmail.com?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
    
    toast({
      title: "Opening email client...",
      description: "Your default email client will open with the message pre-filled.",
    });
    
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "puneethvemuri@gmail.com",
      href: "mailto:puneethvemuri@gmail.com"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+91 6360121971",
      href: "tel:+916360121971"
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/puneethvemuri/"
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub", 
      href: "https://github.com/puneeth-vemuri"
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: "Discord",
      href: "https://discord.com/users/739104670680612867"
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      label: "X (Twitter)",
      href: "https://x.com/puneethvemuri"
    }
  ];

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className={`text-center mb-16 animate-fade-in ${titleVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or just having a chat about technology.
          </p>
        </div>

        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className={`gradient-card border-border/20 hover-float animate-slide-left ${contentVisible ? 'visible' : ''}`}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">Send a Message</CardTitle>
              <CardDescription className="text-muted-foreground">
                Drop me a line and I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-muted/30 border-border/30 focus:border-primary"
                  />
                </div>
                
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-muted/30 border-border/30 focus:border-primary"
                  />
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-muted/30 border-border/30 focus:border-primary resize-none"
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full gradient-primary hover:glow-effect text-white border-0"
                  size="lg"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className={`space-y-8 animate-slide-right ${contentVisible ? 'visible' : ''}`} style={{ animationDelay: '0.2s' }}>
            {/* Contact Details */}
            <Card className="gradient-card border-border/20 hover-float">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth hover-float"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {info.icon}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{info.label}</div>
                      <div className="text-muted-foreground">{info.value}</div>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="gradient-card border-border/20 hover-float">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">Connect With Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 hover:bg-primary/10 hover:text-primary transition-smooth hover-float text-center"
                    >
                      <div className="mx-auto flex items-center gap-2">
                        {social.icon}
                        <span className="font-medium text-sm">{social.label}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="gradient-card border-border/20 hover-float">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary mb-2">24h</div>
                    <div className="text-sm text-muted-foreground">Response Time</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary mb-2">100%</div>
                    <div className="text-sm text-muted-foreground">Project Commitment</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;