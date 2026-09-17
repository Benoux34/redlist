import type { LucideIcon } from "lucide-react";
import type { ThreatKey } from "../threats/entities";

type Gesture = Readonly<{
  title: string;
  description: string;
  icon: LucideIcon;
  threat: ThreatKey | null;
  featured?: boolean;
  href?: string;
}>;

type GestureDomain = Readonly<{
  label: string;
  gestures: readonly Gesture[];
}>;

export type { Gesture, GestureDomain };
