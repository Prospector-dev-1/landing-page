import { React, ReactNode } from "react";
import { cn } from "./ui/utils";

interface ContentCardProps {
  children: ReactNode;
  className?: string;
}

export function ContentCard({ children, className }: ContentCardProps) {
  return (
    <div
      className={cn(
        "bg-white/5 border border-white/10 rounded-2xl p-6",
        className
      )}
    >
      {children}
    </div>
  );
}


