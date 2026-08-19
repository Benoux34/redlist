import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = Readonly<{
  currentPage: number;
  pageSize: number;
  totalItems: number | undefined;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}>;

const RedListPagination = ({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  isLoading = false,
}: Props) => {
  if (totalItems === undefined || totalItems <= pageSize) return null;

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);

  return (
    <section className="border-t border-[var(--color-paper-border)] pt-6">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs text-[var(--color-ink-muted)]">
          Affichage de{" "}
          <strong className="font-medium text-[var(--color-ink)]">
            {new Intl.NumberFormat("fr-FR").format(from)}
          </strong>{" "}
          à{" "}
          <strong className="font-medium text-[var(--color-ink)]">
            {new Intl.NumberFormat("fr-FR").format(to)}
          </strong>{" "}
          sur{" "}
          <strong className="font-medium text-[var(--color-ink)]">
            {new Intl.NumberFormat("fr-FR").format(totalItems)}
          </strong>{" "}
          espèces
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={!hasPrevious || isLoading}
            onClick={() => onPageChange(currentPage - 1)}
            className="flex items-center gap-1 border border-[var(--color-paper-border)] bg-transparent px-3 py-1.5 text-xs text-[var(--color-ink)] transition-colors hover:border-[var(--color-paper-border-strong)] hover:bg-[var(--color-paper-muted)]/40 disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="size-3.5" />
            <span>Précédent</span>
          </button>

          <span className="px-3 text-xs text-[var(--color-ink-muted)]">
            Page{" "}
            <span className="font-medium text-[var(--color-ink)]">
              {currentPage}
            </span>{" "}
            sur{" "}
            <span className="font-medium text-[var(--color-ink)]">
              {totalPages}
            </span>
          </span>

          <button
            type="button"
            disabled={!hasNext || isLoading}
            onClick={() => onPageChange(currentPage + 1)}
            className="flex items-center gap-1 border border-[var(--color-paper-border)] bg-transparent px-3 py-1.5 text-xs text-[var(--color-ink)] transition-colors hover:border-[var(--color-paper-border-strong)] hover:bg-[var(--color-paper-muted)]/40 disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
          >
            <span>Suivant</span>
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export { RedListPagination };
