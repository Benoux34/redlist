import type { RedListCategoryCount } from "@app/contracts";
import type { AsyncState } from "@/api/red-list/entities";
import { redlist_categories } from "./utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = Readonly<{
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  counts: AsyncState<RedListCategoryCount[]>;
}>;

const SeverityScale = ({ selectedCategory, onSelectCategory }: Props) => {
  return (
    <section className="mb-14">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <div className="mb-4 flex items-center justify-between border-b border-[var(--color-paper-border)] pb-2.5">
          <p className="text-sm font-medium tracking-wide text-[var(--color-ink-muted)]">
            Niveaux de gravité • Échelle UICN
          </p>

          <div className="flex items-center gap-1.5">
            <CarouselPrevious className="static inset-auto translate-y-0 translate-x-0 size-7" />
            <CarouselNext className="static inset-auto translate-y-0 translate-x-0 size-7" />
          </div>
        </div>

        <CarouselContent className="-ml-0 border-l border-[var(--color-paper-border)]">
          {redlist_categories.map((cat) => {
            const isSelected = selectedCategory === cat.code;

            return (
              <CarouselItem
                key={cat.code ?? "all"}
                className="pl-0 basis-full sm:basis-1/2 md:basis-1/3 border-t border-b-2 border-r border-[var(--color-paper-border)]"
              >
                <button
                  type="button"
                  onClick={() => onSelectCategory(cat.code)}
                  className={`group relative flex h-full w-full flex-col justify-between p-6 sm:p-7 md:p-8 text-left transition-all cursor-pointer ${
                    isSelected
                      ? cat.selectedBgClass
                      : "hover:bg-[var(--color-paper-muted)]/40"
                  }`}
                >
                  <div>
                    <div className="mb-4 flex items-start justify-between">
                      <span
                        className={`font-serif text-base italic leading-6 transition-colors ${
                          isSelected
                            ? cat.accentClass
                            : "text-[var(--color-ink-muted)]"
                        }`}
                      >
                        {cat.numeral}. {cat.code ?? "ALL"}
                      </span>

                      <span className="flex h-6 items-center">
                        <span
                          aria-hidden="true"
                          className={`size-2.5 rounded-full transition-all ${cat.dotColorClass} ${
                            isSelected ? "ring-4 ring-current/20" : "opacity-80"
                          }`}
                        />
                      </span>
                    </div>

                    <h3
                      className={`mb-2 font-serif text-xl sm:text-2xl font-medium tracking-tight transition-colors ${
                        isSelected
                          ? "text-[var(--color-ink)]"
                          : "text-[var(--color-ink)] group-hover:text-[var(--color-ink)]"
                      }`}
                    >
                      {cat.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">
                      {cat.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--color-paper-border)]/70 flex items-center justify-between text-xs sm:text-sm">
                    <span
                      className={
                        isSelected
                          ? `font-medium ${cat.accentClass}`
                          : "text-[var(--color-ink-faint)] group-hover:text-[var(--color-ink-muted)]"
                      }
                    >
                      {isSelected ? "Palier sélectionné" : "Explorer ce palier"}
                    </span>
                    <span
                      className={`transition-transform ${
                        isSelected
                          ? cat.accentClass
                          : "text-[var(--color-ink-faint)] group-hover:translate-x-1"
                      }`}
                    >
                      {isSelected ? "●" : "→"}
                    </span>
                  </div>
                </button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export { SeverityScale };
