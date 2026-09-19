import { useAsyncData } from "@/hooks/use-async-data/useAsyncData";
import { redlistVersionRequest } from "@/api/red-list";
import { MethodologyHero } from "./methodology-hero/MethodologyHero";
import { MethodologyContent } from "./methodology-content/MethodologyContent";
import { usePageMeta } from "@/hooks/use-page-meta/usePageMeta";

const Methodology = () => {
  usePageMeta({
    title: "Méthodologie et sources",
    description:
      "D'où viennent les données du site : évaluations de l'UICN, taxonomie GBIF, descriptions Wikipédia et photographies, et comment elles sont mises à jour.",
  });

  const versionState = useAsyncData(redlistVersionRequest, []);
  const version = versionState.status === "success" ? versionState.data : null;

  return (
    <div className="py-8 md:py-12">
      <MethodologyHero version={version} />
      <MethodologyContent version={version} />
    </div>
  );
};

export default Methodology;
