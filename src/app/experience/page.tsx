import Reveal from "@/components/motion/Reveal";
import ExperienceItem from "@/components/sections/ExperienceItem";
import PageHeader from "@/components/sections/PageHeader";
import { getExperience } from "@/lib/content";

export const metadata = {
  title: "Experience",
  description: "Work, research, and activities for Alex Chen.",
};

export default function ExperiencePage() {
  const roles = getExperience().filter((e) => e.kind !== "activity");
  const activities = getExperience("activity");

  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="Experience"
        title="Where I've worked"
        description="Internships, research, and the teams I build with."
      />

      <section aria-labelledby="roles-heading" className="space-y-4">
        <h2 id="roles-heading" className="text-lg font-semibold tracking-tight">
          Work &amp; Research
        </h2>
        {roles.map((entry) => (
          <Reveal key={entry.id}>
            <ExperienceItem experience={entry} />
          </Reveal>
        ))}
      </section>

      <section aria-labelledby="activities-heading" className="space-y-4">
        <h2
          id="activities-heading"
          className="text-lg font-semibold tracking-tight"
        >
          Activities
        </h2>
        {activities.map((entry) => (
          <Reveal key={entry.id}>
            <ExperienceItem experience={entry} />
          </Reveal>
        ))}
      </section>
    </div>
  );
}
