import { formatDateRange } from "@/lib/content";
import type { Experience } from "@/types/content";

import RichText from "./RichText";
import TechList from "./TechList";

export default function ExperienceItem({
  experience,
}: {
  experience: Experience;
}) {
  const { id, organization, role, team, start, end, location, bullets, tech } =
    experience;

  return (
    <article
      id={id}
      // Linked from the graph and ⌘K; `:target` highlights the entry you jumped to.
      className="scroll-mt-24 rounded-xl border border-border bg-card p-5 transition-colors target:border-brand/60 target:ring-4 target:ring-brand/15 hover:border-brand/40 sm:p-6"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-semibold tracking-tight">
          {organization}
          <span className="font-normal text-muted-foreground"> · {role}</span>
        </h3>
        <p className="font-mono text-xs text-muted-foreground">
          {formatDateRange(start, end)}
        </p>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        {team ? `${team} · ` : null}
        {location}
      </p>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {bullets.map((bullet) => (
          <li key={bullet} className="relative pl-4">
            <span
              aria-hidden="true"
              className="absolute top-2 left-0 size-1.5 rounded-full bg-brand/70"
            />
            <RichText text={bullet} />
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <TechList items={tech} />
      </div>
    </article>
  );
}
