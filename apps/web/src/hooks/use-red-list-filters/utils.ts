import { speciesGroup } from "@app/contracts";

const VALID_CATEGORIES = new Set(["EX", "EW", "CR", "EN", "VU"]);
const VALID_GROUPS = new Set<string>(speciesGroup.options);

export { VALID_CATEGORIES, VALID_GROUPS };
