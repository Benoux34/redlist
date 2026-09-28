const NOT_FOUND_LINKS = [
  {
    to: "/",
    label: "Accueil",
    hint: "L'état de la biodiversité menacée, en résumé",
  },
  {
    to: "/threatened-species",
    label: "Les espèces menacées",
    hint: "Le catalogue complet, avec recherche et filtres",
  },
  {
    to: "/pays/fr",
    label: "En France",
    hint: "Les espèces recensées sur le territoire français",
  },
  {
    to: "/especes/a",
    label: "Index alphabétique",
    hint: "Parcourir les espèces par nom scientifique",
  },
] as const;

export { NOT_FOUND_LINKS };
