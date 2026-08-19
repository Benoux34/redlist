const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
};

function htmlToParagraphs(html: string | null | undefined): string[] {
  if (html === null || html === undefined) return [];

  const withBreaks = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "");

  const decoded = withBreaks.replace(
    /&amp;|&lt;|&gt;|&quot;|&#39;|&nbsp;/g,
    (entity) => ENTITIES[entity] ?? entity,
  );

  return decoded
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter((paragraph) => paragraph.length > 0);
}

export { htmlToParagraphs };
