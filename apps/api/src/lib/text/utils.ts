const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: "\u00a0",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  deg: "°",
  times: "×",
  eacute: "é",
  egrave: "è",
  agrave: "à",
  ccedil: "ç",
};

const ENTITY_PATTERN = /&(#x?[0-9a-f]+|[a-z][a-z0-9]*);/gi;

const COMBINING_MARKS = /[\u0300-\u036f]/g;

const WHITESPACE = /\s+/g;

export { ENTITY_PATTERN, NAMED_ENTITIES, COMBINING_MARKS, WHITESPACE };
