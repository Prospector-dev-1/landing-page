import {React} from "react";
import { motion } from "motion/react";
import AnimatedRadialBackground from "../components/AnimatedRadialBackground";
import { Palette, Code, TrendingUp, Shield, Zap, DollarSign, Users, CheckCircle, Wrench, Brain, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

export default function ForCreatorsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a]">
          <AnimatedRadialBackground
            className="opacity-30"
            colors={["#FF6FD8", "#F97316", "#FF6FD8"]}
            durationSeconds={10}
          />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8"
              >
                <Palette className="w-4 h-4 text-[#7C4DFF]" />
                <span className="text-sm text-white/70">For Creators</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-white via-[#7C4DFF] to-[#4FC3F7] bg-clip-text text-transparent">
                Work on real startups
                <br />
                before they launch
              </h1>

              <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
                Choose projects that match your skills, earn cash, equity, or commission, 
                and build a portfolio with verified outcomes.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/apply">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#7C4DFF] to-[#4FC3F7] hover:opacity-90 transition-opacity rounded-2xl px-8"
                  >
                    Join The Waitlist
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who Are Creators Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a1a]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7C4DFF] rounded-full blur-[128px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">Who are Creators?</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Creators are Freelancers, Interns, and other talent
              <br />
              who can help build or scale innovation for either a fixed pay, Equity, or even Commission.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: TrendingUp,
                title: "Marketing & Sales",
                items: [
                  "Sales Funnel Expert ",
                  "Outreach Manager",
                  "Product Description Copywriter ",
                  "Paid Ads Specialist ",
                  "Email Marketing Expert ",
                  "CRM Expert ",
                  "Business Plan Writer", 
               ],
                color: "#4FC3F7",
              },
              {
                icon: Wrench,
                title: "Design & Content",
                items: [
                  "Product Designer (UI/UX)",
                  "Brand/Visual Designer",
                  "Motion/Video Editor",
                  "Content Writer",
                  "No‑code Builder",
                ],
                color: "#7C4DFF",
              },
              {
                icon: TrendingUp,
                title: "Operations & Support",
                items: [
                  "Product Manager",
                  "Product Support Engineer ",
                  "Product Support Specialist ",
                  "Recruiter ",
                  "HR Specialist ",
                  "Legal Specialist ",
                  "Market Research Analyst",
                ],
                color: "#4FC3F7",
              },
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${category.color}40, ${category.color}20)`,
                  }}
                />
                <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{
                      background: `linear-gradient(135deg, ${category.color}30, ${category.color}10)`,
                      border: `1px solid ${category.color}50`,
                    }}
                  >
                    <category.icon className="w-8 h-8" style={{ color: category.color }} />
                  </div>
                  <h3 className="text-2xl mb-6">{category.title}</h3>
                  <ul className="space-y-3">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: category.color }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
              </ul>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-12">
            {[
             {
              icon: Plus, 
              title: "And So Much More",
              description: "If startups need it, and you have it, FishTank is perfect for you",
              color: "#4FC3F7",
            },
              
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}40, ${item.color}20)`,
                  }}
                />
                <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}30, ${item.color}10)`,
                      border: `1px solid ${item.color}50`,
                    }}
                  >
                    <item.icon className="w-8 h-8" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-2xl mb-4">{item.title}</h3>
                  <p className="text-white/60">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
            
          
        

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-white/60">
              You can also propose a specialty—legal ops, compliance, localization, support engineering, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Benefits Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0f0a1f] to-[#0a0a1a]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">Only 5% platform commission</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              We only earn when you earn. Comparable platforms charge around 20%—that's 75% less for you.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-2 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#4FC3F7]/20 to-[#4FC3F7]/10 backdrop-blur-xl border-2 border-[#4FC3F7]/50 rounded-3xl p-8 text-center"
              >
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-[#4FC3F7] to-[#7C4DFF] bg-clip-text text-transparent">5%</div>
                <div className="text-white/70">Fishtank</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center"
              >
                <div className="text-5xl font-bold mb-2 text-white/40">~20%</div>
                <div className="text-white/70">Typical marketplace</div>
              </motion.div>
            </div>
            <p className="text-center text-white/60">
              Calculation: (20% − 5%) ÷ 20% = 75% less platform fees
            </p>
          </div>
        </div>
      </section>

      {/* Why Creators Love Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a1a]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">Why creators love Fishtank</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Built for the modern creator economy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Users,
                title: "Vetted founders and investors",
                description: "Work with vetted founders and investors—no flaky gigs.",
                color: "#4FC3F7",
              },
              {
                icon: CheckCircle,
                title: "Milestone clarity",
                description: "Scope, success criteria, and artifacts defined upfront.",
                color: "#7C4DFF",
              },
              {
                icon: Shield,
                title: "Escrow protection",
                description: "Escrow and audit trail de‑risk your time.",
                color: "#4FC3F7",
              },
              {
                icon: Zap,
                title: "Portfolio proof",
                description: "Deliverables are verifiable, not just \"trust me\".",
                color: "#7C4DFF",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}40, ${item.color}20)`,
                  }}
                />
                <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}30, ${item.color}10)`,
                      border: `1px solid ${item.color}50`,
                    }}
                  >
                    <item.icon className="w-8 h-8" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-2xl mb-4">{item.title}</h3>
                  <p className="text-white/60">{item.description}</p>
            </div>
              </motion.div>
            ))}
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a]" />
        <AnimatedRadialBackground
          className=""
          colors={["#FF6FD830", "#F9731630", "#FF6FD830"]}
          durationSeconds={8}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
                <div className="absolute top-0 right-1/4 w-64 h-64 bg-[#7C4DFF] rounded-full blur-[120px] opacity-20" />
              </div>

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6"
                >
                  <Palette className="w-4 h-4 text-[#7C4DFF]" />
                  <span className="text-sm text-white/80">Build with us</span>
                </motion.div>

                <h2 className="text-4xl md:text-6xl mb-6">
                  Ready to build the
                  <br />
                  <span className="bg-gradient-to-r from-[#7C4DFF] to-[#4FC3F7] bg-clip-text text-transparent">
                    next big thing?
                  </span>
                </h2>

                <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
                  Join creators building meaningful projects with talented teams and solid funding.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/apply">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#7C4DFF] to-[#4FC3F7] hover:opacity-90 transition-opacity rounded-2xl px-10"
                    >
                      Join Waitlist
              </Button>
            </Link>
          </div>

                <p className="mt-8 text-sm text-white/40">
                  No upfront costs • 5% commission • Get paid for your craft
                </p>
              </div>
            </div>
          </motion.div>
          </div>
      </section>
      </div>
  );
}
