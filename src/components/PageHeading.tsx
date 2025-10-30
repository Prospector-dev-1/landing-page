import { React, ReactNode } from "react";

interface PageHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
}

export function PageHeading({ title, subtitle, eyebrow, className = "" }: PageHeadingProps) {
  return (
    <div className={`mb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {eyebrow && (
        <p className="text-sm text-white/70 mb-4 inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5">
          {eyebrow}
        </p>
      )}
      <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
      {subtitle && <p className="text-lg text-white/70 max-w-4xl">{subtitle}</p>}
    </div>
  );
}


