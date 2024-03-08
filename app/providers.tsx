"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider>
        <TooltipProvider>
          <ProgressBar options={{ showSpinner: false }} />
          {children}
        </TooltipProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};
