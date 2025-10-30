import { Waves } from "lucide-react";
import React from "react";

export function Footer() {
  return (
    <footer className="relative bg-[#0a0a1a] border-t border-white/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Logo and tagline */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#7C4DFF] flex items-center justify-center">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl">Fishtank</span>
            </div>
            <p className="text-white/60 text-sm max-w-xs">
              Connecting innovators, creators, and investors to build the future.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2025 Fishtank. All rights reserved.
          </p>
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            <a
              href="https://www.linkedin.com/company/fishtankteam/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-white/20">•</span>
            <a
              href="https://x.com/fishtankkteam?s=21"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              Twitter
            </a>
            <span className="text-white/20">•</span>
            <a
              href="https://www.tiktok.com/@fishtankteam?_t=ZS-90yF2ZOh20u&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              TikTok
            </a>
            <span className="text-white/20">•</span>
            <a
              href="https://www.instagram.com/fishtankteam?igsh=MWc3azV3aDNtMXY5ZA%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              Instagram
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
