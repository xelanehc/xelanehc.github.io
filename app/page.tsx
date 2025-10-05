export default function Home() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight">Alex Chen</h1>
      <p className="mt-2 text-black/70 dark:text-white/70 max-w-3xl">
        CS student and software engineer focused on full stack development, building projects that have an impact.
      </p>
      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-black/[.08] dark:border-white/[.12] p-4">
          <h2 className="font-medium">Projects</h2>
          <p className="mt-1 text-sm text-black/70 dark:text-white/70">
            Explore selected software projects.
          </p>
          <a className="mt-3 inline-block text-sm hover:underline" href="/projects">View projects →</a>
        </div>
        <div className="rounded-lg border border-black/[.08] dark:border-white/[.12] p-4">
          <h2 className="font-medium">Experience</h2>
          <p className="mt-1 text-sm text-black/70 dark:text-white/70">
            Internships and research roles.
          </p>
          <a className="mt-3 inline-block text-sm hover:underline" href="/experience">View experience →</a>
        </div>
        <div className="rounded-lg border border-black/[.08] dark:border-white/[.12] p-4">
          <h2 className="font-medium">Contact</h2>
          <p className="mt-1 text-sm text-black/70 dark:text-white/70">
            Get in touch for opportunities.
          </p>
          <a className="mt-3 inline-block text-sm hover:underline" href="/contact">Contact me →</a>
        </div>
      </div>
    </section>
  );
}
