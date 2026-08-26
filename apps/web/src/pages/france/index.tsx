import { useRedList } from "@/hooks/use-red-list/useRedList";
import { FranceHero } from "./france-hero/FranceHero";
import { SpeciesFilters } from "@/components/species-filters/SpeciesFilters";
import { SpeciesGrid } from "@/components/species-grid/SpeciesGrid";
import { Pagination } from "@/components/pagination/Pagination";

const LOCKED = { countryCode: "FR" } as const;

const France = () => {
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
      <FranceHero
        searchValue={filters.search ?? ""}
        onSearchChange={setSearch}
      />

      <SpeciesFilters
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

export default France;
