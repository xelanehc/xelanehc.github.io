"use client";

import { SearchIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import type { SocialKind } from "@/types/content";

export type CommandLink = {
  label: string;
  href: string;
  /** Secondary text, e.g. an organization or year. */
  hint?: string;
};

export type CommandGroupKind = "page" | "experience" | "project";

export type CommandSocial = {
  kind: SocialKind;
  label: string;
  href: string;
};

export type CommandMenuData = {
  groups: { heading: string; kind: CommandGroupKind; items: CommandLink[] }[];
  socials: CommandSocial[];
  email: string;
};

const loadPalette = () => import("./CommandPalette");
const CommandPalette = dynamic(loadPalette, { ssr: false });

const subscribeNoop = () => () => {};

/** "⌘" on Apple platforms, "Ctrl" elsewhere. Server render assumes Apple. */
function useModifierKey() {
  return useSyncExternalStore(
    subscribeNoop,
    () => (/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl"),
    () => "⌘",
  );
}

/**
 * ⌘K trigger buttons and shortcut. The palette (cmdk + dialog) mounts on
 * first open and is prefetched when a trigger is hovered or focused.
 */
export default function CommandMenu({ data }: { data: CommandMenuData }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const modifier = useModifierKey();

  function show() {
    setMounted(true);
    setOpen(true);
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setMounted(true);
        setOpen((value) => !value);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const prefetch = {
    onPointerEnter: () => void loadPalette(),
    onFocus: () => void loadPalette(),
  };

  return (
    <>
      {/* Desktop: search-style trigger. Mobile: icon only. */}
      <Button
        variant="outline"
        size="sm"
        onClick={show}
        {...prefetch}
        className="hidden w-44 justify-between font-normal text-muted-foreground md:inline-flex"
      >
        <span className="inline-flex items-center gap-2">
          <SearchIcon />
          Search…
        </span>
        <Kbd>{modifier === "⌘" ? "⌘K" : "Ctrl K"}</Kbd>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={show}
        {...prefetch}
        aria-label="Open command menu"
        className="md:hidden"
      >
        <SearchIcon />
      </Button>

      {mounted ? (
        <CommandPalette data={data} open={open} onOpenChange={setOpen} />
      ) : null}
    </>
  );
}
