import {
  Beef,
  Camera,
  Cat,
  Fish,
  Gem,
  HeartHandshake,
  LightbulbOff,
  Plane,
  SprayCan,
  Sprout,
  TreeDeciduous,
  Turtle,
} from "lucide-react";
import type { Gesture, GestureDomain } from "./entities";

const DOMAINS: GestureDomain[] = [
  {
    label: "Dans l'assiette",
    gestures: [
      {
        title: "Manger moins de viande",
        icon: Beef,
        description:
          "L'élevage et les cultures qui le nourrissent comptent parmi les premières causes de déforestation.",
        threat: "habitat",
        featured: true,
      },
      {
        title: "Varier les poissons",
        icon: Fish,
        description:
          "Éviter les espèces surpêchées et privilégier la pêche durable allège la pression sur les stocks fragiles.",
        threat: "exploitation",
      },
    ],
  },
  {
    label: "Au jardin et au balcon",
    gestures: [
      {
        title: "Se passer de pesticides",
        icon: SprayCan,
        description:
          "Ils tuent bien au-delà des « nuisibles » : pollinisateurs, oiseaux et amphibiens en paient le prix.",
        threat: "pollution",
        featured: true,
      },
      {
        title: "Laisser un coin sauvage",
        icon: Sprout,
        description:
          "Plantes locales, herbes hautes, tas de bois, point d'eau : quelques mètres carrés accueillent insectes et hérissons.",
        threat: "habitat",
      },
    ],
  },
  {
    label: "Avec ses animaux",
    gestures: [
      {
        title: "Ne jamais relâcher un animal",
        icon: Turtle,
        description:
          "Une tortue de Floride ou un poisson rouge relâché peut devenir envahissant et menacer les espèces locales.",
        threat: "invasive",
      },
      {
        title: "Rentrer son chat la nuit",
        icon: Cat,
        description:
          "Les chats domestiques chassent chaque année un grand nombre d'oiseaux, de lézards et de petits mammifères.",
        threat: "invasive",
      },
    ],
  },
  {
    label: "En voyage et en achetant",
    gestures: [
      {
        title: "Refuser les souvenirs sauvages",
        icon: Gem,
        description:
          "Corail, ivoire, écailles, coquillages rares : chaque achat entretient un commerce qui vide les populations.",
        threat: "exploitation",
      },
      {
        title: "Choisir du bois certifié",
        icon: TreeDeciduous,
        description:
          "Les labels FSC ou PEFC limitent le risque d'acheter du bois issu de coupes illégales.",
        threat: "habitat",
      },
    ],
  },
  {
    label: "À la maison",
    gestures: [
      {
        title: "Éteindre les lumières extérieures",
        icon: LightbulbOff,
        description:
          "L'éclairage nocturne désoriente les oiseaux migrateurs et piège d'innombrables insectes.",
        threat: "pollution",
      },
      {
        title: "Réduire son empreinte carbone",
        icon: Plane,
        description:
          "Moins d'avion, de voiture et de chauffage superflu ralentit le réchauffement qui bouscule les espèces.",
        threat: "climate",
      },
    ],
  },
  {
    label: "En participant",
    gestures: [
      {
        title: "Signaler ce que vous observez",
        icon: Camera,
        description:
          "Photographiez une espèce sur iNaturalist ou Vigie-Nature : vos données servent aux scientifiques. Une partie des photos de ce site vient d'ailleurs d'iNaturalist.",
        threat: null,
        featured: true,
        href: "https://www.inaturalist.org",
      },
      {
        title: "Soutenir une association",
        icon: HeartHandshake,
        description:
          "Adhérer ou donner à une association de protection de la nature finance le suivi et la protection des espèces sur le terrain.",
        threat: null,
      },
    ],
  },
];

const ALL_GESTURES: Gesture[] = DOMAINS.flatMap((domain) => [
  ...domain.gestures,
]);

const FEATURED_GESTURES = DOMAINS.flatMap((domain) =>
  domain.gestures
    .filter((gesture) => gesture.featured === true)
    .map((gesture) => ({ ...gesture, domain: domain.label })),
);

const GESTURES_PATH = "/agir";
export { DOMAINS, ALL_GESTURES, FEATURED_GESTURES, GESTURES_PATH };
