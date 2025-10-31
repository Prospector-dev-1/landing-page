import React from "react";
import { Hero } from "../components/Hero";
import { PersonaCards } from "../components/PersonaCards";
import { HowItWorks } from "../components/HowItWorks";
import { SubmitInnovation } from "../components/SubmitInnovation";
import { FAQ } from "../components/FAQ";
import { CTABanner } from "../components/CTABanner";
import { SEO } from "../components/SEO";

export default function HomePage() {
  return (
    <>
      <SEO 
        path="/"
        title="Fishtank — Where innovators, creators, and investors collide"
        description="Fishtank connects innovators, creators, and investors to launch and scale startups with milestone-based funding and verifiable outcomes."
      />
      <div className="min-h-screen bg-[#0a0a1a] text-white">
        <Hero />
        <PersonaCards />
        <HowItWorks />
        <SubmitInnovation />
        <FAQ />
        <CTABanner />
      </div>
    </>
  );
}

