import { Link } from "react-router";
import { LegalPage, LegalSection, UPDATED_AT } from "../_components/index";

const Terms = () => {
  return (
    <LegalPage
      title="Conditions générales d'utilisation"
      lede="Les règles d'usage de ce site, ce qu'il garantit et ce qu'il ne garantit pas."
      updatedAt={UPDATED_AT}
    >
      <LegalSection title="Objet">
        <p>
          Ce site donne accès à une restitution en français des évaluations de
          la Liste rouge de l&apos;UICN. L&apos;utiliser vaut acceptation des
          présentes conditions.
        </p>
      </LegalSection>

      <LegalSection title="Accès au service">
        <p>
          L&apos;accès est gratuit et ne nécessite pas de compte. Le service est
          fourni <strong>en l&apos;état</strong>, sans garantie de disponibilité
          : il peut être interrompu pour maintenance, mise à jour ou en cas de
          défaillance technique, sans préavis ni indemnité.
        </p>
      </LegalSection>

      <LegalSection title="Compte utilisateur">
        <p>
          La création d&apos;un compte est facultative et ne sert qu&apos;à
          enregistrer des espèces en favoris.
        </p>
        <ul>
          <li>
            Vous vous engagez à fournir une adresse e-mail valide et à garder
            votre mot de passe confidentiel.
          </li>
          <li>
            Vous êtes responsable des actions effectuées depuis votre compte.
          </li>
          <li>
            Vous pouvez demander sa suppression à tout moment ; elle entraîne
            l&apos;effacement de vos favoris.
          </li>
          <li>
            Un compte servant à nuire au service ou à ses utilisateurs peut être
            suspendu sans préavis.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Usage acceptable">
        <p>Il est interdit de :</p>
        <ul>
          <li>
            tenter d&apos;accéder à des parties non publiques du site, ou
            d&apos;en perturber le fonctionnement ;
          </li>
          <li>
            procéder à une extraction massive et automatisée des données, le
            service étant dimensionné pour une consultation humaine ;
          </li>
          <li>
            réutiliser les contenus en méconnaissance des licences de leurs
            auteurs.
          </li>
        </ul>
        <p>
          Le nombre de requêtes par minute est limité par adresse. Ce plafond
          protège la disponibilité du service ; le contourner constitue un
          manquement aux présentes conditions.
        </p>
        <p>
          Les données scientifiques d&apos;origine sont disponibles directement
          auprès de l&apos;
          <a
            href="https://www.iucnredlist.org/"
            target="_blank"
            rel="noreferrer"
          >
            UICN
          </a>
          , qui met à disposition sa propre interface pour un usage de
          recherche.
        </p>
      </LegalSection>

      <LegalSection title="Exactitude des données">
        <p>
          Les évaluations affichées sont reprises de sources tierces sans
          modification de fond. Elles peuvent être{" "}
          <strong>incomplètes, partiellement enrichies ou décalées</strong> par
          rapport à la dernière version publiée par l&apos;UICN. Les
          photographies et descriptions proviennent de bases contributives et
          peuvent comporter des erreurs.
        </p>
        <p>
          Ce site ne constitue ni une source de référence scientifique, ni un
          avis réglementaire. Pour tout usage académique, juridique ou
          professionnel, référez-vous à l&apos;évaluation officielle, accessible
          depuis chaque fiche. Les limites de la méthode sont détaillées dans la{" "}
          <Link viewTransition to="/methodology">
            note méthodologique
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          Les licences applicables aux données et aux médias affichés sont
          listées dans les{" "}
          <Link viewTransition to="/mentions-legales">
            mentions légales
          </Link>
          . Leur réutilisation relève de la responsabilité de
          l&apos;utilisateur, dans le respect des conditions posées par chaque
          auteur.
        </p>
      </LegalSection>

      <LegalSection title="Données personnelles">
        <p>
          Le traitement de vos données est décrit dans la{" "}
          <Link viewTransition to="/confidentialite">
            politique de confidentialité
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="Évolution et droit applicable">
        <p>
          Ces conditions peuvent être modifiées ; la version en vigueur est
          celle publiée sur cette page, dont la date de mise à jour figure en
          tête. Elles sont soumises au droit français.
        </p>
      </LegalSection>
    </LegalPage>
  );
};

export default Terms;
