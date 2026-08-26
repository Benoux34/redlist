import { htmlToParagraphs } from "@api/lib/text/html-text";
import { describe, expect, it } from "bun:test";

describe("Shared Backend - HTML to Paragraphs Extraction", () => {
  it("should return empty array for null or undefined", () => {
    expect(htmlToParagraphs(null)).toEqual([]);
    expect(htmlToParagraphs(undefined)).toEqual([]);
  });

  it("should strip HTML tags and extract text", () => {
    const html = "<p>This is <b>bold</b> and <i>italic</i>.</p>";
    expect(htmlToParagraphs(html)).toEqual(["This is bold and italic."]);
  });

  it("should split multiple paragraphs by </p> tags and collapse extra whitespace", () => {
    const html = `
      <p>First paragraph with   lots of spaces.</p>
      <p>Second paragraph.</p>
    `;
    expect(htmlToParagraphs(html)).toEqual([
      "First paragraph with lots of spaces.",
      "Second paragraph.",
    ]);
  });

  it("should handle line breaks with <br/> as intra-paragraph lines", () => {
    const html = "Line 1<br/>Line 2<br>Line 3";
    expect(htmlToParagraphs(html)).toEqual(["Line 1 Line 2 Line 3"]);
  });

  it("should decode named HTML entities properly", () => {
    const html = "Espèce menacée &amp; protégée &gt; 500 &lt; 1000 &quot;IUCN&quot; &#39;France&#39; &nbsp; OK";
    expect(htmlToParagraphs(html)).toEqual([
      "Espèce menacée & protégée > 500 < 1000 \"IUCN\" 'France' OK",
    ]);
  });

  it("should decode numeric unicode entities properly", () => {
    const html = "Point 1 &#x2022; Point 2 &#8226; Point 3";
    expect(htmlToParagraphs(html)).toEqual(["Point 1 • Point 2 • Point 3"]);
  });
});
