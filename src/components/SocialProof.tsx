import { motion } from "motion/react";

export function SocialProof() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-[#0a0a1a]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4FC3F7] to-[#7C4DFF] flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-white/90">Trusted & Secure Platform</p>
              <p className="text-xs text-white/50">Bank-level encryption & verification</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
