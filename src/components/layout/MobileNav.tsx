"use client";

import { MenuIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { NavItem } from "@/lib/site";

import type { CommandSocial } from "./CommandMenu";

const loadSheet = () => import("./MobileNavSheet");
const MobileNavSheet = dynamic(loadSheet, { ssr: false });

/** Menu button for small screens; the sheet loads on first open. */
export default function MobileNav({
  items,
  socials,
}: {
  items: NavItem[];
  socials: CommandSocial[];
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Open menu"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => {
          setMounted(true);
          setOpen(true);
        }}
        onPointerEnter={() => void loadSheet()}
        onFocus={() => void loadSheet()}
        className="md:hidden"
      >
        <MenuIcon />
      </Button>
      {mounted ? (
        <MobileNavSheet
          items={items}
          socials={socials}
          open={open}
          onOpenChange={setOpen}
        />
      ) : null}
    </>
  );
}
