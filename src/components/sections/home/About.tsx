import { areaLabels, getEducation, getProfile } from "@/lib/content";
import type { Area } from "@/types/content";

import SectionHeading from "../SectionHeading";

const focusAreas: Area[] = ["systems", "graphs", "backend", "mobile", "ml"];

export default function About() {
  const profile = getProfile();
  const [school] = getEducation();

  const facts = [
    { label: "Based in", value: profile.location },
    school
      ? {
          label: "Studying",
          value: `${school.degree}, ${school.school} (${school.end.slice(0, 4)})`,
        }
      : null,
    {
      label: "Focus",
      value: focusAreas.map((a) => areaLabels[a]).join(" · "),
    },
  ].filter((fact) => fact !== null);

  return (
    <section aria-labelledby="about-heading">
      <SectionHeading
        id="about-heading"
        eyebrow="01 · About"
        title="Hi, I'm Alex"
      />
      <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-4 text-pretty text-muted-foreground">
          {profile.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <dl className="space-y-4 rounded-xl border border-border bg-card p-5 text-sm">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="font-mono text-xs text-muted-foreground uppercase">
                {fact.label}
              </dt>
              <dd className="mt-1">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
