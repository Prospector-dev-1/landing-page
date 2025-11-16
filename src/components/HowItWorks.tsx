import {React} from "react";
import { motion } from "motion/react";
import { FileText, Users, Hammer, Rocket } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Submit Your Startup",
    description: "Share your innovation through our streamlined pitch process.",
    color: "#4FC3F7",
  },
  {
    icon: Users,
    title: "Get Matched",
    description: "Our algorithm connects you with the right investors and creators.",
    color: "#7C4DFF",
  },
  {
    icon: Hammer,
    title: "Build Together",
    description: "Collaborate with your team to bring your vision to life.",
    color: "#4FC3F7",
  },
  {
    icon: Rocket,
    title: "Launch & Scale",
    description: "Go to market with ongoing support from the Fishtank community.",
    color: "#7C4DFF",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a1a]" />
      
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4FC3F7] rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7C4DFF] rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl mb-4">How it works</h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            From startup to launch in four simple steps
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Connecting gradient line */}
          <div className="absolute top-8 left-8 right-8 h-0.5 hidden md:block">
            <div className="h-full bg-gradient-to-r from-[#4FC3F7] via-[#7C4DFF] to-[#4FC3F7] opacity-30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-1 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                {/* Step number */}
                <div className="flex items-start gap-4 mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative flex-shrink-0"
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center relative z-10"
                      style={{
                        background: `linear-gradient(135deg, ${step.color}30, ${step.color}10)`,
                        border: `2px solid ${step.color}`,
                        boxShadow: `0 8px 32px ${step.color}40`,
                      }}
                    >
                      <step.icon className="w-7 h-7" style={{ color: step.color }} />
                    </div>
                    
                    {/* Step number badge */}
                    <div
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs z-20"
                      style={{
                        background: step.color,
                        color: '#0a0a1a',
                      }}
                    >
                      {index + 1}
                    </div>
                  </motion.div>
                </div>

                <h3 className="text-xl mb-3">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          
        </motion.div>
      </div>
    </section>
  );
}
