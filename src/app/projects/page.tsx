import Reveal from "@/components/motion/Reveal";
import PageHeader from "@/components/sections/PageHeader";
import ProjectCard from "@/components/sections/ProjectCard";
import { getProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Hackathon builds and side projects by Alex Chen, from AI movie trailers to NBA outcome models.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Projects"
        title="Things I've built"
        description="Hackathon builds and side projects, mostly where machine learning meets the web."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.06}>
            <ProjectCard project={project} headingLevel="h2" />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
