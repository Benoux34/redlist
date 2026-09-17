import { useMemo, useState } from "react";
import type { SpeciesDistribution } from "@app/contracts";
import { MapPin } from "lucide-react";
import { HomeSectionHeader } from "@/pages/home/_components/home-section-header/HomeSectionHeader";
import { WorldMap } from "@/components/world-map/WorldMap";
import type { MapCountry } from "@/components/world-map/entities";
import { CountryList } from "./country-list/CountryList";
import { EYEBROW, PRESENCE_FILLS } from "./utils";

type Props = Readonly<{
  distribution: SpeciesDistribution;
  isEndemic: boolean;
}>;

const SpeciesLocations = ({ distribution, isEndemic }: Props) => {
  const [hovered, setHovered] = useState<MapCountry | null>(null);
  const { presence, habitats } = distribution;
  const fills = useMemo(
    () =>
      new Map(
        presence.flatMap((group) =>
          group.countries.map((country) => [
            country.code,
            PRESENCE_FILLS[group.presence],
          ]),
        ),
      ),
    [presence],
  );

  if (presence.length === 0 && habitats.length === 0) return null;

  const current =
    presence.find((group) => group.presence === "current")?.countries ?? [];
  const hoveredGroup = presence.find((group) =>
    group.countries.some((country) => country.code === hovered?.code),
  );

  return (
    <section id="repartition" className="mb-20 scroll-mt-24 text-left">
      <HomeSectionHeader
        eyebrow="La répartition"
        title="Où vit-elle ?"
        lede={
          current.length > 0
            ? `Encore présente dans ${current.length} pays, selon les relevés de l'UICN. Cliquez sur un pays pour découvrir ses autres espèces menacées.`
            : "Les territoires où l'UICN a relevé sa présence."
        }
      />

      {isEndemic && current.length > 0 && (
        <div className="mb-6 flex items-start gap-3 border border-[var(--color-status-cr-border)] bg-[var(--color-status-cr-bg)] px-5 py-4">
          <MapPin
            className="mt-0.5 size-4 shrink-0 text-[var(--color-status-cr)]"
            aria-hidden="true"
          />
          <p className="text-sm leading-relaxed text-[var(--color-ink)]">
            <strong className="font-medium">Espèce endémique</strong> : elle ne
            vit nulle part ailleurs au monde qu&apos;ici,{" "}
            {current.map((country) => country.name).join(", ")}.
          </p>
        </div>
      )}

      <div className="border border-[var(--color-paper-border)]">
        {presence.length > 0 && (
          <>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-[var(--color-paper-border)] px-5 py-3 text-xs text-[var(--color-ink-muted)]">
              {presence.map((group) => (
                <span key={group.presence} className="flex items-center gap-2">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: PRESENCE_FILLS[group.presence] }}
                    aria-hidden="true"
                  />
                  {group.label}
                  <span className="font-mono tabular-nums text-[var(--color-ink-faint)]">
                    {group.countries.length}
                  </span>
                </span>
              ))}
            </div>

            <div className="relative p-4 sm:p-6">
              <WorldMap
                label="Carte des pays où vit l'espèce"
                fills={fills}
                hrefOf={(code) => `/pays/${code.toLowerCase()}`}
                onHover={setHovered}
              />

              {hovered !== null && (
                <div className="pointer-events-none absolute left-4 top-4 border border-[var(--color-paper-border)] bg-[var(--color-paper)]/95 px-3.5 py-2.5 backdrop-blur-sm sm:left-6 sm:top-6">
                  <p className="font-serif text-lg font-medium leading-tight text-[var(--color-ink)]">
                    {hovered.name}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--color-ink-muted)]">
                    {hoveredGroup?.label ?? "Espèce non recensée"}
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${presence.length > 0 ? "border-t border-[var(--color-paper-border)]" : ""}`}
        >
          {habitats.length > 0 && (
            <div className="border-b border-[var(--color-paper-border)] px-5 py-4 md:border-b-0 md:border-r">
              <p className={EYEBROW}>Ses milieux de vie</p>
              <ul className="flex flex-wrap gap-1.5">
                {habitats.map((label) => (
                  <li
                    key={label}
                    className="border border-[var(--color-paper-border)] bg-[var(--color-paper-card)] px-2.5 py-1 text-xs text-[var(--color-ink)]"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {presence.length > 0 && (
            <div className={habitats.length > 0 ? "" : "md:col-span-2"}>
              <CountryList presence={presence} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export { SpeciesLocations };
