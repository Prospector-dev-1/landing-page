import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { CheckCircle2, Sparkles, Briefcase, Rocket, User } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import React from "react";

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

export function SubmitInnovation() {
  const [role, setRole] = useState<Role>("innovator");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [feedbackData, setFeedbackData] = useState({ name: "", email: "", message: "" });
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
          <Label htmlFor={id} className="text-white/90">
            {field.label}
          </Label>
          <select
            id={id}
            name={field.key}
            required={field.required}
            value={formData[field.key] || ""}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            className="mt-2 w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white"
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
          <Label htmlFor={id} className="text-white/90">
            {field.label}
          </Label>
          <Textarea
            id={id}
            name={field.key}
            required={field.required}
            value={formData[field.key] || ""}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            className="mt-2 bg-white/5 border-white/10 focus:border-[#4FC3F7] rounded-xl min-h-[120px]"
          />
        </div>
      );
    }

    return (
      <div key={field.key}>
        <Label htmlFor={id} className="text-white/90">
          {field.label}
        </Label>
        <Input
          id={id}
          name={field.key}
          type={field.type}
          required={field.required}
          placeholder={field.placeholder}
          value={formData[field.key] || ""}
          onChange={(e) => handleInputChange(field.key, e.target.value)}
          className="mt-2 bg-white/5 border-white/10 focus:border-[#4FC3F7] rounded-xl"
        />
      </div>
    );
  };

  const fields = fieldsByRole[role];

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
          {/* Form - keep same size card, change internals to match /apply */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role selector */}
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
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
                  type="button"
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
                  type="button"
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

              {/* Dynamic fields */}
              <div className="space-y-4">
                {fields.map((field) => renderField(field))}
              </div>

              <Button
                size="lg"
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-[#4FC3F7] to-[#7C4DFF] hover:opacity-90 transition-opacity rounded-xl"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {submitting ? "Submitting..." : "Join Waitlist"}
              </Button>

              <p className="text-xs text-white/40 text-center">
                We review all submissions within 48 hours
              </p>
              {submitMessage && (
                <p className="text-sm text-white/70 text-center">{submitMessage}</p>
              )}
            </form>
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
            {/* Feedback form */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h3 className="text-xl mb-2">Ask a question, or suggest a feature</h3>
              <p className="text-white/60 text-sm mb-6">We usually reply within 1–2 days</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!feedbackData.name || !feedbackData.email || !feedbackData.message) {
                    alert("Please fill: Name, Email, and Question/Feature");
                    return;
                  }
                  const env = (import.meta as any).env as Record<string, string>;
                  const url = env.VITE_APPS_SCRIPT_URL as string;
                  const apiKey = env.VITE_API_KEY as string;
                  const sheet = (env.VITE_SHEETS_TAB_FEEDBACK as string) || "Feedback";

                  if (!url || !apiKey) {
                    alert("Submission service not configured.");
                    return;
                  }

                  setFeedbackSubmitting(true);
                  setFeedbackMessage(null);
                  const payload = {
                    key: apiKey,
                    sheet,
                    form: "feedback",
                    data: feedbackData,
                  };
                  const body = new URLSearchParams();
                  body.set("json", JSON.stringify(payload));

                  fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
                    body: body.toString(),
                  })
                    .then(async (res) => {
                      const result = await res.json();
                      if (result.ok) {
                        setFeedbackMessage("Thanks! We received your message.");
                        setFeedbackData({ name: "", email: "", message: "" });
                      } else {
                        alert("Error: " + (result.error || "Submission failed"));
                      }
                    })
                    .catch((err) => {
                      console.error(err);
                      alert("There was an error submitting your message. Please try again later.");
                    })
                    .finally(() => setFeedbackSubmitting(false));
                }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="fb_name" className="text-white/90">Name</Label>
                  <Input
                    id="fb_name"
                    value={feedbackData.name}
                    onChange={(e) => setFeedbackData({ ...feedbackData, name: e.target.value })}
                    className="mt-2 bg-white/5 border-white/10 focus:border-[#4FC3F7] rounded-xl"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="fb_email" className="text-white/90">Email</Label>
                  <Input
                    id="fb_email"
                    type="email"
                    value={feedbackData.email}
                    onChange={(e) => setFeedbackData({ ...feedbackData, email: e.target.value })}
                    className="mt-2 bg-white/5 border-white/10 focus:border-[#4FC3F7] rounded-xl"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="fb_message" className="text-white/90">Question or Feature Request</Label>
                  <Textarea
                    id="fb_message"
                    value={feedbackData.message}
                    onChange={(e) => setFeedbackData({ ...feedbackData, message: e.target.value })}
                    className="mt-2 bg-white/5 border-white/10 focus:border-[#4FC3F7] rounded-xl min-h-[100px]"
                    placeholder="How can we help?"
                    required
                  />
                </div>
                <Button
                  size="lg"
                  type="submit"
                  disabled={feedbackSubmitting}
                  className="w-full bg-gradient-to-r from-[#4FC3F7] to-[#7C4DFF] hover:opacity-90 transition-opacity rounded-xl"
                >
                  {feedbackSubmitting ? "Sending..." : "Send Message"}
                </Button>
                {feedbackMessage && (
                  <p className="text-sm text-white/70 text-center">{feedbackMessage}</p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
