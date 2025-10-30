import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PageHeading } from "../components/PageHeading";
import { Section } from "../components/Section";
import { ContentCard } from "../components/ContentCard";
import { Button } from "../components/ui/button";
import { motion } from "motion/react";
import { CheckCircle2, Sparkles, User, Briefcase, Rocket } from "lucide-react";

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
  const [role, setRole] = useState<Role>("investor");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const missingFields = fieldsByRole[role]
      .filter((f) => f.required && !formData[f.key])
      .map((f) => f.label);
    
    if (missingFields.length > 0) {
      alert("Please fill: " + missingFields.join(", "));
      return;
    }
    
    const env = (import.meta as any).env as Record<string, string>;
    const url = env.VITE_APPS_SCRIPT_URL as string;
    const apiKey = env.VITE_API_KEY as string;
    const sheet = (env.VITE_SHEETS_TAB_APPLY as string) || "Apply";

    if (!url || !apiKey) {
      alert("Submission service not configured.");
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
          setFormData({});
        } else {
          alert("Error: " + (result.error || "Submission failed"));
        }
      })
      .catch((err) => {
        console.error(err);
        alert("There was an error submitting your application. Please try again later.");
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
    <Section className="py-16 relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-24 -left-24 w-[380px] h-[380px] rounded-full opacity-20 blur-[120px]"
          animate={{ backgroundColor: ["#4FC3F7", "#7C4DFF", "#4FC3F7"] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-24 -right-24 w-[300px] h-[300px] rounded-full opacity-10 blur-[120px]"
          animate={{ backgroundColor: ["#7C4DFF", "#4FC3F7", "#7C4DFF"] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
            <Sparkles className="w-4 h-4 text-[#4FC3F7]" />
            <span className="text-sm text-white/70">Limited beta access</span>
          </div>
          <PageHeading
            title="Join the Fishtank Waitlist"
            subtitle="Tell us who you are. We'll tailor the form and keep you in the loop."
          />
        </div>

        {/* Role selector */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          <button
            onClick={() => setRole("investor")}
            className={`px-4 py-2 rounded-xl border backdrop-blur-sm transition-all inline-flex items-center gap-2 ${
              role === "investor"
                ? "border-[#4FC3F7] bg-[#4FC3F7]/20 shadow-[0_0_0_1px_rgba(79,195,247,0.2)]"
                : "border-white/10 bg-white/5 hover:border-white/20"
            }`}
          >
            <Briefcase className="w-4 h-4" /> Investor
          </button>
          <button
            onClick={() => setRole("innovator")}
            className={`px-4 py-2 rounded-xl border backdrop-blur-sm transition-all inline-flex items-center gap-2 ${
              role === "innovator"
                ? "border-[#4FC3F7] bg-[#4FC3F7]/20 shadow-[0_0_0_1px_rgba(79,195,247,0.2)]"
                : "border-white/10 bg-white/5 hover:border-white/20"
            }`}
          >
            <Rocket className="w-4 h-4" /> Innovator
          </button>
          <button
            onClick={() => setRole("creator")}
            className={`px-4 py-2 rounded-xl border backdrop-blur-sm transition-all inline-flex items-center gap-2 ${
              role === "creator"
                ? "border-[#4FC3F7] bg-[#4FC3F7]/20 shadow-[0_0_0_1px_rgba(79,195,247,0.2)]"
                : "border-white/10 bg-white/5 hover:border-white/20"
            }`}
          >
            <User className="w-4 h-4" /> Creator
          </button>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <ContentCard className="mb-6 space-y-4 bg-white/5 backdrop-blur-xl border-white/10">
                {fields.map((field) => renderField(field))}
              </ContentCard>

              <div className="flex flex-wrap gap-3">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-to-r from-[#4FC3F7] to-[#7C4DFF] hover:opacity-90 transition-opacity rounded-xl px-6"
                >
                  {submitting ? "Submitting..." : "Join Waitlist"}
                </Button>
                <Link to="/">
                  <Button variant="outline" className="border-white/20 hover:bg-white/10 rounded-xl">
                    Back to Home
                  </Button>
                </Link>
              </div>
              {submitMessage && (
                <p className="text-sm text-white/70">{submitMessage}</p>
              )}
            </form>
          </div>

          {/* Sidebar benefits */}
          <div>
            <ContentCard className="bg-white/5 backdrop-blur-xl border-white/10">
              <h3 className="text-lg font-semibold mb-4">What you get</h3>
              <ul className="space-y-3 text-white/70 text-sm">
                {["Curated matches to your goals","Milestone-based clarity","Early access to launches","Concierge onboarding in beta"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#4FC3F7]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-white/40 mt-4">We review applications within 48 hours.</p>
            </ContentCard>
          </div>
        </div>
      </div>
    </Section>
  );
}
