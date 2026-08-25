import { useRedList } from "@/hooks/useRedList";
import { PresumedExtinctHero } from "./presumed-extinct-hero/PresumedExtinctHero";
import { ThreatenedSpeciesFilters } from "../threatened-species/threatened-species-filters/ThreatenedSpeciesFilters";
import { Pagination } from "@/components/pagination/Pagination";
import { SpeciesGrid } from "@/components/species-grid/SpeciesGrid";

const LOCKED = { possiblyExtinct: true } as const;

const PresumedExtinct = () => {
  const {
    filters,
    setCategory,
    setSearch,
    setWithPhoto,
    setPage,
    assessments,
  } = useRedList(LOCKED);

  return (
    <div className="py-8 md:py-12">
      <PresumedExtinctHero
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
    </div>
  );
};

export default PresumedExtinct;
