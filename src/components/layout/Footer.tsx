import Link from "next/link";

import SocialIcon from "@/components/icons/SocialIcon";
import { getProfile } from "@/lib/content";
import { navItems, siteConfig } from "@/lib/site";

export default function Footer() {
  const profile = getProfile();
  // Evaluated at build time (static export).
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-medium">{siteConfig.name}</p>
          <p className="text-muted-foreground">
            © {year} · Built with Next.js, Tailwind CSS &amp; Motion ·{" "}
            <a
              href={siteConfig.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:text-foreground hover:underline"
            >
              Source
            </a>
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="flex gap-3">
            {profile.socials.map((social) => (
              <li key={social.kind}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  className="text-muted-foreground transition-colors hover:text-brand"
                  {...(social.kind === "email"
                    ? {}
                    : { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <SocialIcon kind={social.kind} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
