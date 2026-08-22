import { Link } from "react-router";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type Props = Readonly<{
  activeLetter: string;
}>;

const AlphabetNav = ({ activeLetter }: Props) => {
  return (
    <nav
      aria-label="Navigation alphabétique"
      className="mb-8 border-y border-[var(--color-paper-border)] py-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-1 sm:gap-1.5">
        {LETTERS.map((letter) => {
          const isActive = letter === activeLetter;

          return (
            <Link
              key={letter}
              to={`/especes/${letter.toLowerCase()}`}
              aria-current={isActive ? "page" : undefined}
              className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center font-serif text-sm transition-colors ${
                isActive
                  ? "border border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)] font-semibold shadow-xs"
                  : "border border-[var(--color-paper-border)] text-[var(--color-ink-muted)] hover:border-[var(--color-paper-border-strong)] hover:bg-[var(--color-paper-muted)]/70 hover:text-[var(--color-ink)]"
              }`}
            >
              {letter}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export { AlphabetNav };
