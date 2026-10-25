import {
  areaLabels,
  getExperience,
  getProfile,
  getProjects,
  getPublications,
} from "@/lib/content";
import type { Area } from "@/types/content";

import type { GraphData, GraphEdge, GraphNode } from "./types";

/**
 * Builds the hero graph from content: Alex at the center, focus areas around
 * them, and each experience / project / publication linked to its areas.
 * Runs at build time; the result is plain JSON passed to the client canvas.
 */
export function buildGraph(): GraphData {
  const profile = getProfile();
  const experience = getExperience();
  const projects = getProjects();
  const publications = getPublications();

  const usedAreas = new Set<Area>(
    [...experience, ...projects].flatMap((item) => item.areas),
  );

  const nodes: GraphNode[] = [
    { id: "me", kind: "center", label: profile.name },
    ...[...usedAreas].map((area): GraphNode => ({
      id: `area:${area}`,
      kind: "area",
      label: areaLabels[area],
    })),
    ...experience.map((e): GraphNode => ({
      id: `exp:${e.id}`,
      kind: "experience",
      label: e.organization,
      hint: e.role,
      href: `/experience/#${e.id}`,
      // Shown on small screens too; projects and papers are dropped there.
      essential: e.kind !== "activity",
    })),
    ...projects.map((p): GraphNode => ({
      id: `proj:${p.slug}`,
      kind: "project",
      label: p.title,
      hint: "Project",
      href: `/projects/#${p.slug}`,
    })),
    ...publications.map((p): GraphNode => ({
      id: `pub:${p.id}`,
      kind: "publication",
      label: `${p.venue} ${p.year}`,
      hint: "Publication",
      href: "/#publication",
    })),
  ];

  const edges: GraphEdge[] = [
    ...[...usedAreas].map((area) => ({
      source: "me",
      target: `area:${area}`,
    })),
    ...experience.flatMap((e) =>
      e.areas.map((area) => ({
        source: `exp:${e.id}`,
        target: `area:${area}`,
      })),
    ),
    ...projects.flatMap((p) =>
      p.areas.map((area) => ({
        source: `proj:${p.slug}`,
        target: `area:${area}`,
      })),
    ),
    ...publications
      .filter((p) => p.experienceId)
      .map((p) => ({ source: `pub:${p.id}`, target: `exp:${p.experienceId}` })),
  ];

  return { nodes, edges };
}
