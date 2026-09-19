import { db } from "@/db";
import { Prisma } from "@/generated/prisma/client";
import { env } from "@/lib/env";
import { cached, cachedBy } from "@/lib";
import { getCountryCounts } from "../service";
import {
  SPECIES_PER_FILE,
  STATIC_PAGES,
  isoDate,
  renderSitemapIndex,
  renderUrlSet,
  speciesFileCount,
} from "./utils";

const INDEXABLE_SPECIES: Prisma.RedListAssessmentWhereInput = {
  OR: [
    { description: { not: null } },
    { photoUrl: { not: null } },
    { vernacularNameFr: { not: null } },
  ],
};

const countIndexableSpecies = cached(() =>
  db.redListAssessment.count({ where: INDEXABLE_SPECIES }),
);

const buildIndex = cached(async () => {
  const files = speciesFileCount(await countIndexableSpecies());

  return renderSitemapIndex([
    `${env.WEB_ORIGIN}/sitemap-pages.xml`,
    `${env.WEB_ORIGIN}/sitemap-countries.xml`,
    ...Array.from(
      { length: files },
      (_, i) => `${env.WEB_ORIGIN}/sitemap-species-${i + 1}.xml`,
    ),
  ]);
});

const buildPages = cached(() =>
  Promise.resolve(
    renderUrlSet(
      STATIC_PAGES.map((page) => ({
        loc: `${env.WEB_ORIGIN}${page.path}`,
        priority: page.priority,
      })),
    ),
  ),
);

const buildCountries = cached(async () => {
  const counts = await getCountryCounts({});

  return renderUrlSet(
    counts.map((entry) => ({
      loc: `${env.WEB_ORIGIN}/pays/${entry.countryCode.toLowerCase()}`,
      priority: "0.7",
    })),
  );
});

const buildSpeciesPage = cachedBy(async (key: string) => {
  const page = Number(key);
  const rows = await db.redListAssessment.findMany({
    where: INDEXABLE_SPECIES,
    select: { assessmentId: true, updatedAt: true },
    orderBy: { assessmentId: "asc" },
    skip: (page - 1) * SPECIES_PER_FILE,
    take: SPECIES_PER_FILE,
  });

  return renderUrlSet(
    rows.map((row) => ({
      loc: `${env.WEB_ORIGIN}/species/${row.assessmentId}`,
      lastmod: isoDate(row.updatedAt),
      priority: "0.6",
    })),
  );
});

async function getSitemapIndex(): Promise<string> {
  return buildIndex();
}

async function getPagesSitemap(): Promise<string> {
  return buildPages();
}

async function getCountriesSitemap(): Promise<string> {
  return buildCountries();
}

async function getSpeciesSitemap(page: number): Promise<string | null> {
  const files = speciesFileCount(await countIndexableSpecies());

  return page > files ? null : buildSpeciesPage(String(page));
}

export {
  getCountriesSitemap,
  getPagesSitemap,
  getSitemapIndex,
  getSpeciesSitemap,
};
