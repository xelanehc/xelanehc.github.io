"use client";

import * as m from "motion/react-m";
import { createContext, useContext, useState } from "react";

import { cn } from "@/lib/utils";
import type { Area } from "@/types/content";

type FilterState = {
  active: Area | null;
  setActive: (area: Area | null) => void;
};

const FilterContext = createContext<FilterState>({
  active: null,
  setActive: () => {},
});

export function AreaFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState<Area | null>(null);
  return (
    <FilterContext.Provider value={{ active, setActive }}>
      {children}
    </FilterContext.Provider>
  );
}

/** True when nothing is filtered or any of `areas` matches the filter. */
export function useAreaVisible(areas: Area[]) {
  const { active } = useContext(FilterContext);
  return active === null || areas.includes(active);
}

export function AreaFilterChips({
  options,
}: {
  options: { area: Area; label: string }[];
}) {
  const { active, setActive } = useContext(FilterContext);
  const chips = [{ area: null, label: "All" }, ...options];

  return (
    <div
      role="group"
      aria-label="Filter by area"
      className="flex flex-wrap gap-1.5"
    >
      {chips.map(({ area, label }) => {
        const selected = active === area;
        return (
          <button
            key={label}
            type="button"
            aria-pressed={selected}
            onClick={() => setActive(area)}
            className={cn(
              "relative rounded-full border px-3 py-1 text-sm transition-colors",
              selected
                ? "border-transparent text-brand-foreground"
                : "border-border text-muted-foreground hover:border-brand/40 hover:text-foreground",
            )}
          >
            {selected ? (
              <m.span
                layoutId="area-chip"
                className="absolute inset-0 -z-10 rounded-full bg-brand"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            ) : null}
            {label}
          </button>
        );
      })}
    </div>
  );
}

/** A page section that hides itself when none of its entries match. */
export function FilterableSection({
  areas,
  className,
  children,
  ...props
}: React.ComponentProps<"section"> & { areas: Area[] }) {
  const visible = useAreaVisible(areas);
  return (
    <section hidden={!visible} className={className} {...props}>
      {children}
    </section>
  );
}

/** Wraps any block (e.g. a publication) so it follows the filter. */
export function Filterable({
  areas,
  children,
}: {
  areas: Area[];
  children: React.ReactNode;
}) {
  const visible = useAreaVisible(areas);
  return <div hidden={!visible}>{children}</div>;
}
