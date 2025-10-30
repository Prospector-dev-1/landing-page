import { ReactNode, React } from "react";

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="pt-20">
      {children}
    </div>
  );
}

