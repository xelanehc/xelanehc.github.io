import Link from "next/link";

export type Project = {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  repo?: string;
  year?: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-lg border border-black/[.08] dark:border-white/[.12] p-4 hover:shadow-sm transition-shadow bg-background">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-semibold tracking-tight">{project.title}</h3>
        {project.year ? (
          <span className="text-xs text-black/60 dark:text-white/60">{project.year}</span>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-black/80 dark:text-white/80">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className="text-xs rounded bg-black/[.06] dark:bg-white/[.08] px-2 py-1">
            {t}
          </span>
        ))}
      </div>
      {(project.link || project.repo) && (
        <div className="mt-4 flex gap-4 text-sm">
          {project.link && (
            <Link className="hover:underline" href={project.link} target="_blank">
              Live
            </Link>
          )}
          {project.repo && (
            <Link className="hover:underline" href={project.repo} target="_blank">
              Code
            </Link>
          )}
        </div>
      )}
    </div>
  );
}


