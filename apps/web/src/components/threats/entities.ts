import type { LucideIcon } from "lucide-react";

type ThreatKey =
  "habitat" | "exploitation" | "climate" | "pollution" | "invasive";

type Threat = Readonly<{
  key: ThreatKey;
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}>;

export type { Threat, ThreatKey };
