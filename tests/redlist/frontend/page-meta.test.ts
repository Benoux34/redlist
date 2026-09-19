import { describe, expect, it } from "bun:test";
import {
  SITE_NAME,
  buildTitle,
  canonicalUrl,
  truncate,
} from "@web/hooks/use-page-meta/utils";

describe("Frontend - Page meta", () => {
  it("should suffix the title with the site name, once", () => {
    expect(buildTitle("Tigre (Panthera tigris)")).toBe(
      `Tigre (Panthera tigris) | ${SITE_NAME}`,
    );
    expect(buildTitle(SITE_NAME)).toBe(SITE_NAME);
  });

  it("should cut long descriptions on a word boundary", () => {
    const long = `${"mot ".repeat(60)}fin`;
    const short = truncate(long);

    expect(short.length).toBeLessThanOrEqual(160);
    expect(short.endsWith("…")).toBe(true);
    expect(short).not.toContain("  ");
  });

  it("should keep short descriptions untouched and collapse spaces", () => {
    expect(truncate("  Une   description\ncourte ")).toBe(
      "Une description courte",
    );
  });

  it("should drop query strings and trailing slashes from the canonical", () => {
    expect(canonicalUrl("https://x.fr", "/pays/fr")).toBe(
      "https://x.fr/pays/fr",
    );
    expect(canonicalUrl("https://x.fr", "/especes/a/")).toBe(
      "https://x.fr/especes/a",
    );
    expect(canonicalUrl("https://x.fr", "/")).toBe("https://x.fr/");
  });
});
