import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { REVEAL_STAGGER_MS } from "./utils";

type Props = Readonly<{
  inView: boolean;
  index?: number;
  className?: string;
  children: ReactNode;
}>;

const Reveal = ({ inView, index = 0, className, children }: Props) => {
  return (
    <div
      style={{
        transitionDelay: inView ? `${index * REVEAL_STAGGER_MS}ms` : "0ms",
      }}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
        inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
};

export { Reveal };
