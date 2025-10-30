import React from "react";
import { Hero } from "../components/Hero";
import { PersonaCards } from "../components/PersonaCards";
import { HowItWorks } from "../components/HowItWorks";
import { SubmitInnovation } from "../components/SubmitInnovation";
import { FAQ } from "../components/FAQ";
import { CTABanner } from "../components/CTABanner";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      <Hero />
      <PersonaCards />
      <HowItWorks />
      <SubmitInnovation />
      <FAQ />
      <CTABanner />
    </div>
  );
}

