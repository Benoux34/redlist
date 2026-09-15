import { Link } from "react-router";
import {
  LegalPage,
  LegalSection,
  LegalField,
  UPDATED_AT,
} from "@/components/legal";

const LegalNotice = () => {
  return (
    <LegalPage
      title="Mentions légales"
      lede="Informations relatives à l'éditeur et à l'hébergeur de ce site, conformément à la loi pour la confiance dans l'économie numérique."
      updatedAt={UPDATED_AT}
    >
      <LegalSection title="Éditeur du site">
        <dl>
          <LegalField label="Éditeur">Antunes Benoit</LegalField>
          <LegalField label="Contact">benoitantunes34130@gmail.com</LegalField>
          <LegalField label="Directeur de publication">
            Antunes Benoit
          </LegalField>
        </dl>
        <p>
          Ce site est un projet indépendant, sans finalité commerciale. Il ne
          vend aucun produit ni service et ne diffuse aucune publicité.
        </p>
      </LegalSection>

      <LegalSection title="Hébergement">
        <dl>
          <LegalField label="Hébergeur">OVH SAS</LegalField>
          <LegalField label="Adresse">
            2 rue Kellermann, 59100 Roubaix, France
          </LegalField>
          <LegalField label="Téléphone">1007</LegalField>
          <LegalField label="Site">
            <a href="https://www.ovhcloud.com" target="_blank" rel="noreferrer">
              ovhcloud.com
            </a>
          </LegalField>
        </dl>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle et sources">
        <p>
          La structure du site, ses textes de présentation et son code source
          relèvent de la responsabilité de l&apos;éditeur. Les données
          scientifiques et les médias affichés proviennent de tiers et demeurent
          soumis à leurs licences respectives.
        </p>
        <ul>
          <li>
            <strong>Évaluations de conservation</strong> — Liste rouge de
            l&apos;UICN des espèces menacées, via son{" "}
            <a
              href="https://www.iucnredlist.org/"
              target="_blank"
              rel="noreferrer"
            >
              portail officiel
            </a>
            . Chaque fiche renvoie à l&apos;évaluation d&apos;origine.
          </li>
          <li>
            <strong>Classification taxonomique</strong> —{" "}
            <a href="https://www.gbif.org" target="_blank" rel="noreferrer">
              GBIF
            </a>
            , Global Biodiversity Information Facility.
          </li>
          <li>
            <strong>Descriptions</strong> — Wikipédia en français, sous licence
            Creative Commons BY-SA.
          </li>
          <li>
            <strong>Photographies</strong> — Wikimedia Commons et iNaturalist.
            Elles ne sont pas hébergées par ce site : elles sont affichées
            depuis leurs serveurs d&apos;origine, et chaque fiche indique leur
            auteur et leur licence.
          </li>
          <li>
            <strong>Fonds cartographique</strong> — Esri, HERE, Garmin et les
            contributeurs d&apos;OpenStreetMap.
          </li>
        </ul>
        <p>
          Toute demande relative à un contenu affiché peut être adressée à
          l&apos;éditeur, qui procédera au retrait si la demande est fondée. Les
          choix de sélection et de restitution des données sont décrits dans la{" "}
          <Link viewTransition to="/methodology">
            note méthodologique
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="Responsabilité">
        <p>
          Les informations présentées sont issues de bases scientifiques tierces
          et reproduites sans modification de fond. Elles peuvent être
          incomplètes ou décalées par rapport à la dernière version publiée par
          l&apos;UICN. <strong>Ce site ne se substitue pas</strong> à
          l&apos;évaluation officielle, qui fait seule référence.
        </p>
      </LegalSection>
    </LegalPage>
  );
};

export default LegalNotice;
