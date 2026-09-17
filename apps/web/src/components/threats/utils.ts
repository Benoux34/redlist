import { Bug, Factory, Fish, ThermometerSun, Trees } from "lucide-react";
import type { Threat, ThreatKey } from "./entities";

const THREATS: Threat[] = [
  {
    key: "habitat",
    icon: Trees,
    number: "01",
    title: "Destruction des milieux",
    description:
      "Forêts rasées, zones humides asséchées, côtes bétonnées : les espèces perdent l'endroit où elles vivent.",
  },
  {
    key: "exploitation",
    icon: Fish,
    number: "02",
    title: "Surexploitation",
    description:
      "Chasse, pêche intensive et commerce d'espèces sauvages prélèvent plus vite que les populations ne se renouvellent.",
  },
  {
    key: "climate",
    icon: ThermometerSun,
    number: "03",
    title: "Changement climatique",
    description:
      "Températures et saisons changent plus vite que la capacité de nombreuses espèces à s'adapter ou à se déplacer.",
  },
  {
    key: "pollution",
    icon: Factory,
    number: "04",
    title: "Pollutions",
    description:
      "Pesticides, plastiques, eaux usées et éclairage nocturne dégradent les milieux et affaiblissent la faune.",
  },
  {
    key: "invasive",
    icon: Bug,
    number: "05",
    title: "Espèces envahissantes",
    description:
      "Des espèces introduites par l'humain concurrencent, dévorent ou contaminent les espèces locales.",
  },
];

const THREAT_LABELS = Object.fromEntries(
  THREATS.map((threat) => [threat.key, threat.title]),
) as Record<ThreatKey, string>;

export { THREATS, THREAT_LABELS };
