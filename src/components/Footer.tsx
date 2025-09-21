const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 text-center text-muted-foreground text-sm">
      © {currentYear} PUNEETH VEMURI - ALL RIGHTS RESERVED
    </footer>
  );
};

export default Footer;