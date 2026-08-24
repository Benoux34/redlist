import { ExternalLink } from "lucide-react";
import type { RedListVersion } from "@app/contracts";

type Props = Readonly<{
  version: RedListVersion | null;
}>;

const MethodologyContent = ({ version }: Props) => {
  const versionString = version?.redListVersion ?? "2024-2";

  return (
    <article className="text-left text-sm sm:text-base leading-relaxed text-[var(--color-ink)] space-y-12">
      <section className="space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[var(--color-ink)] border-b border-[var(--color-paper-border)] pb-2">
          1. Provenance des données
        </h2>
        <p>
          Les données présentées sur ce site sont compilées à partir de trois
          sources publiques ouvertes et spécialisées :
        </p>
        <ul className="list-disc pl-5 space-y-2 text-[var(--color-ink-muted)]">
          <li>
            <strong className="text-[var(--color-ink)]">
              La Liste Rouge de l&apos;UICN (Union Internationale pour la
              Conservation de la Nature)
            </strong>{" "}
            : l&apos;intégralité des statuts de menace, critères
            d&apos;évaluation, tendances démographiques, menaces inventoriées,
            habitats et mesures de conservation provient de l&apos;API
            officielle de l&apos;UICN.
          </li>
          <li>
            <strong className="text-[var(--color-ink)]">
              iNaturalist et Wikimedia Commons / Wikipédia
            </strong>{" "}
            : les photographies d&apos;illustration (publiées sous licences
            Creative Commons ou dans le domaine public) ainsi que les noms
            vernaculaires français couramment admis.
          </li>
          <li>
            <strong className="text-[var(--color-ink)]">Natural Earth</strong> :
            les tracés vectoriels des frontières utilisés pour situer les
            présences nationales des taxons.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[var(--color-ink)] border-b border-[var(--color-paper-border)] pb-2">
          2. Périmètre du corpus
        </h2>
        <p>
          Ce site se concentre délibérément sur les catégories décrivant un
          risque d&apos;extinction caractérisé ou une disparition confirmée :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
          <div className="border border-[var(--color-paper-border)] p-3 bg-[var(--color-paper-muted)]/20">
            <span className="font-mono font-medium text-xs text-[var(--color-ink)]">
              EX • Éteint
            </span>
            <p className="text-xs text-[var(--color-ink-muted)] mt-1">
              Disparition totale et définitive de l&apos;espèce.
            </p>
          </div>
          <div className="border border-[var(--color-paper-border)] p-3 bg-[var(--color-paper-muted)]/20">
            <span className="font-mono font-medium text-xs text-[var(--color-status-ew)]">
              EW • Éteint à l&apos;état sauvage
            </span>
            <p className="text-xs text-[var(--color-ink-muted)] mt-1">
              Survit uniquement en captivité ou culture contrôlée.
            </p>
          </div>
          <div className="border border-[var(--color-paper-border)] p-3 bg-[var(--color-paper-muted)]/20">
            <span className="font-mono font-medium text-xs text-[var(--color-status-cr)]">
              CR • En danger critique
            </span>
            <p className="text-xs text-[var(--color-ink-muted)] mt-1">
              Risque d&apos;extinction imminent dans la nature.
            </p>
          </div>
          <div className="border border-[var(--color-paper-border)] p-3 bg-[var(--color-paper-muted)]/20">
            <span className="font-mono font-medium text-xs text-[var(--color-status-en)]">
              EN • En danger
            </span>
            <p className="text-xs text-[var(--color-ink-muted)] mt-1">
              Risque très élevé d&apos;extinction à court terme.
            </p>
          </div>
          <div className="border border-[var(--color-paper-border)] p-3 bg-[var(--color-paper-muted)]/20 sm:col-span-2">
            <span className="font-mono font-medium text-xs text-[var(--color-status-vu)]">
              VU • Vulnérable
            </span>
            <p className="text-xs text-[var(--color-ink-muted)] mt-1">
              Risque élevé d&apos;extinction à moyen terme.
            </p>
          </div>
        </div>
        <p className="text-sm text-[var(--color-ink-muted)]">
          Les catégories <strong className="text-[var(--color-ink)]">LC</strong>{" "}
          (Préoccupation mineure / <em>Least Concern</em>),{" "}
          <strong className="text-[var(--color-ink)]">NT</strong> (Quasi menacé
          / <em>Near Threatened</em>) et{" "}
          <strong className="text-[var(--color-ink)]">DD</strong> (Données
          insuffisantes / <em>Data Deficient</em>) ne sont pas incluses.
          L&apos;absence d&apos;une espèce commune sur ce site n&apos;est donc
          pas une anomalie technique, mais le reflet de ce choix de périmètre.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[var(--color-ink)] border-b border-[var(--color-paper-border)] pb-2">
          3. Ce que le site ne dit pas
        </h2>

        <div className="border-l-2 border-[var(--color-status-cr)] pl-4 py-1 space-y-2">
          <h3 className="font-serif text-lg font-medium text-[var(--color-ink)]">
            Évaluations mondiales versus évaluations nationales
          </h3>
          <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">
            Les statuts restitués ici sont des{" "}
            <strong className="text-[var(--color-ink)]">
              évaluations globales
            </strong>
            . Une espèce peut être en danger critique d&apos;extinction à
            l&apos;échelle de la planète tout en maintenant des effectifs locaux
            stables dans un pays donné — ou à l&apos;inverse, être très menacée
            sur le territoire français tout en demeurant abondante ailleurs dans
            le monde.
          </p>
          <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">
            Il existe des Listes Rouges nationales et régionales distinctes
            (notamment celle élaborée par le Comité français de l&apos;UICN et
            le Muséum national d&apos;Histoire naturelle), qui répondent à des
            méthodologies d&apos;échelle territoriale propre.
          </p>
        </div>

        <div className="border-l-2 border-[var(--color-paper-border-strong)] pl-4 py-1 space-y-2">
          <h3 className="font-serif text-lg font-medium text-[var(--color-ink)]">
            Représentation cartographique
          </h3>
          <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">
            Sur les fiches détaillées, la carte de présence colore
            l&apos;intégralité du contour politique des pays d&apos;occurrence.
            L&apos;aire de répartition réelle d&apos;une espèce
            (micro-endémisme, bassin versant, altitude spécifique) est presque
            toujours infiniment plus localisée que les frontières
            administratives de l&apos;État qui l&apos;abrite.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[var(--color-ink)] border-b border-[var(--color-paper-border)] pb-2">
          4. Données lacunaires et couverture du vivant
        </h2>
        <p>
          Une proportion notable des espèces répertoriées ne comporte aucune
          photographie, aucun nom vernaculaire en français, ni description
          détaillée.
        </p>
        <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">
          Il s&apos;agit pour l&apos;essentiel de mollusques dulcicoles, de
          bryophytes, d&apos;invertébrés ou de plantes micro-endémiques que
          personne n&apos;a encore pu photographier sous licence libre ou
          documenter en langue française.
        </p>
        <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">
          Ce vide n&apos;est pas un manquement de l&apos;interface : il
          constitue une{" "}
          <strong className="text-[var(--color-ink)]">
            information scientifique brute
          </strong>{" "}
          sur l&apos;état réel de nos connaissances, témoignant du fossé
          d&apos;attention documentaire entre les grands vertébrés emblématiques
          et l&apos;immense majorité des espèces en voie de disparition.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[var(--color-ink)] border-b border-[var(--color-paper-border)] pb-2">
          5. Traitement des textes & traductions
        </h2>
        <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">
          <strong className="text-[var(--color-ink)]">
            Descriptions d&apos;évaluation
          </strong>{" "}
          : les synthèses textuelles rédigées par les évaluateurs de l&apos;UICN
          sont publiées en anglais, leur langue de rédaction d&apos;origine.
          Elles ne font l&apos;objet d&apos;aucune traduction automatique par
          machine, afin de préserver rigoureusement l&apos;exactitude des termes
          biologiques et d&apos;éviter toute dénaturation d&apos;un travail
          scientifique révisé par les pairs.
        </p>
        <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">
          <strong className="text-[var(--color-ink)]">
            Vocabulaire contrôlé et taxonomies
          </strong>{" "}
          : les catégories de statut, les codes de menaces, les types
          d&apos;habitats et les systèmes écologiques sont traduits à partir de
          leurs{" "}
          <strong className="text-[var(--color-ink)]">codes stables</strong>{" "}
          (ex: <code>CR</code>, <code>2.1.2</code>), et non à partir des
          libellés textuels anglophones qui peuvent varier d&apos;une version à
          l&apos;autre.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[var(--color-ink)] border-b border-[var(--color-paper-border)] pb-2">
          6. Citation formelle & crédits
        </h2>
        <p>
          Toute réutilisation des données d&apos;évaluation doit mentionner la
          citation officielle de l&apos;UICN :
        </p>
        <div className="border border-[var(--color-paper-border)] bg-[var(--color-paper-muted)]/40 p-4 sm:p-5 font-mono text-xs text-[var(--color-ink)] leading-relaxed">
          IUCN. ({new Date().getFullYear()}).{" "}
          <em>The IUCN Red List of Threatened Species</em>. Version{" "}
          {versionString}. &lt;https://www.iucnredlist.org&gt;.
        </div>
        <p className="text-xs text-[var(--color-ink-muted)]">
          Chaque fiche d&apos;espèce renvoie directement vers son enregistrement
          officiel sur le portail de l&apos;UICN, où figurent la citation
          complète, les évaluateurs et les relecteurs. Les photographies
          demeurent la propriété exclusive de leurs auteurs respectifs, sous les
          licences indiquées sous chaque visuel.
        </p>

        <div className="pt-4">
          <a
            href="https://www.iucnredlist.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[var(--color-ink)] bg-[var(--color-ink)] px-4 py-2 text-xs font-medium text-[var(--color-paper)] transition-opacity hover:opacity-90"
          >
            <span>Accéder au portail officiel de l&apos;UICN</span>
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </section>
    </article>
  );
};

export { MethodologyContent };
