import { Link } from "react-router";
import { ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--color-paper-border)] text-[var(--color-ink-muted)]">
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-8 md:px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-2">
            <Link
              to="/"
              className="flex items-baseline gap-1 font-serif text-2xl font-semibold tracking-tight text-[var(--color-ink)]"
            >
              <p>REDLIST</p>
              <span className="h-1 w-1 rounded-full bg-[var(--color-status-cr)]" />
            </Link>
            <p className="max-w-sm text-xs leading-relaxed">
              Une lecture humaine, sobre et accessible des données scientifiques
              sur l&apos;état de la biodiversité mondiale et des espèces
              menacées d&apos;extinction.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink)]">
              Navigation
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/"
                  className="transition-colors hover:text-[var(--color-ink)]"
                >
                  La Liste Rouge des espèces
                </Link>
              </li>
              <li>
                <Link
                  to="/presumed-extinct"
                  className="transition-colors hover:text-[var(--color-ink)]"
                >
                  Espèces présumées éteintes
                </Link>
              </li>
              <li>
                <Link
                  to="/account"
                  className="transition-colors hover:text-[var(--color-ink)]"
                >
                  Espace personnel
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink)]">
              Source & Méthodologie
            </p>
            <p className="text-xs leading-relaxed">
              Données de référence issues de la{" "}
              <strong className="font-medium text-[var(--color-ink)]">
                Liste Rouge de l'UICN
              </strong>{" "}
              (Union Internationale pour la Conservation de la Nature).
            </p>
            <a
              href="https://www.iucnredlist.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[var(--color-ink)] underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              <span>Consulter le portail officiel de l&apos;UICN</span>
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--color-paper-border)]/80 pt-6 text-center text-[11px] text-[var(--color-ink-faint)] sm:flex sm:items-center sm:justify-between sm:text-left">
          <p>© {currentYear} Freedom. Projet ouvert & indépendant.</p>
          <p className="mt-2 sm:mt-0">
            Les photographies et descriptions demeurent la propriété de leurs
            auteurs et détenteurs de licence respectifs.
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
