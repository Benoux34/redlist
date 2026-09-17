import { Link } from "react-router";
import { LegalPage, LegalSection, UPDATED_AT } from "../_components/index";

const Privacy = () => {
  return (
    <LegalPage
      title="Politique de confidentialité"
      lede="Ce site collecte le strict nécessaire à son fonctionnement. Cette page détaille quelles données, pourquoi, combien de temps, et comment les faire supprimer."
      updatedAt={UPDATED_AT}
    >
      <LegalSection title="Responsable du traitement">
        <p>Antunes Benoit, benoitantunes34130@gmail.com</p>
        <p>
          Toute question relative à vos données peut être adressée à cette
          adresse.
        </p>
      </LegalSection>

      <LegalSection title="Ce qui est collecté">
        <p>
          <strong>Sans compte, rien n&apos;est collecté.</strong> La
          consultation des espèces ne nécessite aucune inscription et ne crée
          aucun enregistrement vous concernant.
        </p>
        <p>À la création d&apos;un compte, sont enregistrés :</p>
        <ul>
          <li>
            <strong>un pseudonyme</strong> et{" "}
            <strong>une adresse e-mail</strong> — pour identifier le compte ;
          </li>
          <li>
            <strong>une empreinte de votre mot de passe</strong> — le mot de
            passe lui-même n&apos;est jamais enregistré ni lisible ;
          </li>
          <li>
            <strong>les espèces que vous suivez</strong>, avec leur date
            d&apos;ajout ;
          </li>
          <li>
            <strong>vos sessions de connexion</strong> : une empreinte du jeton,
            sa date d&apos;expiration, sa date de dernière utilisation et le nom
            du navigateur utilisé.
          </li>
        </ul>
        <p>
          Votre adresse IP est lue à chaque requête pour limiter le nombre
          d&apos;appels par minute et protéger le service des abus. Elle est
          conservée en mémoire vive pendant quelques minutes au maximum et{" "}
          <strong>n&apos;est jamais enregistrée en base de données</strong>.
        </p>
      </LegalSection>

      <LegalSection title="Bases légales">
        <ul>
          <li>
            <strong>Compte et espèces suivies</strong> — exécution du service
            que vous demandez en vous inscrivant (article 6.1.b du RGPD).
          </li>
          <li>
            <strong>Limitation du nombre de requêtes</strong> — intérêt légitime
            à maintenir le service disponible (article 6.1.f).
          </li>
          <li>
            <strong>Mesure d&apos;audience</strong> — intérêt légitime, le
            dispositif retenu ne permettant pas de vous identifier.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Cookies et mesure d'audience">
        <p>
          Ce site dépose <strong>un seul cookie</strong>, nommé{" "}
          <code>session</code>, et uniquement si vous vous connectez. Il
          contient un jeton de session, expire automatiquement, et n&apos;est
          lisible ni par des scripts ni par des tiers. Il est strictement
          nécessaire au fonctionnement du service : à ce titre, il ne requiert
          pas votre consentement préalable.
        </p>
        <p>
          La fréquentation est mesurée avec <strong>Umami</strong>, un outil qui{" "}
          <strong>ne dépose aucun cookie</strong> et ne construit aucun profil.
          Sont transmis la page consultée, son titre, la page de provenance, la
          taille de l&apos;écran et la langue du navigateur. Aucune de ces
          informations ne permet de vous identifier, et il n&apos;est pas
          possible de vous suivre d&apos;une journée à l&apos;autre.
        </p>
        <p>
          C&apos;est pourquoi ce site n&apos;affiche{" "}
          <strong>aucune bannière de consentement</strong> : il n&apos;a rien à
          vous demander.
        </p>
      </LegalSection>

      <LegalSection title="Durées de conservation">
        <ul>
          <li>
            <strong>Compte et espèces suivies</strong> — jusqu&apos;à ce que
            vous demandiez la suppression du compte.
          </li>
          <li>
            <strong>Sessions</strong> — supprimées automatiquement à leur
            expiration, une purge s&apos;exécutant toutes les heures.
          </li>
          <li>
            <strong>Mesure d&apos;audience</strong> — statistiques agrégées,
            sans donnée individuelle.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Destinataires">
        <p>
          Aucune donnée n&apos;est vendue, louée ou cédée. Elles sont hébergées
          en France, sur un serveur loué à <strong>OVH SAS</strong>, et ne sont
          accessibles qu&apos;à l&apos;éditeur du site.
        </p>
        <p>
          Les statistiques de fréquentation sont traitées par{" "}
          <a href="https://umami.is" target="_blank" rel="noreferrer">
            Umami
          </a>
          . Les photographies affichées sont chargées depuis Wikimedia Commons
          et iNaturalist, et les fonds de carte depuis les serveurs d&apos;Esri
          : ces services reçoivent donc votre adresse IP, comme tout site que
          votre navigateur contacte.
        </p>
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>
          Vous disposez d&apos;un droit d&apos;accès, de rectification,
          d&apos;effacement, de portabilité, de limitation et d&apos;opposition
          sur vos données. Pour les exercer, écrivez à l&apos;adresse indiquée
          en haut de cette page ; une réponse vous sera apportée dans un délai
          d&apos;un mois.
        </p>
        <p>
          Vous pouvez également introduire une réclamation auprès de la{" "}
          <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">
            CNIL
          </a>
          , autorité de contrôle française.
        </p>
      </LegalSection>

      <LegalSection title="Sécurité">
        <p>
          Les échanges sont chiffrés de bout en bout par HTTPS. Les mots de
          passe ne sont conservés que sous forme d&apos;empreinte. La base de
          données n&apos;est joignable depuis aucun réseau public, et les
          sauvegardes sont conservées sur le serveur lui-même.
        </p>
        <p>
          Les conditions d&apos;utilisation du service sont détaillées dans les{" "}
          <Link viewTransition to="/cgu">
            conditions générales
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
};

export default Privacy;
