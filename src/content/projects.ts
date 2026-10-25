import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    slug: "boovie",
    title: "Boovie",
    summary: "Turns a book PDF into a 30-second AI-generated movie trailer.",
    context: "AIATL '24 hackathon · team project",
    start: "2024-10",
    areas: ["ml", "web"],
    tech: [
      "Python",
      "Flask",
      "React",
      "Mantine",
      "Gemini",
      "Runway",
      "MoviePy",
    ],
    highlights: [
      "Gemini summarizes the whole book, then writes a six-shot visual script.",
      "Runway Gen-3 Alpha Turbo renders each shot from a Gemini-generated frame.",
    ],
    links: {
      repo: "https://github.com/frankchang1000/boovie",
      writeup: "https://devpost.com/software/boovie",
    },
    featured: true,
    hasCaseStudy: true,
  },
  {
    slug: "nba-match-ml",
    title: "NBA Match ML Model",
    summary:
      "A neural network that predicts NBA match outcomes with 71% accuracy.",
    context: "Personal project",
    start: "2023-08",
    end: "2024-05",
    areas: ["ml"],
    tech: ["Python", "Pandas", "PyTorch"],
    highlights: [
      "Rolling per-team averages engineered from historical game data.",
      "A point-margin feature gave the single biggest accuracy jump.",
    ],
    links: { repo: "https://github.com/xelanehc/NBAML" },
    featured: true,
    hasCaseStudy: true,
  },
];
