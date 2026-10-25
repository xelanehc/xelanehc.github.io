"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavItem } from "@/lib/site";
import { cn } from "@/lib/utils";

import CommandMenu, { type CommandMenuData } from "./CommandMenu";
import LogoMark from "./LogoMark";
import MobileNav from "./MobileNav";
import { isActivePath } from "./nav";
import ThemeToggle from "./ThemeToggle";

type NavbarProps = {
  name: string;
  items: NavItem[];
  commandMenu: CommandMenuData;
};

export default function Navbar({ name, items, commandMenu }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header
      // Anchored during route view transitions so only page content moves.
      style={{ viewTransitionName: "site-header" }}
      className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-md font-semibold tracking-tight"
        >
          <LogoMark className="size-6 transition-transform duration-300 group-hover:rotate-12" />
          <span>{name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 text-sm">
            {items.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative block rounded-md px-3 py-1.5 transition-colors",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {active ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-md bg-muted"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.4,
                        }}
                      />
                    ) : null}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <CommandMenu data={commandMenu} />
          <ThemeToggle />
          <MobileNav items={items} socials={commandMenu.socials} />
        </div>
      </div>
    </header>
  );
}
