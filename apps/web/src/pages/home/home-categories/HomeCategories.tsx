import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { useAsyncData } from "@/hooks/use-async-data/useAsyncData";
import { redlistCategoryCountsRequest } from "@/api/red-list";
import { CATEGORY_GUIDE } from "./utils";

const HomeCategories = () => {
  const { data: counts, status } = useAsyncData(
    redlistCategoryCountsRequest,
    [],
  );

  const countsMap = new Map<string, number>(
    counts?.map((c) => [c.categoryCode, c.count]) ?? [],
  );

  return (
    <section className="mb-20 text-left">
      <div className="border border-[var(--color-paper-border)] bg-transparent">
        <div className="hidden lg:grid grid-cols-[270px_1fr_130px_90px] items-center gap-6 border-b border-[var(--color-paper-border)] bg-[var(--color-paper-muted)]/40 px-6 py-3 text-[11px] font-mono uppercase tracking-wider text-[var(--color-ink-faint)]">
          <span>Statut</span>
          <span>Définition scientifique</span>
          <span className="text-right">Effectifs</span>
          <span className="text-right">Action</span>
        </div>

        <div className="divide-y divide-[var(--color-paper-border)]">
          {CATEGORY_GUIDE.map((cat) => {
            const count = countsMap.get(cat.code);

            return (
              <Link
                key={cat.code}
                to={`/threatened-species?category=${cat.code}`}
                className="group grid grid-cols-1 lg:grid-cols-[270px_1fr_130px_90px] items-start lg:items-center gap-3 lg:gap-6 p-5 lg:px-6 lg:py-5 transition-colors hover:bg-[var(--color-paper-muted)]/40 cursor-pointer text-left"
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`inline-flex size-9 sm:size-10 shrink-0 items-center justify-center border font-mono text-xs sm:text-sm font-bold ${cat.badgeBorder} ${cat.badgeBg} ${cat.badgeText}`}
                  >
                    {cat.code}
                  </span>
                  <span className="font-serif text-lg sm:text-xl font-medium tracking-tight text-[var(--color-ink)] leading-snug">
                    {cat.labelFr}
                  </span>
                </div>

                <div>
                  <p className="text-xs sm:text-sm text-[var(--color-ink-muted)] leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="lg:text-right">
                  {status === "loading" ? (
                    <span className="inline-block h-6 w-20 animate-pulse bg-[var(--color-paper-muted)]" />
                  ) : count !== undefined ? (
                    <div className="inline-flex flex-row lg:flex-col items-baseline lg:items-end gap-1.5 lg:gap-0">
                      <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                        {new Intl.NumberFormat("fr-FR").format(count)}
                      </span>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-ink-faint)]">
                        {count <= 1 ? "espèce" : "espèces"}
                      </span>
                    </div>
                  ) : (
                    <span className="font-mono text-xs text-[var(--color-ink-faint)]">
                      —
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-1.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-[var(--color-paper-border)]/40 text-xs font-medium text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink)] transition-colors">
                  <span className="lg:hidden">Explorer</span>
                  <span className="hidden lg:inline">Voir</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-1.5 flex items-center justify-between text-[11px] text-[var(--color-ink-faint)]">
        <p>
          * Les espèces classées <em>Préoccupation mineure (LC)</em>,{" "}
          <em>Quasi menacée (NT)</em> et <em>Données insuffisantes (DD)</em> ne
          sont pas incluses dans cet inventaire.
        </p>

        <Link to="/methodology" className="hover:underline">
          Comprendre la méthode UICN
        </Link>
      </div>
    </section>
  );
};

export { HomeCategories };
