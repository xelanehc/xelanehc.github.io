import Reveal from "@/components/motion/Reveal";
import { getHighlights } from "@/lib/content";

import SectionHeading from "../SectionHeading";
import StatValue from "../StatValue";

export default function Highlights() {
  const highlights = getHighlights();

  return (
    <section aria-labelledby="highlights-heading">
      <SectionHeading
        id="highlights-heading"
        eyebrow="02 · Highlights"
        title="A few numbers"
      />
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-4">
        {highlights.map((highlight, i) => (
          <Reveal
            key={highlight.label}
            as="li"
            delay={i * 0.06}
            className="bg-card p-5 sm:p-6"
          >
            <p className="text-3xl font-semibold tracking-tight sm:text-4xl">
              <StatValue highlight={highlight} />
            </p>
            <p className="mt-2 text-sm font-medium">{highlight.label}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {highlight.context}
            </p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
