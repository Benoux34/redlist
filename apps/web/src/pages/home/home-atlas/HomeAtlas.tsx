import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { ATLAS_STEPS } from "./utils";

const HomeAtlas = () => {
  return (
    <section className="mb-20 text-left">
      <div className="border border-[var(--color-paper-border)] bg-transparent">
        <div className="grid grid-cols-1 divide-y divide-[var(--color-paper-border)] lg:grid-cols-12 lg:divide-x lg:divide-y-0">
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-[var(--color-ink-faint)]">
                Nouveau · Atlas
              </p>

              <h2 className="mb-3 font-serif text-2xl font-medium tracking-tight text-[var(--color-ink)] sm:text-3xl">
                Où disparaissent les espèces ?
              </h2>

              <p className="max-w-xl text-sm leading-relaxed text-[var(--color-ink-muted)]">
                Un globe à faire tourner. Chaque territoire s&apos;y colore
                selon le nombre d&apos;espèces menacées qu&apos;il abrite — et
                les foyers d&apos;extinction apparaissent avant même le premier
                clic.
              </p>
            </div>

            <Link
              viewTransition
              to="/atlas"
              className="mt-8 inline-flex items-center gap-2 self-start border border-[var(--color-paper-border-strong)] bg-[var(--color-paper-card)] px-4 py-2.5 text-xs font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-paper-muted)]"
            >
              <span>Explorer le globe</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="flex flex-col justify-center gap-4 bg-[var(--color-paper-muted)]/20 p-6 sm:p-8 lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
              Espèces menacées par pays
            </p>

            <div className="flex">
              {[...ATLAS_STEPS].reverse().map((step) => (
                <span
                  key={step.min}
                  className="block h-8 flex-1"
                  style={{ backgroundColor: step.color }}
                />
              ))}
            </div>

            <div className="flex items-baseline justify-between font-mono text-[11px] tabular-nums text-[var(--color-ink-faint)]">
              <span>1</span>
              <span>2 500 +</span>
            </div>

            <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
              Survolez un territoire pour découvrir ses effectifs par statut et
              quelques-unes des espèces qui y subsistent.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { HomeAtlas };
