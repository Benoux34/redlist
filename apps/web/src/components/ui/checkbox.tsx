import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-none border border-[var(--color-paper-border-strong)] bg-transparent transition-colors outline-none cursor-pointer hover:border-[var(--color-ink)] focus-visible:border-[var(--color-ink)] focus-visible:ring-1 focus-visible:ring-[var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-40 data-checked:border-[var(--color-ink)] data-checked:bg-[var(--color-ink)] data-checked:text-[var(--color-paper)]",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current [&>svg]:size-3"
      >
        <Check className="stroke-[2.5]" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
