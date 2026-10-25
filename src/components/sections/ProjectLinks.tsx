import { ArrowUpRightIcon, FileTextIcon } from "lucide-react";

import SocialIcon from "@/components/icons/SocialIcon";
import { cn } from "@/lib/utils";
import type { ProjectLinks as Links } from "@/types/content";

const linkClass =
  "relative z-10 inline-flex items-center gap-1.5 font-medium transition-colors hover:text-brand";

/** External project links (live, code, write-up, paper), in a fixed order. */
export default function ProjectLinks({
  links,
  className,
}: {
  links: Links;
  className?: string;
}) {
  const items = [
    links.live && {
      href: links.live,
      label: "Live",
      icon: <ArrowUpRightIcon className="size-3.5" />,
    },
    links.repo && {
      href: links.repo,
      label: "Code",
      icon: <SocialIcon kind="github" className="size-3.5" />,
    },
    links.writeup && {
      href: links.writeup,
      label: "Write-up",
      icon: <FileTextIcon className="size-3.5" />,
    },
    links.paper && {
      href: links.paper,
      label: "Paper",
      icon: <FileTextIcon className="size-3.5" />,
    },
  ].filter(Boolean) as { href: string; label: string; icon: React.ReactNode }[];

  if (items.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-x-4 gap-y-2 text-sm", className)}>
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {item.icon}
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
