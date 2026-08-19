import type { SpeciesLocation } from "@app/contracts";
import type { CountryProperties, PresenceKind, WorldGeoJson } from "./entities";
import { translateCountry, translateOrigin, translatePresence } from "../utils";

let cached: Promise<WorldGeoJson> | null = null;

const loadWorldGeoJson = (): Promise<WorldGeoJson> => {
  cached ??= fetch("/countries.geo.json").then((response) => {
    if (!response.ok)
      throw new Error(`Failed to load world GeoJSON: ${response.status}`);

    return response.json() as Promise<WorldGeoJson>;
  });

  return cached;
};

const COLORS: Record<PresenceKind, { stroke: string; fill: string }> = {
  current: { stroke: "#b93826", fill: "#dc3e26" },
  past: { stroke: "#8a3b5c", fill: "#b4537a" },
};

const PAST_PRESENCE = new Set([
  "Possibly Extinct",
  "Extinct Post-1500",
  "Presence Uncertain",
]);

function presenceKindOf(location: SpeciesLocation): PresenceKind {
  return location.presence !== null && PAST_PRESENCE.has(location.presence)
    ? "past"
    : "current";
}

function isoA2Of(properties: CountryProperties): string | null {
  return properties.iso_a2?.toUpperCase() ?? null;
}

function buildPopup(location: SpeciesLocation): HTMLElement {
  const container = document.createElement("div");
  container.style.minWidth = "140px";

  const title = document.createElement("p");
  title.textContent = translateCountry(location.countryCode, location.name);
  title.style.cssText =
    "font-family: var(--font-serif); font-size: 14px; font-weight: 600; margin-bottom: 4px;";
  container.append(title);

  const details = document.createElement("div");
  details.style.cssText =
    "font-size: 11px; display: flex; flex-direction: column; gap: 2px;";

  const origin = translateOrigin(location.origin);
  const presence = translatePresence(location.presence);

  for (const [label, value] of [
    ["Origine", origin],
    ["Statut", presence],
  ] as const) {
    if (value === null) continue;

    const line = document.createElement("span");
    line.textContent = `• ${label} : ${value}`;
    details.append(line);
  }

  container.append(details);
  return container;
}

export { loadWorldGeoJson, COLORS, presenceKindOf, isoA2Of, buildPopup };
