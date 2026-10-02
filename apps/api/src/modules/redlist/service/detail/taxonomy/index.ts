import type { AssessmentText, TaxonRung } from "@app/contracts";
import type { RawTaxonomy } from "../entities";
import { RANKS, SECTIONS, TAXON_FR } from "./utils";

function buildTaxonLadder(taxonomy: RawTaxonomy): TaxonRung[] {
  return RANKS.flatMap(([key, rank]) => {
    const name = taxonomy[key];
    if (name === null || name.trim() === "") return [];

    return [{ rank, name, french: TAXON_FR[name] ?? null }];
  });
}

function buildTexts(
  paragraphsOf: (key: (typeof SECTIONS)[number][0]) => string[],
): AssessmentText[] {
  return SECTIONS.map(([key, title]) => ({
    title,
    paragraphs: paragraphsOf(key),
  })).filter((text) => text.paragraphs.length > 0);
}

export { buildTaxonLadder, buildTexts };
