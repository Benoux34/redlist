import { useState } from "react";
import { forgotPasswordRequest } from "@/api/auth";
import { ApiError } from "@/api/client";
import type { ResetLinkState } from "./entities";

export function useResetPasswordLink(email: string) {
  const [state, setState] = useState<ResetLinkState>("idle");
  const [error, setError] = useState<string | null>(null);

  const send = async () => {
    setState("pending");
    setError(null);

    try {
      await forgotPasswordRequest({ email });
      setState("sent");
    } catch (caught) {
      setError(
        caught instanceof ApiError && caught.code === "RATE_LIMITED"
          ? "Trop de demandes. Réessaie dans une heure."
          : "L'envoi a échoué. Réessaie.",
      );
      setState("idle");
    }
  };

  return { state, error, send };
}
