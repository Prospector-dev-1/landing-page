import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContentCard } from "../components/ContentCard";
import { Button } from "../components/ui/button";
import { motion } from "motion/react";
import AnimatedRadialBackground from "../components/AnimatedRadialBackground";
import { CheckCircle2, Sparkles, User, Briefcase, Rocket } from "lucide-react";
import { toast } from "sonner";
import { SEO } from "../components/SEO";

type Role = "investor" | "innovator" | "creator";

interface Field {
  key: string;
  label: string;
  type: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
}

const fieldsByRole: Record<Role, Field[]> = {
  creator: [
    { key: "email", label: "Email", type: "email", required: true },
    { key: "name", label: "Full Name", type: "text", required: true },
    { key: "phone", label: "Phone Number", type: "tel", required: true },
    { key: "skill", label: "Primary Skill", type: "text", required: true, placeholder: "e.g., Frontend, Video, Growth" },
    { key: "website", label: "Website / Portfolio (optional)", type: "url", required: false },
  ],
  investor: [
    { key: "email", label: "Email", type: "email", required: true },
    { key: "name", label: "Full Name", type: "text", required: true },
    { key: "phone", label: "Phone Number", type: "tel", required: true },
    { key: "vcfirm", label: "VC Firm?", type: "select", options: ["Yes", "No"], required: true },
    { key: "website", label: "Website (optional)", type: "url", required: false },
  ],
  innovator: [
    { key: "email", label: "Email", type: "email", required: true },
    { key: "name", label: "Full Name", type: "text", required: true },
    { key: "phone", label: "Phone Number", type: "tel", required: true },
    { key: "building", label: "What are you building?", type: "textarea", required: true },
    { key: "website", label: "Website or Demo (optional)", type: "url", required: false },
    { key: "deck", label: "Pitch Deck (link)", type: "url", required: false },
    { key: "stage", label: "Stage", type: "select", options: ["Early Stage", "MVP", "Beta", "Launched", "Scaling"], required: true },
  ],
};

