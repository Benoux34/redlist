import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = Readonly<{
  pseudo: string;
  value: string;
  error: string | null;
  matches: boolean;
  isPending: boolean;
  onChange: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}>;

const DeleteAccountConfirm = ({
  pseudo,
  value,
  error,
  matches,
  isPending,
  onChange,
  onConfirm,
  onCancel,
}: Props) => (
  <div className="mt-3 w-full border border-[var(--color-status-cr-border)] bg-[var(--color-paper)] p-4 sm:p-5">
    <div className="mb-3 flex items-center gap-2 text-xs font-medium text-[var(--color-status-cr)]">
      <AlertTriangle className="size-4 shrink-0" aria-hidden="true" />
      <span>Confirmation requise</span>
    </div>

    <label
      htmlFor="delete-confirm"
      className="mb-3 block text-xs text-[var(--color-ink-muted)]"
    >
      Saisis ton pseudonyme{" "}
      <strong className="text-[var(--color-ink)]">{pseudo}</strong> pour
      confirmer la suppression définitive.
    </label>

    <Input
      id="delete-confirm"
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={pseudo}
      autoComplete="off"
      aria-invalid={error !== null}
      aria-describedby={error !== null ? "delete-error" : undefined}
      className="mb-3 text-xs"
    />

    {error !== null && (
      <p
        id="delete-error"
        role="alert"
        className="mb-3 text-xs text-[var(--color-status-cr)]"
      >
        {error}
      </p>
    )}

    <div className="flex items-center gap-3">
      <Button
        variant="destructive"
        size="sm"
        onClick={onConfirm}
        disabled={!matches || isPending}
        className="text-xs"
      >
        {isPending ? "Suppression…" : "Confirmer la suppression"}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onCancel}
        disabled={isPending}
        className="text-xs"
      >
        Annuler
      </Button>
    </div>
  </div>
);

export { DeleteAccountConfirm };
