import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "@/context/useAuth";
import {
  addFavoriteRequest,
  favoriteStateRequest,
  removeFavoriteRequest,
} from "@/api/favorite";
import { Bookmark, BookmarkCheck } from "lucide-react";

type Props = Readonly<{
  assessmentId: number;
  initialIsFavorite?: boolean;
}>;

const FavoriteButton = ({ assessmentId, initialIsFavorite = false }: Props) => {
  const { status } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isFavorite, setIsFavorite] = useState<boolean>(initialIsFavorite);
  const [isPending, setIsPending] = useState<boolean>(false);

  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    let cancelled = false;

    if (isAuthenticated)
      favoriteStateRequest(assessmentId)
        .then((res) => {
          if (!cancelled) setIsFavorite(res.isFavorite);
        })
        .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [assessmentId, isAuthenticated]);

  const toggle = async () => {
    if (!isAuthenticated) {
      void navigate("/login", { state: { from: location } });
      return;
    }

    setIsPending(true);
    const next = !isFavorite;
    setIsFavorite(next);

    try {
      await (next
        ? addFavoriteRequest(assessmentId)
        : removeFavoriteRequest(assessmentId));
    } catch {
      setIsFavorite(!next);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      type="button"
      onClick={() => void toggle()}
      disabled={isPending}
      aria-pressed={isFavorite}
      className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
        isFavorite
          ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]"
          : "border-[var(--color-paper-border)] bg-transparent text-[var(--color-ink-muted)] hover:border-[var(--color-paper-border-strong)] hover:text-[var(--color-ink)]"
      }`}
    >
      {isFavorite ? (
        <>
          <BookmarkCheck className="size-3.5" />
          <span>Espèce suivie</span>
        </>
      ) : (
        <>
          <Bookmark className="size-3.5" />
          <span>Suivre cette espèce</span>
        </>
      )}
    </button>
  );
};

export { FavoriteButton };
