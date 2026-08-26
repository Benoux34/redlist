import { useParams } from "react-router";
import { SpeciesHero } from "./species-hero/SpeciesHero";
import { SpeciesTaxonomy } from "./species-taxonomy/SpeciesTaxonomy";
import { SpeciesPopulationSection } from "./species-population/SpeciesPopulation";
import { SpeciesThreats } from "./species-threats/SpeciesThreats";
import { SpeciesConservation } from "./species-conservation/SpeciesConservation";
import { SpeciesDocumentation } from "./species-documentation/SpeciesDocumentation";
import { SpeciesLocations } from "./species-locations/SpeciesLocations";
import { SpeciesCitation } from "./species-citation/SpeciesCitation";
import { SpeciesError } from "./species-status/SpeciesError";
import { SpeciesLoading } from "./species-status/SpeciesLoading";
import { SpeciesNotFound } from "./species-status/SpeciesNotFound";
import { useSpeciesDetail } from "@/hooks/use-species-detail/useSpeciesDetail";

const Species = () => {
  const { assessmentId } = useParams();
  const parsedId = Number(assessmentId);
  const isValidId = Number.isInteger(parsedId) && parsedId > 0;

  const detail = useSpeciesDetail(isValidId ? parsedId : null);

  if (!isValidId) return <SpeciesNotFound />;
  if (detail.status === "loading") return <SpeciesLoading />;
  if (detail.status === "error")
    return <SpeciesError onRetry={detail.reload} />;

  const species = detail.data;

  return (
    <div className="py-6">
      <SpeciesHero species={species} />
      <SpeciesTaxonomy
        taxonomy={species.taxonomy}
        scientificName={species.scientificName}
      />
      <SpeciesPopulationSection population={species.population} />
      <SpeciesThreats threats={species.threats} habitats={species.habitats} />
      <SpeciesConservation actions={species.conservationActions} />
      <SpeciesDocumentation sections={species.sections} />
      <SpeciesLocations locations={species.locations} />
      <SpeciesCitation
        citation={species.citation}
        assessors={species.assessors}
        officialUrl={species.officialUrl}
        yearPublished={species.yearPublished}
      />
    </div>
  );
};

export default Species;
