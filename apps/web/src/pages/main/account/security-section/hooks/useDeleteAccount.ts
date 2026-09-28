import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/useAuth";
import type { DeleteState } from "./entities";

export function useDeleteAccount(expectedPseudo: string) {
  const { deleteAccount } = useAuth();
  const navigate = useNavigate();

  const [state, setState] = useState<DeleteState>("idle");
  const [confirmPseudo, setConfirmPseudo] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const matches = confirmPseudo === expectedPseudo;

  const start = () => setState("confirming");

  const cancel = () => {
    setState("idle");
    setConfirmPseudo("");
    setError(null);
  };

  const updatePseudo = (value: string) => {
    setConfirmPseudo(value);
    setError(null);
  };

  const confirm = async () => {
    if (!matches) {
      setError("Le pseudonyme saisi ne correspond pas.");
      return;
    }

    setState("pending");

    try {
      await deleteAccount();
      void navigate("/", { replace: true });
    } catch {
      setError("La suppression a échoué. Réessaie.");
      setState("confirming");
    }
  };

  return {
    state,
    confirmPseudo,
    error,
    matches,
    start,
    cancel,
    confirm,
    updatePseudo,
  };
}
