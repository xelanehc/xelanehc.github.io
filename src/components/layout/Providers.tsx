"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";

import RevealObserver from "@/components/motion/RevealObserver";

// Toasts only appear after a user action, so the toaster loads after hydration.
const Toaster = dynamic(
  () => import("@/components/ui/sonner").then((mod) => mod.Toaster),
  { ssr: false },
);

const loadFeatures = () =>
  import("@/components/motion/features").then((mod) => mod.default);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/* "user" disables transform/layout animations under prefers-reduced-motion. */}
      {/* `strict` makes any full `motion.*` component throw: use `m.*`. */}
      <LazyMotion features={loadFeatures} strict>
        <MotionConfig reducedMotion="user">
          {children}
          <RevealObserver />
          <Toaster position="bottom-center" />
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}
