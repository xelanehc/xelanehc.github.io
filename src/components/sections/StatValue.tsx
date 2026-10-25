import { NumberTicker } from "@/components/ui/number-ticker";
import type { Highlight } from "@/types/content";

/**
 * Counts numeric highlights up on scroll. The real value is always in the
 * accessible text, so screen readers, crawlers, and no-JS visitors see it
 * even though the ticker server-renders its start value. Reduced motion is
 * handled in CSS (not a hook) so server and client markup match.
 */
export default function StatValue({
  highlight,
}: {
  highlight: Pick<Highlight, "value" | "decimals" | "prefix" | "suffix">;
}) {
  const { value, decimals = 0, prefix = "", suffix = "" } = highlight;
  const text =
    typeof value === "number"
      ? `${prefix}${value.toFixed(decimals)}${suffix}`
      : `${prefix}${value}${suffix}`;

  if (typeof value === "string") {
    return <span className="tabular-nums">{text}</span>;
  }

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="tabular-nums motion-reduce:hidden">
        {prefix}
        <NumberTicker
          value={value}
          decimalPlaces={decimals}
          className="tracking-tight text-foreground dark:text-foreground"
        />
        {suffix}
      </span>
      <span
        aria-hidden="true"
        className="hidden tabular-nums motion-reduce:inline"
      >
        {text}
      </span>
    </>
  );
}
