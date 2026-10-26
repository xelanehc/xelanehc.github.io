import type { MetadataRoute } from "next";

import { getProjects } from "@/lib/content";
import { navItems, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

/** Trailing slashes match the exported URLs (trailingSlash: true). */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) =>
    `${siteConfig.url}${path === "/" ? "/" : `${path}/`}`;

  return [
    ...navItems.map((item) => ({
      url: url(item.href),
      priority: item.href === "/" ? 1 : 0.8,
    })),
    ...getProjects().map((project) => ({
      url: url(`/projects/${project.slug}`),
      priority: 0.6,
    })),
  ];
}
