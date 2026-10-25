import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    slug: "boovie",
    title: "Boovie",
    summary: "Turns a book PDF into a 30-second AI-generated movie trailer.",
    start: "2024-10",
    areas: ["ml", "web"],
    tech: ["Python", "Flask", "React", "JavaScript", "Mantine"],
    highlights: [
      "Google Gemini generates the trailer script and reference images.",
      "Runway Gen-3 Alpha Turbo synthesizes the video.",
    ],
    links: { repo: "https://github.com/frankchang1000/boovie" },
    featured: true,
    hasCaseStudy: false,
  },
  {
    slug: "nba-match-ml",
    title: "NBA Match ML Model",
    summary:
      "A multi-layer neural network that predicts NBA match outcomes with 71% accuracy.",
    start: "2023-01",
    end: "2024-06",
    areas: ["ml"],
    tech: ["Python", "Pandas", "PyTorch"],
    highlights: [
      "Trained on preprocessed historical NBA statistics.",
      "71% accuracy predicting match outcomes.",
    ],
    links: { repo: "https://github.com/xelanehc/NBAML" },
    featured: true,
    hasCaseStudy: false,
  },
];
