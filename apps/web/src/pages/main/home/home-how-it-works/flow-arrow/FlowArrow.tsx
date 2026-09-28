import { ArrowRight } from "lucide-react";
import { REVEAL_STAGGER_MS } from "@/components/reveal/utils";

type Props = Readonly<{
  visible: boolean;
  index: number;
}>;

const FlowArrow = ({ visible, index }: Props) => (
  <span
    style={{
      transitionDelay: visible ? `${index * REVEAL_STAGGER_MS}ms` : "0ms",
    }}
    className={`absolute -right-3.5 top-9 z-10 hidden size-7 items-center justify-center border border-[var(--color-paper-border)] bg-[var(--color-paper)] text-[var(--color-ink-muted)] transition-opacity duration-700 ease-out motion-reduce:transition-none lg:inline-flex ${
      visible ? "opacity-100" : "opacity-0"
    }`}
    aria-hidden="true"
  >
    <ArrowRight className="size-3.5" />
  </span>
);

export { FlowArrow };
