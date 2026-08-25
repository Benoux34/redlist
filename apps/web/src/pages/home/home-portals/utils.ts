import type { PortalItem } from "./entities";

const PORTALS: PortalItem[] = [
  {
    index: "01",
    title: "Le Catalogue Mondial",
    description:
      "Parcourez l'intégralité des évaluations scientifiques de l'UICN avec filtres avancés par statut, recherche textuelle et présence de photographies.",
    href: "/threatened-species",
    cta: "Explorer le catalogue",
  },
  {
    index: "02",
    title: "En France & Outre-mer",
    description:
      "Découvrez les espèces en péril sur le territoire métropolitain ainsi que dans les points chauds de biodiversité ultra-marins (Guyane, Réunion, Nouvelle-Calédonie).",
    href: "/france",
    cta: "Voir les espèces en France",
  },
  {
    index: "03",
    title: "Présumées Éteintes",
    description:
      "Une veille consacrée aux espèces en danger critique d'extinction sans observation confirmée depuis plusieurs décennies, au seuil de la disparition totale.",
    href: "/presumed-extinct",
    cta: "Consulter les espèces",
  },
  {
    index: "04",
    title: "Index Alphabétique A–Z",
    description:
      "Accédez à l'annuaire taxonomique intégral par initiale latine du nom scientifique pour une consultation académique directe.",
    href: "/especes/a",
    cta: "Feuilleter l'index A–Z",
  },
  {
    index: "05",
    title: "Méthodologie Scientifique",
    description:
      "Comprenez les critères d'évaluation de l'UICN (critères A à E), la provenance des données ouvertes et les choix de périmètre de l'observatoire.",
    href: "/methodology",
    cta: "Lire la note méthodologique",
  },
  {
    index: "06",
    title: "Espace Personnel & Suivi",
    description:
      "Connectez-vous pour constituer votre carnet de bord personnel et suivre en continu l'état de conservation et l'évolution des espèces suivies.",
    href: "/account",
    cta: "Gérer mes espèces suivies",
  },
];

export { PORTALS };
