/**
 * Content model for the site. Everything under `src/content` conforms to
 * these types; pages read it through `src/lib/content.ts`.
 *
 * Dates are ISO year-month strings ("2025-08") so they sort lexically.
 * Text fields may wrap phrases in `**double asterisks**` to emphasize them
 * (rendered by `RichText`).
 */

export type YearMonth = `${number}-${number}`;

export type Area =
  "backend" | "systems" | "graphs" | "mobile" | "web" | "ml" | "robotics";

export type SocialKind = "email" | "github" | "linkedin";

export type Social = {
  kind: SocialKind;
  label: string;
  href: string;
  handle: string;
};

export type Profile = {
  name: string;
  tagline: string;
  location: string;
  email: string;
  /** Short status shown as a badge; omit to hide. */
  status?: string;
  /** "Currently" lines, e.g. role or school. */
  currently: string[];
  /** About paragraphs. */
  bio: string[];
  socials: Social[];
};

export type ExperienceKind = "work" | "research" | "activity";

export type Experience = {
  /** Stable slug, used for anchors (`/experience/#id`). */
  id: string;
  kind: ExperienceKind;
  organization: string;
  role: string;
  team?: string;
  start: YearMonth;
  /** Omit for an ongoing role. */
  end?: YearMonth;
  location: string;
  areas: Area[];
  bullets: string[];
  tech: string[];
  url?: string;
};

export type ProjectLinks = {
  repo?: string;
  live?: string;
  paper?: string;
};

export type Project = {
  slug: string;
  title: string;
  /** One-line description for cards. */
  summary: string;
  start: YearMonth;
  end?: YearMonth;
  areas: Area[];
  tech: string[];
  highlights: string[];
  links: ProjectLinks;
  featured: boolean;
  /** True when `src/content/projects/<slug>.mdx` exists. */
  hasCaseStudy: boolean;
};

export type Publication = {
  id: string;
  title: string;
  venue: string;
  year: number;
  role: string;
  summary: string;
  url?: string;
  /** Related `Experience.id`. */
  experienceId?: string;
};

export type Education = {
  school: string;
  degree: string;
  location: string;
  end: YearMonth;
  gpa?: string;
  coursework: string[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};
