type Props = Readonly<{
  letter: string;
  totalCount: number | undefined;
}>;

const AlphabetHero = ({ letter, totalCount }: Props) => {
  return (
    <section className="mb-6">
      <h1 className="font-serif text-4xl font-medium tracking-tight text-[var(--color-ink)] md:text-5xl mb-3">
        Lettre {letter}
      </h1>

      <p className="text-base sm:text-lg leading-relaxed text-[var(--color-ink-muted)]">
        Répertoire exhaustif des espèces dont le nom scientifique débute par la
        lettre{" "}
        <strong className="font-serif text-[var(--color-ink)] font-normal">
          {letter}
        </strong>
        .
      </p>
    </section>
  );
};

export { AlphabetHero };
