import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

type SectionHeadingProps = {
  id: string;
  /** Mono label above the title, e.g. "01 · About". */
  eyebrow: string;
  title: string;
  action?: { href: string; label: string };
};

export default function SectionHeading({
  id,
  eyebrow,
  title,
  action,
}: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="mb-2 font-mono text-xs tracking-wider text-brand uppercase">
          {eyebrow}
        </p>
        <h2 id={id} className="text-2xl font-semibold tracking-tight">
          {title}
        </h2>
      </div>
      {action ? (
        <Link
          href={action.href}
          className="group inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {action.label}
          <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </div>
  );
}
