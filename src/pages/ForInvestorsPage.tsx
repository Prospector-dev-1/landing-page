import {React} from "react";
import { motion } from "motion/react";
import { TrendingUp, File, Shield, AtomIcon, Clock, Search, MessageSquare, DollarSign, CheckCircle, Users } from "lucide-react";
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
              className="text-center">
            
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
              
                <TrendingUp className="w-4 h-4 text-[#4FC3F7]" />
                <span className="text-sm text-white/70">For Investors</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-white via-[#4FC3F7] to-[#7C4DFF] bg-clip-text text-transparent">
                Access reviewed
                <br />
                Early-stage Innovations
              </h1>

              <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
                Fund against milestones, monitor progress, and double down when traction proves out.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#4FC3F7] to-[#7C4DFF] hover:opacity-90 transition-opacity rounded-2xl px-8">
                    <Link to="/apply">Join Waitlist</Link>
                </Button>
  
                <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 hover:bg-white/10 rounded-2xl px-8"
                  >
                 <Link to="/learn-more?tab=investors">Learn More</Link>
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
                icon: Clock,
                title: "Quick Pitches",
                description: "Swipe through short, 30-second video pitches\nhighlighting quick overview and problem / solution snapshot.",
                color: "#4FC3F7",
              },
              {
                icon: File,
                title: "Deeper Dive",
                description: "Interested in a pitch?\nClick to open the full innovation profile with detailed pitch decks and team info",
                color: "#7C4DFF", 
                
              },
              {
                icon: Users,
                title: "Team & Contact",
                description: "Velocity, on-time rate, acceptance rate, and user traction.",
                color: "#7C4DFF",
              },
              {
                icon: Search,
                title: "Filter & Sort",
                description: "By space, stage, velocity, and milestone risk.",
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
            <h2 className="text-4xl md:text-5xl mb-4">How We Ensure Quality</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              We ensure quality by using our AI-powered vetting algorithm to filter out low-quality pitches.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-4 justify-center">
            {[
             {
              icon: AtomIcon,
              title: "AI-Powered veting Algorithm",
              description: "Our smart algorithms vet and filter out low-quality pitches\nso you only see the most promising innovations that match your interests.\nIt's like having a personalized feed of Ventures curated just for you.",
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
            <p className="text-white/60 max-w-2xl mx-auto">
              Enter the beta and get access to the platform.
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
