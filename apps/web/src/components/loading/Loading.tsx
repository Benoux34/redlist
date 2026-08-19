import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = Readonly<{
  label?: string;
  size?: "sm" | "default" | "lg";
  className?: string;
  minHeight?: string;
  inline?: boolean;
}>;

const Loading = ({
  label = "Chargement des données...",
  size = "default",
  className,
  minHeight = "min-h-[260px]",
  inline = false,
}: Props) => {
  if (inline)
    return (
      <span
        role="status"
        aria-live="polite"
        className={cn(
          "inline-flex items-center gap-2 text-xs text-[var(--color-ink-muted)]",
          className,
        )}
      >
        <Loader2 className="size-3.5 animate-spin text-[var(--color-ink-muted)]" />
        {label && <span className="font-serif italic">{label}</span>}
      </span>
    );

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center border border-[var(--color-paper-border)] bg-[var(--color-paper-muted)]/15 p-8 text-center transition-opacity",
        minHeight,
        className,
      )}
    >
      <div className="mb-3 flex items-center justify-center">
        <Loader2
          className={cn(
            "animate-spin text-[var(--color-ink-muted)]",
            size === "sm" && "size-4",
            size === "default" && "size-5",
            size === "lg" && "size-7",
          )}
        />
      </div>

      {label && (
        <p
          className={cn(
            "font-serif italic text-[var(--color-ink-muted)]",
            size === "sm" && "text-xs",
            size === "default" && "text-sm",
            size === "lg" && "text-base",
          )}
        >
          {label}
        </p>
      )}
    </div>
  );
};

export { Loading };
