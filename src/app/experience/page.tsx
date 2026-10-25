import Reveal from "@/components/motion/Reveal";
import {
  AreaFilterChips,
  AreaFilterProvider,
  Filterable,
  FilterableSection,
} from "@/components/sections/experience/AreaFilter";
import {
  Timeline,
  TimelineItem,
} from "@/components/sections/experience/Timeline";
import ExperienceItem from "@/components/sections/ExperienceItem";
import PageHeader from "@/components/sections/PageHeader";
import PublicationCard from "@/components/sections/PublicationCard";
import SectionHeading from "@/components/sections/SectionHeading";
import TechList from "@/components/sections/TechList";
import {
  areaLabels,
  formatYearMonth,
  getEducation,
  getExperience,
  getExperienceById,
  getPublications,
  getSkills,
} from "@/lib/content";
import type { Area, Experience } from "@/types/content";

export const metadata = {
  title: "Experience",
  description:
    "Work, research, publications, activities, education, and skills for Alex Chen.",
};

const unionAreas = (entries: Experience[]) => [
  ...new Set(entries.flatMap((e) => e.areas)),
];

function EntryTimeline({ entries }: { entries: Experience[] }) {
  return (
    <Timeline>
      {entries.map((entry) => (
        <TimelineItem key={entry.id} areas={entry.areas}>
          <Reveal>
            <ExperienceItem experience={entry} />
          </Reveal>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

export default function ExperiencePage() {
  const work = getExperience("work");
  const research = getExperience("research");
  const activities = getExperience("activity");
  const publications = getPublications().map((p) => ({
    publication: p,
    // A publication follows the filter through its related experience.
    areas: (p.experienceId && getExperienceById(p.experienceId)?.areas) || [],
  }));
  const education = getEducation();
  const skills = getSkills();

  const filterOptions = (Object.keys(areaLabels) as Area[])
    .filter((area) => unionAreas(getExperience()).includes(area))
    .map((area) => ({ area, label: areaLabels[area] }));

  return (
    <AreaFilterProvider>
      <div className="space-y-20">
        <div className="space-y-8">
          <PageHeader
            eyebrow="Experience"
            title="Where I've worked"
            description="Internships, research, and the teams I build with. Filter by area to follow a thread."
          />
          <AreaFilterChips options={filterOptions} />
        </div>

        <FilterableSection
          areas={unionAreas(work)}
          aria-labelledby="work-heading"
        >
          <SectionHeading
            id="work-heading"
            eyebrow="01 · Work"
            title="Industry"
          />
          <EntryTimeline entries={work} />
        </FilterableSection>

        <FilterableSection
          areas={[
            ...unionAreas(research),
            ...publications.flatMap((p) => p.areas),
          ]}
          aria-labelledby="research-heading"
        >
          <SectionHeading
            id="research-heading"
            eyebrow="02 · Research"
            title="Research & publications"
          />
          <div className="space-y-6">
            {publications.map(({ publication, areas }) => (
              <Filterable key={publication.id} areas={areas}>
                <Reveal>
                  <PublicationCard publication={publication} />
                </Reveal>
              </Filterable>
            ))}
            <EntryTimeline entries={research} />
          </div>
        </FilterableSection>

        <FilterableSection
          areas={unionAreas(activities)}
          aria-labelledby="activities-heading"
        >
          <SectionHeading
            id="activities-heading"
            eyebrow="03 · Activities"
            title="Teams & clubs"
          />
          <EntryTimeline entries={activities} />
        </FilterableSection>

        <section aria-labelledby="education-heading">
          <SectionHeading
            id="education-heading"
            eyebrow="04 · Education"
            title="Education"
          />
          <div className="space-y-4">
            {education.map((school) => (
              <Reveal key={school.school}>
                <article className="rounded-xl border border-border bg-card p-5 sm:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-semibold tracking-tight">
                      {school.school}
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground">
                      Expected {formatYearMonth(school.end)}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {school.degree} · {school.location}
                    {school.gpa ? ` · GPA ${school.gpa}` : null}
                  </p>
                  <h4 className="mt-5 mb-2 font-mono text-xs text-muted-foreground uppercase">
                    Relevant coursework
                  </h4>
                  <TechList items={school.coursework} label="Coursework" />
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section aria-labelledby="skills-heading">
          <SectionHeading
            id="skills-heading"
            eyebrow="05 · Skills"
            title="Toolbox"
          />
          <dl className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            {skills.map((group) => (
              <div key={group.label} className="bg-card p-5">
                <dt className="mb-3 font-mono text-xs text-muted-foreground uppercase">
                  {group.label}
                </dt>
                <dd>
                  <TechList items={group.items} label={group.label} />
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </AreaFilterProvider>
  );
}
