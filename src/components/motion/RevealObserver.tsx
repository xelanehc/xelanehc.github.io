"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Drives `.reveal` elements (see Reveal.tsx). Elements already on screen are
 * left alone, so nothing visible at first paint is ever hidden. Only elements
 * that start off-screen are hidden, then revealed once as they scroll in.
 * Re-scans on every route change.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "shown";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    const elements = document.querySelectorAll<HTMLElement>(
      ".reveal:not([data-reveal])",
    );
    for (const el of elements) {
      const rect = el.getBoundingClientRect();
      const onScreen = rect.top < window.innerHeight && rect.bottom > 0;
      if (onScreen) {
        el.dataset.reveal = "shown";
      } else {
        el.dataset.reveal = "pending";
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
