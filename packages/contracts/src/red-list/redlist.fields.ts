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

const letterFilter = z
  .string()
  .length(1)
  .regex(/^[A-Z]$/);

const countryCodeFilter = z
  .string()
  .length(2)
  .regex(/^[A-Z]{2}$/);

export { redListCategoryCode, speciesGroup, letterFilter, countryCodeFilter };
