import { getExperience, getProfile, getProjects } from "@/lib/content";
import { navItems, siteConfig } from "@/lib/site";

import type { CommandMenuData } from "./CommandMenu";
import Navbar from "./Navbar";

/** Server wrapper: builds the command menu index from content at build time. */
export default function SiteHeader() {
  const profile = getProfile();

  const commandMenu: CommandMenuData = {
    email: profile.email,
    socials: profile.socials
      .filter((s) => s.kind !== "email")
      .map(({ kind, label, href }) => ({ kind, label, href })),
    groups: [
      {
        heading: "Pages",
        kind: "page",
        items: navItems.map(({ href, label }) => ({ href, label })),
      },
      {
        heading: "Experience",
        kind: "experience",
        items: getExperience().map((e) => ({
          href: `/experience/#${e.id}`,
          label: e.role,
          hint: e.organization,
        })),
      },
      {
        heading: "Projects",
        kind: "project",
        items: getProjects().map((p) => ({
          href: `/projects/#${p.slug}`,
          label: p.title,
        })),
      },
    ],
  };

  return (
    <Navbar name={siteConfig.name} items={navItems} commandMenu={commandMenu} />
  );
}
