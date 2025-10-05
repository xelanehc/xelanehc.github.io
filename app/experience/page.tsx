import ExperienceItem from "@/components/ExperienceItem";
import { experience } from "@/data/experience";

export const metadata = {
  title: "Experience",
  description: "Work experience for Alex Chen.",
};

export default function ExperiencePage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-tight">Experience</h1>
      <p className="mt-2 text-black/70 dark:text-white/70">
        Roles, internships, and research positions.
      </p>
      <div className="mt-6 space-y-4">
        {experience.map((e, idx) => (
          <ExperienceItem key={idx} experience={e} />
        ))}
      </div>
    </section>
  );
}


