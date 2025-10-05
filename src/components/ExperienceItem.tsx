export type Experience = {
  company: string;
  role: string;
  period: string;
  location?: string;
  bullets: string[];
  tech?: string[];
};

export default function ExperienceItem({ experience }: { experience: Experience }) {
  return (
    <div className="rounded-lg border border-black/[.08] dark:border-white/[.12] p-4 bg-background">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h3 className="font-semibold tracking-tight">{experience.role}</h3>
          <p className="text-sm text-black/70 dark:text-white/70">{experience.company}</p>
        </div>
        <div className="text-xs text-black/60 dark:text-white/60">{experience.period}</div>
      </div>
      {experience.location ? (
        <div className="mt-1 text-xs text-black/60 dark:text-white/60">{experience.location}</div>
      ) : null}
      <ul className="mt-3 list-disc pl-5 text-sm space-y-1">
        {experience.bullets.map((b, idx) => (
          <li key={idx}>{b}</li>
        ))}
      </ul>
      {experience.tech && experience.tech.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {experience.tech.map((t) => (
            <span key={t} className="text-xs rounded bg-black/[.06] dark:bg-white/[.08] px-2 py-1">
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}


