import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { CheckCircle2, Sparkles, Briefcase, Rocket, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import React from "react";
import { toast } from "sonner";

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
    { key: "stage", label: "Stage", type: "select", options: ["Early Stage", "MVP", "Beta", "Launched", "Scaling"], required: false },
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
  const honeypotRefApply = useRef<HTMLInputElement | null>(null);
  const honeypotRefFeedback = useRef<HTMLInputElement | null>(null);
  const formStartMsApply = useRef<number>(Date.now());
  const formStartMsFeedback = useRef<number>(Date.now());

  useEffect(() => {
    formStartMsApply.current = Date.now();
    formStartMsFeedback.current = Date.now();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypotRefApply.current && honeypotRefApply.current.value) {
      toast.error("Submission blocked.");
      return;
    }
    if (Date.now() - formStartMsApply.current < 3000) {
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
    const accessKey = env.VITE_WEB3FORMS_ACCESS_KEY as string;

    if (!accessKey) {
      toast.error("We appologize but somthing went wrong. Please try again later.");
      return;
    }

    setSubmitting(true);
    setSubmitMessage(null);

    // Prepare form data for Web3Forms
    const formDataToSend = new FormData();
    formDataToSend.append("access_key", accessKey);
    formDataToSend.append("subject", `New Application - ${role.charAt(0).toUpperCase() + role.slice(1)}`);
    formDataToSend.append("from_name", formData.name || "Fishtank Application");
    formDataToSend.append("role", role);
    
    // Add all form fields
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage(
          `Thanks! You joined the waitlist as ${role.charAt(0).toUpperCase() + role.slice(1)}. We'll be in touch.`
        );
        toast.success("Application submitted successfully!");
        setFormData({});
      } else {
        toast.error("Error: " + (result.message || "Submission failed"));
      }
    } catch (err) {
      console.error(err);
      toast.error("There was an error submitting your application. Please try again later.");
    } finally {
      setSubmitting(false);
    }
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
              <option key={opt} value={opt}>
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
          <h2 className="text-4xl md:text-5xl mb-4">Join the Beta</h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            
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
              {/* Honeypot field - hidden from users */}
              <input
                ref={honeypotRefApply}
                type="text"
                name="company_website"
                autoComplete="off"
                tabIndex={-1}
                className="hidden"
                aria-hidden="true"
              />
              {/* Role selector */}
              
              <div className="text-center flex flex-wrap justify-center gap-2 sm:gap-3">
                  
                <button
                  type="button"
                  onClick={() => setRole("investor")}
                  className={`flex-1 min-w-[90px] sm:flex-none sm:min-w-[110px] px-3 py-2 sm:px-6 sm:py-2.5 rounded-xl border backdrop-blur-sm transition-all inline-flex items-center justify-center gap-2 text-sm sm:text-base font-medium ${
                    role === "investor"
                      ? "border-[#4FC3F7] bg-[#4FC3F7]/30 shadow-[0_0_0_1px_rgba(79,195,247,0.3)]"
                      : "border-white/20 bg-white/10 hover:border-white/30"
                  }`}
                >
                  <p className="text-white/90">Investor</p>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("innovator")}
                  className={`flex-1 min-w-[90px] sm:flex-none sm:min-w-[110px] px-3 py-2 sm:px-6 sm:py-2.5 rounded-xl border backdrop-blur-sm transition-all inline-flex items-center justify-center gap-2 text-sm sm:text-base font-medium ${
                    role === "innovator"
                      ? "border-[#4FC3F7] bg-[#4FC3F7]/30 shadow-[0_0_0_1px_rgba(79,195,247,0.3)]"
                      : "border-white/20 bg-white/10 hover:border-white/30"
                  }`}
                >
                   Innovator
                </button>
                <button
                  type="button"
                  onClick={() => setRole("creator")}
                  className={`flex-1 min-w-[90px] sm:flex-none sm:min-w-[110px] px-3 py-2 sm:px-6 sm:py-2.5 rounded-xl border backdrop-blur-sm transition-all inline-flex items-center justify-center gap-2 text-sm sm:text-base font-medium ${
                    role === "creator"
                      ? "border-[#4FC3F7] bg-[#4FC3F7]/30 shadow-[0_0_0_1px_rgba(79,195,247,0.3)]"
                      : "border-white/20 bg-white/10 hover:border-white/30"
                  }`}
                >
                   Creator
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
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (honeypotRefFeedback.current && honeypotRefFeedback.current.value) {
                    toast.error("Submission blocked.");
                    return;
                  }
                  if (Date.now() - formStartMsFeedback.current < 3000) {
                    toast.error("Please take a moment to complete the form.");
                    return;
                  }
                  if (!feedbackData.name || !feedbackData.email || !feedbackData.message) {
                    toast.error("Please fill: Name, Email, and Question/Feature");
                    return;
                  }
                  const env = (import.meta as any).env as Record<string, string>;
                  const accessKey = env.VITE_WEB3FORMS_ACCESS_KEY as string;

                  if (!accessKey) {
                    toast.error("Form service not configured. Please add your Web3Forms access key.");
                    return;
                  }

                  setFeedbackSubmitting(true);
                  setFeedbackMessage(null);

                  // Prepare form data for Web3Forms
                  const formDataToSend = new FormData();
                  formDataToSend.append("access_key", accessKey);
                  formDataToSend.append("subject", "New Feedback - Fishtank");
                  formDataToSend.append("from_name", feedbackData.name);
                  formDataToSend.append("email", feedbackData.email);
                  formDataToSend.append("name", feedbackData.name);
                  formDataToSend.append("message", feedbackData.message);

                  try {
                    const response = await fetch("https://api.web3forms.com/submit", {
                      method: "POST",
                      body: formDataToSend,
                    });

                    const result = await response.json();

                    if (result.success) {
                      setFeedbackMessage("Thanks! We received your message.");
                      setFeedbackData({ name: "", email: "", message: "" });
                      toast.success("Message sent successfully!");
                    } else {
                      toast.error("Error: " + (result.message || "Submission failed"));
                    }
                  } catch (err) {
                    console.error(err);
                    toast.error("There was an error submitting your message. Please try again later.");
                  } finally {
                    setFeedbackSubmitting(false);
                  }
                }}
                className="space-y-4"
              >
                {/* Honeypot field - hidden from users */}
                <input
                  ref={honeypotRefFeedback}
                  type="text"
                  name="company_website"
                  autoComplete="off"
                  tabIndex={-1}
                  className="hidden"
                  aria-hidden="true"
                />
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
