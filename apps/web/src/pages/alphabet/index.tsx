import { useMemo } from "react";
import { Navigate, useParams } from "react-router";
import { useRedList } from "@/hooks/useRedList";
import { AlphabetHero } from "./alphabet-hero/AlphabetHero";
import { AlphabetNav } from "./alphabet-nav/AlphabetNav";
import { Controls } from "@/components/controls/Controls";
import { SpeciesGrid } from "@/components/species-grid/SpeciesGrid";
import { Pagination } from "@/components/pagination/Pagination";

const LETTER_PATTERN = /^[a-z]$/i;

const Alphabet = () => {
  const { letter } = useParams();
  const isValid = letter !== undefined && LETTER_PATTERN.test(letter);
  const currentLetter = isValid ? letter.toUpperCase() : "A";

  const lockedFilters = useMemo(
    () => ({ letter: currentLetter }),
    [currentLetter],
  );

  const { filters, setSearch, setWithPhoto, setPage, assessments } =
    useRedList(lockedFilters);

  if (!isValid) return <Navigate to="/especes/a" replace />;

  return (
    <div className="py-8 md:py-12">
      <AlphabetHero letter={currentLetter} />

      <AlphabetNav activeLetter={currentLetter} />

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

export default Alphabet;
