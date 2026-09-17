import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { HomeSectionHeader } from "@/pages/home/_components/home-section-header/HomeSectionHeader";
import { useInView } from "@/hooks/use-in-view/useInView";
import { Reveal } from "@/components/reveal/Reveal";
import { GestureCard } from "@/components/gestures/gesture-card/GestureCard";
import { FEATURED_GESTURES, GESTURES_PATH } from "@/components/gestures/utils";

const HomeActions = () => {
  const { ref, inView } = useInView<HTMLUListElement>();

  return (
    <section className="mb-20 text-left">
      <HomeSectionHeader
        eyebrow="Agir"
        title="Ce que chacun peut faire"
        lede="Pas besoin d'être scientifique : des gestes simples, au quotidien, réduisent directement ces pressions. Voici par où commencer."
      />

      <div className="border border-[var(--color-paper-border)]">
        <ul ref={ref} className="grid grid-cols-1 lg:grid-cols-3">
          {FEATURED_GESTURES.map((gesture, index) => (
            <li
              key={gesture.title}
              className={`group border-[var(--color-paper-border)] ${
                index < FEATURED_GESTURES.length - 1
                  ? "border-b lg:border-b-0 lg:border-r"
                  : ""
              }`}
            >
              <Reveal inView={inView} index={index} className="h-full">
                <GestureCard gesture={gesture} domain={gesture.domain} />
              </Reveal>
            </li>
          ))}
        </ul>

        <Link
          viewTransition
          to={GESTURES_PATH}
          className="group flex items-center justify-between gap-4 border-t border-[var(--color-paper-border)] bg-[var(--color-paper-muted)]/30 px-6 py-4 text-sm text-[var(--color-ink)] transition-colors hover:bg-[var(--color-paper-muted)] sm:px-7"
        >
          <span>Voir tous les gestes</span>
          <ArrowRight
            className="size-4 shrink-0 text-[var(--color-ink-muted)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-ink)] motion-reduce:transition-none"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
};

export { HomeActions };
