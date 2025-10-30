import {React} from "react";
import { motion } from "motion/react";
import { Lightbulb, Palette, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const personas = [
  {
    icon: Lightbulb,
    title: "Innovators",
    link: "/innovators",
    description: "Have a game-changing startup but need resources to scale?",
    features: [
      "Create your innovation's profile",
      "Upload Pitches to your innovation's profile.",
      "Investors see you're pitch, they like it? -> click to see full Innovation -> message innovator.",
      "Need help building, marketing, or scaling? \n Post listings to hire skilled Freelancers, Interns, or fellow Innovators  \n — for fixed pay, equity, or commission.",
    ],
    gradient: "from-[#4FC3F7] to-[#2196F3]",
    accentColor: "#4FC3F7",
  },
  {
    icon: Palette,
    title: "Creators",
    link: "/creators",
    description: "Freelancers, Interns, or anyone with a skill, brings there talent to the heart of innovation.",
    features: [
      "Sign up, Upload your skill, resume, and even Past Projects (optional).",
      "Select your perfered payment methode; Fixed pay, Equity, Commission, Custom.",
      "Open the discover page to start browsing job listings, Swipe Left to pass or Swipe right to apply",
      "Browse other creators, create a Team, and start working on projects together.",
    ],
    gradient: "from-[#7C4DFF] to-[#651FFF]",
    accentColor: "#7C4DFF",
  },
  {
    icon: TrendingUp,
    title: "Investors",
    link: "/investors",
    description: "Back high-potential startups before they hit the mainstream.",
    features: [
      "Access a curated stream of high-potential startups and founders.",
      "Experience transparency — every innovation, every team, every metric in one place.",
      "Engage directly with innovators shaping tomorrow's industries.",
      "Invest with insight. Empower the builders of the future.",
    ],
    gradient: "from-[#4FC3F7] to-[#7C4DFF]",
    accentColor: "#4FC3F7",
  },
];

export function PersonaCards() {
  return (
    <section id="personas" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0f0a1f] to-[#0a0a1a]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4">Built for three types of people</h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Whether you're creating, building, or investing — Fishtank brings you together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {personas.map((persona, index) => (
          <motion.div
            key={persona.title}
            id={`persona-${persona.title.toLowerCase()}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -12 }}
            className="group relative"
          >
    {/* Glow effect on hover */}
    <motion.div
      className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
      style={{
        background: `linear-gradient(135deg, ${persona.accentColor}40, ${persona.accentColor}20)`,
      }}
    />


              {/* Card */}
              <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all">
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${persona.accentColor}30, ${persona.accentColor}10)`,
                    border: `1px solid ${persona.accentColor}50`,
                  }}
                >
                  <persona.icon className="w-8 h-8" style={{ color: persona.accentColor }} />
                </div>

                {/* Title and description */}
                <h3 className="text-2xl mb-4">{persona.title}</h3>
                <p className="text-white/60 mb-6">{persona.description}</p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {persona.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-white/70">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: persona.accentColor }}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant="ghost"
                  className="w-full group/btn hover:bg-white/10 rounded-xl"
                  asChild
                >
                  <Link to={persona.link} className="flex items-center justify-center w-full">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
