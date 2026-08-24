import { useRedList } from "@/hooks/useRedList";
import { FranceHero } from "./france-hero/FranceHero";
import { Controls } from "@/components/controls/Controls";
import { SpeciesGrid } from "@/components/species-grid/SpeciesGrid";
import { Pagination } from "@/components/pagination/Pagination";

const LOCKED = { countryCode: "FR" } as const;

const France = () => {
  const { filters, setSearch, setWithPhoto, setPage, assessments } =
    useRedList(LOCKED);

  return (
    <div className="py-8 md:py-12">
      <FranceHero />

      <Controls
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

export default France;
