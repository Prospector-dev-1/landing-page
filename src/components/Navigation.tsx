import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Waves, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Handle scroll effect with cleanup
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0a0a1a]/80 backdrop-blur-xl border-b border-white/10" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">Fishtank</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-white/70 hover:text-white transition-colors">Overview</Link>
            <Link to="/innovators" className="text-white/70 hover:text-white transition-colors">Innovators</Link>
            <Link to="/creators" className="text-white/70 hover:text-white transition-colors">Creators</Link>
            <Link to="/investors" className="text-white/70 hover:text-white transition-colors">Investors</Link>
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Link to="/apply">
                <Button className="bg-gradient-to-r from-[#4FC3F7] to-[#7C4DFF] hover:opacity-90 transition-opacity rounded-xl">
                  Join Beta
                </Button>
              </Link>
            </div>
            <button
              type="button"
              aria-label="Toggle menu"
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
              onClick={() => setIsMobileOpen(v => !v)}
            >
              {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: isMobileOpen ? "auto" : 0, opacity: isMobileOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden border-t border-white/10 bg-[#0a0a1a]/95 backdrop-blur-xl"
      >
        <div className="px-4 pb-6 pt-2">
          <div className="flex flex-col gap-3">
            <Link onClick={() => setIsMobileOpen(false)} to="/" className="py-2 text-white/90">Overview</Link>
            <Link onClick={() => setIsMobileOpen(false)} to="/innovators" className="py-2 text-white/90">Innovators</Link>
            <Link onClick={() => setIsMobileOpen(false)} to="/creators" className="py-2 text-white/90">Creators</Link>
            <Link onClick={() => setIsMobileOpen(false)} to="/investors" className="py-2 text-white/90">Investors</Link>
            <Link onClick={() => setIsMobileOpen(false)} to="/apply" className="pt-3">
              <Button className="w-full bg-gradient-to-r from-[#4FC3F7] to-[#7C4DFF] hover:opacity-90 transition-opacity rounded-xl">
                Join Beta
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
