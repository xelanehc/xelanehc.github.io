import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Projects",
  description: "Computer science projects by Alex Chen.",
};

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-2 text-black/70 dark:text-white/70">
        Here are some of my projects.
      </p>
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}


