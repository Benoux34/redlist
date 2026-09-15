import { Link, useLocation } from "react-router";
import { ArrowRight, Globe } from "lucide-react";
import { NOT_FOUND_LINKS } from "./utils";

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <div className="py-16 md:py-24">
      <div>
        <p className="mb-4 font-mono text-xs uppercase tracking-wider text-[var(--color-status-cr)]">
          Erreur 404
        </p>

        <h1 className="mb-5 font-serif text-4xl leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-5xl">
          Cette page n&apos;existe pas.
        </h1>

        <p className="mb-2 text-base leading-relaxed text-[var(--color-ink-muted)]">
          L&apos;adresse demandée ne correspond à aucune page du site. Elle a pu
          être déplacée, ou comporter une faute de frappe.
        </p>

        <p className="mb-10 font-mono text-xs break-all text-[var(--color-ink-faint)]">
          {pathname}
        </p>

        <div className="border-t border-[var(--color-paper-border)]">
          {NOT_FOUND_LINKS.map((link) => (
            <Link
              viewTransition
              key={link.to}
              to={link.to}
              className="group flex items-baseline justify-between gap-4 border-b border-[var(--color-paper-border)] py-4 transition-colors hover:bg-[var(--color-paper-muted)]/40"
            >
              <span>
                <span className="font-serif text-lg text-[var(--color-ink)]">
                  {link.label}
                </span>
                <span className="mt-0.5 block text-xs text-[var(--color-ink-muted)]">
                  {link.hint}
                </span>
              </span>
              <ArrowRight className="size-4 shrink-0 self-center text-[var(--color-ink-faint)] transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>

        <Link
          viewTransition
          to="/atlas"
          className="mt-8 inline-flex items-center gap-1.5 border border-[var(--color-paper-border)] px-3 py-1.5 text-xs text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-paper-border-strong)] hover:text-[var(--color-ink)]"
        >
          <Globe className="size-3.5" aria-hidden="true" />
          <span>Ou explorer le globe</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
