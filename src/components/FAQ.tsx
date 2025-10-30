import {React} from "react";
import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqs = [
  {
    question: "Who can join Fishtank?",
    answer: "Fishtank is open to innovators with viable startups, creators (developers, designers, marketers) looking for meaningful projects, and investors seeking early-stage opportunities. We're currently in private beta with a curated community.",
  },
  {
    question: "How does the matching process work?",
    answer: "Our AI-powered algorithm analyzes your profile, skills, interests, and investment criteria to connect you with the most relevant opportunities. Innovators are matched with investors and creators whose expertise aligns with their project needs.",
  },
  {
    question: "What types of projects get funded?",
    answer: "We focus on innovative startups across tech, healthcare, sustainability, and consumer products. Projects should demonstrate clear problem-solving potential, market viability, and scalability. Our success rate for quality submissions is 87%.",
  },
  {
    question: "How much equity do I need to give up?",
    answer: "Equity terms are negotiated directly between innovators and investors. Fishtank doesn't take equity in your company. We simply facilitate the connection and provide tools for collaboration.",
  },
  {
    question: "What's the typical funding range?",
    answer: "Projects on Fishtank typically raise between $50K to $5M, with an average of $2.4M. The amount depends on your project stage, market opportunity, and team composition.",
  },
  {
    question: "How do creators get compensated?",
    answer: "Creators can be compensated through equity, cash payment, or a combination of both. Terms are agreed upon before project kickoff. We provide templates and guidance for fair creator agreements.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 relative">
      <div className="absolute inset-0 bg-[#0a0a1a]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4">Frequently asked questions</h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Everything you need to know about Fishtank
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 data-[state=open]:border-[#4FC3F7]/50 transition-all"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="text-white/90">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-white/60 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-white/60 mb-4">Still have questions?</p>
            <a
              href="mailto:team@fishtank.vc"
              className="text-[#4FC3F7] hover:text-[#7C4DFF] transition-colors"
            >
              Get in touch with our team →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
