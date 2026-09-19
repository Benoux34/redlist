import { useEffect } from "react";
import { useLocation } from "react-router";
import {
  SITE_NAME,
  buildTitle,
  canonicalUrl,
  setMeta,
  truncate,
  upsert,
} from "./utils";

type PageMeta = Readonly<{
  title: string;
  description: string;
  noindex?: boolean;
}>;

function usePageMeta({ title, description, noindex = false }: PageMeta) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = buildTitle(title);
    const text = truncate(description);
    const url = canonicalUrl(window.location.origin, pathname);

    document.title = fullTitle;

    upsert('link[rel="canonical"]', () => {
      const link = document.createElement("link");
      link.rel = "canonical";

      return link;
    }).setAttribute("href", url);

    setMeta("name", "description", text);
    setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:locale", "fr_FR");
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", text);
    setMeta("property", "og:url", url);
  }, [title, description, noindex, pathname]);
}

export { usePageMeta };
