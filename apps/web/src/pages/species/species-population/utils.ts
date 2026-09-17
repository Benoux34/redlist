import type { PopulationFactKey, PopulationTrend } from "@app/contracts";
import {
  CircleHelp,
  Clock,
  Minus,
  Network,
  Split,
  TrendingDown,
  TrendingUp,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

const GENERATION_TOOLTIP =
  "C'est l'âge moyen des parents. L'UICN mesure le déclin d'une espèce sur trois générations : plus elles sont longues, plus l'espèce met de temps à se reconstituer.";

const TREND_ICONS: Record<PopulationTrend, LucideIcon> = {
  Decreasing: TrendingDown,
  Increasing: TrendingUp,
  Stable: Minus,
  Unknown: CircleHelp,
};

const TREND_COLORS: Record<PopulationTrend, string> = {
  Decreasing: "text-[var(--color-status-cr)]",
  Increasing: "text-[var(--color-ink)]",
  Stable: "text-[var(--color-ink)]",
  Unknown: "text-[var(--color-ink-faint)]",
};

const FACT_ICONS: Record<PopulationFactKey, LucideIcon> = {
  size: Users,
  subpopulations: Network,
  largest: UsersRound,
  fragmentation: Split,
  generation: Clock,
};

export { FACT_ICONS, GENERATION_TOOLTIP, TREND_COLORS, TREND_ICONS };
