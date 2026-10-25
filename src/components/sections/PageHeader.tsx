type PageHeaderProps = {
  /** Small mono label above the title, e.g. "02 · Experience". */
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
}: PageHeaderProps) {
  return (
    <header className="max-w-2xl">
      {eyebrow ? (
        <p className="mb-3 font-mono text-xs tracking-wider text-brand uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 text-pretty text-muted-foreground">{description}</p>
      ) : null}
    </header>
  );
}
