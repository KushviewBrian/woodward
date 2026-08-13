// Prefixes an internal, root-relative path with the configured base path
// (empty at the apex domain, "/woodward" on the github.io preview) so links
// and asset references keep working under either.
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}
