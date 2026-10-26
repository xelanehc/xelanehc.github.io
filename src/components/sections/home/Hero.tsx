import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { buildGraph } from "@/components/graph/buildGraph";
import LazyGraphCanvas from "@/components/graph/LazyGraphCanvas";
import SocialIcon from "@/components/icons/SocialIcon";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/content";

import StatusBadge from "../StatusBadge";

export default function Hero() {
  const profile = getProfile();
  const graph = buildGraph();

  return (
    <section
      aria-labelledby="hero-heading"
      className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-6"
    >
      <div className="space-y-6">
        {profile.status ? <StatusBadge>{profile.status}</StatusBadge> : null}
        <h1
          id="hero-heading"
          className="text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          {profile.name}
        </h1>
        <p className="max-w-xl text-lg text-pretty text-muted-foreground">
          {profile.tagline}
        </p>
        <ul className="space-y-1 font-mono text-sm text-muted-foreground">
          {profile.currently.map((line) => (
            <li key={line}>
              <span aria-hidden="true" className="text-brand">
                →
              </span>{" "}
              {line}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Button size="lg" asChild>
            <Link href="/experience">
              See my work
              <ArrowRightIcon />
            </Link>
          </Button>
          {profile.socials.map((social) => (
            <Button key={social.kind} variant="ghost" size="icon-lg" asChild>
              <a
                href={social.href}
                aria-label={social.label}
                {...(social.kind === "email"
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
              >
                <SocialIcon kind={social.kind} className="size-[1.125rem]" />
              </a>
            </Button>
          ))}
        </div>
      </div>

      <figure className="relative">
        <LazyGraphCanvas
          data={graph}
          className="h-80 w-full sm:h-[26rem] lg:h-[30rem]"
        />
        <figcaption className="mt-2 text-center font-mono text-xs text-muted-foreground">
          <span className="pointer-coarse:hidden">
            hover to explore · drag nodes · click to jump
          </span>
          <span className="hidden pointer-coarse:inline">
            tap a node · tap again to open
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
