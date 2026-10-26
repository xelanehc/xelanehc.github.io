import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import SpotlightCard from "@/components/motion/SpotlightCard";
import { formatProjectDate } from "@/lib/content";
import type { Project } from "@/types/content";

import ProjectLinks from "./ProjectLinks";
import TechList from "./TechList";

export default function ProjectCard({
  project,
  headingLevel = "h3",
}: {
  project: Project;
  /** h2 when the card sits directly under the page h1. */
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const { slug, title, summary, context, highlights, tech, links } = project;

  return (
    <SpotlightCard className="h-full">
      <article
        id={slug}
        className="relative z-10 flex h-full flex-col p-5 sm:p-6"
      >
        <div className="flex items-baseline justify-between gap-3">
          <Heading className="font-semibold tracking-tight">
            {/* Stretched link: the whole card opens the project page. */}
            <Link
              href={`/projects/${slug}`}
              className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-ring"
            >
              {title}
            </Link>
          </Heading>
          <span className="shrink-0 font-mono text-xs text-muted-foreground">
            {formatProjectDate(project)}
          </span>
        </div>
        {context ? (
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {context}
          </p>
        ) : null}
        <p className="mt-3 text-sm text-pretty">{summary}</p>
        {highlights.length > 0 ? (
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            {highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        ) : null}
        <div className="mt-4">
          <TechList items={tech} />
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
          <ProjectLinks links={links} />
          <span className="inline-flex items-center gap-1 text-sm font-medium text-brand">
            Details
            <ArrowRightIcon className="size-3.5 transition-transform group-hover/spotlight:translate-x-0.5" />
          </span>
        </div>
      </article>
    </SpotlightCard>
  );
}
