import { HomeHero } from "./home-hero/HomeHero";
import { HomeHowItWorks } from "./home-how-it-works/HomeHowItWorks";
import { HomeCategories } from "./home-categories/HomeCategories";
import { HomeFeaturedSpecies } from "./home-featured-species/HomeFeaturedSpecies";
import { HomeThreats } from "./home-threats/HomeThreats";
import { HomeActions } from "./home-actions/HomeActions";

const Home = () => {
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
