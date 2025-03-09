import React from "react";
import {
  Github,
  LinkedinIcon,
  Instagram,
  ChevronUp,
  Code,
  Palette,
  Database,
  Linkedin,
  User2Icon,
} from "lucide-react";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 bg-space-dark border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 bg-space-blue rounded-full flex items-center justify-center">
                <div className="h-6 w-6 bg-space-black rounded-full"></div>
              </div>
              <span className="text-xl font-display font-medium text-white">
                Celestial
              </span>
            </a>
            <p className="text-white/60 mb-4">
              Exploring the wonders of our universe through beautiful design and
              educational content.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/lindo315"
                className="text-white/60 hover:text-white transition-colors"
                title="github"
                aria-label="Github"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/lindokuhle-dlamini-211271263/"
                title="linkedin"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/lindo.315/"
                title="instagram"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://my-portfolio-project-black.vercel.app/"
                title="author"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <User2Icon size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-display font-medium text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#hero"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#planets"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Planets
                </a>
              </li>
              <li>
                <a
                  href="#facts"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Space Facts
                </a>
              </li>
              <li>
                <a
                  href="#creator"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  About Creator
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-display font-medium text-lg mb-4">
              Website's Mission
            </h3>
            <p className="text-white/60 mb-4">
              To inspire wonder and curiosity about the cosmos through beautiful
              design and educational content. We aim to make the complexity of
              space accessible to all.
            </p>
            <div className="glass-card p-4 mt-4">
              <h4 className="text-white font-display font-medium text-sm mb-2">
                Created With
              </h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-center gap-2">
                  <Code size={16} className="text-space-accent" />
                  <span className="text-white/70 text-xs">React</span>
                </div>
                <div className="flex items-center gap-2">
                  <Palette size={16} className="text-space-accent" />
                  <span className="text-white/70 text-xs">Tailwind</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database size={16} className="text-space-accent" />
                  <span className="text-white/70 text-xs">TypeScript</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="creator"
          className="glass-card p-6 mb-8 border border-white/10"
        >
          <h3 className="text-white font-display font-medium text-lg mb-3">
            About the Creator
          </h3>
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-space-blue/30 flex items-center justify-center flex-shrink-0">
              <div className="w-14 h-14 rounded-full bg-space-blue/50 flex items-center justify-center">
                <span className="text-white font-display font-bold text-xl">
                  LD
                </span>
              </div>
            </div>
            <div>
              <h4 className="text-space-accent font-medium mb-2">
                Lindokuhle Dlamini
              </h4>
              <p className="text-white/70 mb-3">
                Web designer and space enthusiast with a passion for creating
                immersive digital experiences. I built Celestial to combine
                beautiful design with educational content about our universe.
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="pill bg-space-blue/20 text-xs">
                  Web Developer
                </div>
                <div className="pill bg-space-blue/20 text-xs">
                  UI/UX Designer
                </div>
                <div className="pill bg-space-blue/20 text-xs">
                  Astronomy Enthusiast
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Celestial by _lindo.dev. All rights reserved.
          </p>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="absolute top-0 right-8 transform -translate-y-1/2 glass w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
        aria-label="Scroll to top"
      >
        <ChevronUp size={20} className="text-white/70" />
      </button>
    </footer>
  );
};

export default Footer;
