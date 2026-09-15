import { useMemo } from "react";
import { Link, useParams } from "react-router";
import { Globe } from "lucide-react";
import { useRedList } from "@/hooks/use-red-list/useRedList";
import { normalizeCountryCode, translateCountry } from "@/lib/country";
import { SpeciesFilters } from "@/components/species-filters/SpeciesFilters";
import { PILL_CLASS, PILL_IDLE } from "@/components/species-filters/utils";
import { SpeciesGrid } from "@/components/species-grid/SpeciesGrid";
import { Pagination } from "@/components/pagination/Pagination";
import { CountryHero } from "./country-hero/CountryHero";
import { CountryNotFound } from "./country-status/CountryNotFound";

const CountryPage = () => {
  const { code } = useParams();
  const countryCode = normalizeCountryCode(code);

  const locked = useMemo(
    () => (countryCode === null ? {} : { countryCode }),
    [countryCode],
  );

  const {
    filters,
    setCategory,
    setGroup,
    setSearch,
    setWithPhoto,
    setPage,
    assessments,
  } = useRedList(locked);

  if (countryCode === null) return <CountryNotFound code={code ?? ""} />;

  const countryName = translateCountry(countryCode, countryCode);

  return (
    <div className="py-8 md:py-12">
      <CountryHero
        countryName={countryName}
        searchValue={filters.search ?? ""}
        onSearchChange={setSearch}
      />

      <SpeciesFilters
        selectedCategory={filters.category}
        onCategoryChange={setCategory}
        selectedGroup={filters.group}
        onGroupChange={setGroup}
        scope={locked}
        withPhoto={filters.withPhoto}
        onWithPhotoChange={setWithPhoto}
        totalItems={assessments.data?.total}
        isLoading={assessments.status === "loading"}
        actions={
          <Link
            viewTransition
            to="/atlas"
            className={`${PILL_CLASS} ${PILL_IDLE}`}
          >
            <Globe className="size-3.5" aria-hidden="true" />
            <span>Explorer un autre pays</span>
          </Link>
        }
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

export default CountryPage;
