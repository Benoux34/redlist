type Props = Readonly<{
  totalCount: number | undefined;
}>;

const FranceHero = ({ totalCount }: Props) => {
  return (
    <section className="mb-12">
      <h1 className="font-serif text-4xl font-medium tracking-tight text-[var(--color-ink)] md:text-5xl mb-4">
        Espèces menacées en France
      </h1>

      <div className="max-w-4xl text-base sm:text-lg leading-relaxed text-[var(--color-ink-muted)]">
        <p className="mb-3">
          Cette sélection rassemble l&apos;ensemble des espèces recensées sur le
          territoire français qui font l&apos;objet d&apos;un classement de
          menace dans la base de données internationale de l&apos;UICN.
        </p>

        <p className="mb-3">
          Il s&apos;agit ici d&apos;évaluations globales et non de la Liste
          Rouge nationale (élaborée par le Comité français de l&apos;UICN et le
          MNHN). Une espèce peut ainsi être en danger critique d&apos;extinction
          à l&apos;échelle planétaire tout en conservant une population locale
          en France, ou inversement.
        </p>

        <p className="mb-0">
          Ce recensement correspond au code territorial métropolitain (FR). Les
          départements et collectivités d&apos;outre-mer — où réside la majeure
          partie de la biodiversité française — font pour l&apos;essentiel
          l&apos;objet de codes et inventaires géographiques distincts.
        </p>
      </div>
    </section>
  );
};

export { FranceHero };
