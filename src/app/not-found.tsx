import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Not found",
};

export default function NotFound() {
  return (
    <section className="flex flex-col items-start gap-4 py-16">
      <p className="font-mono text-sm text-brand">404 · unreachable node</p>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        There&apos;s no edge to this page.
      </h1>
      <p className="max-w-prose text-muted-foreground">
        The link may be broken or the page may have moved. Try the command menu,
        or head back home.
      </p>
      <Button asChild className="mt-2">
        <Link href="/">Back to home</Link>
      </Button>
    </section>
  );
}
