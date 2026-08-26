import { summaryResponse } from "@api/sources/wikipedia/utils";
import { describe, expect, it } from "bun:test";

describe("Sources Wikipedia - Summary Schema Validation", () => {
  it("should parse valid Wikipedia summary response", () => {
    const payload = {
      type: "standard",
      title: "Panthera uncia",
      extract: "Le léopard des neiges est un félin des montagnes d'Asie.",
      thumbnail: {
        source: "https://upload.wikimedia.org/wikipedia/commons/snow-leopard.jpg",
      },
    };

    const parsed = summaryResponse.parse(payload);
    expect(parsed.title).toBe("Panthera uncia");
    expect(parsed.extract).toContain("léopard des neiges");
    expect(parsed.thumbnail?.source).toContain("wikimedia.org");
  });

  it("should parse response with nullish extract and thumbnail", () => {
    const minimal = {
      type: "standard",
      title: "Unknown Species",
      extract: null,
      thumbnail: null,
    };

    const parsed = summaryResponse.parse(minimal);
    expect(parsed.title).toBe("Unknown Species");
    expect(parsed.extract).toBeNull();
    expect(parsed.thumbnail).toBeNull();
  });
});
