import { CircleHelp } from "lucide-react";

const THREAT_CLASSIFICATION_URL =
  "https://www.iucnredlist.org/resources/threat-classification-scheme";

const VISIBLE_LABELS = 4;

const OTHER_CAUSE = {
  icon: CircleHelp,
  title: "Autres causes",
  description:
    "Phénomènes naturels ou menaces qui n'entrent dans aucune grande cause.",
};

export { OTHER_CAUSE, THREAT_CLASSIFICATION_URL, VISIBLE_LABELS };
