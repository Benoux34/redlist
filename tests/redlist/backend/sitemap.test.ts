import { describe, expect, it } from "bun:test";
import {
  SPECIES_PER_FILE,
  STATIC_PAGES,
  escapeXml,
  isoDate,
  renderSitemapIndex,
  renderUrlSet,
  speciesFileCount,
} from "@api/modules/redlist/sitemap/utils";

describe("Backend RedList - Sitemap", () => {
  it("should split species across files of at most 20 000 urls", () => {
    expect(SPECIES_PER_FILE).toBe(20_000);
    expect(speciesFileCount(0)).toBe(1);
    expect(speciesFileCount(20_000)).toBe(1);
    expect(speciesFileCount(20_001)).toBe(2);
    expect(speciesFileCount(50_167)).toBe(3);
  });

  it("should list every letter of the alphabetical index", () => {
    const paths = STATIC_PAGES.map((page) => page.path);

    expect(paths).toContain("/");
    expect(paths).toContain("/especes/a");
    expect(paths).toContain("/especes/z");
    expect(paths.filter((path) => path.startsWith("/especes/"))).toHaveLength(
      26,
    );
    expect(paths).not.toContain("/account");
  });

  it("should render urls with their optional lastmod and priority", () => {
    const xml = renderUrlSet([
      { loc: "https://x.fr/a", lastmod: "2026-09-19", priority: "0.6" },
      { loc: "https://x.fr/b" },
    ]);

    expect(xml).toContain("<loc>https://x.fr/a</loc>");
    expect(xml).toContain("<lastmod>2026-09-19</lastmod>");
    expect(xml).toContain("<priority>0.6</priority>");
    expect(xml.match(/<url>/g)).toHaveLength(2);
    expect(xml.match(/<lastmod>/g)).toHaveLength(1);
  });

  it("should render a sitemap index and escape unsafe characters", () => {
    const xml = renderSitemapIndex(["https://x.fr/sitemap-pages.xml"]);

    expect(xml).toContain("<sitemapindex");
    expect(xml).toContain("<loc>https://x.fr/sitemap-pages.xml</loc>");
    expect(escapeXml("a&b<c>\"d'")).toBe("a&amp;b&lt;c&gt;&quot;d&apos;");
  });

  it("should format lastmod as a plain date", () => {
    expect(isoDate(new Date("2026-09-19T14:03:00.000Z"))).toBe("2026-09-19");
  });
});
