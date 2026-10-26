import {
  areaLabels,
  getEducation,
  getExperience,
  getProfile,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";

/** schema.org Person, so search engines can connect the site to its owner. */
export default function PersonJsonLd() {
  const profile = getProfile();
  const [school] = getEducation();
  // Only an ongoing role counts as "works for"; finished internships don't.
  const current = getExperience("work").find((e) => !e.end);

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteConfig.url,
    email: `mailto:${profile.email}`,
    jobTitle: "Software Engineer",
    description: profile.tagline,
    sameAs: profile.socials
      .filter((s) => s.kind !== "email")
      .map((s) => s.href),
    ...(school && {
      affiliation: { "@type": "CollegeOrUniversity", name: school.school },
    }),
    ...(current && {
      worksFor: { "@type": "Organization", name: current.organization },
    }),
    knowsAbout: Object.values(areaLabels),
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output can't contain "</script>" from this static data,
      // but escape "<" anyway as standard practice.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
