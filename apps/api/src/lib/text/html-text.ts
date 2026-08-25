import { NAMED_ENTITIES, ENTITY_PATTERN } from "./utils";

function decodeEntity(entity: string, body: string): string {
  if (body.startsWith("#")) {
    const isHex = body[1] === "x" || body[1] === "X";
    const codePoint = Number.parseInt(
      isHex ? body.slice(2) : body.slice(1),
      isHex ? 16 : 10,
    );

    return Number.isNaN(codePoint) || codePoint < 1 || codePoint > 0x10ffff
      ? entity
      : String.fromCodePoint(codePoint);
  }

  return NAMED_ENTITIES[body.toLowerCase()] ?? entity;
}

function decodeEntities(text: string): string {
  return text.replace(ENTITY_PATTERN, (entity, body: string) =>
    decodeEntity(entity, body),
  );
}

function htmlToParagraphs(html: string | null | undefined): string[] {
  if (html === null || html === undefined) return [];

  const withBreaks = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "");

  return decodeEntities(withBreaks)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter((paragraph) => paragraph.length > 0);
}

export { htmlToParagraphs };
