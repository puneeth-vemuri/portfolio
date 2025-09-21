import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer"; // Import the new Footer component
import BackToTop from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certificates />
        <Contact />
      </main>
      <Footer /> {/* Render the Footer component */}
      <BackToTop />
    </div>
  );
};

export default Index;
