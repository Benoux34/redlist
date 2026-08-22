import { Link } from "react-router";
import { useRedList } from "@/hooks/useRedList";
import { RedListHero } from "./red-list-hero/RedListHero";
import { SeverityScale } from "./red-list-scale/SeverityScale";
import { RedListControls } from "./red-list-controls/RedListControls";
import { SpeciesGrid } from "@/components/species-grid/SpeciesGrid";
import { Pagination } from "@/components/pagination/Pagination";

const RedList = () => {
  const {
    filters,
    setCategory,
    setSearch,
    setPage,
    setWithPhoto,
    assessments,
    counts,
  } = useRedList();

  return (
    <div className="py-8 md:py-12">
      <RedListHero />
      <SeverityScale
        selectedCategory={filters.category}
        onSelectCategory={setCategory}
        counts={counts}
      />
      <RedListControls
        filters={filters}
        onSearchChange={setSearch}
        onWithPhotoChange={setWithPhoto}
        totalItems={assessments.data?.total}
        isLoading={assessments.status === "loading"}
      />
      <SpeciesGrid assessments={assessments} onRetry={assessments.reload} />
      <Pagination
        currentPage={filters.page}
        pageSize={assessments.data?.pageSize ?? 40}
        totalItems={assessments.data?.total}
        onPageChange={setPage}
        isLoading={assessments.status === "loading"}
      />

      <div className="mt-8 border-t border-[var(--color-paper-border)] pt-6 text-center text-xs text-[var(--color-ink-muted)]">
        <span>Vous cherchez une espèce par son nom scientifique ? </span>
        <Link
          to="/especes/a"
          className="font-medium text-[var(--color-ink)] underline underline-offset-4 hover:opacity-80 transition-opacity"
        >
          Consulter l&apos;index alphabétique A–Z →
        </Link>
      </div>
    </div>
  );
};

export default RedList;
