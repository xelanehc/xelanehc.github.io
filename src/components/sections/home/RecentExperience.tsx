import Link from "next/link";

import Reveal from "@/components/motion/Reveal";
import { formatDateRange, getExperience } from "@/lib/content";

import SectionHeading from "../SectionHeading";

export default function RecentExperience() {
  const entries = getExperience()
    .filter((e) => e.kind !== "activity")
    .slice(0, 3);

  return (
    <section aria-labelledby="experience-heading">
      <SectionHeading
        id="experience-heading"
        eyebrow="04 · Experience"
        title="Recently"
        action={{ href: "/experience", label: "Full experience" }}
      />
      {/* A miniature timeline: nodes on a vertical edge. */}
      <ol className="relative space-y-2 before:absolute before:top-3 before:bottom-3 before:left-[11px] before:w-px before:bg-border">
        {entries.map((entry, i) => (
          <Reveal key={entry.id} as="li" delay={i * 0.06}>
            <Link
              href={`/experience/#${entry.id}`}
              className="group relative flex flex-col gap-1 rounded-lg py-3 pr-3 pl-10 transition-colors hover:bg-muted/60 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
            >
              <span
                aria-hidden="true"
                className="absolute top-[1.15rem] left-[7px] size-[9px] rounded-full border-2 border-background bg-muted-foreground ring-1 ring-border transition-colors group-hover:bg-brand-warm"
              />
              <span>
                <span className="font-medium">{entry.organization}</span>
                <span className="text-muted-foreground"> · {entry.role}</span>
              </span>
              <span className="shrink-0 font-mono text-xs text-muted-foreground">
                {formatDateRange(entry.start, entry.end)}
              </span>
            </Link>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
