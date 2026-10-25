import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ProjectLinks from "@/components/sections/ProjectLinks";
import TechList from "@/components/sections/TechList";
import { Badge } from "@/components/ui/badge";
import {
  areaLabels,
  formatProjectDate,
  getProjectBySlug,
  getProjects,
} from "@/lib/content";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const CaseStudy = project.hasCaseStudy
    ? (await import(`@/content/projects/${slug}.mdx`)).default
    : null;

  const projects = getProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[index - 1];
  const next = projects[index + 1];

  return (
    <article className="mx-auto max-w-3xl">
      <Link
        href="/projects"
        className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
        All projects
      </Link>

      <header className="mt-8 space-y-4 border-b border-border pb-8">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
          <span>{formatProjectDate(project)}</span>
          {project.context ? <span>· {project.context}</span> : null}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {project.title}
        </h1>
        <p className="text-lg text-pretty text-muted-foreground">
          {project.summary}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.areas.map((area) => (
            <Badge
              key={area}
              variant="outline"
              className="border-brand/40 text-brand"
            >
              {areaLabels[area]}
            </Badge>
          ))}
        </div>
        <TechList items={project.tech} />
        <ProjectLinks links={project.links} className="pt-2" />
      </header>

      <div className="py-10">
        {CaseStudy ? (
          <CaseStudy />
        ) : (
          <ul className="space-y-2 text-muted-foreground">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}
      </div>

      {prev || next ? (
        <nav
          aria-label="More projects"
          className="grid gap-3 border-t border-border pt-8 sm:grid-cols-2"
        >
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group rounded-xl border border-border p-4 transition-colors hover:border-brand/40"
            >
              <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
                <ArrowLeftIcon className="size-3" /> Newer
              </span>
              <span className="mt-1 block font-medium">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group rounded-xl border border-border p-4 text-right transition-colors hover:border-brand/40"
            >
              <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
                Older <ArrowRightIcon className="size-3" />
              </span>
              <span className="mt-1 block font-medium">{next.title}</span>
            </Link>
          ) : null}
        </nav>
      ) : null}
    </article>
  );
}
