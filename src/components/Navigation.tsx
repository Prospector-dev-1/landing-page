import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Waves, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

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

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <Link to="/apply">
              <Button className="bg-gradient-to-r from-[#4FC3F7] to-[#7C4DFF] hover:opacity-90 transition-opacity rounded-xl">
                Join Beta
              </Button>
            </Link>
            {/* Mobile menu button removed until implemented */}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
