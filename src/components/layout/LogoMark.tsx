/** Three connected nodes: the site's graph motif in miniature. */
export default function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6 17 12 6l6 11H6Z"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="6" r="3" className="fill-brand" />
      <circle cx="6" cy="17" r="2.5" className="fill-foreground" />
      <circle cx="18" cy="17" r="2.5" className="fill-brand-warm" />
    </svg>
  );
}
