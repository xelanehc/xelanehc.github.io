/** Normalizes trailing slashes (static export uses them) for route matching. */
export function isActivePath(pathname: string, href: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}
