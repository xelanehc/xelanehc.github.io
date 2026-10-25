import { MailIcon } from "lucide-react";

import Reveal from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/content";

import CopyEmailButton from "../CopyEmailButton";

export default function ContactCta() {
  const profile = getProfile();

  return (
    <Reveal as="section">
      <div className="flex flex-col items-start justify-between gap-6 rounded-xl border border-border bg-gradient-to-br from-card to-accent/60 p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Let&apos;s connect
          </h2>
          <p className="mt-1 text-muted-foreground">
            Questions, ideas, or opportunities? My inbox is open.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="lg" asChild>
            <a href={`mailto:${profile.email}`}>
              <MailIcon />
              Email me
            </a>
          </Button>
          <CopyEmailButton email={profile.email} />
        </div>
      </div>
    </Reveal>
  );
}
