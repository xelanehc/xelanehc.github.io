"use client";

import {
  ArrowUpRightIcon,
  BriefcaseBusinessIcon,
  CopyIcon,
  CornerDownLeftIcon,
  FolderGit2Icon,
  MonitorIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { toast } from "sonner";

import SocialIcon from "@/components/icons/SocialIcon";
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

import type { CommandGroupKind, CommandMenuData } from "./CommandMenu";

const groupIcons: Record<CommandGroupKind, typeof CornerDownLeftIcon> = {
  page: CornerDownLeftIcon,
  experience: BriefcaseBusinessIcon,
  project: FolderGit2Icon,
};

/**
 * The ⌘K dialog itself. Loaded on demand by CommandMenu so cmdk and the
 * dialog primitives stay out of the initial bundle.
 */
export default function CommandPalette({
  data,
  open,
  onOpenChange,
}: {
  data: CommandMenuData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const { setTheme } = useTheme();

  const run = useCallback(
    (action: () => void) => {
      onOpenChange(false);
      action();
    },
    [onOpenChange],
  );

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(data.email);
      toast.success("Email copied", { description: data.email });
    } catch {
      toast.error("Couldn't copy. Email is " + data.email);
    }
  }, [data.email]);

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
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
                {group.items.map((item) => (
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
                ))}
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
  );
}
