import type { SessionUser } from "@app/contracts";

type Props = Readonly<{
  user: SessionUser;
}>;

const IdentitySection = ({ user }: Props) => {
  const memberSince = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(user.createdAt));

  return (
    <section className="mb-16">
      <div className="mb-6 border-b border-[var(--color-paper-border)] pb-2.5">
        <h2 className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-[var(--color-ink)]">
          Informations du compte
        </h2>
      </div>

      <div className="border border-[var(--color-paper-border)] bg-transparent divide-y divide-[var(--color-paper-border)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 text-sm">
          <span className="text-xs uppercase tracking-wider text-[var(--color-ink-muted)] mb-1 sm:mb-0">
            Pseudonyme
          </span>
          <span className="font-medium text-[var(--color-ink)]">
            {user.pseudo}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 text-sm">
          <span className="text-xs uppercase tracking-wider text-[var(--color-ink-muted)] mb-1 sm:mb-0">
            Adresse électronique
          </span>
          <span className="font-medium text-[var(--color-ink)]">
            {user.email}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 text-sm">
          <span className="text-xs uppercase tracking-wider text-[var(--color-ink-muted)] mb-1 sm:mb-0">
            Membre depuis le
          </span>
          <span className="text-[var(--color-ink-muted)]">
            {memberSince}
          </span>
        </div>
      </div>
    </section>
  );
};

export { IdentitySection };
