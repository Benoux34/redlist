import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-none border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:border-[var(--color-ink)] focus-visible:ring-1 focus-visible:ring-[var(--color-ink)] disabled:pointer-events-none disabled:opacity-40 aria-invalid:border-[var(--color-status-cr)] cursor-pointer [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-ink)]/90",
        outline:
          "border-[var(--color-paper-border)] bg-transparent text-[var(--color-ink)] hover:border-[var(--color-paper-border-strong)] hover:bg-[var(--color-paper-muted)]/40",
        secondary:
          "bg-[var(--color-paper-muted)] text-[var(--color-ink)] hover:bg-[var(--color-paper-muted)]/80",
        ghost:
          "text-[var(--color-ink-muted)] hover:bg-[var(--color-paper-muted)]/50 hover:text-[var(--color-ink)]",
        destructive:
          "border border-[var(--color-status-cr)]/30 bg-[var(--color-status-cr-bg)] text-[var(--color-status-cr)] hover:bg-[var(--color-status-cr-bg)]/80",
        link: "text-[var(--color-ink)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 gap-1.5 px-3",
        xs: "h-6 gap-1 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 px-2.5 text-xs",
        lg: "h-10 gap-1.5 px-4",
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
