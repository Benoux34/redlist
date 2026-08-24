import { useAsyncData } from "@/hooks/useAsyncData";
import { redlistVersionRequest } from "@/api/red-list";
import { MethodologyHero } from "./methodology-hero/MethodologyHero";
import { MethodologyContent } from "./methodology-content/MethodologyContent";

const Methodology = () => {
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
