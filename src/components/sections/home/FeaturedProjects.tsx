import Reveal from "@/components/motion/Reveal";
import { getFeaturedProjects } from "@/lib/content";

import ProjectCard from "../ProjectCard";
import SectionHeading from "../SectionHeading";

export default function FeaturedProjects() {
  const projects = getFeaturedProjects().slice(0, 3);
  if (projects.length === 0) return null;

  return (
    <section aria-labelledby="projects-heading">
      <SectionHeading
        id="projects-heading"
        eyebrow="03 · Projects"
        title="Featured work"
        action={{ href: "/projects", label: "All projects" }}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.06}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
