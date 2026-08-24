import { useAuth } from "@/context/useAuth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { LogOut, Trash2 } from "lucide-react";
import type { SessionUser } from "@app/contracts";
import { useDeleteAccount } from "./hooks/useDeleteAccount";
import { DeleteAccountConfirm } from "./delete-account-confirm/DeleteAccountConfirm";

type Props = Readonly<{
  user: SessionUser;
}>;

const SecuritySection = ({ user }: Props) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const remove = useDeleteAccount(user.pseudo);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      void navigate("/", { replace: true });
    }
  };

  return (
    <section className="mb-16">
      <div className="mb-6 border-b border-[var(--color-paper-border)] pb-2.5">
        <h2 className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-[var(--color-ink)]">
          Sécurité & Session
        </h2>
      </div>

      <div className="space-y-6">
        <div className="border border-[var(--color-paper-border)] bg-transparent divide-y divide-[var(--color-paper-border)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 text-left gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <LogOut className="size-4 text-[var(--color-ink-muted)]" />
                <h3 className="font-serif text-base font-medium text-[var(--color-ink)]">
                  Déconnexion
                </h3>
              </div>
              <p className="text-xs text-[var(--color-ink-muted)] leading-relaxed">
                Fermer la session actuelle sur cet appareil.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => void handleLogout()}
              className="shrink-0 self-start text-xs sm:self-auto"
            >
              Se déconnecter
            </Button>
          </div>
        </div>

        <div className="border border-[var(--color-status-cr-border)] bg-[var(--color-status-cr-bg)]/30 p-5 text-left sm:p-6">
          <div className="mb-2 flex items-center gap-2">
            <Trash2
              className="size-4 text-[var(--color-status-cr)]"
              aria-hidden="true"
            />
            <h3 className="font-serif text-base font-medium text-[var(--color-status-cr)]">
              Suppression définitive du compte
            </h3>
          </div>

          <p className="mb-4 max-w-2xl text-xs leading-relaxed text-[var(--color-ink-muted)]">
            Cette action est irréversible. Les espèces que tu suis et toutes les
            données associées à ton compte seront effacées.
          </p>

          {remove.state === "idle" ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={remove.start}
              className="text-xs"
            >
              Supprimer mon compte
            </Button>
          ) : (
            <DeleteAccountConfirm
              pseudo={user.pseudo}
              value={remove.confirmPseudo}
              error={remove.error}
              matches={remove.matches}
              isPending={remove.state === "pending"}
              onChange={remove.updatePseudo}
              onConfirm={() => void remove.confirm()}
              onCancel={remove.cancel}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export { SecuritySection };
