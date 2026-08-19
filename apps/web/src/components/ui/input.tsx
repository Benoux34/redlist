import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-none border border-[var(--color-paper-border)] bg-transparent px-3 py-2 text-sm text-[var(--color-ink)] shadow-none transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] focus-visible:border-[var(--color-ink)] focus-visible:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-[var(--color-status-cr)] md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
