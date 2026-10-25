import { ArrowUpRightIcon, MailIcon, MapPinIcon } from "lucide-react";

import SocialIcon from "@/components/icons/SocialIcon";
import Reveal from "@/components/motion/Reveal";
import SpotlightCard from "@/components/motion/SpotlightCard";
import CopyEmailButton from "@/components/sections/CopyEmailButton";
import PageHeader from "@/components/sections/PageHeader";
import StatusBadge from "@/components/sections/StatusBadge";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/content";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Alex Chen.",
};

const topics = [
  "Summer 2027 software engineering internships",
  "Graph data systems, distributed systems, and backend infrastructure",
  "Research collaborations and interesting side projects",
];

export default function ContactPage() {
  const profile = getProfile();
  const links = profile.socials.filter((s) => s.kind !== "email");

  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <PageHeader
          eyebrow="Contact"
          title="Say hello"
          description="Whether it's an opportunity, a question about my work, or just a good idea, I'd love to hear from you. Email is the best way to reach me."
        />
        {profile.status ? <StatusBadge>{profile.status}</StatusBadge> : null}
      </div>

      <Reveal>
        <section
          aria-labelledby="email-heading"
          className="rounded-xl border border-border bg-gradient-to-br from-card to-accent/60 p-6 sm:p-8"
        >
          <h2
            id="email-heading"
            className="font-mono text-xs text-muted-foreground uppercase"
          >
            Email
          </h2>
          <a
            href={`mailto:${profile.email}`}
            className="mt-2 block text-2xl font-semibold tracking-tight break-all transition-colors hover:text-brand sm:text-3xl"
          >
            {profile.email}
          </a>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button size="lg" asChild>
              <a href={`mailto:${profile.email}`}>
                <MailIcon />
                Email me
              </a>
            </Button>
            <CopyEmailButton email={profile.email} />
          </div>
        </section>
      </Reveal>

      <section aria-label="Elsewhere" className="grid gap-4 sm:grid-cols-2">
        {links.map((social, i) => (
          <Reveal key={social.kind} delay={i * 0.06}>
            <SpotlightCard>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex items-center gap-4 p-5"
              >
                <span className="flex size-11 items-center justify-center rounded-lg bg-muted">
                  <SocialIcon kind={social.kind} className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{social.label}</span>
                  <span className="block truncate font-mono text-xs text-muted-foreground">
                    {social.handle}
                  </span>
                </span>
                <ArrowUpRightIcon className="size-4 text-muted-foreground transition-transform group-hover/spotlight:translate-x-0.5 group-hover/spotlight:-translate-y-0.5" />
              </a>
            </SpotlightCard>
          </Reveal>
        ))}
      </section>

      <Reveal>
        <section
          aria-labelledby="topics-heading"
          className="grid gap-8 border-t border-border pt-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
        >
          <div>
            <h2
              id="topics-heading"
              className="text-lg font-semibold tracking-tight"
            >
              Happy to talk about
            </h2>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              {topics.map((topic) => (
                <li key={topic} className="relative pl-4">
                  <span
                    aria-hidden="true"
                    className="absolute top-2.5 left-0 size-1.5 rounded-full bg-brand/70"
                  />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
          <p className="flex items-start gap-2 text-sm text-muted-foreground md:justify-end">
            <MapPinIcon className="mt-0.5 size-4 shrink-0" />
            {profile.location} · Eastern Time
          </p>
        </section>
      </Reveal>
    </div>
  );
}
