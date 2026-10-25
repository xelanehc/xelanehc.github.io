import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import SocialIcon from "@/components/icons/SocialIcon";
import Reveal from "@/components/motion/Reveal";
import StatusBadge from "@/components/sections/StatusBadge";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/content";

// Interim home page; the graph hero and full sections land in Phase 5.
const sections = [
  {
    href: "/projects",
    title: "Projects",
    description: "Things I've built, from AI trailers to ML models.",
  },
  {
    href: "/experience",
    title: "Experience",
    description: "Work at Twitch and TikTok, plus research and activities.",
  },
  {
    href: "/contact",
    title: "Contact",
    description: "Say hi about projects, research, or opportunities.",
  },
];

export default function Home() {
  const profile = getProfile();

  return (
    <div className="space-y-16">
      <section className="max-w-2xl space-y-6">
        {profile.status ? <StatusBadge>{profile.status}</StatusBadge> : null}
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {profile.name}
        </h1>
        <p className="text-lg text-pretty text-muted-foreground">
          {profile.tagline}
        </p>
        <ul className="space-y-1 font-mono text-sm text-muted-foreground">
          {profile.currently.map((line) => (
            <li key={line}>
              <span className="text-brand">→</span> {line}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {profile.socials.map((social) => (
            <Button key={social.kind} variant="outline" asChild>
              <a
                href={social.href}
                {...(social.kind === "email"
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
              >
                <SocialIcon kind={social.kind} />
                {social.label}
              </a>
            </Button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {sections.map((section, i) => (
          <Reveal key={section.href} delay={i * 0.06}>
            <Link
              href={section.href}
              className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-brand/40"
            >
              <h2 className="font-medium">{section.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {section.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
                View
                <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
