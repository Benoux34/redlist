import { useState } from "react";
import { Link } from "react-router";
import { ChevronDown } from "lucide-react";
import { collapsibleClass } from "@/lib/utils";
import type { PresenceGroup } from "@app/contracts";
import { PRESENCE_FILLS } from "../utils";

type Props = Readonly<{
  presence: readonly PresenceGroup[];
}>;

const CountryList = ({ presence }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const total = presence.reduce(
    (sum, group) => sum + group.countries.length,
    0,
  );

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="species-countries"
        className="flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-3 text-xs text-[var(--color-ink-muted)] transition-colors hover:bg-[var(--color-paper-muted)]/40 hover:text-[var(--color-ink)]"
      >
        <span>Voir {total > 1 ? `les ${total} pays` : "le pays"}</span>
        <ChevronDown
          className={`size-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <div
        id="species-countries"
        inert={!isOpen}
        className={collapsibleClass(isOpen)}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-5 border-t border-[var(--color-paper-border)] px-5 py-5">
            {presence.map((group) => (
              <div key={group.presence}>
                <p className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: PRESENCE_FILLS[group.presence] }}
                    aria-hidden="true"
                  />
                  {group.label} · {group.countries.length}
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {group.countries.map((country) => (
                    <li key={country.code}>
                      <Link
                        viewTransition
                        to={`/pays/${country.code.toLowerCase()}`}
                        className="inline-flex items-center gap-1.5 border border-[var(--color-paper-border)] bg-[var(--color-paper-card)] px-2.5 py-1 text-xs text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)]"
                      >
                        {country.name}
                        {country.introduced && (
                          <span className="text-[var(--color-ink-faint)]">
                            · introduite
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { CountryList };
