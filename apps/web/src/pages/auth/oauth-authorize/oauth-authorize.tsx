import { useCallback, useState } from "react";
import { Navigate, useLocation, useSearchParams } from "react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/loading/Loading";
import { useAuth } from "@/context/useAuth";
import { useAsyncData } from "@/hooks/use-async-data/useAsyncData";
import { usePageMeta } from "@/hooks/use-page-meta/usePageMeta";
import {
  authorizationDecisionRequest,
  authorizationRequest,
} from "@/api/oauth";
import { CARD_CLASS } from "./utils";

const OAuthAuthorize = () => {
  usePageMeta({
    title: "Autoriser une application",
    description: "Autoriser une application à accéder à votre compte Redlist.",
    noindex: true,
  });

  const { status, user } = useAuth();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);

  const load = useCallback(
    () => authorizationRequest(location.search),
    [location.search],
  );
  const request = useAsyncData(load, [location.search]);

  if (status === "anonymous")
    return <Navigate to="/login" state={{ from: location }} replace />;

  if (status === "loading" || request.status === "loading")
    return (
      <Loading label="Vérification de la demande…" minHeight="min-h-[40vh]" />
    );

  if (request.status === "error")
    return (
      <div role="alert" className={CARD_CLASS}>
        <h1 className="mb-2 font-serif text-3xl font-medium tracking-tight text-[var(--color-ink)]">
          Demande invalide
        </h1>
        <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">
          Cette demande d&apos;autorisation n&apos;est pas valide. Relancez la
          connexion depuis l&apos;application qui vous a envoyé ici.
        </p>
      </div>
    );

  const clientName = request.data.client_name;

  const decide = async (approve: boolean) => {
    setIsSubmitting(true);
    setFailed(false);

    try {
      const { redirect_to } = await authorizationDecisionRequest(
        Object.fromEntries(searchParams),
        approve,
      );
      window.location.assign(redirect_to);
    } catch {
      setFailed(true);
      setIsSubmitting(false);
    }
  };

  return (
    <div className={CARD_CLASS}>
      <h1 className="mb-2 font-serif text-3xl font-medium tracking-tight text-[var(--color-ink)]">
        Autoriser {clientName} ?
      </h1>

      <p className="mb-6 text-sm leading-relaxed text-[var(--color-ink-muted)]">
        <span className="font-medium text-[var(--color-ink)]">
          {clientName}
        </span>{" "}
        souhaite accéder à votre compte Redlist.
      </p>

      <div className="mb-6 border border-[var(--color-paper-border)] bg-[var(--color-paper-muted)]/40 p-5 text-sm">
        <p className="mb-3 text-[var(--color-ink)]">
          Cette application pourra :
        </p>
        <p className="flex items-center gap-2 text-[var(--color-ink)]">
          <Check
            className="size-4 text-[var(--color-status-cr)]"
            aria-hidden="true"
          />
          Lire la liste de vos espèces suivies
        </p>
        <p className="mt-3 text-xs leading-relaxed text-[var(--color-ink-muted)]">
          Elle ne pourra ni modifier vos favoris, ni voir votre adresse
          électronique ou votre mot de passe.
        </p>
      </div>

      <p className="mb-6 text-xs text-[var(--color-ink-muted)]">
        Connecté en tant que{" "}
        <span className="font-medium text-[var(--color-ink)]">
          {user?.pseudo}
        </span>
      </p>

      {failed && (
        <p role="alert" className="mb-4 text-sm text-[var(--color-status-cr)]">
          La réponse n&apos;a pas pu être envoyée. Réessayez.
        </p>
      )}

      <div className="flex gap-3">
        <Button
          onClick={() => void decide(true)}
          disabled={isSubmitting}
          className="h-11 flex-1 text-sm font-medium"
        >
          Autoriser
        </Button>
        <Button
          variant="outline"
          onClick={() => void decide(false)}
          disabled={isSubmitting}
          className="h-11 flex-1 text-sm font-medium"
        >
          Refuser
        </Button>
      </div>
    </div>
  );
};

export default OAuthAuthorize;
