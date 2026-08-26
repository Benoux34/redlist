import { Link } from "react-router";
import { ExternalLink } from "lucide-react";
import { redlistVersionRequest } from "@/api/red-list";
import { useAsyncData } from "@/hooks/use-async-data/useAsyncData";
import { PRINCIPLES } from "./utils";

const HomeManifesto = () => {
  const { data: version } = useAsyncData(redlistVersionRequest, []);

  return (
    <section className="mb-12 text-left">
      <div className="border border-[var(--color-paper-border)] divide-y md:divide-y-0 md:divide-x divide-[var(--color-paper-border)] md:grid md:grid-cols-3 bg-transparent">
        {PRINCIPLES.map((principle) => (
          <div key={principle.number} className="p-6 sm:p-7 text-left">
            <span className="font-mono text-xs text-[var(--color-ink-faint)] tracking-wider mb-2.5 block">
              {principle.number}
            </span>

            <h3 className="font-serif text-lg sm:text-xl font-medium tracking-tight text-[var(--color-ink)] mb-2">
              {principle.title}
            </h3>

            <p className="text-xs sm:text-sm text-[var(--color-ink-muted)] leading-relaxed">
              {principle.description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-x border-b border-[var(--color-paper-border)] px-5 py-3 text-xs text-[var(--color-ink-muted)]">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ink-faint)]" />
          <span>
            Données de référence :{" "}
            <strong className="text-[var(--color-ink)] font-medium">
              Liste Rouge de l&apos;UICN v{version?.redListVersion ?? "2024-2"}
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <Link
            to="/methodology"
            className="text-[var(--color-ink)] hover:underline hover:opacity-80 transition-opacity"
          >
            Consulter la méthodologie
          </Link>
          <a
            href="https://www.iucnredlist.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
          >
            <span>iucnredlist.org</span>
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>
    </section>
  );
};

export { HomeManifesto };
