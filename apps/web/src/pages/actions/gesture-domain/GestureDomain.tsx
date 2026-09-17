import type { GestureDomain as Domain } from "@/components/gestures/entities";
import { GestureCard } from "@/components/gestures/gesture-card/GestureCard";
import { Reveal } from "@/components/reveal/Reveal";
import { useInView } from "@/hooks/use-in-view/useInView";

type Props = Readonly<{
  domain: Domain;
}>;

const GestureDomain = ({ domain }: Props) => {
  const { ref, inView } = useInView<HTMLUListElement>();
  const count = domain.gestures.length;

  return (
    <section className="mb-12 text-left">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-[var(--color-ink)] sm:text-3xl">
          {domain.label}
        </h2>
        <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
          {count} {count > 1 ? "gestes" : "geste"}
        </span>
      </div>

      <ul
        ref={ref}
        className="grid grid-cols-1 border border-[var(--color-paper-border)] md:grid-cols-2"
      >
        {domain.gestures.map((gesture, index) => {
          const isLast = index === count - 1;

          return (
            <li
              key={gesture.title}
              className={`group border-[var(--color-paper-border)] ${
                isLast ? "" : "border-b md:border-b-0"
              } ${index % 2 === 0 && !isLast ? "md:border-r" : ""}`}
            >
              <Reveal inView={inView} index={index} className="h-full">
                <GestureCard gesture={gesture} />
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export { GestureDomain };
