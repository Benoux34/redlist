import { useRedList } from "@/hooks/useRedList";
import { RedListHero } from "./red-list-hero/RedListHero";
import { SeverityScale } from "./red-list-scale/SeverityScale";
import { RedListControls } from "./red-list-controls/RedListControls";
import { SpeciesGrid } from "./red-list-grid/SpeciesGrid";
import { RedListPagination } from "./red-list-pagination/RedListPagination";

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
      <RedListPagination
        currentPage={filters.page}
        pageSize={assessments.data?.pageSize ?? 40}
        totalItems={assessments.data?.total}
        onPageChange={setPage}
        isLoading={assessments.status === "loading"}
      />
    </div>
  );
};

export { RedList };
