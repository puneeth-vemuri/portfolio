import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Phone, Github, Linkedin, MessageSquare, Twitter, Send, MapPin, Clock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Contact = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.1);
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation(0.1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network request
    setTimeout(() => {
      // Create mailto link with form data
      const subject = encodeURIComponent(formData.subject || `Portfolio Contact from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      const mailtoLink = `mailto:puneethvemuri@gmail.com?subject=${subject}&body=${body}`;

      window.location.href = mailtoLink;

      toast.success("Opening email client...", {
        description: "Your default email client will open with the message pre-filled.",
      });

      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
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
      href: "mailto:puneethvemuri@gmail.com",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+91 6360121971",
      href: "tel:+916360121971",
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Bangalore, India",
      href: null,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Availability",
      value: "Open to opportunities",
      href: null,
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/puneethvemuri/",
      color: "hover:text-blue-600",
      borderColor: "hover:border-blue-600/50"
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      href: "https://github.com/puneeth-vemuri",
      color: "hover:text-gray-900 dark:hover:text-white",
      borderColor: "hover:border-gray-500/50"
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: "Discord",
      href: "https://discord.com/users/739104670680612867",
      color: "hover:text-indigo-500",
      borderColor: "hover:border-indigo-500/50"
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      label: "X (Twitter)",
      href: "https://x.com/puneethvemuri",
      color: "hover:text-blue-400",
      borderColor: "hover:border-blue-400/50"
    }
  ];

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={titleRef} className={`text-center mb-16 animate-fade-in ${titleVisible ? 'visible' : ''}`}>
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <Mail className="w-5 h-5 text-primary mr-2" />
            <span className="text-primary font-medium text-sm">Contact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or just having a chat about technology.
          </p>
        </div>

        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <Card className={`gradient-card border-border/40 hover-float animate-slide-left ${contentVisible ? 'visible' : ''}`}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">Send a Message</CardTitle>
              <CardDescription className="text-muted-foreground">
                Drop me a line and I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-muted/30 border-border/30 focus:border-primary/50 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-muted/30 border-border/30 focus:border-primary/50 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What is this regarding?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-muted/30 border-border/30 focus:border-primary/50 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-muted/30 border-border/30 focus:border-primary/50 resize-none transition-all duration-300"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-primary hover:glow-effect text-white border-0 h-12 text-lg font-medium group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send Message
                      <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className={`space-y-8 animate-slide-right ${contentVisible ? 'visible' : ''}`} style={{ animationDelay: '0.2s' }}>
            {/* Contact Details */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info) => (
                <Card key={info.label} className="gradient-card border-border/40 hover-float group transition-all duration-300">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className={`p-4 rounded-full ${info.bg} ${info.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {info.icon}
                    </div>
                    <div className="font-bold text-foreground mb-1">{info.label}</div>
                    {info.href ? (
                      <a href={info.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-sm text-muted-foreground">{info.value}</div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Links */}
            <Card className="gradient-card border-border/40 hover-float">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">Connect With Me</CardTitle>
                <CardDescription>Find me on social media</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-transparent ${social.borderColor} ${social.color} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                    >
                      <div className="flex items-center gap-3 mx-auto">
                        {social.icon}
                        <span className="font-medium text-sm">{social.label}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="gradient-card border-border/40 hover-float overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-8 text-center relative z-10">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">24h</div>
                    <div className="text-sm text-muted-foreground font-medium">Response Time</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">100%</div>
                    <div className="text-sm text-muted-foreground font-medium">Commitment</div>
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