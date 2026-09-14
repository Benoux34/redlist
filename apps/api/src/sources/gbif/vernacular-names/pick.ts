type Candidate = Readonly<{
  vernacularName: string;
  preferred?: boolean | null;
}>;

function pickFrenchName(candidates: readonly Candidate[]): string | null {
  const preferred = candidates.find((entry) => entry.preferred === true);
  if (preferred !== undefined) return preferred.vernacularName.trim();

  const counts = new Map<string, { name: string; count: number }>();

  for (const entry of candidates) {
    const name = entry.vernacularName.trim();
    if (name.length === 0) continue;

    const key = name.toLowerCase();
    const seen = counts.get(key);

    if (seen === undefined) counts.set(key, { name, count: 1 });
    else seen.count += 1;
  }

  let best: { name: string; count: number } | null = null;

  for (const entry of counts.values())
    if (best === null || entry.count > best.count) best = entry;

  return best?.name ?? null;
}

export { pickFrenchName };
export type { Candidate };
