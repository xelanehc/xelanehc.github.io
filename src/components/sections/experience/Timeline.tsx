"use client";

import { motion, useScroll } from "motion/react";
import { useRef } from "react";

import type { Area } from "@/types/content";

import { useAreaVisible } from "./AreaFilter";

/**
 * Vertical "edge" connecting entries. A brand-colored line draws down it as
 * the section scrolls through the viewport; under reduced motion only the
 * neutral track shows.
 */
export function Timeline({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });

  return (
    <ol ref={ref} className="relative space-y-6">
      <span
        aria-hidden="true"
        className="absolute top-3 bottom-3 left-[11px] w-px bg-border"
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: scrollYProgress }}
        className="absolute top-3 bottom-3 left-[11px] w-px origin-top bg-brand motion-reduce:hidden"
      />
      {children}
    </ol>
  );
}

export function TimelineItem({
  areas,
  children,
}: {
  areas: Area[];
  children: React.ReactNode;
}) {
  const visible = useAreaVisible(areas);

  return (
    <li hidden={!visible} className="relative pl-10">
      {/* Node: neutral dot with a brand dot that fades in once in view. */}
      <span
        aria-hidden="true"
        className="absolute top-6 left-[5px] size-[13px] rounded-full border-[3px] border-background bg-muted-foreground ring-1 ring-border"
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-brand"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -35% 0px" }}
          transition={{ duration: 0.4 }}
        />
      </span>
      {children}
    </li>
  );
}
