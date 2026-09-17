type FeaturedEntry = Readonly<{
  scientificName: string;
  name: string;
}>;

type FeaturedCandidate = Readonly<{
  scientificName: string;
  vernacularNameFr: string | null;
  photoUrl: string | null;
}>;

const FEATURED_SPECIES: readonly FeaturedEntry[] = [
  { scientificName: "Raphus cucullatus", name: "Dodo" },
  { scientificName: "Panthera tigris", name: "Tigre" },
  { scientificName: "Ambystoma mexicanum", name: "Axolotl" },
  { scientificName: "Ailuropoda melanoleuca", name: "Panda géant" },
  { scientificName: "Thylacinus cynocephalus", name: "Thylacine" },
  { scientificName: "Rhinoceros sondaicus", name: "Rhinocéros de Java" },
  { scientificName: "Ursus maritimus", name: "Ours polaire" },
  { scientificName: "Elaphurus davidianus", name: "Cerf du père David" },
  { scientificName: "Pongo pygmaeus", name: "Orang-outan de Bornéo" },
  { scientificName: "Balaenoptera musculus", name: "Baleine bleue" },
  { scientificName: "Pinguinus impennis", name: "Grand Pingouin" },
  { scientificName: "Acinonyx jubatus", name: "Guépard" },
  { scientificName: "Gorilla beringei", name: "Gorille de l'Est" },
  { scientificName: "Elephas maximus", name: "Éléphant d'Asie" },
  { scientificName: "Ectopistes migratorius", name: "Tourte voyageuse" },
  { scientificName: "Panthera leo", name: "Lion" },
  { scientificName: "Phocoena sinus", name: "Vaquita" },
  { scientificName: "Corvus hawaiiensis", name: "Corneille d'Hawaï" },
  { scientificName: "Pan troglodytes", name: "Chimpanzé" },
  { scientificName: "Diceros bicornis", name: "Rhinocéros noir" },
  { scientificName: "Hydrodamalis gigas", name: "Rhytine de Steller" },
  { scientificName: "Giraffa camelopardalis", name: "Girafe" },
  { scientificName: "Manis pentadactyla", name: "Pangolin de Chine" },
  { scientificName: "Loxodonta africana", name: "Éléphant de savane" },
  { scientificName: "Chelonoidis abingdonii", name: "Tortue de Pinta" },
  { scientificName: "Panthera uncia", name: "Léopard des neiges" },
  { scientificName: "Pongo abelii", name: "Orang-outan de Sumatra" },
  { scientificName: "Lycaon pictus", name: "Lycaon" },
  { scientificName: "Pseudoryx nghetinhensis", name: "Saola" },
  { scientificName: "Hippopotamus amphibius", name: "Hippopotame" },
  { scientificName: "Conuropsis carolinensis", name: "Conure de Caroline" },
  { scientificName: "Eretmochelys imbricata", name: "Tortue imbriquée" },
  { scientificName: "Gorilla gorilla", name: "Gorille de l'Ouest" },
  { scientificName: "Oryx dammah", name: "Oryx algazelle" },
  { scientificName: "Lipotes vexillifer", name: "Dauphin de Chine" },
  { scientificName: "Dugong dugon", name: "Dugong" },
  { scientificName: "Dicerorhinus sumatrensis", name: "Rhinocéros de Sumatra" },
  { scientificName: "Loxodonta cyclotis", name: "Éléphant de forêt d'Afrique" },
];

const FEATURED_NAMES = FEATURED_SPECIES.map((entry) => entry.scientificName);

function orderFeatured<T extends FeaturedCandidate>(rows: readonly T[]): T[] {
  const byName = new Map<string, T>();

  for (const row of rows)
    if (!byName.has(row.scientificName)) byName.set(row.scientificName, row);

  return FEATURED_SPECIES.flatMap((entry) => {
    const row = byName.get(entry.scientificName);

    return row === undefined ? [] : [{ ...row, vernacularNameFr: entry.name }];
  });
}

function pickForDay<T extends FeaturedCandidate>(
  candidates: readonly T[],
  now: number,
  msPerDay: number,
): T | null {
  const withPhoto = candidates.filter(
    (candidate) => candidate.photoUrl !== null,
  );
  const pool = withPhoto.length > 0 ? withPhoto : candidates;

  if (pool.length === 0) return null;

  const dayIndex = Math.floor(now / msPerDay);

  return pool[dayIndex % pool.length] ?? null;
}

export { FEATURED_SPECIES, FEATURED_NAMES, orderFeatured, pickForDay };
export type { FeaturedEntry, FeaturedCandidate };
