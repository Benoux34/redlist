import { useRedList } from "@/hooks/useRedList";
import { RedListControls } from "../home/red-list-controls/RedListControls";
import { Pagination } from "@/components/pagination/Pagination";
import { SpeciesGrid } from "@/components/species-grid/SpeciesGrid";
import { PresumedExtinctHero } from "./presumed-extinct-hero/PresumedExtinctHero";

const LOCKED = { possiblyExtinct: true } as const;

const PresumedExtinct = () => {
  const { filters, setSearch, setWithPhoto, setPage, assessments } =
    useRedList(LOCKED);

  return (
    <div className="py-8 md:py-12">
      <PresumedExtinctHero />
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
    </div>
  );
};

export default PresumedExtinct;
