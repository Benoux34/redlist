const SITE_NAME = "Liste Rouge";
const TITLE_SEPARATOR = " | ";
const DESCRIPTION_MAX = 160;

function buildTitle(title: string): string {
  return title === SITE_NAME ? title : `${title}${TITLE_SEPARATOR}${SITE_NAME}`;
}

function truncate(text: string, max = DESCRIPTION_MAX): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");

  return `${(lastSpace > max / 2 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

function canonicalUrl(origin: string, pathname: string): string {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";

  return `${origin}${path}`;
}

function upsert(selector: string, create: () => HTMLElement): HTMLElement {
  const existing = document.head.querySelector(selector);
  if (existing !== null) return existing as HTMLElement;

  const element = create();
  document.head.append(element);

  return element;
}

function setMeta(attribute: "name" | "property", key: string, value: string) {
  const element = upsert(`meta[${attribute}="${key}"]`, () => {
    const meta = document.createElement("meta");
    meta.setAttribute(attribute, key);

    return meta;
  });

  element.setAttribute("content", value);
}

export {
  DESCRIPTION_MAX,
  SITE_NAME,
  buildTitle,
  canonicalUrl,
  truncate,
  upsert,
  setMeta,
};
