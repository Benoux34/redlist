import { HomeHero } from "./home-hero/HomeHero";
import { HomeHowItWorks } from "./home-how-it-works/HomeHowItWorks";
import { HomeCategories } from "./home-categories/HomeCategories";
import { HomeFeaturedSpecies } from "./home-featured-species/HomeFeaturedSpecies";
import { HomeThreats } from "./home-threats/HomeThreats";
import { HomeActions } from "./home-actions/HomeActions";
import { usePageMeta } from "@/hooks/use-page-meta/usePageMeta";

const Home = () => {
  usePageMeta({
    title: "Les espèces menacées d'extinction",
    description:
      "Comprendre l'état du vivant à partir de la Liste rouge de l'UICN : statuts, causes du déclin, espèces menacées par pays et gestes concrets pour agir.",
  });

  return (
    <div className="py-8 md:py-12">
      <HomeHero />
      <HomeHowItWorks />
      <HomeCategories />
      <HomeFeaturedSpecies />
      <HomeThreats />
      <HomeActions />
    </div>
  );
};

export default Home;
