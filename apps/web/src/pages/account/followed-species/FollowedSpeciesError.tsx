type Props = Readonly<{
  reload: () => void;
}>;

const FollowedSpeciesError = ({ reload }: Props) => {
  return (
    <section className="mb-14">
      <div className="border border-[var(--color-status-cr-border)] bg-[var(--color-status-cr-bg)] p-6 text-left">
        <p className="text-sm font-medium text-[var(--color-status-cr)] mb-2">
          Impossible de charger vos espèces suivies.
        </p>
        <button
          type="button"
          onClick={reload}
          className="text-xs text-[var(--color-ink)] underline hover:opacity-80"
        >
          Réessayer
        </button>
      </div>
    </section>
  );
};

export { FollowedSpeciesError };
