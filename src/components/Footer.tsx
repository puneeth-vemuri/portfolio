import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/puneeth-vemuri", label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/puneethvemuri/", label: "LinkedIn" },
    { icon: <Twitter className="w-5 h-5" />, href: "https://x.com/puneethvemuri", label: "Twitter" },
    { icon: <Mail className="w-5 h-5" />, href: "mailto:puneethvemuri@gmail.com", label: "Email" }
  ];

  return (
    <footer className="py-12 relative overflow-hidden border-t border-border/40 bg-background/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
        <div className="flex gap-6 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-muted/30 hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>

        <div className="text-center space-y-2">
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> by Puneeth Vemuri
          </p>
          <p className="text-muted-foreground/60 text-xs">
            © {currentYear} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;