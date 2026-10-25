import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/** Typography for MDX content (project case studies, future writing). */
const components: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-12 mb-4 scroll-mt-24 text-xl font-semibold tracking-tight first:mt-0"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-8 mb-3 font-semibold tracking-tight" {...props} />
  ),
  p: (props) => (
    <p
      className="my-4 leading-7 text-pretty text-muted-foreground"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="my-4 space-y-2 pl-5 text-muted-foreground marker:text-brand [&>li]:list-disc"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="my-4 space-y-3 pl-5 text-muted-foreground marker:font-mono marker:text-sm marker:text-brand [&>li]:list-decimal"
      {...props}
    />
  ),
  li: (props) => <li className="pl-1 leading-7" {...props} />,
  strong: (props) => (
    <strong className="font-medium text-foreground" {...props} />
  ),
  a: ({ href = "", ...props }) => {
    const className =
      "font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand";
    return href.startsWith("/") ? (
      <Link href={href} className={className} {...props} />
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      />
    );
  },
  code: (props) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl border border-border bg-card p-4 text-sm [&_code]:bg-transparent [&_code]:p-0"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-2 border-brand pl-4 text-foreground italic"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-border" />,
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-left text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="border-b border-border py-2 pr-4 font-medium" {...props} />
  ),
  td: (props) => (
    <td
      className="border-b border-border/60 py-2 pr-4 text-muted-foreground"
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
