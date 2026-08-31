import { useRedList } from "@/hooks/use-red-list/useRedList";
import { PresumedExtinctHero } from "./presumed-extinct-hero/PresumedExtinctHero";
import { SpeciesFilters } from "@/components/species-filters/SpeciesFilters";
import { Pagination } from "@/components/pagination/Pagination";
import { SpeciesGrid } from "@/components/species-grid/SpeciesGrid";

const LOCKED = { possiblyExtinct: true } as const;

const PresumedExtinct = () => {
  const {
    filters,
    setCategory,
    setGroup,
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

      <SpeciesFilters
        selectedCategory={filters.category}
        onCategoryChange={setCategory}
        selectedGroup={filters.group}
        onGroupChange={setGroup}
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
