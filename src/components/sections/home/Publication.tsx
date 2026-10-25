import { ArrowUpRightIcon } from "lucide-react";

import Reveal from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/badge";
import { getPublications } from "@/lib/content";

import SectionHeading from "../SectionHeading";

export default function Publication() {
  const [publication] = getPublications();
  if (!publication) return null;

  return (
    <section aria-labelledby="publication-heading" id="publication">
      <SectionHeading
        id="publication-heading"
        eyebrow="05 · Research"
        title="Publication"
      />
      <Reveal>
        <article className="relative overflow-hidden rounded-xl border border-border bg-card p-6 sm:p-8">
          {/* Faint node cluster in the corner, echoing the hero graph. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 120 120"
            className="absolute -top-6 -right-6 size-40 text-brand opacity-15"
          >
            <g stroke="currentColor" strokeWidth="1.5">
              <line x1="30" y1="40" x2="70" y2="25" />
              <line x1="70" y1="25" x2="95" y2="60" />
              <line x1="30" y1="40" x2="60" y2="80" />
              <line x1="60" y1="80" x2="95" y2="60" />
              <line x1="70" y1="25" x2="60" y2="80" />
            </g>
            <g fill="currentColor">
              <circle cx="30" cy="40" r="6" />
              <circle cx="70" cy="25" r="8" />
              <circle cx="95" cy="60" r="6" />
              <circle cx="60" cy="80" r="7" />
            </g>
          </svg>
          <div className="relative max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-brand text-brand-foreground">
                {publication.venue} {publication.year}
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">
                {publication.role}
              </span>
            </div>
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-balance">
              {publication.url ? (
                <a
                  href={publication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-brand"
                >
                  {publication.title}
                  <ArrowUpRightIcon className="size-4" />
                </a>
              ) : (
                publication.title
              )}
            </h3>
            <p className="mt-3 text-pretty text-muted-foreground">
              {publication.summary}
            </p>
          </div>
        </article>
      </Reveal>
    </section>
  );
}
