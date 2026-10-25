import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { highlights } from "@/content/highlights";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { publications } from "@/content/publications";
import { skills } from "@/content/skills";
import type {
  Area,
  Experience,
  ExperienceKind,
  Project,
  YearMonth,
} from "@/types/content";

/** Ongoing entries sort first, then by end date, then by start date. */
function byRecency<T extends { start: YearMonth; end?: YearMonth }>(
  a: T,
  b: T,
) {
  const endA = a.end ?? "9999-12";
  const endB = b.end ?? "9999-12";
  if (endA !== endB) return endB.localeCompare(endA);
  return b.start.localeCompare(a.start);
}

export const areaLabels: Record<Area, string> = {
  backend: "Backend",
  systems: "Distributed Systems",
  graphs: "Graphs",
  mobile: "Mobile",
  web: "Web",
  ml: "Machine Learning",
  robotics: "Robotics",
};

export function getHighlights() {
  return highlights;
}

export function getProfile() {
  return profile;
}

export function getExperience(kind?: ExperienceKind): Experience[] {
  const entries = kind ? experience.filter((e) => e.kind === kind) : experience;
  return [...entries].sort(byRecency);
}

export function getExperienceById(id: string) {
  return experience.find((e) => e.id === id);
}

export function getProjects(): Project[] {
  return [...projects].sort(byRecency);
}

export function getFeaturedProjects() {
  return getProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getPublications() {
  return [...publications].sort((a, b) => b.year - a.year);
}

export function getEducation() {
  return education;
}

export function getSkills() {
  return skills;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatYearMonth(value: YearMonth) {
  const [year, month] = value.split("-").map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

/** "May 2026 – Aug 2026", "Aug 2024 – Present", or years only ("2023 – 2024"). */
export function formatDateRange(
  start: YearMonth,
  end?: YearMonth,
  { yearsOnly = false }: { yearsOnly?: boolean } = {},
) {
  const fmt = yearsOnly ? (v: YearMonth) => v.slice(0, 4) : formatYearMonth;
  const from = fmt(start);
  const to = end ? fmt(end) : "Present";
  return from === to ? from : `${from} – ${to}`;
}

/** Projects show years; a project without an end date is a single point in time. */
export function formatProjectDate(project: Pick<Project, "start" | "end">) {
  return project.end
    ? formatDateRange(project.start, project.end, { yearsOnly: true })
    : project.start.slice(0, 4);
}
