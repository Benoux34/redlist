import { Minus, Plus, RotateCcw } from "lucide-react";

type Props = Readonly<{
  canZoomIn: boolean;
  canZoomOut: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}>;

const BUTTON_CLASS =
  "flex size-9 cursor-pointer items-center justify-center bg-[var(--color-paper)]/95 text-[var(--color-ink)] transition-colors hover:bg-[var(--color-paper-muted)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-ink)] disabled:cursor-default disabled:text-[var(--color-ink-faint)] disabled:hover:bg-[var(--color-paper)]/95";

const ZoomControls = ({
  canZoomIn,
  canZoomOut,
  onZoomIn,
  onZoomOut,
  onReset,
}: Props) => (
  <div className="absolute right-0 top-0 flex flex-col divide-y divide-[var(--color-paper-border)] border border-[var(--color-paper-border)] backdrop-blur-sm">
    <button
      type="button"
      onClick={onZoomIn}
      disabled={!canZoomIn}
      aria-label="Zoomer"
      className={BUTTON_CLASS}
    >
      <Plus className="size-4" />
    </button>
    <button
      type="button"
      onClick={onZoomOut}
      disabled={!canZoomOut}
      aria-label="Dézoomer"
      className={BUTTON_CLASS}
    >
      <Minus className="size-4" />
    </button>
    <button
      type="button"
      onClick={onReset}
      disabled={!canZoomOut}
      aria-label="Revenir à la carte entière"
      className={BUTTON_CLASS}
    >
      <RotateCcw className="size-3.5" />
    </button>
  </div>
);

export { ZoomControls };