export default function ApplyPage() {
  const [role, setRole] = useState<Role>("innovator");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement | null>(null);
  const formStartMs = useRef<number>(Date.now());

  useEffect(() => {
    formStartMs.current = Date.now();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Anti-spam: honeypot + min time-on-form
    if (honeypotRef.current && honeypotRef.current.value) {
      toast.error("Submission blocked.");
      return;
    }
    if (Date.now() - formStartMs.current < 3000) {
      toast.error("Please take a moment to complete the form.");
      return;
    }
    const missingFields = fieldsByRole[role]
      .filter((f) => f.required && !formData[f.key])
      .map((f) => f.label);
    
    if (missingFields.length > 0) {
      toast.error("Please fill: " + missingFields.join(", "));
      return;
    }
    
    const env = (import.meta as any).env as Record<string, string>;
    const url = env.VITE_APPS_SCRIPT_URL as string;
    const apiKey = env.VITE_API_KEY as string;
    const sheet = (env.VITE_SHEETS_TAB_APPLY as string) || "Apply";

    if (!url || !apiKey) {
      toast.error("Submission service not configured.");
      return;
    }

    setSubmitting(true);
    setSubmitMessage(null);
    const payload = {
      key: apiKey,
      sheet,
      form: "apply",
      role,
      data: formData,
    };
    const body = new URLSearchParams();
    body.set("json", JSON.stringify(payload));

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: body.toString(),
    })
      .then(async (res) => {
        const result = await res.json();
        if (result.ok) {
          setSubmitMessage(
            `Thanks! You joined the waitlist as ${role.charAt(0).toUpperCase() + role.slice(1)}. We'll be in touch.`
          );
          toast.success("Application submitted.");
          setFormData({});
        } else {
          toast.error("Error: " + (result.error || "Submission failed"));
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("There was an error submitting your application. Please try again later.");
      })
      .finally(() => setSubmitting(false));
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const renderField = (field: Field) => {
    const id = `field_${field.key}`;
    
    if (field.type === "select") {
      return (
        <div key={field.key}>
          <label htmlFor={id} className="block text-white/70 font-semibold mb-2">
            {field.label}
          </label>
          <select
            id={id}
            name={field.key}
            required={field.required}
            value={formData[field.key] || ""}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white"
          >
            <option value="">Select...</option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt.toLowerCase()}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      );
    }
    
    if (field.type === "textarea") {
      return (
        <div key={field.key}>
          <label htmlFor={id} className="block text-white/70 font-semibold mb-2">
            {field.label}
          </label>
          <textarea
            id={id}
            name={field.key}
            required={field.required}
            value={formData[field.key] || ""}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white min-h-[120px] resize-y"
          />
        </div>
      );
    }
    
    return (
      <div key={field.key}>
        <label htmlFor={id} className="block text-white/70 font-semibold mb-2">
          {field.label}
        </label>
        <input
          id={id}
          name={field.key}
          type={field.type}
          required={field.required}
          placeholder={field.placeholder}
          value={formData[field.key] || ""}
          onChange={(e) => handleInputChange(field.key, e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white"
        />
      </div>
    );
  };

  const fields = fieldsByRole[role];

  return (
    <>
      <SEO 
        path="/apply"
        title="Apply to Join Fishtank — Join Beta"
        description="Join Fishtank as an innovator, creator, or investor. Connect with curated matches, track milestones, and build with transparent execution."
      />
      <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Single centered form layout */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a]">
          <AnimatedRadialBackground
            className="opacity-70"
            colors={["rgba(34,197,94,0.35)", "rgba(245,158,11,0.30)", "rgba(34,197,94,0.35)"]}
            durationSeconds={10}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8"
                >
                  <Sparkles className="w-4 h-4 text-[#4FC3F7]" />
                  <span className="text-sm text-white/70">Limited beta access</span>
                </motion.div>

                <h1 className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-white via-[#4FC3F7] to-[#7C4DFF] bg-clip-text text-transparent">
                  Join the Waitlist
                </h1>

                <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
                  Tell us who you are. We'll tailor the form and keep you in the loop.
                </p>

                {/* Role selector */}
                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={() => setRole("investor")}
                    className={`px-4 py-2 rounded-xl border backdrop-blur-sm transition-all inline-flex items-center gap-2 ${
                      role === "investor"
                        ? "border-[#4FC3F7] bg-[#4FC3F7]/30 shadow-[0_0_0_1px_rgba(79,195,247,0.3)]"
                        : "border-white/20 bg-white/10 hover:border-white/30"
                    }`}
                  >
                    <Briefcase className="w-4 h-4" /> Investor
                  </button>
                  <button
                    onClick={() => setRole("innovator")}
                    className={`px-4 py-2 rounded-xl border backdrop-blur-sm transition-all inline-flex items-center gap-2 ${
                      role === "innovator"
                        ? "border-[#4FC3F7] bg-[#4FC3F7]/30 shadow-[0_0_0_1px_rgba(79,195,247,0.3)]"
                        : "border-white/20 bg-white/10 hover:border-white/30"
                    }`}
                  >
                    <Rocket className="w-4 h-4" /> Innovator
                  </button>
                  <button
                    onClick={() => setRole("creator")}
                    className={`px-4 py-2 rounded-xl border backdrop-blur-sm transition-all inline-flex items-center gap-2 ${
                      role === "creator"
                        ? "border-[#4FC3F7] bg-[#4FC3F7]/30 shadow-[0_0_0_1px_rgba(79,195,247,0.3)]"
                        : "border-white/20 bg-white/10 hover:border-white/30"
                    }`}
                  >
                    <User className="w-4 h-4" /> Creator
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Centered form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field - hidden from users */}
                <input
                  ref={honeypotRef}
                  type="text"
                  name="company_website"
                  autoComplete="off"
                  tabIndex={-1}
                  className="hidden"
                  aria-hidden="true"
                />
                <ContentCard className="space-y-4 bg-white/5 backdrop-blur-xl border-white/10">
                  {fields.map((field) => renderField(field))}
                </ContentCard>

                <div className="flex flex-wrap gap-3">
                  <Button
                    type="submit"
                    disabled={submitting}
                    size="lg"
                    className="bg-gradient-to-r from-[#4FC3F7] to-[#7C4DFF] hover:opacity-90 transition-opacity rounded-xl px-8"
                  >
                    {submitting ? "Submitting..." : "Join Waitlist"}
                  </Button>
                  <Link to="/">
                    <Button variant="outline" size="lg" className="border-white/20 hover:bg-white/10 rounded-xl">
                      Back to Home
                    </Button>
                  </Link>
                </div>
                {submitMessage && (
                  <p className="text-sm text-white/70">{submitMessage}</p>
                )}
              </form>
            </motion.div>

            {/* Benefits footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex flex-wrap gap-6 justify-center text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4FC3F7]" />
                  <span>Curated matches</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4FC3F7]" />
                  <span>48hr verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4FC3F7]" />
                  <span>Free to join</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
