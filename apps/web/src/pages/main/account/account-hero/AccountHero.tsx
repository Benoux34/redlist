type Props = Readonly<{
  pseudo: string;
}>;

const AccountHero = ({ pseudo }: Props) => {
  return (
    <section className="mb-12 text-left">
      <h1 className="font-serif text-4xl font-medium tracking-tight text-[var(--color-ink)] md:text-5xl mb-2">
        Bienvenue, {pseudo}
      </h1>

      <p className="text-base sm:text-lg leading-relaxed text-[var(--color-ink-muted)] max-w-3xl">
        Suivez l&apos;évolution des espèces menacées au rythme des réévaluations
        scientifiques de la Liste Rouge mondiale.
      </p>
    </section>
  );
};

export { AccountHero };
