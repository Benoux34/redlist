import { z } from "zod";

const redListCategoryCode = z.enum(["EX", "EW", "CR", "EN", "VU"]);

const speciesGroup = z.enum([
  "mammiferes",
  "oiseaux",
  "reptiles",
  "amphibiens",
  "poissons",
  "insectes",
  "mollusques",
  "plantes",
]);

export { redListCategoryCode, speciesGroup };
