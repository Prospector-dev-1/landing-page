import {React} from "react";
import { motion } from "motion/react";
import AnimatedRadialBackground from "../components/AnimatedRadialBackground";
import { Lightbulb, Rocket, Users, Shield, Hammer, Plus, CheckCircle, Wrench, WrenchIcon, HelpCircle } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";


export default function ForInnovatorsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a]">
          <AnimatedRadialBackground
            className="opacity-30"
            colors={["#14B8A6", "#84CC16", "#14B8A6"]}
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
                <Lightbulb className="w-4 h-4 text-[#4FC3F7]" />
                <span className="text-sm text-white/70">For Innovators</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-white via-[#4FC3F7] to-[#7C4DFF] bg-clip-text text-transparent">
                Build and Scale your startup
                <br />
                with capital and talent
              </h1>

              <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
                If you have been working on a product and need funding or a team to scale, join our waitlist. 
                We verify your startup is legitimate to ensure quality, then connect you with investors and top creators.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/apply">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#4FC3F7] to-[#7C4DFF] hover:opacity-90 transition-opacity rounded-2xl px-8"
                  >
                    Join Waitlist
                </Button>
              </Link>
              </div>
            </motion.div>
          </div>
            </div>
      </section>

      {/* Process Section */}
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
            <h2 className="text-4xl md:text-5xl mb-4">How it works</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Simple verification, then join the waitlist
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Apply for beta",
                description: "Fill out the application form with your Name, Email, \nInnovation's overview, and a link to your Pitchdeck (optional).",
               
                color: "#4FC3F7",
              },
              {
                step: "2",
                title: "Verification review",
                description: "We verify your startup is legitimate (not a phony submission).\nThis ensures quality and prevents spam.",
                color: "#7C4DFF",
              },
              {
                step: "3",
                title: "Join the waitlist",
                description: "Once verified, you will recieve an email with confirmation and a link to the platform.",
                color: "#4FC3F7",
              },
              
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="mb-8 flex gap-6 items-start"
              >
                <div className="flex-shrink-0">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}30, ${item.color}10)`,
                      border: `2px solid ${item.color}`,
                      boxShadow: `0 8px 32px ${item.color}40`,
                      color: item.color,
                    }}
                  >
                    {item.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl mb-2">{item.title}</h3>
                  <p className="text-white/60">
                    {item.description.split('\n').map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <div className="px-6 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center">
              <span className="text-sm text-white/70">Verification within ~48 hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0f0a1f] to-[#0a0a1a]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">What you'll get</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Comprehensive support to bring your vision to life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Rocket,
                title: "Investor Connections",
                description: "Investors will see your pitch in their feed, once interested, they can easily view your full innovation's profile (pitchdeck), and send you a message directly.",
                color: "#4FC3F7",
              },
              {
                icon: Hammer,
                title: "Creators",
                description: "Onboard Freelancers, Interns, and other talent to help you build or scale your innovation for either a fixed pay, Equity, or even Commission.",
                color: "#7C4DFF",
              },
              {
                icon: Users,
                title: "Teams",
                description: "Connect with and create your team of other innovators, investors, and creators all in one place.",
                color: "#7C4DFF",
              },
              {
                icon: Shield,
                title: "Optional NDA Protection",
                description: "If turned on, Investors will have to agree to a NDA before viewing your full innovation (Your pitch will be publicly available).",
                color: "#4FC3F7",
              }
              
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
                  <p className="text-white/60">
                    {item.description.split('\n').map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Submission Package Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a1a]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
              <h2 className="text-4xl md:text-5xl mb-4">Beta Application Requirements</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              What we need, and why we need it, to evaluate your application
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: CheckCircle,
                  title: "Overview",
                  description: "A brief overview of your innovation, what it does, and who it's for.",
                  color: "#4FC3F7",
                },
                {
                  icon: Plus,
                  title: "Aditional information (optional)",
                  description: "Either your Pitchdeck, or a 60–120s walkthrough showing your product in action (can be a prototype).",
                  color: "#4FC3F7",
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
                  <p className="text-white/60 text-sm">
                    {item.description.split('\n').map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 justify-center mt-12">
            {[
             {
              icon: HelpCircle,
              title: "Why?",
              description: "To keep FishTank authentic, only verified innovations make it through — no fakes, just real founders with real Innovations. Most applications are approved; our review simply filters out bots or duplicate accounts to keep things fair for everyone. Everything you submit is seen only by FishTank’s moderators for verification.",
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
            ></motion.div>
              
            
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a]" />
        <AnimatedRadialBackground
          className=""
          colors={["#14B8A630", "#84CC1630", "#14B8A630"]}
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
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#4FC3F7] rounded-full blur-[120px] opacity-20" />
              </div>

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6"
                >
                  <Lightbulb className="w-4 h-4 text-[#4FC3F7]" />
                  <span className="text-sm text-white/80">Ready to innovate?</span>
                </motion.div>

                <h2 className="text-4xl md:text-6xl mb-6">
                  Are you ready to <span className="bg-gradient-to-r from-[#4FC3F7] to-[#7C4DFF] bg-clip-text text-transparent">
                    Start-up?
                  </span>
                </h2>  
                  
                

                <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
                  Join the waitlist to get access to Beta platform, and first dibs on both Investors and Creators.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/apply">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#4FC3F7] to-[#7C4DFF] hover:opacity-90 transition-opacity rounded-2xl px-10"
                    >
                      Join Waitlist
                    </Button>
                  </Link>
                </div>

                <p className="mt-8 text-sm text-white/40">
                  18 + or legal guardians approval required • Free to join • Verification in less than 48 hours
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
     </div>
  );
}
