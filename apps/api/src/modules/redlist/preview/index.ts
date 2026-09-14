import { db } from "@/db";
import { env } from "@/lib/env";
import { AppError } from "@/lib/errors";
import { categoryLabel, escapeHtml, truncate } from "./utils";

const DESCRIPTION_MAX = 200;

type Meta = Readonly<{
  title: string;
  description: string;
  url: string;
  image: string | null;
}>;

async function buildSpeciesMeta(assessmentId: number): Promise<Meta> {
  const row = await db.redListAssessment.findUnique({
    where: { assessmentId },
    select: {
      scientificName: true,
      vernacularNameFr: true,
      categoryCode: true,
      description: true,
      photoUrl: true,
    },
  });

  if (row === null) throw new AppError("NOT_FOUND");

  const status = categoryLabel(row.categoryCode);
  const name = row.vernacularNameFr ?? row.scientificName;

  return {
    title:
      row.vernacularNameFr === null
        ? `${row.scientificName} — ${status}`
        : `${name} (${row.scientificName}) — ${status}`,
    // Only a tenth of the catalogue has a description, so the status sentence
    // is the common case rather than the fallback.
    description:
      row.description === null
        ? `${name} est classée « ${status} » sur la Liste rouge de l'UICN.`
        : truncate(row.description, DESCRIPTION_MAX),
    url: `${env.WEB_ORIGIN}/species/${assessmentId}`,
    image: row.photoUrl,
  };
}

function renderMetaDocument(meta: Meta): string {
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const url = escapeHtml(meta.url);

  // twitter:card must be present either way: without it X renders no card at
  // all, and only 4.5% of the catalogue has a photo to show.
  const card = meta.image === null ? "summary" : "summary_large_image";
  const image =
    meta.image === null
      ? ""
      : `\n    <meta property="og:image" content="${escapeHtml(meta.image)}" />`;

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Liste Rouge" />
    <meta property="og:locale" content="fr_FR" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta name="twitter:card" content="${card}" />${image}
  </head>
  <body>
    <h1>${title}</h1>
    <p>${description}</p>
    <a href="${url}">Consulter la fiche</a>
  </body>
</html>
`;
}

export { buildSpeciesMeta, renderMetaDocument };
export type { Meta };
