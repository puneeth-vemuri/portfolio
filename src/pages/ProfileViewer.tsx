import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import profilePicture from "@/assets/profile-picture.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTypewriterLoop } from "@/hooks/useTypewriter";
import { Github, FileText, Linkedin, Instagram, MessageSquare, ArrowLeft, ExternalLink, Heart, Eye } from "lucide-react";
import { useState } from "react";
import { usePortfolioStats } from "@/hooks/usePortfolioStats";
import { ProjectsSection } from "@/components/ProjectsSection";
import { FeedbackSection } from "@/components/FeedbackSection";

const ProfileViewer = () => {
  const navigate = useNavigate();
  // removed unused state
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation(0.1);
  const { ref: contactRef, isVisible: contactVisible } = useScrollAnimation(0.1);
  const typedText = useTypewriterLoop(["efforts", "passion", "dedication", "creativity"], 100, 50, 2000);
  const { stats, hasLiked, toggleLike } = usePortfolioStats();

  const containerRef = useRef(null);

  // Scroll-based parallax for title + portrait
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroTitleY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: portfolioData.socials.github, label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, href: portfolioData.socials.linkedin, label: "LinkedIn" },
    { icon: <Instagram className="w-5 h-5" />, href: portfolioData.socials.instagram, label: "Instagram" },
    { icon: <MessageSquare className="w-5 h-5" />, href: portfolioData.socials.discord, label: "Discord" },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-black text-white overflow-x-hidden"
    >
      {/* ========================== HERO SECTION ========================== */}
      <section className="relative w-full bg-black text-white overflow-hidden flex flex-col min-h-screen pb-16">
        {/* BACKGROUND: DIAGONAL STRIPS + HUGE NAME */}
        <div className="pointer-events-none absolute inset-0 z-0 pt-16">
          {/* diagonal strips - z-0 on small screens to go behind portrait */}
          <div className="absolute inset-0 flex items-center justify-center z-0 md:z-auto">
            {/* top-left → bottom-right */}
            <div className="w-[220%] h-8 md:h-10 rotate-[16deg]">
              <div className="strip bg-red-600 w-full h-full flex items-center">
                <div className="strip-inner text-[9px] md:text-[11px] tracking-[0.35em] text-white">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <span key={`diag-a-${i}`} className="px-4">
                      🕶️ PV • DEV • PORTFOLIO • {new Date().getFullYear()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* bottom-left → top-right */}
            <div className="w-[220%] h-8 md:h-10 -rotate-[16deg] absolute">
              <div className="strip bg-red-600 w-full h-full flex items-center">
                <div className="strip-inner-reverse text-[9px] md:text-[11px] tracking-[0.35em] text-white">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <span key={`diag-b-${i}`} className="px-4">
                      🕶️ PV • DEV • PORTFOLIO • {new Date().getFullYear()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Name moved down closer to the picture so it correctly overlaps */}
        </div>
        {/* TOP NAV - This stays in place */}
        <div className="relative z-30 flex items-center justify-between px-6 md:px-12 lg:px-20 pt-6">
          <button
            onClick={() => navigate("/")}
            className="rounded-full px-4 py-1 text-sm bg-white/5 border border-white/20 text-gray-200 hover:bg-white hover:text-black transition"
          >
            ← Back
          </button>

          <div className="flex items-center gap-3 text-[10px] tracking-[0.35em] text-gray-400 uppercase">
            <span className="hidden sm:inline">CINE•PORTFOLIO</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-red-500" />

            {/* icons (resume + github) */}
            <div className="ml-3 flex items-center gap-2">
              <a
                href={portfolioData.resume}
                target="_blank"
                rel="noreferrer"
                aria-label="Open resume"
                className="inline-flex items-center gap-2 px-2 py-1 rounded-md border border-white/10 bg-white/3 hover:bg-red-500 hover:text-black transition-colors"
              >
                <FileText className="w-3 h-3 text-red-400" />
                <span className="hidden sm:inline text-[10px] tracking-[0.25em]">
                  Resume
                </span>
              </a>

              <a
                href={portfolioData.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="Open GitHub"
                className="inline-flex items-center gap-2 px-2 py-1 rounded-md border border-white/10 bg-white/3 hover:bg-red-500 hover:text-black transition-colors"
              >
                <Github className="w-3 h-3 text-red-400" />
                <span className="hidden sm:inline text-[10px] tracking-[0.25em]">
                  GitHub
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* CENTER AREA */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-4 md:pt-6 -translate-y-20 md:-translate-y-36">

          {/* huge name - repositioned higher and made larger */}
          <motion.div
            style={{ y: heroTitleY }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.6, once: false }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative mb-[-2rem] md:mb-[-4rem] z-50 pointer-events-none text-center"
          >
            <span className="block text-[14vw] md:text-[min(12vw,160px)] font-extrabold uppercase tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              PUNEETH VEMURI
            </span>
          </motion.div>

          <motion.div className="relative flex items-center justify-center">
            {/* left thought bubble - moved closer */}
            <div className="hidden md:block absolute -left-[14rem] lg:-left-[18rem] xl:-left-[20rem] top-1/2 -translate-y-1/2 float-bubble max-w-xs z-40">
              <div className="rounded-2xl bg-white/10 border border-white/20 px-6 py-4 text-xs md:text-sm text-gray-100 shadow-xl backdrop-blur-md">
                <p className="leading-relaxed">{portfolioData.bio[0]}</p>
              </div>
            </div>

            {/* right thought bubble - moved closer */}
            <div className="hidden md:block absolute -right-[14rem] lg:-right-[18rem] xl:-right-[20rem] top-1/2 -translate-y-1/2 float-bubble-delay max-w-xs z-40">
              <div className="rounded-2xl bg-white/10 border border-white/20 px-6 py-4 text-xs md:text-sm text-gray-100 shadow-xl backdrop-blur-md">
                <p className="leading-relaxed">{portfolioData.bio[1]}</p>
              </div>
            </div>

            {/* red glow behind portrait */}
            <div className="absolute -inset-20 rounded-full bg-red-600/40 blur-3xl -z-10" />

            {/* floating portrait */}
            <div className="relative z-10 w-[240px] h-[300px] md:w-[320px] md:h-[400px] lg:w-[420px] lg:h-[500px] rounded-[1rem] overflow-hidden shadow-2xl border border-white/10 mx-auto transform transition-transform duration-500 hover:scale-[1.02]">
              <img
                src={profilePicture}
                alt={portfolioData.name}
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
          </motion.div>
        </div>

        {/* BOTTOM MOVING STRIP – this is the ground line */}
        <div className="absolute bottom-0 left-0 right-0 strip bg-red-600 h-8 md:h-10 flex items-center z-20">
          <div className="strip-inner text-[9px] md:text-[11px] tracking-[0.35em] text-white">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={`bottom-${i}`} className="px-4">
                🕶️ PV • DEV • PORTFOLIO • {new Date().getFullYear()}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative py-32 px-6 bg-black" ref={skillsRef}>
        {/* Ambient red glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className={`mb-16 animate-fade-in ${skillsVisible ? "visible" : ""}`}>
            <span className="text-[10px] text-red-500 tracking-[0.3em] font-mono uppercase mb-4 block">Skillset</span>
            <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-white mb-4">
              Where I put the <span className="text-red-500">{typedText}</span>
              <span className="terminal-cursor text-red-500">|</span> in
            </h2>
            <p className="text-white/60 font-mono text-sm max-w-xl leading-relaxed">
              Four tracks that cover how I design, build and ship things — from UI polish to backend wiring and everything in between.
            </p>
          </div>

          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up ${skillsVisible ? "visible" : ""}`}>
            {/* Tracks */}
            {[
              { title: "Frontend", items: portfolioData.skills.frontend },
              { title: "Backend", items: portfolioData.skills.backend },
              { title: "Tools", items: portfolioData.skills.tools },
              { title: "Soft Skills", items: portfolioData.skills.softSkills }
            ].map((track) => (
              <div key={track.title} className="group relative rounded-3xl border border-red-500/10 bg-[#0c0c0c] hover:bg-neutral-900 hover:border-red-500/30 transition-all duration-500 h-[220px] flex flex-col items-center justify-center overflow-hidden cursor-default">
                {/* Default view: Centered Track Name */}
                <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 group-hover:-translate-y-full group-hover:opacity-0 p-6">
                  <span className="text-[10px] text-red-500/80 tracking-[0.2em] font-mono mb-3 uppercase">Track</span>
                  <h3 className="font-grotesk text-2xl font-bold text-white">{track.title}</h3>
                </div>

                {/* Hover view: Skills list */}
                <div className="absolute inset-0 flex flex-col items-center justify-center translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 p-6 bg-black/40 backdrop-blur-sm">
                  <ul className="space-y-2 w-full">
                    {track.items.slice(0, 5).map((skill) => (
                      <li key={skill} className="text-white/80 font-mono text-xs flex items-center gap-2 justify-center">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />
                        {skill}
                      </li>
                    ))}
                    {track.items.length > 5 && (
                      <li className="text-white/40 font-mono text-[10px] text-center mt-2">+{track.items.length - 5} more</li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* Projects Section */}
      <ProjectsSection />
      

      {/* Contact & Arcade Section */}
      <section className="relative py-24 px-6 bg-black border-t border-white/5" ref={contactRef}>
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className={`relative z-10 max-w-4xl mx-auto animate-fade-in ${contactVisible ? "visible" : ""}`}>
          {/* Floating Stats */}
          <div className="absolute top-0 right-0 hidden md:flex flex-col items-end gap-3 translate-y-2">
            <button
              onClick={toggleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all duration-300 font-mono text-[10px] ${hasLiked
                ? "bg-red-900/40 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                : "bg-[#0c0c0c] border-white/5 text-white/40 hover:border-red-500/50 hover:text-white"
                }`}
            >
              <Heart className={`w-3 h-3 ${hasLiked ? "fill-red-500 text-red-500" : ""}`} />
              Like {stats.likes}
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#0c0c0c] border border-white/5 rounded-2xl text-white/40 font-mono text-[10px] uppercase">
              <Eye className="w-3 h-3" />
              Views {stats.views}
            </div>
          </div>

          <div className="mb-6 pr-32">
            <span className="text-[10px] text-red-500 tracking-[0.3em] font-mono uppercase mb-4 block">Contact</span>
            <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Let's build something <span className="text-red-500">innovative</span>
            </h2>
            <p className="text-white/60 font-mono text-sm max-w-xl leading-relaxed mb-8">
              Want to talk about a project, internship, or just geek out about motion design and game-like interfaces? Reach out anywhere below — I actually read my DMs.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-12">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 font-mono text-[10px] uppercase text-white/80"
              >
                {social.icon} {social.label}
              </a>
            ))}
          </div>

          {/* Mobile Stats (visible only on small screens) */}
          <div className="md:hidden flex gap-3 mb-12">
            <button onClick={toggleLike} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-white/5 bg-[#0c0c0c] text-white/60 font-mono text-[10px] uppercase">
              <Heart className="w-3 h-3" /> Like {stats.likes}
            </button>
            <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-white/5 bg-[#0c0c0c] text-white/60 font-mono text-[10px] uppercase">
              <Eye className="w-3 h-3" /> {stats.views}
            </div>
          </div>

          <div className="w-full">
            <FeedbackSection />
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 px-6 bg-black border-t border-white/5 text-center">
        <p className="text-white/30 font-mono text-xs uppercase tracking-widest">
          © {new Date().getFullYear()} {portfolioData.name} — Built with passion
        </p>
      </footer>
    </div>
  );
};

export default ProfileViewer;
