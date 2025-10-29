import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { CheckCircle2, Sparkles } from "lucide-react";
import { useState } from "react";

export function SubmitInnovation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    startup: "",
    category: "",
  });

  return (
    <section id="submit" className="py-24 relative overflow-hidden">
      {/* Glowing gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4FC3F7]/20 via-[#7C4DFF]/20 to-[#4FC3F7]/20" />
        <div className="absolute inset-0 bg-[#0a0a1a]/90 backdrop-blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4">Submit Your Innovation</h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Take the first step toward making your startup a reality
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          >
            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white/90">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2 bg-white/5 border-white/10 focus:border-[#4FC3F7] rounded-xl"
                  placeholder="Jane Smith"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white/90">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-2 bg-white/5 border-white/10 focus:border-[#4FC3F7] rounded-xl"
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-white/90">
                  Innovation Category
                </Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-2 bg-white/5 border-white/10 focus:border-[#4FC3F7] rounded-xl"
                  placeholder="e.g., AI, FinTech, Healthcare"
                />
              </div>

              <div>
                <Label htmlFor="startup" className="text-white/90">
                  Describe Your Startup
                </Label>
                <Textarea
                  id="startup"
                  value={formData.startup}
                  onChange={(e) => setFormData({ ...formData, startup: e.target.value })}
                  className="mt-2 bg-white/5 border-white/10 focus:border-[#4FC3F7] rounded-xl min-h-[120px]"
                  placeholder="What problem does it solve? What makes it unique?"
                />
              </div>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-[#4FC3F7] to-[#7C4DFF] hover:opacity-90 transition-opacity rounded-xl"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Submit Application
              </Button>

              <p className="text-xs text-white/40 text-center">
                We review all submissions within 48 hours
              </p>
            </div>
          </motion.div>

          {/* Visual mock of pitch approval */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Approval flow visualization */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h3 className="text-xl mb-6">What happens next?</h3>
              
              <div className="space-y-4">
                {[
                  { label: "Application Review", status: "complete" },
                  { label: "Initial Screening", status: "complete" },
                  { label: "Investor Matching", status: "active" },
                  { label: "Team Formation", status: "pending" },
                ].map((step, index) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        step.status === "complete"
                          ? "bg-[#4FC3F7]/20 border-[#4FC3F7]"
                          : step.status === "active"
                          ? "bg-[#7C4DFF]/20 border-[#7C4DFF]"
                          : "bg-white/5 border-white/10"
                      } border`}
                    >
                      {step.status === "complete" ? (
                        <CheckCircle2 className="w-5 h-5 text-[#4FC3F7]" />
                      ) : (
                        <div className={`w-2 h-2 rounded-full ${
                          step.status === "active" ? "bg-[#7C4DFF] animate-pulse" : "bg-white/20"
                        }`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`${
                        step.status === "pending" ? "text-white/40" : "text-white/90"
                      }`}>
                        {step.label}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
