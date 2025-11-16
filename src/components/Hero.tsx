import React from "react";
import { motion } from "motion/react";
import AnimatedRadialBackground from "./AnimatedRadialBackground";
import { Button } from "./ui/button";
import { Sparkles, Rocket, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a]">
        <AnimatedRadialBackground
          className="opacity-30"
          colors={["#7C4DFF", "#4FC3F7", "#7C4DFF"]}
          durationSeconds={10}
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8"
            >
              <Sparkles className="w-4 h-4 text-[#4FC3F7]" />
              <span className="text-sm text-white/70">Private Beta Now Open</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-white via-[#4FC3F7] to-[#7C4DFF] bg-clip-text text-transparent">
              Where startups meet capital
              <br />
              and skill
            </h1>

            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
              Fishtank connects innovators with the capital and creative talent they need to
              bring breakthrough startups to life.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/apply">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#4FC3F7] to-[#7C4DFF] hover:opacity-90 transition-opacity rounded-2xl px-8"
                >
                  Join the Beta
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Animated preview cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: Rocket, title: "Innovators", color: "#4FC3F7" },
              { icon: Sparkles, title: "Creators", color: "#7C4DFF" },
              { icon: TrendingUp, title: "Investors", color: "#4FC3F7" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative group h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all h-full flex flex-col">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)`,
                      border: `1px solid ${item.color}40`,
                    }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-white mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm flex-grow">
                    {i === 0 && <p>Showcase your breakthrough startup <br />Find the right creators to help build and scale it.<br />Get funded and launch.</p>}
                    {i === 1 && <p>Find Founders who need you skills <br />Chose if youd like to Freelance, or join the starup working for Equity.</p>}
                    {i === 2 && <p>Back high‑potential startups before they go mainstream.<br />Get a share of the upside. </p>}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
