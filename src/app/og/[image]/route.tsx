import { formatProjectDate, getProfile, getProjects } from "@/lib/content";
import { renderOgImage } from "@/lib/og";

/*
 * Open Graph images as real .png files (/og/home.png, /og/<slug>.png).
 * The opengraph-image file convention exports extensionless files, which
 * GitHub Pages serves as application/octet-stream.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { image: "home.png" },
    ...getProjects().map((p) => ({ image: `${p.slug}.png` })),
  ];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ image: string }> },
) {
  const { image } = await params;
  const slug = image.replace(/\.png$/, "");
  const project = getProjects().find((p) => p.slug === slug);

  if (project) {
    return renderOgImage({
      eyebrow: `Project · ${formatProjectDate(project)}`,
      title: project.title,
      subtitle: project.summary,
      footer: "Alex Chen · xelanehc.github.io",
    });
  }

  const profile = getProfile();
  return renderOgImage({
    eyebrow: "Software Engineer · Georgia Tech CS",
    title: profile.name,
    subtitle: profile.tagline,
    footer: profile.status,
  });
}
