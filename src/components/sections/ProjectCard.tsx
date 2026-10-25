import { ArrowUpRightIcon } from "lucide-react";

import SocialIcon from "@/components/icons/SocialIcon";
import { formatProjectDate } from "@/lib/content";
import type { Project } from "@/types/content";

import TechList from "./TechList";

export default function ProjectCard({ project }: { project: Project }) {
  const { slug, title, summary, highlights, tech, links } = project;

  return (
    <article
      id={slug}
      className="flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-brand/40 sm:p-6"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-semibold tracking-tight">{title}</h3>
        <span className="font-mono text-xs text-muted-foreground">
          {formatProjectDate(project)}
        </span>
      </div>
      <p className="mt-2 text-sm text-pretty">{summary}</p>
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
      {links.repo || links.live ? (
        <div className="mt-auto flex gap-4 pt-5 text-sm">
          {links.live ? (
            <a
              href={links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium hover:text-brand"
            >
              Live <ArrowUpRightIcon className="size-3.5" />
            </a>
          ) : null}
          {links.repo ? (
            <a
              href={links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium hover:text-brand"
            >
              <SocialIcon kind="github" className="size-3.5" /> Code
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
