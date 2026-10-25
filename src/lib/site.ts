export const siteConfig = {
  name: "Alex Chen",
  url: "https://xelanehc.github.io",
  description:
    "Alex Chen is a software engineer and CS student at Georgia Tech working on distributed systems, graph data, and products used by millions.",
  repo: "https://github.com/xelanehc/xelanehc.github.io",
} as const;

export type NavItem = {
  href: string;
  label: string;
};

/** Primary navigation, shared by the navbar, footer, command menu, and sitemap. */
export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];
