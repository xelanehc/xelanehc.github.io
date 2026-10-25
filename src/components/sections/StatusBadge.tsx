/** Pill with a pulsing "online" node, used for the availability status. */
export default function StatusBadge({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2 rounded-full bg-brand" />
      </span>
      {children}
    </span>
  );
}
