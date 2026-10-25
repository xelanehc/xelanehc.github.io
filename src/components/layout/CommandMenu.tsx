"use client";

import {
  ArrowUpRightIcon,
  BriefcaseBusinessIcon,
  CopyIcon,
  CornerDownLeftIcon,
  FolderGit2Icon,
  MonitorIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { toast } from "sonner";

import SocialIcon from "@/components/icons/SocialIcon";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import type { SocialKind } from "@/types/content";

export type CommandLink = {
  label: string;
  href: string;
  /** Secondary text, e.g. an organization or year. */
  hint?: string;
};

const groupIcons = {
  page: CornerDownLeftIcon,
  experience: BriefcaseBusinessIcon,
  project: FolderGit2Icon,
};

export type CommandGroupKind = keyof typeof groupIcons;

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

const subscribeNoop = () => () => {};

/** "⌘" on Apple platforms, "Ctrl" elsewhere. Server render assumes Apple. */
function useModifierKey() {
  return useSyncExternalStore(
    subscribeNoop,
    () => (/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl"),
    () => "⌘",
  );
}

export default function CommandMenu({ data }: { data: CommandMenuData }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();
  const modifier = useModifierKey();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const run = useCallback((action: () => void) => {
    setOpen(false);
    action();
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(data.email);
      toast.success("Email copied", { description: data.email });
    } catch {
      toast.error("Couldn't copy. Email is " + data.email);
    }
  }, [data.email]);

  return (
    <>
      {/* Desktop: search-style trigger. Mobile: icon only. */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
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
        onClick={() => setOpen(true)}
        aria-label="Open command menu"
        className="md:hidden"
      >
        <SearchIcon />
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Command menu"
        description="Jump to a page, project, or experience, or run a quick action."
      >
        {/* CommandDialog doesn't provide the cmdk root; Command does. */}
        <Command>
          <CommandInput placeholder="Type a command or search…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            {data.groups.map((group) => {
              const Icon = groupIcons[group.kind];
              return (
                <CommandGroup key={group.heading} heading={group.heading}>
                  {group.items.map((item) => {
                    return (
                      <CommandItem
                        key={item.href}
                        value={`${item.label} ${item.hint ?? ""}`}
                        onSelect={() => run(() => router.push(item.href))}
                      >
                        <Icon className="text-muted-foreground" />
                        <span className="truncate">{item.label}</span>
                        {item.hint ? (
                          <CommandShortcut className="tracking-normal">
                            {item.hint}
                          </CommandShortcut>
                        ) : null}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              );
            })}

            <CommandSeparator />
            <CommandGroup heading="Contact">
              <CommandItem
                value="Copy email address"
                onSelect={() => run(copyEmail)}
              >
                <CopyIcon className="text-muted-foreground" />
                Copy email address
              </CommandItem>
              {data.socials.map((social) => (
                <CommandItem
                  key={social.href}
                  value={`Open ${social.label}`}
                  onSelect={() =>
                    run(() =>
                      window.open(social.href, "_blank", "noopener,noreferrer"),
                    )
                  }
                >
                  <SocialIcon
                    kind={social.kind}
                    className="size-4 text-muted-foreground"
                  />
                  {social.label}
                  <ArrowUpRightIcon className="ml-auto text-muted-foreground" />
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />
            <CommandGroup heading="Theme">
              <CommandItem
                value="Light theme"
                onSelect={() => run(() => setTheme("light"))}
              >
                <SunIcon className="text-muted-foreground" />
                Light
              </CommandItem>
              <CommandItem
                value="Dark theme"
                onSelect={() => run(() => setTheme("dark"))}
              >
                <MoonIcon className="text-muted-foreground" />
                Dark
              </CommandItem>
              <CommandItem
                value="System theme"
                onSelect={() => run(() => setTheme("system"))}
              >
                <MonitorIcon className="text-muted-foreground" />
                System
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
