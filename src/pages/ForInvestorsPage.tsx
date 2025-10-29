import { motion } from "motion/react";
import { TrendingUp, BarChart, Shield, Clock, Search, MessageSquare, DollarSign, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

export default function ForInvestorsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a]">
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, #4FC3F7 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, #7C4DFF 0%, transparent 50%)",
                "radial-gradient(circle at 50% 80%, #4FC3F7 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, #4FC3F7 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
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
                <TrendingUp className="w-4 h-4 text-[#4FC3F7]" />
                <span className="text-sm text-white/70">For Investors</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-white via-[#4FC3F7] to-[#7C4DFF] bg-clip-text text-transparent">
                Access reviewed
                <br />
                early‑stage projects
              </h1>

              <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
                Fund against milestones, monitor progress, and double down when traction proves out.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#4FC3F7] to-[#7C4DFF] hover:opacity-90 transition-opacity rounded-2xl px-8"
                >
                  Request Verification
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You'll See Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a1a]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4FC3F7] rounded-full blur-[128px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">What you'll see</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Standardized pitch overview and transparent execution tracking
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: BarChart,
                title: "Standardized pitch",
                description: "Overview and problem/solution snapshot.",
                color: "#4FC3F7",
              },
              {
                icon: Clock,
                title: "Execution plan",
                description: "Milestones with clear acceptance criteria.",
                color: "#7C4DFF",
              },
              {
                icon: CheckCircle,
                title: "Artifacts and evidence",
                description: "Designs, repos, demos, analytics at each step.",
                color: "#4FC3F7",
              },
              {
                icon: TrendingUp,
                title: "Signals",
                description: "Velocity, on‑time rate, acceptance rate, and user traction.",
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

      {/* Funding Models Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0f0a1f] to-[#0a0a1a]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">Funding models</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Transparent milestone-based funding with escrow protection
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: DollarSign,
                  title: "Milestone tranches",
                  description: "Release capital when work is accepted.",
                  color: "#4FC3F7",
                },
                {
                  icon: Shield,
                  title: "Escrow protection",
                  description: "Funds held until criteria met.",
                  color: "#7C4DFF",
                },
                {
                  icon: TrendingUp,
                  title: "Follow‑on capital",
                  description: "Optional additional capital after predefined traction.",
                  color: "#4FC3F7",
                },
                {
                  icon: MessageSquare,
                  title: "Syndicates",
                  description: "Co‑invest with other verified investors.",
                  color: "#7C4DFF",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}30, ${item.color}10)`,
                      border: `1px solid ${item.color}50`,
                    }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Actions You Can Take Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a1a]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">Actions you can take</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Full control over your investment process
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Search,
                title: "Filter & Sort",
                description: "By space, stage, velocity, and milestone risk.",
                color: "#4FC3F7",
              },
              {
                icon: MessageSquare,
                title: "Ask & Track",
                description: "Post questions, request artifacts, subscribe to updates.",
                color: "#7C4DFF",
              },
              {
                icon: DollarSign,
                title: "Commit by milestone",
                description: "Stage capital per tranche; escrow releases on acceptance.",
                color: "#4FC3F7",
              },
              {
                icon: CheckCircle,
                title: "Monitor progress",
                description: "Track build velocity, on‑time rate, and acceptance metrics.",
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-white/60 max-w-2xl mx-auto">
              Optional NDAs for sensitive materials; access is limited to verified investor accounts during beta.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a]" />
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

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#4FC3F7] rounded-full blur-[120px] opacity-20" />
              </div>

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6"
                >
                  <TrendingUp className="w-4 h-4 text-[#4FC3F7]" />
                  <span className="text-sm text-white/80">Ready to invest?</span>
                </motion.div>

                <h2 className="text-4xl md:text-6xl mb-6">
                  Back high-potential startups
                  <br />
                  <span className="bg-gradient-to-r from-[#4FC3F7] to-[#7C4DFF] bg-clip-text text-transparent">
                    before they hit mainstream
                  </span>
                </h2>

                <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
                  Access curated deal flow with transparent execution and milestone-based funding.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#4FC3F7] to-[#7C4DFF] hover:opacity-90 transition-opacity rounded-2xl px-10"
                  >
                    Request Verification
                  </Button>
                </div>

                <p className="mt-8 text-sm text-white/40">
                  KYC/Verification required • Curated deal flow • Early-stage opportunities
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
  );
}
