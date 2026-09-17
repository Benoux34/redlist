import type { ConservationGroup } from "@app/contracts";
import { HomeSectionHeader } from "@/pages/home/_components/home-section-header/HomeSectionHeader";
import { useInView } from "@/hooks/use-in-view/useInView";
import { Reveal } from "@/components/reveal/Reveal";
import { STATUS_STYLES } from "./utils";

type Props = Readonly<{
  groups: readonly ConservationGroup[];
}>;

const SpeciesConservation = ({ groups }: Props) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const measures = groups.flatMap((group) => group.measures);
  const inPlace = measures.filter((measure) => measure.status !== "no").length;

  return (
    <section id="protection" className="mb-20 scroll-mt-24 text-left">
      <HomeSectionHeader
        eyebrow="La protection"
        title="Que fait-on pour la protéger ?"
        lede={
          measures.length > 0
            ? `${inPlace} mesure${inPlace > 1 ? "s" : ""} de conservation sur ${measures.length} évaluée${measures.length > 1 ? "s" : ""} par l'UICN sont déjà en place, au moins en partie.`
            : "L'UICN ne détaille pas encore les mesures de conservation prises pour cette espèce."
        }
      />

      {groups.length > 0 && (
        <div
          ref={ref}
          className="grid grid-cols-1 border border-[var(--color-paper-border)] md:grid-cols-2"
        >
          {groups.map((group, index) => (
            <Reveal
              key={group.title}
              inView={inView}
              index={index}
              className={`border-[var(--color-paper-border)] px-6 py-5 sm:px-7 ${
                index < groups.length - 1 ? "border-b" : ""
              } ${index % 2 === 0 ? "md:border-r" : ""} ${
                index >= groups.length - (groups.length % 2 === 0 ? 2 : 1)
                  ? "md:border-b-0"
                  : "md:border-b"
              }`}
            >
              <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
                {group.title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {group.measures.map((measure) => {
                  const style = STATUS_STYLES[measure.status];
                  const Icon = style.icon;

                  return (
                    <li
                      key={measure.label}
                      className="group flex items-start gap-3"
                    >
                      <span
                        className={`mt-0.5 inline-flex size-5 shrink-0 items-center justify-center border transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none ${style.box}`}
                        role="img"
                        aria-label={style.label}
                      >
                        <Icon className="size-3" strokeWidth={2.5} />
                      </span>
                      <span className={`text-sm leading-snug ${style.text}`}>
                        {measure.label}
                        {measure.detail && (
                          <span className="text-[var(--color-ink-faint)]">
                            {" "}
                            · {measure.detail}
                          </span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      )}

      {groups.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-[var(--color-ink-faint)]">
          {(["yes", "partial", "no"] as const).map((status) => {
            const Icon = STATUS_STYLES[status].icon;

            return (
              <span key={status} className="inline-flex items-center gap-1.5">
                <span
                  className={`inline-flex size-3.5 items-center justify-center border ${STATUS_STYLES[status].box}`}
                  aria-hidden="true"
                >
                  <Icon className="size-2.5" strokeWidth={2.5} />
                </span>
                {STATUS_STYLES[status].label}
              </span>
            );
          })}
        </div>
      )}
    </section>
  );
};

export { SpeciesConservation };
