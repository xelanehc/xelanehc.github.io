import SocialIcon from "@/components/icons/SocialIcon";
import PageHeader from "@/components/sections/PageHeader";
import StatusBadge from "@/components/sections/StatusBadge";
import { getProfile } from "@/lib/content";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Alex Chen.",
};

export default function ContactPage() {
  const profile = getProfile();

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Contact"
        title="Say hello"
        description="I'm always happy to talk about projects, research, or new opportunities. Email is the best way to reach me."
      />
      {profile.status ? <StatusBadge>{profile.status}</StatusBadge> : null}
      <ul className="grid gap-3 sm:grid-cols-3">
        {profile.socials.map((social) => (
          <li key={social.kind}>
            <a
              href={social.href}
              {...(social.kind === "email"
                ? {}
                : { target: "_blank", rel: "noopener noreferrer" })}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand/40"
            >
              <SocialIcon
                kind={social.kind}
                className="size-5 text-muted-foreground"
              />
              <span className="min-w-0">
                <span className="block text-sm font-medium">
                  {social.label}
                </span>
                <span className="block truncate text-xs text-muted-foreground">
                  {social.handle}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
