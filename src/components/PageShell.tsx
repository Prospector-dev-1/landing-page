import React, { type ReactNode } from "react";

interface PageShellProps {
  children?: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div id="main" className="pt-20">
      {children}
    </div>
  );
}

