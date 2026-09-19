const SPECIES_PER_FILE = 20_000;

const STATIC_PAGES: readonly Readonly<{ path: string; priority: string }>[] = [
  { path: "/", priority: "1.0" },
  { path: "/threatened-species", priority: "0.9" },
  { path: "/notre-planete", priority: "0.9" },
  { path: "/agir", priority: "0.8" },
  { path: "/presumed-extinct", priority: "0.8" },
  { path: "/methodology", priority: "0.5" },
  { path: "/mentions-legales", priority: "0.2" },
  { path: "/confidentialite", priority: "0.2" },
  { path: "/cgu", priority: "0.2" },
  ...Array.from({ length: 26 }, (_, i) => ({
    path: `/especes/${String.fromCharCode(97 + i)}`,
    priority: "0.6",
  })),
];

type SitemapUrl = Readonly<{
  loc: string;
  lastmod?: string | undefined;
  priority?: string | undefined;
}>;

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function renderUrlSet(urls: readonly SitemapUrl[]): string {
  const entries = urls.map((url) => {
    const lastmod =
      url.lastmod === undefined
        ? ""
        : `\n    <lastmod>${url.lastmod}</lastmod>`;
    const priority =
      url.priority === undefined
        ? ""
        : `\n    <priority>${url.priority}</priority>`;

    return `  <url>\n    <loc>${escapeXml(url.loc)}</loc>${lastmod}${priority}\n  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
}

function renderSitemapIndex(locations: readonly string[]): string {
  const entries = locations.map(
    (loc) => `  <sitemap>\n    <loc>${escapeXml(loc)}</loc>\n  </sitemap>`,
  );

  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</sitemapindex>\n`;
}

function speciesFileCount(total: number): number {
  return Math.max(1, Math.ceil(total / SPECIES_PER_FILE));
}

export {
  SPECIES_PER_FILE,
  STATIC_PAGES,
  escapeXml,
  isoDate,
  renderSitemapIndex,
  renderUrlSet,
  speciesFileCount,
};
export type { SitemapUrl };
