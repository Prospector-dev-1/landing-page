import React from "react";
import { motion } from "motion/react";

type AnimatedRadialBackgroundProps = {
  colors: string[]; // CSS color strings, e.g. "#4FC3F7" or "rgba(79,195,247,0.4)"
  durationSeconds?: number;
  className?: string; // e.g., opacity utilities
};

export function AnimatedRadialBackground({
  colors,
  durationSeconds = 10,
  className,
}: AnimatedRadialBackgroundProps) {
  const positions = [
    "circle at 20% 50%",
    "circle at 80% 50%",
    "circle at 50% 80%",
    "circle at 20% 50%",
  ];

  const backgroundSequence = positions.map((pos, i) => {
    const color = colors[i % colors.length];
    return `radial-gradient(${pos}, ${color} 0%, transparent 50%)`;
  });

  return (
    <motion.div
      className={`absolute inset-0 ${className ?? ""}`}
      animate={{ background: backgroundSequence }}
      transition={{ duration: durationSeconds, repeat: Infinity, ease: "linear" }}
    />
  );
}

export default AnimatedRadialBackground;


