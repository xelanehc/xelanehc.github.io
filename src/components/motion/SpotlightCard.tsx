"use client";

import { cn } from "@/lib/utils";

/**
 * Card with a soft brand-colored glow that follows the cursor, on both the
 * border and the surface. Pointer position is written to CSS variables, so
 * there are no re-renders; touch devices just get the static card.
 */
export default function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--x",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--y",
      `${event.clientY - rect.top}px`,
    );
  }

  return (
    <div
      onPointerMove={onPointerMove}
      className={cn(
        "group/spotlight relative rounded-xl border border-border bg-card transition-colors",
        // Border glow: a masked radial gradient sitting on the 1px border.
        "before:pointer-events-none before:absolute before:-inset-px before:rounded-[inherit] before:border before:border-transparent before:opacity-0 before:transition-opacity before:duration-300 before:[background:radial-gradient(240px_circle_at_var(--x,50%)_var(--y,50%),var(--brand),transparent_70%)_border-box] before:[mask:linear-gradient(#000_0_0)_padding-box_exclude,linear-gradient(#000_0_0)] hover:before:opacity-100",
        // Surface glow.
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:transition-opacity after:duration-300 after:[background:radial-gradient(320px_circle_at_var(--x,50%)_var(--y,50%),color-mix(in_oklch,var(--brand)_8%,transparent),transparent_70%)] hover:after:opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
