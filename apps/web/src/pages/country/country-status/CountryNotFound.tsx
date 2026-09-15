import { Link } from "react-router";

type Props = Readonly<{
  code: string;
}>;

const CountryNotFound = ({ code }: Props) => {
  return (
    <div className="py-16 text-center md:py-24">
      <h1 className="mb-4 font-serif text-3xl font-medium tracking-tight text-[var(--color-ink)]">
        Territoire inconnu
      </h1>
      <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-[var(--color-ink-muted)]">
        {code === ""
          ? "Aucun code pays n'a été fourni."
          : `« ${code} » ne correspond à aucun code pays reconnu.`}
      </p>
      <Link
        viewTransition
        to="/atlas"
        className="inline-flex items-center border border-[var(--color-paper-border-strong)] bg-[var(--color-paper-card)] px-4 py-2 text-xs font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-paper-muted)]"
      >
        Choisir un pays sur le globe
      </Link>
    </div>
  );
};

export { CountryNotFound };
