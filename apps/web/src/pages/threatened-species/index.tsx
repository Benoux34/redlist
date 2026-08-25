import { Link } from "react-router";
import { useRedList } from "@/hooks/useRedList";
import { ThreatenedSpeciesHero } from "./threatened-species-hero/ThreatenedSpeciesHero";
import { ThreatenedSpeciesFilters } from "./threatened-species-filters/ThreatenedSpeciesFilters";
import { SpeciesGrid } from "@/components/species-grid/SpeciesGrid";
import { Pagination } from "@/components/pagination/Pagination";

const ThreatenedSpecies = () => {
  const {
    filters,
    setCategory,
    setSearch,
    setPage,
    setWithPhoto,
    assessments,
  } = useRedList();

  return (
    <div className="py-8 md:py-12">
      <ThreatenedSpeciesHero
        searchValue={filters.search ?? ""}
        onSearchChange={setSearch}
      />

      <ThreatenedSpeciesFilters
        selectedCategory={filters.category}
        onCategoryChange={setCategory}
        withPhoto={filters.withPhoto}
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

export default ThreatenedSpecies;
