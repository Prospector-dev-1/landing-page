import React from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function CTABanner() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a]" />
      
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 30% 50%, #4FC3F730 0%, transparent 50%)",
              "radial-gradient(circle at 70% 50%, #7C4DFF30 0%, transparent 50%)",
              "radial-gradient(circle at 30% 50%, #4FC3F730 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#4FC3F7] rounded-full blur-[120px] opacity-20" />
              <div className="absolute top-0 right-1/4 w-64 h-64 bg-[#7C4DFF] rounded-full blur-[120px] opacity-20" />
            </div>

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6"
              >
                <Sparkles className="w-4 h-4 text-[#4FC3F7]" />
                <span className="text-sm text-white/80">Limited Beta Spots Available</span>
              </motion.div>

              <h2 className="text-4xl md:text-6xl mb-6">
                Ready to make your
                <br />
                <span className="bg-gradient-to-r from-[#4FC3F7] to-[#7C4DFF] bg-clip-text text-transparent">
                  startup real?
                </span>
              </h2>

              <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
                Join thousands of innovators, creators, and investors building the future together.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/apply">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#4FC3F7] to-[#7C4DFF] hover:opacity-90 transition-opacity rounded-2xl px-10 group"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/apply">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 hover:bg-white/10 rounded-2xl px-10"
                  >
                    Schedule a Demo
                  </Button>
                </Link>
              </div>

              <p className="mt-8 text-sm text-white/40">
                No credit card required • Free to join • Cancel anytime
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
