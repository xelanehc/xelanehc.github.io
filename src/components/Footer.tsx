import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-black/[.08] dark:border-white/[.12]">
      <div className="mx-auto max-w-5xl px-6 py-8 text-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-black/70 dark:text-white/70">© {new Date().getFullYear()} Alex Chen</p>
        <div className="flex items-center gap-4">
          <Link href="/projects" className="hover:underline">Projects</Link>
          <Link href="/experience" className="hover:underline">Experience</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>
      </div>
    </footer>
  );
}


