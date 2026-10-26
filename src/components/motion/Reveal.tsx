import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before animating, for staggering siblings. */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Fades and lifts content in the first time it scrolls into view. Markup is
 * plain server HTML; RevealObserver (mounted once in Providers) handles the
 * animation, so content is visible from first paint and without JS.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  return (
    <Tag
      className={cn("reveal", className)}
      style={
        delay
          ? ({
              "--reveal-delay": `${Math.round(delay * 1000)}ms`,
            } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </Tag>
  );
}
