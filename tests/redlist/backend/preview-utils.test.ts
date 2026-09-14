import { describe, expect, it } from "bun:test";
import {
  categoryLabel,
  escapeHtml,
  truncate,
} from "@api/modules/redlist/preview/utils";

describe("Backend RedList - Preview Metadata Utilities", () => {
  it("should escape every character that could break out of an attribute", () => {
    expect(escapeHtml('"><script>alert(1)</script>')).toBe(
      "&quot;&gt;&lt;script&gt;alert(1)&lt;/script&gt;",
    );
  });

  it("should escape the ampersand without double-escaping the entities it creates", () => {
    expect(escapeHtml("Fish & <chips>")).toBe("Fish &amp; &lt;chips&gt;");
    expect(escapeHtml("&lt;")).toBe("&amp;lt;");
  });

  it("should leave text without special characters untouched", () => {
    expect(escapeHtml("Panthera pardus orientalis")).toBe(
      "Panthera pardus orientalis",
    );
  });

  it("should keep short descriptions whole", () => {
    expect(truncate("Une espèce rare.", 200)).toBe("Une espèce rare.");
  });

  it("should cut on a word boundary and append an ellipsis", () => {
    const cut = truncate("abcde fghij klmno pqrst", 12);

    expect(cut).toBe("abcde fghij…");
    expect(cut.length).toBeLessThanOrEqual(13);
  });

  it("should cut mid-word rather than lose most of the text", () => {
    expect(truncate("abcdefghijklmnop qrs", 10)).toBe("abcdefghij…");
  });

  it("should collapse the whitespace Wikipedia leaves in descriptions", () => {
    expect(truncate("  Une   espèce\n\nrare.  ", 200)).toBe("Une espèce rare.");
  });

  it("should translate IUCN codes and fall back to the raw code", () => {
    expect(categoryLabel("CR")).toBe("En danger critique d'extinction");
    expect(categoryLabel("EW")).toBe("Éteinte à l'état sauvage");
    expect(categoryLabel("ZZ")).toBe("ZZ");
  });
});
