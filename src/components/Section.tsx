import React, { ReactNode } from "react";
import { cn } from "./ui/utils";

interface SectionProps {
  children?: ReactNode;
  variant?: "default" | "muted" | "dark";
  className?: string;
}

export function Section({ children, variant = "default", className }: SectionProps) {
  const variantStyles = {
    default: "bg-[#0a0a1a]",
    muted: "bg-gradient-to-b from-[#0a0a1a] via-[#0f0a1f] to-[#0a0a1a]",
    dark: "bg-[#0a0a1a]",
  };

  return (
    <section className={cn("py-24 relative overflow-hidden", variantStyles[variant], className)}>
      {children}
    </section>
  );
}


