import z from "zod";

const INAT_BASE_URL = "https://api.inaturalist.org/v1";
const USER_AGENT = "Freedom/0.1 (contact@example.com)";

const ALLOWED_LICENSES = new Set([
  "cc0",
  "cc-by",
  "cc-by-nc",
  "cc-by-sa",
  "cc-by-nc-sa",
]);

const photo = z.object({
  medium_url: z.string().nullish(),
  square_url: z.string().nullish(),
  license_code: z.string().nullish(),
  attribution: z.string().nullish(),
});

const taxon = z.object({
  id: z.number().int(),
  name: z.string(),
  preferred_common_name: z.string().nullish(),
  default_photo: photo.nullish(),
});

const taxaResponse = z.object({
  results: z.array(taxon).default([]),
});

export {
  INAT_BASE_URL,
  USER_AGENT,
  ALLOWED_LICENSES,
  photo,
  taxon,
  taxaResponse,
};
