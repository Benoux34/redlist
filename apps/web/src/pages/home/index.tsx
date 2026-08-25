import { HomeHero } from "./home-hero/HomeHero";
import { HomeCategories } from "./home-categories/HomeCategories";
import { HomeSpeciesOfTheDay } from "./home-species-of-the-day/HomeSpeciesOfTheDay";
import { HomePortals } from "./home-portals/HomePortals";
import { HomeManifesto } from "./home-manifesto/HomeManifesto";

const Home = () => {
  return (
    <div className="py-8 md:py-12">
      <HomeHero />
      <HomeCategories />
      <HomePortals />
      <HomeSpeciesOfTheDay />
      <HomeManifesto />
    </div>
  );
};

export default Home;
