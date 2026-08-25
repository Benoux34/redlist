import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { PORTALS } from "./utils";

const HomePortals = () => {
  return (
    <section className="mb-20 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[var(--color-paper-border)] bg-transparent">
        {PORTALS.map((portal) => (
          <Link
            key={portal.href}
            to={portal.href}
            className="group flex flex-col justify-between p-6 sm:p-7 border-r border-b border-[var(--color-paper-border)] transition-colors hover:bg-[var(--color-paper-muted)]/40 cursor-pointer text-left"
          >
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-xs text-[var(--color-ink-faint)] tracking-wider">
                  {portal.index}
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-[var(--color-ink)] mb-2 group-hover:text-[var(--color-ink)]">
                {portal.title}
              </h3>

              <p className="text-xs sm:text-sm text-[var(--color-ink-muted)] leading-relaxed">
                {portal.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--color-paper-border)]/60 flex items-center justify-between text-xs font-medium text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink)] transition-colors">
              <span>{portal.cta}</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export { HomePortals };
