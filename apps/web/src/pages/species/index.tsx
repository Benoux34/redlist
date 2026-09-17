import { useEffect } from "react";
import { useParams } from "react-router";
import { useSpeciesDetail } from "@/hooks/use-species-detail/useSpeciesDetail";
import { track } from "@/lib/analytics";
import { Loading } from "@/components/loading/Loading";
import { SpeciesHero } from "./species-hero/SpeciesHero";
import { SpeciesThreats } from "./species-threats/SpeciesThreats";
import { SpeciesPopulation } from "./species-population/SpeciesPopulation";
import { SpeciesLocations } from "./species-locations/SpeciesLocations";
import { SpeciesConservation } from "./species-conservation/SpeciesConservation";
import { SpeciesFurther } from "./species-further/SpeciesFurther";
import { SpeciesError } from "./_components/species-status/SpeciesError";
import { SpeciesNotFound } from "./_components/species-status/SpeciesNotFound";

const Species = () => {
  const { assessmentId } = useParams();
  const parsedId = Number(assessmentId);
  const isValidId = Number.isInteger(parsedId) && parsedId > 0;

  const detail = useSpeciesDetail(isValidId ? parsedId : null);
  const loaded = detail.status === "success" ? detail.data : null;

  useEffect(() => {
    if (loaded === null) return;

    track("fiche-vue", {
      photo: loaded.photoUrl !== null,
      description: loaded.description !== null,
      detailComplet: loaded.detailAvailable,
    });
  }, [loaded]);

  if (!isValidId) return <SpeciesNotFound />;
  if (detail.status === "loading")
    return <Loading label="Chargement de la fiche…" />;
  if (detail.status === "error")
    return <SpeciesError onRetry={detail.reload} />;

  return (
    <div className="py-8 md:py-12">
      <SpeciesHero species={detail.data} />
      <SpeciesThreats threats={detail.data.threats} />
      <SpeciesPopulation population={detail.data.population} />
      <SpeciesLocations
        distribution={detail.data.distribution}
        isEndemic={detail.data.isEndemic}
      />
      <SpeciesConservation groups={detail.data.conservation} />
      <SpeciesFurther species={detail.data} />
    </div>
  );
};

export default Species;
