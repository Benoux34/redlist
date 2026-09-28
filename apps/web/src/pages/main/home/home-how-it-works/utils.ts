import { Binoculars, ClipboardCheck, Tags } from "lucide-react";
import type { WarningSignal } from "./entities";
import type { HowStep } from "./step/entities";

const OBSERVE: HowStep = {
  number: "01",
  title: "Observer",
  description:
    "On rassemble tout ce que l'on sait de l'espèce : combien d'individus il reste, où ils vivent, et comment ce nombre évolue.",
  icon: Binoculars,
};

const EVALUATE: HowStep = {
  number: "02",
  title: "Évaluer",
  description:
    "On vérifie si l'espèce présente un des 5 signaux d'alerte définis par l'UICN. Un seul suffit pour qu'elle soit jugée menacée.",
  icon: ClipboardCheck,
};

const CLASSIFY: HowStep = {
  number: "03",
  title: "Classer",
  description:
    "Plus le signal est fort, plus le statut est grave : « vulnérable », « en danger » ou « en danger critique ». Ce sont les catégories du tableau juste après.",
  icon: Tags,
};

const SIGNALS: WarningSignal[] = [
  {
    letter: "A",
    title: "Déclin rapide",
    description:
      "Le nombre d'individus a fortement chuté en dix ans ou en trois générations.",
  },
  {
    letter: "B",
    title: "Territoire réduit",
    description:
      "L'espèce ne vit que sur une petite zone, morcelée ou qui rétrécit.",
  },
  {
    letter: "C",
    title: "Population faible en déclin",
    description: "Il reste peu d'adultes, et leur nombre continue de baisser.",
  },
  {
    letter: "D",
    title: "Population minuscule",
    description:
      "Il reste très peu d'individus, ou ils vivent sur une surface infime.",
  },
  {
    letter: "E",
    title: "Risque calculé",
    description:
      "Un modèle mathématique estime une forte probabilité de disparition.",
  },
];

const SIGNAL_STAGGER_MS = 70;

export { OBSERVE, EVALUATE, CLASSIFY, SIGNALS, SIGNAL_STAGGER_MS };
