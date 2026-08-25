import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomeHero = () => {
  return (
    <section className="mt-8 mb-20 text-left">
      <div className="w-full text-left">
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[var(--color-ink)] leading-[1.08] mb-4">
          Témoigner du vivant, avant qu&apos;il ne devienne{" "}
          <span className="italic font-normal underline decoration-[var(--color-paper-border-strong)] decoration-2 underline-offset-8">
            une archive
          </span>
          .
        </h1>

        <p className="text-base sm:text-xl leading-relaxed text-[var(--color-ink-muted)] mb-8 max-w-5xl">
          L&apos;observatoire libre et scientifique dédié à la connaissance, la
          surveillance et la préservation de la biodiversité mondiale, fondé sur
          les évaluations officielles de l&apos;UICN.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Button
            size="lg"
            className="h-12 px-6 text-base"
            render={<Link to="/threatened-species" />}
          >
            <span>Explorer le catalogue</span>
            <ArrowRight className="size-4" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="h-12 px-6 text-base"
            render={<Link to="/france" />}
          >
            <span>Espèces en France</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export { HomeHero };
