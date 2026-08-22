const PresumedExtinctHero = () => {
  return (
    <section className="mb-12">
      <h1 className="font-serif text-4xl font-medium tracking-tight text-[var(--color-ink)] md:text-5xl mb-4">
        Espèces présumées éteintes
      </h1>

      <div className="max-w-4xl text-base sm:text-lg leading-relaxed text-[var(--color-ink-muted)]">
        <p className="mb-3">
          Plus d&apos;un millier d&apos;espèces sont encore officiellement
          inscrites comme menacées sur la Liste Rouge, alors même que les
          scientifiques de terrain estiment qu&apos;elles ont très probablement
          déjà disparu.
        </p>

        <p className="mb-3">
          Aucune observation récente n&apos;est venue confirmer leur survie, et
          aucune preuve définitive n&apos;a encore permis d&apos;attester
          formellement leur extinction. Tant que cette disparition n&apos;est
          pas prouvée par des inventaires exhaustifs, l&apos;UICN maintient leur
          statut d&apos;alerte.
        </p>

        <p className="mb-0">
          Cette page rassemble ces existences suspendues dans l&apos;incertitude
          — ni confirmées vivantes, ni déclarées disparues.
        </p>
      </div>
    </section>
  );
};

export { PresumedExtinctHero };
