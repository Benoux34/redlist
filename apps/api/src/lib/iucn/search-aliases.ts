import type { SpeciesGroup } from "@app/contracts";

const SEARCH_ALIASES: Record<string, SpeciesGroup> = {
  grenouille: "amphibiens",
  crapaud: "amphibiens",
  salamandre: "amphibiens",
  triton: "amphibiens",
  serpent: "reptiles",
  tortue: "reptiles",
  lezard: "reptiles",
  crocodile: "reptiles",
  singe: "mammiferes",
  chauvesouris: "mammiferes",
  baleine: "mammiferes",
  dauphin: "mammiferes",
  mammifere: "mammiferes",
  oiseau: "oiseaux",
  perroquet: "oiseaux",
  rapace: "oiseaux",
  requin: "poissons",
  poisson: "poissons",
  raie: "poissons",
  arbre: "plantes",
  fleur: "plantes",
  plante: "plantes",
  orchidee: "plantes",
  palmier: "plantes",
  cactus: "plantes",
  papillon: "insectes",
  insecte: "insectes",
  abeille: "insectes",
  libellule: "insectes",
  escargot: "mollusques",
  coquillage: "mollusques",
  moule: "mollusques",
  mollusque: "mollusques",
};

function aliasFor(search: string): SpeciesGroup | null {
  const key = search
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\s-]/g, "");

  return SEARCH_ALIASES[key] ?? SEARCH_ALIASES[key.replace(/s$/, "")] ?? null;
}

export { aliasFor };
