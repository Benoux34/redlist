import { useEffect, useRef } from "react";
import { X } from "lucide-react";

type Props = Readonly<{
  src: string | null;
  alt: string;
  caption: string | null;
  onClose: () => void;
}>;

const PhotoLightbox = ({ src, alt, caption, onClose }: Props) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog === null) return;

    if (src !== null && !dialog.open) dialog.showModal();
    if (src === null && dialog.open) dialog.close();
  }, [src]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={onClose}
      className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-[var(--color-ink)]/80 backdrop:backdrop-blur-sm open:animate-in open:fade-in open:zoom-in-95 open:duration-300"
    >
      {src !== null && (
        <figure className="flex max-h-[90dvh] max-w-[92vw] cursor-zoom-out flex-col items-center gap-3">
          <img
            src={src}
            alt={alt}
            className="max-h-[80dvh] w-auto object-contain"
          />
          {caption && (
            <figcaption className="text-xs text-[var(--color-paper)]/80">
              {caption}
            </figcaption>
          )}
        </figure>
      )}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer la photo"
        className="fixed right-4 top-4 flex size-10 cursor-pointer items-center justify-center text-[var(--color-paper)] transition-transform hover:rotate-90"
      >
        <X className="size-6" />
      </button>
    </dialog>
  );
};

export { PhotoLightbox };
